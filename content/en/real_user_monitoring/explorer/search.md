---
title: RUM Search
kind: documentation
further_reading:
- link: "/real_user_monitoring/explorer/analytics/"
  tag: "Documentation"
  text: "Build analytics upon your events."
---

## Search syntax

A query is composed of terms and operators.

There are two types of terms:

* A **single term** is a single word such as `test` or `hello`.

* A **sequence** is a group of words surrounded by double quotes, such as `"hello dolly"`.

To combine multiple terms into a complex query, you can use any of the following Boolean operators:

| **Operator** | **Description**                                                                                       |
|--------------|-------------------------------------------------------------------------------------------------------|
| `AND`        | **Intersection**: both terms are in the selected views (if nothing is added, AND is taken by default) |
| `OR`         | **Union**: either term is contained in the selected views                                             |
| `-`          | **Exclusion**: the following term is NOT in the view                                                  |

### Autocomplete

Use the search bar's autocomplete feature to complete your query using existing values:

{{< img src="real_user_monitoring/explorer/search/search_bar_autocomplete.png" alt="search bar autocomplete "  style="width:60%;">}}

## Facets search

To search on a specific attribute, first [add it as a facet][1] and then add `@` to specify you are searching on a facet.

For instance, if your facet name is **url** and you want to filter on the **url** value *www.datadoghq.com*, enter:

`@url:www.datadoghq.com`

### Escaping of special characters

Searching on a facet value that contains special characters requires escaping or double quotes. The following characters are considered special: `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, and `\` require escaping with the `\` character.

The same logic is applied to spaces within views facet names. Views facets should not contain spaces, but if they do, spaces must be escaped. If a facet is named `user.first name`, perform a facet search by escaping the space: `@user.first\ name:myvalue`.

### Wildcards

To perform a multi-character wildcard search, use the `*` symbol. For instance, `@http.url:https:\/\/*` matches every view that has a URL starting with `https://`.

### Numerical values

Use `<`,`>`, `<=`, or `>=` to perform a search on numerical attributes. For instance, retrieve all views that have a duration over 100ns with:

`@duration:>100`

You can search for numerical attribute within a specific range. For instance, retrieve all your views with a duration between 100ns and 300ns:

`@duration:[100 TO 300]`

## Examples

`@http.url_details.path:"/api/v1/test"`
: Searches all views containing `/api/v1/test` in the attribute `http.url_details.path`.

`@http.url:\/api\/v1\/*`
: Searches all views containing a value in `http.url` attribute that start with `/api/v1/`.

`@duration:[100 TO 300] @http.url_details.path:\/api\/v1\/*`
: Searches all views with a `duration` between 100 and 300 ns, and containing a value in `http.url_details.path` attribute that start with `/api/v1/`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/#setup---facets--measures
