[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / OptionGroupGlossary

# Type Alias: OptionGroupGlossary

> **OptionGroupGlossary**: `Record`\<`string`, `object`[]\>

Defined in: [src/schemas/glossaries/optionGroupGlossary.ts:140](https://github.com/DataDog/documentation/blob/0066b7ea89bc7b2496bd1acb094be438a1351d3d/markdoc/cdocs-data/src/schemas/glossaries/optionGroupGlossary.ts#L140)

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
