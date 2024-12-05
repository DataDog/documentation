# Hugo Markdoc integration

This integration allows a subset of [Markdoc syntax][1] to be used in Hugo.

At build time, `.mdoc.md` files are processed into Hugo-ingestable HTML files with [`markdoc-static-compiler`][2], a customized fork of the original `markdoc` package. `markdoc-static-compiler` provides static rendering instead of server-side rendering (the original intention of Markdoc).

[1]: https://markdoc.dev/docs/syntax
[2]: ../markdoc-static-compiler/README.md