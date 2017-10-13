---
title: Explore
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: lognav
---

<div class="alert alert-info">
Datadog's log management is currently in private beta. If you would like to apply to it, please fill out <a href="https://www.datadoghq.com/log-management/">this form</a>.
</div>
## Overview 

The Logs explorer is your home base for troubleshooting and exploration:

{{< img src="logs/explore/explore_view_with_comments.png" alt="Explore view with comments" responsive="true" >}}

In this view you can:

* [Interact with the Time range](#time-range)
* [Display lists of logs](#log-list)
* [Use facets to filter your log list](#facets)
* [Enter search queries](#search-bar)

## Time Range
Time range allows you to display logs within a given time period. It appears directly under the search bar as a timeline. The timeline can be displayed or wrapped up with the **Show Graph** check box:

{{< img src="logs/explore/timeline.png" alt="Timeline" responsive="true" >}}

Quickly change the time range by selecting a preset range from the dropdown:

{{< img src="logs/explore/timerange.png" alt="Timerange" style="width:75%;">}}

## Log list
The log list is the list of logs that match the selected context, a context is defined by a [search bar](#search-bar) filter and a [time range](#time-range).
You can sort the list by clicking the **date** column header.

{{< img src="logs/explore/log_list.png" alt="Log List" responsive="true" >}}

### Filtering the log list
If you enter a valid query into the [search bar](#search-bar),  words that match your query are highlighted and log displayed match your facet criteria:

{{< img src="logs/explore/log_list_highlighted.png" alt="Log List highlighted" responsive="true" >}}

### Displaying a full log
You can click on any log line to see more detail about it:

{{< img src="logs/explore/log_in_log_list.png" alt="Log in log list" responsive="true" >}}

### View a log line in context
When clicking a log line for more detail, click on « view in context »: 

This lets you see log lines dated just before and after your selected log — even if they don't match your filters.

For syslog-formatted logs, hostname and service name corresponding to the log line are automatically ticked in the facets checkboxes as filters.

### Columns
To add more log details to the list, click the **Columns** button and select any facets you want to see:

{{< img src="logs/explore/log_list_with_columns.png" alt="Log List with columns" responsive="true" >}}

## Facets 

A facet displays all the distinct members of an attribute or a tag as well as provides some basic analytics such as the amount of logs represented. This is also a handle to easily filter over your data.

A Facet helps you to break down your datasets over user(s), service(s), etc ...

{{< img src="logs/explore/facets_demo.png" alt="Facets demo" responsive="true" >}}

### Create a Facet

To start using an attribute in a Facet or in the search, you simply need to click on it and add it as a Facet:
{{< img src="logs/explore/create_facet.png" alt="Create Facet" style="width:75%;">}}

Once this is done, the value of this attribute for all new logs is  stored and can be used for search either in the search bar or in the Facet Panel

### Facet Panel

Use facets to easily filters on your logs. The search bar and url automatically reflect your selections.
{{< img src="logs/explore/facet_panel.png" alt="Facet panel" responsive="true" >}}

### Expanded view

Expand a facet to access advanced search options like 
Including or excluding a pattern within a facet.

For example: You want to have all url starting with “/test_5”: 
{{< img src="logs/explore/expanded_view.png" alt="Expanded view" style="width:75%;" >}}

## Search bar

The search query language is based on the Lucene query string:

[Apache Lucene - Query Parser Syntax](http://lucene.apache.org/core/2_9_4/queryparsersyntax.html)

All search parameters are contained in the url, so it is very simple to share your view.

### Search syntax
A query is composed of terms and operators.

There are two types of terms:

* A **Single Term** is a single word such as "test" or "hello".

* A **Sequence** is a group of words surrounded by double quotes such as "hello dolly" or "hello dolly"~2.

To combine multiple terms into a complex query, you can use any of the following boolean operators:

||||
|:----|:----|:----|
| **Operator** | **Description ** | **Example **|
| `AND` | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | authentication AND failure |
| `OR` | **Union**: either terms is contained in the selected events| authentication OR password|
| `-` | **Exclusion**: the following term is NOT in the event |authentication AND -password|

### Facet search 
To search on specific [facet](#facets) you need to [add them as facet first]()
then add `@` to specify you are searcing on a facet.

For instance, if your facet name is **url** and you want to filter on the **url** value just enter: 

`@url:www.datadoghq.com`

### Wildcards
To perform a multi-character wildcard search, use the `*` symbol as follows:

* `service:web*`  matches every log message that have an service starting by “web”.
* `hello*` matches all log message starting with hello
* `*hello` matches all log message that ends with hello

### Tags

Your logs inherit tags from their [host](https://docs.datadoghq.com/hostnames/) and [integrations](https://docs.datadoghq.com/integrations/). 
They can be used in the search and in facets as well:

* `test` is searching for the tag #test.
* `("env:prod" OR test)` matches all logs with the tag #env:prod or the tag #test 
* `("service:srvA" OR "service:srvB")` or `(service:(srvA OR srvB))` Matches all logs that contains tags #service:srvA or #service:srvB.
* `("env:prod" AND -”version:beta”)` matches all logs that contains #env:prod and that do not contains #version:beta

### Autocomplete
Typing a complex query can be cumbersome. Use the search bar's autocomplete feature to complete your query using existing values:

{{< img src="logs/explore/search_bar_autocomplete.png" alt="search bar autocomplete " responsive="true" >}}

## What's next

* Learn how to [process your logs](/logs/processing)
* Learn more about [parsing](/logs/parsing)