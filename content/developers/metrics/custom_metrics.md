---
title: Custom Metrics
kind: documentation
aliases:
  - /getting_started/custom_metrics
---

Datadog allows you to submit custom metrics in multiple ways in order to provide a comprehensive view of what is happening in your infrastructure

This article explains:

* What a custom metric is, and how you can submit it to Datadog.
* How many custom metrics we allow for out of the box.
* How to check your custom metric count over time.

## How is a custom metric defined ?

A custom metric refers to a single, unique combination of a metric name, host, and any tags.

Custom metrics generally refer to any metric that you send using statsd, [DogStatsD][1], or through extensions made to the [Datadog Agent][2]. Some [integrations][3] can potentially emit an unlimited number of metrics that can also count as custom, [further details on which standard integrations emit custom metrics][4].

In order to fully leverage the capabilities of Datadog through scoping and alerting, you'll probably be using tags. As a consequence, one submitted metric actually leads to **multiple unique tag combinations**- counting towards your custom metrics count.

For example:

* You submit the following metric name: `auth.exceptionCount`
* Your code instrumentation plans the following tags associated with that metric: `method:X`, `method:Y`, `exception:A`, `exception:B`.
* The logic behind your metric is the following :
{{< img src="developers/metrics/custom_metrics/custom_metric_1.png" alt="custom_metric_1" responsive="true" >}}

The given unique metrics **on a given host** are therefore:

* `auth.exceptionCount` with tag `method:X`
* `auth.exceptionCount` with tag `method:Y`
* `auth.exceptionCount` with tags `method:X` and `exception:A` //unique because of new tag `exception:A`
* `auth.exceptionCount` with tags `method:X` and `exception:B`
* `auth.exceptionCount` with tags `method:Y` and `exception:A`
* `auth.exceptionCount` with tags `method:Y` and `exception:B`

In this situation, you would end up with 6 different metrics.

Note that the ordering of tags does not matter, so the following two metrics would be considered non-unique:

* auth.exceptionCount with tags `method:X` and `exception:A`
* auth.exceptionCount with tags `exception:A` and `method:X`

## How many custom metrics am I allowed?

Datadog offers 2 plans - Pro & Enterprise. Pro customers are allotted 100 custom metrics per host & Enterprise customers are allotted 200 custom metrics per host. These are counted across your entire infrastructure rather than on a per-host basis. For example, if you were on the Pro plan and are licensed for 3 hosts, you would have 300 custom metrics by default - these 300 metrics may be divided equally amongst each individual host, or all 300 metrics could be sent from a single host.

Using the aforementioned example, below shows three scenarios which would all be acceptable without exceeding the default metric count for three hosts:

{{< img src="developers/metrics/custom_metrics/Custom_Metrics_300.jpg" alt="Custom_Metrics_300" responsive="true" style="width:75%;">}}

{{< img src="developers/metrics/custom_metrics/custom-metrics-1.jpg" alt="custom-metrics-1" responsive="true" style="width:75%;">}}

There are no enforced [fixed rate limits][5] on custom metric submission. If you're exceeding your default allotment, a Datadog support agent will reach out to you.

## How do I check my custom metrics count?

When creating a custom metric, all the host tags are automatically added to that metric as one unique tag combination, to which you'll add the tags linked to the metric itself. Those are the most important as they add to the actual metric count.

Let's say you want to have insight into the request.count from different services across your infrastructure.

* You create your metric service.request.count
* You want to separate the requests that were successful from the failures. You create two tags to that effect:
    * `status:success`
    * `status:failure`
* You want this metric to be reported by each service running on your infrastructure. Let's say you have 3 services per host:
    * `service:database`
    * `service:api`
    * `service:webserver`

The logic behind your metric is the following :

{{< img src="developers/metrics/custom_metrics/logic_metric.png" alt="logic_metric" responsive="true" style="width:75%;">}}

From there, you can see that **on each host reporting this metric**, if all services report both successes and failures, you can have up to 1x2x3 = **6 custom metrics**.

Let's say you have 3 hosts:

* `host1` is reporting all possible configurations
* `host2` is reporting only successes across all services
* `host3` is reporting success and failures, but only for database and webserver services

Across your 3 hosts, you'd have 13 distinct metrics, here is why :

{{< img src="developers/metrics/custom_metrics/metric_count.png" alt="metric_count" responsive="true" style="width:75%;">}}

If you are an administrator, you can see your total custom metrics per hour as well as the top 500 custom metrics by cardinality in your account in [the usage details page][6]. You can also see this metric count on your [metric summary page][7], where you'd see, clicking on the service.request.count metric, the exact number of unique tag combinations:

So if you only had the first host from the example above reporting, you'd have this:

{{< img src="developers/metrics/custom_metrics/metric_summary.png" alt="metric_summary" responsive="true" style="width:70%;">}}

Adding the second host:

{{< img src="developers/metrics/custom_metrics/metric_summary_2.png" alt="metric_summary_2" responsive="true" style="width:70%;">}}

Adding the third host as per the table above, you get your 13 distinct metrics:

{{< img src="developers/metrics/custom_metrics/metric_summary_3.png" alt="metric_summary_3" responsive="true" style="width:70%;">}}

Using the query editor, you can also find this using the count: aggregator

{{< img src="developers/metrics/custom_metrics/metric_aggregator.png" alt="metric_aggregator" responsive="true" style="width:70%;">}}

Ultimately, you'll have 13 metrics using the following query: `count:service.request.count{*}`

{{< img src="developers/metrics/custom_metrics/count_of_metrics.png" alt="count_of_metrics" responsive="true" style="width:70%;">}}

## Overhead

If you're submitting metrics directly to the Datadog API *without* using [DogStatsD][1], expect:

* 64 bits for the timestamp
* 64 bits for the value
* 20 bytes for the metric names
* 50 bytes for the timeseries

The full payload is approximately \~ 100 bytes. However, with the DogStatsD API, compression is applied and the typical payload is very small.

[1]: /developers/dogstatsd
[2]: /agent
[3]: /integrations
[4]: /integrations/faq/what-standard-integrations-emit-custom-metrics
[5]: /api/#rate-limiting
[6]: https://app.datadoghq.com/account/usage/hourly
[7]: https://app.datadoghq.com/metric/summary
