---
title: Understanding rollup function and cardinality in visualizations
further_reading:
- link: "/dashboards/functions/rollup/"
  tag: "Documentation"
  text: "Learn more about the Rollup function"
---

## Overview

Visualizations in data analysis often rely on aggregation functions to summarize data over time. One common challenge arises when the rollup function and distinct or unique cardinality measures interact with each other, leading to unexpected results when visualizing data.
	
By aligning expectations with the nature of rollup results and employing clear queries, you can gain valuable insights from their data. This document explains how the rollup function operates, particularly in the context of cardinality, and provides best practices on how to interpret visualization results accurately.

## Understanding cardinality in timeseries

Consider a scenario where you track distinct users visiting a website. Each day, you observe 100 unique users, totaling 700 across a week. However, the actual number of distinct users over the entire week might be 400, as many users visit the site on multiple days. This discrepancy arises because each time frame (such as each day) independently counts unique users, which inflates the sum when compared to a single, longer rollup time frame.

This counterintuitive result is due to cardinality, or how the unique elements in a dataset are counted. Be aware that counting unique elements within a dataset may cause these counterintuitive situations.

### Example: Distinct user counts

## Rollup functionality and unexpected results

When aggregating data using the rollup function, the results can be counterintuitive. For example, the sum of hourly distinct user counts can exceed the count of distinct users over a full day. This is because users appearing in multiple hourly buckets are counted once per bucket but only once across the entire day.

### Implications for visualizations

Visualizations by default show the sum of rollup values across intervals, which can lead to discrepancies between the sum and a scalar value representing the entire time frame. For instance, a graph might display a sum of 125 for hourly rollups, while a direct query shows 121 for the same period. This is due to sessions or users being counted multiple times across hourly buckets but only once in the daily rollup.

## Rollups with averages and cardinality

Averages involving cardinality can also present challenges. 

For example, hourly averages for the proportion of distinct users without errors may consistently appear high, even at 99.5%. Yet, weekly averages can reveal a lower percentage, decreasing to 97.5% due to the broader time frame.

This discrepancy is due to the weekly calculation aggregating multiple visits for each unique user, which means more users are likely to see at least one error over the longer period.

### Example calculation

Suppose, over the course of a week, 2,000 users on a site experience a total of 6,000 error events, while the remaining 22,000 users don't experience any errors.  Since a user's multiple errors may occur nearly simultaneously or in different hours, there could be an average of as many as 35 users experiencing errors per hour or as few as 11.

The number of distinct users per hour also varies depending on how often users visit the site: for example, a typically user might visit daily, so the 24,000 total distinct weekly users produce an average of 1,000 distinct users per hour.
The error rate for distinct users is then between 0.11% and 0.35%.

However, over the course of the week, 2,000 out of the 24,000 users experienced at least one error, for an error rate of 8.3%, significantly higher.

While very few users had an issue in any particular hour, aggregating over the week provides more opportunities for an individual user to see an error, resulting in a significantly higher error rate.

When aggregating errors at a weekly scale, the total count of errors appears higher as more users experience errors over the extended duration, contrasting with the lower average seen hourly.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
