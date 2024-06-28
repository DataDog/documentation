# Docs GitHub Actions

This folder is an NPM package set up for authoring GitHub actions in TypeScript.

## New to TypeScript?

TypeScript is a typed programming language that compiles to JavaScript. When you run `npm run build` from this folder, any TypeScript in `src` is compiled into JavaScript files that are stored in the `lib` folder.

See TypeScript's [Getting Started documentation][1] for resources tailored to your experience level.

**Key concepts to understand before editing anything in this package:**

- You should not edit the JavaScript in `lib`. It's generated code, so your changes will be overwritten the next time the package is built.
- To edit the JS in `lib`, change the corresponding TS in `src`, and then run `npm run build` from this directory in your terminal to re-generate the contents of the `lib` folder.
- `lib` contains the code that GitHub runs, so any changes to its contents should be checked into version control.
- If the changes you made to `src` are not taking effect on GitHub as you expected, you likely forgot to run `npm run build`, so nothing has changed in `lib`, and from GitHub's perspective, your program is the same as it was before.

[1]: https://www.typescriptlang.org/docs/#:~:text=TypeScript%20Documentation-,Get%20Started,-Quick%20introductions%20based