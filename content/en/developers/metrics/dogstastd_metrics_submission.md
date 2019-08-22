---
title: Metric submission with DogStatsD
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
aliases:
  - /guides/dogstatsd/
  - /guides/DogStatsD/
  - /developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
  - /developers/dogstatsd/
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

The easiest way to get your custom application metrics into Datadog is to send them to DogStatsD, a metrics aggregation service bundled with the Datadog Agent. DogStatsD implements the [StatsD][1] protocol and adds a few Datadog-specific extensions:

* Histogram metric type
* Service Checks and Events
* Tagging

Any compliant StatsD client will work, but you won't be able to use the [Datadog-specific extensions](#dive-into-dogstatsd).

**Note**: DogStatsD does NOT implement the following from StatsD:

* Gauge deltas (see [this issue][2])
* Timers as a native metric type (though it [does support them via histograms][3])

## How it works

DogStatsD accepts [custom metrics][4], events, and service Checks over UDP and periodically aggregates and forwards them to Datadog.
Because it uses UDP, your application can send metrics to DogStatsD and resume its work without waiting for a response. If DogStatsD ever becomes unavailable, your application won't skip a beat.

{{< img src="developers/metrics/dogstastd_metrics_submission/dogstatsd.png" alt="dogstatsd"  responsive="true" >}}

As it receives data, DogStatsD aggregates multiple data points for each unique metric into a single data point over a period of time called the flush interval. Consider the following example, wherein DogStatsD is instructed to increment a counter each time a given database query is called:

```python

def query_my_database():
    dog.increment('database.query.count')
    # Run the query ...
```

If this function executes one hundred times during a flush interval (ten seconds, by default), it sends DogStatsD one hundred UDP packets that say "increment the counter `database.query.count`". DogStatsD aggregates these points into a single metric value (100, in this case) and sends it to Datadog where it is stored and available for graphing alongside the rest of your metrics.

## Setup

### Agent

First, edit your `datadog.yaml` file to uncomment the following lines:
```
use_dogstatsd: true

...

dogstatsd_port: 8125
```

Then [restart your Agent][5].

By default, DogStatsD listens on UDP port **8125**. If you need to change this, configure the `dogstatsd_port` option in the main [Agent configuration file][6], and restart the client. You can also configure DogStatsD to use a [Unix Domain Socket][7].

### Code

There are [DogStatsD client libraries][8] for many languages and environments. You _can_ use any generic StatsD client to send metrics to DogStatsD, but you won't be able to use any of the Datadog-specific features mentioned above.

{{< tabs >}}
{{% tab "Python" %}}

First install the Datadog python DogStatsD library:

```shell
$ pip install datadog
```

And import it, so it's ready to use:

For Python:
```python
from datadog import statsd
```

{{% /tab %}}
{{% tab "Ruby" %}}

First install the Datadog ruby DogStatsD library:

```shell
$ gem install dogstatsd-ruby
```

And import it, so it's ready to use:

```ruby
# Import the library
require 'datadog/statsd'

# Create a DogStatsD client instance.
statsd = Datadog::Statsd.new
```

{{% /tab %}}
{{< /tabs >}}

## Dive into DogStatsD

DogStatsD and StatsD are broadly similar, however, DogStatsD implements some things differently, and contains advanced features which are specific to Datadog. See the [data types and tags][9] section to learn more about the Datadog-specific extensions to DogStatsD, including available data types, events, service Checks, and tags.

If you're interested in learning more about the datagram format used by DogStatsD, or want to develop your own Datadog library, see the [datagram and shell usage][10] section, which also explains how to send metrics and events straight from the command line.


## Metrics submission

While StatsD accepts only metrics, DogStatsD accepts all three of the major Datadog data types: metrics, events, and service checks. This section shows typical use cases for each type, and introduces tagging, which is specific to DogStatsD.

Each example is in Python using the [official Datadog Python client][11], but each data type shown is supported similarly in [other DogStatsD client libraries][12].

Counters, gauges, and sets are familiar to StatsD users. Histograms are specific to DogStatsD. Timers, which exist in StatsD, are a sub-set of histograms in DogStatsD.


{{< tabs >}}
{{% tab "Count" %}}

