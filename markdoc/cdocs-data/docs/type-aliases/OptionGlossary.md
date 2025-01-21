[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / OptionGlossary

# Type Alias: OptionGlossary

> **OptionGlossary**: `Record`\<`string`, \{ `description`: `string`; `id`: `string`; `label`: `string`; \}\>

Defined in: [src/schemas/glossaries/optionGlossary.ts:57](https://github.com/DataDog/documentation/blob/f6ec1f95d2d416a2bf4e05ae6718fd51d1cfc306/markdoc/cdocs-data/src/schemas/glossaries/optionGlossary.ts#L57)

A glossary of all the options that can be used on a site,
regardless of which filters they are associated with.

## Example

```ts
{
 *   linux: {
 *     id: 'linux',
 *     label: 'Linux',
 *     description: 'Optional additional information on what this option represents',
 *   },
 *   windows: {
 *     id: 'windows',
 *     label: 'Windows',
 *   },
 *   ios: {
 *     id: 'ios',
 *     label: 'iOS',
 *   }
 * }
```
