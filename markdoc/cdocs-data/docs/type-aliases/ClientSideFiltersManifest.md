[**cdocs-data**](../README.md)

***

[cdocs-data](../globals.md) / ClientSideFiltersManifest

# Type Alias: ClientSideFiltersManifest

> **ClientSideFiltersManifest**: `object`

Defined in: [src/schemas/pageFilters.ts:254](https://github.com/DataDog/documentation/blob/cd224ee345504c4db4f79b0b6511b02248729870/markdoc/cdocs-data/src/schemas/pageFilters.ts#L254)

A lighter version of the FiltersManifest schema,
designed to be used client-side.

## Type declaration

### defaultValsByTraitId

> **defaultValsByTraitId**: `Record`\<`string`, `string`\>

### filtersByTraitId

> **filtersByTraitId**: `Record`\<`string`, \{ `config`: \{ `default_value`: `string`; `label`: `string`; `option_group_id`: `string`; `trait_id`: `string`; \}; `defaultValsByOptionGroupId`: `Record`\<`string`, `string`\>; \}\>

### optionGroupsById

> **optionGroupsById**: `Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`
