import { PerspectiveCamera } from 'three';

const aspect = window.innerWidth / window.innerHeight;
const far = 1000;
const fov = 90;
const near = 0.1;
const position = [0, 0, 100];

export default () => {
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(...position);

  return camera;
};
