[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [buildFiltersManifest](../README.md) / buildSnakeCaseCombinations

# Function: buildSnakeCaseCombinations()

> **buildSnakeCaseCombinations**(`arr`, `str`, `final`): `string`[]

Defined in: [src/api/compilation/buildFiltersManifest.ts:509](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/api/compilation/buildFiltersManifest.ts#L509)

When given arrays of the segments of a potential snake_case string,
generate all possible combinations of the segments in snake_case.

## Parameters

### arr

`string`[][]

An array of arrays of strings. Each array represents
a set of possible values for a segment of a snake_case string.

### str

`string` = `''`

### final

`string`[] = `[]`

## Returns

`string`[]

An array of all possible snake_case combinations.

## Example

```ts
const segments = [['red', 'blue'], ['gloss', 'matte'], ['paint'], ['options']];
FiltersManifestBuilder.buildSnakeCaseCombinations(segments);
// returns ['red_gloss_paint_options', 'red_matte_paint_options', 'blue_gloss_paint_options', 'blue_matte_paint_options']
```
