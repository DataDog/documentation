[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / pruneManifestForClient

# Function: pruneManifestForClient()

> **pruneManifestForClient**(`manifest`): [`ClientSideFiltersManifest`](../type-aliases/ClientSideFiltersManifest.md)

Defined in: [src/api/compilation/pruneManifestForClient.ts:13](https://github.com/DataDog/documentation/blob/b898db3da077c905d05644b1aca1c0fe199f9494/markdoc/cdocs-data/src/api/compilation/pruneManifestForClient.ts#L13)

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

`Record`\<`string`, \{ `config`: \{ `default_value`: `string`; `label`: `string`; `option_group_id`: `string`; `trait_id`: `string`; \}; `defaultValsByOptionGroupId`: `Record`\<`string`, `string`\>; `possibleVals`: `string`[]; \}\> = `...`

#### optionGroupsById

`Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`

## Returns

[`ClientSideFiltersManifest`](../type-aliases/ClientSideFiltersManifest.md)

A ClientSideFiltersManifest, which includes only
the data required for rendering and updating filters
in the browser.
