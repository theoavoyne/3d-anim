import { Sprite, SpriteMaterial, TextureLoader } from 'three';

import DoorPNG from '../../static/images/door.png';

const scale = 156;

export default () => {
  const material = new SpriteMaterial({
    map: new TextureLoader().load(DoorPNG),
  });

  const door = new Sprite(material);
  door.scale.set(scale, scale, scale);

  return door;
};
