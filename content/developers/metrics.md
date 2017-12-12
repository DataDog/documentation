---
title: Sending Metrics with DogStatsD
kind: documentation
customnav: developersnav
js_dd_docs_methods:
  - metricsGuidePage
code_languages:
  - Python
  - Ruby
aliases:
  - /metrics/
  - /guides/metrics/
  - /metrictypes/
  - /units/
---
## Overview

This page explains how to send your application's [custom metrics](/getting_started/custom_metrics/) to Datadog.
Sending your application's [custom metrics](/getting_started/custom_metrics/) to Datadog will let you correlate what's happening with your application, your users and your system.  

Metrics are collected by sending them to StatsD, a small metrics aggregation
server that is bundled with the Datadog Agent. You can read about how it works [here](/developers/dogstatsd/). If you want to dive into code right away,
read on.

In this tutorial, we'll cover some common instrumentation use cases, like:

- How to count web page views
- How to time database queries
- How to measure the amount of free memory

### Metric names
There are a few rules to stick to when naming metrics:

* Metric names must start with a letter 
* Can only contain ASCII alphanumerics, underscore and periods (other characters will get converted to underscores) 
* Should not exceed 200 characters (though less than 100 is generally preferred from a UI perspective)
* Unicode is not supported
* We recommend avoiding spaces

Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. `http.nginx.response_time`). We say pseudo-hierarchical because we're not actually enforcing a hierarchy or doing anything with it, but we have aspirations to use it to infer things about servers (e.g. "hey, I see hostA and hostB are reporting `http.nginx.*`, those must be web frontends").

### Metric Types

A metric's Datadog in-app type affects how its data is interpreted in query results and graph visualizations across the application. The metric type visible on the metric summary page is the Datadog in-app type. You should only change the type if you have started submitting this metric with a new type, and should be aware that changing the type may render historical data nonsensical.  

In the Datadog web application there are 3 metric types: 

