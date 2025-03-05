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

Consider a scenario where you track distinct users visiting a website. Each day for seven days, you observe 100 unique users, so you might assume you had a total of 700 users. However, the actual number of distinct users over the entire week might be 400, as many users visit the site on multiple days. This discrepancy arises because each time frame (such as each day) independently counts unique users, which inflates the sum when compared to a single, longer rollup time frame.

This counterintuitive result is due to cardinality, or how the unique elements in a dataset are counted.

## Rollup functionality and unexpected results

When aggregating data using the rollup function, the results can be counterintuitive. For example, the sum of hourly distinct user counts can exceed the count of distinct users over a full day. This is because users appearing in multiple hourly buckets are counted once per bucket but only once across the entire day.

### Implications for visualizations

Visualizations by default show the sum of rollup values across intervals, which can lead to discrepancies between the sum and a scalar value representing the entire time frame. For instance, a graph might display a sum of 125 for hourly rollups, while a direct query shows 121 for the same period. This is due to sessions or users being counted multiple times across hourly buckets but only once in the daily rollup.

## Rollups with averages and cardinality

Averages involving cardinality can be complex.

For example, hourly averages may show a high percentage of distinct users without errors—reaching 99.5%. The weekly average, however, can reveal a lower percentage, dropping to 97.5% due to the longer duration.

This disparity arises from some users visiting your website multiple times over a week, leading to a higher likelihood of encountering errors over that period. See the following illustrative example for more context on this disparity.

### Error rate variation and user interactions case study

Consider a scenario where 2,000 users experience 6,000 errors in a week, while 22,000 users face no errors. Daily error rates fluctuate, with hourly figures ranging from 11 to 35 users facing errors. Additionally, on an hourly basis, there are around 1,000 distinct users encountering errors weekly, reflecting an error rate of 0.11% to 0.35%.

In contrast, over the week, 2,000 out of 24,000 users encounter errors, accounting for an 8.3% error rate—much higher than the hourly observation.

This disparity highlights the many ways you might see errors when examining weekly error rates against hourly averages.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
