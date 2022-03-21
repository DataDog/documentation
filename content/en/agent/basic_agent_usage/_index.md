---
title: Basic Agent Usage
kind: documentation
aliases:
    - /guides/basic_agent_usage/
    - /agent/faq/where-is-the-configuration-file-for-the-agent/
    - /agent/faq/log-location
further_reading:
- link: "/agent/faq/how-datadog-agent-determines-the-hostname/"
  tag: "FAQ"
  text: "How does Datadog determine the Agent hostname?"
- link: "/agent/guide/agent-commands/"
  tag: "FAQ"
  text: "List of all Agent commands"
- link: "/agent/guide/agent-configuration-files/"
  tag: "FAQ"
  text: "Location of all Agent configuration files"
---

{{< partial name="platforms/platforms.html" links="platforms" >}}

## Agent architecture

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

Agent v6 and v7 are composed of a main process responsible for collecting infrastructure metrics, logs, and receiving [DogStatsD metrics][1]. The main components to this process are:

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

### Collector

The collector gathers all standard metrics every 15 seconds. Agent v6 embeds a Python 2.7 interpreter to run integrations and [custom checks][4].

### Forwarder

The Agent forwarder send metrics over HTTPS to Datadog. Buffering prevents network splits from affecting metric reporting. Metrics are buffered in memory until a limit in size or number of outstanding send requests are reached. Afterwards, the oldest metrics are discarded to keep the forwarder's memory footprint manageable. Logs are sent over an SSL-encrypted TCP connection to Datadog.

### DogStatsD

