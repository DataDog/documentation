[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [convertTraitValueToSemver](../README.md) / convertTraitValueToSemver

# Function: convertTraitValueToSemver()

> **convertTraitValueToSemver**(`traitValue`): `string`

Defined in: [src/api/shared/convertTraitValueToSemver.ts:8](https://github.com/DataDog/corp-node-packages/blob/5c24c72746b7247ccfbceb0819de8cf59d2217ff/packages/cdocs-data/src/api/shared/convertTraitValueToSemver.ts#L8)

Convert a trait value that represents a semver,
such as 1_2_3 or gte_1_2_3, to a semver string,
such as 1.2.3 or >=1.2.3.

## Parameters

### traitValue

`string`

## Returns

`string`
