---
title: Data Types and Tags
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: Introduction to DogStatsD
- link: "developers/libraries"
  tag: "Documentation"
  text: Official and Community-contributed API and DogStatsD client libraries
- link: "https://github.com/DataDog/dd-agent/blob/master/dogstatsd.py"
  tag: "Github"
  text: DogStatsD source code
---

While StatsD accepts only metrics, DogStatsD accepts all three of the major Datadog data types: metrics, events, and service checks. This section shows typical use cases for each type, and introduces tagging, which is specific to DogStatsD.

Each example is in Python using the [official Datadog Python client][2], but each data type shown is supported similarly in [other DogStatsD client libraries][1].

## Metrics

Counters, gauges, and sets are familiar to StatsD users. Histograms are specific to DogStatsD. Timers, which exist in StatsD, are a sub-set of histograms in DogStatsD.

### Counters

Counters track how many times something happens _per second_, such as page views. In this example, we increment a metric called `web.page_views` each time our `render_page` function is called.

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

With this one line of code we can start graphing the data. Here's an example:

{{< img src="developers/metrics/graph-guides-metrics-page-views.png" alt="graph guides metrics page views" responsive="true" popup="true">}}

Note that StatsD counters are normalized over the flush interval to report per-second units. In the graph above, the marker is reporting 35.33 web page views per second at ~15:24. In contrast, if one person visited the web page each second, the graph would be a flat line at y = 1. To increment or measure values over time, see [gauges](#gauges).

We can also count by arbitrary numbers. Suppose we wanted to count the number of bytes processed by a file uploading service. We increment a metric called `file_service.bytes_uploaded` by the size of the file each time our `upload_file` function is called:

For Python:
```python

def upload_file(file):
    statsd.increment('file_service.bytes_uploaded', file.size())
    save_file(file)
    return 'File uploaded!'
```

Note that for counters coming from another source that are ever-increasing and never reset -- for example, the number of queries from MySQL over time -- we track the rate between flushed values. While there currently isn't an elegant solution to get raw counts within Datadog, you may want to apply a function to
your series like cumulative sum or integral. [Read more about Datadog functions][8].

Learn more about the [Count type in the Metrics documentation][4].

### Gauges

Suppose a developer wanted to track the amount of free memory on a machine, we can periodically sample that value as the metric `system.mem.free`:

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

Learn more about the [Gauge type in the Metrics documentation][5].

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

# We can also use the `timed` decorator as a short-hand for timing functions.
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

# We can also use the `time` helper as a short-hand for timing blocks
# of code.
statsd.time('database.query.time') do
  return db.query()
end
```

The above instrumentation produces the following metrics:

- `database.query.time.count`: number of times this metric was sampled
- `database.query.time.avg`: average time of the sampled values
- `database.query.time.median`: median sampled value
- `database.query.time.max`: maximum sampled value
- `database.query.time.95percentile`: 95th percentile sampled value

These metrics give insight into how different each query time is. We can see how long the query usually takes by graphing the `median`. We can see how long most queries take by graphing the `95percentile`.

{{< img src="developers/metrics/graph-guides-metrics-query-times.png" alt="graph guides metrics query times" responsive="true" popup="true">}}

For this toy example, let's say a query time of 1 second is acceptable. Our median query time (graphed in purple) is usually less than 100 milliseconds, which is great. But unfortunately, our 95th percentile (graphed in blue) has large spikes sometimes nearing three seconds, which is unacceptable. This means most of our queries are running just fine, but our worst ones are very bad. If the 95th percentile was close to the median, than we would know that almost all of our queries are performing just fine.

Learn more about the [Histogram type in the Metrics documentation][6].

### Timers

Timers in DogStatsD are an implementation of Histograms (not to be confused with timers in the standard StatsD). They measure timing data _only_, such as the amount of time a section of code takes to execute, such as the time it takes to render a web page. In Python, you can create timers with a decorator:

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
  # First some stuff we don't want to time
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

Under the hood, DogStatsD treats timers as histograms. Whether you timers or histograms, you'll be sending the same data to Datadog.

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

Learn more about the [Histogram type in the Metrics documentation][6].

## Metric option: sample rates

Since the overhead of sending UDP packets can be too great for some performance
intensive code paths, DogStatsD clients support sampling,
i.e. only sending metrics a percentage of the time. The following code sends
a histogram metric only about half of the time:

```python

dog.histogram('my.histogram', 1, sample_rate=0.5)
```

Before sending the metric to Datadog, DogStatsD uses the `sample_rate` to
correct the metric value, i.e. to estimate what it would have been without sampling.

**Sample rates only work with counter, histogram, and timer metrics.**

Learn more about the [Rates in the Metrics documentation][7].

## Events

DogStatsD can emit events to your Datadog event stream. For example, you may want to see errors and exceptions in Datadog:

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

After a service check has been reported, you can use it to trigger a [custom check monitor][3].

## Tagging

You can add tags to any metric, event, or service check you send to DogStatsD. For example, you could compare the performance of two algorithms by tagging a timer metric with the algorithm version:

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```

Since tagging is an extension to StatsD, use a [DogStatsD client library][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /libraries/
[2]: http://datadogpy.readthedocs.io/en/latest/
[3]: /monitors/monitor_types/custom_check
[4]: /developers/metrics/count
[5]: /developers/metrics/gauges
[6]: /developers/metrics/histograms
[7]: /developers/metrics/rates
[8]: /graphing/miscellaneous/functions
