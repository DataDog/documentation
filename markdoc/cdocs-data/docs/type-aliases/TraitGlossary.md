[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / TraitGlossary

# Type Alias: TraitGlossary

> **TraitGlossary**: `Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; \}\>

Defined in: [src/schemas/glossaries/traitGlossary.ts:52](https://github.com/DataDog/documentation/blob/b898db3da077c905d05644b1aca1c0fe199f9494/markdoc/cdocs-data/src/schemas/glossaries/traitGlossary.ts#L52)

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
