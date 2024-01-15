import React from "react"
import { Sequence } from "remotion"
import { HumanTalkJingle, useJingle } from "./components/HumanTalkJingle"

export const MyComposition = () => {
	const jingle = useJingle()

	if (!jingle) {
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
		</>
	)
}
