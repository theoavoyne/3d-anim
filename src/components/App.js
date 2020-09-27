import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import useAnim from '../hooks/useAnim';

const Canvas = styled.canvas`
  left: 0;
  position: absolute;
  top: 0;
`;

const Instruction = styled.div`
  bottom: 6rem;
  color: blue;
  font-family: base-mono-wide;
  font-size: 1.25rem;
  font-weight: 300;
  left: 50%;
  opacity: ${({ show }) => (show ? 1 : 0)};
  position: absolute;
  transform: translateX(-50%);
  transition: opacity .3s;
`;

const LinkLikeButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  background: none;
  border: none;
  bottom: 6rem;
  color: blue;
  cursor: pointer;
  font-family: base-mono-wide;
  font-size: 1.25rem;
  font-weight: 300;
  left: 50%;
  padding: none;
  position: absolute;
  text-decoration: underline;
  transform: translateX(-50%);
  white-space: nowrap;
  &:focus { outline: none; }
`;

const Percent = styled.div.attrs(({ percent }) => ({
  style: { right: `${100 - percent}%` },
}))`
  color: blue;
  font-family: base-mono-wide;
  font-size: 1.25rem;
  font-weight: 300;
  opacity: ${({ percent }) => (percent > 1 ? 1 : 0)};
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

const StartButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  background: none;
  border: 1px solid blue;
  border-radius: 50%;
  bottom: 6rem;
  color: blue;
  cursor: pointer;
  font-family: base-mono-wide;
  font-size: 1.25rem;
  font-weight: 300;
  height: 7rem;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  width: 7rem;
  &:focus { outline: none; }
`;

const App = () => {
  const canvasRef = useRef();
  const onClickBeginRef = useRef();
  const onClickExitRef = useRef();

  const [percent, setPercent] = useState(0);
  const [step, setStep] = useState(0);

  useAnim(canvasRef, onClickBeginRef, onClickExitRef, setPercent, setStep);

  return (
    <React.Fragment>
      <Canvas ref={canvasRef} />
      {step === 0 && (
        <StartButton onClick={() => { onClickBeginRef.current(); }}>
          begin
        </StartButton>
      )}
      {step === 1 && (
        <React.Fragment>
          <Instruction show={percent < 1}>Tap and hold</Instruction>
          <ProgressBarContainer>
            <ProgressBar percent={percent} />
            <Percent percent={percent}>{Math.floor(percent)}%</Percent>
          </ProgressBarContainer>
        </React.Fragment>
      )}
      {step === 2 && (
        <LinkLikeButton onClick={() => { onClickExitRef.current(); }}>
          Enter the website
        </LinkLikeButton>
      )}
    </React.Fragment>
  );
};

export default App;
