import { gsap } from 'gsap';

const opacityMax = 1;
const opacityMin = 0.2;
const tweenDurationDown = 4;
const tweenDurationUp = 2;

export default (rock) => {
  let tween;

  const MD = () => {
    if (tween) { tween.kill(); }
    tween = gsap.to(rock.material, {
      duration: tweenDurationDown
        * ((rock.material.opacity - opacityMin) / (opacityMax - opacityMin)),
      ease: 'none',
      onComplete: () => { tween = undefined; },
      opacity: opacityMin,
    });
  };

  const MU = () => {
    if (tween) { tween.kill(); }
    tween = gsap.to(rock.material, {
      duration: tweenDurationUp
        * ((opacityMax - rock.material.opacity) / (opacityMax - opacityMin)),
      ease: 'none',
      onComplete: () => { tween = undefined; },
      opacity: opacityMax,
    });
  };

  return { MD, MU };
};
