---
title: Query Syntax
kind: documentation
description: "Global search of all your traces with tags"
aliases:
 - /tracing/trace_search_analytics/
 - /tracing/trace_search/
 - /tracing/search
 - /tracing/getting_further/apm_events/
 - /tracing/trace_search_and_analytics/search/
 - /tracing/search/
 - /tracing/advanced/search/
 - /tracing/app_analytics/search
 - /tracing/live_search_and_analytics/search
 - /tracing/trace_search_analytics/analytics
 - /tracing/analytics
 - /tracing/visualization/analytics
 - /tracing/trace_search_and_analytics/analytics/
 - /tracing/app_analytics/analytics
 - /tracing/trace_search_and_analytics/query_syntax
further_reading:
- link: "/tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "/tracing/visualization/trace/"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
- link: "/tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "/tracing/visualization/service/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/visualization/resource/"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
---

## Search syntax

All search parameters are contained in the url of the page, which can be helpful for sharing your view. A query is composed of *terms* and *operators*.

There are two types of *terms*:

* **[Span Tags](#span-tags)** (also called span attributes)

* **[Infrastructure Tags](#infrastructure-tags)**: Spans inherit tags from hosts and [integrations][1] that generate them.

You **do not** need to [create facets](#create-a-facet) to search on attributes and tags anymore.

To combine multiple *terms* into a complex query, use any of the following boolean operators:

| **Operator** | **Description**                                                                                        | **Example**                  |
|:-------------|:-------------------------------------------------------------------------------------------------------|:-----------------------------|
| `AND`        | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | authentication AND failure   |
| `OR`         | **Union**: either terms is contained in the selected events                                            | authentication OR password   |
| `-`          | **Exclusion**: the following term is NOT in the event                                                  | authentication AND -password |

## Tags search

### Span tags (attributes)

To search on a specific **span tag**, prepend an `@` to specify you are searching on an attribute.

For instance, if your attribute name is **http.method** and you want to filter on the **http.method** value *POST*, enter `@http.method:POST`.

**Notes**:

1. Tag searches are case sensitive. Use free text search to get case insensitive results.

2. Searching for a tag value that contains special characters requires escaping or double quotes.
For example, for a tag `resource_name` with the value `/test/test`, search using: `resource_name:\/test\/test` or `resource_name:"/test/test"`.
To match a single special character or space, use the `?` wildcard. For example, for a facet `resource` with the value `GET /test`, search using: `resource:GET?\/test`.

### Infrastructure tags

To search on a specific **infrastructure tag** (container tags, host tags), you don't need to prepend an `@` character.

| Query                                                          | Match                                                                       |
|:---------------------------------------------------------------|:----------------------------------------------------------------------------|
| `(env:prod OR service:srvA)`                                         | All traces with the tag `env:prod` or the tag `service:srvA`                      |
| `(service:srvA OR service:srvB)` or `(service:(srvA OR srvB))` | All traces that contain tags `service:srvA` or `service:srvB`.            |
| `("env:prod" AND -"version:beta")`                             | All traces that contain `env:prod` and that do not contain `version:beta` |

If your tags don't follow [tags best practices][2] and don't use the `key:value` syntax, use this search query:

* `tags:<MY_TAG>`

## Wildcards

To perform a multi-character wildcard search, use the `*` symbol as follows:

* `service:web*`  matches every trace that has a services starting with `web`
* `@url:data*`  matches every trace that has a `url` starting with `data`.

## Numerical values

Use `<`,`>`, `<=`, or `>=` to perform a search on numerical attributes. For instance, retrieve all spans that have a response time over 100ms with:

`@http.response_time:>100`

It is also possible to search for numerical attributes within a specific range. For instance, retrieve all your 4xx errors with:

`@http.status_code:[400 TO 499]`

## Autocomplete

Typing a complex query can be cumbersome. Use the search bar's autocomplete feature to complete your query using existing **keys** and **values**:

{{< img src="tracing/trace_explorer/search/trace_explorer_autocomplete.png"alt="Trace Explorer autocomplete"  style="width:100%;">}}

## Escaping of special characters

The following characters are considered as special: `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, and `\` require escaping.
For instance, to search traces that contain `user=JaneDoe` in their `url` the following search must be entered:

`@url:*user\=JaneDoe*`

The same logic must be applied to spaces within span attribute keys. It is not recommended to have spaces in trace attributes but in such cases, spaces require escaping.
If an attribute is called `user.first name`, perform a search on this attribute by escaping the space:

`@user.first\ name:myvalue`

## Saved Views

[Saved Views][3] contain your search query, columns, time range and facets.

## Time range

The time range allows you to display traces within a given time period. Quickly change the time range by selecting a preset range from the dropdown (or [entering a custom time frame][4]):

{{< img src="tracing/trace_explorer/query_syntax/time_frame_selector.png" style="width:40%;" alt="Select time frame" >}}

**Note**: Select the **Live Explorer** view (`15 minutes`) to view all [ingested][5] spans. For longer time frames, view spans that are [indexed][6] by retention filters.

### Displaying a full trace

Click on any span to see open the [Trace Panel][7] and access the request context

### Timeseries

Visualize the evolution of the `Duration` metric (or a facet unique count of values) over a selected time frame, and (optionally) split by an available facet.

The following timeseries Analytics shows the evolution of the **pc99** **duration** by steps of **5min** for each **Service**

{{< img src="tracing/app_analytics/analytics/timeserie_example.png" alt="timeserie example"  style="width:90%;">}}

### Top list

Visualize the top values from a facet according to their `Duration` (or a facet unique count of values).

The following top list analytics shows the top **pc99** **duration** of **Service**:

{{< img src="tracing/app_analytics/analytics/top_list_example.png" alt="top list example"  style="width:90%;">}}

### Table

Visualize the top values from a facet according to a chosen [measure][10] (the first measure you choose in the list), and display the value of additional measures for elements appearing in this top list. Update the search query or investigate logs corresponding to either dimension.

* When there are multiple dimensions, the top values are determined according to the first dimension, then according to the second dimension within the top values of the first dimension, then according to the third dimension within the top values of the second dimension.
* When there are multiple measures, the top or bottom list is determined according to the first measure.
* The subtotal may differ from the actual sum of values in a group, since only a subset (top or bottom) is displayed. Events with a null or empty value for this dimension are not displayed as a sub-group.

**Note**: A table visualization used for one single measure and one single dimension is the same as a toplist, just with a different display.

The following Table Log Analytics shows the evolution of the **top Status Codes** according to their **Throughput**, along with the number of unique **Client IPs**, and over the last 15 minutes:

{{< img src="tracing/app_analytics/analytics/trace_table_example.png" alt="top list example"  style="width:90%;">}}

## Related traces

Select or click on a section of the graph to either zoom in the graph or see the list of [traces][11] corresponding to your selection:

{{< img src="tracing/app_analytics/analytics/view_traces.png" alt="view Traces"  style="width:40%;">}}

## Export

{{< img src="tracing/app_analytics/analytics/export_button.png" alt="Export your analytics button"  style="width:40%;">}}

Export your Analytics:

* To a new [APM monitor][12]
* To an existing [Timeboard][13]. This feature is in beta. [Contact the Datadog support team][14] to activate it for your organization.

**Note:** Analytics can be exported only when powered by [indexed spans][15].

## Traces in dashboard

Export [Analytics][5] from the trace search or build them directly in your [Dashboard][16] alongside metrics and logs.

[Learn more about the timeseries widget][17].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/java/#integrations
[2]: /getting_started/tagging/#tags-best-practices
[3]: /tracing/trace_explorer/saved_views/
[4]: /dashboards/guide/custom_time_frames/
[5]: /tracing/trace_explorer/#live-search-for-15-minutes
[6]: /tracing/trace_explorer/#indexed-spans-search-with-15-day-retention
[7]: /tracing/trace_explorer/trace_panel

[5]: /tracing/trace_search_and_analytics/
[6]: /tracing/visualization/#apm-event
[7]: /tracing/visualization/#services
[8]: /tracing/trace_retention/#retention-filters
[9]: /tracing/trace_search_and_analytics/query_syntax/#facets
[10]: /tracing/trace_search_and_analytics/query_syntax/#measures
[11]: /tracing/visualization/#trace
[12]: /monitors/create/types/apm/
[13]: /dashboards/#timeboards
[14]: /help/
[15]: /tracing/visualization/#indexed-span
[16]: /dashboards/
[17]: /dashboards/widgets/timeseries/
