---
"categories":
- "cloud"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Akka ベースのアプリケーションのアクターおよびディスパッチャーイベントを追跡"
"doc_link": "https://docs.datadoghq.com/integrations/lightbendrp/"
"draft": false
"git_integration_title": "lightbendrp"
"has_logo": true
"integration_id": "lightbendrp"
"integration_title": "Lightbend"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "lightbendrp"
"public_title": "Datadog-Lightbend Integration"
"short_description": "Track actors and dispatcher events for Akka-based applications"
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/lightbendrp/dashboard_lightbendrp.png" alt="Lightbend Reactive Platform Dashboard" popup="true">}}

## Overview

Get metrics from your [Lightbend Reactive Platform application][1] in real time to:

- Visualize performance metrics of your actors.
- Track unexpected events (exceptions, unhandled messages, dead letters, a.s.o.).
- Get an insight into the remoting characteristics of your application.
- Drill down into dispatcher metrics to tune the application performance.

## Setup

### Installation

This integration uses Lightbend Monitoring which requires a [subscription][2].

The easiest way to integrate Lightbend Monitoring with Datadog is to use the [Datadog plugin][3].

By default, Lightbend Monitoring sends all metrics over the wire, but it is possible to limit fields reported with the configuration (see the example below).

The Datadog plugin uses a default configuration that can be overridden:

```text
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

- `cinnamon.datadog.statsd.host`: IP address of your DogStatsD instance.
- `cinnamon.datadog.statsd.port`: port number of your DogStatsD instance.
- `cinnamon.datadog.statsd.frequency`: the frequency that data is pushed from Cinnamon to the DogStatsD instance.
- `cinnamon.datadog.report.histogram`: instruction for how to filter histogram data sent to DogStatsD. In the above example only `max` and `p99` are sent.

See the [Lightbend Monitoring documentation][4] for more details on configuration.

## Data Collected

### Metrics
{{< get-metrics-from-git "lightbendrp" >}}


### Events

The Lightbend Reactive Platform integration does not include any events.

### Service Checks

The Lightbend Reactive Platform integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][6].

[1]: https://www.lightbend.com/platform
[2]: https://www.lightbend.com/platform/subscription
[3]: https://developer.lightbend.com/docs/monitoring/2.3.x/plugins/datadog/datadog.html
[4]: https://developer.lightbend.com/docs/monitoring/2.3.x/home.html
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/lightbendrp/lightbendrp_metadata.csv
[6]: https://docs.datadoghq.com/help/

