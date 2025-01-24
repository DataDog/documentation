[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / getTraitValsFromUrl

# Function: getTraitValsFromUrl()

> **getTraitValsFromUrl**(`p`): `Record`\<`string`, `string`\>

Defined in: [src/api/browser/getTraitValsFromUrl.ts:9](https://github.com/DataDog/documentation/blob/b898db3da077c905d05644b1aca1c0fe199f9494/markdoc/cdocs-data/src/api/browser/getTraitValsFromUrl.ts#L9)

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
