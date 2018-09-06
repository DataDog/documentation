---
title: Log Explorer
kind: documentation
description: "Search through all of your logs and perform Log Analytics"
aliases:
    - /logs/explore
---

The Logs Explorer is your home base for troubleshooting and exploration:

{{< img src="logs/explorer/explore_view_with_comments.png" alt="Explore view with comments" responsive="true" >}}

In this view you can: 

* [Configure the log explorer view by creating facets and measure from your logs data](#configuration).
* [Build a context to explore your logs](context).
* [Visualize your logs as a filtered log stream or a log analytic](#visualization).

## Configuration

After being processed with the help of pipelines and processors, your logs attributes can be indexed in order to be accesible for your context creation and log analytics.

Note: To leverage the most out of your Log explorer view make sure your logs attribute follow [Datadog attribute naming convention][20].

### Facets

A facet displays all the distinct members of an attribute or a tag as well as provides some basic analytics such as the amount of logs represented. This is also a switch to easily filter your data.

Facets allow you to pivot or filter your datasets based on a given attribute. Examples facets may include users, services, etc...

{{< img src="logs/explorer/facets_demo.png" alt="Facets demo" responsive="true" style="width:80%;">}}

#### Create a Facet

To start using an attribute as a Facet or in the search, click on it and add it as a Facet:

{{< img src="logs/explorer/create_facet.png" style="width:50%;" alt="Create Facet" responsive="true" style="width:50%;">}}

Once this is done, the value of this attribute is stored **for all new logs** and can be used in [the search bar][1], [the Facet Panel](#facet-panel), and in the [Log Analytics query][2].

### Measures

A Measure is a attribute with numerical value contained in your logs. Think of it as a "log metric".

#### Create a Measure

To start using an attribute as a measure, click on a numerical attribute of your log:

{{< img src="logs/explorer/create_a_mesure.png" alt="Create a measure" responsive="true" style="width:80%;">}}

Once this is done, the value of this attribute is stored **for all new logs** and can be used in [the search bar][1], [the Facet Panel](#facet-panel), and in the [Log Analytics query][2].

#### Select the Measure Unit

All measure have their own unit that is then used for display in the Log Explorer columns, Log stream widgets in dashboards, and in the Log Analytics.

{{< img src="logs/explorer/edit_a_measure.png" alt="Edit a measure" responsive="true" style="width:80%;">}}

## Context

Build up a context to explore your logs in your log explorer view first by selecting the proper Timerange then by using the search bar to filter your logstream and log analytic.

### Time Range

The time range allows you to display logs in the logstream or a log analytic within a given time period. It appears directly under the search bar as a timeline. The timeline can be displayed or wrapped up with the **Show timeline** check box:

{{< img src="logs/explorer/timeline.png" alt="Timeline" responsive="true" style="width:50%;">}}

Quickly change the time range by selecting a preset range from the dropdown:

{{< img src="logs/explorer/timerange.png" style="width:50%;" alt="Timerange" responsive="true" >}}

### Search 

Use facets, measures, tags, or even [free text search][20] to filter your log stream and log analytics with a dedicated context. The search bar and url automatically reflect your selections.

Follow the [guide to search your logs][17] for a detailed explanation of all the Log Explorer search features including use of wildcards and queries of numerical values.

{{< img src="logs/explorer/search_your_logs.gif" alt="Search your logs" responsive="true" >}}

### Saved views

Use Saved Views to automatically configure your Log Explorer with a preselected set of facets, measures, search, Timerange, and visualization.

Check the dedicated saved views documentation to learn more.

## Visualization 

### Logstream

The Logstream is the list of logs that match the selected context. A context is defined by a [search bar][1] filter and a [time range](#time-range).

See the [Logstream documentation][17] for a detailed explanation of all the Logstream features including multi-line and column display.

{{< img src="logs/explorer/logstream/log_list.png" alt="Logstream" responsive="true" style="width:80%;">}}

### Log Analytics

After having gone through [Datadog processing][3] your logs are parsed and you have [facets][18] and [Measure][21] over the important attributes, you can graph log queries and see maximums, averages, percentiles, unique counts, and more.

Follow the [log graphing guide][23] to learn more about all the graphing option.

{{< img src="logs/explorer/log_analytics.png" alt="Log Analytics" responsive="true" style="width:70%;">}}



[1]: /logs/explorer/search
[2]: /logs/explorer/analytics
[3]: /logs/processing