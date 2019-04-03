---
title: Agent
kind: documentation
description: Install & configure the Agent to collect data
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing/"
  tag: "Documentation"
  text: "Collect your traces"
- link: "agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/"
  tag: "Documentation"
  text: "Why Install the Agent on AWS Instances?"
- link: "https://www.datadoghq.com/blog/dont-fear-the-agent/"
  tag: "Blog"
  text: "Don't fear the Agent"
aliases:
  - /agent/faq/agent-check-directory-structure
  - /agent/faq/install-core-extra/
---

<div class="alert alert-info">
Agent v6 is available. <a href="/agent/faq/upgrade-to-agent-v6">Upgrade to the newest version</a> to benefit from all new functionality.
</div>

## What is the Agent?

The Datadog Agent is software that runs on your hosts. It collects events and metrics from hosts and sends them to Datadog, where you can analyze your monitoring and performance data. The Datadog Agent is open-source, and its source code is available on GitHub at [DataDog/datadog-agent][1].

{{< partial name="platforms/platforms.html" >}}

## Agent Architecture

{{< tabs >}}
{{% tab "Agent v6" %}}

Agent v6 is a complete rewrite in Go of the Agent v5. V6 offers better performances, smaller footprint, and more features. It is the default Datadog Agent (v5 is no longer in active development).

Agent v6 is a composed of a main process responsible for collecting infrastructure metrics, logs, and receiving [DogStatsD metrics][1]. The main components to this process are:

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


[1]: /developers/dogstatsd/data_types/#metrics
[2]: /tracing/guide/terminology
[3]: /agent/guide/network/?tab=agentv6#open-ports
[4]: /developers/write_agent_check/?tab=agentv6
[5]: https://github.com/etsy/statsd
[6]: /developers/dogstatsd
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

### The Collector
The collector gathers all standard metrics every 15 seconds. It also supports the execution of python-based, user-provided checks, stored in `/etc/dd-agent/checks.d`. User-provided checks must inherit from the AgentCheck abstract class defined in `checks/init.py`. See [Writing a custom Agent check][6] for more details.

### The Forwarder
The Agent forwarder listens for incoming requests over HTTP to send metrics over HTTPS to Datadog. Buffering prevents network splits from affecting metric reporting. Metrics are buffered in memory until a limit in size or number of outstanding send requests are reached. Afterwards, the oldest metrics are discarded to keep the forwarder's memory footprint manageable.

### DogStatsD
DogStatsD is a python implementation of [Etsy's StatsD][7] metric aggregation daemon. It is used to receive and roll up arbitrary metrics over UDP, thus allowing custom code to be instrumented without adding latency to the mix. Learn more about [DogStatsD][8].


[1]: /integrations
[2]: /developers/metrics/custom_metrics
[3]: /agent/guide/network/?tab=agentv5v4#open-ports
[4]: /agent/proxy/?tab=agentv5
[5]: /agent/faq/network
[6]: /developers/write_agent_check/?tab=agentv5
[7]: https://github.com/etsy/statsd
[8]: /developers/dogstatsd
{{% /tab %}}
{{< /tabs >}}

## CLI

The new command line interface for the Agent v6 is sub-command based:

| Command           | Notes                                                                      |
|-------------------|----------------------------------------------------------------------------|
| `check`           | Run the specified check                                                    |
| `configcheck`     | Print all configurations loaded & resolved of a running Agent              |
| `diagnose`        | Execute some connectivity diagnosis on your system                         |
| `flare`           | Collect a flare and send it to Datadog                                     |
| `health`          | Print the current Agent health                                             |
| `help`            | Help about any command                                                     |
| `hostname`        | Print the hostname used by the Agent                                       |
| `import`          | Import and convert configuration files from previous versions of the Agent |
| `installservice`  | Installs the Agent within the service control manager                      |
| `launch-gui`      | Starts the Datadog Agent GUI                                               |
| `regimport`       | Import the registry settings into datadog.yaml                             |
| `remove-service`  | Removes the Agent from the service control manager                         |
| `restart-service` | Restarts the Agent within the service control manager                      |
| `start`           | Start the Agent                                                            |
| `start-service`   | Starts the Agent within the service control manager                        |
| `status`          | Print the current status                                                   |
| `stopservice`     | Stops the Agent within the service control manager                         |
| `version`         | Print the version info                                                     |


To run a sub-command, first invoke the Agent binary.
```
<path_to_agent_bin> <sub_command> <options>
```

Some options have their own set of flags and options detailed in a help message. For example, to see how to use the `check` sub-command, run:
```
<agent_binary> check --help
```

## GUI

You can configure the port on which the GUI runs in the `datadog.yaml` file. To disable the GUI, set the port's value to `-1`.
For Windows and macOS, the GUI is enabled by default and runs on port `5002`. For Linux, the GUI is disabled by default.

When the Agent is running, use the `datadog-agent launch-gui` command to open the GUI in your default web browser.

**Note**: The Agent GUI isn't supported on 32-bit Windows platforms.

### Requirements

1. Cookies must be enabled in your browser. The GUI generates and saves a token in your browser which is used for authenticating all communications with the GUI server.

2. To start the GUI, the user must have the required permissions. If you are able to open `datadog.yaml`, you are able to use the GUI.

3. For security reasons, the GUI can **only** be accessed from the local network interface (```localhost```/```127.0.0.1```), therefore you must be on the same host that the Agent is running. That is, you can't run the Agent on a VM or a container and access it from the host machine.

## Supported OS versions

{{< tabs >}}
{{% tab "Agent v6" %}}

| OS                                | Supported versions                                |
|-----------------------------------|---------------------------------------------------|
| [Amazon][1]                       | Amazon Linux 2                                    |
| [Debian x86_64][2]                | Debian 7 (wheezy)+ and SysVinit in Agent 6.6.0+)  |
| [Ubuntu x86_64][3]                | Ubuntu 14.04+                                     |
| [RedHat/CentOS x86_64][4]         | RedHat/CentOS 6+                                  |
| [Docker][5]                       | Version 1.12+                                     |
| [Kubernetes][6]                   | Version 1.3+                                      |
| [SUSE Enterprise Linux x86_64][7] | SUSE 11 SP4+ (not SysVinit)                       |
| [Fedora x86_64][8]                | Fedora 26+                                        |
| [macOS][9]                        | macOS 10.12+                                      |
| [Windows server 64-bit][10]       | Windows Server 2008r2+ and Server Core (not Nano) |
| [Windows 64-bit][10]              | Windows 7+                                        |

