[**cdocs-data**](../README.md)

***

[cdocs-data](../globals.md) / OptionGroupGlossary

# Type Alias: OptionGroupGlossary

> **OptionGroupGlossary**: `Record`\<`string`, `object`[]\>

Defined in: [src/schemas/glossaries/optionGroupGlossary.ts:140](https://github.com/DataDog/documentation/blob/cd224ee345504c4db4f79b0b6511b02248729870/markdoc/cdocs-data/src/schemas/glossaries/optionGroupGlossary.ts#L140)

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
