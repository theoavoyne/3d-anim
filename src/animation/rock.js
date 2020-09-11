import { Mesh, MeshPhongMaterial, SphereGeometry } from 'three';

const heightSegments = 16;
const radius = 40;
const vertexColors = true;
const widthSegments = 16;

const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
const material = new MeshPhongMaterial({ vertexColors });

geometry.faces.forEach((face) => {
  face.color.setRGB(Math.random(), Math.random(), Math.random());
});

export default new Mesh(geometry, material);
