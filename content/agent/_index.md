---
title: Agent
kind: documentation
description: Install & configure the Agent to collect data
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Collect your logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your processes
- link: "tracing"
  tag: "Documentation"
  text: Collect your traces
aliases:
  - /agent/faq/agent-check-directory-structure
  - /agent/faq/install-core-extra/
---

<div class="alert alert-info">
Agent v6 is now available, <a href="https://docs.datadoghq.com/agent/faq/upgrade-to-agent-v6">upgrade to the newest version</a> to benefit from all new functionality.
</div>

## What is the Agent?

The Datadog Agent is a piece of software that runs on your hosts. Its job is to faithfully collect events and metrics and bring them to Datadog on your behalf so that you can do something useful with your monitoring and performance data. The Datadog Agent is open source: view the source code on GitHub for [Agent v5][1] and [Agent v6][2].

{{< partial name="platforms/platforms.html" >}}

The Agent has three main parts: the collector, DogStatsD, and the forwarder:

* **Collector**: Runs checks on the current machine for whatever [integrations][4] you have, and captures system metrics such as memory and CPU.
* **DogStatsD**: A StatsD-compatible backend server that you can send [custom metrics][5] to from your own applications.
* **Forwarder**: Retrieves data from both DogStatsD and the collector, and then queues it up to be sent to Datadog.

This is all controlled by one supervisor process. We keep this separate so you don't have to deal with the overhead of each application if you don't want to run all parts (although we generally recommend that you do).

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


To run a sub-command, the Agent binary must be invoked like this:
```
<path_to_agent_bin> <sub_command> <options>
```

Some options have their own set of flags and options detailed in a help message. For example, to see how to use the `check` sub-command, run:
```
<agent_binary> check --help
```

## Using the GUI

The port which the GUI runs on can be configured in your `datadog.yaml` file. Setting the port to `-1` disables the GUI all together. By default it is enabled on port `5002` on Windows and Mac, and is disabled on Linux.

Once the Agent is running, use the `datadog-agent launch-gui` command to launch the GUI within your default web browser.

**Note**: The Agent GUI isn't supported on 32-bit Windows platforms.

### Requirements

1. Cookies must be enabled in your browser. The GUI generates and saves a token in your browser which is used for authenticating all communications with the GUI server.

2. The GUI will only be launched if the user launching it has the correct user permissions. If you are able to open `datadog.yaml`, you are able to use the GUI.

3. For security reasons, the GUI can **only** be accessed from the local network interface (```localhost```/```127.0.0.1```), so you must be on the same host that the Agent is running to use it. In other words, you can't run the Agent on a VM or a container and access it from the host machine.

## Supported OSs versions

{{< tabs >}}
{{% tab "Agent v6" %}}

| OS                                 | Supported versions                                                  |
| :----                              | :----                                                               |
| [Debian x86_64][7]                 | Debian 7 (wheezy) and above (we support SysVinit in agent 6.6.0 and above) |
| [Ubuntu x86_64][8]                 | Ubuntu 14.04 and above                                              |
| [RedHat/CentOS x86_64][9]          | RedHat/CentOS 6 and above                                           |
| [Docker][14]                       | Version 1.12 and higher                                             |
| [Kubernetes][15]                   | Version 1.3 and higher                                              |
| [SUSE Enterprise Linux x86_64][10] | SUSE 11 SP4 and above (we do not support SysVinit)                  |
| [Fedora x86_64][11]                | Fedora 26 and above                                                 |
| [MacOS][12]                        | macOS 10.10 and above                                               |
| [Windows server 64-bit][13]        | Windows server 2008r2 or above                                      |
| [Windows 64-bit][13]               | Windows 7 or above                                                  |

**Note**: [Source][16] install may work on operating systems not listed here and is supported on a best effort basis.

[7]: /agent/basic_agent_usage/deb
[8]: /agent/basic_agent_usage/ubuntu
[9]: /agent/basic_agent_usage/redhat
[10]: /agent/basic_agent_usage/suse
[11]: /agent/basic_agent_usage/fedora
[12]: /agent/basic_agent_usage/osx
[13]: /agent/basic_agent_usage/windows
[14]: /agent/basic_agent_usage/docker
[15]: /agent/basic_agent_usage/kubernetes
[16]: /agent/basic_agent_usage/source

{{% /tab %}}
{{% tab "Agent v5" %}}

| OS                                 | Supported versions             |
| :----                              | :----                          |
| [Debian x86_64][7]                 | Debian 7 (wheezy) and above    |
| [Ubuntu x86_64][8]                 | Ubuntu 12.04 and above         |
| [RedHat/CentOS x86_64][9]          | RedHat/CentOS 5 and above      |
| [Docker][14]                       | Version 1.12 and higher        |
| [Kubernetes][15]                   | Version 1.3 and higher         |
| [SUSE Enterprise Linux x86_64][10] | SUSE 11 SP4 and above          |
| [Fedora x86_64][11]                | Fedora 26 and above            |
| [MacOS][12]                        | macOS 10.10 and above          |
| [Windows server 64-bit][13]        | Windows server 2008r2 or above |
| [Windows 64-bit][13]               | Windows 7 or above             |

**Note**: [Source][16] install may work on operating systems not listed here and is supported on a best effort basis.

[7]: /agent/basic_agent_usage/deb
[8]: /agent/basic_agent_usage/ubuntu
[9]: /agent/basic_agent_usage/redhat
[10]: /agent/basic_agent_usage/suse
[11]: /agent/basic_agent_usage/fedora
[12]: /agent/basic_agent_usage/osx
[13]: /agent/basic_agent_usage/windows
[14]: /agent/basic_agent_usage/docker
[15]: /agent/basic_agent_usage/kubernetes
[16]: /agent/basic_agent_usage/source

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-agent
[2]: https://github.com/DataDog/datadog-agent
[4]: /integrations
[5]: /developers/metrics/custom_metrics/
