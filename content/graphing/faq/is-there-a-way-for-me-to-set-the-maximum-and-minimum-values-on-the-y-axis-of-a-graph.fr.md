---
title: Is there a way for me to set the maximum and minimum values on the y-axis of a graph?
kind: faq
---

## Scenario

Is there a way for me to set the maximum and minimum values on the y-axis of a graph? I'd like to ignore any data point above a certain threshold so that I can get a better look at how the baseline is changing.

## Solution

You can use the filter option that allows you to automatically change y-axis bounds [based on a threshold](/graphing).

Another solution to help identify outliers is to use the heatmap visualization (learn more about it from our [blog post](https://www.datadoghq.com/blog/detecting-outliers-cloud-infrastructure-datadog-heatmaps/)), or our outlier detection algorithms ([blog post](https://www.datadoghq.com/blog/introducing-outlier-detection-in-datadog/) and [documentation](/monitors/monitor_types/outlier)).