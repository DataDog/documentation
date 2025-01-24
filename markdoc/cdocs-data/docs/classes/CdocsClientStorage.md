[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / CdocsClientStorage

# Class: CdocsClientStorage

Defined in: src/api/browser/CdocsClientStorage.ts:6

A wrapper for local storage that stores trait values,
ensuring that the number of stored keys does not exceed
a maximum value.

## Constructors

### new CdocsClientStorage()

> **new CdocsClientStorage**(`p`): [`CdocsClientStorage`](CdocsClientStorage.md)

Defined in: src/api/browser/CdocsClientStorage.ts:19

Create a new instance of CdocsClientStorage, resuming
any previous sessions by loading any existing trait values
from local storage.

#### Parameters

##### p

###### maxKeyCount

`number`

The maximum number of keys that should be stored at once.

###### topLevelKey

`string`

The key under which all data will be stored in local storage, such as 'cdocs-client-storage'.

#### Returns

[`CdocsClientStorage`](CdocsClientStorage.md)

## Methods

### clear()

> **clear**(): `void`

Defined in: src/api/browser/CdocsClientStorage.ts:105

Erase all stored trait values, but keep the top-level key.

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Defined in: src/api/browser/CdocsClientStorage.ts:97

Erase all stored data, including the top-level key.

#### Returns

`void`

***

### getTraitVals()

> **getTraitVals**(): `Record`\<`string`, `string`\>

Defined in: src/api/browser/CdocsClientStorage.ts:34

Get the value of all traits, keyed by trait ID.

#### Returns

`Record`\<`string`, `string`\>

A record of trait IDs to their values.

***

### readFromLocalStorage()

> **readFromLocalStorage**(): `void`

Defined in: src/api/browser/CdocsClientStorage.ts:86

Write the current storage from local storage.

Should be called once when the instance is created.

#### Returns

`void`

***

### setTraitVals()

> **setTraitVals**(`entries`): `Record`\<`string`, `string`\>

Defined in: src/api/browser/CdocsClientStorage.ts:53

Update the value of one or more traits.
Any trait IDs not provided will be left unchanged.

#### Parameters

##### entries

`Record`\<`string`, `string`\>

A record of trait IDs to their updated values.

#### Returns

`Record`\<`string`, `string`\>

A record of all known trait IDs to their values,
regardless of whether they were updated in this batch.

***

### writeToLocalStorage()

> **writeToLocalStorage**(): `Promise`\<`void`\>

Defined in: src/api/browser/CdocsClientStorage.ts:77

Asynchronously write the current storage to local storage,
so it can be accessed in future sessions.

#### Returns

`Promise`\<`void`\>
