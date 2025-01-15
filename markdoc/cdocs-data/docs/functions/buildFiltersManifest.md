[**cdocs-data**](../README.md)

***

[cdocs-data](../globals.md) / buildFiltersManifest

# Function: buildFiltersManifest()

> **buildFiltersManifest**(`p`): [`FiltersManifest`](../type-aliases/FiltersManifest.md)

Defined in: [src/utils/buildFiltersManifest.ts:14](https://github.com/DataDog/documentation/blob/cd224ee345504c4db4f79b0b6511b02248729870/markdoc/cdocs-data/src/utils/buildFiltersManifest.ts#L14)

Combine a page's frontmatter, the global glossary,
and the global filter config into a single object
that defines the filters available on the page.

## Parameters

### p

#### customizationConfig

\{ `optionGlossary`: `Record`\<`string`, \{ `description`: `string`; `id`: `string`; `label`: `string`; \}\>; `optionGroupGlossary`: `Record`\<`string`, `object`[]\>; `traitGlossary`: `Record`\<`string`, \{ `description`: `string`; `id`: `string`; `label`: `string`; \}\>; \}

#### customizationConfig.optionGlossary

`Record`\<`string`, \{ `description`: `string`; `id`: `string`; `label`: `string`; \}\> = `OptionGlossarySchema`

#### customizationConfig.optionGroupGlossary

`Record`\<`string`, `object`[]\> = `OptionGroupGlossarySchema`

#### customizationConfig.traitGlossary

`Record`\<`string`, \{ `description`: `string`; `id`: `string`; `label`: `string`; \}\> = `TraitGlossarySchema`

#### frontmatter

\{ `content_filters`: `object`[]; `title`: `string`; \}

#### frontmatter.content_filters

`object`[] = `...`

#### frontmatter.title

`string` = `...`

## Returns

[`FiltersManifest`](../type-aliases/FiltersManifest.md)
