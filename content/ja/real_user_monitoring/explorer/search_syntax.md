---
title: Search Syntax
kind: documentation
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Search for your events
---

## Overview

A query is composed of terms and operators.

There are two types of terms:

* A **single term** is a single word such as `test` or `hello`.

* A **sequence** is a group of words surrounded by double quotes, such as `"hello dolly"`.

To combine multiple terms into a complex query, you can use any of the following Boolean operators:

| **Operator** | **Description**                                                                                       |
|--------------|-------------------------------------------------------------------------------------------------------|
| `AND`        | **Intersection**: Both terms are in the selected views (if nothing is added, AND is taken by default). |
| `OR`         | **Union**: Either term is contained in the selected views.                                             |
| `-`          | **Exclusion**: The following term is not in the view.                                                  |

## Autocomplete

Use the search bar's autocomplete functionality to complete your queries with existing values.

{{< img src="real_user_monitoring/explorer/search/search_bar_autocomplete2.png" alt="Search bar autocomplete" style="width:90%;" >}}

## Escape special characters

Searching on a facet value that contains special characters requires escaping or double quotes. The following characters are considered special: `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, and `\` requires escaping with the `\` character.

The same logic is applied to spaces within views facet names. Views facets should not contain spaces, but if they do, spaces must be escaped. 

For example, if a facet is named `user.first name`, perform a facet search by escaping the space: `@user.first\ name:myvalue`.

## Wildcards

To perform a multi-character wildcard search, use the `*` symbol. For example, `@http.url:https:\/\/*` matches every view that has a URL starting with `https://`.

## Numerical values

Use `<`,`>`, `<=`, or `>=` to perform a search on numerical attributes. For example, retrieve all sessions with more than five errors: `@session.error.count:>5`.

You can search for a numerical attribute within a specific range. For example, retrieve all sessions with an error count between three and ten: `@session.error.count:[3 TO 10]`.

## Search examples

`@view.url_path:"/department/sofas"`
: Searches all views containing `/department/sofas` in the attribute `@view.path`.

`@view.url_path:\/department\/sofas\/*`
: Searches all views containing a value in `view.path` attribute that start with `/department/sofas/`.

`@view.loading_time:[1s TO 3s] @view.url_path:\/department\/sofas\/*`
: Searches all views with a `loading_time` between one and three seconds with a value in the `@view.url_path` attribute that starts with `/department/sofas/`.

## Saved searches

[Saved Views][1] contain your search query, columns, sort order, time range, and facets.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/saved_views
