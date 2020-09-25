/* eslint-disable object-curly-newline */

import { Vector2 } from 'three';

const touchDevice = 'ontouchstart' in window;

export default ({ camera, handlers, raycaster, scene }) => {
  let mouseDown = false;

  const getIntersect = (clientX, clientY) => {
    const mouse = new Vector2();
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    return intersects[intersects.length - 1];
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

  if (touchDevice) {
    window.addEventListener('touchstart', onMouseDown, { passive: false });
    window.addEventListener('touchmove', onMouseMove);
    window.addEventListener('touchend', onMouseUp);
  } else {
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  return () => {
    if (touchDevice) {
      window.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
    } else {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
  };
};
