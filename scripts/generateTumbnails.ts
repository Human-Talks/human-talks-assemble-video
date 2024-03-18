import { exec } from 'child_process'
import { ensureFile, writeFile } from 'fs-extra'

export const generateThumbnails = async (talkIds: string[]) => {
  for (const talkId of talkIds) {
    await generateThumbnail(talkId)
  }
}

const generateThumbnail = async (talkId: string) => {
  const paramsFile = `./params.json`
  await ensureFile(paramsFile)

  const params = {
    talk: talkId
  }
  
  await writeFile(paramsFile, JSON.stringify(params, null, 2), 'utf-8')

  await executeCommand(`remotion still HumanTalksAssembleThumbnail out/thumbnail${talkId}.png --props=./params.json`)
}

const executeCommand = async (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
        return
      }
      if (stderr) {
        reject(stderr)
        return
      }
      resolve(stdout)
    })
  })
}
