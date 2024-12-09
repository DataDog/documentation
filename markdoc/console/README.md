# Starter React app that builds as a single HTML file

This repo contains

- a React/TypeScript [app](./app/) that builds as a single `index.html` file
- a [builder](./builder/) package that can build the app programmatically in cases where you'd like to build different copies of the app containing different datasets
- a [demo](./demo) package that shows how you might use the builder to create a distinct copy of the app

Ready to get started? Skip to [the setup instructions](#setup-and-usage-instructions).

## Why would I use this?

Unless you already have a good reason in mind, you probably shouldn't use this. A one-file bundle doesn't make sense for most production applications. But it's handy for creating prototypes and simple tools that are easy to share, with no env setup required.

It's also useful for injecting applications into environments that will only accept vanilla HTML/JS/CSS code. Again, this is usually a bad idea in production, but it makes sense in some local builds. This project was originally created to inject an interactive debugging console into a [Hugo site](https://gohugo.io/), but only when serving the site locally for development purposes.

## About the app

The app is written with React and TypeScript, and built by Vite. It contains example code that demonstrates how to define and use a React component, import and use a MUI component, and so on.

### UX components and styles

The project has ready-to-use UI components such as buttons and tabs, thanks to [Material UI](https://mui.com/material-ui). It also includes [Emotion](https://emotion.sh/docs/introduction) for styling your own components.

### Data storage and access

The app can access and use any data you provide in JSON format. The app can't persist data between page loads out of the box. Persistent data is out of the scope of this project, but you could achieve it with `localStorage` or another data store if desired.

The app's "database" is [a `.ts` file](app/src/db/data.ts) that you can update with your own data before building the app. Any data you store in that file will be available in [the `App` component](app/src/App.tsx) as `dbData`.

To change the "database" data, either edit [app/src/db/data.ts](app/src/db/data.ts), or pass the desired data to the `builder` when programmatically creating a copy of the app.

### Limitations

The app uses [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) (thanks, Richard Tallent!), so any limitations documented in the plugin's README apply to this app as well.

## Setup and usage instructions

### Clone the repository

```shell
git clone git@github.com:jhgilbert/single-file-html-app.git
cd single-file-html-app
```

### Build and launch the app from the command line

```shell
cd app
npm install
npm run prod
```

This builds the `app/dist/index.html` file as it will work in production. `app/dist/index.html` contains all of the code necessary to run your app, and opens in your browser automatically once the build is finished.

To just build the file without launching it, you can use `npm run build` instead.

### Develop the app

The app contains examples and starter code. To modify the app code and view ongoing changes in the browser, start the dev environment from the `app` folder:

```shell
npm run dev
```

You should see output that looks something like this:

```shell
 VITE v5.4.10  ready in 92 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

In your browser, visit the provided address (`http://localhost:5173` in the above example), and you should see a demo page. The demo page will automatically update in the browser when you change the app code. Try changing some of the verbiage in `app/src/App.tsx`.

### Build a copy of the app programmatically

#### Compile the `builder` package

From the `builder` folder, install dependencies and build the package:

```shell
npm install
npm run build
```

#### Compile and run the demo code

From the `demo` folder, install dependencies, build the app, and open the app in your browser:

```shell
npm install
npm run build
node dist/index.js
open index.html
```

Try modifying the `msg` in the `dbData` argument in the demo code to change the data available for use in the app.
