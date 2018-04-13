---
title: Search & Graph
kind: documentation
description: "The Logs Explorer is your Datadog home base for troubleshooting and exploration over your logs."
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "logs/parsing"
  tag: "Documentation"
  text: Learn more about parsing
---

## Overview 

The Logs explorer is your home base for troubleshooting and exploration:

{{< img src="logs/explore/explore_view_with_comments.png" alt="Explore view with comments" responsive="true" popup="true">}}

In this view you can:

* [Interact with the Time range](#time-range)
* [Display lists of logs](#log-list)
* [Use facets to filter your Logstream](#facets)
* [Enter search queries](#search-bar)
* [Perform analytics with Log Graphs](#log-graph)

## Time Range

The time range allows you to display logs within a given time period. It appears directly under the search bar as a timeline. The timeline can be displayed or wrapped up with the **Show timeline** check box:

{{< img src="logs/explore/timeline.png" alt="Timeline" responsive="true" popup="true" style="width:50%;">}}

Quickly change the time range by selecting a preset range from the dropdown:

{{< img src="logs/explore/timerange.png" style="width:50%;" alt="Timerange" responsive="true" popup="true" >}}

## Logstream
The Logstream is the list of logs that match the selected context. A context is defined by a [search bar](#search-bar) filter and a [time range](#time-range).
You can sort the list by clicking the **date** column header.

{{< img src="logs/explore/log_list.png" alt="Logstream" responsive="true" popup="true" style="width:80%;">}}

### Filtering the Logstream
If you enter a valid query into the [search bar](#search-bar), words that match your query are highlighted, and the logs displayed match your facet criteria:

{{< img src="logs/explore/log_list_highlighted.png" alt="Logstream highlighted" responsive="true" popup="true" style="width:80%;">}}

### Displaying a full log
You can click on any log line to see more details about it:

{{< img src="logs/explore/log_in_log_list.png" alt="Log in Logstream" responsive="true" popup="true" style="width:80%;">}}

### View in context

Click on its `host` or `service` and select `View in context` to see log lines dated just before and after a selected log - even if they don't match your filter -

{{< img src="logs/explore/focus_host_service.png" style="width:50%;" alt="focus on host and service.png" responsive="true" popup="true" style="width:70%;">}}

### Columns
To add more log details to the list, click the **Columns** button and select any facets you want to see:

{{< img src="logs/explore/log_list_with_columns.png" alt="Logstream with columns" responsive="true" popup="true" style="width:80%;">}}

### Multi-line display

{{< img src="logs/explore/multi_line_display.png" alt="Multi-line display" responsive="true" popup="true" style="width:30%;">}}

When enabled, your logstream display changes to better focus on your logs `message` attributes. They are now displayed on four lines instead of one:

* Without multi-line:
{{< img src="logs/explore/before_multi_line.png" alt="Before Multi-line display" responsive="true" popup="true">}}

* With multi-line enabled: 
{{< img src="logs/explore/multi_line_log.png" alt="Log with Multi-line display" responsive="true" popup="true">}}

**Note**:  If present, `error.stack` attribute is displayed in priority as it should be used for stack traces.
Remap any stack-trace attribute to this specific attribute with [the attribute remapper processor][1].

## Facets 

A facet displays all the distinct members of an attribute or a tag as well as provides some basic analytics such as the amount of logs represented. This is also a switch to easily filter your data.

Facets allow you to pivot or filter your datasets based on a given attribute. Examples facets may include users, services, etc...

{{< img src="logs/explore/facets_demo.png" alt="Facets demo" responsive="true" popup="true" style="width:80%;">}}

### Create a Facet

To start using an attribute as a Facet or in the search, click on it and add it as a Facet:

{{< img src="logs/explore/create_facet.png" style="width:50%;" alt="Create Facet" responsive="true" popup="true" style="width:50%;">}}

Once this is done, the value of this attribute is stored **for all new logs** and can be used in [the search bar](#search-bar), [the Facet Panel](#facet-panel), and in the [Log graph query][2].

### Facet Panel

Use facets to easily filters on your logs. The search bar and url automatically reflect your selections.

{{< img src="logs/explore/facet_panel.png" alt="Facet panel" responsive="true" popup="true" style="width:80%;">}}

## Measures

A Measure is a attribute with numerical value contained in your logs. Think of it as a "log metric".

### Create a Measure

To start using an attribute as a measure, click on a numerical attribute of your log:

{{< img src="logs/explore/create_a_mesure.png" alt="Create a measure" responsive="true" popup="true" style="width:80%;">}}

Once this is done, the value of this attribute is stored **for all new logs** and can be used in [the search bar](#search-bar), [the Facet Panel](#facet-panel), and in the [Log graph query][2].

### Select the Measure Unit

All measure have their own unit that is then used for display in the Log explorer columns, Log stream widgets in dashboards, and in the Log Graphs.

{{< img src="logs/explore/edit_a_measure.png" alt="Edit a measure" responsive="true" popup="true" style="width:80%;">}}

## Search bar

The search query language is based on the Lucene query syntax:

[Apache Lucene - Query Parser Syntax][3]

All search parameters are contained in the url, so it is very simple to share your view.

### Search syntax
A query is composed of terms and operators.

There are two types of terms:

* A **Single Term** is a single word such as "test" or "hello".

* A **Sequence** is a group of words surrounded by double quotes such as "hello dolly".

To combine multiple terms into a complex query, you can use any of the following boolean operators:

{{% table responsive="true" %}}
||||
|:----|:----|:----|
| **Operator** | **Description ** | **Example **|
| `AND` | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | authentication AND failure |
| `OR` | **Union**: either terms is contained in the selected events| authentication OR password|
| `-` | **Exclusion**: the following term is NOT in the event |authentication AND -password|
{{% /table %}}

### Facet search 
To search on a specific [facet](#facets) you need to [add it as a facet first](#create-a-facet) then add `@` to specify you are searching on a facet.

For instance, if your facet name is **url** and you want to filter on the **url** value *www.datadoghq.com* just enter: 

`@url:www.datadoghq.com`

### Wildcards
To perform a multi-character wildcard search, use the `*` symbol as follows:

* `service:web*`  matches every log message that has a service starting by “web”.
* `hello*` matches all log messages starting with hello
* `*hello` matches all log messages that end with hello

### Numerical values
Use `<`,`>`, `<=` or `>=` to perform a search on numerical attributes. For instance, retrieve all logs that have a response time over 100ms with:

`@http.response_time:>100`

It is also possible to search for numerical attribute within a specific range. For instance, retrieve all your 4xx errors with:

`@http.status_code:[400 TO 499]`

### Tags

Your logs inherit tags from [hosts][4] and [integrations][5] that generate them. They can be used in the search and as facets as well:

* `test` is searching for the string "test".
* `("env:prod" OR test)` matches all logs with the tag #env:prod or the tag #test 
* `(service:srvA OR service:srvB)` or `(service:(srvA OR srvB))` Matches all logs that contain tags #service:srvA or #service:srvB.
* `("env:prod" AND -”version:beta”)` matches all logs that contain #env:prod and that do not contain #version:beta

### Autocomplete
Typing a complex query can be cumbersome. Use the search bar's autocomplete feature to complete your query using existing values:

{{< img src="logs/explore/search_bar_autocomplete.png" alt="search bar autocomplete " responsive="true" popup="true" style="width:80%;">}}

### Saved Searches

Don't lose time building the same views everyday. Saved searches contain your search query, columns and time horizon. They are then available in the search bar thanks to the auto-complete matching whether the search name or query.

{{< img src="logs/explore/saved_search.png" alt="Saved Search" responsive="true" popup="true" style="width:80%;">}}

To delete a saved search, click on the bin icon under the log search drop-down:

{{< img src="logs/explore/delete_saved_search.png" alt="Delete Saved Search" responsive="true" popup="true" style="width:80%;">}}

### Escaping of special characters
The following attributes are considered as special: `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, `\` and require escaping.
For instance, to search logs that contain `user=12345` the following search must be entered:

`user\=12345`

The same logic must be applied to spaces within log attributes. It is not recommended to have spaces in log attributes but in such a case, spaces require escaping.
If an attribute was called `user.first name`, perform a search on this attribute by escaping the space:

`@user.first\ name:myvalue`

## Log Graph

Switch between the Log List and the Log Graph mode by clicking on this button:

{{< img src="logs/explore/graph/log_graph_switch.png" alt="Log graph switch" responsive="true" popup="true" style="width:80%;">}}

To start using it:

1. Choose a [Measure](#measure) or [Facet](#facet) to graph. Choosing a Measure lets you choose the aggregation function whereas selecting a Facet displays the unique count.
    {{< img src="logs/explore/graph/choose_measure_facet.png" alt="choose measure facet" responsive="true" popup="true" style="width:50%;">}}
2. Select the aggregation function for the Measure you want to graph
    {{< img src="logs/explore/graph/agg_function_log_graph.png" alt="aggregation function for log graph" responsive="true" popup="true" style="width:50%;">}}
3. Split by [Tag][6] or [Facet](#facets) to split your graph over the desired dimension.

    {{< img src="logs/explore/graph/split_by_log_graph.png" alt="split by log graph" responsive="true" popup="true" style="width:50%;">}}

4. See logs related to a section of the graph:  
    Select or click on a section of the graph to either zoom in the graph or see the list of logs corresponding to your selection: 

    {{< img src="logs/explore/graph/using_log_graph.gif" alt="using log graph" responsive="true" popup="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/#attribute-remapper
[2]: /logs/#log-graph
[3]: http://lucene.apache.org/core/2_9_4/queryparsersyntax.html
[4]: /graphing/infrastructure/
[5]: /integrations/
[6]: /getting_started/tagging
