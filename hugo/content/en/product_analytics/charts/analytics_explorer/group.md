---
title: Group Product Analytics Events
description: Add facet breakdowns to split your Product Analytics query into multiple values.
---

A query without a breakdown returns a single value, such as a total count of views. Add a *breakdown* to split that value into categories. For example, given a query of total views, you might add a breakdown for country so you can see where views come from.

## Add a breakdown

Click {{< ui >}}Add breakdown{{< /ui >}} to add up to four breakdowns to a single query. Each breakdown appears as a row under {{< ui >}}compared by{{< /ui >}} in the query builder.

Each breakdown you add splits the results into ever smaller values. For example, a query broken down by both browser and country returns one bucket for each browser-and-country combination in your data, such as Chrome/United States and Chrome/Germany.

{{< img src="product_analytics/analytics/group/analytics-breakdown-1.png" alt="A query broken down by browser and country in the Analytics chart builder." style="width:90%;" >}}

## Choose a measure

By default, a query measures the count of {{< ui >}}All events{{< /ui >}}.

{{< img src="product_analytics/analytics/group/analytics-measure-count-1.png" alt="The default count of all events in the Analytics chart builder." style="width:90%;" >}}

Change {{< ui >}}All events{{< /ui >}} to a different value to see a unique count of the specified value. For example, selecting {{< ui >}}Browser Name{{< /ui >}} returns the number of distinct browsers that viewed a page.

{{< img src="product_analytics/analytics/group/analytics-measure-count-unique-1.png" alt="A unique count by browser in the Analytics chart builder." style="width:90%;" >}}

Change the measure to a statistical aggregation of a numerical facet, such as loading time. Choose average, minimum, maximum, median, sum, or a percentile (75th, 90th, 95th, 98th, or 99th).

{{< img src="product_analytics/analytics/group/analytics-measure-statistical-1.png" alt="Statistical aggregation options for loading time in the Analytics chart builder." style="width:90%;" >}}
