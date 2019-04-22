---
title: Basic Agent Usage for macOS
kind: documentation
platform: OS X
os: osx
aliases:
    - /guides/basic_agent_usage/osx/
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
---

## Overview

This page outlines the basic features of the Datadog Agent for macOS. If you haven't installed the Agent yet, instructions can be found in the [Datadog Agent Integration][1] documentation.

Unlike other Agents, the macOS Datadog Agent does not include Agent tracing functionality out of the box. This functionality can be installed separately using [instructions in our Github agent repository][2].

By default, the Agent is installed in a sandbox located at `/opt/datadog-agent`. You can move this folder wherever you like; however, this documentation assumes a default installation location.

**Note**: macOS 10.12 and above are supported by the Agent v6, macOS 10.10 and above by the Agent v5.

## Commands

In Agent v6, the `launchctl` service manager provided by the operating system is responsible for the Agent lifecycle, while other commands must be run via the Agent binary directly. Alternatively, lifecycle commands can also be managed via the systray app, and other commands can be executed via the web GUI.

{{< tabs >}}
{{% tab "Agent v6" %}}

| Description                        | Command                                              |
| ---------------------------------- | --------------------------------------               |
| Start Agent as a service           | `launchctl start com.datadoghq.agent` or systray app |
| Stop Agent running as a service    | `launchctl stop com.datadoghq.agent` or systray app  |
| Restart Agent running as a service | _run `stop` then `start`_ or systray app             |
| Status of Agent service            | `launchctl list com.datadoghq.agent` or systray app  |
| Status page of running Agent       | `datadog-agent status` or web GUI                    |
| Send flare                         | `datadog-agent flare` or web GUI                     |
| Display command usage              | `datadog-agent --help`                               |
| Run a check                        | `datadog-agent check <check_name>`                   |


{{% /tab %}}
{{% tab "Agent v5" %}}

| Description                        | Command                            |
| ---------------------------------- | ---------------------------------- |
| Start Agent as a service           | `datadog-agent start`              |
| Stop Agent running as a service    | `datadog-agent stop`               |
| Restart Agent running as a service | `datadog-agent restart`            |
| Status of Agent service            | `datadog-agent status`             |
| Status page of running Agent       | `datadog-agent info`               |
| Send flare                         | `datadog-agent flare`              |
| Display command usage              | _not implemented_                  |
| Run a check                        | `datadog-agent check <check_name>` |

{{% /tab %}}
{{< /tabs >}}

## Configuration

{{< tabs >}}
{{% tab "Agent v6" %}}
The configuration files and folders for the Agent are located in:

* `~/.datadog-agent/datadog.yaml`

Configuration files for [Integrations][1]:

* `~/.datadog-agent/conf.d/`


[1]: /integrations
{{% /tab %}}
{{% tab "Agent v5" %}}

The configuration files and folders for the Agent are located in:

* `~/.datadog-agent/datadog.conf`

Configuration files for [Integrations][1]:

* `~/.datadog-agent/conf.d/`


[1]: /integrations
{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

[Refer to the dedicated Agent Troubleshooting documentation][3].

## Working with the embedded Agent

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

See the instructions on how to [add packages to the embedded Agent][4] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/mac
[2]: https://github.com/DataDog/datadog-agent/blob/master/docs/trace-agent/README.md#run-on-macos
[3]: /agent/troubleshooting
[4]: /agent/faq/custom_python_package
