import { useEffect, useState } from "react"
import { TalkConfig, TalkJson } from "../../types/TalkConfig"
import { continueRender, delayRender, getInputProps, staticFile } from "remotion"
import { getVideoMetadata } from "@remotion/media-utils"
import { TalkVideo } from "../../types/TalkVideo"
import { toDurationInFrames } from "../durationConvertion"

export const useTalkConfig = () => {
  const [talkConfig, setTalkConfig] = useState<TalkConfig | undefined>(undefined)
  const [handle] = useState(() => delayRender())

  useEffect(() => {
    const doThing = async () => {
      const config = await fetchTalkConfig()

      const videos = await extractVideosMetadata(config.videos)

      setTalkConfig({
        ...config,
        videos
      })
      continueRender(handle)
    }

    doThing()
  }, [handle])

  if (!talkConfig) {
    return null
  }

  return talkConfig
}

const fetchTalkConfig = async () => {
  const { talk } = getInputProps()

  const talkConfigPath = `/talks/${talk}/talk.json`
  const talkConfigFile = staticFile(talkConfigPath)

  const configResult = await fetch(talkConfigFile)
  const configString = await configResult.text()

  const config = JSON.parse(configString) as TalkJson

  return config
}

const extractVideosMetadata = async (videos: string[]) => {
  const output: TalkVideo[] = []
  for (const video of videos) {
    try {
      const videoFile = staticFile(video)
      const metadata = await getVideoMetadata(videoFile)
  
      output.push({
        src: videoFile,
        durationInSeconds: metadata.durationInSeconds,
        durationInFrames: toDurationInFrames(metadata.durationInSeconds)
      })
    } catch (e) {
      console.warn('Missing Video, may be normal when generating thumbnail')
    }
  }

  return output
}
