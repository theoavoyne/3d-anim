import { Expo, gsap } from 'gsap';

const tweenDurationDown = 2;
const tweenDurationUp = 4.5;

export default (setPercent, transition2Ref) => {
  const progress = { current: 0 };
  let tween;

  const MD = () => {
    if (tween) { tween.kill(); }
    tween = gsap.to(progress, {
      current: 100,
      duration: tweenDurationUp * ((100 - progress.current) / 100),
      ease: 'none',
      onComplete: () => {
        tween = undefined;
        transition2Ref.current();
      },
      onUpdate: () => { setPercent(progress.current); },
    });
  };

  const MU = () => {
    if (tween) { tween.kill(); }
    tween = gsap.to(progress, {
      current: 0,
      duration: tweenDurationDown * (progress.current / 100),
      ease: Expo.easeOut,
      onComplete: () => { tween = undefined; },
      onUpdate: () => { setPercent(progress.current); },
    });
  };

  return { MD, MU };
};
