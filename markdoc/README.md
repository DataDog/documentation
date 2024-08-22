# Markdoc integration local setup

A quickstart guide for playing around with the Customizable Docs project. More detailed (but still drafty) documentation on writing customizable docs can be found in [Jen's scratch repo][1].

## Build the required Node packages

You may see a few TypeScript compilation errors when you build the packages since the project is still in development, but you can ignore them. No breaking changes are pushed to this branch.

### Compiler package (our Markdoc fork)

From the `markdoc-static-compiler` directory, run the following in your terminal:

```shell
npm run build
```

### Markdoc-Hugo integration package

From the `markdoc-hugo-integration` directory, run the following in your terminal:

```shell
npm run build
```

## Build the docs

From the documentation folder, run `make start-no-pre-build`. The initial console output will show the Markdoc compilation, and any errors encountered in compilation.

The output of a successful Markdoc compilation looks like this:

```plaintext
Compiling .mdoc files to HTML
Markdoc compilation execution time: 572.115ms
Running regular build....
```

## View the docs

Visit `localhost:1313/markdoc_testing` and click around in the left nav.

## Add your own docs

1. Add a new .mdoc file anywhere in the content folder, and put some Markdoc content in it.
2. If your local build is already running, you can run `make compile-markdoc` inside the docs repo to compile it, and the local build will pick up on the change. 
  - The console output will show any errors encountered during compilation, such as a missing closing tag.
3. If your local build is not already running, just run `make start-no-pre-build` as usual.

[1]: https://github.com/DataDog/jen.gilbert/tree/main/customizable-docs-guide