In v6, DogStatsD is a Golang implementation of [Etsy's StatsD][5] metric aggregation daemon. It is used to receive and roll up arbitrary metrics over UDP or Unix socket, thus allowing custom code to be instrumented without adding latency. Learn more about [DogStatsD][6].

[1]: /metrics/dogstatsd_metrics_submission/#metrics
[2]: /tracing/guide/terminology/
[3]: /agent/guide/network/#open-ports
[4]: /developers/custom_checks/write_agent_check/
[5]: https://github.com/etsy/statsd
[6]: /metrics/dogstatsd_metrics_submission/
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/agent5architecture.jpg" alt="Agent v5 Architecture" >}}

Agent v5 is composed of four major components, each written in Python running as a separate process:

* **Collector** (`agent.py`): The collector runs checks on the current machine for configured [integrations][1], and captures system metrics, such as memory and CPU.
* **DogStatsD** (`dogstatsd.py`): This is a StatsD-compatible backend server that you can send [custom metrics][2] to from your applications.
* **Forwarder** (`ddagent.py`): The forwarder retrieves data from both DogStatsD and the collector, queues it up, and then sends it to Datadog.
* **SupervisorD**: This is all controlled by a single supervisor process. It is kept separate to limit the overhead of each application if you aren't running all parts. However, it is generally recommended to run all parts.

**Note**: For Windows users, all four Agent processes appear as instances of `ddagent.exe` with the description `DevOps’ best friend`.

### Supervision, privileges, and network ports

A SupervisorD primary process runs as the `dd-agent` user, and all forked subprocesses run as the same user. This also applies to any system call (`iostat`/`netstat`) initiated by the Datadog Agent. The Agent configuration resides at `/etc/dd-agent/datadog.conf` and `/etc/dd-agent/conf.d`. All configuration must be readable by `dd-agent`. The recommended permissions are 0600 since configuration files contain your API key and other credentials needed to access metrics.

The following [ports][3] are open for operations:

| Port      | Description                         |
|-----------|-------------------------------------|
| tcp/17123 | The forwarder for normal operations |
| tcp/17124 | The forwarder for graphite support  |
| udp/8125  | DogStatsD                           |

All listening processes are bound by default to `127.0.0.1` and/or `::1` on v3.4.1+ of the Agent. In earlier versions, they were bound to `0.0.0.0` (all interfaces). For information on running the Agent through a proxy see [Agent proxy configuration][4]. For information on IP ranges to allow, see [Network Traffic][5].

The recommended number of open file descriptors is 1024. You can see this value with the command `ulimit -a`. If you have a hard limitation below the recommended value, for example Shell Fork Bomb Protection, one solution is to add the following in `supervisord.conf`:

```conf
[supervisord]
minfds = 100  # Your hard limit
```

[1]: /integrations/
[2]: /metrics/custom_metrics/
[3]: /agent/guide/network/?tab=agentv5v4#open-ports
[4]: /agent/proxy/?tab=agentv5
[5]: /agent/faq/network/
{{% /tab %}}
{{< /tabs >}}

## GUI

You can configure the port on which the GUI runs in the `datadog.yaml` file. To disable the GUI, set the port's value to `-1`. For Windows and macOS, the GUI is enabled by default and runs on port `5002`. For Linux, the GUI is disabled by default.

When the Agent is running, use the `datadog-agent launch-gui` command to open the GUI in your default web browser.

**Note**: The Agent GUI isn't supported on 32-bit Windows platforms.

### Requirements

1. Cookies must be enabled in your browser. The GUI generates and saves a token in your browser which is used for authenticating all communications with the GUI server.

2. To start the GUI, the user must have the required permissions. If you are able to open `datadog.yaml`, you are able to use the GUI.

3. For security reasons, the GUI can **only** be accessed from the local network interface (`localhost`/`127.0.0.1`), therefore you must be on the same host that the Agent is running. That is, you can't run the Agent on a VM or a container and access it from the host machine.

## Supported platforms

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| Platform                                 | Supported versions                                        |
|------------------------------------------|-----------------------------------------------------------|
| [Amazon Linux][1]                        | Amazon Linux 2                                            |
| [Debian][2] with systemd                 | Debian 7 (wheezy)+                                        |
| [Debian][2] with SysVinit                | Debian 7 (wheezy)+ in Agent 6.6.0+                        |
| [Ubuntu][3]                              | Ubuntu 14.04+                                             |
| [RedHat/CentOS/AlmaLinux/Rocky][4]       | RedHat/CentOS 6+, AlmaLinux/Rocky 8+ in Agent 6.33.0+/7.33.0+ |
| [Docker][5]                              | Version 1.12+                                             |
| [Kubernetes][6]                          | Version 1.3+                                              |
| [SUSE Enterprise Linux][7] with systemd  | SUSE 11 SP4+ in Agent < 6.33.0/7.33.0, SUSE 12+ in Agent 6.33.0+/7.33.0+                     |
| [SUSE Enterprise Linux][7] with SysVinit | SUSE 11 SP4 in Agent 6.16.0/7.16.0 - 6.33.0/7.33.0        |
| [OpenSUSE][7] with systemd               | OpenSUSE 15+ in Agent 6.33.0+/7.33.0+                     |
| [Fedora][8]                              | Fedora 26+                                                |
| [macOS][9]                               | macOS 10.12+                                              |
| [Windows Server][10]                     | Windows Server 2008 R2+ (including Server Core)           |
| [Windows][10]                            | Windows 7+                                                |
| [Windows Azure Stack HCI OS][10]         | All Versions                                              |

**Notes**: 
- 64-bit x86 packages are available for all platforms on the list. Arm v8 packages are available for all platforms except Windows and MacOS.
- [Source][11] install may work on operating systems not listed here and is supported on a best effort basis.
- Datadog Agent v6+ supports Windows Server 2008 R2 with the most recent Windows updates installed. There is also a [known issue with clock drift and Go][12] that affects Windows Server 2008 R2.

[1]: /agent/basic_agent_usage/amazonlinux/
[2]: /agent/basic_agent_usage/deb/
[3]: /agent/basic_agent_usage/ubuntu/
[4]: /agent/basic_agent_usage/redhat/
[5]: /agent/docker/
[6]: /agent/basic_agent_usage/kubernetes/
[7]: /agent/basic_agent_usage/suse/
[8]: /agent/basic_agent_usage/fedora/
[9]: /agent/basic_agent_usage/osx/
[10]: /agent/basic_agent_usage/windows/
[11]: /agent/basic_agent_usage/source/
[12]: https://github.com/golang/go/issues/24489
{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform                   | Supported versions     |
|----------------------------|------------------------|
| [Amazon Linux][1]          | Amazon Linux 2         |
| [Debian][2]                | Debian 7 (wheezy)+     |
| [Ubuntu][3]                | Ubuntu 12.04+          |
| [RedHat/CentOS][4]         | RedHat/CentOS 5+       |
| [Docker][5]                | Version 1.12+          |
| [Kubernetes][6]            | Version 1.3 to 1.8     |
| [SUSE Enterprise Linux][7] | SUSE 11 SP4+           |
| [Fedora][8]                | Fedora 26+             |
| [MacOS][9]                 | macOS 10.10+           |
| [Windows Server][10]       | Windows Server 2008r2+ |
| [Windows][10]              | Windows 7+             |

**Notes**:

- [Source][11] install may work on operating systems not listed here and is supported on a best effort basis.

[1]: /agent/basic_agent_usage/amazonlinux/?tab=agentv5
[2]: /agent/basic_agent_usage/deb/
[3]: /agent/basic_agent_usage/ubuntu/
[4]: /agent/basic_agent_usage/redhat/
[5]: /agent/docker/
[6]: /agent/basic_agent_usage/kubernetes/
[7]: /agent/basic_agent_usage/suse/
[8]: /agent/basic_agent_usage/fedora/
[9]: /agent/basic_agent_usage/osx/
[10]: /agent/basic_agent_usage/windows/
[11]: /agent/basic_agent_usage/source/
{{% /tab %}}
{{% tab "Unix Agent" %}}

| Platform | Supported versions                        |
|----------|-------------------------------------------|
| [AIX][1] | AIX 6.1 TL9 SP6, 7.1 TL5 SP3, 7.2 TL3 SP0 |

[1]: /agent/basic_agent_usage/aix/
{{% /tab %}}
{{< /tabs >}}

## CLI

With Agent v6+, the command line interface is based on subcommands. To run a subcommand, first invoke the Agent binary:

```text
<AGENT_BIN_PATH> <SUB_COMMAND> <OPTIONS>
```

| Subcommand        | Notes                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | Run the specified check.                                                    |
| `configcheck`     | Print all configurations loaded & resolved of a running Agent.              |
| `diagnose`        | Execute connectivity diagnosis on your system.                              |
| `flare`           | [Collect a flare and send it to Datadog][1].                                |
| `health`          | Print the current Agent health.                                             |
| `help`            | Help about any command.                                                     |
| `hostname`        | Print the hostname used by the Agent.                                       |
| `import`          | Import and convert configuration files from previous versions of the Agent. |
| `installservice`  | Install the Agent within the service control manager.                       |
| `launch-gui`      | Start the Datadog Agent GUI.                                                |
| `regimport`       | Import the registry settings into `datadog.yaml`.                           |
| `remove-service`  | Remove the Agent from the service control manager.                          |
| `restart`         | [Restart the Agent][2].                                                     |
| `restart-service` | Restart the Agent within the service control manager.                       |
| `start`           | [Start the Agent][3].                                                       |
| `start-service`   | Start the Agent within the service control manager.                         |
| `status`          | [Print the current Agent status][4].                                        |
| `stop`            | [Stop the Agent][5].                                                        |
| `stopservice`     | Stop the Agent within the service control manager.                          |
| `version`         | Print version info.                                                         |

**Note**: Some options have their own set of flags and options detailed in a help message. For example, to see how to use the `check` subcommand, run:

```text
<AGENT_BIN_PATH> check --help
```

## Agent overhead

An example of the Datadog Agent resource consumption is below. Tests were made on an AWS EC2 machine `c5.xlarge` instance (4 VCPU/ 8GB RAM) and comparable performance was seen for ARM64-based instances with similar resourcing. The vanilla `datadog-agent` was running with a process check to monitor the Agent itself. Enabling more integrations may increase Agent resource consumption.
Enabling JMX Checks forces the Agent to use more memory depending on the number of beans exposed by the monitored JVMs. Enabling the trace and process Agents increases the resource consumption as well.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

* Agent Test version: 6.7.0
* CPU: ~ 0.12% of the CPU used on average
* Memory: ~ 60MB of RAM used (RSS memory)
* Network bandwidth: ~ 86 B/s ▼ | 260 B/s ▲
* Disk:
  * Linux 350MB to 400MB depending on the distribution
  * Windows: 260MB

{{% /tab %}}
{{% tab "Agent v5" %}}

* Agent Test version: 5.24.0
* CPU: ~ 0.35% of the CPU used on average
* Memory: ~ 115MB of RAM used.
* Network bandwidth: ~ 1900 B/s ▼ | 800 B/s ▲
* Disk:
  * Linux 312MB
  * Windows: 295MB

**Note**: Since v5.15 of the container Agent, it is recommended to set container resources to at least 256MB due to an added memory cache -- upping the limit is not to account for baseline usage but rather to accommodate temporary spikes. Agent 6 has a much more limited memory footprint.

{{% /tab %}}
{{< /tabs >}}

**Log collection**:

The results below are obtained from a collection of *110KB of logs per seconds* from a file with the [HTTP forwarder][6] enabled. It shows the evolution of resource usage for the different compression levels available.

{{< tabs >}}
{{% tab "HTTP compression level 6" %}}

* Agent Test version: 6.15.0
* CPU: ~ 1.5% of the CPU used on average
* Memory: ~ 95MB of RAM used.
* Network bandwidth: ~ 14 KB/s ▲
* Disk:
  * Linux 350MB to 400MB depending on the distribution
  * Windows: 260MB

{{% /tab %}}
{{% tab "HTTP compression level 1" %}}

* Agent Test version: 6.15.0
* CPU: ~ 1% of the CPU used on average
* Memory: ~ 95MB of RAM used.
* Network bandwidth: ~ 20 KB/s ▲
* Disk:
  * Linux 350MB to 400MB depending on the distribution
  * Windows: 260MB

{{% /tab %}}
{{% tab "HTTP Uncompressed" %}}

* Agent Test version: 6.15.0
* CPU: ~ 0.7% of the CPU used on average
* Memory: ~ 90MB of RAM used (RSS memory)
* Network bandwidth: ~ 200 KB/s ▲
* Disk:
  * Linux 350MB to 400MB depending on the distribution
  * Windows: 260MB

{{% /tab %}}
{{< /tabs >}}

## Getting further with the Datadog Agent

### Update the Agent

To manually update the Datadog Agent core between two minor versions on a given host, run the [corresponding install command for your platform][7].

Note: If you want to manually update one specific Agent integration see the [Integration Management guide][8].

### Configuration files

See the [Agent configuration files documentation][9].

### Datadog site

Edit the [Agent's main configuration file][10], `datadog.yaml`, to set the `site` parameter (defaults to `datadoghq.com`).

```yaml
site: {{< region-param key="dd_site" >}}
```

### Log location

See the [Agent log files documentation][11].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/troubleshooting/send_a_flare/
[2]: /agent/guide/agent-commands/#restart-the-agent
[3]: /agent/guide/agent-commands/#start-the-agent
[4]: /agent/guide/agent-commands/#service-status
[5]: /agent/guide/agent-commands/#stop-the-agent
[6]: /agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings#agent
[8]: /agent/guide/integration-management/
[9]: /agent/guide/agent-configuration-files/
[10]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[11]: /agent/guide/agent-log-files/
