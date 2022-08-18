---
title: Search and Manage Synthetic Tests
kind: documentation
description: Learn how to search and manage your Synthetic tests.
further_reading:
- link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
  tag: "Blog"
  text: "Best practices for creating end-to-end tests"
- link: "https://www.datadoghq.com/blog/test-maintenance-best-practices/"
  tag: "Blog"
  text: "Best practices for maintaining end-to-end tests"
- link: "/synthetics/ci_results_explorer"
  tag: "Documentation"
  text: "Learn about the CI Results Explorer"
- link: "/events/explorer"
  tag: "Documentation"
  text: "Learn about the Events Explorer"
---

## Overview

You can search, access, and manage all of your tests on the [Synthetic Tests page][1]. 

To better understand the state of your application, click **Show Metrics**. The **Overview Metrics** section appears with graphs about your overall tests' uptime and response time. For more information about the data displayed, see [Synthetic Monitoring Metrics][2].

You can use facets to find Synthetic tests, manage your tests with bulk actions, and monitor events to track changes to your Synthetic Monitoring configuration. Explore [out-of-the-box Synthetic dashboards][3] to better understand your testing coverage.

## Search for tests

### Facets and tags

The **Synthetics Filters** panel on the left lists default facets you can use to search for your tests. 

The default facets include the following:

| Facet          | Description                                                                   |
|----------------|-------------------------------------------------------------------------------|
| `Type`         | The type of Synthetic test: `browser`, `api`, `api-multi`, `api-websocket`, `api-ssl`, `api-dns`, `api-tcp`, `api-udp`, `api-icmp`, or `api-grpc`. |
| `Status`       | The Synthetic test status: `OK`, `Alert`, or `No Data`.                       |
| `Creator`      | The creator of the Synthetic test.                                            |
| `Region`       | The managed and private locations the Synthetic test is running from.         |
| `State`        | The state of the Synthetic test: `live` or `paused`.                          |
| `Notification` | The handle used by the Synthetic test for notifications.                      |
| `Env`          | The environment the Synthetic test is running on.                             |
| `CI/CD Execution Rule` | The status of the test run: `Blocking`, `Non-blocking`, or `Skipped`. |

The **Tags** panel below **Synthetic Filters** lists several default tags you can use to identify your tests. 

The default tags include the following:

| Tag          | Description                                                                     |
|----------------|-------------------------------------------------------------------------------|
| `Team`         | The team responsible for responding to the Synthetic test.                    |
| `Tag`          | The tag assigned to the Synthetic test.                                       |
| `Service`      | The service the Synthetic test is running on.                                 |
| `Private Locations`| Whether or not private locations are enabled: `true` or `false`.          |

For more information, see [Using Tags][4].

### Create a search query

Search for tests by clicking on the facets to the left or by writing your own custom query in the search bar. As you edit the query, your search results update in real time.

When you select and deselect facets, the search bar automatically reflects your changes. Similarly, you can modify the search bar query or write a query from scratch in the search bar to select and deselect the facets on the left. 

* **Search on free text**: Enter your text in the search bar to search on a test name.
* **Search on a single facet**: Click a facet value to create a search query that includes only that facet value. For example, `type:api`. To add another value of the same facet to your search, click on an additional value's checkbox. You can also add the additional value with an `OR` Boolean operator and wrap the values using quotes and parentheses. For example, `type:("api" OR "api-ssl")`.
* **Search on multiple facets and text**: Click on facet values from different facet types to customize a search query that filters for multiple facets. For example, `type:api region:aws:us-east-2`. You can also mix facets and text. For example, `checkout type:browser`. Although invisible, the `AND` Boolean operator is applied when searching on multiple terms.
* **Search on message**: Add a message to create a search query that filters on your tests’ notification messages configured in the [test monitor][5]. For example, `message:testcontent`.
* **Exclude facets or text**: Click on an already-filled checkbox to deselect a facet value or prepend a term with `-` to exclude it from the search query. For example, `-state:paused`.
* **Perform custom matches**: Use wildcards (`*`). For example, `valid*`.

To search on a type of Synthetics test, select the test type under the **Type** variable.

{{< img src="synthetics/search/facet-search.mp4" alt="Facet Search" video=true >}}

## Manage tests

### Batch actions

Manage your Synthetic tests in bulk by selecting multiple test checkboxes in the list on the [Synthetic Tests page][1]. Click **Run Tests Now** or **Delete** to bulk run or delete the Synthetic tests you selected.

### Test actions

Hovering over a test populates option icons on the right such as `Pause`, `Run Test Now`, `Edit`, `Clone`, and `Delete`. The `Edit Recording` option is available for browser tests.

{{< img src="synthetics/search/action_tray.mp4" alt="Action tray options" video="true" width="100%">}}

### Track events

Creating, adding, and deleting Synthetic tests, global variables, and private locations generates events in the [Events Explorer][6]. Events describe changes that occurred and display the users who performed the changes.

Find all Synthetics-related changes by searching for your test monitors' alerts in the search bar, or by selecting an event type under the **Event** template variable. For example, `Event Type:synthetics_alert`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/list
[2]: /synthetics/metrics/
[3]: /synthetics/dashboards/
[4]: /getting_started/tagging/using_tags/#synthetics
[5]: /synthetics/guide/synthetic-test-monitors/
[6]: https://app.datadoghq.com/event/explorer
