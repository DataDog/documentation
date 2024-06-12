---
title: Test Visibility Explorer Search Syntax
kind: documentation
description: Learn how to search for all of your test runs in the Test Visibility Explorer.
further_reading:
- link: "/tests/search"
  tag: "Documentation"
  text: "Filter and group tests"
- link: "/tests/explorer/facets"
  tag: "Documentation"
  text: "Learn about facets"
---

## Overview

A query filter is composed of terms and operators.

There are two types of terms:

* A **single term** is a single word such as `test` or `hello`.

* A **sequence** is a group of words surrounded by double quotes, such as `"hello dolly"`.

To combine multiple terms into a complex query, you can use any of the following case sensitive Boolean operators:

| **Operator** | **Description**                                                                                        | **Example**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | authentication AND failure   |
| `OR`         | **Union**: either term is contained in the selected events                                             | authentication OR password   |
| `-`          | **Exclusion**: the following term is NOT in the event (apply to each individual raw text search)                                                  | authentication AND -password |

## Search on attributes and tags

You are not required to define a facet in order to search on attributes and tags. To search on a specific attribute, add `@` to specify you are searching on an attribute. Attributes searches are case sensitive. Use free text search to get case insensitive results. 

For example, if you are interested in the `git.repository.name` attribute and you want to filter on the value `Datadog/documentation`, use `@git.repository.id:"github.com/Datadog/documentation"`.

Searching for an attribute value that contains special characters requires escaping or double quotes. For example, for an attribute `my_attribute` with the value `hello:world`, search using: `@my_attribute:hello\:world` or `@my_attribute:"hello:world"`.

To match a single special character or space, use the `?` wildcard. For example, for an attribute `my_attribute` with the value `hello world`, search using: `@my_attribute:hello?world`.

For more information about tags, see [Using Tags][2].

## Wildcards

### Multi-character wildcard

To perform a multi-character wildcard search, use the `*` symbol as follows:

* `service:web*` matches every log message that has a service starting with `web`.
* `web*` matches all log messages starting with `web`.
* `*web` matches all log messages that end with `web`.

Wildcard searches work within tags and attributes (faceted or not) with this syntax. This query returns all the services that end with the string `mongo`:
<p> </p>
<p></p>

```
test.service:*mongo
```

### Search wildcard

When searching for an attribute or tag value that contains special characters or requires escaping or double quotes, use the `?` wildcard to match a single special character or space. For example, to search for an attribute `my_attribute` with the value `hello world`: `@my_attribute:hello?world`.
<p> </p>

## Numerical values

In order to search on a numerical attribute, first [add it as a facet][1]. You can then use numerical operators (`<`,`>`, `<=`, or `>=`) to perform a search on numerical facets.

For example, to retrieve all test runs that have a duration of over one week, use: `@duration:>=7days`.

## Tags

Your test runs inherit tags from [hosts][3] and [integrations][4] that generate them. They can be used in the search and as facets as well:

* `test` is searching for the string "test".
* `env:(prod OR test)` matches all test runs with the tag `env:prod` or the tag `env:test`.
* `(env:prod AND -version:beta)` matches all test runs that contain tag `env:prod` and that do not contain tag `version:beta`.

If your tags don't follow [tags best practices][5] and don't use the `key:value` syntax, use this search query: `tags:<MY_TAG>`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/explorer/facets
[2]: /getting_started/tagging/using_tags
[3]: /infrastructure
[4]: /integrations
[5]: /getting_started/tagging/#define-tags