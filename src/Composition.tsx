import React from "react"
import { HumanTalkJingle, useJingle } from "./components/HumanTalkJingle"

export const MyComposition = () => {
	const jingle = useJingle()

	if (!jingle) {
		return null
	}

	return (
		<>
			<HumanTalkJingle />
		</>
	)
}
