[**cdocs-data**](../README.md)

***

[cdocs-data](../modules.md) / pruneManifestForClient

# Function: pruneManifestForClient()

> **pruneManifestForClient**(`manifest`): `object`

Defined in: [src/api/compilation/pruneManifestForClient.ts:17](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/api/compilation/pruneManifestForClient.ts#L17)

Convert a standard compile-time page filters manifest
to a lighter version to be used client-side.

## Parameters

### manifest

The FiltersManifest for a given page.

#### defaultValsByTraitId

`Record`\<`string`, `string`\> = `...`

#### errors

`object`[] = `...`

#### filtersByTraitId

`Record`\<`string`, \{ `config`: \{ `default_value`: `string`; `hide_if`: `Record`\<`string`, `string`[]\>[]; `label`: `string`; `option_group_id`: `string`; `show_if`: `Record`\<`string`, `string`[]\>[]; `trait_id`: `string`; \}; `defaultValsByOptionGroupId`: `Record`\<`string`, `string`\>; `optionLabelsByOptionId`: `Record`\<`string`, `string`\>; `possibleVals`: `string`[]; \}\> = `...`

#### optionGroupsById

`Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`

## Returns

`object`

A ClientSideFiltersManifest, which includes only
the data required for rendering and updating filters
in the browser.

### defaultValsByTraitId

> **defaultValsByTraitId**: `Record`\<`string`, `string`\>

### filtersByTraitId

> **filtersByTraitId**: `Record`\<`string`, \{ `config`: \{ `default_value`: `string`; `hide_if`: `Record`\<`string`, `string`[]\>[]; `label`: `string`; `option_group_id`: `string`; `show_if`: `Record`\<`string`, `string`[]\>[]; `trait_id`: `string`; \}; `defaultValsByOptionGroupId`: `Record`\<`string`, `string`\>; \}\>

### optionGroupsById

> **optionGroupsById**: `Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`
