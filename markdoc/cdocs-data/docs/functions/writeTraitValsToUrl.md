[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / writeTraitValsToUrl

# Function: writeTraitValsToUrl()

> **writeTraitValsToUrl**(`p`): `URL`

Defined in: [src/api/browser/writeTraitValsToUrl.ts:10](https://github.com/DataDog/documentation/blob/b898db3da077c905d05644b1aca1c0fe199f9494/markdoc/cdocs-data/src/api/browser/writeTraitValsToUrl.ts#L10)

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
