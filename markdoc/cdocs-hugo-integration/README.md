# CDocs Hugo integration

This integration allows a subset of [Markdoc syntax][1] to be used in Hugo. It compiles Markdoc into static Markdown for Hugo processing.

At build time, `.mdoc.md` files are processed into Hugo-ingestable HTML files with [`cdocs-markdoc`][2], a customized fork of the original `markdoc` package. The precompilation process provides static rendering instead of server-side rendering (the original intention of Markdoc).

## Conventions

### JSX templates should not hold state

JSX is used for the templating of some components because it's a commonly known templating language, but React is not available client-side, so the templates should not hold state or use interactivity attributes such as `onClick`.

[1]: https://markdoc.dev/docs/syntax
[2]: ../cdocs-markdoc/README.md