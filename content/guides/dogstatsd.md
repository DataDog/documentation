---
title: Getting Started with DogStatsD
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
  This tutorial will walk you through instrumenting your application to send
  custom metrics to Datadog. If you need some help as you go, pop by
  <a href="irc://irc.freenode.net/datadog">#datadog on freenode</a>,
  where we'll be happy to answer any questions you might have. (There's a
  <a href="http://webchat.freenode.net/?randomnick=1&channels=datadog&prompt=1">
  web chat client, too</a>.)
</p>

The easiest way to get your custom metrics into Datadog is to send them to DogStatsD,
a metrics aggregation server bundled with the Datadog Agent (in versions 3.0
and above).
DogStatsD implements the
<a href="https://github.com/etsy/statsd">StatsD</a>
protocol, along with a few extensions for special Datadog features.

## How It Works

DogStatsD accepts custom application metrics points over
<a href="http://en.wikipedia.org/wiki/User_Datagram_Protocol">UDP</a>,
and then periodically aggregates and forwards the metrics to Datadog, where
they can be graphed on dashboards. Here's a pretty standard DogStatsd setup:
<p>
<img src="/static/images/dogstatsd.png"/>
</p>

### Aggregation

DogStatsD's primary function is to aggregate many data points into a single
metric for a given interval of time (ten seconds by default). Let's walk through an
example to understand how this works.

Suppose you want to know how many times you are running a database query,
your application can tell DogStatsD to increment a counter each
time this query is executed. For example:

<%= python <<eof
def query_my_database():
    dog.increment('database.query.count')
    # Run the query ...
eof
%>

If this function is executed one hundred times in a flush interval (ten
seconds by default), it will send DogStatsD one hundred UDP packets that say
"increment the 'database.query.count' counter". DogStatsD will aggregate these
points into a single metric value - 100 in this case - and send it to the
server where it can be graphed.

This means expect DogStatsD to produce one point per metric per flush interval
while data is being submitted for that metric.

### Why UDP?

Like StatsD, DogStatsD receives points over UDP. UDP is good fit for application
instrumentation because it is a fire and
forget protocol. This means your application won't stop its actual work to wait for a
response from the metrics server, which is very important if the metrics
server is down or inaccessible.

## Set Up

Once you have the Datadog Agent up and running, grab a DogStatsD client for your
language and you'll be ready to start hacking. Any StatsD client will work
just fine, but using a Datadog StatsD client will give you a few extra features
(namely tags and histograms, but more on that later).

### DogStatsD Clients

You can see the list of StatsD clients on our [libraries page](/libraries/).

## Metrics

We'll walk through the types of metrics supported by DogStatsD in Python, but
the principles are easily translated into other languages.
DogStatsD supports the following types of metrics:

### Gauges

Gauges measure the value of a particular thing at a
particular time, like the amount of fuel in a car's gas tank or
the number of users connected to a system.

<%= python <<eof
dog.gauge('gas_tank.level', 0.75)
dog.gauge('users.active', 1001)
eof
%>

### Counters

Counters track how many times something happened per second, like the number of
database requests or page views.

<%= python <<eof
dog.increment('database.query.count')
dog.increment('page_view.count', 10)
eof
%>

### Histograms

Histograms track the statistical distribution of a set of values, like the
duration of a number of database queries or the size of files uploaded by users. Each
histogram will track the average, the minimum, the maximum, the median,
the 95th percentile and the count.

<%= python <<eof
dog.histogram('database.query.time', 0.5)
dog.histogram('file.upload.size', file.get_size())
eof
%>

Histograms are an extension to StatsD, so you'll need to use a client that
supports them.

### Sets

Sets are used to count the number of unique elements in a group. If you want to
track the number of unique visitor to your site, sets are a great way to do
that.

<%= python <<eof
dog.set('users.uniques', user.id)
eof
%>

Sets are an extension to StatsD, so you'll need to use a client that
supports them.

### Timers

StatsD only supports histograms for timing, not generic values (like the size
of uploaded files or the number of rows returned from a query). Timers are
essentially a special case of histograms, so they are treated in the same manner
by DogStatsD for backwards compatibility.

## Sample Rates

The overhead of sending UDP packets can be too great for some performance
intensive code paths. To work around this, StatsD clients support sampling,
that is to say, only sending metrics a percentage of the time. For example:

<%= python <<eof
dog.histogram('my.histogram', 1, sample_rate=0.5)
eof
%>

will only be sent to the server about half of the time, but it will be
multipled by the sample rate to provide an estimate of the real data.

## Tags

Tags are a Datadog specific extension to StatsD. They allow you to tag a metric
with a dimension that's meaningful to you and slice and dice along that
dimension in your graphs. For example, if you wanted to measure the
performance of two video rendering algorithms, you could tag the rendering time
metric with the version of the algorithm you used.


Since tags are an extension to StatsD, so you'll need to use a client that
supports them.


<%= python <<eof

# Randomly choose which rendering function we want to use ...
if random() < 0.5:
    renderer = old_slow_renderer
    version = 'old'
else:
    renderer = new_shiny_renderer
    version = 'new'

start_time = time()
renderer()
duration = time() - start_time
dog.histogram('rendering.duration', tags=[version])
eof
%>

