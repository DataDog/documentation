[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [buildFiltersManifest](../README.md) / getDefaultValsByTraitId

# Function: getDefaultValsByTraitId()

> **getDefaultValsByTraitId**(`p`): `Record`\<`string`, `string`\>

Defined in: [src/api/compilation/buildFiltersManifest.ts:461](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/api/compilation/buildFiltersManifest.ts#L461)

Derive the default values for each filter,
and return them keyed by filter ID.

## Parameters

### p

#### customizationConfig

\{ `optionGroupsById`: `Record`\<`string`, `object`[]\>; `optionsById`: `Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; \}\>; `traitsById`: `Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; `type`: `"text"` \| `"semver"`; \}\>; \}

#### customizationConfig.optionGroupsById

`Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`

#### customizationConfig.optionsById

`Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; \}\> = `OptionGlossarySchema`

#### customizationConfig.traitsById

`Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; `type`: `"text"` \| `"semver"`; \}\> = `TraitGlossarySchema`

#### filterConfigs

`object`[]

## Returns

`Record`\<`string`, `string`\>
