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
- link: "tracing"
  tag: "Documentation"
  text: "Collect your traces"
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

The Agent has three main parts: the **collector**, **DogStatsD**, and the **forwarder**:

* **Collector**: It runs checks on the current machine for configured [integrations][2], and captures system metrics, such as memory and CPU.
* **DogStatsD**: It is a StatsD-compatible backend server that you can send [custom metrics][3] to from your applications.
* **Forwarder**: It retrieves data from both DogStatsD and the collector, queues it up, and then sends it to Datadog.

## CLI

The new command line interface for the Agent v6 is sub-command based:

| Command           | Notes                                                                      |
| ---------------   | -------------------------------------------------------------------------- |
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

## Supported OSs versions

{{< tabs >}}
{{% tab "Agent v6" %}}

| OS                                 | Supported versions                                                  |
| :----                              | :----                                                               |
| [Debian x86_64][1]                 | Debian 7 (wheezy) and above (we support SysVinit in agent 6.6.0 and above) |
| [Ubuntu x86_64][2]                 | Ubuntu 14.04 and above                                              |
| [RedHat/CentOS x86_64][3]          | RedHat/CentOS 6 and above                                           |
| [Docker][4]                       | Version 1.12 and higher                                             |
| [Kubernetes][5]                   | Version 1.3 and higher                                              |
| [SUSE Enterprise Linux x86_64][6] | SUSE 11 SP4 and above (we do not support SysVinit)                  |
| [Fedora x86_64][7]                | Fedora 26 and above                                                 |
| [macOS][8]                        | macOS 10.12 and above                                               |
| [Windows server 64-bit][9]        | Windows server 2008r2 or above                                      |
| [Windows 64-bit][9]               | Windows 7 or above                                                  |

**Note**: [Source][10] install may work on operating systems not listed here and is supported on a best effort basis.


[1]: /agent/basic_agent_usage/deb
[2]: /agent/basic_agent_usage/ubuntu
[3]: /agent/basic_agent_usage/redhat
[4]: /agent/basic_agent_usage/docker
[5]: /agent/basic_agent_usage/kubernetes
[6]: /agent/basic_agent_usage/suse
[7]: /agent/basic_agent_usage/fedora
[8]: /agent/basic_agent_usage/osx
[9]: /agent/basic_agent_usage/windows
[10]: /agent/basic_agent_usage/source
{{% /tab %}}
{{% tab "Agent v5" %}}

| OS                                 | Supported versions             |
| :----                              | :----                          |
| [Debian x86_64][1]                 | Debian 7 (wheezy) and above    |
| [Ubuntu x86_64][2]                 | Ubuntu 12.04 and above         |
| [RedHat/CentOS x86_64][3]          | RedHat/CentOS 5 and above      |
| [Docker][4]                       | Version 1.12 and higher        |
| [Kubernetes][5]                   | Version 1.3 and higher         |
| [SUSE Enterprise Linux x86_64][6] | SUSE 11 SP4 and above          |
| [Fedora x86_64][7]                | Fedora 26 and above            |
| [MacOS][8]                        | macOS 10.10 and above          |
| [Windows server 64-bit][9]        | Windows server 2008r2 or above |
| [Windows 64-bit][9]               | Windows 7 or above             |

**Note**: [Source][10] install may work on operating systems not listed here and is supported on a best effort basis.


[1]: /agent/basic_agent_usage/deb
[2]: /agent/basic_agent_usage/ubuntu
[3]: /agent/basic_agent_usage/redhat
[4]: /agent/basic_agent_usage/docker
[5]: /agent/basic_agent_usage/kubernetes
[6]: /agent/basic_agent_usage/suse
[7]: /agent/basic_agent_usage/fedora
[8]: /agent/basic_agent_usage/osx
[9]: /agent/basic_agent_usage/windows
[10]: /agent/basic_agent_usage/source
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: /integrations
[3]: /developers/metrics/custom_metrics
