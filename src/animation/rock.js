import { Mesh, MeshPhongMaterial, SphereGeometry } from 'three';

const color = 0x0f0f0f;
const heightSegments = 16;
const radius = 40;
const widthSegments = 16;

const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
const material = new MeshPhongMaterial({ color });

export default new Mesh(geometry, material);
