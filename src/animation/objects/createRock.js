import cloneDeep from 'lodash.clonedeep';
import {
  FaceColors,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
} from 'three';

import computeDisplacement from '../functions/computeDisplacement';

const heightSegments = 28;
const radius = 37;
const vertexColors = FaceColors;
const widthSegments = 28;

export default () => {
  const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
  const material = new MeshPhongMaterial({ vertexColors });

  geometry.faces.forEach((face) => {
    face.color.setRGB(Math.random(), Math.random(), Math.random());
  });

  geometry.vertices.forEach((vertex) => {
    const randDist = (Math.random() - 0.5) * 6;
    const newPos = computeDisplacement(vertex, randDist);
    Object.assign(vertex, newPos);
  });

  const rock = new Mesh(geometry, material);

  return [rock, cloneDeep(rock.geometry.vertices)];
};
