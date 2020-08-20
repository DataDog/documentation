---
title: Search and Manage Synthetic Tests
kind: documentation
description: Search and manage your Synthetic tests.
---

Search and manage all of your Synthetic tests from the [Synthetics Test page][1]. This page allows you to find, access, and manage the tests that matter to you and your teams in one location. You can view tests that are alerting, get an overview of overall test uptime and response time to view the state of you application, and more.

## Search

TK intro:
* All the default facets that are available (all the ones appearing below the synthetic filters section)
* How users can also create their own tags (which will then appear below the tags section)
* Free text search (name of test, etc.)

Search allows querying by any combination of the following checks attributes:

* `title` or `message` - text search
* `status` - Alert, No Data, Ok
* `creator`
* `region`
* `muted`
* `notification`
* `tags`

To run a search, construct your query by clicking on any `facet` or `tag` under **Synthetics Filters**, use the populated facets in the search bar, or write a custom query.

### Synthetics Filters and Tags

The **Synthetics Filters** and **Tags** panel on the left side of the search page lists several default facets and your custom created tags.

Default facets include:

* `Type`
* `Status`
* `Creator`
* `Region`
* `State`
* `Notification`
* `Env`

The tags you selected or created when creating a new [Synthetic test][2] appear under the **Tags** section. To add new tags for querying, hover over any row in the table and click the pencil **Edit** button. Add tags under the `Additional Tags` section.

There are three ways to create a query using the facets and tags in this panel:

* Hover over a facet or tag and click `only` to create search query that includes only that facet or tag.
* Hover over the same option and click `all` to include all facets and tags in a search query.
* Click on an existing filled checkbox to deselect a facet or tag and exclude it from a search query.

The search bar updates with the equivalent query as you check the boxes or type in the search bar. When selecting several facets, the search performs an `AND` or `OR` automatically. Likewise, when you modify the search bar query (or write one from scratch), the checkboxes update to reflect that change. Query results update in real-time as you edit the query; there's no 'Search' button to click.

### Autocomplete

TK

### Write a query

To search for specific text across all checks, titles, and notification messages, enter your text in the search bar.

Otherwise, use Boolean operators (`AND` or `OR`) and parentheses to write complex queries using any check field:

* Regular expressions are not supported
* Single-character wildcard (`?`) is not supported, but the general wildcard (`*`) is (only available on free text search)

* Proximity searches are not supported, but the [fuzzy][1] operator is
* Ranges are not supported
* Boosting is not supported

Finally, the following characters are reserved: `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.`, and whitespace. To search check fields that include any of them, wrap the field string in quotes: `status:("OK") AND "doc-check"` is a valid query string; `status:("OK") AND doc check` is not.

## Manage

Batch (delete, run test now)
Action trays

Subsection about audit events

[1]: https://app.datadoghq.com/synthetics/list
[2]: /synthetics/api_tests/?tab=httptest#make-a-request
