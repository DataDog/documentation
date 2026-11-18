[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [ClientSideFiltersManifest](../README.md) / FilterManifestSchema

# Variable: FilterManifestSchema

> `const` **FilterManifestSchema**: `ZodObject`\<[`FilterManifest`](../type-aliases/FilterManifest.md)\>

Defined in: [src/schemas/pageFilters.ts:129](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/schemas/pageFilters.ts#L129)

The manifest for a single page filter,
containing all of the configuration data necessary
to support the filter and its options.

This is used to efficiently validate, resolve,
and re-resolve the filter's current value
and available options.
