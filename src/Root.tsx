import React from 'react'
import {Composition, Still} from 'remotion'

import {MyComposition} from './Composition'
import {MyThumbnail} from './Thumbnail'
import { useVideos } from './components/Videos'
import { useJingle } from './components/HumanTalkJingle'
import { INTRO_DURATION_IN_FRAMES } from './components/intro/Intro'

export const RemotionRoot: React.FC = () => {
	const videos = useVideos()
	const jingle = useJingle()

	if (!videos || !jingle) {
		return null
	}
	
	const totalDuration = Math.round(
		jingle.durationInFrames * 2 + INTRO_DURATION_IN_FRAMES + videos.maxVideoDurationInFrames
	)

	return (
		<>
			<Composition
				id="HumanTalksAssembleVideo"
				component={MyComposition}
				durationInFrames={totalDuration}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Still
				id="HumanTalksAssembleThumbnail"
				component={MyThumbnail}
				width={1920}
				height={1080}
			/>
		</>
	)
}
