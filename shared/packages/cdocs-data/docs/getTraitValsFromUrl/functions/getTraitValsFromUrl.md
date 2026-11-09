[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [getTraitValsFromUrl](../README.md) / getTraitValsFromUrl

# Function: getTraitValsFromUrl()

> **getTraitValsFromUrl**(`p`): `Record`\<`string`, `string`\>

Defined in: [src/api/browser/getTraitValsFromUrl.ts:9](https://github.com/DataDog/corp-node-packages/blob/5c24c72746b7247ccfbceb0819de8cf59d2217ff/packages/cdocs-data/src/api/browser/getTraitValsFromUrl.ts#L9)

Read the selected trait values from the URL.

## Parameters

### p

#### traitIds

`string`[]

The trait IDs to read from the URL, such as ['host', 'programming_language'].

#### url

`URL`

The URL to read from.

## Returns

`Record`\<`string`, `string`\>

A record of trait IDs to their values.
