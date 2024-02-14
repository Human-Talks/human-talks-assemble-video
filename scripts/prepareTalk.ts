import { parse } from 'node-html-parser'
import { ensureFile, writeFile } from 'fs-extra'
import { default as sanitize } from 'sanitize-filename'

const TALK_BASE_URL = 'https://humantalks.com/talks'

export const prepareTalk = async (talkId: string, sponsor?: string) => {
  const pageContent = await fetchTalk(talkId)
  const talk = parseTalk(pageContent, talkId, sponsor)

  const talkConfigPath = `./public/talks/${talkId}/talk.json`
  await ensureFile(talkConfigPath)

  const talkHint = `./public/talks/${talkId}/${sanitize(talk.title)}.temp`
  await ensureFile(talkHint)

  const talkConfigText = JSON.stringify(talk, undefined, 2)

  await writeFile(talkConfigPath, talkConfigText, 'utf-8')
  
  console.log('Talk template created at:', talkConfigPath)
}

const fetchTalk = async (talkId: string): Promise<string> => {
  const talkUrl = `${TALK_BASE_URL}/${talkId}`
  const page = await fetch(talkUrl)
  const pageContent = await page.text()

  return pageContent
}

const parseTalk = (html: string, talkId: string, sponsor?: string): Talk => {
  const root = parse(html)
  const title = root.querySelector('h1')?.text ?? ''
  const date = root.querySelector('.date')?.text ?? ''
  const speakerName = root.querySelector('.speaker_name a')?.text ?? ''
  const speakerUrl = root.querySelector('.speaker_name a')!
  const speakerId = speakerUrl.getAttribute('href')?.match(/https:\/\/news.humancoders.com\/users\/([0-9]*)/)?.[1] ?? '0000'
  const description = root.querySelectorAll('p')?.slice(0,-1).flatMap(s => s.text).join('\n')
  const city = root.querySelector('.city a')?.text ?? ''
  const place = sponsor ?? root.querySelector('.location address strong')?.text ?? ''

  return {
    title,
    description,
    speakers: [
      {
        id: speakerId,
        name: speakerName,
        pic: `talks/${talkId}/${speakerId}.jpg`
      }
    ],
    eventInfo: {
      city,
      date,
      place
    },
    videos: [
      `talks/${talkId}/video1.mp4`
    ]
  }
}

interface Talk {
  title: string
  description: string
  speakers: Speaker[]
  eventInfo: EventInfo
  videos: string[]
}

interface Speaker {
  id: string,
  name: string,
  pic: string
}

interface EventInfo {
  city: string
  date: string
  place: string
}