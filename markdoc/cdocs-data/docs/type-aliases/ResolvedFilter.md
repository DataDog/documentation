[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / ResolvedFilter

# Type Alias: ResolvedFilter

> **ResolvedFilter**: `object`

Defined in: [src/schemas/pageFilters.ts:72](https://github.com/DataDog/documentation/blob/0066b7ea89bc7b2496bd1acb094be438a1351d3d/markdoc/cdocs-data/src/schemas/pageFilters.ts#L72)

A page filter that has been "resolved" into
its current value and available options.
The current value can be derived from default values
or user selections, and the available options
can sometimes be narrowed by previous user selections
that this selection depends on.

For example, assume the user must select dbm_host (such as `aws`)
before they can select a dbm_host_type (such as `ec2`).
The options for dbm_host_type will be
"resolved" (narrowed) based on the user's selection of dbm_host,
since not every possible host type option is valid for all hosts.

## Type declaration

### currentValue

> **currentValue**: `string`

### defaultValue

> **defaultValue**: `string`

### id

> **id**: `string`

### label

> **label**: `string`

### options

> **options**: `object`[]

## Example

```ts
{
 *   id: 'category',
 *   label: 'Category',
 *   defaultValue: 'all',
 *   options: [
 *     { id: 'all', label: 'All' },
 *     { id: 'news', label: 'News' },
 *     { id: 'events', label: 'Events' }
 *   ]
 * }
```
