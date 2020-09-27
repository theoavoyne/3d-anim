import { gsap, Power2 } from 'gsap';

import { position as cameraPosition } from '../objects/createCamera';

const tweenDelay = 1;
const tweenDuration = 2;

export default (args) => {
  const {
    cameraRotationMM,
    facesDispMD,
    facesDispMM,
    facesDispMU,
    handlers,
    light,
    progressMD,
    progressMU,
    rock,
    rockRotationMD,
    rockRotationMM,
    rockRotationMU,
    rockScaleMD,
    rockScaleMU,
    scene,
    setStep,
    updateRockRotation,
  } = args;

  return () => {
    setStep(1);

    handlers.updaters = [updateRockRotation];

    gsap.fromTo(
      rock.position,
      { z: cameraPosition[2] },
      {
        delay: tweenDelay,
        duration: tweenDuration,
        ease: Power2.easeOut,
        z: 0,
      },
    ).then(() => {
      handlers.MD = [facesDispMD, progressMD, rockRotationMD, rockScaleMD];
      handlers.MM = [cameraRotationMM, facesDispMM, rockRotationMM];
      handlers.MU = [facesDispMU, progressMU, rockRotationMU, rockScaleMU];
    });

    scene.add(light);
    scene.add(rock);
  };
};
