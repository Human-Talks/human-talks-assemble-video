import React from "react"
import { AbsoluteFill, Sequence } from "remotion"

import { toDurationInFrames } from "../../helpers/durationConvertion"
import { useTalkConfig } from "../../helpers/hooks/useTalkConfig"
import { Background } from "./Background"
import { EventInfo } from "./EventInfo"
import { Speakers } from "./Speakers"
import { Title } from "./Title"

export const INTRO_DURATION_IN_FRAMES = toDurationInFrames(4)


export const TalkIntro = () => {
  const talkConfig = useTalkConfig()

  if (!talkConfig) {
    return null
  }

  return (
    <>
      <Sequence durationInFrames={INTRO_DURATION_IN_FRAMES}>
        <Background />
      </Sequence>

      <Sequence from={15} durationInFrames={INTRO_DURATION_IN_FRAMES - 15}>
        <AbsoluteFill style={{
          alignItems: "center",
          top: "32%",
        }}>
          <div style={{
            width: "80%"
          }}>
            <Title text={talkConfig.title}/>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={30} durationInFrames={INTRO_DURATION_IN_FRAMES - 30}>
        <AbsoluteFill style={{
          alignItems: "center",
          top: "58%",
        }}>
          <Speakers speakers={talkConfig.speakers} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={38} durationInFrames={INTRO_DURATION_IN_FRAMES - 38}>
        <AbsoluteFill style={{
          alignItems: "center",
          top: "95%"
        }}>
          <EventInfo {...talkConfig.eventInfo} />
        </AbsoluteFill>
      </Sequence>
    </>
  )
}
