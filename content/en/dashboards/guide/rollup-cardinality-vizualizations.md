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

Consider a scenario where you track distinct users visiting a website. Each day for seven days, you observe 100 unique users, leading you to assume a total of 700 users. However, the actual number of distinct users over the week might be 400, as many users visit the site on multiple days. This discrepancy arises because each time frame (such as each day) independently counts unique users, inflating the total when compared to a single, longer rollup timeframe.

This counterintuitive result is due to cardinality, which refers to how unique elements in a dataset are counted. The cardinality for each time bucket can be complex. When analyzing unique users, consider the question: "How many unique users were there each day this week?" If a user visits on two separate days, they count as unique for each day.

However, when dealing with unique counts across buckets, the implications become more nuanced. If the approach is to get a list of all views within a given time bucket (such as 4 hours), the next step is to count the distinct sessions associated with those views. By this logic, any session that has at least one view in the time bucket will be counted. For instance, if a session records a view at 7:59:50 and another at 8:00:10, four-hour rollups would count that session in both the 4-8 bucket and the 8-12 bucket, resulting in the session being counted twice.

### Implications for visualizations

Visualizations usually display the sum of values over different intervals, which can create confusion when comparing this total to a single value that represents the entire time period. For example, a graph might show a total of 125 for hourly increments, while a query to retrieve data might show a total of 121 for the same timeframe. This difference occurs because in the visualization, users or sessions can be counted multiple times in the hourly totals but only once in the overall daily total.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

