import { Expo, gsap } from 'gsap';

const distanceMax = 300;
const distanceMin = 100;
const tweenDuration = 2;

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

    // PREPARING NEW SCENE
    scene.add(door);
    scene.add(fragments);
    scene.remove(particles);
    scene.remove(rock);
    Object.assign(handlers, newHandlers);
    setStep(2);
  };
};
