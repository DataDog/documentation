---
title: Data Types and Tags
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Introduction to DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community-contributed API and DogStatsD client libraries"
- link: "https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd"
  tag: "Github"
  text: "DogStatsD source code"
---

While StatsD accepts only metrics, DogStatsD accepts all three of the major Datadog data types: metrics, events, and service checks. This section shows typical use cases for each type, and introduces tagging, which is specific to DogStatsD.

Each example is in Python using the [official Datadog Python client][1], but each data type shown is supported similarly in [other DogStatsD client libraries][2].

## Metrics

Counters, gauges, and sets are familiar to StatsD users. Histograms are specific to DogStatsD. Timers, which exist in StatsD, are a sub-set of histograms in DogStatsD.

### Counters

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

{{< img src="developers/metrics/graph-guides-metrics-page-views.png" alt="graph guides metrics page views" responsive="true" >}}

Note that StatsD counters are normalized over the flush interval to report per-second units. In the graph above, the marker is reporting 35.33 web page views per second at ~15:24. In contrast, if one person visited the web page each second, the graph would be a flat line at y = 1. To increment or measure values over time, see [gauges](#gauges).

Arbitrary numbers can also be counted. Suppose you wanted to count the number of bytes processed by a file uploading service. Increment a metric called `file_service.bytes_uploaded` by the size of the file each time the  `upload_file` function is called:

For Python:
```python

def upload_file(file):
    statsd.increment('file_service.bytes_uploaded', file.size())
    save_file(file)
    return 'File uploaded!'
```

Note that for counters coming from another source that are ever-increasing and never reset (for example, the number of queries from MySQL over time), Datadog tracks the rate between flushed values. To get raw counts within Datadog, apply a function to your series such as _cumulative sum_ or _integral_. [Read more about Datadog functions][3].

Learn more about the [Count type in the Metrics documentation][4].

### Distributions

**This feature is in BETA. [Contact Datadog support][5] for details on how to have it enabled for your account.**

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

### Gauges

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

Learn more about the [Gauge type in the Metrics documentation][6].

### Histograms

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

{{< img src="developers/metrics/graph-guides-metrics-query-times.png" alt="graph guides metrics query times" responsive="true" >}}

For this toy example, say a query time of 1 second is acceptable. The median query time (graphed in purple) is usually less than 100 milliseconds, which is great. But unfortunately, the 95th percentile (graphed in blue) has large spikes sometimes nearing three seconds, which is unacceptable. This means that most of queries are running just fine, but the worst ones are very bad. If the 95th percentile was close to the median, then you would know that almost all of the queries are performing just fine.

Learn more about the [Histogram type in the Metrics documentation][7].

### Timers

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

### Sets

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

Learn more about the [Histogram type in the Metrics documentation][7].

## Metric option: sample rates

Since the overhead of sending UDP packets can be too great for some performance intensive code paths, DogStatsD clients support sampling, i.e. only sending metrics a percentage of the time. The following code sends a histogram metric only about half of the time:

```python

dog.histogram('my.histogram', 1, sample_rate=0.5)
```

Before sending the metric to Datadog, DogStatsD uses the `sample_rate` to
correct the metric value, i.e. to estimate what it would have been without sampling.

**Sample rates only work with counter, histogram, and timer metrics.**

Learn more about the [Rates in the Metrics documentation][8].

## Events

DogStatsD can emit events to your [Datadog event stream][9]. For example, you may want to see errors and exceptions in Datadog:

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

After a service check is reported, use it to trigger a [custom check monitor][10].

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

Note that tagging is a [Datadog-specific extension][2] to StatsD.

### Host tag key

The host tag is assigned automatically by the Datadog Agent aggregating the metrics. Metrics submitted with a host tag not matching the Agent hostname lose reference to the original host. The host tag submitted overrides any hostname collected by or configured in the Agent. If you need to remove the host tag from DogStatsD metrics, reference [How to remove the host tag when submitting metrics via DogStatsD][11].

### Distributions

Because of the global nature of Distributions, extra tools for tagging are provided. See the [Distribution Metrics][12] page for more details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://datadogpy.readthedocs.io/en/latest
[2]: /libraries
[3]: /graphing/miscellaneous/functions
[4]: /developers/metrics/counts
[5]: /help
[6]: /developers/metrics/gauges
[7]: /developers/metrics/histograms
[8]: /developers/metrics/rates
[9]: /graphing/event_stream
[10]: /monitors/monitor_types/custom_check
[11]: /developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd
[12]: /graphing/metrics/distributions
