# cdocs-markdoc

This package is a fork of the [`markdoc` package][1] modified to support statically generated customizable documentation that does not require React, SSR, or access to the full Markdoc AST to function.

`cdocs-markdoc` is not a `markdoc` replacement or alternative. It has fewer features than `markdoc`, and is intended to be used with other `cdocs` packages, such as `cdocs-data` and `cdocs-hugo-integration`, to add customization features to existing Hugo documentation or other static documentation. For any modern use case, `markdoc` is a much better choice.

## Key differences between `cdocs-markdoc` and `markdoc`

### Variable interpolation is not supported

Any markup processed by `cdocs-markdoc` should not interpolate variables like this: 

```
The value of `color` is {% color %}. 
```

This is an intentional choice to support translation safety.

### The `else` tag is not supported (yet)

This will be added in an upcoming release.

### No renderers are included

The rendering concern belongs to packages like `cdocs-hugo-integration`, since rendering is platform dependent. For example, to render a customizable doc that works on Hugo, it must be rendered as Hugo "Markdown" (HTML with frontmatter) into an `.md` file.

### The RenderableTree retains conditional display information

In vanilla Markdoc, the `RenderableTree` is strictly for resolved content that should be displayed in the browser. If a variable changes, you create a new `RenderableTree` to use, and re-render content from that tree.

In this version, only one `RenderableTree` is created, with the expectation that the full content will only be rendered once, after which the visibility of smaller pieces of content can be toggled on or off as needed in the browser. The `RenderableTree` contains representations of conditional logic such as `ClientFunction` and `ClientVariable`, and these individual entities can be re-resolved individually in order to determine which content should be hidden.

For an example `RenderableTree`, see [the relevant test snapshot][2].

### The reresolution of variables occurs in the browser

The package provides re-resolution functions that can be used to re-evaluate `ClientVariable`s and `ClientFunction`s in the browser when variables change. The result of these re-resolutions can determine which content on the page is shown or hidden.

[1]: https://github.com/markdoc/markdoc
[2]: ./test/__snapshots__/renderableTree.snap.json
[3]: ./test/__snapshots__/renderedHtml.snap.html