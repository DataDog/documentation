---
title: Metric submission with DogStatsD
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
aliases:
  - /developers/faq/reduce-submission-rate
  - /developers/faq/why-is-my-counter-metric-showing-decimal-values
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Introduction to DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community-contributed API and DogStatsD client libraries"
- link: "https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd"
  tag: "GitHub"
  text: "DogStatsD source code"
---

While StatsD accepts only metrics, DogStatsD accepts all three of the major Datadog data types: metrics, events, and Service Checks. This section shows typical use cases for Metrics split down by metric types, and introduces [Sampling Rate](#sample-rates) and [Metrics tagging](#metrics-tagging), which is specific to DogStatsD.

Examples can be found for the official Datadog-DogStatsD client:

* [Datadog-DogStatsD Python client][1]

Feel free to refer to [other DogStatsD client libraries][2] if the official clients don't support your use-case.


[Count](#count), [Gauge](#gauge), and [Set](#set) metric types are familiar to StatsD users. Histograms are specific to DogStatsD. Timers, which exist in StatsD, are a sub-set of histograms in DogStatsD. Additionally you can also submit [Rate](#rate) and [Distribution](#distribution) metric types using DogStatsD.

**Note**: Depending of the submission method used, the submission metric type and the actual metric type stored within Datadog might differ:

## Count

| Method | Overview |
| :----- | :------- |
| dog.increment(...) | Used to increment a counter of events: <ul><li>Stored as a RATE type in the Datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value over that StatsD flush period.</li></ul> |
| dog.decrement(...) | Used to decrement a counter of events: <ul><li>Stored as a RATE type in the Datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value over that StatsD flush period.</li></ul> |


Note: StatsD counters can show a decimal value within Datadog since they are normalized over the flush interval to report a per-second units. [Read more about Datadog metrics types][3].

Counters track how many times something happens _per second_, such as page views. Arbitrary numbers can also be counted. Suppose you wanted to count the number of bytes processed by a file uploading service.

{{< tabs >}}
{{% tab "Python" %}}

```python

def upload_file(file):
    statsd.increment('file_service.bytes_uploaded', file.size())
    save_file(file)
    return 'File uploaded!'
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
def render_page()
  # Render a web page.
  statsd.increment('web.page_views')
  return 'Hello World!'
end
```

{{% /tab %}}
{{% tab "Go" %}}


{{% /tab %}}
{{% tab "Java" %}}

{{% /tab %}}
{{% tab "Node.js" %}}

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

Note that for counters coming from another source that are ever-increasing and never reset (for example, the number of queries from MySQL over time), Datadog tracks the rate between flushed values. To get raw counts within Datadog, apply a function to your series such as _cumulative sum_ or _integral_. [Read more about Datadog functions][4].

Learn more about the [Count type in the Metrics documentation][5].

## Gauge

|Method | Overview |
|:---|:---|
|dog.gauge(...)|Stored as a GAUGE type in the Datadog web application. Each value in the stored timeseries is the last gauge value submitted for that metric during the StatsD flush period.|

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
{{% tab "Node.js" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}

Learn more about the [Gauge type in the Metrics documentation][5].

## Set

|Method | Overview |
|:---|:---|
|dog.set(...)|Used count the number of unique elements in a group:<ul><li>Stored as GAUGE type in the Datadog web application. Each value in the stored timeseries is the count of unique values submitted to StatsD for a metric over that flush period.</li></ul>|

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
{{% tab "Node.js" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}

Learn more about the [Sets type in the Metrics documentation][5].

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
{{% tab "Node.js" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}


## Histogram


| Method             | Overview                                                                                  |
| :---               | :---                                                                                      |
| dog.histogram(...) | Used to track the statistical distribution of a set of values over a StatsD flush period. |

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
{{% tab "Node.js" %}}

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

Learn more about the [Histogram type in the Metrics documentation][5].

## Distribution

**This feature is in BETA. [Contact Datadog support][6] for details on how to have it enabled for your account.**

| Method | Overview |
| :----- | :------- |
| `dog.distribution(String metric.name, double value, String... tags)` | Track the statistical distribution of a set of values over one or more hosts. |

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
{{% tab "Node.js" %}}

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

Before sending the metric to Datadog, DogStatsD uses the `sample_rate` to correct the metric value, i.e. to estimate what it would have been without sampling.

**Note**: **Sample rates only work with counter, histogram, and timer metrics.**

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
{{% tab "Node.js" %}}

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
{{% tab "Node.js" %}}

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

**Note**: Because of the global nature of Distributions, extra tools for tagging are provided. See the [Distribution Metrics][7] page for more details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: http://datadogpy.readthedocs.io/en/latest
[2]: /libraries
[3]: /developers/metrics
[4]: /graphing/functions/#apply-functions-optional
[5]: /developers/metrics/metrics_type
[6]: /help
[7]: /graphing/metrics/distributions
