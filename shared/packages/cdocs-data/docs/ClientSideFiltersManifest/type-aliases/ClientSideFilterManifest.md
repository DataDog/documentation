[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [ClientSideFiltersManifest](../README.md) / ClientSideFilterManifest

# Type Alias: ClientSideFilterManifest

> **ClientSideFilterManifest**: `object`

Defined in: [src/schemas/pageFilters.ts:238](https://github.com/DataDog/corp-node-packages/blob/5c24c72746b7247ccfbceb0819de8cf59d2217ff/packages/cdocs-data/src/schemas/pageFilters.ts#L238)

A lighter version of the FilterManifest schema,
designed to be used client-side.

## Type declaration

### config

> **config**: `object` = `FilterConfigSchema`

#### config.default\_value?

> `optional` **default\_value**: `string`

#### config.label

> **label**: `string`

#### config.option\_group\_id

> **option\_group\_id**: `string`

#### config.trait\_id

> **trait\_id**: `string`

### defaultValsByOptionGroupId

> **defaultValsByOptionGroupId**: `Record`\<`string`, `string`\>
