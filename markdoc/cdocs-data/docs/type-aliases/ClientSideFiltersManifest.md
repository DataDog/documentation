[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / ClientSideFiltersManifest

# Type Alias: ClientSideFiltersManifest

> **ClientSideFiltersManifest**: `object`

Defined in: [src/schemas/pageFilters.ts:262](https://github.com/DataDog/documentation/blob/b898db3da077c905d05644b1aca1c0fe199f9494/markdoc/cdocs-data/src/schemas/pageFilters.ts#L262)

A lighter version of the FiltersManifest schema,
designed to be used client-side.

## Type declaration

### defaultValsByTraitId

> **defaultValsByTraitId**: `Record`\<`string`, `string`\>

### filtersByTraitId

> **filtersByTraitId**: `Record`\<`string`, \{ `config`: \{ `default_value`: `string`; `label`: `string`; `option_group_id`: `string`; `trait_id`: `string`; \}; `defaultValsByOptionGroupId`: `Record`\<`string`, `string`\>; \}\>

### optionGroupsById

> **optionGroupsById**: `Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`
