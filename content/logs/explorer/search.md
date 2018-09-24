---
title: Search
kind: documentation
description: "Search through all of your logs."
aliases:
    - /logs/search
further_reading:
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/explorer/patterns"
  tag: Documentation
  text: Detect patterns inside your logs
- link: "logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "logs/explorer/saved_views"
  tag: Documentation
  text: Automatically configure your Log Explorer
---

All of the search parameters are contained within the URL, so you can share your view simply sharing the URL.

{{< img src="logs/explorer/search_your_logs.gif" alt="Search your logs" responsive="true" >}}

## Search syntax

A query is composed of terms and operators.

There are two types of terms:

* A **Single Term** is a single word such as "test" or "hello".

* A **Sequence** is a group of words surrounded by double quotes such as "hello dolly".

To combine multiple terms into a complex query, you can use any of the following boolean operators:


|              |                                                                                                        |                              |
| :----        | :----                                                                                                  | :----                        |
| **Operator** | **Description **                                                                                       | **Example **                 |
| `AND`        | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | authentication AND failure   |
| `OR`         | **Union**: either term is contained in the selected events                                             | authentication OR password   |
| `-`          | **Exclusion**: the following term is NOT in the event                                                  | authentication AND -password |

## Facet search

To search on a specific [facet](#facets) you need to [add it as a facet first](#create-a-facet) then add `@` to specify you are searching on a facet.

For instance, if your facet name is **url** and you want to filter on the **url** value *www.datadoghq.com* just enter:

`@url:www.datadoghq.com`

## Wildcards

To perform a multi-character wildcard search, use the `*` symbol as follows:

* `service:web*`  matches every log message that has a service starting by "web".
* `hello*` matches all log messages starting with hello
* `*hello` matches all log messages that end with hello

## Numerical values
Use `<`,`>`, `<=`, or `>=` to perform a search on numerical attributes. For instance, retrieve all logs that have a response time over 100ms with:

`@http.response_time:>100`

It is also possible to search for numerical attribute within a specific range. For instance, retrieve all your 4xx errors with:

`@http.status_code:[400 TO 499]`

## Tags

Your logs inherit tags from [hosts][4] and [integrations][5] that generate them. They can be used in the search and as facets as well:

* `test` is searching for the string "test".
* `("env:prod" OR test)` matches all logs with the tag `#env:prod` or the tag `#test`
* `(service:srvA OR service:srvB)` or `(service:(srvA OR srvB))` Matches all logs that contain tags `#service:srvA` or `#service:srvB`.
* `("env:prod" AND -"version:beta")` matches all logs that contain `#env:prod` and that do not contain `#version:beta`

If your tags don't follow [tags best practices][6] and don't use the `key:value` syntax, use this search query:

* `tags:<MY_TAG>`

## Autocomplete

Typing a complex query can be cumbersome. Use the search bar's autocomplete feature to complete your query using existing values:

{{< img src="logs/explorer/search/search_bar_autocomplete.png" alt="search bar autocomplete " responsive="true" style="width:80%;">}}

## Escaping of special characters

The following attributes are considered as special: `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, and `\` require escaping.
For instance, to search logs that contain `user=12345` the following search must be entered:

`user\=JaneDoe`

The same logic must be applied to spaces within log attributes. Log attributes should not contain spaces, but in such a case, spaces must be escape.
If an attribute was called `user.first name`, perform a search on this attribute by escaping the space:

`@user.first\ name:myvalue`

## Saved Searches

Don't lose time building the same views everyday. Saved Views contain your search query, columns, time horizon, and facet.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/processors/#attribute-remapper
[2]: /logs/explorer/analytics
[4]: /graphing/infrastructure/
[5]: /integrations/#cat-log-collection
[6]: /tagging/#tags-best-practices
