[**cdocs-data**](../README.md)

***

[cdocs-data](../modules.md) / TraitGlossaryEntry

# Type Alias: TraitGlossaryEntry

> **TraitGlossaryEntry**: `object`

Defined in: [src/schemas/glossaries/traitGlossary.ts:32](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/schemas/glossaries/traitGlossary.ts#L32)

A single entry in an attribute glossary.

## Type declaration

### id

> **id**: `string`

### internal\_notes?

> `optional` **internal\_notes**: `string`

### label

> **label**: `string`

### type

> **type**: `"text"` \| `"semver"` = `TraitTypeSchema`

## Example

```ts
{
 *   id: 'host',
 *   label: 'Host',
 *   internal_notes: 'The host of a service or Datadog Agent',
 * }
```
