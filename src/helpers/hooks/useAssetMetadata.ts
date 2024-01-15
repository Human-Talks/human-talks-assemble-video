import { VideoMetadata, getVideoMetadata } from "@remotion/media-utils"
import { useEffect, useState } from "react"

export const useAssetMetadata = (staticFile: string) => {
  const [introMetadata, setIntroMetadata] = useState<null | VideoMetadata>(null)

  useEffect(() => {
    const doThing = async () => {
      const result = await getVideoMetadata(staticFile)
      console.log('introMetadata', result.durationInSeconds)
      setIntroMetadata(result)
    }

    doThing()
  }, [staticFile])

  return introMetadata
}
