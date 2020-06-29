---
title: Synthetics Search
kind: documentation
description: Search your Synthetics tests.
---

## Search

Advanced search lets you query checks by any combination of checks attributes:

* `title` and `message` - text search
* `status` - Alert, No Data, Ok
* `creator`
* `region`
* `muted`
* `notification`
* `tags`

To run a search, construct your query using the checkboxes on the left and/or the search bar along the top. The search bar updates with the equivalent query as you check the boxes. Likewise, when you modify the search bar query (or write one from scratch), the checkboxes update to reflect that change. Query results update in real-time as you edit the query; there's no 'Search' button to click.

### Write a query

To search for specific text across all checks, titles, and notification messages, enter your text in the search bar.

Otherwise, use Boolean operators (`AND`, `OR`, and `NOT`) and parentheses to write complex queries using any check field:

* Regular expressions are not supported
* Single-character wildcard (`?`) is not supported, but the general wildcard (`*`) is
* Proximity searches are not supported, but the [fuzzy][1] operator is
* Ranges are not supported
* Boosting is not supported

Finally, the following characters are reserved: `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.`, and whitespace. To search check fields that include any of them, wrap the field string in quotes: `status:("OK") AND "doc-check"` is a valid query string; `status:("OK") AND doc check` is not.