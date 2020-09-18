/* eslint-disable no-constant-condition */

import { gsap } from 'gsap';
import { Vector3 } from 'three';

import { maxX, maxY } from '../objects/createParticles';

const distance = 30;
const durationMax = 20;
const durationMin = 5;

export default (particles) => {
  const isOut = (vector) => (
    Math.abs(vector.x) > maxX || Math.abs(vector.y) > maxY
  );

  const getRandomTarget = (particle) => {
    const isParticleOut = isOut(particle.position);

    while (true) {
      const axis = new Vector3(Math.random() - 0.5, Math.random() - 0.5, 0);
      axis.normalize();
      const target = {
        x: particle.position.x + axis.x * distance,
        y: particle.position.y + axis.y * distance,
      };
      if (!(isParticleOut && isOut(target))) { return target; }
    }
  };

  const setTween = (particle) => {
    const duration = Math.random() * (durationMax - durationMin) + durationMin;

    gsap.to(particle.position, {
      duration,
      onComplete: () => { setTween(particle); },
      ...getRandomTarget(particle),
    });
  };

  particles.children.forEach((particle) => { setTween(particle); });
};
