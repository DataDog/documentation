[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / FiltersManifestSchema

# Variable: FiltersManifestSchema

> `const` **FiltersManifestSchema**: `ZodObject`\<[`FiltersManifest`](../type-aliases/FiltersManifest.md)\>

Defined in: [src/schemas/pageFilters.ts:163](https://github.com/DataDog/corp-node-packages/blob/767b31fa96466b395043a1746f343c475d12807b/packages/cdocs-data/src/schemas/pageFilters.ts#L163)

A object containing all of the potential page filter IDs
and option groups for a page, created by populating the front matter
placeholders with all possible values, then collecting all
configuration data necessary to support the resulting
filter and options set IDs.

Useful for efficiently validating, resolving,
and re-resolving filters.
