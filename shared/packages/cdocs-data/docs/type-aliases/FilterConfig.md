[**cdocs-data**](../README.md)

***

[cdocs-data](../modules.md) / FilterConfig

# Type Alias: FilterConfig

> **FilterConfig**: `object`

Defined in: [src/schemas/frontmatter.ts:73](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/schemas/frontmatter.ts#L73)

The configuration of an individual page filter,
as defined in the front matter of a document
and filled in with any defaults.

## Type declaration

### default\_value?

> `optional` **default\_value**: `string`

### hide\_if?

> `optional` **hide\_if**: `Record`\<`string`, `string`[]\>[] = `ConditionalDisplaySchema`

### label

> **label**: `string`

### option\_group\_id

> **option\_group\_id**: `string`

### show\_if?

> `optional` **show\_if**: `Record`\<`string`, `string`[]\>[] = `ConditionalDisplaySchema`

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
