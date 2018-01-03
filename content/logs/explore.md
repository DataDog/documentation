---
title: Explore
kind: documentation
description: "The Logs Explorer is your Datadog home base for troubleshooting and exploration over your logs."
further_reading:
- link: "/logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "/logs/parsing"
  tag: "Documentation"
  text: Learn more about parsing
---

<div class="alert alert-info">
Datadog's Logs is currently available via public beta. You can apply for inclusion in the beta via <a href="https://www.datadoghq.com/log-management/">this form</a>.
</div>

## Overview 

The Logs explorer is your home base for troubleshooting and exploration:

{{< img src="logs/explore/explore_view_with_comments.png" alt="Explore view with comments" responsive="true" popup="true">}}

In this view you can:

* [Interact with the Time range](#time-range)
* [Display lists of logs](#log-list)
* [Use facets to filter your Logstream](#facets)
* [Enter search queries](#search-bar)

## Time Range
The time range allows you to display logs within a given time period. It appears directly under the search bar as a timeline. The timeline can be displayed or wrapped up with the **Show Graph** check box:

{{< img src="logs/explore/timeline.png" alt="Timeline" responsive="true" popup="true" >}}

Quickly change the time range by selecting a preset range from the dropdown:

{{< img src="logs/explore/timerange.png" style="width:50%;" alt="Timerange" responsive="true" popup="true" >}}

## Logstream
The Logstream is the list of logs that match the selected context. A context is defined by a [search bar](#search-bar) filter and a [time range](#time-range).
You can sort the list by clicking the **date** column header.

{{< img src="logs/explore/log_list.png" alt="Logstream" responsive="true" popup="true">}}

### Filtering the Logstream
If you enter a valid query into the [search bar](#search-bar), words that match your query are highlighted, and the logs displayed match your facet criteria:

{{< img src="logs/explore/log_list_highlighted.png" alt="Logstream highlighted" responsive="true" popup="true">}}

### Displaying a full log
You can click on any log line to see more details about it:

{{< img src="logs/explore/log_in_log_list.png" alt="Log in Logstream" responsive="true" popup="true">}}

### View in context

Click on its `host` or `service` and select `View in context` to see log lines dated just before and after a selected log - even if they don't match your filter -

{{< img src="logs/explore/focus_host_service.png" style="width:50%;" alt="focus on host and service.png" responsive="true" popup="true">}}

### Columns
To add more log details to the list, click the **Columns** button and select any facets you want to see:

{{< img src="logs/explore/log_list_with_columns.png" alt="Logstream with columns" responsive="true" popup="true">}}

### Multi-line display

{{< img src="logs/explore/multi_line_display.png" alt="Multi-line display" responsive="true" popup="true" style="width:30%;">}}

When enabled, your logstream display changes to better focus on your logs `message` attributes now displayed on four lines instead of one.

Without multi-line:
{{< img src="logs/explore/before_multi_line.png" alt="Before Multi-line display" responsive="true" popup="true">}}

With multi-line enabled: 
{{< img src="logs/explore/multi_line_log.png" alt="Log with Multi-line display" responsive="true" popup="true">}}

**Note**:  If present, `error.stack` attributes is displayed in priority as it should be used for stack traces. You can remap any stack-trace attribute value to this specific attribute by using [the attribute remapper processor](/logs/processing/#attribute-remapper).

## Facets 

A facet displays all the distinct members of an attribute or a tag as well as provides some basic analytics such as the amount of logs represented. This is also a switch to easily filter your data.

Facets allow you to pivot or filter your datasets based on a given attribute. Examples facets may include users, services, etc...

{{< img src="logs/explore/facets_demo.png" alt="Facets demo" responsive="true" popup="true">}}

### Create a Facet

To start using an attribute as a Facet or in the search, click on it and add it as a Facet:
{{< img src="logs/explore/create_facet.png" style="width:50%;" alt="Create Facet" responsive="true" popup="true">}}

Once this is done, the value of this attribute is stored **for all new logs** and can be used for searches via the [search bar](#searche-bar) or [Facet Panel](#facet-panel).

### Facet Panel

Use facets to easily filters on your logs. The search bar and url automatically reflect your selections.
{{< img src="logs/explore/facet_panel.png" alt="Facet panel" responsive="true" popup="true">}}

## Search bar

The search query language is based on the Lucene query syntax:

[Apache Lucene - Query Parser Syntax](http://lucene.apache.org/core/2_9_4/queryparsersyntax.html)

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
| **Operator** | **Description ** | **Example **|
| `AND` | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | authentication AND failure |
| `OR` | **Union**: either terms is contained in the selected events| authentication OR password|
| `-` | **Exclusion**: the following term is NOT in the event |authentication AND -password|
{{% /table %}}

### Facet search 
To search on a specific [facet](#facets) you need to [add it as a facet first](#create-a-facet) then add `@` to specify you are searcing on a facet.

For instance, if your facet name is **url** and you want to filter on the **url** value *www.datadoghq.com* just enter: 

`@url:www.datadoghq.com`

### Wildcards
To perform a multi-character wildcard search, use the `*` symbol as follows:

* `service:web*`  matches every log message that have an service starting by “web”.
* `hello*` matches all log message starting with hello
* `*hello` matches all log message that ends with hello

### Numerical values
Use `<`,`>`, `<=` or `>=` to perform a search on numerical attributes. For instance, retrieve all logs that have a response time over 100ms with:

`@http.response_time:>100`

It is also possible to search for numerical attribute within a specific range. For instance, retrieve all your 4xx errors with:

`@http.status_code:[400 TO 499]`

### Tags

Your logs inherit tags from [hosts](/graphing/infrastructure/) and [integrations](/integrations/) that generate them. They can be used in the search and as facets as well:

* `test` is searching for the string "test".
* `("env:prod" OR test)` matches all logs with the tag #env:prod or the tag #test 
* `(service:srvA OR service:srvB)` or `(service:(srvA OR srvB))` Matches all logs that contains tags #service:srvA or #service:srvB.
* `("env:prod" AND -”version:beta”)` matches all logs that contains #env:prod and that do not contains #version:beta

### Autocomplete
Typing a complex query can be cumbersome. Use the search bar's autocomplete feature to complete your query using existing values:

{{< img src="logs/explore/search_bar_autocomplete.png" alt="search bar autocomplete " responsive="true" popup="true">}}

### Saved Searches

Don't loose time building the same views everyday. Saved searches contains your search query, columns and time horizon. They are then available in the search bar thanks to the auto-complete matching whether the search name or query.

{{< img src="logs/explore/saved_search.png" alt="Saved Search" responsive="true" popup="true">}}

### Escaping of special characters
The following attributes are considered as specials: `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, `\` and require escaping.
For instance to search logs that contains `user=12345` the following search must be entered:

`user\=12345`

The same logic must be applied to spaces within log attributes. It is not recommended to have spaces in log attributes but if it was to be the case, spaces require escaping.
If an attribute was called `user.first name`, perform a search on this attribute by escaping the space:

`@user.first\ name:myvalue`

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
