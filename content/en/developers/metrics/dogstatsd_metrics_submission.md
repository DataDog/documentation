---
title: Metric submission with DogStatsD
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
aliases:
  - /developers/faq/reduce-submission-rate
  - /developers/faq/why-is-my-counter-metric-showing-decimal-values
  - /developers/faq/dog-statsd-sample-rate-parameter-explained
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Introduction to DogStatsD"
- link: "developers/metrics/metric_type"
  tag: "Documentation"
  text: "Discover Datadog metric types."
---

While StatsD accepts only metrics, DogStatsD accepts all three of the major Datadog data types: metrics, events, and Service Checks. This section shows typical use cases for Metrics split down by metric types, and introduces [Sampling Rate](#sample-rates) and [Metrics tagging](#metrics-tagging) options which are specific to DogStatsD.

[Count](#count), [Gauge](#gauge), and [Set](#set) metric types are familiar to StatsD users. Histograms are specific to DogStatsD. Timers, which exist in StatsD, are a sub-set of histograms in DogStatsD. Additionally you can also submit [Rate](#rate) and [Distribution](#distribution) metric types using DogStatsD.

**Note**: Depending of the submission method used, the submission metric type and the actual metric type stored within Datadog might differ:

After having [installed DogStatsD][1], find below the functions available to submit your metrics to Datadog depending of their metric type.

## Count

| Method | Description | Storage type |
| :----- | :------- | :--- |
| `increment(MetricName, SampleRate, Tags)` | Used to increment a count metric. | Stored as a `RATE` type in Datadog. Each value in the stored timeseries is a time-normalized delta of the counter's value over that StatsD flush period.|
| `decrement(MetricName, SampleRate, Tags)` | Used to decrement a count metric. | Stored as a `RATE` type in Datadog. Each value in the stored timeseries is a time-normalized delta of the counter's value over that StatsD flush period.|
| `count(MetricName, Value, SampleRate, Tags)` | Use to increment a count metric from an arbitrary `Value` | Stored as a `RATE` type in Datadog. Each value in the stored timeseries is a time-normalized delta of the counter's value over that StatsD flush period.  |


Note: Count type metrics can show a decimal value within Datadog since they are normalized over the flush interval to report a per-second units.

{{< tabs >}}
{{% tab "Python" %}}

```python
statsd.increment('fuction.called')
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
def upload_file()
  # (...)
  statsd.increment('web.page_views')
end
```

{{% /tab %}}
{{% tab "Go" %}}


{{% /tab %}}
{{% tab "Java" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}

With this one line of code, the data is available to graph in Datadog. Here's an example:

{{< img src="developers/metrics/dogstatsd_metrics_submission/graph-guides-metrics-page-views.png" alt="graph guides metrics page views" responsive="true" >}}

Note that StatsD counters are normalized over the flush interval to report per-second units. In the graph above, the marker is reporting 35.33 web page views per second at ~15:24. In contrast, if one person visited the web page each second, the graph would be a flat line at y = 1. To increment or measure values over time, see [gauges](#gauges).

Note that for counters coming from another source that are ever-increasing and never reset (for example, the number of queries from MySQL over time), Datadog tracks the rate between flushed values. To get raw counts within Datadog, apply a function to your series such as _cumulative sum_ or _integral_. [Read more about Datadog functions][3].

Learn more about the [Count type in the Metrics documentation][4].

## Gauge

| Method | Datadog Storage type |
| :----- | :------- |
|gauge(MetricName, Value, SampleRate, Tags)|Stored as a `GAUGE` type in Datadog. Each value in the stored timeseries is the last gauge value submitted for that metric during the StatsD flush period.|

Gauges measure the value of a particular thing over time. For example, in order to track the amount of free memory on a machine, periodically sample that value as the metric `system.mem.free`:

{{< tabs >}}
{{% tab "Python" %}}

```python

# Record the amount of free memory every ten seconds.
while True:
    statsd.gauge('system.mem.free', get_free_memory())
    time.sleep(10)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
# Record the amount of free memory every ten seconds.
while true do
    statsd.gauge('system.mem.free', get_free_memory())
    sleep(10)
end
```

{{% /tab %}}
{{% tab "Go" %}}


{{% /tab %}}
{{% tab "Java" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}

Learn more about the [Gauge type in the Metrics documentation][4].

## Set

|Method | Datadog Storage type |
|:---|:---|
|set(MetricName, Value, SampleRate, Tags)|Stored as `GAUGE` type in Datadog. Each value in the stored timeseries is the count of unique values submitted to StatsD for a metric over that flush period.</li></ul>|

Sets are used to count the number of unique elements in a group, for example, the number of unique visitors to your site:

{{< tabs >}}
{{% tab "Python" %}}

```python

def login(self, user_id):
    # Log the user in ...
    statsd.set('users.uniques', user_id)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
def login(self, user_id)
    # Log the user in ...
    statsd.set('users.uniques', user_id)
end
```

{{% /tab %}}
{{% tab "Go" %}}


{{% /tab %}}
{{% tab "Java" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}

Learn more about the [Sets type in the Metrics documentation][4].

## Rate


{{< tabs >}}
{{% tab "Python" %}}

{{% /tab %}}
{{% tab "Ruby" %}}

{{% /tab %}}
{{% tab "Go" %}}


{{% /tab %}}
{{% tab "Java" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}


## Histogram


| Method             | Datadog Storage type                                                                                  |
| :---               | :---                                                                                      |
| histogram(MetricName, Value, SampleRate, Tags) | Used to track the statistical distribution of a set of values over a StatsD flush period. |

Histograms are specific to DogStatsD. They calculate the statistical distribution of any kind of value, such as timing data, for example, the duration of a metrics query:

{{< tabs >}}
{{% tab "Python" %}}

```python

# Track the run time of the database query.
start_time = time.time()
results = db.query()
duration = time.time() - start_time
statsd.histogram('database.query.time', duration)

# The `timed` decorator is a short-hand for timing functions.
@statsd.timed('database.query.time')
def get_data():
    return db.query()
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
start_time = Time.now
results = db.query()
duration = Time.now - start_time
statsd.histogram('database.query.time', duration)

# The `time` helper is a short-hand for timing blocks of code.
statsd.time('database.query.time') do
  return db.query()
end
```

{{% /tab %}}
{{% tab "Go" %}}


{{% /tab %}}
{{% tab "Java" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}

The above instrumentation produces the following metrics:

| Metric                               | Description                               |
| ------------------------------------ | ----------------------------------------- |
| `database.query.time.count`          | number of times this metric was sampled   |
| `database.query.time.avg`            | average time of the sampled values        |
| `database.query.time.median`         | median sampled value                      |
| `database.query.time.max`            | maximum sampled value                     |
| `database.query.time.95percentile`   | 95th percentile sampled value             |

{{< img src="developers/metrics/dogstatsd_metrics_submission/graph-guides-metrics-query-times.png" alt="graph guides metrics query times" responsive="true" >}}

In this example, let's say that a query time of 1 second is acceptable. The median query time (graphed in purple) is usually less than 100 milliseconds, which is great. Unfortunately, the 95th percentile (graphed in blue) has large spikes sometimes nearing three seconds, which is unacceptable. This means that most of queries are running just fine, but the worst ones are very bad. If the 95th percentile was close to the median, then you would know that almost all of the queries are performing just fine.

Learn more about the [Histogram type in the Metrics documentation][4].

## Distribution

**This feature is in BETA. [Contact Datadog support][5] for details on how to have it enabled for your account.**

| Method | Datadog Storage type |
| :----- | :------- |
| `distribution(MetricName, Value, Tags)` | Track the statistical distribution of a set of values over one or more hosts. |

Distributions are like a global version of Histograms (see below). They calculate statistical distributions across multiple hosts, allowing you to compute global percentiles across your entire dataset. Global distributions are designed to instrument logical objects, such as services, independently from the underlying hosts.

To measure the duration of an HTTP request, you could measure each request time with the metric `dist.dd.dogweb.latency`:

{{< tabs >}}
{{% tab "Python" %}}

```python
# Track the run time of a request.
start_time = time.time()
results = requests.get('https://google.com')
duration = time.time() - start_time
statsd.distribution('dist.dd.website.latency', duration)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
start_time = Time.now
results = Net::HTTP.get('https://google.com')
duration = Time.now - start_time
statsd.distribution('dist.dd.website.latency', duration)
```

{{% /tab %}}
{{% tab "Go" %}}


{{% /tab %}}
{{% tab "Java" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}

The above instrumentation calculates the following data: `sum`, `count`, `average`, `minimum`, `maximum`, `50th percentile` (median), `75th percentile`, `90th percentile`, `95th percentile` and `99th percentile`. These metrics give insight into how different each request time is. Graph the median to see how long the request usually takes. Graph the 95th percentile to see how long most requests take.

{{< img src="graphing/metrics/distributions/dogweb_latency.png" alt="Dogweb latency" responsive="true" >}}

For this toy example, assume a request time of *500ms* is acceptable. The median query time (graphed in blue) is usually less than *100 milliseconds*, which is great. The 95th percentile (graphed in red) has spikes sometimes over one second, which is unacceptable.
This means most of queries are running just fine, but the worst ones are bad. If the 95th percentile were close to the median, than you would know that almost all of the requests are performing just fine.

Distributions are not only for measuring times. They can be used to measure the distribution of *any* type of value, such as the size of uploaded files, or classroom test scores, for example.


## Metric Submission options

### Sample rates

Since the overhead of sending UDP packets can be too great for some performance intensive code paths, DogStatsD clients support sampling, i.e. only sending metrics a percentage of the time.
It's not useful in all cases, but can be interesting if you sample many metrics, and your DogStatsD client is not on the same host as the DogStatsD server. This is a trade off: you decrease traffic but slightly lose in precision/granularity.

Before sending the metric to Datadog, DogStatsD uses the `sample_rate` to correct the metric value depending of the metric type, i.e. to estimate what it would have been without sampling:

| Metric Type | Sample rate correction |
| `Count` | Values received are multiplied by (1/sample_rate), because it's reasonable to suppose in most cases that for 1 datapoint received, `1/sample_rate` were actually sampled with the same value. |
| `Gauge` | No correction. The value received is kept as it is. |
| `Set` | Bo correction. The value received is kept as it is. |
| `Histogram` | The `histogram.count` statistic is a counter metric, and receives the correction outlined above. Other statistics are gauge metrics and aren't "corrected." |

See the [Datadog Agent aggregation code](https://github.com/DataDog/dd-agent/blob/master/aggregator.py) to learn more about this behavior.

The following code only sends points half of the time:


{{< tabs >}}
{{% tab "Python" %}}

```python
while True:
  do_something_intense()
  statsd.increment('loop.count', sample_rate=0.5)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
while true do
  do_something_intense()
  statsd.increment('loop.count', :sample_rate => 0.5)
end
```

{{% /tab %}}
{{% tab "Go" %}}


{{% /tab %}}
{{% tab "Java" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}

### Metrics Tagging

Add tags to any metric you send to DogStatsD. For example, compare the performance of two algorithms by tagging a timer metric with the algorithm version:


{{< tabs >}}
{{% tab "Python" %}}

```python

@statsd.timed('algorithm.run_time'x)
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```

{{% /tab %}}
{{% tab "Ruby" %}}

{{% /tab %}}
{{% tab "Go" %}}


{{% /tab %}}
{{% tab "Java" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}

#### Host tag key

The host tag is assigned automatically by the Datadog Agent aggregating the metrics. Metrics submitted with a host tag not matching the Agent hostname lose reference to the original host. The host tag submitted overrides any hostname collected by or configured in the Agent.

**Note**: Because of the global nature of Distributions, extra tools for tagging are provided. See the [Distribution Metrics][6] page for more details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /developers/dogstatsd
[2]: /developers/metrics
[3]: /graphing/functions/#apply-functions-optional
[4]: /developers/metrics/metrics_type
[5]: /help
[6]: /graphing/metrics/distributions
