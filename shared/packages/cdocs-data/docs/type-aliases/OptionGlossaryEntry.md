[**cdocs-data**](../README.md)

***

[cdocs-data](../modules.md) / OptionGlossaryEntry

# Type Alias: OptionGlossaryEntry

> **OptionGlossaryEntry**: `object`

Defined in: [src/schemas/glossaries/optionGlossary.ts:27](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/schemas/glossaries/optionGlossary.ts#L27)

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
