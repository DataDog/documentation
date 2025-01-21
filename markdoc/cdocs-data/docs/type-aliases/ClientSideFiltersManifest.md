[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / ClientSideFiltersManifest

# Type Alias: ClientSideFiltersManifest

> **ClientSideFiltersManifest**: `object`

Defined in: [src/schemas/pageFilters.ts:254](https://github.com/DataDog/documentation/blob/c275cb05a4877dd5f4ee59df3f5c876b873b090c/markdoc/cdocs-data/src/schemas/pageFilters.ts#L254)

A lighter version of the FiltersManifest schema,
designed to be used client-side.

## Type declaration

### defaultValsByTraitId

> **defaultValsByTraitId**: `Record`\<`string`, `string`\>

### filtersByTraitId

> **filtersByTraitId**: `Record`\<`string`, \{ `config`: \{ `default_value`: `string`; `label`: `string`; `option_group_id`: `string`; `trait_id`: `string`; \}; `defaultValsByOptionGroupId`: `Record`\<`string`, `string`\>; \}\>

### optionGroupsById

> **optionGroupsById**: `Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`
