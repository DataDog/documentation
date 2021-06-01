---
title: Search and Manage Synthetic Tests
kind: documentation
description: Search and manage your Synthetic tests.
further_reading:
- link: "/getting_started/synthetics/"
  tag: "Documentation"
  text: "Getting started with Synthetic Monitoring"
- link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
  tag: "Blog"
  text: "Best practices for creating end-to-end tests"
- link: "https://www.datadoghq.com/blog/test-maintenance-best-practices/"
  tag: "Blog"
  text: "Best practices for maintaining end-to-end tests"
- link: "/synthetics/guide/"
  tag: "Documentation"
  text: "Synthetic Monitoring guides"
---

## Overview

Search, access, and manage all of your tests on one page with the [Synthetic Tests page][1]. Quickly find the tests that matter to you using facets, get an overview of the state of your application with the global uptime and response time graph, and manage your tests through bulk functionalities.

{{< img src="synthetics/search/search.png" alt="Synthetic Tests Search" >}}

## Search

### Facets and tags

The **Synthetics Filters** panel on the left side of the page lists several default facets you can use to search through your tests. Default facets include:

| Facet          | Description                                                                   |
|----------------|-------------------------------------------------------------------------------|
| `Type`         | The type of Synthetic test: `browser`, `api`, `api-ssl`, `api-tcp`, `api-dns` |
| `Status`       | The Synthetic test status: `OK`, `Alert`, `No Data`                           |
| `Creator`      | The creator of the Synthetic test                                             |
| `Region`       | The (managed and private) locations the Synthetic test is running from        |
| `State`        | The state of the Synthetic test: `live`, `paused`                             |
| `Notification` | The handle used by the Synthetic test for notifications                       |
| `Env`          | The environment the Synthetic test is running on                              |
| `Tag`          | The tag assigned to the Synthetic test                                        |

### Create your query

Search through your Synthetic tests by clicking on the facets on the left panel or by writing your own custom query using the search bar. As you select and deselect facet values in the panel or in the search bar, the search bar will automatically update with the equivalent query. Likewise, when you modify the search bar query (or write one from scratch), the facets checkboxes update to reflect that change. Query results update in real-time as you edit the query; there's no 'Search' button to click.

* **Search on free text**: Enter your text in the search bar to search on a test name.
* **Search on a single facet**: Click a facet value to create a search query that includes only that facet value. For example, `type:api`. To add another value of the same facet to your search, click the other value checkbox or add the other value with an `OR` Boolean operator and wrap values with quotes and parentheses. For example, `type:("api" OR "api-ssl")`.
* **Search on multiple facets and text**: Click on values of different facets to create a search query that includes filtering for multiple facets. For example, `type:api``region:aws:us-east-2`. You can also mix facets and text. For example, `checkout type:browser`. Although invisible, the `AND` Boolean operator is applied when searching on multiple terms.
* **Exclude facets or text**: Click on an existing filled checkbox to deselect a facet value or prepend your term with `-` to exclude it from the search query, e.g. `-state:paused`.
* **Perform custom matches**: Use wildcards (`*`). For example, `valid*`.

If you want to exclusively search for browser tests, click **Browser Test** in the left panel. Click again to reselect all your tests, regardless of their type.

{{< img src="synthetics/search/facet-search.gif" alt="Facet Search" >}}

## Manage tests

### Bulk management

Bulk manage your Synthetic tests from the list page by clicking multiple individual test checkboxes in the table or by clicking on the checkbox next to `State` to select all the test checkboxes of the page.
Once selected, choose `Run Tests Now` or `Delete`, which will bulk run or delete all of the selected Synthetic tests.

{{< img src="synthetics/search/bulk-edit.png" alt="Bulk editing" >}}

### Action tray options

Hover over a test in the table to populate options such as `Pause`, `Run Test Now`, `Edit`, `Clone`, and `Delete`. The option `Edit Recording` is also available for browser tests.

{{< img src="synthetics/search/action_tray.mp4" alt="Action tray options" video="true" width="100%">}}

### Audit events

The creation, addition, and deletion of Synthetic tests, global variables, and private locations create events in the [event stream][2]. Generated events explain the change and display the user who performed the change.

Find all Synthetic Monitoring related changes by searching the event stream for `#audit synthetics`. Retrieve changes that were done on a specific test by searching on the id of your test. For example, `tags:public_id:4m7-bqy-mxq`.

{{< img src="synthetics/search/audit_events.png" alt="Synthetic Monitoring audit events" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/list
[2]: /events/
