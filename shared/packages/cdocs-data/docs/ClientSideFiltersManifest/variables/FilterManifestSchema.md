[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [ClientSideFiltersManifest](../README.md) / FilterManifestSchema

# Variable: FilterManifestSchema

> `const` **FilterManifestSchema**: `ZodObject`\<[`FilterManifest`](../type-aliases/FilterManifest.md)\>

Defined in: [src/schemas/pageFilters.ts:114](https://github.com/DataDog/corp-node-packages/blob/5c24c72746b7247ccfbceb0819de8cf59d2217ff/packages/cdocs-data/src/schemas/pageFilters.ts#L114)

The manifest for a single page filter,
containing all of the configuration data necessary
to support the filter and its options.

This is used to efficiently validate, resolve,
and re-resolve the filter's current value
and available options.
