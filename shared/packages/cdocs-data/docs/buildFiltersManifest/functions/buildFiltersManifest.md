[**cdocs-data**](../../README.md)

***

[cdocs-data](../../modules.md) / [buildFiltersManifest](../README.md) / buildFiltersManifest

# Function: buildFiltersManifest()

> **buildFiltersManifest**(`p`): `object`

Defined in: [src/api/compilation/buildFiltersManifest.ts:27](https://github.com/DataDog/documentation/blob/795d5bed8eccc011660a1ae19654780b058983f8/shared/packages/cdocs-data/src/api/compilation/buildFiltersManifest.ts#L27)

Combine a page's frontmatter, the global glossary,
and the global filter config into a single object
that defines the filters available on the page.

## Parameters

### p

#### customizationConfig

\{ `optionGroupsById`: `Record`\<`string`, `object`[]\>; `optionsById`: `Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; \}\>; `traitsById`: `Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; `type`: `"text"` \| `"semver"`; \}\>; \}

The global customization
configuration, which includes all traits, options, and
option groups that are available to the page.

#### customizationConfig.optionGroupsById

`Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`

#### customizationConfig.optionsById

`Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; \}\> = `OptionGlossarySchema`

#### customizationConfig.traitsById

`Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; `type`: `"text"` \| `"semver"`; \}\> = `TraitGlossarySchema`

#### frontmatter

\{ `content_filters`: `object`[]; `title`: `string`; \}

The frontmatter for a page,
which has been obtained by parsing the page's Markdown
(or Markdoc, etc.) file.

#### frontmatter.content_filters?

`object`[] = `...`

#### frontmatter.title

`string` = `...`

## Returns

`object`

A manifest that defines the filters available
on the page, including all data required to
render the filter and respond to user interactions.

### defaultValsByTraitId

> **defaultValsByTraitId**: `Record`\<`string`, `string`\>

### errors

> **errors**: `object`[]

### filtersByTraitId

> **filtersByTraitId**: `Record`\<`string`, \{ `config`: \{ `default_value`: `string`; `hide_if`: `Record`\<`string`, `string`[]\>[]; `label`: `string`; `option_group_id`: `string`; `show_if`: `Record`\<`string`, `string`[]\>[]; `trait_id`: `string`; \}; `defaultValsByOptionGroupId`: `Record`\<`string`, `string`\>; `optionLabelsByOptionId`: `Record`\<`string`, `string`\>; `possibleVals`: `string`[]; \}\>

### optionGroupsById

> **optionGroupsById**: `Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`
