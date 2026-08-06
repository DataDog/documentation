---
title: Agent 5 architecture
disable_toc: false
private: true
---

This page covers Agent 5 architecture. To find out about architecture for the latest version of the Agent, see [Agent Architecture][1].

{{< img src="agent/agent5architecture.jpg" alt="Agent v5 Architecture" >}}

Agent 5 is composed of four major components, each written in Python and running as a separate process:

* **Collector** (`agent.py`): The collector runs checks on the current machine for configured [integrations][2], and captures system metrics, such as memory and CPU.
* **DogStatsD** (`dogstatsd.py`): This is a StatsD-compatible backend server that you can send [custom metrics][3] to from your applications.
* **Forwarder** (`ddagent.py`): The forwarder retrieves data from both DogStatsD and the collector, queues it for submission, and then sends it to Datadog.
* **SupervisorD**: The collector, DogStatsD server, and forwarder are all controlled by a single supervisor process. The supervisor is kept separate to limit the overhead of each application if you aren't running all parts. However, it is generally recommended to run all parts.

**Note**: For Windows users, all four Agent processes appear as instances of `ddagent.exe` with the description `DevOps' best friend`.

### Supervision, privileges, and network ports

A SupervisorD primary process runs as the `dd-agent` user, and all forked subprocesses run as the same user. This also applies to any system call (`iostat`/`netstat`) initiated by the Datadog Agent. The Agent configuration resides at `/etc/dd-agent/datadog.conf` and `/etc/dd-agent/conf.d`. All configuration must be readable by `dd-agent`. The recommended permissions are `0600`, since configuration files contain your API key and other credentials needed to access metrics.

The following [ports][4] are open for operations:

| Port      | Description                         |
|-----------|-------------------------------------|
| tcp/17123 | The forwarder for normal operations |
| tcp/17124 | The forwarder for graphite support  |
| udp/8125  | DogStatsD                           |

All listening processes are bound by default to `127.0.0.1` or `::1` or both, on Agent versions 3.4.1 or later. In earlier versions, they were bound to `0.0.0.0` (all interfaces). For information on running the Agent through a proxy, see [Agent proxy configuration][5]. For information on IP ranges to allow, see [Network Traffic][6].

The recommended number of open file descriptors is 1024. You can see this value with the command `ulimit -a`. If you have a hard limitation below the recommended value, for example Shell Fork Bomb Protection, one solution is to add the following in `supervisord.conf`:

```conf
[supervisord]
minfds = 100  # Your hard limit
```

[1]: /agent/architecture
[2]: /integrations/
[3]: /metrics/custom_metrics/
[4]: /agent/configuration/network/?tab=agentv5v4#open-ports
[5]: /agent/configuration/proxy/?tab=agentv5
[6]: /agent/faq/network/