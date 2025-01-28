# Markdoc Static Compiler

The static compiler is a fork of the [`markdoc` package][1] designed for static rendering, since the original package was intended for server-side rendering. It parses Markdoc strings into objects, and provides rendering functions that can be used to convert those objects into HTML.

## Key differences between static Markdoc (this package) and vanilla Markdoc (the original package)

### The RenderableTree retains conditional logic

In vanilla Markdoc, the `RenderableTree` is strictly for resolved content that should be displayed in the browser. If a variable changes, you create a new `RenderableTree` to use.

In the static version, only one `RenderableTree` is created, and it must represent all possible versions of the conditional content. The final resolution of the content is shifted one step later in the process, when the `RenderableTree` is processed by the `html` renderer.

For an example `RenderableTree`, see [the relevant test snapshot][2].

### The `html` renderer includes all potential elements in the page, but designates some elements as hidden

The renderable tree contains `if` divs and spans that contain `ClientFunction` and `ClientVariable` objects that can later be reresolved to new values in the browser when the user's preferences change. Each of these contain a `ref` that can be used to associate them with HTML elements that depend on their evaluation.

Each `if` div and span contains a `ref` that can be used client-side to associate the element with the `ref` of a `ClientFunction` or `ClientVariable`, which can be reresolved to update the display status of the element.

Based on the resolved values of the `ClientFunction`s and `ClientVariable`s at compile time, the `html` renderer hides some elements by applying the `mdoc__hidden` class, and includes the appropriate `ref` in the element as a data attribute to allow for reresolution in the client.

For an example rendered HTML snippet, see [the relevant test snapshot][3].

### The reresolution of variables, and resulting toggle of element display status, falls outside the scope of this package

The package provides re-resolution functions that can be used to re-evaluate `ClientVariable`s and `ClientFunctions` when variables change, to be used by the consumer of the package in whatever way they see fit.

[1]: https://github.com/markdoc/markdoc
[2]: ./test/__snapshots__/renderableTree.snap.json
[3]: ./test/__snapshots__/renderedHtml.snap.html