[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [ClientSideFiltersManifest](../README.md) / FiltersManifest

# Type Alias: FiltersManifest

> **FiltersManifest**: `object`

Defined in: [src/schemas/pageFilters.ts:230](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/schemas/pageFilters.ts#L230)

A object containing all of the potential trait IDs
and option groups for a page, created by populating the front matter
placeholders with all possible values, then collecting all
configuration data necessary to support the resulting
filter and options set IDs.

Useful for efficiently validating, resolving,
and re-resolving filters.

## Type declaration

### defaultValsByTraitId

> **defaultValsByTraitId**: `Record`\<`string`, `string`\>

### errors

> **errors**: `object`[]

### filtersByTraitId

> **filtersByTraitId**: `Record`\<`string`, \{ `config`: \{ `default_value`: `string`; `hide_if`: `Record`\<`string`, `string`[]\>[]; `label`: `string`; `option_group_id`: `string`; `show_if`: `Record`\<`string`, `string`[]\>[]; `trait_id`: `string`; \}; `defaultValsByOptionGroupId`: `Record`\<`string`, `string`\>; `optionLabelsByOptionId`: `Record`\<`string`, `string`\>; `possibleVals`: `string`[]; \}\>

### optionGroupsById

> **optionGroupsById**: `Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`

## Example

```ts
{
 *   // a simple filter with no dependencies
 *   host: {
 *     config: {
 *       trait_id: 'host',
 *       option_group_id: 'host_options',
 *       default_value: 'aws'
 *     },
 *     defaultValsByOptionGroupId: {
 *       host_options: 'aws',
 *     },
 *     possibleVals: ['aws', 'gcp', 'azure']
 *   },
 *
 *   // a filter whose options depend on the user's selection of `host`,
 *   // yielding different options for each host type
 *   // and a wide variety of possible values overall
 *   host_type: {
 *     config: {
 *       trait_id: 'host_type',
 *       option_group_id: 'aws_host_types',
 *       default_value: 'ec2'
 *     },
 *     defaultValsByOptionGroupId: {
 *       aws_host_types: 'ec2',
 *       gcp_host_types: 'gce',
 *       azure_host_types: 'vm'
 *     },
 *     possibleVals: ['ec2', 'gce', [... many more possible values here]]
 *   }
 * }
```