**Note**: [Source][11] install may work on operating systems not listed here and is supported on a best effort basis.

[1]: /agent/basic_agent_usage/amazonlinux/?tab=agentv6
[2]: /agent/basic_agent_usage/deb
[3]: /agent/basic_agent_usage/ubuntu
[4]: /agent/basic_agent_usage/redhat
[5]: /agent/docker
[6]: /agent/basic_agent_usage/kubernetes
[7]: /agent/basic_agent_usage/suse
[8]: /agent/basic_agent_usage/fedora
[9]: /agent/basic_agent_usage/osx
[10]: /agent/basic_agent_usage/windows
[11]: /agent/basic_agent_usage/source
{{% /tab %}}
{{% tab "Agent v5" %}}

| OS                                | Supported versions     |
|-----------------------------------|------------------------|
| [Amazon][1]                       | Amazon Linux 2         |
| [Debian x86_64][2]                | Debian 7 (wheezy)+     |
| [Ubuntu x86_64][3]                | Ubuntu 12.04+          |
| [RedHat/CentOS x86_64][4]         | RedHat/CentOS 5+       |
| [Docker][5]                       | Version 1.12+          |
| [Kubernetes][6]                   | Version 1.3+           |
| [SUSE Enterprise Linux x86_64][7] | SUSE 11 SP4+           |
| [Fedora x86_64][8]                | Fedora 26+             |
| [MacOS][9]                        | macOS 10.10+           |
| [Windows server 64-bit][10]       | Windows server 2008r2+ |
| [Windows 64-bit][10]              | Windows 7+             |

**Note**: [Source][11] install may work on operating systems not listed here and is supported on a best effort basis.


[1]: /agent/basic_agent_usage/amazonlinux/?tab=agentv5
[2]: /agent/basic_agent_usage/deb
[3]: /agent/basic_agent_usage/ubuntu
[4]: /agent/basic_agent_usage/redhat
[5]: /agent/docker
[6]: /agent/basic_agent_usage/kubernetes
[7]: /agent/basic_agent_usage/suse
[8]: /agent/basic_agent_usage/fedora
[9]: /agent/basic_agent_usage/osx
[10]: /agent/basic_agent_usage/windows
[11]: /agent/basic_agent_usage/source
{{% /tab %}}
{{< /tabs >}}

## Agent Overhead

An example of the Datadog Agent resource consumption is below. Tests were made on an AWS EC2 machine `c5.xlarge` instance (4 VCPU/ 8GB RAM). The vanilla `datadog-agent` was running with a process check to monitor the Agent itself. Enabling more integrations may increase Agent resource consumption.
Enabling JMX Checks forces the Agent to use more memory depending on the number of beans exposed by the monitored JVMs. Enabling the trace and process Agents increases the resource consumption as well.

{{< tabs >}}
{{% tab "Agent v6" %}}

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
