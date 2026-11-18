[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [writeTraitValsToUrl](../README.md) / writeTraitValsToUrl

# Function: writeTraitValsToUrl()

> **writeTraitValsToUrl**(`p`): `URL`

Defined in: [src/api/browser/writeTraitValsToUrl.ts:10](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/api/browser/writeTraitValsToUrl.ts#L10)

Write a record of trait values to a URL,
forwarding any non-trait params.

## Parameters

### p

#### traitValsById

`Record`\<`string`, `string`\>

A record of trait IDs to their values.

#### url

`URL`

The URL to write to.

## Returns

`URL`

A new URL with the trait values written to the search params.
