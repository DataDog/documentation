[**cdocs-data**](../README.md)

***

[cdocs-data](../modules.md) / OptionGlossary

# Type Alias: OptionGlossary

> **OptionGlossary**: `Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; \}\>

Defined in: [src/schemas/glossaries/optionGlossary.ts:59](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/schemas/glossaries/optionGlossary.ts#L59)

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
