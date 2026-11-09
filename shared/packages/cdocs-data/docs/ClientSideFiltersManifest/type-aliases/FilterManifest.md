[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [ClientSideFiltersManifest](../README.md) / FilterManifest

# Type Alias: FilterManifest

> **FilterManifest**: `object`

Defined in: [src/schemas/pageFilters.ts:151](https://github.com/DataDog/corp-node-packages/blob/5c24c72746b7247ccfbceb0819de8cf59d2217ff/packages/cdocs-data/src/schemas/pageFilters.ts#L151)

The manifest for a single page filter,
containing all of the configuration data necessary
to support the filter and its options.

This is used to efficiently validate, resolve,
and re-resolve the filter.

## Type declaration

### config

> **config**: `object` = `FilterConfigSchema`

#### config.default\_value?

> `optional` **default\_value**: `string`

#### config.label

> **label**: `string`

#### config.option\_group\_id

> **option\_group\_id**: `string`

#### config.trait\_id

> **trait\_id**: `string`

### defaultValsByOptionGroupId

> **defaultValsByOptionGroupId**: `Record`\<`string`, `string`\>

### possibleVals

> **possibleVals**: `string`[]

## Example

```ts
// A manifest for a `host_type` filter
// whose options change depending on
// the user's previous selection of `host`.
{
  config: {
    trait_id: 'host_type',
    option_group_id: 'aws_host_types',
    default_value: 'ec2'
  },
  defaultValsByOptionGroupId: {
    aws_host_types: 'ec2',
    gcp_host_types: 'gce',
    azure_host_types: 'vm'
  },
  possibleVals: ['ec2', 'gce', [... many more possible values here]]
}
```
