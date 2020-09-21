import { gsap } from 'gsap';

const tweenDurationDown = 3;
const tweenDurationUp = 6;

export default (setPercent) => {
  const progress = { current: 0 };
  let tween;

  const MD = () => {
    if (tween) { tween.kill(); }
    tween = gsap.to(progress, {
      current: 100,
      duration: tweenDurationUp * ((100 - progress.current) / 100),
      ease: 'none',
      onComplete: () => { tween = undefined; },
      onUpdate: () => { setPercent(progress.current); },
    });
  };

  const MU = () => {
    if (tween) { tween.kill(); }
    tween = gsap.to(progress, {
      current: 0,
      duration: tweenDurationDown * (progress.current / 100),
      ease: 'none',
      onComplete: () => { tween = undefined; },
      onUpdate: () => { setPercent(progress.current); },
    });
  };

  return { MD, MU };
};
