[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / buildFiltersManifest

# Function: buildFiltersManifest()

> **buildFiltersManifest**(`p`): [`FiltersManifest`](../type-aliases/FiltersManifest.md)

Defined in: [src/utils/compilation/buildFiltersManifest.ts:26](https://github.com/DataDog/documentation/blob/c275cb05a4877dd5f4ee59df3f5c876b873b090c/markdoc/cdocs-data/src/utils/compilation/buildFiltersManifest.ts#L26)

Combine a page's frontmatter, the global glossary,
and the global filter config into a single object
that defines the filters available on the page.

## Parameters

### p

#### customizationConfig

\{ `optionGroupsById`: `Record`\<`string`, `object`[]\>; `optionsById`: `Record`\<`string`, \{ `description`: `string`; `id`: `string`; `label`: `string`; \}\>; `traitsById`: `Record`\<`string`, \{ `description`: `string`; `id`: `string`; `label`: `string`; \}\>; \}

The global customization
configuration, which includes all traits, options, and
option groups that are available to the page.

#### customizationConfig.optionGroupsById

`Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`

#### customizationConfig.optionsById

`Record`\<`string`, \{ `description`: `string`; `id`: `string`; `label`: `string`; \}\> = `OptionGlossarySchema`

#### customizationConfig.traitsById

`Record`\<`string`, \{ `description`: `string`; `id`: `string`; `label`: `string`; \}\> = `TraitGlossarySchema`

#### frontmatter

\{ `content_filters`: `object`[]; `title`: `string`; \}

The frontmatter for a page,
which has been obtained by parsing the page's Markdown
(or Markdoc, etc.) file.

#### frontmatter.content_filters

`object`[] = `...`

#### frontmatter.title

`string` = `...`

## Returns

[`FiltersManifest`](../type-aliases/FiltersManifest.md)

A manifest that defines the filters available
on the page, including all data required to
render the filter and respond to user interactions.
