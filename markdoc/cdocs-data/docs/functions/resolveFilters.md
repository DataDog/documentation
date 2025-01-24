[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / resolveFilters

# Function: resolveFilters()

> **resolveFilters**(`p`): [`ResolvedFilters`](../type-aliases/ResolvedFilters.md)

Defined in: [src/api/shared/resolveFilters.ts:47](https://github.com/DataDog/documentation/blob/b75e75e1267d7b4c729d61650f6bdfccf0733955/markdoc/cdocs-data/src/api/shared/resolveFilters.ts#L47)

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

The page's filters manifest (either
the full version or the client-side version).

#### valsByTraitId

`Record`\<`string`, `string`\>

The user's existing customization selections,
keyed by trait ID.

## Returns

[`ResolvedFilters`](../type-aliases/ResolvedFilters.md)

A ResolvedFilters object, keyed by trait ID,
containing the relevant filter values and options
to display in the page customization menu.
