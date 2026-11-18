[**cdocs-data**](../README.md)

***

[cdocs-data](../modules.md) / shouldDisplayFilter

# Function: shouldDisplayFilter()

> **shouldDisplayFilter**(`p`): `boolean`

Defined in: [src/api/shared/shouldDisplayFilter.ts:42](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/api/shared/shouldDisplayFilter.ts#L42)

Determine whether a filter should be displayed,
given the current user trait selections
and the filter's show_if / hide_if configuration.

- No conditions: always display.
- show_if: display if ANY condition matches (OR of ANDs).
- hide_if: hide if ANY condition matches (OR of ANDs).

## Parameters

### p

#### filterConfig

\{ `default_value`: `string`; `hide_if`: `Record`\<`string`, `string`[]\>[]; `label`: `string`; `option_group_id`: `string`; `show_if`: `Record`\<`string`, `string`[]\>[]; `trait_id`: `string`; \}

#### filterConfig.default_value?

`string` = `...`

#### filterConfig.hide_if?

`Record`\<`string`, `string`[]\>[] = `ConditionalDisplaySchema`

#### filterConfig.label

`string` = `...`

#### filterConfig.option_group_id

`string` = `...`

#### filterConfig.show_if?

`Record`\<`string`, `string`[]\>[] = `ConditionalDisplaySchema`

#### filterConfig.trait_id

`string` = `...`

#### valsByTraitId

`Record`\<`string`, `string`\>

## Returns

`boolean`
