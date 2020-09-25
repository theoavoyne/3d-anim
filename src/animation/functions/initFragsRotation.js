/* eslint-disable no-param-reassign */

const individualDelta = Math.PI / 8;
const groupDeltaX = Math.PI / 128;
const groupDeltaY = Math.PI / 64;

export default (fragments) => {
  const update = (timeDelta) => {
    fragments.children.forEach((fragment) => {
      const angle = individualDelta * (timeDelta / 1000);
      const axis = fragment.userData.rotationAxis;
      fragment.rotateOnAxis(axis, angle);
    });
    fragments.rotation.x += groupDeltaX * (timeDelta / 1000);
    fragments.rotation.y += groupDeltaY * (timeDelta / 1000);
  };

  return { update };
};
