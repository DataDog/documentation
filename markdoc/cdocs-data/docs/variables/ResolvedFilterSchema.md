[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / ResolvedFilterSchema

# Variable: ResolvedFilterSchema

> `const` **ResolvedFilterSchema**: `ZodObject`\<[`ResolvedFilter`](../type-aliases/ResolvedFilter.md)\>

Defined in: [src/schemas/pageFilters.ts:34](https://github.com/DataDog/documentation/blob/3953d7af216b4170a6fe07795dfb4fd8d2a79be3/markdoc/cdocs-data/src/schemas/pageFilters.ts#L34)

A page filter that has been "resolved" into
its current value and available options.
The current value can be derived from default values
or user selections, and the available options
can sometimes be narrowed by previous user selections
that this selection depends on.

For example, assume the user must select dbm_host (such as `aws`)
before they can select a dbm_host_type (such as `ec2`).
The options for dbm_host_type will be
"resolved" (narrowed) based on the user's selection of dbm_host,
since not every possible host type option is valid for all hosts.
