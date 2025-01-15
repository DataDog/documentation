# cdocs-data

This package contains utilities for handling customizable docs data:

- loading and validating configuration data
- creating and mutating runtime data

## What is a customizable doc?

A customizable doc uses filters to hide irrelevant content on a documentation page. For example, if the user sets the "Programming language" filter to Python, all code examples would be in Python, and sections irrelevant to Python would be hidden.

## Filters overview

A *filter* is the combination of two entities:

- A *trait*, which represents an end user's characteristics or preferences, such as `programming_language`.
- An *option group* that contains an ordered list of options for the trait, such as `python` or `go`.

Traits and option groups (along with the individual options referenced by the option groups) are reusable throughout the entire docs site, and are defined in the site's *customization config*, a set of YAML files.

Filters are defined in a page's front matter, and only apply to that page. But if two filters on two separate pages reference the same trait (such as `operating_system`), the user's preference travels between pages when their preference is available on the new page.

In the `operating_system` example, the user's selection for `linux` transfers between two pages automatically if the destination page uses `linux` as an option for the `operating_system` trait. Otherwise, the destination page's default option for the `operating_system` trait automatically becomes the user's new selection.

Future versions might distinguish between explicit selections (something the user has chosen) and implicit selections (a default that has been chosen for the user, so this selection should still be overwritten by the explicit selection on any pages that support the explicit selection). But the current logic does not have this distinction, and the implicit selection travels until the user sets it to something else.

## cdocs-data utilities

This package provides four utility functions:

- `loadCustomizationConfig`, which merges all of a site's YAML files into one customization config object
- `buildFiltersManifest`, which combines the frontmatter of a page with the site's customization config to produce a `FiltersManifest`, an object that contains all the necessary data for filtering the page, such as which options should be available for each trait
- `pruneManifestForClient`, which removes manifest keys that are unnecessary for client-side filtering
- `resolveFilters`, which updates the filters manifest based on changes in the user's filter selections

The packages also exports types and schemas for data, such as the `FiltersManifest`.

## Configuration examples

### Customization config (sitewide)

#### Traits

Customization requires at least one user trait, such as their preferred database or operating system:

```yaml
traits:
  - id: db
    label: Database
```

#### Options

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

#### Option groups

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

## Page configuration

### Filters

A *filter config*, which is defined in a page's front matter, combines a trait and an options group for use on that page:

```yaml
title: My Example Doc
content_filters:
  - trait_id: db
    option_group_id: product_two_db_options
```
