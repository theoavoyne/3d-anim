import { gsap } from 'gsap';

const tweenDuration = 0.5;

export default (args) => {
  const {
    cameraRotationMM,
    handlers,
    particles,
    scene,
  } = args;

  return () => {
    handlers.MM = [cameraRotationMM];

    gsap.fromTo(
      particles.children[0].material,
      { opacity: 0 },
      {
        duration: tweenDuration,
        ease: 'none',
        opacity: 1,
      },
    );

    scene.add(particles);
  };
};
