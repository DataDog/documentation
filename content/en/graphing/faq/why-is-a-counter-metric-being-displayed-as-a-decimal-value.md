---
title: Why is a counter metric being displayed as a decimal value?
kind: faq
---

Counter metrics submitted are normalized by default at a per second rate. Rates make sense for certain types of metrics, like number of queries, that suggest a value that is constantly changing over time:

{{< img src="graphing/faq/CountsBlogImage1.png" alt="CountsBlogImage1" responsive="true" >}}

If you prefer to view the metric as a total count per time frame, you can append the .as_count() function to the query. Counts allow you to quickly see how many of a particular event happened in a short amount of time. Counts can also be a preferable visualization when there are gaps between occurrences of events:

{{< img src="graphing/faq/CountsBlogImage3.png" alt="CountsBlogImage3" responsive="true" >}}

To read more about counts and rates, check out [this blog post][1] on the topic.

Note: these functions are only available for statsd metrics.
Due to more complex and varying metadata information datadog-agent counters metrics cannot use the as_count/ as_rate functions at the moment.

[1]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
