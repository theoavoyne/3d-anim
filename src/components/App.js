import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import useAnim from '../hooks/useAnim';

const Canvas = styled.canvas`
  left: 0;
  position: absolute;
  top: 0;
`;

const Percent = styled.div.attrs(({ percent }) => ({
  style: { right: `${100 - percent}%` },
}))`
  color: blue;
  font-family: base-mono-wide;
  font-size: 1.25rem;
  font-weight: 300;
  opacity: ${({ percent }) => (Math.floor(percent) > 0 ? 1 : 0)};
  position: absolute;
  top: -.5rem;
  transform: translate(50%, -100%);
  transition: opacity .3s;
`;

const ProgressBar = styled.div.attrs(({ percent }) => ({
  style: { right: `${100 - percent}%` },
}))`
  background: blue;
  bottom: 0;
  left: 0;
  position: absolute;
  top: 0;
`;

const ProgressBarContainer = styled.div`
  background: #E0E0E0;
  bottom: 3rem;
  height: 4px;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  width: 40vw;
  @media (max-width: 992px) { width: 80vw; }
`;

const App = () => {
  const canvasRef = useRef();

  const [percent, setPercent] = useState();

  useAnim(canvasRef, setPercent);

  return (
    <React.Fragment>
      <Canvas ref={canvasRef} />
      <ProgressBarContainer>
        <ProgressBar percent={percent} />
        <Percent percent={percent}>{Math.floor(percent)}%</Percent>
      </ProgressBarContainer>
    </React.Fragment>
  );
};

export default App;
