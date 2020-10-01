/* eslint-disable object-curly-newline */

import debounce from 'lodash.debounce';
import { Vector2 } from 'three';

export const touchDevice = 'ontouchstart' in window;

export default (args) => {
  const {
    camera,
    canvasRef,
    handlers,
    renderer,
    raycaster,
    scene,
  } = args;

  let mouseDown = false;

  const getIntersect = (clientX, clientY) => {
    const mouse = new Vector2();
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    return intersects[intersects.length - 1];
  };

  const onDeviceOrientation = (e) => {
    handlers.DO.forEach((func) => { func(e); });
  };

  const onMouseDown = (e) => {
    mouseDown = true;

    let intersect;

    if (touchDevice) {
      intersect = getIntersect(e.touches[0].clientX, e.touches[0].clientY);
      e.preventDefault();
    } else {
      intersect = getIntersect(e.clientX, e.clientY);
    }

    handlers.MD.forEach((func) => { func(intersect, e); });
  };

  const onMouseMove = (e) => {
    let intersect;

    if (touchDevice) {
      intersect = getIntersect(e.touches[0].clientX, e.touches[0].clientY);
    } else {
      intersect = getIntersect(e.clientX, e.clientY);
    }

    handlers.MM.forEach((func) => { func(intersect, mouseDown, e); });
  };

  const onMouseUp = (e) => {
    mouseDown = false;

    let intersect;

    if (!touchDevice) {
      intersect = getIntersect(e.clientX, e.clientY);
    }

    handlers.MU.forEach((func) => { func(intersect, e); });
  };

  const onResize = debounce(
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    150,
  );

  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  if (touchDevice) {
    canvasRef.current.addEventListener('touchstart', onMouseDown, { passive: false });
    canvasRef.current.addEventListener('touchmove', onMouseMove);
    canvasRef.current.addEventListener('touchend', onMouseUp);
  } else {
    canvasRef.current.addEventListener('mousedown', onMouseDown);
    canvasRef.current.addEventListener('mousemove', onMouseMove);
    canvasRef.current.addEventListener('mouseup', onMouseUp);
  }

  return [
    onDeviceOrientation,
    () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);

      if (touchDevice) {
        window.removeEventListener('deviceorientation', onDeviceOrientation);
        canvasRef.current.removeEventListener('touchstart', onMouseDown);
        canvasRef.current.removeEventListener('touchmove', onMouseMove);
        canvasRef.current.removeEventListener('touchend', onMouseUp);
      } else {
        canvasRef.current.removeEventListener('mousedown', onMouseDown);
        canvasRef.current.removeEventListener('mousemove', onMouseMove);
        canvasRef.current.removeEventListener('mouseup', onMouseUp);
      }
    },
  ];
};
