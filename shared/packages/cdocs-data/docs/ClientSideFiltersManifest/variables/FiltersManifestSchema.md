[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [ClientSideFiltersManifest](../README.md) / FiltersManifestSchema

# Variable: FiltersManifestSchema

> `const` **FiltersManifestSchema**: `ZodObject`\<[`FiltersManifest`](../type-aliases/FiltersManifest.md)\>

Defined in: [src/schemas/pageFilters.ts:177](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/schemas/pageFilters.ts#L177)

A object containing all of the potential page filter IDs
and option groups for a page, created by populating the front matter
placeholders with all possible values, then collecting all
configuration data necessary to support the resulting
filter and options set IDs.

Useful for efficiently validating, resolving,
and re-resolving filters.
