import { PointLight } from 'three';

const color = 0xffffff;
const position = [50, 50, 100];

const light = new PointLight(color);
light.position.set(...position);

export default light;
