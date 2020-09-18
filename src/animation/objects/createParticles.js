/* eslint-disable object-curly-newline */

import { Group, Sprite, SpriteMaterial, TextureLoader } from 'three';

import { fov as cameraFov, position as cameraPosition } from './createCamera';

import PointPNG from '../../static/images/point.png';

const particleEvery = 30000;
const particleMaxScale = 8;
const particlePositionZ = -100;

const maxY = (
  Math.tan((cameraFov / 2) * (Math.PI / 180))
  * (cameraPosition[2] + -particlePositionZ)
);
const maxX = maxY * (window.innerWidth / window.innerHeight);

export { maxX, maxY };

export default () => {
  const count = (window.innerWidth * window.innerHeight) / particleEvery;

  const material = new SpriteMaterial({
    map: new TextureLoader().load(PointPNG),
  });

  const particles = new Group();

  for (let i = 0; i < count; i += 1) {
    const particle = new Sprite(material);
    const x = (Math.random() * 2 - 1) * maxX;
    const y = (Math.random() * 2 - 1) * maxY;
    particle.position.set(x, y, particlePositionZ);
    const scale = Math.random() * particleMaxScale;
    particle.scale.set(scale, scale, scale);
    particles.add(particle);
  }

  return particles;
};
