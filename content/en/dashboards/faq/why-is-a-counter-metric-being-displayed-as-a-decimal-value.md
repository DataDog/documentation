---
title: Why is a counter metric being displayed as a decimal value?
kind: faq
aliases:
    - /graphing/faq/why-is-a-counter-metric-being-displayed-as-a-decimal-value
---

Counter metrics submitted are normalized by default at a per second rate. Rates make sense for certain types of metrics, like number of queries, that suggest a value that is constantly changing over time:

{{< img src="dashboards/faq/CountsBlogImage1.png" alt="CountsBlogImage1"  >}}

If you prefer to view the metric as a total count per time frame, you can append the .as_count() function to the query. Counts allow you to quickly see how many of a particular event happened in a short amount of time. Counts can also be a preferable visualization when there are gaps between occurrences of events:

{{< img src="dashboards/faq/CountsBlogImage3.png" alt="CountsBlogImage3"  >}}

To read more about counts and rates, see [Visualize StatsD metrics with Counts Graphing][1].

Note: these functions are only available for StatsD metrics.
Due to more complex and varying metadata information Datadog Agent counters metrics cannot use the as_count/ as_rate functions at the moment.

[1]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
