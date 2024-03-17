import React from "react"
import { AbsoluteFill, OffthreadVideo, Sequence, useCurrentFrame } from "remotion"

import { useTalkConfig } from "../helpers/hooks/useTalkConfig"

export const Videos = () => {
  const videos = useVideos()
  const frame = useCurrentFrame()

  if (!videos) {
    return null
  }

  console.log('Current frame is', frame)

  return (
  <>
    {
      videos.videos.map(video => {
        return (
          <Sequence key={video.src} durationInFrames={video.durationInFrames}>
            <AbsoluteFill style={{
              alignItems: "center",
              top: "0%"
            }}>
              <OffthreadVideo src={video.src} />
            </AbsoluteFill>
          </Sequence>
        )
      })
    }
  </>
  )
}

export const useVideos = () => {
  const talkConfig = useTalkConfig()

  if (!talkConfig) {
    return null
  }

  const maxVideoDurationInFrames = Math.max(...talkConfig.videos.map(v => v.durationInFrames))

  return {
    videos: talkConfig.videos,
    maxVideoDurationInFrames
  }
}
