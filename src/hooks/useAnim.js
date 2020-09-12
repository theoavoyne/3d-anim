import { gsap } from 'gsap';
import pick from 'lodash.pick';
import { useEffect } from 'react';

import camera from '../animation/camera';
import createRenderer from '../animation/createRenderer';
import displaceVertex from '../animation/displaceVertex';
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

    const animatedVertices = {};

    let windowBlurred = false;

    setInterval(() => {
      if (!windowBlurred) {
        let counter = 0;

        while (counter !== 5) {
          const randFace = rock.geometry.faces[
            Math.floor(Math.random() * rock.geometry.faces.length)
          ];
          const vertexIndexes = Object.values(pick(randFace, ['a', 'b', 'c']));

          if (!vertexIndexes.some((index) => animatedVertices[index])) {
            const randDist = Math.random() * 20;
            vertexIndexes.forEach((index) => {
              animatedVertices[index] = true;
              const vertex = rock.geometry.vertices[index];
              const newPos = displaceVertex(vertex, randDist, false);
              gsap.to(vertex, {
                duration: 1,
                onComplete: () => { animatedVertices[index] = false; },
                onUpdate: () => { rock.geometry.verticesNeedUpdate = true; },
                repeat: 1,
                yoyo: true,
                ...newPos,
              });
            });

            counter += 1;
          }
        }
      }
    }, 500);

    const onWindowBlur = () => { windowBlurred = true; };
    const onWindowFocus = () => { windowBlurred = false; };

    window.addEventListener('blur', onWindowBlur);
    window.addEventListener('focus', onWindowFocus);

    return () => {
      window.removeEventListener('blur', onWindowBlur);
      window.removeEventListener('focus', onWindowFocus);
    };
  }, []);
};
