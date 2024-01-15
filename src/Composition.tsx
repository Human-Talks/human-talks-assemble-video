import React from "react"
import { Sequence } from "remotion"
import { HumanTalkJingle, useJingle } from "./components/HumanTalkJingle"
import { INTRO_DURATION_IN_FRAMES, TalkIntro } from "./components/intro/Intro"
import { Videos, useVideos } from "./components/Videos"

export const MyComposition = () => {
	const videos = useVideos()
	const jingle = useJingle()

	if (!videos || !jingle) {
		return null
	}

	return (
		<>
			<HumanTalkJingle />

			<Sequence
				from={jingle.durationInFrames}
				durationInFrames={INTRO_DURATION_IN_FRAMES}
			>
				<TalkIntro />
			</Sequence>

			<Sequence
				from={jingle.durationInFrames + INTRO_DURATION_IN_FRAMES}
				durationInFrames={videos.maxVideoDurationInFrames}
			>
				<Videos />
			</Sequence>
		</>
	)
}
