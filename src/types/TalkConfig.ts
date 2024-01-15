import { EventInfo } from "./EventInfo"
import { Speaker } from "./Speaker"
import { TalkVideo } from "./TalkVideo"

export interface TalkJson {
  title: string
  description: string
  speakers: Speaker[]
  eventInfo: EventInfo
  videos: string[]
}

export type TalkConfig = Omit<TalkJson, 'videos'> & {
  videos: TalkVideo[]
}
