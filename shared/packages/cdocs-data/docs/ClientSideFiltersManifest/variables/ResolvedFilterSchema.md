[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [ClientSideFiltersManifest](../README.md) / ResolvedFilterSchema

# Variable: ResolvedFilterSchema

> `const` **ResolvedFilterSchema**: `ZodUnion`\<[`ResolvedFilter`](../type-aliases/ResolvedFilter.md)\>

Defined in: [src/schemas/pageFilters.ts:30](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/schemas/pageFilters.ts#L30)

A page filter that has been "resolved" into
its current value and available options.

When `isShown` is true, the filter is fully resolved with
current value, default value, and available options.

When `isShown` is false, the filter is hidden based on
its show_if / hide_if conditions, and only contains
the filter's id and label.
