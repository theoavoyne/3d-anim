import { gsap, Power4 } from 'gsap';

const opacityMax = 1;
const opacityMin = 0.2;
const tweenDurationDown = 4.5;
const tweenDurationUp = 2;

export default (rock) => {
  let tween;

  const MD = () => {
    if (tween) { tween.kill(); }
    tween = gsap.to(rock.material, {
      duration: tweenDurationDown
        * ((rock.material.opacity - opacityMin) / (opacityMax - opacityMin)),
      ease: Power4.easeIn,
      onComplete: () => { tween = undefined; },
      opacity: opacityMin,
    });
  };

  const MU = () => {
    if (tween) { tween.kill(); }
    tween = gsap.to(rock.material, {
      duration: tweenDurationUp
        * ((opacityMax - rock.material.opacity) / (opacityMax - opacityMin)),
      ease: Power4.easeOut,
      onComplete: () => { tween = undefined; },
      opacity: opacityMax,
    });
  };

  return { MD, MU };
};
