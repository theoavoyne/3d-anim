/* eslint-disable no-param-reassign */

import {
  FaceColors,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
} from 'three';

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
  const { x: oldX, y: oldY, z: oldZ } = vertex;
  const randDist = (Math.random() - 0.5) * 5;
  if (oldX !== 0) {
    const dX = randDist / Math.sqrt(1 + (oldY ** 2 + oldZ ** 2) / oldX ** 2);
    vertex.x = oldX + (oldX / Math.abs(oldX)) * dX;
    vertex.y = ((oldY * (vertex.x - oldX)) / oldX) + oldY;
    vertex.z = ((oldZ * (vertex.x - oldX)) / oldX) + oldZ;
  } else {
    vertex.y += randDist;
  }
});

export default new Mesh(geometry, material);
