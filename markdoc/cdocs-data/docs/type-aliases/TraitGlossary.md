[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / TraitGlossary

# Type Alias: TraitGlossary

> **TraitGlossary**: `Record`\<`string`, \{ `description`: `string`; `id`: `string`; `label`: `string`; \}\>

Defined in: [src/schemas/glossaries/traitGlossary.ts:52](https://github.com/DataDog/documentation/blob/0066b7ea89bc7b2496bd1acb094be438a1351d3d/markdoc/cdocs-data/src/schemas/glossaries/traitGlossary.ts#L52)

A glossary of all user traits that can be used in customization.

## Example

```ts
{
 *   host: {
 *     id: 'host',
 *     label: 'Host',
 *     description: 'A cloud hosting provider, such as AWS', // optional
 *   },
 *   operating_system: {
 *     id: 'os',
 *     label: 'Operating system'
 *   }
 * }
```
