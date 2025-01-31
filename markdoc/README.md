# Markdoc support in Hugo

## Major project components

The Customizable Docs code is divided into three components, listed here from the bottom up.

### cdocs-markdoc

A package that converts Markdoc to a data structure that the Markdoc-Hugo integration can render to HTML. This is a fork of the original Markdoc project.

#### Tasks

- Parse a string of [Markdoc syntax][2] to an AST, an object containing information about syntax errors encountered during parsing, the paths of any partials, etc.
- Convert an AST to a RenderableTree, an object representing a conditional content structure. 
- Build HTML from the RenderableTree anytime the customer's content preferences change.

#### Requirements

To do its job, the compiler needs:

- Values for all the variables (content preferences) that the Markdoc string depends on
- ASTs for all the partials that the Markdoc string is referring to

### cdocs-hugo-integration ("the integration")

The Hugo integration converts `.mdoc.md` files to HTML, and stores the HTML in `.md` files that Hugo can process.

#### Tasks

- Collect all customization configuration from YAML.
- Collect all `.mdoc.md` files.
- Use `cdocs-markdoc` to convert `.mdoc.md` files to renderable data.
- Render the data to HTML, and store the HTML in an `.md` file.

### Runner code ("the build")

The runner code (`build.js`) is the few lines of build code that will invoke the integration at the proper time in the build process, including on file change for local previews.

## Markdoc integration local setup

A quickstart guide for playing around with the Customizable Docs project. More detailed (but still drafty) documentation on writing customizable docs can be found in [Jen's scratch repo][1].

### Prerequisites

- The [`corp-node-packages` repo][3] must be cloned into the same directory as the `documentation` repo.
- The `cdocs-data` package inside of `corp-node-packages` must have been built (by running `yarn build` from the `cdocs-data` folder).

### Build the required Node packages

You may see a few TypeScript compilation errors when you build the packages since the project is still in development, but you can ignore them. No breaking changes are pushed to this branch.

#### cdocs-markdoc

From the `cdocs-markdoc` directory, run the following in your terminal:

```shell
npm run build
```

#### cdocs-hugo-integration

From the `cdocs-hugo-integration` directory, run the following in your terminal:

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