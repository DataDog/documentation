[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [ClientSideFiltersManifest](../README.md) / ResolvedFilter

# Type Alias: ResolvedFilter

> **ResolvedFilter**: \{ `currentValue`: `string`; `defaultValue`: `string`; `id`: `string`; `isShown`: `true`; `label`: `string`; `options`: `object`[]; \} \| \{ `currentValue`: `"cdocs_noop"`; `defaultValue`: `"cdocs_noop"`; `id`: `string`; `isShown`: `false`; `label`: `string`; `options`: \[\{ `id`: `"cdocs_noop"`; `label`: `"cdocs_noop"`; \}\]; \}

Defined in: [src/schemas/pageFilters.ts:84](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/schemas/pageFilters.ts#L84)

A page filter that has been "resolved" into
its current value and available options.

## Examples

```ts
// Displayed filter:
{
  id: 'category',
  label: 'Category',
  isShown: true,
  defaultValue: 'all',
  currentValue: 'news',
  options: [
    { id: 'all', label: 'All' },
    { id: 'news', label: 'News' },
    { id: 'events', label: 'Events' }
  ]
}
```

```ts
// Hidden filter:
{
  id: 'runtime',
  label: 'Runtime',
  isShown: false,
  defaultValue: 'cdocs_noop',
  currentValue: 'cdocs_noop',
  options: [{ id: 'cdocs_noop', label: 'cdocs_noop' }]
}
```
