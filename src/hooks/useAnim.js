/* eslint-disable object-curly-newline */

import { gsap } from 'gsap';
import { useEffect } from 'react';
import { Vector2 } from 'three';

import createCamera from '../animation/objects/createCamera';
import createLight from '../animation/objects/createLight';
import createRaycaster from '../animation/objects/createRaycaster';
import createRenderer from '../animation/objects/createRenderer';
import createRock from '../animation/objects/createRock';
import createScene from '../animation/objects/createScene';
import makeProminence from '../animation/functions/makeProminence';
import resetAllVertices from '../animation/functions/resetAllVertices';
import updateRockRotation from '../animation/functions/updateRockRotation';

export default (canvasRef) => {
  useEffect(() => {
    const camera = createCamera();
    const light = createLight();
    const raycaster = createRaycaster();
    const renderer = createRenderer(canvasRef.current);
    const [rock, originalVertices] = createRock();
    const scene = createScene();

    const animatedVertices = { current: [] };
    let prevTime = 0;
    const rockRotationDeltas = { x: Math.PI / 15000, y: Math.PI / 7500 };

    scene.add(light);
    scene.add(rock);

    const animate = (time) => {
      const timeDelta = time - prevTime;
      prevTime = time;
      renderer.render(scene, camera);
      updateRockRotation(rock, rockRotationDeltas, timeDelta);
      requestAnimationFrame(animate);
    };

    animate(0);

    // USER INTERACTION

    const onMouseMove = (e) => {
      const mouse = new Vector2();
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      intersects.forEach((intersect) => {
        const { face } = intersect;
        makeProminence({ animatedVertices, face, rock });
      });
    };

    const onMouseUp = () => {
      resetAllVertices({ animatedVertices, originalVertices, rock });
      gsap.killTweensOf(rock.scale);
      gsap.to(rock.scale, { duration: 1, x: 1, y: 1, z: 1 });
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseDown = () => {
      gsap.killTweensOf(rock.scale);
      gsap.to(rock.scale, { duration: 6, x: 1.3, y: 1.3, z: 1.3 });
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousedown', onMouseDown);
  }, []);
};
