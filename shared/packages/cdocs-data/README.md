# cdocs-data

This package contains utilities for handling customizable docs data:

- loading and validating configuration data
- creating and mutating runtime data
- storing user data in their browser for future retrieval

Eager to get started? Skip to the [usage examples](#usage-examples) or the [env setup instructions](#env-setup-instructions).

## What is a customizable doc?

A customizable doc uses filters to hide irrelevant content on a documentation page. For example, if the user sets the "Programming language" filter to Python, all code examples would be in Python, and sections irrelevant to Python would be hidden.

## Filters overview

### Key terms

A *filter* is a pairing of:

- A *trait*, which represents a user's characteristics or preferences, such as `programming_language`.
- An *option group* that contains an ordered list of options for that trait, such as `python` or `go`.

The available traits, options, and option groups are defined in YAML *glossaries* (allowlists containing all valid entries for each group).

A *resolved filter* includes:
- a trait
- an option group
- a *value* (the id of the option that the trait is currently set to, such as `python`)

A resolved filter's value might come from the default option in the option group, the URL of the page, or the user's stored preferences from a previous session on the docs site. But a filter's value always resolves to one of the options in the option group, even if a trait's value must be overwritten with the filter's default value in order to force that alignment.

Filters are *resolved* each time the user makes a *selection* (changes their existing filtering preferences).

### Configuration

#### Sitewide: Traits, options, and option groups

Traits and option groups (along with the individual options referenced by the option groups) are reusable throughout the entire docs site, and are defined in the site's *customization config*, a set of YAML files.

The top-level customization folder ([example](./test/integration/complexExample/customization_config/)) should have the following structure:
- a folder for each supported language, such as `en`, that contains
  - a `traits` folder containing YAML files that define traits ([example](./test/integration/complexExample/customization_config/en/traits/))
  - an `options` folder containing YAML files that define options ([example](./test/integration/complexExample/customization_config/en/options/))
  - an `option_groups` folder containing YAML files defining the option groups ([example](./test/integration/complexExample/customization_config/en/option_groups/))

The default language is used to backfill data for all other languages, so only the customization config for the default language needs definitions for every trait, option, and option group that is in use.

##### Configuring traits

Customization requires at least one user trait, such as their preferred database or operating system:

```yaml
traits:
  - id: db
    label: Database
    type: text # or semver, for traits like node_version
```

##### Configuring options

Customization requires least two *options*, such as `postgres`:

```yaml
options:
  - id: postgres
    label: Postgres
  - id: mysql
    label: MySQL
  - id: sqlite3
    label: Sqlite3
  - id: mongo
    label: Mongo
```

If you intend to use an option as the value for a trait of the `semver` type, such as `node_version`, the option ID must be formatted as `1_2_3`, and can optionally be prefixed with the following:

- `gt_` (greater than), such as `gt_5_0_0` (greater than 5.0.0).
- `lt_` (less than), such as `lt_2_1_1` (less than 2.1.1).
- `gte_` (greater than or equal to), such as `gte_1_0_3` (greater than or equal to 1.0.3).
- `lte_` (less than or equal to), such as `lte_4_9_1` (less than or equal to 4.9.1).

##### Configuring option groups

Customization requires at least one *option group*, an ordered list of existing options (defined above).

```yaml
product_one_db_options:
  - id: postgres
    default: true
  - id: mysql

product_two_db_options:
  - id: mongo
    default: true
  - id: mysql
  - id: postgres
  - id: sqlite3
```

Option groups do not define any new options.

#### Page-specific: Filters

Filters are defined in a page's front matter, and only apply to that page.

A *filter config*, which is defined in a page's front matter, combines a trait and an options group for use on that page:

```yaml
title: My Example Doc
content_filters:
  - trait_id: db
    option_group_id: product_two_db_options
```

The `option_group_id` of a filter can be *dynamic*:

```yaml
title: Learn About Animals
content_filters:
  - trait_id: habitat
    option_group_id: habitat_options
  - trait_id: animal
    option_group_id: <HABITAT>_animal_options
```

In the above example, the value for the trait `habitat` will be used to determine the options for `animal`. If the user has selected `desert` as the value for `habitat`, the `option group ID` becomes `desert_animal_options`, which might include options like `lizard` or `snake`.

`cdocs-data` automatically validates the existence of all referenced option groups. If `ocean` is a valid value for `habitat`, but the option group `ocean_animal_options` does not exist, `cdocs-data` reports an error.

##### Conditional filters

A filter can be made *conditional* using `show_if` or `hide_if`, so that it only displays when certain trait values are selected. When the conditions are not met, the resolved filter has `isShown: false` and its value resolves to the sentinel `cdocs_noop`, signaling that a renderer should hide the filter.

Conditional display works with both static and dynamic `option_group_id` values.

`show_if` specifies the conditions under which the filter should be **visible**. Each entry in the array is a condition, and the filter is shown if *any* condition matches (OR logic). Within a single condition, *all* key-value pairs must match (AND logic):

```yaml
title: Programming Language Runtimes
content_filters:
  - trait_id: prog_lang
    option_group_id: prog_lang_options
  - trait_id: runtime
    option_group_id: java_runtime_options
    show_if:
      - prog_lang: ["java"]
```

In this example, the `runtime` filter only appears when `prog_lang` is `java`. When the user selects `python` or `ruby`, the filter is hidden (`isShown: false`).

`hide_if` is the inverse -- the filter is hidden if *any* condition matches:

```yaml
title: Programming Language Runtimes
content_filters:
  - trait_id: prog_lang
    option_group_id: prog_lang_options
  - trait_id: runtime
    option_group_id: java_runtime_options
    hide_if:
      - prog_lang: ["python", "ruby"]
```

This achieves the same result as the `show_if` example above. Choose whichever is simpler for your use case.

Conditions can reference multiple traits. The following example shows the `runtime` filter only when `os` is `linux` or `mac_os` **and** `prog_lang` is `java`:

```yaml
show_if:
  - os: ["linux", "mac_os"]
    prog_lang: ["java"]
```

Multiple conditions act as an OR. The following shows the filter when either condition is met:

```yaml
show_if:
  - prog_lang: ["java"]
    os: ["linux", "windows"]
  - prog_lang: ["python"]
    os: ["mac_os"]
```

When a conditional filter has a dynamic `option_group_id` (using placeholders), `cdocs-data` automatically skips validation of option groups that correspond to excluded trait values. For example, if `option_group_id` is `<PROG_LANG>_runtime_options` and `show_if` only allows `java` and `python`, then `ruby_runtime_options` does not need to exist.

**Constraints:**

- `show_if` and `hide_if` are mutually exclusive -- a filter cannot have both.
- `show_if` and `hide_if` each take an array of condition objects. Each condition maps trait IDs to arrays of allowed option values.

## cdocs-data API

Key features are covered below, but for full details, see [the generated documentation](./docs).

### Compilation functions

- [`loadCustomizationConfig()`](./docs/functions/loadCustomizationConfig.md), which merges all of a site's YAML files into one customization config object
- [`buildFiltersManifest()`](./docs/functions/buildFiltersManifest.md), which combines the frontmatter of a page with the site's customization config to produce a `FiltersManifest`, an object that contains all the necessary data for filtering the page, such as which options should be available for each trait
- [`pruneManifestForClient()`](./docs/functions/pruneManifestForClient.md), which removes manifest keys that are unnecessary for client-side filtering

### Shared (compilation + browser) functions

- [`resolveFilters()`](./docs/resolveFilters/functions/resolveFilters.md), which combines the `FiltersManifest` with the user's selections in order to derive the current value and current option group for each filter.
- [`semverIsAtLeast()`](./docs/semverIsAtLeast/functions/semverIsAtLeast.md), which takes an option value (such as `lte_1_0_0`) and a target version requirement (such as `2.1.5`), and returns `true` if the actual value meets the target requirement.
- [`convertTraitValueToSemver()`](./docs/convertTraitValueToSemver/functions/convertTraitValueToSemver.md), which converts an option value such as `gt_1_0_0` to a version string such as `>1.0.0`. This is useful for validating an option value as a valid semver, and when working with packages such as `semver`.

### Browser functions and classes

- [`getTraitValsFromUrl()`](./docs/functions/getTraitValsFromUrl.md), which retrieves trait values from any search params present in a URL.
- [`writeTraitValsToUrl()`](./docs/functions/writeTraitValsToUrl.md), which writes updated trait values to a URL, ordering them consistently for SEO purposes.
- [`CdocsClientStorage`](./docs/classes/CdocsClientStorage.md), which manages reading/writing trait values to local storage, pruning older values when appropriate.

To reduce client bundle size, these can each be imported individually: `import { writeTraitValsToUrl } from "cdocs-data/writeTraitValsToUrl"`.

### Types and schemas

The package exports all relevant [types](./docs/type-aliases/) and [schemas](./docs/variables/) for creating or validating data, such as the `FiltersManifest`.

## Usage examples

Each example includes:

- A complete YAML customization config
- A test script that ingests the config, then calls the `cdocs-data` functions in the typical order 
  - For example, the script builds the filters for a given page by combining the page's frontmatter with the sitewide configuration data
- A folder of data snapshots, so you can explore the customization data as it existed at a given point in the test script

### Simple example

The simple example included in this package ([script](./test/integration/simpleExample/simpleExample.test.ts), [configuration data](./test/integration/simpleExample/customization_config/), [resulting data snapshots](./test/__snapshots__/simpleExample/)) provides support for a page where the user can select their favorite color (pink or purple).

### Complex example

The complex example included in this package ([script](./test/integration/complexExample/complexExample.test.ts), [configuration data](./test/integration/complexExample/customization_config/), [resulting data snapshots](./test/__snapshots__/complexExample/)) provides support for a page where the user can select a habitat, then select an animal from that particular habitat.

The option group for the `animal` filter is dynamic -- it depends on the user's selection for `habitat`.

### Conditional filter display examples

The conditional filter display tests ([test scripts](./test/integration/conditionalFilterDisplay/), [configuration data](./test/integration/conditionalFilterDisplay/customization_config/)) demonstrate a `runtime` filter that is conditionally shown or hidden based on `show_if` / `hide_if` conditions.

The tests cover a range of scenarios: single-trait and multi-trait conditions, with both static and dynamic (placeholder-based) option group IDs. When conditions are not met, the resolved filter has `isShown: false`.

## Env setup instructions

From the `cdocs-data` directory, run:

```shell
yarn install && yarn test
```

To experiment with the package's functionality:

1. Create a new branch.
2. Make modifications to [the simple example script](./test/integration/simpleExample/simpleExample.test.ts)/[configuration data](./test/integration/simpleExample/customization_config/), or the [complex example script](./test/integration/complexExample/complexExample.test.ts)/[configuration data](./test/integration/complexExample/customization_config/).
3. Run `yarn test` inside the `cdocs-data` directory to see how your changes have impacted any logs, test snapshots, and so on.

## Code conventions

### Type and schemas

#### Naming

Where possible, TypeScript types are derived from Zod schemas. The schema for `SomeType` will be named `SomeTypeSchema`.

When something has been ingested from YAML but is not yet in its final form, use the prefix `Raw`, such as `RawFrontmatter`.

Record types should end in `ById` or a similar indicator of what they are keyed by.

If a piece of data comes from YAML, it generally keeps its snake_case_name. This is because writers may need to reference configuration data in markup, and may find the camelcase conversion confusing.

#### Documentation

Data examples (tagged with `@example`) are often included in inline type documentation, but not inline schema documentation. This is to cut down on repetition without much downside, since examples are most useful on hover, and people are much more likely to hover on a type than a schema.

### Design patterns

#### Functional approach

The code uses pure functions where possible (no side effects like mutating parameters, mutating instance variables, etc.) The code is naturally opaque since it implements abstract operations that could be used on a wide range of data, and using pure functions reduces the potential for confusion and unexpected side effects that are difficult to debug.

#### Function arguments

To improve clarity, functions often take a single object as their argument, with the keys of that object serving as labels for the data. This object is always named `p`. For example, `function parkCar(p: { car: Car, space: ParkingSpace }`.

`p` should not be mutated in the function, and its data should not be destructured (copied) unless the intention is to mutate the copy. Instead, just access the data as `p.someData` throughout the function to keep the source of the data clear and reduce accidental mutations.

When a copy of any data in `p` is made (for example, in order to mutate it), the name of the copy should end in `Dup`.