[**cdocs-data**](../README.md)

***

[cdocs-data](../globals.md) / TraitGlossary

# Type Alias: TraitGlossary

> **TraitGlossary**: `Record`\<`string`, \{ `description`: `string`; `id`: `string`; `label`: `string`; \}\>

Defined in: [src/schemas/glossaries/traitGlossary.ts:52](https://github.com/DataDog/documentation/blob/cd224ee345504c4db4f79b0b6511b02248729870/markdoc/cdocs-data/src/schemas/glossaries/traitGlossary.ts#L52)

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
