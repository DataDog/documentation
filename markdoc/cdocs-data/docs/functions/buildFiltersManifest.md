[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / buildFiltersManifest

# Function: buildFiltersManifest()

> **buildFiltersManifest**(`p`): [`FiltersManifest`](../type-aliases/FiltersManifest.md)

Defined in: [src/api/compilation/buildFiltersManifest.ts:26](https://github.com/DataDog/documentation/blob/b898db3da077c905d05644b1aca1c0fe199f9494/markdoc/cdocs-data/src/api/compilation/buildFiltersManifest.ts#L26)

Combine a page's frontmatter, the global glossary,
and the global filter config into a single object
that defines the filters available on the page.

## Parameters

### p

#### customizationConfig

\{ `optionGroupsById`: `Record`\<`string`, `object`[]\>; `optionsById`: `Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; \}\>; `traitsById`: `Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; \}\>; \}

The global customization
configuration, which includes all traits, options, and
option groups that are available to the page.

#### customizationConfig.optionGroupsById

`Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`

#### customizationConfig.optionsById

`Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; \}\> = `OptionGlossarySchema`

#### customizationConfig.traitsById

`Record`\<`string`, \{ `id`: `string`; `internal_notes`: `string`; `label`: `string`; \}\> = `TraitGlossarySchema`

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
