---
description: Track actors and dispatcher events for Akka-based applications
git_integration_title: lightbendrp
integration_title: Lightbend Reactive Platform
kind: integration
newhlevel: true
placeholder: true
title: Datadog-Lightbend Reactive Platform Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

{{< img src="integrations/lightbendrp/dashboard_lightbendrp.png" alt="lightbendrp Dashboard" >}}

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

The following metrics are collected for Lightbend Reactive Platform:

{{< get-metrics-from-git >}}
