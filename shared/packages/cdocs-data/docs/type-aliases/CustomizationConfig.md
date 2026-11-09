[**cdocs-data**](../README.md)

***

[cdocs-data](../modules.md) / CustomizationConfig

# Type Alias: CustomizationConfig

> **CustomizationConfig**: `object`

Defined in: [src/schemas/customizationConfig.ts:12](https://github.com/DataDog/corp-node-packages/blob/5c24c72746b7247ccfbceb0819de8cf59d2217ff/packages/cdocs-data/src/schemas/customizationConfig.ts#L12)

## Type declaration

### optionGroupsById

> **optionGroupsById**: `Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`

### optionsById

> **optionsById**: `Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; \}\> = `OptionGlossarySchema`

### traitsById

> **traitsById**: `Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; `type`: `"text"` \| `"semver"`; \}\> = `TraitGlossarySchema`
