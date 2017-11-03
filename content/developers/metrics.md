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
---
## Overview

This guide explains how to send your application's custom metrics to Datadog.
Sending your application's custom metrics to Datadog will let you correlate
what's happening with your application, your users and your system.

Metrics are collected by sending them to StatsD, a small metrics aggregation
server that is bundled with the Datadog Agent. You can read about how it works [here](/developers/dogstatsd/). If you want to dive into code right away,
read on.

In this tutorial, we'll cover some common instrumentation use cases, like:

- How to count web page views
- How to time database queries
- How to measure the amount of free memory

## Metric names
There are a few rules to stick to when naming metrics:

* Metric names must start with a letter 
* Can only contain ascii alphanumerics, underscore and periods (other characters will get converted to underscores) 
* Should not exceed 200 characters (though less than 100 is genearlly preferred from a UI perspective)
* Unicode is not supported
* We recommend avoiding spaces

Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. http.nginx.response_time). We say pseudo-hierarchical because we're not actually enforcing a hierarchy or doing anything with it, but we have aspirations to use it to infer things about servers (e.g. "hey, I see hostA and hostB are reporting 'http.nginx.*', those must be web frontends").

## Setup

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

## Counters

Counters are used to (ahem) count things. Let's walk through a common example -
counting web page views. To achieve this, we'll increment a metric called
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

{{< img src="developers/metrics/graph-guides-metrics-page-views.png" alt="graph guides metrics page views" responsive="true" >}}

Note that StatsD counters are normalized over the flush interval to report
per-second units. In the graph above, the marker is reporting
35.33 web page views per second at ~15:24. In contrast, if one person visited
the webpage each second, the graph would be a flat line at y = 1. To increment or measure values over time, please see [gauges](#gauges)

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
[here][1].

## Gauges

Gauges measure the value of a particular thing over time. Suppose a developer
wanted to track the amount of free memory on a machine, we can periodically
sample that value as the metric `system.mem.free`:

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

## Histograms

Histograms measure the statistical distribution of a set of values. Suppose we wanted to measure the duration of a database query, we can sample each query time with the metric `database.query.time`.

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

- `database.query.time.count` - the number of times this metric was sampled
- `database.query.time.avg` - the average time of the sampled values
- `database.query.time.median` - the median sampled value
- `database.query.time.max` - the maximum sampled value
- `database.query.time.95percentile` - the 95th percentile sampled value

These metrics give insight into how different each query time is. We can see
how long the query usually takes by graphing the `median`. We can see how long
most queries take by graphing the `95percentile`.

{{< img src="developers/metrics/graph-guides-metrics-query-times.png" alt="graph guides metrics query times" responsive="true" >}}

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


## Sets

Sets are used to count the number of unique elements in a group. If you want to
track the number of unique visitors to your site, sets are a great way to do that.

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

## Tags

[Tags](agent/tagging) are a way of adding dimensions to metrics, so they can be sliced, diced,
aggregated and compared on the front end. Suppose we wanted to measure the performance of two algorithms in the real world. We could sample one metric
`algorithm.run_time` and specify each version with a tag:

For python:
```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things here ...
```

For ruby:
```ruby
def algorithm_one()
  statsd.timed('algorithm.run_time', :tags => ['algorithm:one']) do
    # Do fancy things here ...
  end
end

def algorithm_two()
  statsd.timed('algorithm.run_time', :tags => ['algorithm:two']) do
    # Do different fancy things here ...
  end
end
```

On the front end, the metric instances can be aggregated as sums or averages,
or the minimum/maximum can be reported. The metrics can also be broken down by each tag 'key' (in the key:value syntax). For instance, we could run a query like this:

`avg:algorithm.run_time{*} by {algorithm}`

In this query, all instances of this metric (e.g. across all hosts, indicated by `*`) are averaged (`avg`) and broken down by the tag key `algorithm`.


<p class="alert alert-warning">
We store one time series per host + metric + tag combination on our backend,
thus we cannot support infinitely bounded tags. Please don't include endlessly
growing tags in your metrics, like timestamps or user ids. Please limit each
metric to 1000 tags.
</p>


Tags must start with a letter, and after that may contain alphanumerics, underscores, minuses, colons, periods and slashes. Other characters will get
converted to underscores. Tags can be up to 200 characters long and support
unicode. Tags will be converted to lowercase as well.

For optimal functionality, we recommend constructing tags that use the key:value syntax. Examples of commonly used metric tag keys are `env`, `instance`, `name`, and `role`. Note that `device`, `host`, and `source` are treated specially and cannot be specified in the standard way. Check out some of our other docs for how to use these:

- [metrics in the API](api/#metrics)
- [tags in the API](/api/#tags)
- [Agent Checks](/agent/agent_checks/)
- [log parsing](/agent/logs/)

## Sample Rates

Each metric point is sent over UDP to the StatsD server. This can incur a lot
of overhead for performance intensive code paths. To work around this, StatsD
supports sample rates, which allows sending a metric a fraction of the time and scaling up correctly on the server.

The following code will only send points half of the time:
For python:
```python

while True:
  do_something_intense()
  statsd.increment('loop.count', sample_rate=0.5)
```

For ruby:
```ruby
while true do
  do_something_intense()
  statsd.increment('loop.count', :sample_rate => 0.5)
end
```

## Other Submission Methods

Using the StatsD server bundled with the Datadog Agent is the simplest
way of submitting metrics to Datadog, but it's not the only one. Here are some other ways of getting your metrics data into Datadog:

* Submit metrics directly to Datadog's [HTTP API](https://docs.datadoghq.com/api/)
* Use Dropwizard's Java [metrics](https://github.com/dropwizard/metrics) library, with the [metrics-datadog](https://github.com/coursera/metrics-datadog) backend (thanks to the good folks at [Vistar Media](http://www.vistarmedia.com/),[Coursera](https://www.coursera.org), and [Bazaarvoice](http://www.bazaarvoice.com) for the great contributions).

## Seeing Your Custom Metrics

The quickest way to see your custom metric is to use the metrics explorer. You
can navigate to it by clicking the "Metrics" link in the top navigation bar.

Once you're at the metrics explorer you can type in the custom metric you set
in the "Graph:" field and it should autocomplete. If it doesn't autocomplete,
then it might mean that we haven't received data for that metric in the last
few hours.

You can also filter the metric by tag using the "Over:" field, or graph the
metric by tag group using the "One graph per:" field.

Note that the metrics explorer doesn't save any of these graphs. If you've
created some graphs that you'd like to save, you need to click one of the
save buttons at the bottom left, either saving to a new dashboard or to
an existing one.

[1]: /graphing/miscellaneous/functions