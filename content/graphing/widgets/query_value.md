---
title: Query Value Widget
kind: documentation
---

{{< img src="graphing/widgets/references-graphing-queryvalue-example.png" alt="Query value widget" responsive="true" style="width:50%;">}}

## Overview 

Query values display the current value of a given metric query, with conditional formatting (such as a green/yellow/red background) to convey whether or not the value is in the expected range.
The value displayed by a query value need not represent an instantaneous measurement.
The widget can display the latest value reported, or an aggregate computed from all query values across the time window. These visualizations provide a narrow but unambiguous window into your infrastructure.query

## Options

## API

## FAQ
### What does "Take the X value from the displayed timeframe" mean?

{{< img src="graphing/widgets/query_value_widget.png" alt="query_value_widget" responsive="true" style="width:50%;">}}

The Query Value Widget only displays one value, unlike a timeseries for example, that displays several points.

If you are on a Timeseries and you are currently displaying the past hour, this button allows you to either display the `avg` / `max` / `min` / `sum` / `last value` of ALL points that are rendered during that 1 hour range timeframe—depending on the aggregation chosen above.