[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [ClientSideFiltersManifest](../README.md) / ClientSideFiltersManifest

# Type Alias: ClientSideFiltersManifest

> **ClientSideFiltersManifest**: `object`

Defined in: [src/schemas/pageFilters.ts:262](https://github.com/DataDog/corp-node-packages/blob/5c24c72746b7247ccfbceb0819de8cf59d2217ff/packages/cdocs-data/src/schemas/pageFilters.ts#L262)

A lighter version of the FiltersManifest schema,
designed to be used client-side.

## Type declaration

### defaultValsByTraitId

> **defaultValsByTraitId**: `Record`\<`string`, `string`\>

### filtersByTraitId

> **filtersByTraitId**: `Record`\<`string`, \{ `config`: \{ `default_value`: `string`; `label`: `string`; `option_group_id`: `string`; `trait_id`: `string`; \}; `defaultValsByOptionGroupId`: `Record`\<`string`, `string`\>; \}\>

### optionGroupsById

> **optionGroupsById**: `Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`
