# cdocs-core

Utilities for ingesting, validating, and mutating configuration data for customizable docs.

## What is a customizable doc?

A customizable doc uses filters to hide irrelevant content on a documentation page. For example, if the user sets the "Programming language" filter to Python, all code examples would be in Python, and sections irrelevant to Python would be hidden.

## Configuration overview

Most of the configuration data for customizable docs is sitewide, written in YAML files. 

Sitewide configuration requires the definition of three entities: 

- *traits*, representing some characteristic of the user, such as their `operating_system`.
- *options*, such as `linux`.
- *option groups*, which are ordered lists of existing options that include a designated default option. 
    - For example, an option group intended for use with the `operating_system` filter might include the options `linux`, `windows`, and `ios`, with `linux` configured as the default option.

The configuration for a given page can mix and match filters and options based on that page's specific context.

## Sitewide configuration

### Traits

Customization requires at least one user trait, such as their preferred `database` or `operating_system`:

```yaml
traits:
  - id: database
    label: Database
```

Filters can be used in multiple pages, and a user's selection for a filter (for example, the selection of Python as the programming language) travels between pages whenever possible. 

The options for a filter can vary from page to page, so when the user's previous selection is not available, the default option is applied instead.

### Options

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

Options can be used for more than one filter.

### Option groups

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

## Page configuration

A *customization*, which is defined in a page's frontmatter, pairs a filter and an options group for use on that page:

```yaml
title: My Example Doc
customizations:
  - trait_id: database
    option_group_id: product_two_db_options
```
