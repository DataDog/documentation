# CDocs Hugo integration

This integration allows a subset of [Markdoc syntax][1] to be used in Hugo. It compiles Markdoc into static Markdown for Hugo processing.

At build time, `.mdoc.md` files are processed into Hugo-ingestable HTML files with [`cdocs-markdoc`][2], a customized fork of the original `markdoc` package. The precompilation process provides static rendering instead of server-side rendering (the original intention of Markdoc).

[1]: https://markdoc.dev/docs/syntax
[2]: ../cdocs-markdoc/README.md