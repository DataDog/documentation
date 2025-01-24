[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / pruneManifestForClient

# Function: pruneManifestForClient()

> **pruneManifestForClient**(`manifest`): [`ClientSideFiltersManifest`](../type-aliases/ClientSideFiltersManifest.md)

Defined in: [src/api/compilation/pruneManifestForClient.ts:17](https://github.com/DataDog/corp-node-packages/blob/767b31fa96466b395043a1746f343c475d12807b/packages/cdocs-data/src/api/compilation/pruneManifestForClient.ts#L17)

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
