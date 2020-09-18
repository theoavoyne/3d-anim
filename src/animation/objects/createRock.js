import cloneDeep from 'lodash.clonedeep';
import {
  FaceColors,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
} from 'three';

import computeDisplacement from '../functions/computeDisplacement';

const heightSegments = 34;
const radius = 39;
const vertexColors = FaceColors;
const widthSegments = 34;

export default () => {
  const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
  const material = new MeshPhongMaterial({ vertexColors });

  geometry.faces.forEach((face) => {
    face.color.setRGB(Math.random(), Math.random(), Math.random());
  });

  geometry.vertices.forEach((vertex) => {
    const randDist = (Math.random() - 0.5) * 5;
    const newPos = computeDisplacement(vertex, randDist);
    Object.assign(vertex, newPos);
  });

  const rock = new Mesh(geometry, material);

  return [rock, cloneDeep(rock.geometry.vertices)];
};
