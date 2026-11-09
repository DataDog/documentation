[**cdocs-data**](../README.md)

***

[cdocs-data](../modules.md) / pruneManifestForClient

# Function: pruneManifestForClient()

> **pruneManifestForClient**(`manifest`): [`ClientSideFiltersManifest`](../ClientSideFiltersManifest/type-aliases/ClientSideFiltersManifest.md)

Defined in: [src/api/compilation/pruneManifestForClient.ts:17](https://github.com/DataDog/corp-node-packages/blob/5c24c72746b7247ccfbceb0819de8cf59d2217ff/packages/cdocs-data/src/api/compilation/pruneManifestForClient.ts#L17)

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

[`ClientSideFiltersManifest`](../ClientSideFiltersManifest/type-aliases/ClientSideFiltersManifest.md)

A ClientSideFiltersManifest, which includes only
the data required for rendering and updating filters
in the browser.
