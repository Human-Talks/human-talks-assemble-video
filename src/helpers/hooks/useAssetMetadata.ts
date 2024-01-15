import { VideoMetadata, getVideoMetadata } from "@remotion/media-utils"
import { useEffect, useState } from "react"
import { delayRender, continueRender } from "remotion"

export const useAssetMetadata = (staticFile: string) => {
  const [introMetadata, setIntroMetadata] = useState<null | VideoMetadata>(null)
  const [handle] = useState(() => delayRender())

  useEffect(() => {
    const doThing = async () => {
      const result = await getVideoMetadata(staticFile)
      console.log('introMetadata', result.durationInSeconds)
      setIntroMetadata(result)
      continueRender(handle)
    }

    doThing()
  }, [handle, staticFile])

  return introMetadata
}
