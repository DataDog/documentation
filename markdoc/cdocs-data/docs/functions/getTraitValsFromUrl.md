[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / getTraitValsFromUrl

# Function: getTraitValsFromUrl()

> **getTraitValsFromUrl**(`p`): `Record`\<`string`, `string`\>

Defined in: src/api/browser/getTraitValsFromUrl.ts:9

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
