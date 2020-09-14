import { gsap } from 'gsap';

const scaleMax = 1.25;
const scaleMin = 1;
const tweenDurationDown = 0.25;
const tweenDurationUp = 6;

export default (rock) => {
  let tween;

  const MD = () => {
    if (tween) { tween.kill(); }
    tween = gsap.to(rock.scale, {
      duration: tweenDurationUp
        * ((scaleMax - rock.scale.x) / (scaleMax - scaleMin)),
      ease: 'none',
      onComplete: () => { tween = undefined; },
      x: scaleMax,
      y: scaleMax,
      z: scaleMax,
    });
  };

  const MU = () => {
    if (tween) { tween.kill(); }
    tween = gsap.to(rock.scale, {
      duration: tweenDurationDown
        * ((rock.scale.x - scaleMin) / (scaleMax - scaleMin)),
      ease: 'none',
      onComplete: () => { tween = undefined; },
      x: scaleMin,
      y: scaleMin,
      z: scaleMin,
    });
  };

  return { MD, MU };
};
