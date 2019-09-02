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

Custom metrics generally refer to any metric that you send using StatsD, [DogStatsD][1], or through extensions made to the [Datadog Agent][2]. Some [integrations][3] can potentially emit an unlimited number of metrics that can also count as custom. See [standard integrations emit custom metrics][4] for details.

Use tags to fully leverage the capabilities of Datadog through scoping and alerting. When using tags, one submitted metric actually leads to **multiple unique tag combinations**- counting towards your custom metrics count.

**Example 1**

For example, suppose you are interested in measuring the average `temperature` in the US. You collect the following temperature measurements every 10 seconds for the past minute from Orlando, Miami, New York, Boston and Seattle. Each `temperature` measurement is tagged with the information about `city`, `state`, `region`, and `country`. 

|  |  |  |  |  |  |  |  |
|------------------------------|----|----|----|----|----|----|----|
| Orlando, FL, Southeast, USA | 80 | 80 | 80 | 80 | 81 | 81 | 81 |
| Miami, FL, Southeast, USA | 82 | 82 | 82 | 82 | 82 | 82 | 82 |
| Boston, MA, Northeast, USA | 78 | 78 | 78 | 78 | 78 | 79 | 79 |
| New York, NY, Northeast, USA | 79 | 79 | 79 | 79 | 79 | 79 | 79 |
| Seattle, WA, Northwest, USA | 75 | 75 | 75 | 75 | 75 | 75 | 75 |
 
 Each unique tag combination of `city`, `state`, `region`, and `country` represents a timeseries / custom metric. Using the five timeseries above, you can determine the average temperature in the US, Northeast, or Florida.

**Example 2**

* You submit the following metric name: `auth.exceptionCount`
* Your code instrumentation plans the following tags associated with that metric: `method:X`, `method:Y`, `exception:A`, `exception:B`.
* The logic behind your metric is the following :
{{< img src="developers/metrics/custom_metrics/custom_metric_1.png" alt="custom_metric_1" responsive="true" >}}

The given unique metrics **on a given host** are therefore:

* `auth.exceptionCount` with tag `method:X`
* `auth.exceptionCount` with tag `method:Y`
* `auth.exceptionCount` with tags `method:X` and `exception:A` (unique because of new tag `exception:A`)
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

### Counting custom metrics from gauges, counts, histograms, and rates
A [gauge][8] represents one value per second (examples: temperature or Kafka queue offset).

Suppose you are interested in measuring the average `temperature` in the state of Florida. `temperature` is stored as a `gauge` metric type in Datadog. You collect the following temperature measurements every 10 seconds during the past minute from Orlando, Miami, Boston, New York and Seattle, each tagged with information about the `city`, `state`, `region`, and `country`.

|  |  |  |  |  |  |  |  |
|------------------------------|----|----|----|----|----|----|----|
| Orlando, FL, Southeast, USA | 80 | 80 | 80 | 80 | 81 | 81 | 81 |
| Miami, FL, Southeast, USA | 82 | 82 | 82 | 82 | 82 | 82 | 82 |
| Boston, MA, Northeast, USA | 78 | 78 | 78 | 78 | 78 | 79 | 79 |
| New York, NY, Northeast, USA | 79 | 79 | 79 | 79 | 79 | 79 | 79 |
| Seattle, WA, Northwest, USA | 75 | 75 | 75 | 75 | 75 | 75 | 75 |

The total number of custom metrics associated with the `temperature` gauge metric is five. Each unique string combination of `city`, `state`, `region` and `country` tagged to the temperature data counts as a custom metric (in other words a timeseries of data stored by Datadog).

Using the five timeseries above, you can determine the average `temperature` in the US, Northeast, or Florida at query time. 

**Note**: The same scheme for counting custom metrics is applied to `count`, `histogram` and `rate` metric types. 

#### Dropping tags
Suppose you want to drop the `country` tag from the gauge `temperature` metric. 

|  |  |  |  |  |  |  |  |
|------------------------------|----|----|----|----|----|----|----|
| Orlando, FL, Southeast | 80 | 80 | 80 | 80 | 81 | 81 | 81 |
| Miami, FL, Southeast | 82 | 82 | 82 | 82 | 82 | 82 | 82 |
| Boston, MA, Northeast | 78 | 78 | 78 | 78 | 78 | 79 | 79 |
| New York, NY, Northeast | 79 | 79 | 79 | 79 | 79 | 79 | 79 |
| Seattle, WA, Northwest | 75 | 75 | 75 | 75 | 75 | 75 | 75 |

