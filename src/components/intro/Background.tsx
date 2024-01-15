import React from "react"
import { AbsoluteFill, Img, staticFile } from "remotion"
 
export const Background = () => {
  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <Img
          src={staticFile("/assets/intro_background.png")} 
          placeholder="speaker"
        />
      </AbsoluteFill>
      <AbsoluteFill style={{
        backgroundColor: "#790257",
        opacity: 0.7
      }} />
    </AbsoluteFill>
  )
}
