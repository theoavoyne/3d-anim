import React, { useRef } from 'react';
import styled from 'styled-components';

import useAnim from '../hooks/useAnim';

const Canvas = styled.canvas``;

const App = () => {
  const canvasRef = useRef();

  useAnim(canvasRef);

  return <Canvas ref={canvasRef} />;
};

export default App;
