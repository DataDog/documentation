[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [validateOptionGroupId](../README.md) / validateOptionGroupId

# Function: validateOptionGroupId()

> **validateOptionGroupId**(`p`): `object`

Defined in: [src/api/shared/validateOptionGroupId.ts:10](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/api/shared/validateOptionGroupId.ts#L10)

Validate a string representing an option group ID, or a resolved version of it.
(Resolved option group IDs cannot contain placeholders.)

## Parameters

### p

#### allowPlaceholders

`boolean`

#### id

`string`

## Returns

`object`

### error?

> `optional` **error**: `string`

### isValid

> **isValid**: `boolean`
