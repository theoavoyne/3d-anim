/* eslint-disable no-param-reassign */

import { Expo, gsap } from 'gsap';

const groupDelta = Math.PI / 64;
const individualDelta = Math.PI / 8;
const startSpeed = 32;
const tweenDuration = 6;

export default (fragments) => {
  const speed = { current: startSpeed };

  let speedDropped = false;

  const dropSpeed = () => {
    speedDropped = true;
    gsap.to(speed, {
      current: 1,
      duration: tweenDuration,
      ease: Expo.easeOut,
    });
  };

  const update = (timeDelta) => {
    if (!speedDropped) { dropSpeed(); }
    fragments.children.forEach((fragment) => {
      const angle = individualDelta * (timeDelta / 1000);
      const axis = fragment.userData.rotationAxis;
      fragment.rotateOnAxis(axis, angle);
    });
    const groupAngle = speed.current * groupDelta * (timeDelta / 1000);
    const groupAxis = fragments.userData.rotationAxis;
    fragments.rotateOnWorldAxis(groupAxis, groupAngle);
  };

  return { update };
};
