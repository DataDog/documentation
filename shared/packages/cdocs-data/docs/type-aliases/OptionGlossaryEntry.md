[**cdocs-data**](../README.md)

***

[cdocs-data](../modules.md) / OptionGlossaryEntry

# Type Alias: OptionGlossaryEntry

> **OptionGlossaryEntry**: `object`

Defined in: [src/schemas/glossaries/optionGlossary.ts:29](https://github.com/DataDog/corp-node-packages/blob/5c24c72746b7247ccfbceb0819de8cf59d2217ff/packages/cdocs-data/src/schemas/glossaries/optionGlossary.ts#L29)

A single entry in an option glossary.

## Type declaration

### id

> **id**: `string`

### internal\_notes?

> `optional` **internal\_notes**: `string`

### label

> **label**: `string`

## Example

```ts
{
 *   id: 'linux',
 *   label: 'Linux',
 *   internal_notes: 'Optional additional information on what this option represents',
 * }
```
