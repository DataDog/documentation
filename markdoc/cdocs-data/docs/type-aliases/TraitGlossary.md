[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / TraitGlossary

# Type Alias: TraitGlossary

> **TraitGlossary**: `Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; \}\>

Defined in: [src/schemas/glossaries/traitGlossary.ts:52](https://github.com/DataDog/documentation/blob/3953d7af216b4170a6fe07795dfb4fd8d2a79be3/markdoc/cdocs-data/src/schemas/glossaries/traitGlossary.ts#L52)

A glossary of all user traits that can be used in customization.

## Example

```ts
{
 *   host: {
 *     id: 'host',
 *     label: 'Host',
 *     internal_notes: 'A cloud hosting provider, such as AWS', // optional
 *   },
 *   operating_system: {
 *     id: 'os',
 *     label: 'Operating system'
 *   }
 * }
```
