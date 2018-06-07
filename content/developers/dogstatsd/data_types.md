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

The first four metrics types (gauges, counters, timers, and sets) are familiar to StatsD users; histograms is specific to DogStatsD.

### Gauges

Gauges track the ebb and flow of a particular metric value over time, like the number of active users on a website:

```python

from datadog import statsd

statsd.gauge('mywebsite.users.active', get_active_users())
```

### Counters

Counters track how many times something happens _per second_, like page views:

```python

from datadog import statsd

def render_page():
  statsd.increment('mywebsite.page_views') # add 1
  # Render the page...
```

With this one line of code we can start graphing the data:

{{< img src="developers/dogstatsd/graph-guides-metrics-page-views.png" alt="graph guides metrics page views" responsive="true" popup="true">}}

DogStatsD normalizes counters over the flush interval to report
per-second units. In the graph above, the marker is reporting
35.33 web page views per second at ~15:24. In contrast, if one person visited
the webpage each second, the graph would be a flat line at y = 1.

To increment or measure values over time rather than per second, use a gauge.

### Sets

Sets count the number of unique elements in a group. To track the number of unique visitors to your site, use a set:

```python

def login(self, user_id):
    statsd.set('users.uniques', user_id)
    # Now log the user in ...
```

### Timers

Timers measure the amount of time a section of code takes to execute, like the time it takes to render a web page. In Python, you can create timers with a decorator:

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

Under the hood, DogStatsD actually treats timers as histograms; Whether you send timer data using the methods above, or send it as a histogram (see below), you'll be sending the same data to Datadog.

### Histograms

Histograms calculate the statistical distribution of any kind of value. Though it would be less convenient, you could measure the render times in the previous example using a histogram metric:

```python

from datadog import statsd

...
start_time = time.time()
page = render_page()
duration = time.time() - start_time
statsd.histogram('mywebsite.page_render.time', duration)

def render_page():
  # Render the page...
```

This produces the same five metrics shown in the Timers section above: count, avg, median, max, and 95percentile.

But histograms aren't just for measuring times. You can track distributions for anything, like the size of files users upload to your site:

```python

from datadog import statsd

def handle_file(file, file_size):
  # Handle the file...

  statsd.histogram('mywebsite.user_uploads.file_size', file_size)
  return
```

Since histograms are an extension to StatsD, use a [DogStatsD client library][1].

### Metric option: sample rates

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

Finally, DogStatsD can send service checks to Datadog. Use checks to track the status of services your application depends on:

```python

from datadog import statsd

conn = get_redis_conn()
if not conn:
  statsd.service_check('mywebsite.can_connect_redis', statsd.CRITICAL)
else:
  statsd.service_check('mywebsite.can_connect_redis', statsd.OK)
  # Do your redis thing...
```

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
