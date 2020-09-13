/* eslint-disable no-param-reassign */

import { gsap } from 'gsap';
import pick from 'lodash.pick';

export default ({ animatedVertices, originalVertices, rock }) => {
  animatedVertices.current.forEach((vertexIndex) => {
    const vertex = rock.geometry.vertices[vertexIndex];
    gsap.killTweensOf(vertex);
    gsap.to(vertex, {
      duration: 0.5,
      onUpdate: () => { rock.geometry.verticesNeedUpdate = true; },
      ...pick(originalVertices[vertexIndex], ['x', 'y', 'z']),
    });
  });
  animatedVertices.current = [];
};
