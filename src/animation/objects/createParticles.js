/* eslint-disable object-curly-newline */

import { Group, Sprite, SpriteMaterial, TextureLoader } from 'three';

import { fov as cameraFov, position as cameraPosition } from './createCamera';
import { maxAngle as cameraMaxAngle } from '../functions/initCameraRotation';

import Particle50PNG from '../../static/images/50.png';
import Particle70PNG from '../../static/images/70.png';
import Particle100PNG from '../../static/images/100.png';

const particleEvery = 1800;
const particleMaxScale = 8;
const particlePosZ = -200;
const yIntercept = 20;

// CAMERA FOV
const cameraFovVRad = cameraFov * (Math.PI / 180);
const cameraFovHRad = cameraFovVRad * (window.innerWidth / window.innerHeight);

// CAMERA MAX X/Z
const cameraMaxX = Math.sin(cameraMaxAngle) * cameraPosition[2];
const cameraMaxZ = Math.sqrt(cameraPosition[2] ** 2 - cameraMaxX ** 2);

// SEE "EUREKA" PAPER (BA2)
const maxAngleBAC = 85 * (Math.PI / 180); // Fallback for very wide screens
const angleOAC = cameraFovHRad / 2;
const angleBAC = Math.min(angleOAC + cameraMaxAngle, maxAngleBAC);
const BC = Math.tan(angleBAC) * (cameraMaxZ + -particlePosZ);

const maxX = BC - cameraMaxX;
const maxY = Math.tan(cameraFovVRad / 2) * (cameraPosition[2] + -particlePosZ);

export { maxX, maxY };

export default () => {
  const images = [Particle50PNG, Particle70PNG, Particle100PNG];

  const textureLoader = new TextureLoader();

  const materials = images.map((image) => (
    new SpriteMaterial({ map: textureLoader.load(image) })
  ));

  const count = (maxX * maxY) / particleEvery + yIntercept;

  const particles = new Group();

  for (let i = 0; i < count; i += 1) {
    const particle = new Sprite(materials[i % materials.length]);
    const x = (Math.random() * 2 - 1) * maxX;
    const y = (Math.random() * 2 - 1) * maxY;
    particle.position.set(x, y, particlePosZ);
    const scale = Math.random() * particleMaxScale;
    particle.scale.set(scale, scale, scale);
    particles.add(particle);
  }

  return [particles, materials];
};
