---
title: What is DogStatsD?
kind: documentation
sidebar:
  nav:
    - header: Official Libraries
    - text: How It Works
      href: "#how-it-works"
    - text: Set Up
      href: "#set-up"
    - text: Metrics
      href: "#metrics"
    - text: Sample Rates
      href: "#sample-rates"
    - text: Tags
      href: "#tags"
    - text: Events
      href: "#events"
    - text: Configuration
      href: "#configuration"
    - text: Datagram Format
      href: "#datagram-format"
    - text: Source
      href: "#source"
---

<p class="aside">
This page explains what DogStatsD is, how it works, and what data it accepts.
</p>

The easiest way to get your custom application metrics into Datadog is to send them to DogStatsD, a metrics aggregation daemon bundled with the Datadog Agent. DogStatsD implements 
the <a href="https://github.com/etsy/statsd">StatsD</a> protocol and adds a few Datadog-specific
extensions:

* Histogram and Set metric types
* Service checks and Events
* Tagging

## How It Works

DogStatsD accepts your custom metrics, events, and service checks over UDP and periodically aggregates and forwards them to Datadog. Because it uses UDP, your application 
can send metrics to DogStatsD and resume its work without waiting for a response. If DogStatsD ever becomes unavailable, your application won't skip a beat.

<p>
<img src="/static/images/dogstatsd.png"/>
</p>

As it receives data, DogStatsD aggregates multiple data points for each unique metric into a single
data point over a period of time called the flush interval. Let's walk through an
example to see how this works.

Suppose you want to know how many times your Python application is calling a particular database query. 
Your application can tell DogStatsD to increment a counter each time the query is called:

<%= python <<eof
def query_my_database():
    dog.increment('database.query.count')
    # Run the query...
eof
%>

If this function executes one hundred times during a flush interval (ten
seconds, by default), it will send DogStatsD one hundred UDP packets that say
"increment the counter 'database.query.count'". DogStatsD will aggregate these
points into a single metric value—100, in this case—and send it to Datadog
where it will be stored and available for graphing alongside the rest of your metrics.

## Set Up

Once you have the Datadog Agent installed on your application servers/containers—or anywhere
your application can reliably reach—grab the [DogStatsD client library](/libraries/) for your
application language and you'll be ready to start hacking. You _can_ use any generic StatsD client to send metrics to DogStatsD, but you won't be able to use any of the Datadog-specific features mentioned above.

By default, DogStatsD listens on UDP port 8125. If you need to change this, configure the
`dogstatsd_port` option in the main 
<a href="https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example">
Agent configuration file</a>:

    # Make sure your client is sending to the same port.
    dogstatsd_port: 18125

Restart DogStatsD to effect the change.

## Data Types

While StatsD only accepts metrics, DogStatsD accepts all three major data types Datadog supports: metrics, events, and service checks. This section shows typical use cases for each type.

