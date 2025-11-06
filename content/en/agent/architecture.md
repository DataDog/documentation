---
title: Agent Architecture
description: Overview of Datadog Agent architecture including main processes, components like the Collector and Forwarder, and port configurations.
disable_toc: false
further_reading:
- link: "/agent/supported_platforms/"
  tag: "Documentation"
  text: "Supported Platforms"
- link: "/agent/configuration/"
  tag: "Documentation"
  text: "Agent Configuration"
---

## Agent architecture

Agent 6 and 7 are composed of a main process responsible for collecting infrastructure metrics and logs, and receiving [DogStatsD metrics][1]. The main components to this process are:

* The Collector, which runs checks and collects metrics.
* The Forwarder, which sends payloads to Datadog.

Two optional processes are spawned by the Agent if enabled in the `datadog.yaml` configuration file:

* The APM Agent is a process that collects [traces][2]. It is enabled by default.
* The Process Agent is a process that collects live process information. By default, the Process Agent only collects available containers, otherwise it is disabled.

On Windows the services are listed as:

| Service               | Description           |
|-----------------------|-----------------------|
| DatadogAgent          | Datadog Agent         |
| datadog-trace-agent   | Datadog Trace Agent   |
| datadog-process-agent | Datadog Process Agent |

By default the Agent binds three [ports][3] on Linux and four ports on Windows and macOS:

| Port | Description                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 5000 | Exposes runtime metrics about the Agent.                                                    |
| 5001 | Used by the Agent CLI and GUI to send commands and pull information from the running Agent. |
| 5002 | Serves the GUI server on Windows and macOS.                                                   |
| 8125 | Used for the DogStatsD server to receive external metrics.                                  |

For information on configuring the ports, see [Network Traffic][4].

### Collector

The collector gathers all standard metrics every 15 seconds. Agent 6 embeds a Python 2.7 interpreter to run integrations and [custom checks][5].

### Forwarder

The Agent forwarder sends metrics over HTTPS to Datadog. Buffering prevents network splits from affecting metrics reporting. Metrics are buffered in memory until a limit in size or number of outstanding send requests is reached. Afterward, the oldest metrics are discarded to keep the forwarder's memory footprint manageable. Logs are sent to Datadog over an SSL-encrypted TCP connection.

### DogStatsD

In Agent 6, DogStatsD is a Golang implementation of [Etsy's StatsD][6] metric aggregation daemon. DogStatsD receives and rolls up arbitrary metrics over UDP or a UNIX socket, allowing custom code to be instrumented without adding latency. Learn more about [DogStatsD][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/custom_metrics/dogstatsd_metrics_submission/#metrics
[2]: /tracing/guide/terminology/
[3]: /agent/configuration/network/#open-ports
[4]: /agent/configuration/network#configure-ports
[5]: /developers/custom_checks/write_agent_check/
[6]: https://github.com/etsy/statsd
[7]: /metrics/custom_metrics/dogstatsd_metrics_submission/