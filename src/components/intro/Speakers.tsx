import { loadFont } from "@remotion/google-fonts/Roboto"
import React from 'react'
import { Img, interpolate, staticFile, useCurrentFrame } from 'remotion'

import { Speaker as SpeakerType } from '../../types/Speaker'

const { fontFamily } = loadFont()

type SpeakersProps = {
  speakers: SpeakerType[]
}

export const Speakers = ({ speakers }: SpeakersProps) => {
  const frame = useCurrentFrame()
  const top = interpolate(frame, [0, 10], [420, 0], { extrapolateRight: "clamp" })

  return (
    <div style={{
      position: "absolute",
      display: "flex",
      gap: "160px",
      height: "30%",
      justifyContent: "center",
      top: `${top}px`
    }}>
      { speakers.map(speaker =>
        <Speaker
          key={speaker.id}
          name={speaker.name}
          pic={speaker.pic}
        />
      )}  
    </div>
  )
}

type SpeakerProps = {
  name: string
  pic: string
}

const Speaker = ({ name, pic }: SpeakerProps) => {
  return (
    <div style={{
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      gap: "28px",
      width: "100%"
    }}>
      <Img
        style={{
          border: "4px solid white",
          borderRadius: "50%"
        }}
        src={staticFile(pic)}
        placeholder="speaker"
        width="100%"
      />
      <div style={{
        color: "white",
        fontFamily,
        fontSize: "32px",
        textAlign: "center"
      }}>
        { name }
      </div>
    </div>
  )
}
