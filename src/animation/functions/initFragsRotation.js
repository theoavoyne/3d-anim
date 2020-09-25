const delta = Math.PI / 10;

export default (fragments) => {
  const update = (timeDelta) => {
    fragments.children.forEach((fragment) => {
      const angle = delta * (timeDelta / 1000);
      const axis = fragment.userData.rotationAxis;
      fragment.rotateOnAxis(axis, angle);
    });
  };

  return { update };
};
