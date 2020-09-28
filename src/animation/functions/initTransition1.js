import { gsap, Power2 } from 'gsap';

import { position as cameraPosition } from '../objects/createCamera';
import { touchDevice } from './initListeners';

const tweenDelay = 1;
const tweenDuration = 2;

export const wait = tweenDelay + tweenDuration;

export default (args) => {
  const {
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

    if (touchDevice && window.DeviceOrientationEvent) {
      let promise;

      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        promise = DeviceOrientationEvent.requestPermission();
      } else {
        promise = Promise.resolve('granted');
      }

      promise.then((permissionState) => {
        if ((permissionState) === 'granted') {
          handlers.DO = [cameraRotationDO];
          window.addEventListener('deviceorientation', onDeviceOrientation);
        }
      });
    }

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
