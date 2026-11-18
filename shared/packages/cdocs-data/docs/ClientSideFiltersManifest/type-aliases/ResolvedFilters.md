[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [ClientSideFiltersManifest](../README.md) / ResolvedFilters

# Type Alias: ResolvedFilters

> **ResolvedFilters**: `Record`\<`string`, \{ `currentValue`: `string`; `defaultValue`: `string`; `id`: `string`; `isShown`: `true`; `label`: `string`; `options`: `object`[]; \} \| \{ `currentValue`: `"cdocs_noop"`; `defaultValue`: `"cdocs_noop"`; `id`: `string`; `isShown`: `false`; `label`: `string`; `options`: \[\{ `id`: `"cdocs_noop"`; `label`: `"cdocs_noop"`; \}\]; \}\>

Defined in: [src/schemas/pageFilters.ts:118](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/schemas/pageFilters.ts#L118)

A collection of ResolvedFilter objects, indexed by their
unique IDs.

Page filters are resolved by combining data from
several sources, such as the page's URL, the frontmatter,
the default value for the filter,
and the user's stored filters.

## Example

```ts
{
 *   category: {
 *      id: 'category',
 *      label: 'Category',
 *      defaultValue: 'all',
 *      options: [
 *        { id: 'all', label: 'All' },
 *        { id: 'news', label: 'News' },
 *        { id: 'events', label: 'Events' }
 *      ]
 *   }
 * }
```
