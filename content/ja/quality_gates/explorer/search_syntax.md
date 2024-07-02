---
title: Quality Gates Explorer Search Syntax
kind: documentation
description: Search all of your quality gates or rule executions.
further_reading:
- link: /quality_gates/search
  tag: Documentation
  text: Filter and group quality gates
- link: /quality_gates/explorer/facets
  tag: Documentation
  text: Learn about facets
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Quality Gates is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Quality Gates is in public beta.
{{< /callout >}}

## Overview

A query filter is composed of terms and operators.

There are two types of terms:

* A **single term** is a single word such as `test` or `hello`.

* A **sequence** is a group of words surrounded by double quotes, such as `"hello dolly"`.

To combine multiple terms into a complex query, you can use any of the following case sensitive Boolean operators:

| **Operator** | **Description**                                                                                        | **Example**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **Intersection**: both terms are in the selected events. `AND` is the default if no operator is specified between terms.) | `authentication AND failure`   |
| `OR`         | **Union**: either term is contained in the selected events                                             | `authentication OR password`   |
| `-`          | **Exclusion**: the following term is NOT in the event (apply to each individual raw text search)                                                  | `authentication AND -password` |

## Search on attributes and tags

You are not required to define a facet in order to search on attributes and tags. To search on a specific attribute, add `@` to specify you are searching on an attribute. Attributes searches are case sensitive. Use free text search to get case insensitive results. 

For example, if you are interested in the `git.repository.name` attribute and you want to filter on the value `Datadog/documentation`, use `@git.repository.name:DataDog/documentation`.

To search for an attribute value that contains special characters, escape it with a backslash or use double quotes. For example, for an attribute `my_attribute` with the value `hello:world`, search using: `@my_attribute:hello\:world` or `@my_attribute:"hello:world"`.

To match a single special character or space, use the `?` wildcard. For example, for an attribute `my_attribute` with the values `hello world`, `hello-world`, or `hello_world`, search using: `@my_attribute:hello?world`.

For more information about tags, see [Using Tags][2].

## Wildcards

### Multi-character wildcard

To perform a multi-character wildcard search, use the `*` symbol as follows:

* `service:web*` matches every log message that has a service starting with `web`.
* `web*` matches all log messages starting with `web`.
* `*web` matches all log messages that end with `web`.

Wildcard searches work within tags and attributes (faceted or not) with this syntax. This query returns all the branches that start with `feature-`:

```
branch:feature-*
```

### Search wildcard

When searching for an attribute or tag value that contains special characters or requires escaping or double quotes, use the `?` wildcard to match a single special character or space. For example, to search for an attribute `my_attribute` with the value `hello world`, `hello-world`, or `hello_world`, use `@my_attribute:hello?world`.
<p> </p>



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /quality_gates/explorer/facets
[2]: /getting_started/tagging/using_tags
[3]: /infrastructure
[4]: /integrations