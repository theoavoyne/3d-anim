/* eslint-disable no-param-reassign */

import { gsap } from 'gsap';
import pick from 'lodash.pick';

import computeDisplacement from './computeDisplacement';

export default ({ animatedVertices, face, rock }) => {
  const verticesIndexes = Object.values(pick(face, ['a', 'b', 'c']));
  const randDist = Math.random() * 20;
  verticesIndexes.forEach((vertexIndex) => {
    if (!animatedVertices.current.includes(vertexIndex)) {
      animatedVertices.current.push(vertexIndex);
      const vertex = rock.geometry.vertices[vertexIndex];
      const newPos = computeDisplacement(vertex, randDist);
      gsap.killTweensOf(vertex);
      gsap.to(vertex, {
        duration: 1,
        onUpdate: () => { rock.geometry.verticesNeedUpdate = true; },
        ...newPos,
      });
    }
  });
};
