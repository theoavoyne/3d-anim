/* eslint-disable no-param-reassign */

import { gsap } from 'gsap';
import pick from 'lodash.pick';

import computeDisplacement from './computeDisplacement';

const maxDisplacementDistance = 13;
const tweenDurationDown = 0.25;
const tweenDurationUp = 0.25;

export default (rock, initialVertices) => {
  let animatedVertices = [];

  const makeDisplacement = (intersect) => {
    const randDist = Math.random() * maxDisplacementDistance;
    const { face } = intersect;
    [face.a, face.b, face.c].forEach((index) => {
      if (!animatedVertices.includes(index)) {
        animatedVertices.push(index);
        const vertex = rock.geometry.vertices[index];
        const newPos = computeDisplacement(vertex, randDist);
        gsap.killTweensOf(vertex);
        gsap.to(vertex, {
          duration: tweenDurationUp,
          onUpdate: () => { rock.geometry.verticesNeedUpdate = true; },
          ...newPos,
        });
      }
    });
  };

  const MD = (intersect) => {
    if (intersect) { makeDisplacement(intersect); }
  };

  const MM = (intersect, mouseDown) => {
    if (intersect && mouseDown) { makeDisplacement(intersect); }
  };

  const MU = () => {
    animatedVertices.forEach((index) => {
      const vertex = rock.geometry.vertices[index];
      gsap.killTweensOf(vertex);
      gsap.to(vertex, {
        duration: tweenDurationDown,
        onUpdate: () => { rock.geometry.verticesNeedUpdate = true; },
        ...pick(initialVertices[index], ['x', 'y', 'z']),
      });
    });
    animatedVertices = [];
  };

  return { MD, MM, MU };
};
