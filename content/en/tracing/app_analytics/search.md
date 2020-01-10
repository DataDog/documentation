---
title: Trace Search
kind: documentation
description: "Global search of all your traces with tags"
aliases:
  - /tracing/trace_search_analytics/
  - /tracing/trace_search/
  - /tracing/search
  - /tracing/getting_further/apm_events/
  - /tracing/trace_search_and_analytics/search/
  - /tracing/search
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
- link: "tracing/app_analytics/analytics"
  tag: "Documentation"
  text: "Analytics on your APM data at infinite cardinality"
---

## Search bar

All search parameters are contained in the url of the page, so it is very simple to share your view.

### Search syntax

A query is composed of *terms* and *operators*.

There are two types of *terms*:

* A [**Facet**](#facet-search)

* A [**Tag**](#tags-search)

To combine multiple *terms* into a complex query, use any of the following boolean operators:

| **Operator** | **Description**                                                                                        | **Example**                  |
|:-------------|:-------------------------------------------------------------------------------------------------------|:-----------------------------|
| `AND`        | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | authentication AND failure   |
| `OR`         | **Union**: either terms is contained in the selected events                                            | authentication OR password   |
| `-`          | **Exclusion**: the following term is NOT in the event                                                  | authentication AND -password |

### Facet search

To search on a specific [facet](#facets) you must [add it as a facet first](#create-a-facet) then add `@` to specify you are searching on a facet.

For instance, if your facet name is **url** and you want to filter on the **url** value *www.datadoghq.com* just enter:

`@url:www.datadoghq.com`

### Tags search

Your traces inherit tags from hosts and [integrations][1] that generate them. They can be used in the search and as facets as well:

| Query                                                          | Match                                                                       |
|:---------------------------------------------------------------|:----------------------------------------------------------------------------|
| `("env:prod" OR test)`                                         | All traces with the tag `#env:prod` or the tag `#test`                      |
| `(service:srvA OR service:srvB)` or `(service:(srvA OR srvB))` | All traces that contain tags `#service:srvA` or `#service:srvB`.            |
| `("env:prod" AND -"version:beta")`                             | All traces that contain `#env:prod` and that do not contain `#version:beta` |

If your tags don't follow [tags best practices][2] and don't use the `key:value` syntax, use this search query:

* `tags:<MY_TAG>`

### Wildcards

To perform a multi-character wildcard search, use the `*` symbol as follows:

* `service:web*`  matches every trace that has a services starting with `web`
* `@url:data*`  matches every trace that has a `url` starting by `data`.

### Numerical values

Use `<`,`>`, `<=`, or `>=` to perform a search on numerical attributes. For instance, retrieve all traces that have a response time over 100ms with:

`@http.response_time:>100`

It is also possible to search for numerical attributes within a specific range. For instance, retrieve all your 4xx errors with:

`@http.status_code:[400 TO 499]`

### Autocomplete

Typing a complex query can be cumbersome. Use the search bar's autocomplete feature to complete your query using existing values:

{{< img src="tracing/app_analytics/search/search_bar_autocomplete.png" alt="search bar autocomplete "  style="width:60%;">}}

### Escaping of special characters

The following attributes are considered as special: `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, and `\` require escaping.
For instance, to search traces that contain `user=JaneDoe` in their `url` the following search must be entered:

`@url:*user\=JaneDoe*`

The same logic must be applied to spaces within trace attributes. It is not recommended to have spaces in trace attributes but in such cases, spaces require escaping.
If an attribute is called `user.first name`, perform a search on this attribute by escaping the space:

`@user.first\ name:myvalue`

### Saved Searches

Don't lose time building the same views everyday. Saved searches contain your search query, columns, and time horizon. They are then available in the search bar thanks to the auto-complete matching whether the search name or query.

{{< img src="tracing/app_analytics/search/saved_search.png" alt="Saved Search"  style="width:80%;">}}

To delete a saved search, click on the bin icon under the Trace search drop-down.

## Time Range

The time range allows you to display traces within a given time period. Quickly change the time range by selecting a preset range from the dropdown:

{{< img src="tracing/app_analytics/search/timerange.png" style="width:50%;" alt="Timerange"  >}}

## Trace Stream

The Trace Stream is the list of traces that match the selected context. A context is defined by a [search bar](#search-bar) filter and a [time range](#time-range).

### Traces vs Analyzed Spans

Chose to display a sampled trace associated with your Analyzed Spans in the trace steam with the toggle in the upper right corner of the trace stream:

{{< img src="tracing/app_analytics/search/trace_analysed_span.png" style="width:40%;" alt="trace_analysed_span"  >}}

If **Traces** is selected, Analyzed Spans listed in the trace stream have a sampled trace associated with them. If **Analyzed Spans** is selected, only the Analyzed Spans are listed in the trace stream.

When a request hits a [service][3] (e.g. webserver, database), the Datadog Agent creates an Analyzed Span. It's a record of the request including its duration, response code, and any [custom metadata][4]. An Analyzed Span is represented by a single span with attached metadata for the handled request. For each service that receives a request, the Agent creates an Analyzed Span. If a request runs through a web service, listing service, and database service, the request generates 3 Analyzed Spans. To reduce the amount of Analyzed Spans generated, [explicitly turn on/off any Analyzed Span collection for a specific service][5]. To start collecting Analyzed Spans, [enable App Analytics for your services][5].

### Displaying a full Trace

Click on any trace to see more details about it:

{{< img src="tracing/app_analytics/search/trace_in_tracestream.png" alt="Trace in tracestream"  style="width:80%;">}}

### Columns

To add more Trace details to the list, click the **Columns** button and select any Facets you want to see:

{{< img src="tracing/app_analytics/search/trace_list_with_column.png" alt="Trace list with columns"  style="width:80%;">}}

### Multi-line display

{{< img src="tracing/app_analytics/search/multi_line_display.png" alt="Multi-line display"  style="width:30%;">}}

Choose to display one, three, or ten lines from your traces. 3 and 10 lines display are here to give you more insights on the `error.stack` attribute.

* With one line displayed:
{{< img src="tracing/app_analytics/search/1_multi_line.png" alt="1 line Multi-line display"  style="width:80%;">}}

* With three lines displayed:
{{< img src="tracing/app_analytics/search/3_multi_line.png" alt="2 lines with Multi-line display"  style="width:80%;">}}

* With ten lines displayed:
{{< img src="tracing/app_analytics/search/10_multi_line.png" alt="10 lines with Multi-line display"  style="width:80%;">}}

## Facets

A Facet displays all the distinct values of an attribute or a tag as well as provides some basic analytics such as the amount of traces represented. This is also a switch to easily filter your data.

Facets allow you to pivot or filter your datasets based on a given attribute. Examples Facets may include users, services, etc...

{{< img src="tracing/app_analytics/search/facets_demo.png" alt="Facets demo"  style="width:80%;">}}

### Create a Facet

To start using an attribute as a Facet or in the search, click on it and add it as a Facet:

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="Create Facet"  style="width:50%;">}}

Once this is done, the value of this attribute is stored **for all new traces** and can be used in [the search bar](#search-bar), [the Facet Panel](#facet-panel), and in the Trace graph query.

### Facet Panel

Use Facets to easily filters on your Traces. The search bar and url automatically reflect your selections.

{{< img src="tracing/app_analytics/search/facet_panel.png" alt="Facet panel"  style="width:30%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations
[2]: /tagging/#tags-best-practices
[3]: /tracing/visualization/#services
[4]: /tracing/adding_metadata_to_spans/
[5]: /tracing/app_analytics/#configure-additional-services-optional
