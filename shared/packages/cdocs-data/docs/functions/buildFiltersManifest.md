[**cdocs-data**](../README.md)

***

[cdocs-data](../modules.md) / buildFiltersManifest

# Function: buildFiltersManifest()

> **buildFiltersManifest**(`p`): [`FiltersManifest`](../ClientSideFiltersManifest/type-aliases/FiltersManifest.md)

Defined in: [src/api/compilation/buildFiltersManifest.ts:26](https://github.com/DataDog/corp-node-packages/blob/5c24c72746b7247ccfbceb0819de8cf59d2217ff/packages/cdocs-data/src/api/compilation/buildFiltersManifest.ts#L26)

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

#### frontmatter.content_filters

`object`[] = `...`

#### frontmatter.title

`string` = `...`

## Returns

[`FiltersManifest`](../ClientSideFiltersManifest/type-aliases/FiltersManifest.md)

A manifest that defines the filters available
on the page, including all data required to
render the filter and respond to user interactions.
