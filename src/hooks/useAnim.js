/* eslint-disable object-curly-newline */

import { useEffect } from 'react';

import createCamera from '../animation/objects/createCamera';
import createDoor from '../animation/objects/createDoor';
import createFragments from '../animation/objects/createFragments';
import createLight from '../animation/objects/createLight';
import createParticles from '../animation/objects/createParticles';
import createRaycaster from '../animation/objects/createRaycaster';
import createRenderer from '../animation/objects/createRenderer';
import createRock from '../animation/objects/createRock';
import createScene from '../animation/objects/createScene';
import initCameraRotation from '../animation/functions/initCameraRotation';
import initFacesDisp from '../animation/functions/initFacesDisp';
import initFragsRotation from '../animation/functions/initFragsRotation';
import initListeners from '../animation/functions/initListeners';
import initParticlesMovement from '../animation/functions/initParticlesMovement';
import initProgress from '../animation/functions/initProgress';
import initRockRotation from '../animation/functions/initRockRotation';
import initRockScale from '../animation/functions/initRockScale';
import initTransition2 from '../animation/functions/initTransition2';

export default (canvasRef, setPercent, setStep) => {
  useEffect(() => {
    const camera = createCamera();
    const door = createDoor();
    const fragments = createFragments();
    const light = createLight();
    const particles = createParticles();
    const raycaster = createRaycaster();
    const renderer = createRenderer(canvasRef.current);
    const [rock, initialVertices] = createRock();
    const scene = createScene();

    const transition2Ref = {};

    let didCancel = false;
    let prevTime = 0;

    const { MM: cameraRotationMM } = initCameraRotation(camera);

    const {
      MD: facesDispMD,
      MM: facesDispMM,
      MU: facesDispMU,
    } = initFacesDisp(rock, initialVertices);

    initParticlesMovement(particles);

    const {
      MD: progressMD,
      MU: progressMU,
    } = initProgress(setPercent, transition2Ref);

    const {
      MD: rockRotationMD,
      MM: rockRotationMM,
      MU: rockRotationMU,
      update: updateRockRotation,
    } = initRockRotation(rock);

    const {
      MD: rockScaleMD,
      MU: rockScaleMU,
    } = initRockScale(rock);

    const {
      update: updateFragsRotation,
    } = initFragsRotation(fragments);

    const handlers = {
      MD: [facesDispMD, progressMD, rockRotationMD, rockScaleMD],
      MM: [cameraRotationMM, facesDispMM, rockRotationMM],
      MU: [facesDispMU, progressMU, rockRotationMU, rockScaleMU],
      updaters: [updateRockRotation],
    };

    transition2Ref.current = initTransition2({
      door,
      fragments,
      handlers,
      newHandlers: {
        MD: [],
        MM: [cameraRotationMM],
        MU: [],
        updaters: [updateFragsRotation],
      },
      particles,
      rock,
      scene,
      setStep,
    });

    const animate = (time) => {
      if (!didCancel) {
        const timeDelta = time - prevTime;
        prevTime = time;
        renderer.render(scene, camera);
        handlers.updaters.forEach((func) => { func(timeDelta); });
        requestAnimationFrame(animate);
      }
    };

    scene.add(light);
    scene.add(particles);
    scene.add(rock);

    animate(0);

    const listenersCleanUp = initListeners({
      camera,
      handlers,
      raycaster,
      scene,
    });

    return () => {
      didCancel = true;
      listenersCleanUp();
    };
  }, []);
};
