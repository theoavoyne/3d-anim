import { gsap } from 'gsap';

const tweenDuration = 0.5;

export default (args) => {
  const {
    cameraRotationMM,
    handlers,
    particles,
    particlesMaterials,
    scene,
  } = args;

  return () => {
    handlers.MM = [cameraRotationMM];

    particlesMaterials.forEach((material) => {
      gsap.fromTo(
        material,
        { opacity: 0 },
        {
          duration: tweenDuration,
          ease: 'none',
          opacity: 1,
        },
      );
    });

    scene.add(particles);
  };
};
