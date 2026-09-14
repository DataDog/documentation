---
title: Group Product Analytics events
description: Add facet breakdowns to split your Product Analytics query into multiple values.
---

A query without a breakdown returns a single value, such as a total count of views. Add a *breakdown* to split that value into categories. For example, given a query of total views, you might add a breakdown for country so you can see where views come from.

## Add a breakdown

Click {{< ui >}}Add breakdown{{< /ui >}} to add up to four breakdowns to a single query. Each breakdown appears as a row under {{< ui >}}compared by{{< /ui >}} in the query builder.

Each breakdown you add splits the results into ever smaller values. For example, a query broken down by both browser and country returns one bucket for each browser-and-country combination in your data, such as Chrome/United States and Chrome/Germany.

{{< img src="product_analytics/analytics/group/analytics-breakdown-1.png" alt="A query broken down by browser and country in the Analytics chart builder" style="width:90%;" >}}

## Choose a measure

By default, a query measures the count of all events.

{{< img src="product_analytics/analytics/group/analytics-measure-count-1.png" alt="The default count of events measure in the Analytics chart builder" style="width:90%;" >}}

Change the measure to count unique to see the number of unique values of a chosen facet. For example, count unique of browser returns the number of distinct browsers that viewed a page.

{{< img src="product_analytics/analytics/group/analytics-measure-count-unique-1.png" alt="A count unique of browser measure in the Analytics chart builder" style="width:90%;" >}}

Change the measure to a statistical aggregation of a numerical facet, such as loading time. Choose average, minimum, maximum, median, sum, or a percentile (75th, 90th, 95th, 98th, or 99th).

{{< img src="product_analytics/analytics/group/analytics-measure-statistical-1.png" alt="Statistical aggregation options for a loading time measure in the Analytics chart builder" style="width:90%;" >}}
