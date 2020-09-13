/* eslint-disable no-param-reassign */

export default (rock, rockRotationDeltas, timeDelta) => {
  rock.rotation.x += rockRotationDeltas.x * timeDelta;
  rock.rotation.y += rockRotationDeltas.y * timeDelta;
};
