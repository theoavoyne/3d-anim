import { gsap } from 'gsap';
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

    const render = () => { renderer.render(scene, camera); };

    const animate = () => {
      render();
      requestAnimationFrame(animate);
    };

    animate();

    gsap.to(rock.rotation, {
      duration: 10,
      ease: 'none',
      repeat: -1,
      x: Math.PI * 2,
      y: Math.PI * 2,
    });
  }, []);
};
