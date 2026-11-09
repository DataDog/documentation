[**cdocs-data**](../README.md)

***

[cdocs-data](../modules.md) / TraitGlossaryEntry

# Type Alias: TraitGlossaryEntry

> **TraitGlossaryEntry**: `object`

Defined in: [src/schemas/glossaries/traitGlossary.ts:34](https://github.com/DataDog/corp-node-packages/blob/5c24c72746b7247ccfbceb0819de8cf59d2217ff/packages/cdocs-data/src/schemas/glossaries/traitGlossary.ts#L34)

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
