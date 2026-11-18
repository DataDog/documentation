[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [resolveFilters](../README.md) / resolveFilterOptionsSource

# Function: resolveFilterOptionsSource()

> **resolveFilterOptionsSource**(`p`): `object`

Defined in: [src/api/shared/resolveFilters.ts:131](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/api/shared/resolveFilters.ts#L131)

Replace any placeholders in the options source of a page filter.
For example, if the options source is "<COLOR>_<FINISH>_paint_options",
and the user's existing preferences are { color: 'red', finish: 'gloss' },
the resolved options source would be "red_gloss_paint_options".

## Parameters

### p

#### pageFilterConfig

\{ `default_value`: `string`; `hide_if`: `Record`\<`string`, `string`[]\>[]; `label`: `string`; `option_group_id`: `string`; `show_if`: `Record`\<`string`, `string`[]\>[]; `trait_id`: `string`; \}

#### pageFilterConfig.default_value?

`string` = `...`

#### pageFilterConfig.hide_if?

`Record`\<`string`, `string`[]\>[] = `ConditionalDisplaySchema`

#### pageFilterConfig.label

`string` = `...`

#### pageFilterConfig.option_group_id

`string` = `...`

#### pageFilterConfig.show_if?

`Record`\<`string`, `string`[]\>[] = `ConditionalDisplaySchema`

#### pageFilterConfig.trait_id

`string` = `...`

#### selectedValsByTraitId

`Record`\<`string`, `string`\>

## Returns

`object`

### default\_value?

> `optional` **default\_value**: `string`

### hide\_if?

> `optional` **hide\_if**: `Record`\<`string`, `string`[]\>[] = `ConditionalDisplaySchema`

### label

> **label**: `string`

### option\_group\_id

> **option\_group\_id**: `string`

### show\_if?

> `optional` **show\_if**: `Record`\<`string`, `string`[]\>[] = `ConditionalDisplaySchema`

### trait\_id

> **trait\_id**: `string`
