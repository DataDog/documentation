# Markdoc Static Compiler

The static compiler is a fork of the [`markdoc` package][1] designed for static rendering, since the original package was intended for server-side rendering. It parses Markdoc strings into objects, and provides rendering functions that can be used to convert those objects into HTML.

## Compilation process

1. The compiler takes a string of [Markdoc syntax][3], such as this ([example input file][2]).
2. The compiler parses the markup into an AST, such as this [AST created from the example input file][4]. The AST can be examined for any compilation errors that the author might need to know about, such as malformed syntax.
3. When supplied with default values for any variables used in the markup, the AST can be parsed into a renderable tree, such as this [renderable tree created from the example input file][5]. The renderable tree focuses only on content; all error/line number data is dropped. All content is present in the tree whether it should be displayed or not, but undisplayed elements have the class `.markdoc__hidden`. This class can be used to hide the elements in prod, or to highlight the elements in testing/debugging.
4. The renderable tree can be rendered into HTML ([example result][6]) using whichever renderer is appropriate for the context: 
    - `html` at compile time
    - `incremental` in the browser, to patch existing HTML based on an updated variable value
Optionally, to override the default variable values, new variable values can be passed to the render function.

[1]: https://github.com/markdoc/markdoc
[2]: ./test/integration/input.mdoc
[3]: https://markdoc.dev/docs/syntax
[4]: ./test/__snapshots__/ast.snap.json
[5]: ./test/__snapshots__/renderableTree.snap.json
[6]: ./test/__snapshots__/renderedHtml.snap.html