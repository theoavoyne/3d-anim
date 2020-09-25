import { Expo, gsap } from 'gsap';

import {
  fov as cameraFov,
  position as cameraPosition,
} from '../objects/createCamera';

const distanceMaxRatio = 1.25;
const distanceMinRatio = 0.5;
const tweenDuration = 2;

const cameraFovRad = cameraFov * (Math.PI / 180);

export default (args) => {
  const {
    door,
    fragments,
    handlers,
    newHandlers,
    particles,
    rock,
    scene,
    setStep,
  } = args;

  return () => {
    const fromDistance = rock.geometry.parameters.radius * rock.scale.x;

    fragments.children.forEach((fragment) => {
      // TRANSLATION DISTANCE COMPUTATION
      const aspect = window.innerWidth / window.innerHeight;
      const baseDistance = (
        Math.tan(Math.max(cameraFovRad, cameraFovRad * aspect) / 2)
        * cameraPosition[2]
      );
      const distance = (
        Math.random()
        * (baseDistance * (distanceMaxRatio - distanceMinRatio))
        + baseDistance * distanceMinRatio
      );

      // TRANSLATION
      const { translationAxis } = fragment.userData;
      gsap.fromTo(
        fragment.position,
        {
          x: translationAxis.x * fromDistance,
          y: translationAxis.y * fromDistance,
          z: translationAxis.z * fromDistance,
        },
        {
          duration: tweenDuration,
          ease: Expo.easeOut,
          x: translationAxis.x * distance,
          y: translationAxis.y * distance,
          z: translationAxis.z * distance,
        },
      );
    });

    // PREPARING NEW SCENE
    scene.add(door);
    scene.add(fragments);
    scene.remove(particles);
    scene.remove(rock);
    Object.assign(handlers, newHandlers);
    setStep(2);
  };
};
