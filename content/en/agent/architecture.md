---
title: Agent Architecture
kind: Documentation
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

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

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

[1]: /metrics/custom_metrics/dogstatsd_metrics_submission/#metrics
[2]: /tracing/guide/terminology/
[3]: /agent/configuration/network/#open-ports
[4]: /agent/configuration/network#configure-ports
[5]: /developers/custom_checks/write_agent_check/
[6]: https://github.com/etsy/statsd
[7]: /metrics/custom_metrics/dogstatsd_metrics_submission/
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/agent5architecture.jpg" alt="Agent v5 Architecture" >}}

Agent 5 is composed of four major components, each written in Python and running as a separate process:

* **Collector** (`agent.py`): The collector runs checks on the current machine for configured [integrations][1], and captures system metrics, such as memory and CPU.
* **DogStatsD** (`dogstatsd.py`): This is a StatsD-compatible backend server that you can send [custom metrics][2] to from your applications.
* **Forwarder** (`ddagent.py`): The forwarder retrieves data from both DogStatsD and the collector, queues it for submission, and then sends it to Datadog.
* **SupervisorD**: The collector, DogStatsD server, and forwarder are all controlled by a single supervisor process. The supervisor is kept separate to limit the overhead of each application if you aren't running all parts. However, it is generally recommended to run all parts.

**Note**: For Windows users, all four Agent processes appear as instances of `ddagent.exe` with the description `DevOps' best friend`.

### Supervision, privileges, and network ports

A SupervisorD primary process runs as the `dd-agent` user, and all forked subprocesses run as the same user. This also applies to any system call (`iostat`/`netstat`) initiated by the Datadog Agent. The Agent configuration resides at `/etc/dd-agent/datadog.conf` and `/etc/dd-agent/conf.d`. All configuration must be readable by `dd-agent`. The recommended permissions are `0600`, since configuration files contain your API key and other credentials needed to access metrics.

The following [ports][3] are open for operations:

| Port      | Description                         |
|-----------|-------------------------------------|
| tcp/17123 | The forwarder for normal operations |
| tcp/17124 | The forwarder for graphite support  |
| udp/8125  | DogStatsD                           |

All listening processes are bound by default to `127.0.0.1` and/or `::1` on Agent versions 3.4.1 or later. In earlier versions, they were bound to `0.0.0.0` (all interfaces). For information on running the Agent through a proxy, see [Agent proxy configuration][4]. For information on IP ranges to allow, see [Network Traffic][5].

The recommended number of open file descriptors is 1024. You can see this value with the command `ulimit -a`. If you have a hard limitation below the recommended value, for example Shell Fork Bomb Protection, one solution is to add the following in `supervisord.conf`:

```conf
[supervisord]
minfds = 100  # Your hard limit
```

[1]: /integrations/
[2]: /metrics/custom_metrics/
[3]: /agent/configuration/network/?tab=agentv5v4#open-ports
[4]: /agent/configuration/proxy/?tab=agentv5
[5]: /agent/faq/network/
{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}