## Events
You can post events to your Datadog event stream. You can tag them, set priority and even aggregate them with other events.

Mandatory fields:

  - `title` (String) — Event title.
  - `text` (String) — Event text. Supports line breaks.

Events are aggregated on the Event Stream based on: <br/>
'hostname/event_type/source_type/aggregation_key'<br/>
If `event_type` is empty, the event will be grouped with other events that don't have an `event_type`.

<%= python <<eof

# Post a simple message
statsd.event('There might be a storm tomorrow', 'A friend warned me earlier.')

# Cry for help
statsd.event('SO MUCH SNOW', 'The city is paralyzed!', alert_type='error', tags=['urgent', 'endoftheworld'])
eof
%>

#### Fields
- Mandatory:
  - Event title.
  - Event text. Supports line breaks.
- Optional:
  - `date_happened` (Time, None) — default: None — Assign a timestamp to the event. Default is now when none.
  - `hostname` (String, None) — default: None — Assign a hostname to the event.
  - `aggregation_key` (String, None) — default: None — Assign an aggregation key to the event, to group it with some others.
  - `priority` (String, None) — default: 'normal' — Can be 'normal' or 'low'.
  - `source_type_name` (String, None) — default: None — Assign a source type to the event.
  - `alert_type` (String, None) — default: 'info' — Can be 'error', 'warning', 'info' or 'success'.
  - `tags` - (Array\[str\], None) — default: None — An array of tags

## Configuration

DogStatsD supports the following options, all of which can be tweaked in the
Agent <a href="https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example">
configuration file</a>:

    # The port DogStatsD runs on. If you change this, make your the apps sending to
    # it change as well.
    dogstatsd_port: 8125

    # The number of seconds to wait between flushes to the server.
    dogstatsd_interval: 10

## Datagram Format

### Metrics

If you want to send metrics to DogStatsD in your own way, here is the format of
the packets:

`metric.name:value|type|@sample_rate|#tag1:value,tag2`

Here's  breakdown of the fields:

- `metric.name` should be a String with no colons, bars or @ characters and fit our [naming policy](http://docs.datadoghq.com/faq/#api).
- `value` should be a number
- type should be `c` for Counter, `g` for Gauge, `h` for Histogram, `ms` for
  Timer or `s` for Set.
- sample rate is optional and should be a float between 0 and 1 inclusive.
- tags are optional, and should be a comma seperated list of tags. Colons are
  used for key value tags. Note that the key `device` is reserved, tags like "device:xyc" will be dropped by Datadog.

Here are some example datagrams and comments explaining them:

    # Increment the page.views counter.
    page.views:1|c

    # Record the fuel tank is half-empty
    fuel.level:0.5|g

    # Sample a the song length histogram half of the time.
    song.length:240|h|@0.5

    # Track a unique visitor to the site.
    users.uniques:1234|s

    # Increment the users online counter tagged by country of origin.
    users.online:1|c|#country:china

    # An example putting it all together.
    users.online:1|c|@0.5|#country:china

### Events

If you want to send events to DogStatsD in your own way, here is the format of
the packets:

`_e{title.length,text.length}:title|text|d:date_happened|h:hostname|p:priority|t:alert_type|#tag1,tag2`

#### Fields
- Mandatory:
  - `title` — Event title.
  - `text` — Event text. Supports line breaks.
- Optional: `|[key]:[value]`
  - `|d:date_happened` — default: None — Assign a timestamp to the event. Default is the current Unix epoch timestamp when not supplied.
  - `|h:hostname` — default: None — Assign a hostname to the event.
  - `|k:aggregation_key` — default: None — Assign an aggregation key to the event, to group it with some others.
  - `|p:priority` — default: 'normal' — Can be “normal” or “low”.
  - `|s:source_type_name` — default: None — Assign a source type to the event.
  - `|t:alert_type` — default: 'info' — Can be “error”, “warning”, “info” or “success”.
  - `|#tag1:value1,tag2,tag3:value3` — default: None. <strong><em><br/>
  Note: The `:` in tags is part of the tag list string and has no parsing purpose like for the other parameters.</em></strong>

### Service Checks

If you want to send service checks to DogStatsD, here is the format of the packets:

`_sc|name|status|metadata`

#### Fields
- Mandatory:
  - `name` — service check name string, shouldn't contain any `|`
  - `status` — digit corresponding to the status you're reporting (OK = 0, WARNING = 1, CRITICAL = 2, UNKNOWN = 3)
- Optional metadata `|metadata`:
It's either nothing, or a combination of those suffixes:
  - `|d:timestamp` — Assign a timestamp to the check. Default is the current Unix epoch timestamp when not supplied.
  - `|h:hostname` — default: None — Assign a hostname to the event.
  - `|#tag1:value1,tag2,tag3:value3` — default: None. <strong><em><br />Note: The `:` in tags is part of the tag list string and
  has no parsing purpose like for the other parameters.</em></strong>
  - `|m:service_check_message` — A message describing the current state of the service check. <em>This field should always be
positioned last among the metadata fields.</em>



## Source

DogStatsD is open-sourced under the BSD License. Check out the source
[here](https://github.com/DataDog/dd-agent).



