import React from "react"
import { AbsoluteFill, OffthreadVideo, Sequence } from "remotion"

import { useTalkConfig } from "../helpers/hooks/useTalkConfig"

export const Videos = () => {
  const videos = useVideos()

  if (!videos) {
    return null
  }

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