| Method | Overview |
| :----- | :------- |
| dog.increment(...) | Used to increment a counter of events: <ul><li>Stored as a RATE type in the Datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value over that StatsD flush period.</li></ul> |
| dog.decrement(...) | Used to decrement a counter of events: <ul><li>Stored as a RATE type in the Datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value over that StatsD flush period.</li></ul> |

Note: Since StatsD counters can show a decimal value within Datadog since they are normalized over the flush interval to report a per-second units. [Read more about Datadog metrics types][1].


[1]: /developers/metrics
{{% /tab %}}
{{% tab "Gauge" %}}

|Method | Overview |
|:---|:---|
|dog.gauge(...)|Stored as a GAUGE type in the Datadog web application. Each value in the stored timeseries is the last gauge value submitted for that metric during the StatsD flush period.|

{{% /tab %}}

{{% tab "Set" %}}

|Method | Overview |
|:---|:---|
|dog.set(...)|Used count the number of unique elements in a group:<ul><li>Stored as GAUGE type in the Datadog web application. Each value in the stored timeseries is the count of unique values submitted to StatsD for a metric over that flush period.</li></ul>|

{{% /tab %}}
{{% tab "Rate" %}}

TOTO

{{% /tab %}}

{{% tab "Histogram" %}}

| Method             | Overview                                                                                  |
| :---               | :---                                                                                      |
| dog.histogram(...) | Used to track the statistical distribution of a set of values over a StatsD flush period. |

{{% /tab %}}

{{% tab "Distribution" %}}

| Method | Overview |
| :----- | :------- |
| `dog.distribution(String metric.name, double value, String... tags)` | Track the statistical distribution of a set of values over one or more hosts. |

{{% /tab %}}

{{< /tabs >}}

## Examples

{{< tabs >}}
{{% tab "Counter" %}}

Counters track how many times something happens _per second_, such as page views. In this example, a metric called `web.page_views` is incremented each time the `render_page` function is called.

For Python:
```python

def render_page():
    """ Render a web page. """
    statsd.increment('web.page_views')
    return 'Hello World!'
```

For Ruby:
```ruby
def render_page()
  # Render a web page.
  statsd.increment('web.page_views')
  return 'Hello World!'
end
```

With this one line of code, the data is available to graph in Datadog. Here's an example:

{{< img src="developers/metrics/dogstastd_metrics_submission/graph-guides-metrics-page-views.png" alt="graph guides metrics page views" responsive="true" >}}

