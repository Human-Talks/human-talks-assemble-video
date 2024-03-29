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

- Start Preview :
  - Edit the `/params.json` file and set the `talk` id
  - Run the command: `npm start`

- Render video : `npm run build`

- Upgrade Remotion : `npm run upgrade`
