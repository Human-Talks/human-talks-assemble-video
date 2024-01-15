import { loadFont } from "@remotion/google-fonts/Roboto"
import React from 'react'
import { interpolate,useCurrentFrame } from 'remotion'

import { EventInfo as EventInfoType } from '../../types/EventInfo'

const { fontFamily } = loadFont()

export const EventInfo = ({ city, date, place }: EventInfoType) => {
  const frame = useCurrentFrame()
  const top = interpolate(frame, [0, 5], [60, 0], { extrapolateRight: "clamp" })

  return (
    <div style={{
      position: "absolute",
      color: "#FFFFFF",
      fontFamily,
      fontSize: "40px",
      fontWeight: 600,
      top: `${top}px`,
      display: "flex",
      justifyContent: "center",
      gap: "10%",
      width: "100%"
    }}>
      <span>{ city }</span>
      <span>📍 { place }</span>
      <span>🗓️ { date }</span>
    </div>
  )
}