Even though there are five cities, four states, three regions, and one country, there are still five unique tag value combinations of `city`, `state`, `region`, and `country` that appear in the data. The total number of custom metrics emitted from the `temperature` metric is still five. 

Suppose you drop the `city` tag from the gauge `temperature` metric.

|  |  |  |  |  |  |  |  |
|------------------------------|----|----|----|----|----|----|----|
| FL, Southeast | 81 | 81 | 81 | 81 | 81.5 | 81.5 | 81.5 |
| MA, Northeast | 78 | 78 | 78 | 78 | 78 | 79 | 79 |
| NY, Northeast | 79 | 79 | 79 | 79 | 79 | 79 | 79 |
| WA, Northwest | 75 | 75 | 75 | 75 | 75 | 75 | 75 |

Now there are four unique tag value combinations that appear in the `temperature` data. Therefore, the total number of custom metrics from the `temperature` metric tagged with `state` and `region` is four. 

### Counting custom metrics from distributions  
A distribution metric gathers all values across all hosts emitting metric values in ten second flush intervals. Distributions emit a number of custom metrics that is proportional to the number of custom metrics emitted from `gauges`. Distributions generate four timeseries for each unique tag value combination that appears in the data: `sum`, `count`, `min`, and `max` (`avg` is calculated from the sum/count). 

Suppose you are interested in measuring the maximum `age` metric in the state of New York. `age` is submitted to Datadog as a distribution metric tagged with `city` and `state` :

|  | Values in 10s flush interval | Sum | Count | Minimum | Maximum | Average (Sum/Count) |
|---------------|------------------------------|-----|-------|---------|---------|---------------------|
| Rochester, NY | 23,29,33,55,41,36,12,67 | 296 | 8 | 12 | 67 | 37 |
| New York, NY | 18,22,26,31,29,40,23,35 | 215 | 8 | 18 | 40 | 28 |

The total number of custom metrics or timeseries emitted from the `age` distribution metric is **eight (4 x 2)**. For both unique tag value combinations above (Rochester, NY and New York, NY), Datadog stores four timeseries (`sum`,`count`,`min`,`max`, `avg`). 

To obtain the maximum `age` in the state of New York, you can reaggregate the timeseries above: Maximum age in New York = `max`(`max`(Rochester, NY), `max`(New York, NY)) = 67.

#### Distributions with percentile aggregations
After submitting a distribution metric to Datadog, you have the option to add percentile aggregations to a distribution with the Distributions UI in-app. Distributions with percentile aggregations are counted differently compared to the metric types listed above since percentiles are not mathematically reaggregatable.

Suppose you are interested in measuring the *median* `age` in the state of New York where the `age` distribution metric is tagged with `city` and `state`. 

|  | Values in 10s flush interval | Sum | Count | Min | Max | Avg | p50 | p75 | p90 | p95 | p99 |
|---------------|------------------------------|-----|-------|-----|-----|-----|-----|-----|-----|-----|-----|
| Rochester, NY | 23,33,55,41,36,12,66 | 266 | 7 | 12 | 66 | 38 | 23 | 55 | 66 | 66 | 66 |
| New York, NY | 18,26,31,29,40,23,36 | 203 | 7 | 18 | 40 | 29 | 29 | 36 | 40 | 40 | 40 | 

Percentiles are NOT reaggregatable -- you can't reaggregate the same way maximum ages were above. The median age in New York is not equal to the `median`(`median`(Rochester, NY), `median`(New York, NY)). 

Therefore, Datadog needs to precalculate five timeseries (`p50`,`p75`,`p90`,`p95`,`p99`) for each potentially queryable tag value combination. In the New York example, you have the following potentially queryable tag value combinations: 
 * Rochester, (`null` state)
 * New York, (`null` state)
 * (`Null` city), NY
 * Rochester, NY
 * New York, NY
 * (`Null` city), (`null` state) -- equivalent to * {all time series}

There are three potentially queryable values for the `city` tag: {Rochester, New York, `null`} and two values for the `state` tag: {NY, `null`}.

The total number of custom metrics emitted from the `age` distribution metric WITH percentile aggregations is:

{{< img src="developers/metrics/custom_metrics/38-timeseries.png" alt="[4 x (2)] + [5 x ((3) x (2))] = 38 timeseries." responsive="true" style="width:70%;">}}

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
[4]: /account_management/billing/custom_metrics/#standard-integrations
[5]: /api/#rate-limiting
[6]: https://app.datadoghq.com/account/usage/hourly
[7]: https://app.datadoghq.com/metric/summary
[8]: https://docs.datadoghq.com/developers/metrics/gauges
