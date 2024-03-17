import { Command } from 'commander'
import { prepareTalk } from './prepareTalk'
import { prepareEvent } from './prepareEvent'

async function main(): Promise<void> {
  const program = new Command()

  program.name('brand').description('CLI to configure brands').version('0.0.1')

  program.configureOutput({
    outputError: (str, write) => write(errorColor(str))
  })

  program
    .command('prepare')
    .description('Prepare given talk')
    .argument('<talkId>', 'talk id')
    .action(
      handleErrors(async (talkId: string) => {
        console.info(`Prepare talk ${talkId}`)

        await prepareTalk(talkId)
      })
    )

  program
    .command('prepareEvent')
    .description('Prepare given event')
    .argument('<cityName>', 'city name (i.e. grenoble)')
    .argument('<eventId>', 'event id')
    .action(
      handleErrors(async (cityName: string, eventId: string) => {
        console.info(`Prepare event ${eventId}`)

        await prepareEvent(cityName, eventId)
      })
    )

  await program.parseAsync()
}

type AsyncVoidFunction<T extends unknown[]> = (...args: T) => Promise<void>
const handleErrors = <T extends unknown[]>(asyncFn: AsyncVoidFunction<T>) => {
  return async (...args: T): Promise<void> => {
    try {
      await asyncFn(...args)
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  }
}

const errorColor = (str: string): string => {
  // Add ANSI escape codes to display text in red.
  return `\x1b[31m${str}\x1b[0m`
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})