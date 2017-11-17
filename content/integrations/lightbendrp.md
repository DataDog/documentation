---
aliases: []
description: Track actors and dispatcher events for Akka-based applications
git_integration_title: lightbendrp
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-Lighttpd Integration
---

{{< img src="integrations/lightbendrp/dashboard_lightbendrp.png" alt="lightbendrp Dashboard" responsive="true" >}}

## Overview 

Get metrics from your [Lightbend Reactive Platform application](https://www.lightbend.com/platform) in real time to:

* Visualize performance metrics of your actors

* Track unexpected events (exceptions, unhandled messages, dead letters, a.s.o.)

* Get an insight into the remoting characteristics of your application

* Drill down into dispatcher metrics to tune the application performance

## Setup
### Installation 

This integration uses Lightbend Monitoring which requires a [subscription](https://www.lightbend.com/platform/subscription).

The easiest way to integrate Lightbend Monitoring with Datadog is to use the [Datadog plugin](https://developer.lightbend.com/docs/monitoring/2.3.x/plugins/datadog/datadog.html).

By default, Lightbend Monitoring sends all metrics over the wire, but it is possible to limit fields reported via configuration (see example below).

The Datadog plugin uses a default configuration that can be overriden: 
          
```
cinnamon.datadog {
  statsd {
    host = "192.168.0.1"
    port = 8888
    frequency = 60s
  }

  report {
    histogram = ["min", "max", "p98", "p99", "p999"]
  }
}
```

The configuration values explained:

* `cinnamon.datadog.statsd.host`: IP address of your DogStatsD instance.

* `cinnamon.datadog.statsd.port`: port number of your DogStatsD instance.

* `cinnamon.datadog.statsd.frequency`: the frequency with with data is pushed from Cinnamon to the DogStatsD instance.

* `cinnamon.datadog.report.histogram`: instruction for how to filter histogram data sent to DogStatsD. In the above example only `max` and `p99` will be sent.


Please see the [Lightbend Monitoring documentation](https://developer.lightbend.com/docs/monitoring/2.3.x/home.html) for more details on configuration.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The Lightbend Reactive Platform integration does not include any event at this time.

### Service Checks
The Lightbend Reactive Platform integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

