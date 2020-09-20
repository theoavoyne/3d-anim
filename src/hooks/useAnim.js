/* eslint-disable object-curly-newline */

import { useEffect } from 'react';

import createCamera from '../animation/objects/createCamera';
import createLight from '../animation/objects/createLight';
import createParticles from '../animation/objects/createParticles';
import createRaycaster from '../animation/objects/createRaycaster';
import createRenderer from '../animation/objects/createRenderer';
import createRock from '../animation/objects/createRock';
import createScene from '../animation/objects/createScene';
import initCameraRotation from '../animation/functions/initCameraRotation';
import initFacesDisp from '../animation/functions/initFacesDisp';
import initListeners from '../animation/functions/initListeners';
import initParticlesMovement from '../animation/functions/initParticlesMovement';
import initRockRotation from '../animation/functions/initRockRotation';
import initRockScale from '../animation/functions/initRockScale';

export default (canvasRef) => {
  useEffect(() => {
    const camera = createCamera();
    const light = createLight();
    const particles = createParticles();
    const raycaster = createRaycaster();
    const renderer = createRenderer(canvasRef.current);
    const [rock, initialVertices] = createRock();
    const scene = createScene();

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
      MD: rockRotationMD,
      MM: rockRotationMM,
      MU: rockRotationMU,
      update: updateRockRotation,
    } = initRockRotation(rock);

    const {
      MD: rockScaleMD,
      MU: rockScaleMU,
    } = initRockScale(rock);

    const animate = (time) => {
      if (!didCancel) {
        const timeDelta = time - prevTime;
        prevTime = time;
        renderer.render(scene, camera);
        updateRockRotation(timeDelta);
        requestAnimationFrame(animate);
      }
    };

    scene.add(light);
    scene.add(particles);
    scene.add(rock);

    animate(0);

    const listenersCleanUp = initListeners({
      camera,
      MD: [facesDispMD, rockRotationMD, rockScaleMD],
      MM: [cameraRotationMM, facesDispMM, rockRotationMM],
      MU: [facesDispMU, rockRotationMU, rockScaleMU],
      raycaster,
      scene,
    });

    return () => {
      didCancel = true;
      listenersCleanUp();
    };
  }, []);
};