* [GAUGE](/#gauges)
* [RATE](/#rates)
* [COUNT](/#count) 
* COUNTER (now deprecated)

A metric's type is stored as metrics metadata and is used to determine how a metric is interpreted throughout the application by determining default time aggregation function and `as_rate()`/`as_count()` behavior. The `as_count()` and `as_rate()` modifiers behave differently for different Web Application metric types.

#### How do submission types relate to Datadog in-app types?
Datadog accepts metrics submitted from a variety of sources, and as a result the submission type does not always map exactly to the Datadog in-app type:


| Submission Source | Submission Method (python) | Submission Type | Datadog In-App Type |
|-------------------|-------------------|-----------------|--------------|
| [API][3] | `api.Metric.send(...)` | gauge | gauge |
| [dogstatsd][1] | `dog.gauge(...)` | gauge | gauge |
| [dogstatsd][1] | `dog.increment(...)` | counter | rate |
| [dogstatsd][1] | `dog.histogram(...)` | histogram | gauge, rate |
| [dogstatsd][1] | `dog.set(...)` | set | gauge |
| [agent check][2] | `self.gauge(...)` | gauge | gauge |
| [agent check][2] | `self.increment(...)` | counter | rate |
| [agent check][2] | `self.rate(...)` | rate | gauge |
| [agent check][2] | `self.count(...)` | count | count |
| [agent check][2] | `self.monotonic_count(...)` | monotonic_count | count |
| [agent check][2] | `self.histogram(...)` | histogram | gauge, rate |
| [agent check][2] | `self.set(...)` | set | gauge |

#### What's a use case for changing a metric's type?

1. You have a metric `app.requests.served` that counts requests served, but accidentally submits it via dogstatsd as a `gauge`. The metric's Datadog type is therefore `gauge`.

2. You realize you should have submitted it as a dogstatsd `counter` metric, that way you can do time aggregation to answer questions like "How many total requests were served in the past day?" by querying `sum:app.requests.served{*}` (this would not make sense for a `gauge`-type  metric.)

3. You like the name `app.requests.served` so rather than submitting a new metric name with the more appropriate `counter` type, you could change the type of `app.requests.served`.
  
  * By updating your submission code, calling `dogstatsd.increment('app.requests.served', N)` after N requests are served.

  * By updating the Datadog in-app type via the metric summary page to `rate`.

This will cause data submitted before the type change for `app.requests.served`to behave incorrectly because it was stored in a format to be interpreted as an in-app `gauge` not a `rate`. Data submitted after steps 3a and 3b
will be interpreted properly.  

If you are not willing to lose the historical data submitted as a `gauge`, create a new metric name with the new type, leaving the type of `app.requests.served` unchanged.

### Metric submission

There are multiple ways to send metrics to Datadog:

1. With your Datadog agent directly (Learn more on how [to write an Agent Checks](/agent/agent_checks) && [Aggregator source](https://github.com/DataDog/dd-agent/blob/master/aggregator.py))

2. Using your StatsD server bundled with the Datadog Agent (Find more about our available libraries [here](/developers/libraries))
  Note: Because dogstatsd flushes at a regular interval (**default 10s**) all metrics submitted via this method will be stored with associated interval metadata.

3. Submit metrics directly to Datadog's [HTTP API](/api/)

4. Use Dropwizard's Java [metrics](https://github.com/dropwizard/metrics) library, with the [metrics-datadog](https://github.com/coursera/metrics-datadog) backend (thanks to the good folks at [Vistar Media](http://www.vistarmedia.com/),[Coursera](https://www.coursera.org), and [Bazaarvoice](http://www.bazaarvoice.com) for the great contributions).

### Setup

First off, [install](https://app.datadoghq.com/account/settings#agent) the Datadog Agent (version 3 or greater), which contains our StatsD server, and make sure it's running.

Next, let's set up a client library for your language.

First, install the module:

For python: 
```shell 
$ pip install datadog
```

For Ruby: 
```shell
$ gem install dogstatsd-ruby
```

And import it, so it's ready to use:

For python: 
```python 
from datadog import statsd
```

For ruby:
```ruby
# Import the library
require 'datadog/statsd'

# Create a statsd client instance.
statsd = Datadog::Statsd.new
```

This tutorial has examples for Python and Ruby, but check out the
[libraries page](/developers/libraries) if you use another language.

## Count
### Overview
Counters are used to count things. 

### Submission
#### Agent Check Submission

{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
| self.increment(...) |  Used to modify a count of events identified by the metric key string: <ul><li>Can be called multiple times during a check's execution.</li><li>Stored as a RATE type in the datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (time-normalized by the aggregation interval which defaults to 1 for agent checks - so the value is generally the raw count value).</li><li>Handled by the aggregator Counter class</li></ul>|
|self.decrement(...) |Used to modify a count of events identified by the metric key string:<ul><li>Can be called multiple times during a check's execution.</li><li>Stored as RATE type in the datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (time-normalized by the aggregation interval which defaults to 1 for agent checks - so the value is generally the raw count value).</li><li>Handled by the aggregator Counter class</li></ul>|
|self.monotonic_count(...)|Submit the sampled raw value of your counter. Don't normalize the values to a rate, or calculate the deltas before submitting. If the value of your counter ever decreases between submissions the resulting stored value for that submission is 0:<ul><li>Should only be called once during a check. Throws away any value that is less than a previously submitted value. IE the counter should be monotonically increasing.</li><li>Stored as a COUNT type in the datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (not time-normalized).</li></ul>|
|self.count(...)|Submit the number of events that occurred during the check interval. If you're tracking a counter value that persists between checks, this means you must calculate the delta before submission:<ul><li>Should only be called once during a check.</li><li>Stored as a COUNT type in the datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (not time-normalized).</li></ul>|
{{% /table %}}

#### Dogstatsd Submission
{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
| dog.increment(...) | Used to increment a counter of events: <ul><li>Stored as a RATE type in the datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value over that statsd flush period.</li></ul>| 
|dog.decrement(...)| Used to decrement a counter of events: <ul><li>Stored as a RATE type in the datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value over that statsd flush period.</li></ul>|
{{% /table %}}


### Example
Lets count web page views. To achieve this, we'll increment a metric called
`web.page_views` each time our `render_page` function is called.

For python: 
```python

def render_page():
    """ Render a web page. """
    statsd.increment('web.page_views')
    return 'Hello World!'
```

For ruby:
```ruby
def render_page()
  # Render a web page.
  statsd.increment('web.page_views')
  return 'Hello World!'
end
```

That's it. With this one line of code we can start graphing the data.
Here's an example:

{{< img src="developers/metrics/graph-guides-metrics-page-views.png" alt="graph guides metrics page views" responsive="true" popup="true">}}

Note that StatsD counters are normalized over the flush interval to report
per-second units. In the graph above, the marker is reporting
35.33 web page views per second at ~15:24. In contrast, if one person visited
the web page each second, the graph would be a flat line at y = 1. To increment or measure values over time, see [gauges](#gauges)

We can also count by arbitrary numbers. Suppose we wanted to count the number
of bytes processed by a file uploading service. We'll increment a metric
called `file_service.bytes_uploaded` by the size of the file each time our
`upload_file` function is called:

For python:
```python

def upload_file(file):
    statsd.increment('file_service.bytes_uploaded', file.size())
    save_file(file)
    return 'File uploaded!'
```

Note that for counters coming from another source that are ever-increasing and never reset -- for example, the number of queries from MySQL over time -- we track the rate between flushed values. While there currently isn't an elegant solution to get raw counts within Datadog, you may want to apply a function to
your series like cumulative sum or integral. There is more information on those
[here](/graphing/miscellaneous/functions).

### In-app modifiers

* Effect of `as_count()`:
    * Sets the time aggregator to SUM.

* Effect of `as_rate()`:
    
    * Sets the time aggregator to SUM
    * Normalizes the input timeseries values by the query (rollup) interval. For example [1,1,1,1].as_rate() for rollup interval of 20s produces [0.05, 0.05, 0.05, 0.05].

* The raw metric itself will default to the time aggregator AVG, so querying the metric without either `as_rate()` or `as_count()` becomes nonsensical when time aggregation is applied.

* Note that on very small intervals when no time-aggregation occurs, there is no normalization, and you get the raw metric value counts.

## Gauges

### Overview
Gauges measure the value of a particular thing over time:  

### Submission methods
#### Agent Check Submission

{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
|self.gauge(...)|<ul><li>If called multiple times during a check's execution for a metric only the last sample will be used.</li><li>Stored as a Web Application GAUGE type</li></ul>|
{{% /table %}}

#### Dogstatsd Submission
{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
|dog.gauge(...)|Stored as a GAUGE type in the datadog web application. Each value in the stored timeseries is the last gauge value submitted for that metric during the statsd flush period.|
{{% /table %}}

### Example
Suppose a developer wanted to track the amount of free memory on a machine, we can periodically sample that value as the metric `system.mem.free`:

For python:
```python

# Record the amount of free memory every ten seconds.
while True:
    statsd.gauge('system.mem.free', get_free_memory())
    time.sleep(10)
```

For ruby:
```ruby
# Record the amount of free memory every ten seconds.
while true do
    statsd.gauge('system.mem.free', get_free_memory())
    sleep(10)
end
```

### In-application modifiers

* Effect of `as_count()`: None
* Effect of `as_rate()`: None

## Histograms
### Overview

Histograms measure the statistical distribution of a set of values. 

Our histogram and timing metrics are essentially the same thing and are extensions on the StatsD timing metric:

https://github.com/etsy/statsd/blob/master/docs/metric_types.md#timing

It aggregates the values that are sent during the flush interval (usually defaults to 10 seconds). So if you send 20 values for a metric during the flush interval, it'll give you the aggregation of those values for the flush interval, i.e.:

* `my_metric.avg`: gives you the avg of those 20 values during the flush interval
* `my_metric.count`: gives you the count of the values (20 in this case) sent during the flush interval
* `my_metric.median`: gives you the median of those values in the flush interval
* `my_metric.95percentile`: gives you the 95th percentile value in the flush interval
* `my_metric.max`: gives you the max value sent during the flush interval
* `my_metric.min`: gives you the min value sent during the flush interval

Each one of these becomes a value in their respective metric time series that are sent to Datadog. Then you can aggregate these time series the same way you aggregate any other metric time series.

### Submission methods
#### Agent Check Submission

{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
|self.histogram(...)|used to track the statistical distribution of a set of values.|
{{% /table %}}

#### Dogstatsd Submission
{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
|dog.histogram(...)|Used to track the statistical distribution of a set of values over a statsd flush period.|
{{% /table %}}

### Example

Suppose we wanted to measure the duration of a database query, we can sample each query time with the metric `database.query.time`.

For python:
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

For ruby:
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

The above instrumentation will produce the following metrics:

- `database.query.time.count`: number of times this metric was sampled
- `database.query.time.avg`: average time of the sampled values
- `database.query.time.median`: median sampled value
- `database.query.time.max`: maximum sampled value
- `database.query.time.95percentile`: 95th percentile sampled value

These metrics give insight into how different each query time is. We can see
how long the query usually takes by graphing the `median`. We can see how long
most queries take by graphing the `95percentile`.

{{< img src="developers/metrics/graph-guides-metrics-query-times.png" alt="graph guides metrics query times" responsive="true" popup="true">}}

For this toy example, let's say a query time of 1 second is acceptable. Our median query time (graphed in purple) is usually less than 100 milliseconds, which is great. But unfortunately, our 95th percentile (graphed in blue) has large spikes sometimes nearing three seconds, which is unacceptable. This means most of our queries are running just fine, but our worst ones are very bad. If the 95th percentile was close to the median, than we would know that almost all of our queries are performing just fine.

<p class="alert alert-warning">
Histograms aren't just for measuring times. They can be used to measure the
distribution of any type of value, like the size of uploaded files or classroom
test scores.
</p>

## Service Checks

Service checks are used to send information about the status of a service.

For python:
```python

from datadog.api.constants import CheckStatus

# Report the status of an app.
name = 'web.app1'
status = CheckStatus.OK
message = 'Response: 200 OK'

statsd.service_check(check_name=name, status=status, message=message)
```

For ruby:
```ruby
# Report the status of an app.
name = 'web.app1'
status = Datadog::Statsd::OK
opts = {
  'message' => 'Response: 200 OK'
}

statsd.service_check(name, status, opts)
```

After a service check has been reported, you can use it to trigger a [Custom Check monitor](/monitors/monitor_types/custom_check).

## Rates
### Overview
### Submission methods
#### Agent Check Submission

{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
|self.rate(...)|Submit the sampled raw value of your counter. Don't normalize the values to a rate, or calculate the deltas before submitting - the agent does both for you:<ul><li>Should only be called once during a check.</li><li>Throws away any value that is less than a previously submitted value. IE the counter should be monotonically increasing.</li><li>Stored as a GAUGE type in the datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value between samples.</li></ul>|
{{% /table %}}

## Sets
### Overview 

Sets are used to count the number of unique elements in a group. 

### Submission methods
#### Agent Check Submission

{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
|self.set(...)|Used count the number of unique elements in a group:<ul><li>Should be called multiple times during an agent check.</li><li>Stored as a GAUGE type in the datadog web application.</li></ul>|
{{% /table %}}

#### Dogstatsd Submission
{{% table responsive="true" %}}
|Method | Overview |
|:---|:---|
|dog.set(...)|Used count the number of unique elements in a group:<ul><li>Stored as GAUGE type in the datadog web application. Each value in the stored timeseries is the count of unique values submitted to statsd for a metric over that flush period.</li></ul>|
{{% /table %}}

### Example
If you want to track the number of unique visitors to your site, sets are a great way to do that.

For python:
```python

def login(self, user_id):
    # Log the user in ...
    statsd.set('users.uniques', user_id)
```

For ruby:
```ruby
def login(self, user_id)
    # Log the user in ...
    statsd.set('users.uniques', user_id)
end
```

### In-app modifiers

* Effect of `as_count()`:
    
    * Sets the time aggregator to SUM.
    * Uses the metadata interval to convert from raw rates to counts. Does not work if no metadata interval exists for the metric.

* Effect of `as_rate()`:
    * Sets the time aggregator to SUM.
    * Uses the query interval and metadata interval to calculate the time-aggregated rate. Does not work if no metadata interval exists for the metric.

* Known Issue: Agent check submitted RATE metrics have no interval metadata, so as_rate() and as_count() don't work.

## Units

The following units may be associated with metrics submitted to Datadog.

{{% table responsive="true" %}}
|Bytes|Time|Percentage|Network|System|Disk|General|DB|Cache|Money|Memory|Frequency|Logging|
|:----|:----|:----|:----|:---|:---|:----|:---|:---|:---|:---|:---|:---|
|<ul><li>bit</li><li>byte</li><li>kibibyte</li><li>mebibyte</li><li>gibibyte</li><li>tebibyte</li><li>pebibyte</li><li>exbibyte</li></ul>|<ul><li>microsecond</li><li>millisecond</li><li>second</li><li>minute</li><li>hour</li><li>day</li><li>week</li><li>nanosecond</li></ul>|<ul><li>fraction</li><li>percent</li><li>percent_nano</li><li>apdex</li></ul>|<ul><li>connection</li><li>request</li><li>packet</li><li>segment</li><li>response</li><li>message</li><li>payload</li><li>timeout</li><li>datagram</li><li>route</li><li>session</li></ul>|<ul><li>process</li><li>core</li><li>thread</li><li>host</li><li>node</li><li>fault</li><li>service</li><li>instance</li><li>cpu</li></ul>|<ul><li>file</li><li>inode</li><li>sector</li><li>block</li></ul>|<ul><li>buffer</li><li>error</li><li>read</li><li>write</li><li>occurrence</li><li>event</li><li>time</li><li>unit</li><li>operation</li><li>item</li><li>task</li><li>worker</li><li>resource</li><li>garbage collection</li><li>email</li><li>sample</li><li>stage</li><li>monitor</li><li>location</li><li>check</li><li>attempt</li><li>device</li><li>update</li><li>method</li><li>job</li><li>container</li></ul>|<ul><li>table</li><li>index</li><li>lock</li><li>transaction</li><li>query</li><li>row</li><li>key</li><li>command</li><li>offset</li><li>record</li><li>object</li><li>cursor</li><li>assertion</li><li>scan</li><li>document</li><li>shard</li><li>flush</li><li>merge</li><li>refresh</li><li>fetch</li><li>column</li><li>commit</li><li>wait</li><li>ticket</li><li>question</li></ul>|<ul><li>hit</li><li>miss</li><li>eviction</li><li>get</li><li>set</li></ul>|<ul><li>dollar</li><li>cent</li></ul>|<ul><li>page</li><li>split</li></ul>|<ul><li>hertz</li><li>kilohertz</li><li>megahertz</li><li>gigahertz</li></ul>|<ul><li>entry</li></ul>|
{{% /table %}}

[1]: /developers/dogstatsd
[2]: /agent/agent_checks
[3]: /api/#metrics