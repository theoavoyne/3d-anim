/* eslint-disable object-curly-newline */

import { Vector2 } from 'three';

export default ({ camera, MD, MM, MU, raycaster, scene }) => {
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
    const intersect = getIntersect(e.clientX, e.clientY);
    MD.forEach((func) => { func(intersect); });
  };

  const onMouseMove = (e) => {
    const intersect = getIntersect(e.clientX, e.clientY);
    MM.forEach((func) => { func(intersect, mouseDown); });
  };

  const onMouseUp = (e) => {
    mouseDown = false;
    const intersect = getIntersect(e.clientX, e.clientY);
    MU.forEach((func) => { func(intersect); });
  };

  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  return () => {
    window.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };
};
