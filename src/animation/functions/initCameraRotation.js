import { gsap } from 'gsap';
import throttle from 'lodash.throttle';

import { position as cameraPosition } from '../objects/createCamera';

const maxAngle = Math.PI / 12;
const throttleWait = 50;
const tweenDuration = 1;

const maxX = Math.sin(maxAngle) * cameraPosition[2];
const maxZ = Math.sqrt(cameraPosition[2] ** 2 - maxX ** 2);

export { maxAngle, maxX, maxZ };

export default (camera) => {
  let tween;

  const rotate = (factor) => {
    if (tween) { tween.kill(); }
    tween = gsap.to(camera.position, {
      duration: tweenDuration,
      onComplete: () => { tween = undefined; },
      onUpdate: () => {
        const z = Math.sqrt(cameraPosition[2] ** 2 - camera.position.x ** 2);
        camera.position.setZ(z);
        camera.lookAt(0, 0, 0);
      },
      x: Math.sin(factor * maxAngle) * cameraPosition[2],
    });
  };

  const DO = throttle(({ gamma }) => {
    const factor = Math.sign(gamma) * Math.abs(gamma / 90) ** (1 / 2);
    rotate(factor);
  }, throttleWait);

  const MM = throttle((_, mouseDown, e) => {
    if (e.type === 'mousemove') {
      const { clientX } = e;
      const factor = ((clientX / window.innerWidth) * 2) - 1;
      rotate(factor);
    }
  }, throttleWait);

  return { DO, MM };
};
