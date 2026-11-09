[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [semverIsAtLeast](../README.md) / semverIsAtLeast

# Function: semverIsAtLeast()

> **semverIsAtLeast**(`p`): `boolean`

Defined in: [src/api/shared/semverIsAtLeast.ts:10](https://github.com/DataDog/corp-node-packages/blob/5c24c72746b7247ccfbceb0819de8cf59d2217ff/packages/cdocs-data/src/api/shared/semverIsAtLeast.ts#L10)

Given a trait value that represents a semver,
such as 1_2_3 or gte_1_2_3, and a target semver,
such as 1, 1.2, or 1.2.3,
determine if the trait value meets or exceeds the target semver.

## Parameters

### p

#### target

`string`

#### traitValue

`string`

## Returns

`boolean`
