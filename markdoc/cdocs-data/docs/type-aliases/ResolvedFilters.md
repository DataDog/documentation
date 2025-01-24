[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / ResolvedFilters

# Type Alias: ResolvedFilters

> **ResolvedFilters**: `Record`\<`string`, \{ `currentValue`: `string`; `defaultValue`: `string`; `id`: `string`; `label`: `string`; `options`: `object`[]; \}\>

Defined in: [src/schemas/pageFilters.ts:103](https://github.com/DataDog/corp-node-packages/blob/767b31fa96466b395043a1746f343c475d12807b/packages/cdocs-data/src/schemas/pageFilters.ts#L103)

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
