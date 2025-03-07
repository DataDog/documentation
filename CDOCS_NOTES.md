# Cdocs build branch

This file should not be merged to master. If you are reviewing a PR against master and you see this file, make sure it's deleted or moved out of the PR.

This file describes the steps Jen took to build this branch.

## Install the cdocs-hugo-integration package in the documentation repo

The cdocs-hugo-integration package isn't published yet, so you have to build the package tarball locally and install that file.

1. Clone the `corp-node-packages` repo.
2. Check out the `jen.gilbert/cdocs-build-testing` branch. Changes to this branch will not go live, if you would like to make experimental edits.
3. From the `cdocs-hugo-integration` folder inside `corp-node-packages/packages`, run `yarn install && yarn test` to verify that everything is healthy in the package.
4. Run `yarn pack`, and copy the full tarball path provided in the output (e.g., `/Users/jen.gilbert/go/src/github.com/DataDog/corp-node-packages/packages/cdocs-hugo-integration/cdocs-hugo-integration-v1.0.0.tgz`).
5. In the documentation repo, run `yarn add <ABSOLUTE_TARBALL_PATH>`.

### Warning

If you modify anything about your local copy of cdocs-hugo-integration while working in `documentation` (not recommended):

1. Bump the package version in package.json. You won't commit this change, it's just to ensure that yarn recognizes this as a new build.
2. Run `yarn pack` to build a new tarball. Copy the absolute tarball path it gives you.
3. In the `documentation` directory, update the `cdocs-hugo-integration` dependency in `package.json` to use your new tarball.
4. In the `documentation` directory, run `yarn install`.

Ideally, you won't make updates to the packages while working in the documentation repo. If you find an issue, it's better to create a ticket for it, then update the package separately by using a new test case to verify the changes (rather than using the results you're getting in the documentation repo to confirm fixes).

If you need to debug an unexpected error in the cdocs build, edit the Makefile to use `node inspect` instead of `node` in the `build-cdocs`. This will trigger the [Node debugger](https://nodejs.org/api/debugger.html). This allows you to inspect variables without adding console.log calls to the packages themselves.

## Add a customization configuration directory

Set up the customization configuration directory at the top level of the documentation repo.

It should look something like the examples provided in [the `cdocs-data` package](https://github.com/DataDog/corp-node-packages/blob/master/packages/cdocs-data/README.md).

## Add a test document

Add a test document at `cdocs_build/test.mdoc.md`.

## Add the cdocs build script

Call the `cdocs-hugo-integration` package inside `assets/scripts/cdocs-build.js` to convert `.mdoc.md` files, generate the `.gitignore` file, etc.

## Add the build script to the Makefile

Add `build-cdocs` to the Makefile, and invoke it in `start-no-pre-build`.

## Include the global cdocs assets partial in the base Hugo layout

Add `{{ partialCached "markdoc-assets.html" . }}` to `layouts/_default/baseof.html`, so the CSS and JS outputted by cdocs-hugo-integration will be included in the Hugo site.

## Update the existing site functionality to build the TOC

The site's [existing TOC logic](./assets/scripts/components/table-of-contents.js) (that builds the righthand nav) has been updated to provide hooks that the Markdoc renderer can run.

## View the test page

Run `make start-no-pre-build` and view the [test page](localhost:1313/cdocs_build/test).
