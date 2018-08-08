---
title: Search
kind: documentation
description: "Search through all of your logs."
aliases:
    - /logs/search
further_reading:
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "logs/explorer/saved_views"
  tag: Documentation
  text: Automatically configure your Log Explorer
---

All of the search parameters are contained within the URL, so you can share your view simply sharing the URL.

### Search syntax

A query is composed of terms and operators.

There are two types of terms:

* A **Single Term** is a single word such as "test" or "hello".

* A **Sequence** is a group of words surrounded by double quotes such as "hello dolly".

To combine multiple terms into a complex query, you can use any of the following boolean operators:


|              |                                                                                                        |                              |
| :----        | :----                                                                                                  | :----                        |
| **Operator** | **Description **                                                                                       | **Example **                 |
| `AND`        | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | authentication AND failure   |
| `OR`         | **Union**: either terms is contained in the selected events                                            | authentication OR password   |
| `-`          | **Exclusion**: the following term is NOT in the event                                                  | authentication AND -password |

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
Use `<`,`>`, `<=`, or `>=` to perform a search on numerical attributes. For instance, retrieve all logs that have a response time over 100ms with:

`@http.response_time:>100`

It is also possible to search for numerical attribute within a specific range. For instance, retrieve all your 4xx errors with:

`@http.status_code:[400 TO 499]`

### Tags

Your logs inherit tags from [hosts][4] and [integrations][5] that generate them. They can be used in the search and as facets as well:

* `test` is searching for the string "test".
* `("env:prod" OR test)` matches all logs with the tag `#env:prod` or the tag `#test`
* `(service:srvA OR service:srvB)` or `(service:(srvA OR srvB))` Matches all logs that contain tags `#service:srvA` or `#service:srvB`.
* `("env:prod" AND -”version:beta”)` matches all logs that contain `#env:prod` and that do not contain `#version:beta`

If your tags don't follow [tags best practices][6] and don't use the `key:value` syntax, use this search query:

* `tags:<MY_TAG>`

### Autocomplete
Typing a complex query can be cumbersome. Use the search bar's autocomplete feature to complete your query using existing values:

{{< img src="logs/explorer/search/search_bar_autocomplete.png" alt="search bar autocomplete " responsive="true" style="width:80%;">}}

### Escaping of special characters
The following attributes are considered as special: `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, and `\` require escaping.
For instance, to search logs that contain `user=12345` the following search must be entered:

`user\=JaneDoe`

The same logic must be applied to spaces within log attributes. Log attributes should not contain spaces, but in such a case, spaces must be escape.
If an attribute was called `user.first name`, perform a search on this attribute by escaping the space:

`@user.first\ name:myvalue`

### Saved Searches

Don't lose time building the same views everyday. Saved Views contain your search query, columns, time horizon, and facet.

## Time Range

The time range allows you to display logs within a given time period. It appears directly under the search bar as a timeline. The timeline can be displayed or wrapped up with the **Show timeline** check box:

{{< img src="logs/explorer/search/timeline.png" alt="Timeline" responsive="true" style="width:50%;">}}

Quickly change the time range by selecting a preset range from the dropdown:

{{< img src="logs/explorer/search/timerange.png" style="width:50%;" alt="Timerange" responsive="true" >}}

## Logstream
The Logstream is the list of logs that match the selected context. A context is defined by a [search bar](#search-bar) filter and a [time range](#time-range).
You can sort the list by clicking the **date** column header.

{{< img src="logs/explorer/search/log_list.png" alt="Logstream" responsive="true" style="width:80%;">}}

### Filtering the Logstream
If you enter a valid query into the [search bar](#search-bar), words that match your query are highlighted, and the logs displayed match your facet criteria:

{{< img src="logs/explorer/search/log_list_highlighted.png" alt="Logstream highlighted" responsive="true" style="width:80%;">}}

### Displaying a full log
You can click on any log line to see more details about it:

{{< img src="logs/explorer/search/log_in_log_list.png" alt="Log in Logstream" responsive="true" style="width:80%;">}}

### View in context

Click on `View in context` to see log lines dated just before and after a selected log - even if they don't match your filter.

{{< img src="logs/explorer/search/view-in-context.gif" alt="View in context" responsive="true" >}}

The context is different according to the situation as we use the `Hostname`, `Service`, `filename` or `container_id` attributes, along with tags to make sure we find the perfect context for your logs.

### Columns
To add more log details to the list, click the **Columns** button and select any facets you want to see:

{{< img src="logs/explorer/search/log_list_with_columns.png" alt="Logstream with columns" responsive="true" style="width:80%;">}}

### Multi-line display

{{< img src="logs/explorer/search/multi_line_display.png" alt="Multi-line display" responsive="true" style="width:30%;">}}

Choose to display one, three, or ten lines from your logs `message` attributes in your logstream.

* With one line displayed:
{{< img src="logs/explorer/search/1_multi_line.png" alt="1 line Multi-line display" responsive="true" style="width:80%;">}}

* With three lines displayed:
{{< img src="logs/explorer/search/3_multi_line.png" alt="2 lines with Multi-line display" responsive="true" style="width:80%;">}}

* With ten lines displayed:
{{< img src="logs/explorer/search/10_multi_line.png" alt="10 lines with Multi-line display" responsive="true" style="width:80%;">}}

**Note**:  If present, `error.stack` attribute is displayed in priority as it should be used for stack traces.
Remap any stack-trace attribute to this specific attribute with [the attribute remapper Processor][1].

## Facets

A facet displays all the distinct members of an attribute or a tag as well as provides some basic analytics such as the amount of logs represented. This is also a switch to easily filter your data.

Facets allow you to pivot or filter your datasets based on a given attribute. Examples facets may include users, services, etc...

{{< img src="logs/explorer/search/facets_demo.png" alt="Facets demo" responsive="true" style="width:80%;">}}

### Create a Facet

To start using an attribute as a Facet or in the search, click on it and add it as a Facet:

{{< img src="logs/explorer/search/create_facet.png" style="width:50%;" alt="Create Facet" responsive="true" style="width:50%;">}}

Once this is done, the value of this attribute is stored **for all new logs** and can be used in [the search bar](#search-bar), [the Facet Panel](#facet-panel), and in the [Log Analytics query][2].

### Facet Panel

Use facets to easily filters on your logs. The search bar and url automatically reflect your selections.

{{< img src="logs/explorer/search/facet_panel.png" alt="Facet panel" responsive="true" style="width:80%;">}}

## Measures

A Measure is a attribute with numerical value contained in your logs. Think of it as a "log metric".

### Create a Measure

To start using an attribute as a measure, click on a numerical attribute of your log:

{{< img src="logs/explorer/search/create_a_mesure.png" alt="Create a measure" responsive="true" style="width:80%;">}}

Once this is done, the value of this attribute is stored **for all new logs** and can be used in [the search bar](#search-bar), [the Facet Panel](#facet-panel), and in the [Log Analytics query][2].

### Select the Measure Unit

All measure have their own unit that is then used for display in the Log Explorer columns, Log stream widgets in dashboards, and in the Log Analytics.

{{< img src="logs/explorer/search/edit_a_measure.png" alt="Edit a measure" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/processors/#attribute-remapper
[2]: /logs/explorer/analytics
[4]: /graphing/infrastructure/
[5]: /integrations/#cat-log-collection
[6]: /getting_started/tagging/#tags-best-practices
