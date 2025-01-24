[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / CdocsClientStorage

# Class: CdocsClientStorage

Defined in: [src/api/browser/CdocsClientStorage.ts:6](https://github.com/DataDog/corp-node-packages/blob/767b31fa96466b395043a1746f343c475d12807b/packages/cdocs-data/src/api/browser/CdocsClientStorage.ts#L6)

A wrapper for local storage that stores trait values,
ensuring that the number of stored keys does not exceed
a maximum value.

## Constructors

### new CdocsClientStorage()

> **new CdocsClientStorage**(`p`): [`CdocsClientStorage`](CdocsClientStorage.md)

Defined in: [src/api/browser/CdocsClientStorage.ts:22](https://github.com/DataDog/corp-node-packages/blob/767b31fa96466b395043a1746f343c475d12807b/packages/cdocs-data/src/api/browser/CdocsClientStorage.ts#L22)

Create a new instance of CdocsClientStorage, resuming
any previous sessions by loading any existing trait values
from local storage.

#### Parameters

##### p

###### maxKeyCount

`number`

The maximum number of keys that should be stored
in the user's browser at one time.

###### topLevelKey

`string`

A unique key under which all cdocs data
will be kept in local storage, such as 'cdocs-client-storage'.

#### Returns

[`CdocsClientStorage`](CdocsClientStorage.md)

## Methods

### clear()

> **clear**(): `void`

Defined in: [src/api/browser/CdocsClientStorage.ts:100](https://github.com/DataDog/corp-node-packages/blob/767b31fa96466b395043a1746f343c475d12807b/packages/cdocs-data/src/api/browser/CdocsClientStorage.ts#L100)

Erase all stored trait values, but keep the top-level key.

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Defined in: [src/api/browser/CdocsClientStorage.ts:108](https://github.com/DataDog/corp-node-packages/blob/767b31fa96466b395043a1746f343c475d12807b/packages/cdocs-data/src/api/browser/CdocsClientStorage.ts#L108)

Erase all browser data stored by this class.

#### Returns

`void`

***

### getTraitVals()

> **getTraitVals**(): `Record`\<`string`, `string`\>

Defined in: [src/api/browser/CdocsClientStorage.ts:38](https://github.com/DataDog/corp-node-packages/blob/767b31fa96466b395043a1746f343c475d12807b/packages/cdocs-data/src/api/browser/CdocsClientStorage.ts#L38)

Get the value of all traits, keyed by trait ID.

#### Returns

`Record`\<`string`, `string`\>

A record of trait IDs to their values,
such as { 'os': 'linux' }.

***

### loadLocalStorageData()

> **loadLocalStorageData**(): `void`

Defined in: [src/api/browser/CdocsClientStorage.ts:89](https://github.com/DataDog/corp-node-packages/blob/767b31fa96466b395043a1746f343c475d12807b/packages/cdocs-data/src/api/browser/CdocsClientStorage.ts#L89)

Overwrite the in-memory storage with
whatever is in local storage.

#### Returns

`void`

***

### setTraitVals()

> **setTraitVals**(`entries`): `Record`\<`string`, `string`\>

Defined in: [src/api/browser/CdocsClientStorage.ts:57](https://github.com/DataDog/corp-node-packages/blob/767b31fa96466b395043a1746f343c475d12807b/packages/cdocs-data/src/api/browser/CdocsClientStorage.ts#L57)

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

Defined in: [src/api/browser/CdocsClientStorage.ts:81](https://github.com/DataDog/corp-node-packages/blob/767b31fa96466b395043a1746f343c475d12807b/packages/cdocs-data/src/api/browser/CdocsClientStorage.ts#L81)

Asynchronously write the current storage to local storage,
so it can be accessed in future sessions.

#### Returns

`Promise`\<`void`\>
