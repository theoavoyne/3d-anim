import {
  FaceColors,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
} from 'three';

import computeDisplacement from '../functions/computeDisplacement';

const heightSegments = 24;
const radius = 40;
const vertexColors = FaceColors;
const widthSegments = 24;

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

export default new Mesh(geometry, material);