Each example is in Python using [datadogpy](http://datadogpy.readthedocs.io/en/latest/), but each data type shown is supported similarly in other DogStatsD client libraries.

### Metrics

The first three metrics types—gauges, counters, and timers—will be familiar to StatsD users. The last two—histograms and sets—are specific to DogStatsD.

#### Gauges

Gauges track the ebb and flow of a particular metric value over time, like the number of active users on a website:

<%= python <<EOF
from datadog import statsd

statsd.gauge('mywebsite.users.active', get_active_users())
EOF
%>

#### Counters

Counters track how many times something happens _per second_, like page views:

<%= python <<EOF
from datadog import statsd

def render_page():
  statsd.increment('mywebsite.page_views') # add 1
  # Render the page...
EOF
%>

With this one line of code we can start graphing the data:

<img src="/static/images/graph-guides-metrics-page-views.png" style="width:100%"/>

DogStatsD normalizes counters over the flush interval to report
per-second units. In the graph above, the marker is reporting
35.33 web page views per second at ~15:24. In contrast, if one person visited
the webpage each second, the graph would be a flat line at y = 1.

To increment or measure values over time rather than per second, use a gauge.

#### Timers

Timers measure the amount of time a section of code takes to execute, like the time it takes to render a web page. In Python, you can create timers with a decorator:

<%= python <<EOF
from datadog import statsd

@statsd.timed('mywebsite.page_render.time')
def render_page():
  # Render the page...
EOF
%>

or with a context manager:

<%= python <<EOF
from datadog import statsd

def render_page():
  # First some stuff we don't want to time
  boilerplate_setup()

  # Now start the timer
  with statsd.timed('mywebsite.page_render.time'):
    # Render the page...
EOF
%>

In either case, as DogStatsD receives the timer data, it calculates the statistical distribution of render times and sends the following metrics to Datadog:

- `mywebsite.page_render.time.count` - the number of times the render time was sampled
- `mywebsite.page_render.time.avg` - the average render time
- `mywebsite.page_render.time.median` - the median render time
- `mywebsite.page_render.time.max` - the maximum render time
- `mywebsite.page_render.time.95percentile` - the 95th percentile render time

Under the hood, DogStatsD actually treats timers as histograms; Whether you send timer data using the methods above, or send it as a histogram (see below), you'll be sending the same data to Datadog.

#### Histograms

Histograms calculate the statistical distribution of any kind of value. Though it would be less convenient, you could measure the render times in the previous example using a histogram metric:

<%= python <<EOF
from datadog import statsd

...
start_time = time.time()
page = render_page()
duration = time.time() - start_time
statsd.histogram('mywebsite.page_render.time', duration)

def render_page():
  # Render the page...
EOF
%>

This produces the same five metrics shown in the Timers section above: count, avg, median, max, and 95percentile.

But histograms aren't just for measuring times. You can track distributions for anything, like the size of files users upload to your site:

<%=python <<EOF
from datadog import statsd

def handle_file(file, file_size):
  # Handle the file...

  statsd.histogram('mywebsite.user_uploads.file_size', file_size)
  return
EOF
%>

Histograms are an extension to StatsD, so you'll need to use a [DogStatsD client library](/libraries).

#### Sets

Sets count the number of unique elements in a group. To track the number of unique visitors 
to your site, use a set:

<%= python <<EOF
def login(self, user_id):
    statsd.set('users.uniques', user_id)
    # Now log the user in ...
EOF
%>

Sets are an extension to StatsD, so you'll need to use a [DogStatsD client library](/libraries).

### Metric option: Sample Rates

Since the overhead of sending UDP packets can be too great for some performance
intensive code paths, DogStatsD clients support sampling,
i.e. only sending metrics a percentage of the time. The following code sends
a histogram metric only about half of the time:

<%= python <<EOF
dog.histogram('my.histogram', 1, sample_rate=0.5)
EOF
%>

Before sending the metric to Datadog, DogStatsD uses the `sample_rate` to 
correct the metric value, i.e. to estimate what it would have been without sampling.

You can specify a sample rate for any metric type.

## Events

DogStatsD can emit events to your Datadog event stream. For example, you may want to see errors and excetions in Datadog:

<%= python <<EOF
from datadog import statsd

def render_page():
  try:
    # Render the page...
    # ..
  except RenderError as err:
    statsd.event('Page render error!', err.message, alert_type='error')
EOF
%>

## Service Checks

Finally, DogStatsD can send service checks to Datadog. Use checks to track the status of services your application depends on:

<%= python <<EOF
from datadog import statsd

conn = get_redis_conn()
if not conn:
  statsd.service_check('mywebsite.can_connect_redis', statsd.CRITICAL)
else:
  statsd.service_check('mywebsite.can_connect_redis', statsd.OK)
  # Do your redis thing...
EOF
%>

## Tagging

You can add tags to any metric, event, or service check you send to DogStatsD. For example, you could compare the performance of two algorithms by tagging a timer metric with the algorithm version:

<%= python <<EOF
@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
EOF
%>

Tagging is an extension to StatsD, so you'll need to use a [DogStatsD client library](/libraries).

## Datagram Format

This section specifies the raw datagram format for each data type DogStatsD accepts. You don't need to know this if
you're using any of the DogStatsD client libraries, but if you want to send data to DogStatsD without the libraries
or you're writing your own library, here's how to format the data.

### Metrics

`metric.name:value|type|@sample_rate|#tag1:value,tag2`

- `metric.name` — a string with no colons, bars, or @ characters. See the [metric naming policy](http://docs.datadoghq.com/faq/#api).
- `value` — an integer or float.
- `type` — `c` for counter, `g` for gauge, `ms` for timer, `h` for histogram, `s` for set.
- `sample rate` (optional) — a float between 0 and 1, inclusive.
- `tags` (optional) — a comma seperated list of tags. Use colons for key/value tags, i.e. `env:prod`. The key `device` is reserved; Datadog will drop a tag like `device:foobar`.

Here are some example datagrams:

    # Increment the page.views counter
    page.views:1|c

    # Record the fuel tank is half-empty
    fuel.level:0.5|g

    # Sample the song length histogram half of the time
    song.length:240|h|@0.5

    # Track a unique visitor to the site
    users.uniques:1234|s

    # Increment the active users counter, tag by country of origin
    users.online:1|c|#country:china

    # Track active China users and use a sample rate
    users.online:1|c|@0.5|#country:china

### Events

`_e{title.length,text.length}:title|text|d:date_happened|h:hostname|p:priority|t:alert_type|#tag1,tag2`

- `_e` - the datagram must begin with `_e`
- `title` — Event title.
- `text` — Event text. Escape the slash in any line breaks (`\\n`).
- `|d:date_happened` (optional) — Add a timestamp to the event. Default is the current Unix epoch timestamp.
- `|h:hostname` (optional) - Add a hostname to the event. No default.
- `|k:aggregation_key` (optional) — Assign an aggregation key to the event, to group it with some others. No default.
- `|p:priority` (optional) — Set to 'normal' or 'low'. Default 'normal'.
- `|s:source_type_name` (optional) - Add a source type to the event. No default.
- `|t:alert_type` (optional) — Set to 'error', 'warning', 'info' or 'success'. Default 'info'.
- `|#tag1:value1,tag2,tag3:value3...` (optional)— <strong><em><br/>
  The colon in tags is part of the tag list string and has no parsing purpose like for the other parameters.</em></strong> No default.

### Service Checks

`_sc|name|status|metadata`

- `_sc` — the datagram must begin with `_sc`
- `name` — service check name string, shouldn't contain any `|`
- `status` — digit corresponding to the status you're reporting (OK = 0, WARNING = 1, CRITICAL = 2, UNKNOWN = 3)
- `metadata` (all optional) — provide any of the following:
  - `d:timestamp` — Add a timestamp to the check. Default is the current Unix epoch timestamp.
  - `h:hostname` — Add a hostname to the event. No default.
  - `#tag1:value1,tag2,tag3:value3` — <strong><em><br />The colon in tags is part of the tag list string and
  has no parsing purpose like for the other parameters.</em></strong> No default.
  - `m:service_check_message` — Add a message describing the current state of the service check. <em>This field MUST be positioned last among the metadata fields.</em> No default.


## Related Reading

* [Libraries page](/libraries/) — Find a DogStatsD client library to suit your needs.
* [API Reference](/api) — See how to submit custom metrics directly to the HTTP API rather than to DogStatsD.
* [Guide to Tagging](/guides/tagging) — All you need to know about tagging.
* [DogStatsD source code](https://github.com/DataDog/dd-agent/blob/master/dogstatsd.py) — DogStatsD is open-sourced under the BSD License.
