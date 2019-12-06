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


## Agent Major version main changes


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


## Agent Architectures

{{< tabs >}}
{{% tab "Agent v6" %}}

Agent v6 is a complete rewrite in Go of the Agent v5. V6 offers better performances, smaller footprint, and more features. It is the default Datadog Agent (v5 is no longer in active development).

Agent v6 is composed of a main process responsible for collecting infrastructure metrics, logs, and receiving [DogStatsD metrics][1]. The main components to this process are:

* The Collector is in charge of running checks and collecting metrics.
* The Forwarder sends payloads to Datadog.

Two optional processes are spawned by the Agent if enabled in the `datadog.yaml` configuration file:

* The APM Agent is a process to collect [traces][2] (enabled by default).
* The Process Agent is a process to collect live process information. By default, it only collects available containers, otherwise it is disabled.

On Windows the services are listed as:

| Service               | Description             |
|-----------------------|-------------------------|
| DatadogAgent          | “Datadog Agent”         |
| datadog-trace-agent   | “Datadog Trace Agent”   |
| datadog-process-agent | "Datadog Process Agent” |

By default the Agent binds 3 [ports][3] on Linux and 4 on Windows and OSX:

| Port | Description                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 5000 | Exposes runtime metrics about the Agent.                                                    |
| 5001 | Used by the Agent CLI and GUI to send commands and pull information from the running Agent. |
| 5002 | Serves the GUI server on Windows and OSX.                                                   |
| 8125 | Used for the DogStatsD server to receive external metrics.                                  |

### The Collector
The collector gathers all standard metrics every 15 seconds. Agent v6 embed a Python2.7 interpreter to run integrations and [custom checks][4].

### The Forwarder

The Agent forwarder send metrics over HTTPS to Datadog. Buffering prevents network splits from affecting metric reporting. Metrics are buffered in memory until a limit in size or number of outstanding send requests are reached. Afterwards, the oldest metrics are discarded to keep the forwarder's memory footprint manageable. Logs are sent over an SSL-encrypted TCP connection to Datadog.

### DogStatsD
In v6, DogStatsD is a Golang implementation of [Etsy's StatsD][5] metric aggregation daemon. It is used to receive and roll up arbitrary metrics over UDP or unix socket, thus allowing custom code to be instrumented without adding latency to the mix. Learn more about [DogStatsD][6].


[1]: /developers/metrics/dogstatsd_metrics_submission/#metrics
[2]: /tracing/guide/terminology
[3]: /agent/guide/network/?tab=agentv6#open-ports
[4]: /developers/write_agent_check/?tab=agentv6
[5]: https://github.com/etsy/statsd
[6]: /developers/metrics/dogstatsd_metrics_submission
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/agent5architecture.jpg" alt="Agent v5 Architecture" responsive="true">}}

Agent v5 is composed of four major components, each written in Python running as a separate process:

* **Collector** (`agent.py`): The collector runs checks on the current machine for configured [integrations][1], and captures system metrics, such as memory and CPU.
* **DogStatsD** (`dogstatsd.py`): This is a StatsD-compatible backend server that you can send [custom metrics][2] to from your applications.
* **Forwarder** (`ddagent.py`): The forwarder retrieves data from both DogStatsD and the collector, queues it up, and then sends it to Datadog.
* **SupervisorD**: This is all controlled by a single supervisor process. It is kept separate to limit the overhead of each application if you aren't running all parts. However, it is generally recommended to run all parts.

**Note**: For Windows users, all four Agent processes appear as instances of `ddagent.exe` with the description `DevOps’ best friend`.

### Supervision, Privileges, and Network Ports
A SupervisorD master process runs as the `dd-agent` user, and all forked subprocesses run as the same user. This also applies to any system call (`iostat`/`netstat`) initiated by the Datadog Agent. The Agent configuration resides at `/etc/dd-agent/datadog.conf` and `/etc/dd-agent/conf.d`. All configuration must be readable by `dd-agent`. The recommended permissions are 0600 since configuration files contain your API key and other credentials needed to access metrics.

The following [ports][3] are open for operations:

| Port      | Description                         |
|-----------|-------------------------------------|
| tcp/17123 | The forwarder for normal operations |
| tcp/17124 | The forwarder for graphite support  |
| udp/8125  | DogStatsD                           |


All listening processes are bound by default to `127.0.0.1` and/or `::1` on v3.4.1+ of the Agent. In earlier versions, they were bound to `0.0.0.0` (all interfaces). For information on running the Agent through a proxy see [Agent proxy configuration][4]. For information on IP ranges to allow, see [Network Traffic][5].

The recommended number of open file descriptors is 1024. You can see this value with the command `ulimit -a`. If you have a hard limitation below the recommended value, for example Shell Fork Bomb Protection, one solution is to add the following in `superisord.conf`:

```
[supervisord]
minfds = 100  # Your hard limit
```

[1]: /integrations
[2]: /developers/metrics/custom_metrics
[3]: /agent/guide/network/?tab=agentv5v4#open-ports
[4]: /agent/proxy/?tab=agentv5
[5]: /agent/faq/network
{{% /tab %}}
{{< /tabs >}}
