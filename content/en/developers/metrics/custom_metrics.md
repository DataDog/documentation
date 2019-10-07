---
title: Custom Metrics
kind: documentation
aliases:
  - /getting_started/custom_metrics
---

## Overview

If a metric is not submitted from one of the [350+ Datadog integrations][1] it's considered a custom metric. **Note**: Some standard integrations [emit custom metrics][2].

A custom metric refers to a single, unique combination of a metric name, host, and any tags. In general, any metric you send using StatsD, [DogStatsD][3], or through extensions made to the [Datadog Agent][4] is a custom metric.

There are no enforced [fixed rate limits][5] on custom metric submission. If your default allotment is exceeded, you are billed according to [Datadog's billing policy for custom metrics][6].

## Allocation

You are allocated a certain number of custom metrics based on your Datadog pricing plan:

* **Pro**: 100 custom metrics per host
* **Enterprise**: 200 custom metrics per host

These allocations are counted across your entire infrastructure. For example, if you are on the Pro plan and licensed for three hosts, 300 custom metrics are allocated. The 300 custom metrics can be divided equally across each host, or all 300 metrics could be used by a single host.

Using this example, the graphic below shows scenarios that do not exceed the allocated custom metric count:

{{< img src="developers/metrics/custom_metrics/Custom_Metrics_300.jpg" alt="Custom_Metrics_300" responsive="true" style="width:80%;">}}

There are no enforced [fixed rate limits][5] on custom metric submission. If your default allotment is exceeded, you are billed according to [Datadog's billing policy for custom metrics][6].

## Tracking

Administrative users can see the total custom metrics per hour and the top 500 custom metrics by cardinality for their account on the [usage details page][7]. See the [Usage Details][8] documentation for more information.

## Counting

Using tags on custom metrics can lead to **multiple unique tag combinations** that affect your custom metrics allocation. The examples below show how custom metrics are counted.

### Single host

This example assumes you are submitting a custom metric on a single host.

* You submit the metric named: `auth.exceptionCount`
* Your code instrumentation submits the following possible tags associated with the metric: `method:X`, `method:Y`, `exception:A`, `exception:B`.
* The logic behind your metric tagging is:

    {{< img src="developers/metrics/custom_metrics/custom_metric_1.png" alt="custom_metric_1" responsive="true" >}}

* In this situation, you have 6 different metrics. The unique metrics for a **single host** are:

| Metric                | Tags                      |
|-----------------------|---------------------------|
| `auth.exceptionCount` | `method:X`                |
| `auth.exceptionCount` | `method:Y`                |
| `auth.exceptionCount` | `method:X`, `exception:A` |
| `auth.exceptionCount` | `method:X`, `exception:B` |
| `auth.exceptionCount` | `method:Y`, `exception:A` |
| `auth.exceptionCount` | `method:Y`, `exception:B` |

**Note**: The ordering of tags does not effect the metric count. The following metrics are not unique:

* `auth.exceptionCount` with tags `method:X` and `exception:A`
* `auth.exceptionCount` with tags `exception:A` and `method:X`

### Multiple hosts

When submitting custom metrics, host tags are automatically added to the metric as one unique tag combination. Reporting the custom metric from additional hosts creates multiple unique tag combinations.

For example, you want insight on `request.count` from different services across your infrastructure.

* You create the metric `service.request.count`.
* You want to track successes and failures, so you create the tags:
    * `status:success`
    * `status:failure`
* You want to track the metric by each service running on your infrastructure. You have three services per host:
    * `service:database`
    * `service:api`
    * `service:webserver`
* The logic behind your metric is:

    {{< img src="developers/metrics/custom_metrics/logic_metric.png" alt="logic_metric" responsive="true" style="width:80%;">}}
* If all services report both statuses, you have 1 x 2 x 3 = 6 custom metrics **per host**.

There are less custom metrics if only a subset of services and statuses are reporting. For example, you have three hosts:

* `host1` is reporting all possible configurations.
* `host2` is reporting only successes across all services.
* `host3` is reporting successes and failures for database and webserver services.

Across your three hosts, there are 13 distinct metrics:

{{< img src="developers/metrics/custom_metrics/metric_count.png" alt="metric_count" responsive="true" style="width:75%;">}}

#### Metric summary

If you are an administrator, you can see your total custom metrics per hour as well as the top 500 custom metrics by cardinality in your account in [the usage details page][7]. You can also see this metric count on your [metric summary page][9], where you'd see, clicking on the `service.request.count` metric, the exact number of unique tag combinations:

Your [metric summary page][9] shows the number of distinct metrics for a specific metric. For example, `service.request.count` with 1 host, 2 statuses, and 3 services = **6 distinct metrics**:

{{< img src="developers/metrics/custom_metrics/metric_summary.png" alt="metric_summary" responsive="true" style="width:80%;">}}

Adding a second host with 3 services and 1 status = **9 distinct metrics**:

{{< img src="developers/metrics/custom_metrics/metric_summary_2.png" alt="metric_summary_2" responsive="true" style="width:80%;">}}

Adding a third host with 2 services and 2 status = **13 distinct metrics**:

{{< img src="developers/metrics/custom_metrics/metric_summary_3.png" alt="metric_summary_3" responsive="true" style="width:80%;">}}

#### Query editor

You can count your custom metrics by using the `count:` aggregator in the query editor. For counting the previous example, the query `count:service.request.count{*}` is used:

{{< img src="developers/metrics/custom_metrics/metric_aggregator.png" alt="metric_aggregator" responsive="true" style="width:80%;">}}

{{< img src="developers/metrics/custom_metrics/count_of_metrics.png" alt="count_of_metrics" responsive="true" style="width:80%;">}}

### Gauges, counts, histograms, and rates

A [GAUGE][10] represents one value per second (examples: temperature or Kafka queue offset).

Suppose you are interested in measuring the average `temperature` in the state of Florida. `temperature` is stored as a `GAUGE` metric type in Datadog. You collect the following temperature measurements every 10 seconds during the past minute from Orlando, Miami, Boston, New York, and Seattle, each tagged with information about the `city`, `state`, `region`, and `country`.

| Tags                         | Temp 1 | Temp 2 | Temp 3 | Temp 4 | Temp 5 | Temp 6 | Temp 7 |
|------------------------------|--------|--------|--------|--------|--------|--------|--------|
| Orlando, FL, Southeast, USA  | 80     | 80     | 80     | 80     | 81     | 81     | 81     |
| Miami, FL, Southeast, USA    | 82     | 82     | 82     | 82     | 82     | 82     | 82     |
| Boston, MA, Northeast, USA   | 78     | 78     | 78     | 78     | 78     | 79     | 79     |
| New York, NY, Northeast, USA | 79     | 79     | 79     | 79     | 79     | 79     | 79     |
| Seattle, WA, Northwest, USA  | 75     | 75     | 75     | 75     | 75     | 75     | 75     |

The total number of custom metrics associated with the `temperature` metric is five. Each unique tag combination of `city`, `state`, `region`, and `country` represents a custom metric:

| Metric        | Tags                                                           |
|---------------|----------------------------------------------------------------|
| `temperature` | `city:orlando`, `state:fl`, `region:southeast`, `country:usa`  |
| `temperature` | `city:miami`, `state:fl`, `region:southeast`, `country:usa`    |
| `temperature` | `city:boston`, `state:ma`, `region:northeast`, `country:usa`   |
| `temperature` | `city:new_york`, `state:ny`, `region:northeast`, `country:usa` |
| `temperature` | `city:seattle`, `state:wa`, `region:northwest`, `country:usa`  |

Using the five timeseries above, you can determine the average `temperature` in the US, Northeast, or Florida at query time.

**Note**: The same scheme for counting custom metrics is applied to `count`, `histogram` and `rate` metric types.

#### Dropping tags

Suppose you want to drop the `country` tag from the GAUGE `temperature` metric.

| Tags                    | Temp 1 | Temp 2 | Temp 3 | Temp 4 | Temp 5 | Temp 6 | Temp 7 |
|-------------------------|--------|--------|--------|--------|--------|--------|--------|
| Orlando, FL, Southeast  | 80     | 80     | 80     | 80     | 81     | 81     | 81     |
| Miami, FL, Southeast    | 82     | 82     | 82     | 82     | 82     | 82     | 82     |
| Boston, MA, Northeast   | 78     | 78     | 78     | 78     | 78     | 79     | 79     |
| New York, NY, Northeast | 79     | 79     | 79     | 79     | 79     | 79     | 79     |
| Seattle, WA, Northwest  | 75     | 75     | 75     | 75     | 75     | 75     | 75     |


Even though there are five cities, four states, three regions, and one country, there are still five unique tag value combinations of `city`, `state`, `region`, and `country` that appear in the data. The total number of custom metrics emitted from the `temperature` metric is still five.

Suppose you drop the `city` tag from the GAUGE `temperature` metric.

| Tags          | Temp 1 | Temp 2 | Temp 3 | Temp 4 | Temp 5 | Temp 6 | Temp 7 |
|---------------|--------|--------|--------|--------|--------|--------|--------|
| FL, Southeast | 81     | 81     | 81     | 81     | 81.5   | 81.5   | 81.5   |
| MA, Northeast | 78     | 78     | 78     | 78     | 78     | 79     | 79     |
| NY, Northeast | 79     | 79     | 79     | 79     | 79     | 79     | 79     |
| WA, Northwest | 75     | 75     | 75     | 75     | 75     | 75     | 75     |

Now there are four unique tag value combinations that appear in the `temperature` data. Therefore, the total number of custom metrics from the `temperature` metric tagged with `state` and `region` is four.

### Distributions

A distribution metric gathers all values across all hosts emitting metric values in ten-second flush intervals. Distributions emit a number of custom metrics that is proportional to the number of custom metrics emitted from GAUGE. Distributions generate five timeseries for each unique tag value combination that appears in the data: `sum`, `count`, `min`, and `max` (`avg` is calculated from the sum/count).

Suppose you are interested in measuring the maximum `age` metric in the state of New York. `age` is submitted to Datadog as a distribution metric tagged with `city` and `state` :

| Tags          | Values in 10s flush interval | Sum | Count | Minimum | Maximum | Average (Sum/Count) |
|---------------|------------------------------|-----|-------|---------|---------|---------------------|
| Rochester, NY | 23,29,33,55,41,36,12,67      | 296 | 8     | 12      | 67      | 37                  |
| New York, NY  | 18,22,26,31,29,40,23,35      | 215 | 8     | 18      | 40      | 28                  |

The total number of custom metrics or timeseries emitted from the `age` distribution metric is **ten (5 x 2)**. For both unique tag value combinations above (Rochester, NY and New York, NY), Datadog stores five timeseries (`sum`,`count`,`min`,`max`, `avg`).


To obtain the maximum `age` in the state of New York, you can reaggregate the timeseries above: Maximum age in New York = `max`(`max`(Rochester, NY), `max`(New York, NY)) = 67.

#### Distributions with percentile aggregations

After submitting a distribution metric to Datadog, you have the option to add percentile aggregations to a distribution with the Distributions UI in-app. Distributions with percentile aggregations are counted differently compared to the metric types listed above since percentiles are not mathematically reaggregatable.

Suppose you are interested in measuring the *median* `age` in the state of New York where the `age` distribution metric is tagged with `city` and `state`.

| Tags          | Values in 10s flush interval | Sum | Count | Min | Max | Avg | p50 | p75 | p90 | p95 | p99 |
|---------------|------------------------------|-----|-------|-----|-----|-----|-----|-----|-----|-----|-----|
| Rochester, NY | 23,33,55,41,36,12,66         | 266 | 7     | 12  | 66  | 38  | 36  | 55  | 66  | 66  | 66  |
| New York, NY  | 18,26,31,29,40,23,36         | 203 | 7     | 18  | 40  | 29  | 29  | 36  | 40  | 40  | 40  |

Percentiles are NOT reaggregatable—you can't reaggregate the same way maximum ages were above. The median age in New York is not equal to the `median`(`median`(Rochester, NY), `median`(New York, NY)).

Therefore, Datadog needs to precalculate five timeseries (`p50`,`p75`,`p90`,`p95`,`p99`) for each potentially queryable tag value combination. In the New York example, you have the following potentially queryable tag value combinations for the `city` and `state` tags:

| `city` tag | `state` tag |
|------------|-------------|
| Rochester  | `null`      |
| Rochester  | NY          |
| New York   | `null`      |
| New York   | NY          |
| `null`     | NY          |
| `null`     | `null`      |

There are three potentially queryable values for the `city` tag: {Rochester, New York, `null`} and two values for the `state` tag: {NY, `null`}. The total number of custom metrics emitted from the `age` distribution metric WITH percentile aggregations is:

{{< img src="developers/metrics/custom_metrics/38-timeseries.png" alt="[4 x (2)] + [5 x ((3) x (2))] = 38 timeseries." responsive="true" style="width:70%;">}}

[1]: /integrations
[2]: /account_management/billing/custom_metrics/#standard-integrations
[3]: /developers/metrics/dogstatsd_metrics_submission
[4]: /agent
[5]: /api/#rate-limiting
[6]: /account_management/billing/custom_metrics
[7]: https://app.datadoghq.com/account/usage/hourly
[8]: /account_management/billing/usage_details
[9]: https://app.datadoghq.com/metric/summary
[10]: /developers/metrics/gauges
