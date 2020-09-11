import { useEffect } from 'react';

import camera from '../animation/camera';
import createRenderer from '../animation/createRenderer';
import light from '../animation/light';
import rock from '../animation/rock';
import scene from '../animation/scene';

export default (canvasRef) => {
  useEffect(() => {
    scene.add(light);
    scene.add(rock);
    const renderer = createRenderer(canvasRef.current);
    renderer.render(scene, camera);
  }, []);
};
