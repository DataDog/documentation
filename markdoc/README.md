# Markdoc support in Hugo

## Major project components

The Customizable Docs code is divided into three components, listed here from the bottom up.

### markdoc-static-compiler ("the compiler")

The compiler is responsible for converting Markdoc to HTML. This is a fork of the original Markdoc project.

#### Tasks

- Parse a string of [Markdoc syntax][2] to an AST, an object containing information about syntax errors encountered during parsing, the paths of any partials, etc.
- Convert an AST to a RenderableTree, an object representing a conditional content structure. 
- Build HTML from the RenderableTree anytime the customer's content preferences change.

#### Requirements

To do its job, the compiler needs:

- Values for all the variables (content preferences) that the Markdoc string depends on
- ASTs for all the partials that the Markdoc string is referring to

### markdoc-hugo-integration ("the integration")

The Markdoc-Hugo integration uses the compiler to convert .mdoc files to HTML documents that Hugo can process.

The integration bridges the gap between Hugo and the compiler by performing the following tasks:

- Ingest all configuration from the relevant yaml files, such as the available options for each preference variable
- Ingest all .mdoc files in the content/en folder of the site
- For each .mdoc file,
    - Derive the default values for all variables (content preferences)
    - Prepare all necessary partials for the compiler
    - Render the file to HTML
    - Add the appropriate menus, navs, styles, and so on to the rendered HTML, including the logic for preference changes / content rerenders inside the rendered HTML

### Runner code ("the build")

The runner code (`build.js`) is the few lines of build code that will invoke the integration at the proper time in the build process, including on file change for local previews.

## Markdoc integration local setup

A quickstart guide for playing around with the Customizable Docs project. More detailed (but still drafty) documentation on writing customizable docs can be found in [Jen's scratch repo][1].

### Prerequisites

- The [`corp-node-packages` repo][3] must be cloned into the same directory as the `documentation` repo.
- The `cdocs-data` package inside of `corp-node-packages` must have been built (by running `yarn build` from the `cdocs-data` folder).

### Build the required Node packages

You may see a few TypeScript compilation errors when you build the packages since the project is still in development, but you can ignore them. No breaking changes are pushed to this branch.

#### Compiler package (our Markdoc fork)

From the `markdoc-static-compiler` directory, run the following in your terminal:

```shell
npm run build
```

#### Markdoc-Hugo integration package

From the `markdoc-hugo-integration` directory, run the following in your terminal:

```shell
npm run build
```

### Build the docs

From the documentation folder, run `make start-no-pre-build`. The initial console output will show the Markdoc compilation, and any errors encountered in compilation.

The output of a successful Markdoc compilation looks like this:

```plaintext
Compiling .mdoc files to HTML
Markdoc compilation execution time: 572.115ms
Running regular build....
```

### View the docs

Visit `localhost:1313/markdoc_testing` and click around in the left nav.

### Add your own docs

1. Add a new .mdoc file anywhere in the content folder, and put some Markdoc content in it.
2. If your local build is already running, you can run `make compile-markdoc` inside the docs repo to compile it, and the local build will pick up on the change. 
  - The console output will show any errors encountered during compilation, such as a missing closing tag.
3. If your local build is not already running, just run `make start-no-pre-build` as usual.

[1]: https://github.com/DataDog/jen.gilbert/tree/main/customizable-docs-guide
[2]: https://markdoc.dev/docs/syntax
[3]: https://github.com/datadog/corp-node-packages