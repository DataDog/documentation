[**cdocs-data**](../README.md)

***

[cdocs-data](../globals.md) / resolveFilters

# Function: resolveFilters()

> **resolveFilters**(`p`): [`ResolvedFilters`](../type-aliases/ResolvedFilters.md)

Defined in: [src/utils/resolveFilters.ts:37](https://github.com/DataDog/documentation/blob/cd224ee345504c4db4f79b0b6511b02248729870/markdoc/cdocs-data/src/utils/resolveFilters.ts#L37)

Resolve the page filters object that is used
to populate the page customization menu.

If the user chooses Postgres as their database,
this impacts what options should show
in the "Database version" filter. Resolution is the process
that populates the correct values.

Resolution merges a user's customization choices in the UI
with the page's filter configuration (defined in its frontmatter)
to determine which filter values and options to display.
Resolution involves replacing placeholders
with user-selected values, determining any default values
resulting from the user's earlier selections, and so on.

## Parameters

### p

#### filtersManifest

\{ `defaultValsByTraitId`: `Record`\<`string`, `string`\>; `errors`: `object`[]; `filtersByTraitId`: `Record`\<`string`, \{ `config`: \{ `default_value`: `string`; `label`: `string`; `option_group_id`: `string`; `trait_id`: `string`; \}; `defaultValsByOptionGroupId`: `Record`\<`string`, `string`\>; `possibleVals`: `string`[]; \}\>; `optionGroupsById`: `Record`\<`string`, `object`[]\>; \} \| \{ `defaultValsByTraitId`: `Record`\<`string`, `string`\>; `filtersByTraitId`: `Record`\<`string`, \{ `config`: \{ `default_value`: `string`; `label`: `string`; `option_group_id`: `string`; `trait_id`: `string`; \}; `defaultValsByOptionGroupId`: `Record`\<`string`, `string`\>; \}\>; `optionGroupsById`: `Record`\<`string`, `object`[]\>; \}

#### valsByTraitId

`Record`\<`string`, `string`\>

## Returns

[`ResolvedFilters`](../type-aliases/ResolvedFilters.md)
