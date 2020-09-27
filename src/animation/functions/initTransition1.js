export default (args) => {
  const {
    cameraRotationMM,
    facesDispMD,
    facesDispMM,
    facesDispMU,
    handlers,
    light,
    particles,
    progressMD,
    progressMU,
    rock,
    rockRotationMD,
    rockRotationMM,
    rockRotationMU,
    rockScaleMD,
    rockScaleMU,
    scene,
    setStep,
    updateRockRotation,
  } = args;

  return () => {
    setStep(1);

    handlers.MD = [facesDispMD, progressMD, rockRotationMD, rockScaleMD];
    handlers.MM = [cameraRotationMM, facesDispMM, rockRotationMM];
    handlers.MU = [facesDispMU, progressMU, rockRotationMU, rockScaleMU];
    handlers.updaters = [updateRockRotation];

    scene.add(light);
    scene.add(particles);
    scene.add(rock);
  };
};
