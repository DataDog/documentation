---
title: Metrics Search Syntax
description: Learn about how to use metrics search syntax for your Observability Pipelines processors filter queries.
disable_toc: false
code_lang: metrics
type: multi-code-lang
weight: 2
---

## Overview

When you add a processor to a pipeline, you can filter metrics ({{< tooltip glossary="preview" case="title" >}}) to only process a defined subset. This document goes over the following information:

- [Free text search](#free-text-search)
- [Attribute search](#attribute-search)
- [Tags search](#tags-search)
- [Boolean operators](#boolean-operators)
- [Wildcards](#wildcards)

**Note**: Metrics search syntax is case sensitive.

## Free text search

Free text search for metrics only searches the `name` field.

An example of a free text search: `system.cpu.user`, which matches metrics with `name:system.cpu.user`.

## Attribute search

You can search the attribute keys:

- `kind`: Whether the metrics is `absolute` or `incremental`.
-  `value`: The metric type.
	- `counter`
	- `gauge`
	- `distribution`
	- `histogram`

Here are some attribute search syntax examples:

`kind:absolute`
: Matches metrics with `kind:absolute`.

`value:counter`
: Matches `counter` metrics.

## Tags search

You can search a metric's `tags`. Special characters and spaces in a tag must be escaped in the search syntax.

### Escape special characters and spaces

The following characters are considered special and must be escaped with a backslash (`\`):

`-` `!` `&&` `||` `>` `>=` `<` `<=` `(` `)` `{` `}` `[` `]` `"` `*` `?` `:` `#`, and spaces.

**Notes**:

- `/` is not considered a special character and doesn't need to be escaped.
- You can search for special characters in a tag. See [Search for a tag that contains special characters](#search-for-a-tag-that-contains-special-characters).
- If you want to match metrics tags that contain the special character `!` , use the attribute search syntax: `tags:*\:!*.`

### Search for a tag that contains special characters

Searching for a tag that contains special characters requires escaping or double quotes. For example, to search for a tag `service` with the value `web-store`, use one of the following search syntaxes:

- `tags:service\:web\-store`
- `tags:service\:"web-store"`

### Match a single special character

To match a single special character or space, use the `?` wildcard. For example, the search syntax: `"tags:service\:web?store"` matches metrics with either of these tags:

- `service:"web store"`
- `service:"web-store"`

### Examples

To learn how to escape special characters in a tag search, let's look at a metric example:

```
{
  "name":"datadog.agent.retry_queue_duration.bytes_per_sec",
  "tags":{
      "agent":"core",
      "domain":"https://7-72-3-app.agent.datadoghq.com",
      "host":"COMP-YGVQDJG75L",
      "source_type_name":"System",
      "env:prod",
      "service:web-store"
    },
  "timestamp":"2025-11-28T13:03:09Z",
  "kind":"absolute",
  "gauge":{"value":454.1372767857143}
}
```

The following are search syntax examples that escape special characters in the metric example:

`tags:env*`
: Matches metrics with  `tags` containing the `env`  key.

`tags:(env\:prod OR env\:test)`
: Matches metrics with `env:prod` or `env:test` in `tags`.
: This query can also be written as `tags:("env:prod" OR "env:test")`.

`tags:env\:prod AND -tags:version\:beta`
: Matches metrics that have `env:prod` and does not have `version:beta` in `tags`.
: This query can also be written as `tags:"env:prod" AND -tags:"version:beta"`.

## Boolean operators

You can use the following case sensitive Boolean operators to combine multiple terms in a search query.

The follow are example queries that use Boolean operators:

`NOT system.cpu.user`
: Matches metrics that do not have `name:system.cpu.user`.
: This query can also be written as `-system.cpu.user`.

`system.cpu.user OR system.cpu.user.total`
: Matches metrics that have either `name:system.cpu.user` or `name:system.cpu.user.total`.

`value:counter AND (tags:env\:staging OR tags:env\:dev)`
: Matches metrics that have both `counter:{value:<value>}` and the either the tag `env:prod` or `env:dev`

## Wildcards

​​You can use `*` for wildcard searches. The following are wildcard search examples:

`*system.cpu.user*`
: Matches metrics with a `name` value that contains `system.cpu.user`.

`system.cpu.user*`
: Matches metrics with a `name` value that starts with `system.cpu.user`.

`*system.cpu.user`
: Matches metrics with a `name` value that ends with `system.cpu.user`.

`tags:*\:bin`
: Matches metrics that have a tag with the value `bin`, regardless of what the tag key is.
