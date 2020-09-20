/* eslint-disable object-curly-newline */

import { gsap } from 'gsap';
import { Vector3 } from 'three';

const delta = Math.PI / 4;
const speedMax = 2;
const speedMin = 1;
const tweenDurationDown = 0.25;
const tweenDurationUp = 1;

export default (rock) => {
  const point = { x: 1, y: 1 };
  const speed = { current: speedMin };
  let tween;

  const update = (timeDelta) => {
    const { x, y } = point;
    const angle = speed.current * delta * (timeDelta / 1000);
    const axis = new Vector3(y, -x, 0).normalize();
    rock.rotateOnWorldAxis(axis, angle);
  };

  const updatePoint = (intersect) => {
    point.x = intersect.point.x;
    point.y = intersect.point.y;
  };

  const MD = (intersect) => {
    if (tween) { tween.kill(); }
    tween = gsap.to(speed, {
      current: speedMax,
      duration: tweenDurationUp
        * ((speedMax - speed.current) / (speedMax - speedMin)),
      ease: 'none',
      onComplete: () => { tween = undefined; },
    });
    if (intersect) { updatePoint(intersect); }
  };

  const MM = (intersect, mouseDown) => {
    if (mouseDown && intersect) { updatePoint(intersect); }
  };

  const MU = (intersect) => {
    if (tween) { tween.kill(); }
    tween = gsap.to(speed, {
      current: speedMin,
      duration: tweenDurationDown
        * ((speed.current - speedMin) / (speedMax - speedMin)),
      ease: 'none',
      onComplete: () => { tween = undefined; },
    });
    if (intersect) { updatePoint(intersect); }
  };

  return { MD, MM, MU, update };
};
