import { parse } from 'node-html-parser'
import { copyFile, ensureFile, writeFile } from 'fs-extra'
import { default as sanitize } from 'sanitize-filename'

const TALK_BASE_URL = 'https://humantalks.com/talks'
const SPEAKER_BASE_URL = 'https://news.humancoders.com/users'

export const prepareTalk = async (talkId: string, sponsor?: string) => {
  const pageContent = await fetchTalk(talkId)
  const talk = parseTalk(pageContent, talkId, sponsor)

  const talkConfigPath = `./public/talks/${talkId}/talk.json`
  await ensureFile(talkConfigPath)

  const talkHint = `./public/talks/${talkId}/${sanitize(talk.title)}.temp`
  await ensureFile(talkHint)

  const talkConfigText = JSON.stringify(talk, undefined, 2)

  await writeFile(talkConfigPath, talkConfigText, 'utf-8')

  await downloadSpeakersPictures(talk)
  
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

const downloadSpeakersPictures = async (talk: Talk) => {
  for (const speaker of talk.speakers) {
    const destinationPath = `./public/${speaker.pic}`

    const speakerImageUrl = await fetchSpeakerImageUrl(speaker.id)

    const response = await fetch(speakerImageUrl)

    // Hack: Si un gravatar a une date Last-Modified qui date de 1984
    // alors il s'agit de l'avatar par défaut de Gravatar
    if (response.headers.get('Last-Modified') === 'Wed, 11 Jan 1984 08:00:00 GMT') {
      console.log('Replace Gravatar by default avatar')
      await copyFile('scripts/default_avatar.png', destinationPath)
      return
    }

    const imageBlob = await response.blob()

    const buffer = Buffer.from( await imageBlob.arrayBuffer() )

    await writeFile(destinationPath, buffer)
  }
}

const fetchSpeakerImageUrl = async (speakerId: string) => {
  const pageContent = await fetchSpeaker(speakerId)

  const root = parse(pageContent)

  const speakerImageUrl = root.querySelector('.avatar img')?.getAttribute('src') ?? ''

  return speakerImageUrl
}

const fetchSpeaker = async (speakerId: string): Promise<string> => {
  const talkUrl = `${SPEAKER_BASE_URL}/${speakerId}`
  const page = await fetch(talkUrl)
  const pageContent = await page.text()

  return pageContent
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