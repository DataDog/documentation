---
title: Search and Manage Synthetic Tests
description: Learn how to search and manage your Synthetic tests.
breadcrumbs: Docs > Synthetic Testing and Monitoring > Search and Manage Synthetic Tests
sourceUrl: https://docs.datadoghq.com/synthetics/explore/index.html
---

# Search and Manage Synthetic Tests

## Overview{% #overview %}

You can access, search, and manage all of your tests on the [Synthetic Tests page](https://app.datadoghq.com/synthetics/list).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/search/synthetic_tests_page_2.f37058a89921d695f9e3ba9616009f1f.png?auto=format"
   alt="Synthetic Monitoring Tests page" /%}

## Search for tests{% #search-for-tests %}

### Customize columns{% #customize-columns %}

Click on the **Customize** gear icon on the right hand side of the page to add additional columns as needed:

- Steps
- Frequency
- Devices
- Locations
- Mobile Application
- Creator
- CI Execution
- Monitor
- Last Runs

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/search/synthetic_tests_customize_column.177c1235a7bf685ecb14844c863eedff.png?auto=format"
   alt="Synthetic Monitoring Tests page with the columns drop down selected" /%}

### Facets and tags{% #facets-and-tags %}

The **Synthetic Monitoring Filters** panel on the left lists default facets you can use to search for your tests.

By using facets, you can accomplish the following actions:

- Search for specific Synthetic tests
- Manage your tests with bulk actions

The default facets include the following:

| Facet                  | Description                                                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Type`                 | The type of Synthetic test: `browser`, `api`, `api-multi`, `api-websocket`, `api-ssl`, `api-dns`, `api-tcp`, `api-udp`, `api-icmp`, or `api-grpc`. |
| `Status`               | The Synthetic test status: `OK`, `Alert`, or `No Data`.                                                                                            |
| `Creator`              | The creator of the Synthetic test.                                                                                                                 |
| `Team`                 | The team responsible for responding to the Synthetic test.                                                                                         |
| `Region`               | The managed and private locations the Synthetic test is running from.                                                                              |
| `State`                | The state of the Synthetic test: `live` or `paused`.                                                                                               |
| `Notification`         | The handle used by the Synthetic test for notifications.                                                                                           |
| `Env`                  | The environment the Synthetic test is running on.                                                                                                  |
| `CI/CD Execution Rule` | The status of the test run: `Blocking`, `Non-blocking`, or `Skipped`.                                                                              |
| `Endpoint`             | The url or domain the test is targeting.                                                                                                           |

{% alert level="info" %}
Note: You might see facet values originating from tests you don't have access to.
{% /alert %}

The **Tags** panel below **Synthetic Filters** lists several default tags you can use to identify your tests.

The default tags include the following:

| Tag                 | Description                                                      |
| ------------------- | ---------------------------------------------------------------- |
| `Tag`               | The tag assigned to the Synthetic test.                          |
| `Service`           | The service the Synthetic test is running on.                    |
| `Private Locations` | Whether or not private locations are enabled: `true` or `false`. |

For more information, see [Using Tags](https://docs.datadoghq.com/getting_started/tagging/using_tags/#synthetics).

### Create a search query{% #create-a-search-query %}

Search for tests by clicking on the facets to the left or by writing your own custom query in the search bar. As you edit the query, your search results update in real time.

When you select and deselect facets, the search bar automatically reflects your changes. Similarly, you can modify the search bar query or write a query from scratch in the search bar to select and deselect the facets on the left.

- **Search on free text**: Enter your text in the search bar to search on a test name.
- **Search on a single facet**: Click a facet value to create a search query that includes only that facet value. For example, `type:api`. To add another value of the same facet to your search, click on an additional value's checkbox. You can also add the additional value with an `OR` Boolean operator and wrap the values using quotes and parentheses. For example, `type:("api" OR "api-ssl")`.
- **Search on multiple facets and text**: Click on facet values from different facet types to customize a search query that filters for multiple facets. For example, `type:api region:aws:us-east-2`. You can also mix facets and text. For example, `checkout type:browser`. Although invisible, the `AND` Boolean operator is applied when searching on multiple terms.
- **Search on message**: Add a message to create a search query that filters on your tests' notification messages configured in the [test monitor](https://docs.datadoghq.com/synthetics/guide/synthetic-test-monitors/). For example, `message:testcontent`.
- **Exclude facets or text**: Click on an already-filled checkbox to deselect a facet value or prepend a term with `-` to exclude it from the search query. For example, `-state:paused`.
- **Perform custom matches**: Use wildcards (`*`). For example, `valid*`.

To search on a type of Synthetic Monitoring test, select the test type under the **Type** facet.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/search/facet_search_2.mp4" /%}

## Manage tests{% #manage-tests %}

### Bulk actions{% #bulk-actions %}

Manage your Synthetic tests in bulk by selecting one or more tests on the [Synthetic Tests page](https://app.datadoghq.com/synthetics/list), then choose actions such as `Run Tests Now`, `Pause/Resume Scheduling`, `Download CSV`, `Edit Tags`, `Edit Envs`, `Edit Teams`, or `Delete`.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/search/edit_tags_3.mp4" /%}

### Test actions{% #test-actions %}

Clicking on the kebab menu to the right of a test populates option icons such as `Pause`, `Run Test Now`, `Edit Test`, `Clone`, and `Delete`. The `Edit Recording` option is available for browser tests.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/search/test_option_2.mp4" /%}

### Track events{% #track-events %}

Creating, adding, and deleting Synthetic tests, global variables, and private locations generates events in the [Events Explorer](https://app.datadoghq.com/event/explorer). Events describe changes that occurred and display the users who performed the changes.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/search/synthetic_events_2.64a11a57d5211d81a494d4c21d814700.png?auto=format"
   alt="Synthetic test alerts in the Events Explorer" /%}

Find all Synthetic Monitoring related changes by searching for your test monitors' alerts in the search bar, or by selecting an event type under the **Event** template variable. For example, `Event Type:synthetics_alert`.

## Further Reading{% #further-reading %}

- [Best practices for creating end-to-end tests](https://www.datadoghq.com/blog/test-creation-best-practices/)
- [Best practices for maintaining end-to-end tests](https://www.datadoghq.com/blog/test-maintenance-best-practices/)
- [Learn about Saved Views](https://docs.datadoghq.com/synthetics/explore/saved_views)
- [Learn about the Synthetic Monitoring & Testing Results Explorer](https://docs.datadoghq.com/synthetics/explore/results_explorer)
- [Learn about the Events Explorer](https://docs.datadoghq.com/service_management/events/explorer)
