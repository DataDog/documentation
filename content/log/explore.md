---
title: Explore
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: lognav
---
<div class="alert alert-info">
Datadog's log management solution is is currently in private beta. If you would like to apply to it, please fill out <a href="https://www.datadoghq.com/log-management/">this form</a>.
</div>
## Overview 

The Log explorer is an optimized view which makes it easy to do any kind of troubleshooting and data exploration.

{{< img src="log/explore/explore_view_with_comments.png" alt="Explore view with comments" >}}

In this view you can:

* [Interact with the Time range](#time-range)
* [Display logs into lists](#log-list)
* [Use facets to help you in various investigations](#facets)
* [Enter search queries](#search-bar)

## Time Range
Time range allows you to display logs on a given time period. It is symbolised by the timeline directly under the search bar. The timeline can be displayed or wrapped up with the **Show Graph** check box:

{{< img src="log/explore/timeline.png" alt="Timeline" >}}

Change the time periode displayed with quick ranges that are directly available:

{{< img src="log/explore/timerange.png" alt="Timerange" style="width:75%;">}}

## Log list
The log list is the list of events that match the selected context, a context is defined by a [search bar](#search-bar) filter and a [time range](#time-range).
{{< img src="log/explore/log_list.png" alt="Log List" >}}

### Sorting the log list

Click on the **date** columns to get your logs in an ascending or descending order in the Log list.

### Filtering the log list
If you enter a valid query into the [search bar](#search-bar),  words that match your query are highlighted and log displayed match your facet criterias:

Searching for all the logs containing the word "deleted" from host:i-0223afcd9cb2fa6a2 : 
{{< img src="log/explore/log_list_highlighted.png" alt="Log List highlighted" >}}

### Displaying a full log
To display detail of a log line, just click on it:

{{< img src="log/explore/log_in_log_list.png" alt="Log in log list" >}}

### View a log line in context
When displaying the detail of a log line, ask to « view in context ». 
It removes any filters from your search bar and display log lines preceding this line and the few log lines following it.

If you send the log lines in syslog format, the hostname and app name corresponding to the log line are automatically be selected.

### Columns
In order to get more details about the objects you are looking at, select a few facets to display with the **Columns** button:
{{< img src="log/explore/log_list_with_columns.png" alt="Log List with columns" >}}

## Facets 

A facet displays all the distinct members of an attribute or a tag as well as provides some basic analytics such as the amount of logs represented. This is also a handle to easily filter over your data.

A Facet helps you to break down your datasets over user(s), service(s), etc ...

/////\\\\\\<br>
/////\\\\\\<br>
/////\\\\\\Add gif of how facet works<br>
/////\\\\\\<br>
/////\\\\\\<br>

### Create a Facet

To start using an attribute or a tag in a Facet or in the search, you simply need to click on it and add it as a Facet:
{{< img src="log/explore/create_facet.png" alt="Create Facet" style="width:75%;">}}

Once this is done, the value of this attribute for all new logs is  stored and can be used for search either in the search bar or in the Facet Panel

### Facet Panel

Use facets to easily filters on your logs. The search bar and url automatically reflect your selections.
{{< img src="log/explore/facet_panel.png" alt="Facet panel" >}}

### Expanded view

Expand a facet to access advanced search options like 
Including or excluding a pattern within a facet.

For example: You want to have all host starting by “i-06”: 
{{< img src="log/explore/expanded_view.png" alt="Expanded view" style="width:75%;" >}}

## Search bar

The search query language is based on the Lucene query string:

[Apache Lucene - Query Parser Syntax](http://lucene.apache.org/core/2_9_4/queryparsersyntax.html)

All search parameters are contained in the url, so it is very simple to share your view.

### Search syntax
A query is broken up into terms and operators.

There are two types of terms:

* A **Single Term** is a single word such as "test" or "hello".

* A **Sequence** is a group of words surrounded by double quotes such as "hello dolly" or "hello dolly"~2.

Multiple terms can be combined together with Boolean operators to form a more complex query.

Here are the available boolean operators:

||||
|:----|:----|:----|
| **Operator** | **Description ** | **Example **|
| `AND` | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | authentication AND failure |
| `OR` | **Union**: either terms is contained in the selected events| authentication OR password|
| `-` | **Exclusion**: the following term is NOT in the event |authentication AND -password|

### Facet search 
To search on specific [facet](#facets) you need to [add them as facet first]()
then add `@` to specify you are searcing on a facet.

For instance, if your facet name is service and you want to filter on the nginx value just enter: 

`@service:nginx`

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
Typing a complex query can sometime be a bit cumbersome, use the search bar autocomplete feature to complete your query with existing data values:

{{< img src="log/explore/search_bar_autocomplete.gif" alt="search bar autocomplete " >}}

## What's next

* Learn how to explore your logs [here](/log/explore)
* Learn how to process your logs [here](/log/processing)
* Learn more about parsing [here](/log/parsing)
