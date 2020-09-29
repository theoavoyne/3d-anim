import { Expo, gsap, Power1 } from 'gsap';

const scaleMax = 1.7;
const scaleMin = 1;
const tweenDurationDown = 2;
const tweenDurationUp = 4.5;

export default (rock) => {
  let tween;

  const MD = () => {
    if (tween) { tween.kill(); }
    tween = gsap.to(rock.scale, {
      duration: tweenDurationUp
        * ((scaleMax - rock.scale.x) / (scaleMax - scaleMin)),
      ease: Power1.easeOut,
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
      ease: Expo.easeOut,
      onComplete: () => { tween = undefined; },
      x: scaleMin,
      y: scaleMin,
      z: scaleMin,
    });
  };

  return { MD, MU };
};
