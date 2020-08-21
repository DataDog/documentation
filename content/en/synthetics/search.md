---
title: Search and Manage Synthetic Tests
kind: documentation
description: Search and manage your Synthetic tests.
---

Search, access, and manage all of your tests in one location with the [Synthetic Tests page][1]. Here you can view tests that are alerting, get an overview of the state of your application with features like uptime and response time graphs, and more.

## Search

There are two ways to query Synthetic tests:

* Using existing or newly created facets and tags to create queries
* Writing your own queries

### Facets and Tags

The facets and tags panel on the left side of this page lists several default facets and your custom created tags that you can use to create custom queries.

Default facets are available under the **Synthetic Filters** section:

* `Type`
* `Status`
* `Creator`
* `Region`
* `State`
* `Notification`
* `Env`

Tags populate based on the existing tags you created when creating a [Synthetic test][2]. To add new tags for querying, hover over any row in the table and click the pencil **Edit** button. Add tags under the `Additional Tags` section.

There are three ways to create a query using the facets and tags in this panel:

* Hover over a facet or tag under and click `only` to create search query that includes only that facet or tag.
* Hover over the same option and click `all` to include all facets and tags in a search query.
* Click on an existing filled checkbox to deselect a facet or tag and exclude it from a search query.

The search bar updates with the equivalent query as you check the boxes or type in the search bar. When selecting several facets, the search performs an `AND` or `OR` automatically. Likewise, when you modify the search bar query (or write one from scratch), the checkboxes update to reflect that change. Query results update in real-time as you edit the query; there's no 'Search' button to click.

You can also click within the search bar at the top of the page and it will populate the same default facets and tags visible in the left panel. You can then use these facets to create your own autocompleted query.

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
