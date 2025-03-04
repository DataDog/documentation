# cdocs-hugo-integration

This package enables customizable docs (the ability to filter irrelevant information from a docs page) in Hugo. 

It compiles [Markdoc][1] files (`.mdoc.md`) into `.md` files that Hugo is able to process, functioning as a Hugo-specific wrapper for the [`cdocs-data`][5] and [`cdocs-markdoc`][2] packages. For an overview of the key concepts around content filters, see [the `cdocs-data` README][5].

The compiled "Markdown" files are actually just HTML with frontmatter added at the top. 

For example:

  - This [input `.mdoc.md` file][3] becomes [this output `.md` file][4].
  - This [mock site][9] is compiled in [a test][10] that generates [many data snapshots][11] you can explore.

## Build process

### Requirements

- The cdocs build must run **before** Hugo has processed any files.
- The integration assumes the same directory structure as the [Datadoc documentation site][7], which uses the same patterns found in most Hugo sites. For example, your content folder must be located at `<SITE_DIR>/content`.

### Inputs

As shown in the example build script below, the integration just needs to know

- the current `env` (`development`, `preview`, or `live`).
- the directory of your root site folder.

Optionally, you can also provide 

- a default language that should be used to backfill any missing data in the other languages. This parameter defaults to `en`.
- the directory where you want to publish the author console. If the `env` is not `development`, this parameter is ignored.

### Outputs

As shown in the example build script below, the integration creates up to three outputs:

- For each `.mdoc.md` file, one corresponding `.md` file located in the same directory
- An assets partial containing the global styles and scripts required to render any page
- Optionally, and only in the `development` environment, an author console for debugging purposes (currently just a stub page used to verify the build process for that upcoming feature)

Additionally, the output of the compile operation can be used to generate a `.gitignore` file to ignore any compiled files.

### Example build script

```javascript
const fs = require('fs');
const path = require('path');

const { CdocsHugoIntegration } = require('cdocs-hugo-integration');

// Initialize the Markdoc integration
const env = process.env.CI_ENVIRONMENT_NAME || 'development';
const baseSiteDir = '<YOUR_ROOT_SITE_FOLDER_PATH>';

const markdocIntegration = new CdocsHugoIntegration({
    baseSiteDir,
    env,
    defaultLang: 'en' // optional, lang already defaults to 'en'
    publishAuthorConsoleInDir: '<PATH_TO_DIR>' // ignored outside of development env
});

// Build the global assets partial, and write it to a file
// that has already been included in the Hugo page layout
const assetsPartialPath = '<WHERE_TO_PUBLISH_THE_ASSETS_PARTIAL>';
const assetsPartialContents = markdocIntegration.buildAssetsPartial();
fs.writeFileSync(ASSETS_PARTIAL_PATH, assetsPartialContents);

// Compile all .mdoc files found in the content directory
const { compiledFilePaths, hasErrors } = markdocIntegration.compileMdocFiles();

// Build a .gitignore file for the compiled files,
// to be written to the content directory
const contentDir = path.resolve(__dirname, '../content');

let gitignoreContents = `# GENERATED FILE: DO NOT EDIT
# Ignore .md files compiled from Markdoc\n`;

compiledFilePaths.forEach((file) => {
    const relativePath = file.replace(contentDir, '');
    gitignoreContents += relativePath + '\n';
});

fs.writeFileSync(contentDir + '/.gitignore', gitignoreContents);

// Log any errors to the console
if (hasErrors) {
    console.error('Markdoc compilation failed with errors:');
    markdocIntegration.logErrorsToConsole();
}
```

## Setup and usage

### Use the integration in a Hugo site

- Install this package in your Hugo site according to [the `corp-node-packages` instructions][12].
- Choose a filepath for the global assets partial, and make sure that asset is included in your Hugo layout.
- Create a script similar to the provided [example script](#example-build-script), and run it as part of your build **before** Hugo processes any files.

### Experiment with the integration

- In the package folder, run `yarn install && yarn build`.
- Create a branch and make edits to the [`validSite` folder][9], which is configured according to the guidelines in the [`cdocs-data` README][5].
- Run `yarn test` to see how your edits impacted the resulting data snapshots.

## Code conventions

This package follows the `cdocs-data` [conventions][8] where applicable.

### JSX templates should not hold state

JSX is used for the templating of some components because it's a commonly known templating language with native TypeScript support, and can be easier to work with than plain strings. But React is not available client-side, so the templates should not hold state or use attributes such as `onClick`.

[1]: https://markdoc.dev/docs/syntax
[2]: https://github.com/DataDog/corp-node-packages/tree/master/packages/cdocs-markdoc#readme
[3]: ./test/config/mocks/validSite/content/en/demos/colors/primary.mdoc.md
[4]: ./test/__snapshots__/fileRendering/en/demos/colors/primary.mdoc.md/compiledHtml.snap.md
[5]: https://github.com/DataDog/corp-node-packages/tree/master/packages/cdocs-data#readme
[7]: https://github.com/DataDog/documentation
[8]: https://github.com/DataDog/corp-node-packages/tree/master/packages/cdocs-data#code-conventions
[9]: ./test/config/mocks/validSite/
[10]: ./test/MarkdocHugoIntegration/validSite.test.ts
[11]: ./test/__snapshots__/validSite/
[12]: https://github.com/datadog/corp-node-packages?tab=readme-ov-file#how-do-i-install-the-package-in-a-consumer