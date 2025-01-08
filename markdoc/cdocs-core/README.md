# cdocs-core

Types and utilities for building customizable docs.

## What is a customizable doc?

A customizable doc uses *content filters* to hide irrelevant content on a documentation page. For example, if the user sets a page's "Programming language" filter to Python, all code examples would be in Python, and sections irrelevant to Python would be hidden. A content filter should represent a user characteristic or preference, such as their operating system.

## Scope of this package

The compilation/rendering of customizable docs is out of scope for this package, since it varies depending on which documentation platform is used, whether server-side rendering is used, and so on. 

But all customizable docs at Datadog use the same configuration patterns and runtime data, regardless of whether the page was created in Hugo or Astro. This package contains types and utility functions for safely ingesting and validating configuration, and for updating runtime data based on updates to the user's preferences. 

Because a customizable document has many content filter combinations that are difficult to test manually, it's crucial that all configuration data is valid to avoid unexpected behavior in production.

This package provides utilities for

- processing YAML configuration files into validated JavaScript objects that can be consumed by site generators like Astro and Hugo
- handling ongoing changes to the user's preferences (for example, in a site's client-side JavaScript if the page is statically rendered)
- protecting against translation errors in configuration files

For example, if a user changes their "Database" filter from "Postgres" to "Mongo", the options for the "Database version" filter should change accordingly. This package provides a function that re-resolves such options.

## How are content filters configured?

The name of each filter (such as "Favorite color") and the options for the filter (such as "purple" and "pink") are defined with YAML.

Key concepts:

- **Filters and their options are defined at the site level, not the page level.**
- **A page's configuration doesn't create any new filters** -- it just reuses filters and options that already exist in the site configuration.
- **A filter can (and usually does) have more than one set of options.** For example, two different pages can have the same `host` filter, but offer different host options based on the page's context. This package includes utility functions to facilitate graceful transitions between pages that use different options for the same filter.

### Site configuration scope

The exact location of the sitewide configuration YAML files depends on the site generation platform. But the following entities must be defined somewhere in the site's files:

- The list of filters, representing all of the choices the user can make on the site.
- The list of options, representing every possible option that can be chosen on the site.
- The *option sets*, which arrange the existing options into named, context-dependent lists, such as `product_abc_host_options` and `product_xyz_host_options`, and identify a default option for each named list.

If you've worked with databases, think of `options sets` as a join table between the `filters` table and the `options` table. Customizable docs are configured this way to prevent sprawl and avoid redundant data that can fall out of sync.

### Page configuration scope

The page's frontmatter answers two questions:

- Which existing filter do I want to use on this page?
- Which existing options set should that filter use?

### Example

It can be easier to work backward from an example page, so imagine you want to create a page with two filters:

- The user's host, such as `AWS`
- The user's database, such as `Postgres`

#### Page configuration

Your page's frontmatter would look something like this:

```yaml
title: An Example Page
content_filters:
  - id: host
    options_source: host_options
  - id: database
    options_source: database_options
```

#### Site configuration

Below is a site configuration example that would support the example frontmatter above.

##### `<SITE>/<CONFIG_FOLDER>/filters.yaml`

An annotated list of the choices the user can make, and descriptions of what this filter represents, and when it is appropriate to use on a page.

```yaml
- id: host
  display_name: Host
  description: "A cloud hosting provider, such as AWS or GCP. The value should be a vendor, not an operating system."
- id: database
  display_name: Database
  description: "Any database, such as Postgres or Mongo."
```

##### `<SITE>/<CONFIG_FOLDER>/options.yaml`

A list of every possible option on the site. 

An option can be reused across option sets. For example, `product_a_operating_system_options` and `product_b_operating_system_options` might both include the same Linux option.

```yaml
# cloud hosting providers
- id: aws
  display_name: AWS
- id: gcp
  display_name: GCP
- id: azure
  display_name: Azure
# databases
- id: postgress
  display_name: Postgres
- id: my_sql
  display_name: MySQL
- id: mongo
  display_name: Mongo
```

##### `<SITE>/<CONFIG_FOLDER>/option_sets.yaml`
```yaml
host_options:
  - id: aws
    default: true
    id: gcp
    id: azure

database_options:
  - id: postgres
    default: true
  - id: my_sql
  - id: mongo
```