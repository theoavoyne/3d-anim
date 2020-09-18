/* eslint-disable object-curly-newline */

import { Group, Sprite, SpriteMaterial, TextureLoader } from 'three';

import { fov as cameraFov, position as cameraPosition } from './createCamera';
import { radius as rockRadius } from './createRock';

import PointPNG from '../../static/images/point.png';

const particleEvery = 30000;

export default () => {
  const count = (window.innerWidth * window.innerHeight) / particleEvery;
  const maxY = Math.tan((cameraFov / 2) * (Math.PI / 180)) * cameraPosition[2];
  const maxX = maxY * (window.innerWidth / window.innerHeight);

  const material = new SpriteMaterial({
    map: new TextureLoader().load(PointPNG),
  });

  const particles = new Group();

  for (let i = 0; i < count; i += 1) {
    let x = 0;
    let y = 0;

    while (
      x < rockRadius
      && x > -rockRadius
      && y < rockRadius
      && y > -rockRadius
    ) {
      x = (Math.random() * 2 - 1) * maxX;
      y = (Math.random() * 2 - 1) * maxY;
    }

    const particle = new Sprite(material);
    particle.position.set(x, y, 0);
    const scale = Math.random() * 3;
    particle.scale.set(scale, scale, scale);
    particles.add(particle);
  }

  return particles;
};
