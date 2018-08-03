---
title: DogStatsD
kind: documentation
description: Introduction and setup instructions for DogStatsD.
aliases:
  - /guides/dogstatsd/
  - /guides/DogStatsD/
further_reading:
- link: "developers/metrics"
  tag: "Documentation"
  text: Learn more about Metrics
- link: "developers/libraries"
  tag: "Documentation"
  text: Official and Community-contributed API and DogStatsD client libraries
- link: "https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd"
  tag: "Github"
  text: DogStatsD source code
---

The easiest way to get your custom application metrics into Datadog is to send them to DogStatsD, a metrics aggregation service bundled with the Datadog Agent. DogStatsD implements the [StatsD][3] protocol and adds a few Datadog-specific extensions:

* Histogram metric type
* Service Checks and Events
* Tagging

Any compliant StatsD client will work, but you won't be able to use the [Datadog-specific extensions](#dive-into-dogstatsd).

**Note**: DogStatsD does NOT implement the following from StatsD:

* Gauge deltas (see [this issue][9])
* Timers as a native metric type (though it [does support them via histograms][6])

## How it works

DogStatsD accepts [custom metrics][4], events, and service Checks over UDP and periodically aggregates and forwards them to Datadog.
Because it uses UDP, your application can send metrics to DogStatsD and resume its work without waiting for a response. If DogStatsD ever becomes unavailable, your application won't skip a beat.

{{< img src="developers/dogstatsd/dogstatsd.png" alt="dogstatsd"  responsive="true" >}}

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
use_dogstatsd: yes

...

dogstatsd_port: 8125
```

Then [restart your Agent][5].

By default, DogStatsD listens on UDP port **8125**. If you need to change this, configure the `dogstatsd_port` option in the main [Agent configuration file][2], and restart the client. You can also configure DogStatsD to use a [Unix Domain Socket][10].

### Code

There are [DogStatsD client libraries][1] for many languages and environments. You _can_ use any generic StatsD client to send metrics to DogStatsD, but you won't be able to use any of the Datadog-specific features mentioned above.

For Python:
```shell
$ pip install datadog
```

For Ruby:
```shell
$ gem install dogstatsd-ruby
```

And import it, so it's ready to use:

For Python:
```python
from datadog import statsd
```

For Ruby:
```ruby
# Import the library
require 'datadog/statsd'

# Create a statsd client instance.
statsd = Datadog::Statsd.new
```

## Dive into DogStatsD

DogStatsD and StatsD are broadly similar, however, DogStatsD implements some things differently, and contains advanced features which are specific to Datadog. See the [data types and tags][7] section to learn more about the Datadog-specific extensions to DogStatsD, including available data types, events, service Checks, and tags.

If you're interested in learning more about the datagram format used by DogStatsD, or want to develop your own Datadog library, see the [datagram and shell usage][8] section, which also explains how to send metrics and events straight from the command line.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /libraries/
[2]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[3]: https://github.com/etsy/statsd
[4]: /getting_started/custom_metrics/
[5]: /agent/faq/agent-commands
[6]: /developers/dogstatsd/data_types/#timers
[7]: /developers/dogstatsd/data_types
[8]: /developers/dogstatsd/datagram_shell
[9]: https://github.com/DataDog/dd-agent/pull/2104
[10]: /developers/dogstatsd/unix_socket
