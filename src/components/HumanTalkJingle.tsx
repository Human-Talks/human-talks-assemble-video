import React from "react"
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion"

import { toDurationInFrames } from "../helpers/durationConvertion"
import { useAssetMetadata } from "../helpers/hooks/useAssetMetadata"

export const HumanTalkJingle = () => {
  const jingle = useJingle()

  if (!jingle) {
    return null
  }

  return (
    <Sequence durationInFrames={jingle.durationInFrames}>
      <AbsoluteFill style={{
        alignItems: "center",
        top: "0%"
      }}>
        <OffthreadVideo src={jingle.src} />
      </AbsoluteFill>
    </Sequence>
  )
}

export const useJingle = () => {
  const jingle = staticFile("/assets/jingle_humantalks.mp4")

  const jingleMetadata = useAssetMetadata(jingle)

  if (!jingleMetadata) {
    return null
  }

  const durationInFrames = toDurationInFrames(jingleMetadata.durationInSeconds)

  return {
    src: jingle,
    durationInFrames
  }
}
