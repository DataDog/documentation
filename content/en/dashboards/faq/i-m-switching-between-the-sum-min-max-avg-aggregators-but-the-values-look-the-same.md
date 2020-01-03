---
title: I'm switching between the sum/min/max/avg aggregators but the values look the same?
kind: faq
aliases:
    - /graphing/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same
---

When using the 'sum/min/max/avg' aggregator, we're looking across series, not at points within a single series. So if it is scoped to its most granular level, it's possible that switching between those aggregators doesn't change the values you're seeing.

For example, let's say you break down used memory by host, you'll get one timeseries for each host. If you don't break down by host, by default you'll get the average across all hosts.

