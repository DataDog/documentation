---
title: Understanding Rollup Function and Cardinality in Visualizations
further_reading:
- link: "/dashboards/functions/rollup/"
  tag: "Documentation"
  text: "Learn more about the Rollup function"
---

## Overview

Visualizations in data analysis often rely on aggregation functions to summarize data over time. One common challenge arises when using the rollup function alongside distinct or unique cardinality measures. 

The interaction between rollup functions and cardinality measures can lead to unexpected results when visualizing data. You need to understand these nuances to interpret visualizations accurately. By aligning expectations with the nature of rollup results and employing clear queries, you can gain valuable insights from their data.

This document explains how the rollup function operates, particularly in the context of cardinality, and provides best practices on how to interpret visualization results accurately.

## Understanding cardinality in timeseries

**Cardinality**   
: The number of tag values associated with a tag key for a metric.

Cardinality refers to counting unique elements within a dataset. When applied to timeseries data, this often involves counting distinct users, sessions, or events within time frames, such as hours or days. 

A common misconception with visualizations occurs when the sum of distinct counts over short intervals is expected to match the distinct count over a longer period. This is often not the case due to the nature of cardinality.

### Example: Distinct user counts

Consider a scenario where you track distinct users visiting a website. Each day, you observe 100 unique users, totaling 700 across a week. However, the actual number of distinct users over the entire week might be 400, as many users visit the site on multiple days. This discrepancy arises because each time frame (such as each day) independently counts unique users, which inflates the sum when compared to a single, longer rollup time frame.

## Rollup functionality and unexpected results

When aggregating data using the rollup function, the results can be counterintuitive. For example, the sum of hourly distinct user counts can exceed the count of distinct users over a full day. This is because users appearing in multiple hourly buckets are counted once per bucket but only once across the entire day.

### Implications for visualizations

Visualizations by default show the sum of rollup values across intervals, which can lead to discrepancies between the sum and a scalar value representing the entire time frame. For instance, a graph might display a sum of 125 for hourly rollups, while a direct query shows 121 for the same period. This is due to sessions or users being counted multiple times across hourly buckets but only once in the daily rollup.

## Rollups with averages and cardinality

Averages involving cardinality can also present challenges. 

For example, hourly averages for the proportion of distinct users without errors may consistently appear high, even at 99.5%. Yet, weekly averages can reveal a lower percentage, decreasing to 97.5% due to the broader time frame.

This discrepancy is due to the weekly calculation aggregating more unique user visits, which means more error occurrences over a longer period.

### Example calculation

Suppose a site experiences 18,000 error events among 13,000 users in a week. Hourly, this might average to about 107 error-afflicted users out of 20,000 total users per hour, resulting in a lower error rate. However, weekly aggregation reveals a higher error rate due to more users encountering errors across the entire week.

When aggregating errors at a weekly scale, the total count of errors appears higher as more users experience errors over the extended duration, contrasting with the lower average seen hourly.

## Solutions and best practices

### Understanding data rollups

Interpreting rollup results requires a clear understanding of how data is aggregated. To grasp the full picture, manually calculate distinct counts over desired intervals and compare them to rollup outputs. This approach clarifies discrepancies and aids in accurate data interpretation.

### Aligning expectations with reality

Align expectations with how distinct counts function in rollups. Recognize that the sum of individual intervals does not necessarily reflect a longer aggregation period. Instead, focus on the distinct nature of each interval's count and apply this understanding to interpret visualizations correctly.

### Clarifying queries

Rephrase queries to highlight the data's behavior to make results more intuitive. For example, instead of asking how many users visited each day, ask how many unique users visited at least once during the entire week. This perspective helps manage expectations and aligns them with the data's inherent characteristics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
