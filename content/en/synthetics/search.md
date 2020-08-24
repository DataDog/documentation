---
title: Search and Manage Synthetic Tests
kind: documentation
description: Search and manage your Synthetic tests.
further_reading:
- link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
  tag: "Blog"
  text: "Best practices for creating end-to-end tests"
- link: "/synthetics/guide/"
  tag: "Documentation"
  text: "Synthetic Monitoring guides"
---

## Overview

Search, access, and manage all of your tests in one location on the [Synthetic Tests page][1]. View tests that are alerting, get an overview of the state of your application with features like uptime and response time graphs, and more.

{{< img src="synthetics/search/overview.png" alt="Synthetic Tests search" >}}

The **Synthetics Filters** panel on the left side of the page lists several default facets you can use to create a query. Default facets include:

* `Type`
* `Status`
* `Creator`
* `Region`
* `State`
* `Notification`
* `Env`
* `Tag`

As you select and deselect facet values in the panel or in the search bar, the search bar will automatically update with the equivalent query. When selecting several facets, the search performs an `AND` or `OR` automatically. Likewise, when you modify the search bar query (or write one from scratch), the checkboxes update to reflect that change. Query results update in real-time as you edit the query; there's no 'Search' button to click.

## Search

There are two ways to search Synthetic tests:

* Use existing or newly created facet values to create a query
* Write your own custom query

### Facets and Tags

To create a query using the facet values in the left panel:

* Hover over a facet value and click `only` to create a search query that includes only that facet value.
* Hover over the same facet value again and click `all` to include all facet values again in the search query.
* Click on an existing filled checkbox to deselect a facet value and exclude it from the search query.

For example, if you want to exclusively search for browser tests, hover over **Browser Test** in the left panel and select `only`. Hover again to reselect `all`.

{{< img src="synthetics/search/facet-selection.gif" alt="Facet Search" >}}

### Write a query

To search for specific text, such as test or domain name, enter your text in the search bar.

Otherwise, use Boolean operators (`AND`, `OR`) and parentheses to write complex queries using any check field:

* Regular expressions are not supported
* Single-character wildcard (`?`) is not supported, but the general wildcard (`*`) is (only available on free text search)
* Proximity searches are not supported, but the [fuzzy][1] operator is
* Ranges are not supported
* Boosting is not supported

To search checks and specific text, like `status` and `a search string`, wrap the check field string in quotes. For example, `status:("OK") AND a search string` is a valid query string, `status:("OK") AND a search string` is not.

Finally, the following characters are reserved: `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.`, and whitespace.

{{< img src="synthetics/search/custom-query.gif" alt="Custom query" >}}

## Manage tests

You can bulk manage Synthetic tests in the results table by clicking multiple checkboxes in the table or by clicking on the checkbox next to `State` to select all checkboxes. Once selected, you can choose `Run Tests Now` or `Delete`, which will bulk run or delete all of the selected Synthetic tests.

{{< img src="synthetics/search/bulk-edit.png" alt="Bulk editing" >}}

### Hover options

Hover over a test in the table to populate options such as `Pause`, `Run Test Now`, `Edit`, `Clone`, and `Delete`. The option `Edit Recording` is also available for browser tests.

For example, if you wish to edit browser test steps, hover over a browser test in the table and select `Edit Recording`. This will take you to the [browser test steps page][2], where you can edit steps such as [assertions][3].

{{< img src="synthetics/search/test-steps.gif" alt="Browser test editing" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/list
[2]: /synthetics/browser_tests/actions/
[3]: /synthetics/browser_tests/actions/#assertion
