/* eslint-disable object-curly-newline, no-param-reassign */

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
import initRockOpacity from '../animation/functions/initRockOpacity';
import initRockRotation from '../animation/functions/initRockRotation';
import initRockScale from '../animation/functions/initRockScale';
import initTransition0 from '../animation/functions/initTransition0';
import initTransition1 from '../animation/functions/initTransition1';
import initTransition2 from '../animation/functions/initTransition2';
import initTransition3 from '../animation/functions/initTransition3';

export default (...args) => {
  const [
    canvasRef,
    onClickBeginRef,
    onClickExitRef,
    setPercent,
    setStep,
  ] = args;

  useEffect(() => {
    const camera = createCamera();
    const door = createDoor();
    const fragments = createFragments();
    const light = createLight();
    const [particles, particlesMaterials] = createParticles();
    const raycaster = createRaycaster();
    const renderer = createRenderer(canvasRef.current);
    const [rock, initialVertices] = createRock();
    const scene = createScene();

    const didCancelRef = { current: false };
    const handlers = { DO: [], MD: [], MM: [], MU: [], updaters: [] };
    const transition2Ref = {};

    // EVENT HANDLERS & UPDATERS

    const {
      DO: cameraRotationDO,
      MM: cameraRotationMM,
    } = initCameraRotation(camera);

    const {
      MD: facesDispMD,
      MM: facesDispMM,
      MU: facesDispMU,
    } = initFacesDisp(rock, initialVertices);

    const {
      update: updateFragsRotation,
    } = initFragsRotation(fragments);

    const particlesMovementCleanUp = initParticlesMovement(particles);

    const {
      MD: progressMD,
      MU: progressMU,
    } = initProgress(setPercent, transition2Ref);

    const {
      MD: rockOpacityMD,
      MU: rockOpacityMU,
    } = initRockOpacity(rock);

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

    // EVENT LISTENERS

    const [onDeviceOrientation, listenersCleanUp] = initListeners({
      camera,
      canvasRef,
      handlers,
      raycaster,
      scene,
    });

    // TRANSITIONS

    const transition0 = initTransition0({
      cameraRotationMM,
      handlers,
      particles,
      particlesMaterials,
      scene,
    });

    const transition1 = initTransition1({
      cameraRotationDO,
      cameraRotationMM,
      facesDispMD,
      facesDispMM,
      facesDispMU,
      handlers,
      light,
      onDeviceOrientation,
      progressMD,
      progressMU,
      rock,
      rockOpacityMD,
      rockOpacityMU,
      rockRotationMD,
      rockRotationMM,
      rockRotationMU,
      rockScaleMD,
      rockScaleMU,
      scene,
      setStep,
      updateRockRotation,
    });

    transition2Ref.current = initTransition2({
      cameraRotationMM,
      door,
      fragments,
      handlers,
      particles,
      particlesMovementCleanUp,
      rock,
      scene,
      setStep,
      updateFragsRotation,
    });

    const transition3 = initTransition3({
      camera,
      didCancelRef,
      door,
      fragments,
      handlers,
      light,
      listenersCleanUp,
      scene,
      setStep,
    });

    onClickBeginRef.current = transition1;
    onClickExitRef.current = transition3;

    // ANIMATE

    let prevTime = 0;

    const animate = (time) => {
      if (!didCancelRef.current) {
        const timeDelta = time - prevTime;
        prevTime = time;
        renderer.render(scene, camera);
        handlers.updaters.forEach((func) => { func(timeDelta); });
        requestAnimationFrame(animate);
      }
    };

    animate(0);

    transition0();
  }, []);
};
