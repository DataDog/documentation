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
Agent v6 is now available, <a href="https://github.com/DataDog/datadog-agent/blob/master/docs/agent/upgrade.md">upgrade to the newest version</a> to benefit from all new functionality.
</div>

## What is the Agent?

The Datadog Agent is a piece of software that runs on your hosts. Its job is to faithfully collect events and metrics and bring them to Datadog on your behalf so that you can do something useful with your monitoring and performance data. The Datadog Agent is open source: view the source code on GitHub for [Agent v5][1] and [Agent v6][2]. To see all changes between Agent v5 and v6, consult the [Datadog Agent dedicated changes][3] documentation.

{{< partial name="platforms/platforms.html" >}}

The Agent has three main parts: the collector, DogStatsD, and the forwarder:

* **Collector**: Runs checks on the current machine for whatever [integrations][4] you have, and captures system metrics such as memory and CPU.
* **DogStatsD**: A StatsD-compatible backend server that you can send [custom metrics][5] to from your own applications.
* **Forwarder**: Retrieves data from both DogStatsD and the collector, and then queues it up to be sent to Datadog.

This is all controlled by one supervisor process. We keep this separate so you don't have to deal with the overhead of each application if you don't want to run all parts (although we generally recommend that you do).

## What is the Agent v6?

Agent 6 is the latest major version of the Datadog Agent. The big difference between Agent 5 and Agent 6 is that Agent 6 is a complete rewrite of the core Agent in Golang. Golang has allowed the Agent to take advantage of concurrency. In place of the three processes the Agent v5 used to run—*the Forwarder*, *the Collector*, and *DogStatsD*—there is now only one process: *the Agent*. It also comes with a number of other core improvements:

* Agent v6 has significantly improved resource usage over Agent v5:
  * It has decreased CPU usage
  * It has decrease memory usage
  * It uses fewer file descriptors
  * It has an all around decreased footprint

* Agent 6 uses ports `5000` and `5001` by default. You can specify different ports for `expvar_port` and `cmd_port` in the `datadog.yaml` file.

* Custom build your Agent v6 and [DogStatsD][6] much easier and with much more configuration options, to include or exclude almost anything. There is also a "puppy" Agent, which is a truly minimal installation.

**Agent v6 new functionalities**: 

* [Distributions metrics][17] can be performed on the server directly to calculate real, effective global percentiles. (NOTE: this feature is in BETA. Contact support for details on how to have it enabled for your account.)

* [DogStatsD][6] can be used over a Unix socket instead of over UDP.

* [Live Process monitoring is available for Windows][19].

* [Prometheus OpenMetrics is supported natively][20].

* [All your logs can be sent to Datadog for alerting, analysis, and correlation with metrics][21].
 

## Agent configuration files migration

[If you haven't done it already, upgrade your Agent v5 to Agent v6][18]

To automatically transition Agent configuration paths and formats from Agent v5 to Agent v6, use the `import` command. The command parses an existing v5 `datadog.conf` and converts the configuration options to the new v6 `datadog.yaml` format. It also copies configuration files for checks that are currently enabled.

{{< tabs >}}
{{% tab "Linux" %}}

`sudo -u dd-agent -- datadog-agent import`

{{% /tab %}}
{{% tab "macOS" %}}

`datadog-agent import <old_configuration_dir> <destination_dir>`

With:

* `<old_configuration_dir>` is the directory containing the `datadog.conf` file
* `<destination_dir>` is the directory where the imported `datadog.yaml` is written (you can use the same directory as `<old_configuration_dir>`).

{{% /tab %}}
{{% tab "Windows" %}}

`datadog-agent import <old_configuration_dir> <destination_dir>`

With:

* `<old_configuration_dir>` is the directory containing the `datadog.conf` file
* `<destination_dir>` is the directory where the imported `datadog.yaml` is written (you can use the same directory as `<old_configuration_dir>`).

**Note**: `datadog.conf` is automatically upgraded to `datadog.yaml` on upgrade.

{{% /tab %}}
{{< /tabs >}}

## CLI

The new command line interface for the Agent is sub-command based:

| Command         | Notes                                                                      |
| --------------- | -------------------------------------------------------------------------- |
| check           | Run the specified check                                                    |
| configcheck     | Print all configurations loaded & resolved of a running Agent              |
| diagnose        | Execute some connectivity diagnosis on your system                         |
| flare           | Collect a flare and send it to Datadog                                     |
| health          | Print the current Agent health                                             |
| help            | Help about any command                                                     |
| hostname        | Print the hostname used by the Agent                                       |
| import          | Import and convert configuration files from previous versions of the Agent |
| installservice  | Installs the Agent within the service control manager                      |
| launch-gui      | Starts the Datadog Agent GUI                                               |
| regimport       | Import the registry settings into datadog.yaml                             |
| remove-service  | Removes the Agent from the service control manager                         |
| restart-service | Restarts the Agent within the service control manager                      |
| start           | Start the Agent                                                            |
| start-service   | Starts the Agent within the service control manager                        |
| status          | Print the current status                                                   |
| stopservice     | Stops the Agent within the service control manager                         |
| version         | Print the version info                                                     |

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

| OS                                 | Supported versions                                       |
| :----                              | :----                                                    |
| [Debian x86_64][7]                 | Debian 7 (wheezy) and above (we do not support SysVinit) |
| [Ubuntu x86_64][8]                 | Ubuntu 14.04 and above                                   |
| [RedHat/CentOS x86_64][9]          | RedHat/CentOS 6 and above                                |
| [Docker][14]                       | Version 1.12 and higher                                  |
| [Kubernetes][15]                   | Version 1.3 and higher                                   |
| [SUSE Enterprise Linux x86_64][10] | SUSE 11 SP4 and above (we do not support SysVinit)       |
| [Fedora x86_64][11]                | Fedora 26 and above                                      |
| [MacOS][12]                        | macOS 10.10 and above                                    |
| [Windows server 64-bit][13]        | Windows server 2008r2 or above                           |
| [Windows 64-bit][13]               | Windows 7 or above                                       |

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
[3]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md
[4]: /integrations
[5]: /developers/metrics/custom_metrics/
[6]: /developers/dogstatsd/unix_socket/
[17]: /developers/metrics/distributions 
[18]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/upgrade.md
[19]: /graphing/infrastructure/process/
[20]: https://www.datadoghq.com/blog/monitor-prometheus-metrics/
[21]: /logs/
