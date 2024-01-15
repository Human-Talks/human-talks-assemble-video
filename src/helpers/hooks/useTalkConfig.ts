import { useEffect, useState } from "react"
import { TalkConfig } from "../../types/TalkConfig"
import { getInputProps, staticFile } from "remotion"

export const useTalkConfig = () => {
  const [talkConfig, setTalkConfig] = useState<TalkConfig | undefined>(undefined)

  useEffect(() => {
    const doThing = async () => {
      const config = await fetchTalkConfig()

      setTalkConfig(config)
    }

    doThing()
  }, [])

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

  const config = JSON.parse(configString) as TalkConfig

  return config
}
