[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / OptionGroupGlossary

# Type Alias: OptionGroupGlossary

> **OptionGroupGlossary**: `Record`\<`string`, `object`[]\>

Defined in: [src/schemas/glossaries/optionGroupGlossary.ts:137](https://github.com/DataDog/documentation/blob/b898db3da077c905d05644b1aca1c0fe199f9494/markdoc/cdocs-data/src/schemas/glossaries/optionGroupGlossary.ts#L137)

A glossary of all the option groups that can be used on a site,
regardless of which filters they are associated with.

## Example

```ts
{
 *  primary_color_options: [
 *   { id: 'red', label: 'Red', default: true },
 *   { id: 'blue', label: 'Blue' },
 *   { id: 'yellow', label: 'Yellow' }
 *  ],
 *  traffic_light_color_options: [
 *   { id: 'red', label: 'Red', default: true },
 *   { id: 'green', label: 'Green' },
 *   { id: 'yellow', label: 'Yellow' }
 *  ],
 * }
```
