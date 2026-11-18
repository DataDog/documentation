[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [ClientSideFiltersManifest](../README.md) / ClientSideFilterManifest

# Type Alias: ClientSideFilterManifest

> **ClientSideFilterManifest**: `object`

Defined in: [src/schemas/pageFilters.ts:248](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/schemas/pageFilters.ts#L248)

A lighter version of the FilterManifest schema,
designed to be used client-side.

## Type declaration

### config

> **config**: `object` = `FilterConfigSchema`

#### config.default\_value?

> `optional` **default\_value**: `string`

#### config.hide\_if?

> `optional` **hide\_if**: `Record`\<`string`, `string`[]\>[] = `ConditionalDisplaySchema`

#### config.label

> **label**: `string`

#### config.option\_group\_id

> **option\_group\_id**: `string`

#### config.show\_if?

> `optional` **show\_if**: `Record`\<`string`, `string`[]\>[] = `ConditionalDisplaySchema`

#### config.trait\_id

> **trait\_id**: `string`

### defaultValsByOptionGroupId

> **defaultValsByOptionGroupId**: `Record`\<`string`, `string`\>
