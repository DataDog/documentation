[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [ClientSideFiltersManifest](../README.md) / FilterManifest

# Type Alias: FilterManifest

> **FilterManifest**: `object`

Defined in: [src/schemas/pageFilters.ts:165](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/schemas/pageFilters.ts#L165)

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

#### config.hide\_if?

> `optional` **hide\_if**: `Record`\<`string`, `string`[]\>[] = `ConditionalDisplaySchema`

#### config.label

> **label**: `string`

#### config.option\_group\_id

> **option\_group\_id**: `string`

#### config.show\_if?

> `optional` **show\_if**: `Record`\<`string`, `string`[]\>[] = `ConditionalDisplaySchema`

#### config.trait\_id

> **trait\_id**: `string`

### defaultValsByOptionGroupId

> **defaultValsByOptionGroupId**: `Record`\<`string`, `string`\>

### optionLabelsByOptionId

> **optionLabelsByOptionId**: `Record`\<`string`, `string`\>

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
