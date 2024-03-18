import { parse } from 'node-html-parser'
import { prepareTalk } from './prepareTalk'

const CITY_BASE_URL = 'https://humantalks.com/cities'
const EVENT_URL_PATH = 'events'

export const prepareEvent = async (cityName:string, eventId: string) => {
  const pageContent = await fetchEvent(cityName, eventId)
  const event = parseEvent(pageContent)  

  for (const talkId of event.talks) {
    await prepareTalk(talkId, event.sponsor)
  }

  console.log('\nTo generate thumbnails for this event, please run:')
  console.log(`npm run thumbnails ${event.talks.join(',')}\n`)
}

const fetchEvent = async (cityName: string, eventId: string): Promise<string> => {
  const talkUrl = `${CITY_BASE_URL}/${cityName}/${EVENT_URL_PATH}/${eventId}`
  const page = await fetch(talkUrl)
  const pageContent = await page.text()

  return pageContent
}

const parseEvent = (html: string): Event => {
  const root = parse(html)
  
  const talksUrls: string[] = [...root.querySelectorAll('.talks .talk h4 a')]
    .map((a) => a.getAttribute('href')!)

  const talksIds: string[] =
    talksUrls
      .map(url => url.match(/\/talks\/([0-9]*)/)?.[1])
      .filter((url): url is string => Boolean(url))

  const sponsor = root.querySelector('.location address strong')?.text ?? 'a'

  return {
    talks: talksIds!,
    sponsor
  }
}

interface Event {
  talks: string[]
  sponsor: string
}
