---
title: Agent Version differences
kind: documentation
further_reading:
- link: "agent/faq/how-datadog-agent-determines-the-hostname"
  tag: "FAQ"
  text: "How does Datadog determine the Agent hostname?"
- link: "agent/guide/agent-commands"
  tag: "FAQ"
  text: "List of all Agent commands"
- link: "agent/guide/agent-configuration-files"
  tag: "FAQ"
  text: "Location of all Agent configuration files"
---

## Agent version 6 main changes

Agent 6 is the latest major version of the Datadog Agent. The big difference between Agent 5 and Agent 6 is that Agent 6 is a complete rewrite of the core Agent in Golang. Golang has allowed the Agent to take advantage of concurrency. In place of the three processes the Agent v5 used to run—*the Forwarder*, *the Collector*, and *DogStatsD*—there is now only one process: *the Agent*. It also comes with a number of other core improvements:

* Agent v6 has significantly improved resource usage over Agent v5:
  * It has decreased CPU usage
  * It has decrease memory usage
  * It uses fewer file descriptors
  * It has an all around decreased footprint

* Agent 6 uses [two additional ports][1]:
    * `5000` to expose its runtime metrics.
    * `5001` for the [Agent CLI/GUI commands][2].

    **Note**: You can specify different ports for `expvar_port` and `cmd_port` in the `datadog.yaml` file.

* Custom build your Agent v6 and [DogStatsD][3] much easier and with many more configuration options, to include or exclude almost anything.

### Agent v6 new functionalities

To see all changes between Agent v5 and v6, consult the [Datadog Agent dedicated changes][4] documentation, but here are the key differentiators:

* [Distributions metrics][5] can be performed on the server directly to calculate real, effective global percentiles. (NOTE: this feature is in BETA. Contact support for details on how to have it enabled for your account.)

* [DogStatsD][3] can be used over a Unix socket instead of over UDP.

* [Live Process monitoring is available for Windows][6].

* [Prometheus OpenMetrics is supported natively][7].

* [All your logs can be sent to Datadog for alerting, analysis, and correlation with metrics][8].


[1]: /agent/#agent-architecture
[2]: /agent/guide/agent-commands
[3]: /developers/dogstatsd/unix_socket
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md
[5]: /developers/metrics/types
[6]: /graphing/infrastructure/process
[7]: https://www.datadoghq.com/blog/monitor-prometheus-metrics
[8]: /logs
