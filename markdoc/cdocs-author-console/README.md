# cdocs-author-console

`cdocs-author-console` is a utility package that supports the author UX of [the Cdocs build](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4898063037/Cdocs+Build). `cdocs-author-console` compiles a React app into a single HTML file (aka "the author console template"). When placed in a folder next to a corresponding `data.json` file of the correct structure ([example](./src/mocks/data.json)), this template renders a Cdocs author console.

The console template can be included in other packages as an easy-to-deploy precompiled asset, as seen in the [`cdocs-hugo-integration` package](https://github.com/DataDog/corp-node-packages/tree/master/packages/cdocs-hugo-integration/src/authorConsole).

This package is not intended to be consumed programmatically. Instead, use it to manually generate the template, as described below.

## Set up the package

Inside the package directory, run `yarn install`.

## Generate the author console template

1. Run `yarn build`.
2. Find the template at `dist/index.html`.

## Edit the template

1. Run `yarn dev`. This opens a preview of the template.
2. Make a change, such as adding verbiage in one of the `*.tsx` files.
3. When you're satisfied with the changes, commit them.
4. Generate the new template as described in the previous section.

## FAQ

### Why precompile?

The author console app takes several seconds to build (on top of the Cdocs build time that is already required). Building the entire console every time an author saves changes in a document is inefficient, and creates a laggy debugging experience for authors. 

For performance reasons, it makes the most sense to compile the React app ahead of time, then just continually overwrite the separate JSON data file that serves as the app's "database" ([example JSON file](./src/mocks/data.json)).

### Why generate a single-file template?

A template in single-file HTML format is easy to inject into other platforms, such as Hugo and Astro.

For example, Hugo has a static folder that the console can be published into, so the author console URL can be `localhost:1313/cdocs/console`.

### Why use a distinct package?

The author console needs to support both Hugo and Astro.

### Why not generate the template programmatically?

It's possible [example](https://github.com/jhgilbert/single-file-html-app), and we used to do this. We can resume if needed, but programmatically interacting with a Vite app through a Node app was needlessly complex, especially in TypeScript. 

For our needs, the occasional copy-paste of a file works fine, and makes this project more accessible to tech writers and other occasional contributors.