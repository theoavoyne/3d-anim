import { Sprite, SpriteMaterial, TextureLoader } from 'three';

import Particle100PNG from '../../static/images/100.png';

const scale = 78;

export default () => {
  const material = new SpriteMaterial({
    map: new TextureLoader().load(Particle100PNG),
  });

  const door = new Sprite(material);
  door.scale.set(scale, scale, scale);

  return door;
};
