import React from "react"
import { loadFont } from "@remotion/google-fonts/Roboto"

import { AbsoluteFill, Img, staticFile } from "remotion"
import { useTalkConfig } from "./helpers/hooks/useTalkConfig"
import { TalkConfig } from "./types/TalkConfig"
import { Speaker } from "./types/Speaker"

const DEBUG = false

const { fontFamily } = loadFont()

export const MyThumbnail = () => {
  const talkConfig = useTalkConfig()

	if (!talkConfig) {
		return null
	}

	return (
		<>
      <AbsoluteFill>
        <AbsoluteFill>
          <Img
            src={staticFile("/assets/thumbnail_background.png")} 
            placeholder="speaker"
          />
        </AbsoluteFill>
        <AbsoluteFill style={{
          backgroundColor: "#790257",
          opacity: 0.7
        }} />
        <AbsoluteFill>
          <Img
            src={staticFile("/assets/thumbnail_logo.svg")} 
            placeholder="human talks logo"
            style={{
              position: "absolute",
              color: "white",
              width: "30%",
              top: "100px",
              left: "80px",
              opacity: '0.8'
            }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
      <div style={{
        position: "absolute",
        color: "#FFFFFF",
        fontFamily,
        fontSize: "80px",
        fontWeight: 600,
        top: '500px',
        left: '180px',
        width: "1000px",
        background: DEBUG ? "blue" : "transparent"
      }}>
        <span>{talkConfig.title}</span>
      </div>
      
      <Speakers talkConfig={talkConfig}/>

      <div style={{
        position: "absolute",
        color: "#FFFFFF",
        fontFamily,
        fontSize: "30px",
        fontWeight: 600,
        bottom: '10px',
        left: '20px',
        width: "1500px",
        background: DEBUG ? "red" : "transparent"
      }}>
        Session du {talkConfig.eventInfo.date} - Sponsorisée par {talkConfig.eventInfo.place}
      </div>
    </>
	)
}

const Speakers = ({talkConfig}: {talkConfig: TalkConfig}) => {
  return talkConfig.speakers.map((speaker) => {
    return <SpeakerItem speaker={speaker} />
  })
}

const SpeakerItem = ({speaker}: {speaker: Speaker}) => {
  const totalWitdh = 450
  const picWitdh = 280
  const titleOffset = picWitdh/8
  return (
    <>
      <div
        style={{
          position: "absolute",
          color: "#FFFFFF",
          fontFamily,
          fontSize: "40px",
          fontWeight: 600,
          top: '300px',
          right: '120px',
          width: `${totalWitdh}px`,
          textAlign: "right",
          background: DEBUG ? "green" : "transparent"
        }}
      >
        <Img
          style={{
            border: "4px solid white",
            borderRadius: "50%",
            marginBottom: "50px"
          }}
          src={staticFile(speaker.pic)}
          placeholder="speaker"
          width={`${picWitdh}px`}
        />
        <div
          style={{
            marginRight: `${titleOffset}px`,
            marginBottom: '10px'
          }}
        >
          {speaker.name}
        </div>
        {speaker.company ? (
          <div
            style={{
              marginRight: `${titleOffset}px`,
              fontWeight: 400,
              fontSize: "35px",
              fontStyle: "italic"
            }}
          >
            {speaker.company}
          </div>
        ) : null}
      </div>
    </>
  )
}