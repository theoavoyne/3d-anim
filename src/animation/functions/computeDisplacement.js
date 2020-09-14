export default (vertex, dist) => {
  const newPos = {};
  const { x: oldX, y: oldY, z: oldZ } = vertex;

  if (oldX !== 0) {
    const dX = dist / Math.sqrt(1 + (oldY ** 2 + oldZ ** 2) / oldX ** 2);
    newPos.x = oldX + (oldX / Math.abs(oldX)) * dX;
    newPos.y = ((oldY * (newPos.x - oldX)) / oldX) + oldY;
    newPos.z = ((oldZ * (newPos.x - oldX)) / oldX) + oldZ;
  } else {
    newPos.x = oldX;
    newPos.y = oldY + (oldY > 0 ? dist : -dist);
    newPos.z = oldZ;
  }

  return newPos;
};
