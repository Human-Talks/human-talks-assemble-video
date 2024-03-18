This project will be used by [Human Talks](https://humantalks.com/) organizers to assemble video recording from talks.

Using [Remotion](https://www.remotion.dev/), this tools can assemble video, containing title, place and speaker name.


## Development

### Gitpod 

✨ You can use [Gitpod](https://gitpod.io) to contribute on this project. Click on this button and your workspace will be ready to use: 

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Human-Talks/human-talks-assemble-video)   

### Commands

- Install Dependencies : `npm i`

- Prepare the assets : 
  - Run the command: `npm run prepareTalk {talkId}`
    - `talkId` is the ID of the talk that can be found it its humantalks.com url (i.e: [610](https://humantalks.com/cities/grenoble/events/610))
  - Open the resulting folder and copy video files into it
  - Open the resulting `json` file and complete it with videos URLs or additional speakers

- Prepare an entire event :
  - Run the command: `npm run prepareEvent {city} {eventId}`
    - `city` is the name of the city when the event happens and should fit that can be found it a humantalks.com url (i.e: [610](https://humantalks.com/cities/grenoble/events/610))
    - `eventId` is the ID of the event that can be found it its humantalks.com url (i.e: [610](https://humantalks.com/cities/grenoble/events/610))
  - This command is the equivalent of calling `prepareTalk` for every talks from the specified event

- Generate a thumbnail :
  - This command requires to call `prepareTalk` (or `prepareEvent`) first in order to create the specified talk
  - Edit `params.json` with the talk's ID
  - Optional: Edit the talk files (avatar, event description etc)
  - Run the command: `npm run thumbnail`

- Generate a list of thumbnails :
  - This command requires to call `prepareTalk` (or `prepareEvent`) first in order to create the specified talks
  - Optional: Edit the talks files (avatar, event description etc)
  - Run the command: `npm run thumbnails {talksIds}`
    - `talksIds` is the list of talks IDs to generate. The list should be comma separated with no space (i.e: 1337,1338,1339)

- Start Preview :
  - Edit the `/params.json` file and set the `talk` id
  - Run the command: `npm start`

- Render video : `npm run build`

- Upgrade Remotion : `npm run upgrade`
