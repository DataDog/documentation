[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / loadCustomizationConfig

# Function: loadCustomizationConfig()

> **loadCustomizationConfig**(`p`): `object`

Defined in: [src/utils/compilation/loadCustomizationConfig.ts:17](https://github.com/DataDog/documentation/blob/0066b7ea89bc7b2496bd1acb094be438a1351d3d/markdoc/cdocs-data/src/utils/compilation/loadCustomizationConfig.ts#L17)

Loads the customization configuration for all languages into memory,
including all configured traits, options, and option groups.

## Parameters

### p

#### configDir

`string`

The top-level directory where the customization configuration
files are located. The top-level directory should contain subdirectories for each
supported language.

#### defaultLang

`string`

The default language. Defaults to 'en'.

#### langs

`string`[]

The list of languages for which to load the customization configuration,
e.g. ['en', 'es', 'fr'].

## Returns

`object`

The customization configuration for each language, keyed by language code.

### customizationConfigByLang

> **customizationConfigByLang**: [`CustomizationConfigByLang`](../type-aliases/CustomizationConfigByLang.md)
