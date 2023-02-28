# Digital Stories
[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

- `ERD`
- `softwre hardware requirement`
- `Non functional Reuirement`
- `Future `

The project "Digital Story" is a web application that allows users to create and share stories in various formats, including text, image, and video. The application has a front end built using React with Redux, and a back end consisting of a RESTful API and a database.

- Type some Markdown on the left
- See HTML in the right
- ✨Magic ✨

## Features
-  `Registration`: Registration requires the user to enter their name, a unique username, a correctly formatted email address, and an optional profile picture.
-  `Login`: User Has to log in to create and view stories. If the user attempts to navigate to another page by entering the address in the address bar, they will be asked to log in before being directed to the requested page.
-   `Authoring Story`: Create a new story for authoring. Author a story with text, image, and video components.
- `Persistent Stories`:  Stories will be persistent for later access to preview, edit, and delete. 
- `Story View`: Stories will be displayed in either a list format, one below the other, or a grid format, based on the user's choice
- `Story Formatting`: Users will be able to style their stories with colors and fonts, as well as position and order them.
- `Private Stries`: All stories will be private by default, but users can choose to make them public. If a story is made public, it will be visible to all users
- `Story Vote`: Users can upvote/downvote stories, view the number of upvotes/downvotes a story has received, and what percentage of total users have reacted to a particular story.
- `Story Comment`:Users can comment on stories, and the trending stories feature is available at the /trending route.
- `Engagement`: In “engagement,” a user can see which stories they have reacted to and which of their stories other users have reacted to.
- `Trending`: Trending stories feature should be available at the /trending route. Trending stories include the most upvoted stories from all users.
- `Leaderboard`: The leaderboard is available at the /leaderboard route and shows each user's name, picture, total number of stories posted, and total upvotes received from all stories combined.
- `Sortable Stories`: Stories are sortable by creation timestamp, upvotes, and downvotes for each user and all users.
- `Dark/Bright Mode`: User can switch between dark and bright mode using a button in navbar.


## Getting Started

### Installation
To install the app, follow these steps:
1. Clone the repository:
```bash
    git clone https://github.com/syedwastil/MemoriesApp
```
2. Install the dependencies:
    1. Open terminal for `server` and run:
        ```bash
            cd memoriesApp/server
            npm install
        ```
    2. One another terminal for `client` and run:
        ```bash
            cd memoriesApp/client
            npm install
        ```

### Running the App
We will run server app and client app seperately.
1. For `Server` app:
    ```bash
        npm start
    ```
2. For `Client` app:
    ```bash
        npm run dev
    ```

This will start the server and the client, and open the app in your default browser.

## Architecture
### Overview
The app is built using the MERN stack:
- MongoDB for the database
- Express.js for the server
- React for the client
- Redux for client side store management
- Node.js as the runtime environment

### Backend
##### Entity Relationship Diagram (ERD)
![This is an image](docs/erd.png)

The backend of the app is built using Express.js and Node.js. Here are the main components:
- `server.js`: The main server file that sets up the Express.js app and connects to the database.
- `routes/notes.js`: Defines the API endpoints for CRUD operations on notes.
- `controllers/notes.js`: Implements the logic for CRUD operations on notes.
- `models/note.js`: Defines the schema for the notes in the database.

### Frontend
The frontend of the app is built using React. Here are the main components:

- `App.js`: The main React component that sets up the app and renders other components.
- `components/NoteList.js`: Renders the list of notes.
- `components/AddNote.js`: Renders the form to add a new note.
- `components/EditNote.js`: Renders the form to edit an existing note.

## Contributing

## Troubleshooting 

## Liscence

Markdown is a lightweight markup language based on the formatting conventions
that people naturally use in email.
As [John Gruber] writes on the [Markdown site][df1]

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is *actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results in the right.

## Tech

Dillinger uses a number of open source projects to work properly:

- [AngularJS] - HTML enhanced for web apps!
- [Ace Editor] - awesome web-based text editor
- [markdown-it] - Markdown parser done right. Fast and easy to extend.
- [Twitter Bootstrap] - great UI boilerplate for modern web apps
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [Gulp] - the streaming build system
- [Breakdance](https://breakdance.github.io/breakdance/) - HTML
to Markdown converter
- [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd dillinger
npm i
node app
```

## Plugins

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| GitHub | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |


#### Building for source

For production release:

```sh
gulp build --prod
```

Generating pre-built zip archives for distribution:

```sh
gulp build dist --prod
```

out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
