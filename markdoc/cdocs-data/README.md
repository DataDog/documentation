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

Filters are defined in a page's front matter, and only apply to that page. But if two filters on two separate pages reference the same trait (such as `database`), the user's preference travels between pages when their choice on the previous page is a valid option on the next page.

## Configuration examples

### Customization config (sitewide)

#### Traits

Customization requires at least one user trait, such as their preferred `database` or `operating_system`:

```yaml
traits:
  - id: database
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

A *filter*, which is defined in a page's front matter, combines a trait and an options group for use on that page:

```yaml
title: My Example Doc
content_filters:
  - trait_id: database
    option_group_id: product_two_db_options
```
