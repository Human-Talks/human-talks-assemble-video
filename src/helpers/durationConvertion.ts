const VIDEO_FRAMERATE = 30

export const toDurationInFrames = (durationInSeconds: number) => {
  return durationInSeconds * VIDEO_FRAMERATE
}

export const toDurationInSeconds = (durationInFrames: number) => {
  return durationInFrames / VIDEO_FRAMERATE
}
