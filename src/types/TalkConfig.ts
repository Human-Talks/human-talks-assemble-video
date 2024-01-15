import { EventInfo } from "./EventInfo"
import { Speaker } from "./Speaker"

export interface TalkConfig {
  title: string
  description: string
  speakers: Speaker[]
  eventInfo: EventInfo
  videos: string[]
}
