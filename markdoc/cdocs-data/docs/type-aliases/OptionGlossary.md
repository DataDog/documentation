[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / OptionGlossary

# Type Alias: OptionGlossary

> **OptionGlossary**: `Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; \}\>

Defined in: [src/schemas/glossaries/optionGlossary.ts:57](https://github.com/DataDog/documentation/blob/b898db3da077c905d05644b1aca1c0fe199f9494/markdoc/cdocs-data/src/schemas/glossaries/optionGlossary.ts#L57)

A glossary of all the options that can be used on a site,
regardless of which filters they are associated with.

## Example

```ts
{
 *   linux: {
 *     id: 'linux',
 *     label: 'Linux',
 *     internal_notes: 'Optional additional information on what this option represents',
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
