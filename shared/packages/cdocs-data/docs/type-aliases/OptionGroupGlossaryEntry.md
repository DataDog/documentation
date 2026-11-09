[**cdocs-data**](../README.md)

***

[cdocs-data](../modules.md) / OptionGroupGlossaryEntry

# Type Alias: OptionGroupGlossaryEntry

> **OptionGroupGlossaryEntry**: `object`[]

Defined in: [src/schemas/glossaries/optionGroupGlossary.ts:42](https://github.com/DataDog/corp-node-packages/blob/5c24c72746b7247ccfbceb0819de8cf59d2217ff/packages/cdocs-data/src/schemas/glossaries/optionGroupGlossary.ts#L42)

A single entry in an option group glossary.

## Type declaration

### default?

> `optional` **default**: `boolean`

### id

> **id**: `string`

### label

> **label**: `string`

## Example

```ts
[
  {
    label: "Postgres",
    id: "postgres",
    default: true
  },
  {
    label: "MySQL",
    id: "mysql"
  }
]
```
