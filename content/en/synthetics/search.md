---
title: Search and Manage Synthetic Tests
kind: documentation
description: Search and manage your Synthetic tests.
---

## Overview

Search, access, and manage all of your tests in one location on the [Synthetic Tests page][1]. View tests that are alerting, get an overview of the state of your application with features like uptime and response time graphs, and more.

The facets and tags panel on the left side of the page lists several default facets and custom tags you can use to create a query.

Default facets include:

* `Type`
* `Status`
* `Creator`
* `Region`
* `State`
* `Notification`
* `Env`

These are available under the **Synthetic Filters** section. There is also a **Tags** section that populates based on your existing [Synthetic test][2] tags. To add new tags for querying, hover over any Synthetic test row in the table and click the pencil **Edit** button. You can add tags under the `Additional Tags` section.

As you select and deselect facet and tag checkboxes, or as you select facets and tags in the search bar, the search bar will automatically update with the equivalent query. When selecting several facets, the search performs an `AND` or `OR` automatically. Likewise, when you modify the search bar query (or write one from scratch), the checkboxes update to reflect that change. Query results update in real-time as you edit the query; there's no 'Search' button to click.

## Search

There are two ways to search Synthetic tests:

* Use existing or newly created facets and tags to create queries
* Write your own custom query

### Facets and Tags

There are three ways to create a query using the facets and tags in the left panel:

* Hover over a facet value and click `only` to create a search query that includes only that facet value.
* Hover over the same facet value again and click `all` to include all facet values again in the search query.
* Click on an existing filled checkbox to deselect a facet value and exclude it from the search query.

For example, if you want to create a query to return only Browser Test, hover over **Browser Test** in the left panel and select `only`. Hover again to reselect `all`.

{{< img src="synthetics/search/facet-selection.gif" alt="Facet Search" >}}

### Write a query

To search for specific text across all checks, titles, and notification messages, enter your text in the search bar.

Otherwise, use Boolean operators (`AND`, `OR`) and parentheses to write complex queries using any check field:

* Regular expressions are not supported
* Single-character wildcard (`?`) is not supported, but the general wildcard (`*`) is (only available on free text search)
* Proximity searches are not supported, but the [fuzzy][1] operator is
* Ranges are not supported
* Boosting is not supported

Finally, the following characters are reserved: `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.`, and whitespace. To search check fields that include any of them, wrap the field string in quotes: `status:("OK") AND "doc-check"` is a valid query string; `status:("OK") AND doc check` is not.

## Manage tests

You can bulk manage Synthetic tests in the results table by clicking multiple checkboxes in the table or clicking on the checkbox next to `State` to select all checkboxes. Once selected, you can choose `Run Tests Now` or `Delete`, which will bulk run or delete all of the selected Synthetic tests.

[1]: https://app.datadoghq.com/synthetics/list
[2]: /synthetics/api_tests/?tab=httptest#make-a-request
