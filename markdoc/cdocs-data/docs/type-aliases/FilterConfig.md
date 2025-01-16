[**cdocs-data**](../README.md)

***

[cdocs-data](../globals.md) / FilterConfig

# Type Alias: FilterConfig

> **FilterConfig**: `object`

Defined in: [src/schemas/frontMatter.ts:29](https://github.com/DataDog/documentation/blob/cd224ee345504c4db4f79b0b6511b02248729870/markdoc/cdocs-data/src/schemas/frontMatter.ts#L29)

The configuration of an individual page filter,
as defined in the front matter of a document.

## Type declaration

### default\_value?

> `optional` **default\_value**: `string`

### label

> **label**: `string`

### option\_group\_id

> **option\_group\_id**: `string`

### trait\_id

> **trait\_id**: `string`

## Example

```ts
{
 *   label: "Database",
 *   trait_id: "database",
 *   option_group_id: "dbm_database_options",
 *   default_value: "postgres" // optional override
 * }
```
