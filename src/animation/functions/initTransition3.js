import { gsap, Power2 } from 'gsap';

const tweenCameraDuration = 3;
const tweenDoorDelay = 1.5;
const tweenDoorDuration = 0.5;

export default (args) => {
  const {
    camera,
    didCancelRef,
    door,
    fragments,
    handlers,
    light,
    listenersCleanUp,
    scene,
    setStep,
  } = args;

  return () => {
    setStep(3);
    handlers.DO = [];
    handlers.MM = [];
    gsap.to(camera.position, {
      duration: tweenCameraDuration,
      ease: Power2.easeIn,
      x: 0,
      z: 1,
    }).then(() => {
      scene.remove(fragments);
      handlers.updaters = [];
      return gsap.to(door.material, {
        delay: tweenDoorDelay,
        duration: tweenDoorDuration,
        ease: 'none',
        opacity: 0,
      });
    }).then(() => {
      didCancelRef.current = true;
      listenersCleanUp();
      scene.remove(door);
      scene.remove(light);
    });
  };
};
