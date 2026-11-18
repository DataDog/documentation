[**cdocs-data**](../README.md)

***

[cdocs-data](../modules.md) / OptionGroupGlossaryEntry

# Type Alias: OptionGroupGlossaryEntry

> **OptionGroupGlossaryEntry**: `object`[]

Defined in: [src/schemas/glossaries/optionGroupGlossary.ts:40](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/schemas/glossaries/optionGroupGlossary.ts#L40)

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
