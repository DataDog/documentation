[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / FilterConfig

# Type Alias: FilterConfig

> **FilterConfig**: `object`

Defined in: src/schemas/frontmatter.ts:62

The configuration of an individual page filter,
as defined in the front matter of a document
and filled in with any defaults.

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
