import { Expo, gsap } from 'gsap';

const distanceMax = 300;
const distanceMin = 100;
const tweenDuration = 6;

export default (args) => {
  const {
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
  } = args;

  return () => {
    setStep(2);

    const fromDistance = rock.geometry.parameters.radius * rock.scale.x;

    fragments.children.forEach((fragment) => {
      const distance = Math.random() * (distanceMax - distanceMin) + distanceMin;
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

    fragments.userData.rotationAxis = rock.userData.rotationAxis;

    handlers.MD = [];
    handlers.MM = [cameraRotationMM];
    handlers.MU = [];
    handlers.updaters = [updateFragsRotation];

    scene.remove(particles);
    scene.remove(rock);

    particlesMovementCleanUp();

    scene.add(door);
    scene.add(fragments);
  };
};
