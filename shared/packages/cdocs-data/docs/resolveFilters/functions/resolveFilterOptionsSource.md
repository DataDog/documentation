[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [resolveFilters](../README.md) / resolveFilterOptionsSource

# Function: resolveFilterOptionsSource()

> **resolveFilterOptionsSource**(`p`): [`FilterConfig`](../../type-aliases/FilterConfig.md)

Defined in: [src/api/shared/resolveFilters.ts:110](https://github.com/DataDog/corp-node-packages/blob/5c24c72746b7247ccfbceb0819de8cf59d2217ff/packages/cdocs-data/src/api/shared/resolveFilters.ts#L110)

Replace any placeholders in the options source of a page filter.
For example, if the options source is "<COLOR>_<FINISH>_paint_options",
and the user's existing preferences are { color: 'red', finish: 'gloss' },
the resolved options source would be "red_gloss_paint_options".

## Parameters

### p

#### pageFilterConfig

\{ `default_value`: `string`; `label`: `string`; `option_group_id`: `string`; `trait_id`: `string`; \}

#### pageFilterConfig.default_value

`string` = `...`

#### pageFilterConfig.label

`string` = `...`

#### pageFilterConfig.option_group_id

`string` = `...`

#### pageFilterConfig.trait_id

`string` = `...`

#### selectedValsByTraitId

`Record`\<`string`, `string`\>

## Returns

[`FilterConfig`](../../type-aliases/FilterConfig.md)
