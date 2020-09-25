/* eslint-disable object-curly-newline */

import { Face3, Geometry, Group, Mesh, MeshPhongMaterial, Vector3 } from 'three';

const count = 600;
const vertexMax = 10;
const vertexMin = 3;

export default () => {
  const getVertexRandom = () => (
    Math.random() * (vertexMax - vertexMin) + vertexMin
  );

  const fragments = new Group();

  const material = new MeshPhongMaterial({ color: 0x0000ff });
  material.opacity = 0.2;

  for (let i = 0; i < count; i += 1) {
    const geometry = new Geometry();

    geometry.vertices.push(
      new Vector3(-getVertexRandom(), 0, 0),
      new Vector3(0, 0, getVertexRandom()),
      new Vector3(getVertexRandom(), 0, 0),
      new Vector3(0, getVertexRandom(), 0),
    );

    geometry.faces.push(
      new Face3(0, 1, 3),
      new Face3(1, 2, 3),
      new Face3(2, 0, 3),
      new Face3(0, 2, 1),
    );

    geometry.computeFaceNormals();

    const fragment = new Mesh(geometry, material);

    const rotationAxis = new Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
    ).normalize();

    fragment.rotateOnAxis(rotationAxis, Math.random() * Math.PI);

    const translationAxis = new Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
    ).normalize();

    fragment.userData = { rotationAxis, translationAxis };

    fragments.add(fragment);
  }

  return fragments;
};
