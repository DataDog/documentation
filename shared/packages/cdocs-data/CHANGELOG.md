# Changelog

## [2.0.1](https://github.com/DataDog/corp-node-packages/pull/307)

Update dependencies to address vulnerabilities.

## [2.0.0](https://github.com/DataDog/corp-node-packages/pull/259)

Disallow duplicate option labels in the default language.

## [1.5.0](https://github.com/DataDog/corp-node-packages/pull/242)

Expand filter display logic to avoid requiring placeholders, and to allow multiple conditions.

## [1.4.1](https://github.com/DataDog/corp-node-packages/pull/241)

Adjust validation for the `cdocs_noop` sentinel value, which should always be considered valid.

## [1.4.0](https://github.com/DataDog/corp-node-packages/pull/235)

Add support for conditional filter display.

## [1.3.2](https://github.com/DataDog/corp-node-packages/pull/200)

Use more specific imports for improved resolution / bundling.

## [1.3.1](https://github.com/DataDog/corp-node-packages/pull/197)

Use more specific imports for improved resolution / bundling.

## [1.3.0](https://github.com/DataDog/corp-node-packages/pull/159)

Add option labels to the manifest for each filter.

## [1.2.1](https://github.com/DataDog/corp-node-packages/pull/157)

Migrate from Zod 3 to Zod 4.

## [1.2.0](https://github.com/DataDog/corp-node-packages/pull/137)

Add a function for validating option group IDs.

## [1.1.1](https://github.com/DataDog/corp-node-packages/pull/136)

Export the types for each glossary entry, to support type safety in config-creation UI forms.

## [1.1.0](https://github.com/DataDog/corp-node-packages/pull/134)

Add support for semantic-version traits. Previously, only string traits were supported.

## [1.0.4](https://github.com/DataDog/corp-node-packages/pull/117/files)

Fix a bug where URL hashes were accidentally omitted during other URL params processing.

## [1.0.3](https://github.com/DataDog/corp-node-packages/pull/106)

Add support for versioned option groups to support translation.

## [1.0.2](https://github.com/DataDog/corp-node-packages/pull/96)

Make exports more granular to support the requirements of `esbuild`, which is now being used to build the client-side Cdocs code.

## [1.0.1](https://github.com/DataDog/corp-node-packages/pull/94)

Adjust package exports to better support interoperability, treeshaking behavior, etc.

## [1.0.0](https://github.com/DataDog/corp-node-packages/pull/89)

Initial release.