Note that StatsD counters are normalized over the flush interval to report per-second units. In the graph above, the marker is reporting 35.33 web page views per second at ~15:24. In contrast, if one person visited the web page each second, the graph would be a flat line at y = 1. To increment or measure values over time, see [gauges](#gauges).

Arbitrary numbers can also be counted. Suppose you wanted to count the number of bytes processed by a file uploading service. Increment a metric called `file_service.bytes_uploaded` by the size of the file each time the  `upload_file` function is called:

For Python:
```python

def upload_file(file):
    statsd.increment('file_service.bytes_uploaded', file.size())
    save_file(file)
    return 'File uploaded!'
```

Note that for counters coming from another source that are ever-increasing and never reset (for example, the number of queries from MySQL over time), Datadog tracks the rate between flushed values. To get raw counts within Datadog, apply a function to your series such as _cumulative sum_ or _integral_. [Read more about Datadog functions][1].

Learn more about the [Count type in the Metrics documentation][2].

[1]: /graphing/functions/#apply-functions-optional
[2]: /developers/metrics/metrics_type
{{% /tab %}}
{{% tab "Distribution" %}}

**This feature is in BETA. [Contact Datadog support][1] for details on how to have it enabled for your account.**

Distributions are like a global version of Histograms (see below). They calculate statistical distributions across multiple hosts, allowing you to compute global percentiles across your entire dataset. Global distributions are designed to instrument logical objects, such as services, independently from the underlying hosts.

To measure the duration of an HTTP request, you could measure each request time with the metric `dist.dd.dogweb.latency`:

For Python:
```python
# Track the run time of a request.
start_time = time.time()
results = requests.get('https://google.com')
duration = time.time() - start_time
statsd.distribution('dist.dd.website.latency', duration)
```

For Ruby:
```ruby
start_time = Time.now
results = Net::HTTP.get('https://google.com')
duration = Time.now - start_time
statsd.distribution('dist.dd.website.latency', duration)
```

The above instrumentation calculates the following data: `sum`, `count`, `average`, `minimum`, `maximum`, `50th percentile` (median), `75th percentile`, `90th percentile`, `95th percentile` and `99th percentile`. These metrics give insight into how different each request time is. Graph the median to see how long the request usually takes. Graph the 95th percentile to see how long most requests take.

{{< img src="graphing/metrics/distributions/dogweb_latency.png" alt="Dogweb latency" responsive="true" >}}

For this toy example, assume a request time of *500ms* is acceptable. The median query time (graphed in blue) is usually less than *100 milliseconds*, which is great. The 95th percentile (graphed in red) has spikes sometimes over one second, which is unacceptable.
This means most of queries are running just fine, but the worst ones are bad. If the 95th percentile were close to the median, than you would know that almost all of the requests are performing just fine.

Distributions are not only for measuring times. They can be used to measure the distribution of *any* type of value, such as the size of uploaded files, or classroom test scores, for example.

[1]: /help
{{% /tab %}}
{{% tab "Gauge" %}}

Gauges measure the value of a particular thing over time. For example, in order to track the amount of free memory on a machine, periodically sample that value as the metric `system.mem.free`:

For Python:
```python

# Record the amount of free memory every ten seconds.
while True:
    statsd.gauge('system.mem.free', get_free_memory())
    time.sleep(10)
```

For Ruby:
```ruby
# Record the amount of free memory every ten seconds.
while true do
    statsd.gauge('system.mem.free', get_free_memory())
    sleep(10)
end
```

Learn more about the [Gauge type in the Metrics documentation][1].


[1]: /developers/metrics/metrics_type
{{% /tab %}}
{{% tab "Histogram" %}}

Histograms are specific to DogStatsD. They calculate the statistical distribution of any kind of value, such as the size of files uploaded to your site:

```python

from datadog import statsd

def handle_file(file, file_size):
  # Handle the file...

  statsd.histogram('mywebsite.user_uploads.file_size', file_size)
  return
```

Histograms can also be used with timing data, for example, the duration of a metrics query:

For Python:
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

For Ruby:
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

The above instrumentation produces the following metrics:

| Metric                             | Description                             |
|------------------------------------|-----------------------------------------|
| `database.query.time.count`        | number of times this metric was sampled |
| `database.query.time.avg`          | average time of the sampled values      |
| `database.query.time.median`       | median sampled value                    |
| `database.query.time.max`          | maximum sampled value                   |
| `database.query.time.95percentile` | 95th percentile sampled value           |

{{< img src="developers/metrics/dogstastd_metrics_submission/graph-guides-metrics-query-times.png" alt="graph guides metrics query times" responsive="true" >}}

For this toy example, say a query time of 1 second is acceptable. The median query time (graphed in purple) is usually less than 100 milliseconds, which is great. But unfortunately, the 95th percentile (graphed in blue) has large spikes sometimes nearing three seconds, which is unacceptable. This means that most of queries are running just fine, but the worst ones are very bad. If the 95th percentile was close to the median, then you would know that almost all of the queries are performing just fine.

Learn more about the [Histogram type in the Metrics documentation][1].

[1]: /developers/metrics/metrics_type
{{% /tab %}}
{{% tab "Timer" %}}
Timers in DogStatsD are an implementation of Histograms (not to be confused with timers in the standard StatsD). They measure timing data _only_: for example, the amount of time a section of code takes to execute, or how long it takes to fully render a page. In Python, timers are created with a decorator:

```python

from datadog import statsd

@statsd.timed('mywebsite.page_render.time')
def render_page():
  # Render the page...
```

or with a context manager:

```python

from datadog import statsd

def render_page():
  # First some stuff you don't want to time
  boilerplate_setup()

  # Now start the timer
  with statsd.timed('mywebsite.page_render.time'):
    # Render the page...
```

In either case, as DogStatsD receives the timer data, it calculates the statistical distribution of render times and sends the following metrics to Datadog:

- `mywebsite.page_render.time.count` - the number of times the render time was sampled
- `mywebsite.page_render.time.avg` - the average render time
- `mywebsite.page_render.time.median` - the median render time
- `mywebsite.page_render.time.max` - the maximum render time
- `mywebsite.page_render.time.95percentile` - the 95th percentile render time

Remember: under the hood, DogStatsD treats timers as histograms. Whether you use timers or histograms, you'll be sending the same data to Datadog.
{{% /tab %}}
{{% tab "Sets" %}}

Sets are used to count the number of unique elements in a group, for example, the number of unique visitors to your site:

For Python:
```python

def login(self, user_id):
    # Log the user in ...
    statsd.set('users.uniques', user_id)
```

For Ruby:
```ruby
def login(self, user_id)
    # Log the user in ...
    statsd.set('users.uniques', user_id)
end
```

Learn more about the [Sets type in the Metrics documentation][1].

[1]: /developers/metrics/metrics_type
{{% /tab %}}

{{% tab "Distribution" %}}

To measure the duration of an HTTP request, represented by the metric `http_request.time`, use the following python code snippet:

```python
start_time = time.time()
results = requests.get('https://google.com')
duration = time.time() - start_time
statsd.distribution('http_request.time', duration,'env:dev')
```

The above instrumentation calculates the following aggregations: sum, count, average, minimum, and maximum. For percentiles, refer to the [distributions page][1].

[1]: /graphing/metrics/distributions/#customize-tagging
{{% /tab %}}
{{< /tabs >}}

## Metric option: sample rates

--------------------
Each metric point is sent over UDP to the StatsD server. This can incur considerable overhead for performance-intensive code paths. To work around this, StatsD supports sample rates, which allows sending a metric a fraction of the time and scaling up correctly on the server.

The following code only sends points half of the time:

For Python:

```python
while True:
  do_something_intense()
  statsd.increment('loop.count', sample_rate=0.5)
```

For Ruby:

```ruby
while true do
  do_something_intense()
  statsd.increment('loop.count', :sample_rate => 0.5)
end
```
---------------

Since the overhead of sending UDP packets can be too great for some performance intensive code paths, DogStatsD clients support sampling, i.e. only sending metrics a percentage of the time. The following code sends a histogram metric only about half of the time:

```python

dog.histogram('my.histogram', 1, sample_rate=0.5)
```

Before sending the metric to Datadog, DogStatsD uses the `sample_rate` to
correct the metric value, i.e. to estimate what it would have been without sampling.

**Sample rates only work with counter, histogram, and timer metrics.**

Learn more about the [Rates in the Metrics documentation][13].

## Events

DogStatsD can emit events to your [Datadog event stream][14]. For example, you may want to see errors and exceptions in Datadog:

```python

from datadog import statsd

def render_page():
  try:
    # Render the page...
    # ..
  except RenderError as err:
    statsd.event('Page render error!', err.message, alert_type='error')
```

## Service Checks

DogStatsD can send service checks to Datadog. Use checks to track the status of services your application depends on:

For Python:
```python

from datadog.api.constants import CheckStatus

# Report the status of an app.
name = 'web.app1'
status = CheckStatus.OK
message = 'Response: 200 OK'

statsd.service_check(check_name=name, status=status, message=message)
```

For Ruby:
```ruby
# Report the status of an app.
name = 'web.app1'
status = Datadog::Statsd::OK
opts = {
  'message' => 'Response: 200 OK'
}

statsd.service_check(name, status, opts)
```

After a service check is reported, use it to trigger a [custom check monitor][15].

## Tagging

Add tags to any metric, event, or service check you send to DogStatsD. For example, compare the performance of two algorithms by tagging a timer metric with the algorithm version:

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```

Note that tagging is a [Datadog-specific extension][12] to StatsD.

### Host tag key

The host tag is assigned automatically by the Datadog Agent aggregating the metrics. Metrics submitted with a host tag not matching the Agent hostname lose reference to the original host. The host tag submitted overrides any hostname collected by or configured in the Agent.

### Distributions

Because of the global nature of Distributions, extra tools for tagging are provided. See the [Distribution Metrics][16] page for more details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/etsy/statsd
[2]: https://github.com/DataDog/dd-agent/pull/2104
[3]: /developers/metrics/dogstastd_metrics_submission/#timers
[4]: /developers/metrics/custom_metrics
[5]: /agent/guide/agent-commands
[6]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[7]: /developers/metrics/unix_socket
[8]: /libraries
[9]: /developers/metrics/dogstastd_metrics_submission
[10]: /developers/metrics/datagram_shell
[11]: http://datadogpy.readthedocs.io/en/latest
[12]: /libraries
[13]: /developers/metrics/sets
[14]: /graphing/event_stream
[15]: /monitors/monitor_types/custom_check
[16]: /graphing/metrics/distributions
