[**cdocs-data**](../README.md)

***

[cdocs-data](../globals.md) / pruneManifestForClient

# Function: pruneManifestForClient()

> **pruneManifestForClient**(`manifest`): [`ClientSideFiltersManifest`](../type-aliases/ClientSideFiltersManifest.md)

Defined in: [src/utils/pruneManifestForClient.ts:7](https://github.com/DataDog/documentation/blob/cd224ee345504c4db4f79b0b6511b02248729870/markdoc/cdocs-data/src/utils/pruneManifestForClient.ts#L7)

Convert a standard compile-time page filters manifest
to a lighter version to be used client-side.

## Parameters

### manifest

#### defaultValsByTraitId

`Record`\<`string`, `string`\> = `...`

#### errors

`object`[] = `...`

#### filtersByTraitId

`Record`\<`string`, \{ `config`: \{ `default_value`: `string`; `label`: `string`; `option_group_id`: `string`; `trait_id`: `string`; \}; `defaultValsByOptionGroupId`: `Record`\<`string`, `string`\>; `possibleVals`: `string`[]; \}\> = `...`

#### optionGroupsById

`Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`

## Returns

[`ClientSideFiltersManifest`](../type-aliases/ClientSideFiltersManifest.md)
