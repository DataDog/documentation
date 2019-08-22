---
title: DogStatsD
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
aliases:
  - /guides/dogstatsd/
  - /guides/DogStatsD/
  - /developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
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

Any compliant StatsD client works with DogStatsD and the Agent, but you won't be able to use the [Datadog-specific extensions](#dive-into-dogstatsd).

**Note**: DogStatsD does NOT implement the following from StatsD:

* Gauge deltas (see [Gauge delta support #2104][2] Github issue)
* Timers as a native metric type (though it [does support them via histograms][3])

## How it works

DogStatsD accepts [custom metrics][4], [events][5], and [Service Checks][6] over UDP and periodically aggregates and forwards them to Datadog.

Because it uses UDP, your application can send metrics to DogStatsD and resume its work without waiting for a response. If DogStatsD ever becomes unavailable, your application won't skip a beat.

{{< img src="developers/metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="dogstatsd"  responsive="true" >}}

As it receives data, DogStatsD aggregates multiple data points for each unique metric into a single data point over a period of time called *the flush interval* (ten seconds, by default).

## Setup
### Agent

First, edit your `datadog.yaml` file to uncomment the following lines:

```
use_dogstatsd: true
(...)
dogstatsd_port: 8125
```

Then [restart your Agent][7].

By default, DogStatsD listens on UDP port **8125**. If you need to change this, configure the `dogstatsd_port` option in the main [Agent configuration file][8], and restart the Agent. You can also configure DogStatsD to use a [Unix Domain Socket][9].

### Code

There are [DogStatsD client libraries][10] for many languages and environments. You _can_ use any generic StatsD client to send metrics to DogStatsD, but you won't be able to use any of the Datadog-specific features mentioned above.

{{< tabs >}}
{{% tab "Python" %}}

First install the DogStatsD library:

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

First install the DogStatsD library:

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

DogStatsD and StatsD are broadly similar, however, DogStatsD implements some things differently, and contains advanced features which are specific to Datadog, including available data types, events, Service Checks, and tags:

{{< whatsnext desc="">}}
    {{< nextlink href="/developers/metrics/dogstatsd_metrics_submission/" >}}Send metrics to Datadog with DogStatsD.{{< /nextlink >}}
    {{< nextlink href="/developers/events/dogstatsd_events_submission/" >}}Send Events to Datadog with DogStatsD.{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission/" >}}Send Service Checks to Datadog with DogStatsD.{{< /nextlink >}}
{{< /whatsnext >}}

If you're interested in learning more about the datagram format used by DogStatsD, or want to develop your own Datadog library, see the [datagram and shell usage][11] section, which also explains how to send metrics and events straight from the command line.

[1]: https://github.com/etsy/statsd
[2]: https://github.com/DataDog/dd-agent/pull/2104
[3]: /developers/metrics/dogstatsd_metrics_submission
[4]: /developers/metrics/custom_metrics
[5]: /developers/events/dogstatsd_events_submission
[6]: /developers/service_checks/dogstatsd_service_checks_submission
[7]: /agent/guide/agent-commands
[8]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[9]: /developers/dogstatsd/unix_socket
[10]: /libraries
[11]: /developers/metrics/datagram_shell
