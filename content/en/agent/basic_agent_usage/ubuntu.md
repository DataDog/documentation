---
title: Basic Agent Usage for Ubuntu
kind: documentation
platform: Ubuntu
aliases:
    - /guides/basic_agent_usage/ubuntu/
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "/infrastructure/process/"
  tag: "Documentation"
  text: "Collect your processes"
- link: "/tracing/"
  tag: "Documentation"
  text: "Collect your traces"
---

## Overview

This page outlines the basic features of the Datadog Agent for Ubuntu. If you haven't installed the Agent yet, instructions can be found in the [Datadog Agent Integration][1] documentation.

Packages are available for 64-bit x86 and Arm v8 architectures. For other architectures, use the source install.

**Note**: Ubuntu 14.04 and above are supported.

## Commands

In Agent v6 and v7, the service manager provided by the operating system is responsible for the Agent lifecycle, while other commands must be run through the Agent binary directly. In Agent v5, almost everything is done through the service manager.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| Description                        | Command                                                |
|------------------------------------|--------------------------------------------------------|
| Start Agent as a service           | `sudo service datadog-agent start`                     |
| Stop Agent running as a service    | `sudo service datadog-agent stop`                      |
| Restart Agent running as a service | `sudo service datadog-agent restart`                   |
| Status of Agent service            | `sudo service datadog-agent status`                    |
| Status page of running Agent       | `sudo datadog-agent status`                            |
| Send flare                         | `sudo datadog-agent flare`                             |
| Display command usage              | `sudo datadog-agent --help`                            |
| Run a check                        | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Description                        | Command                                           |
|------------------------------------|---------------------------------------------------|
| Start Agent as a service           | `sudo service datadog-agent start`                |
| Stop Agent running as a service    | `sudo service datadog-agent stop`                 |
| Restart Agent running as a service | `sudo service datadog-agent restart`              |
| Status of Agent service            | `sudo service datadog-agent status`               |
| Status page of running Agent       | `sudo service datadog-agent info`                 |
| Send flare                         | `sudo service datadog-agent flare`                |
| Display command usage              | `sudo service datadog-agent`                      |
| Run a check                        | `sudo -u dd-agent -- dd-agent check <CHECK_NAME>` |

{{% /tab %}}
{{< /tabs >}}

**Note**: If the `service` wrapper is not available on your system, use:

* On `upstart`-based systems: `sudo start/stop/restart/status datadog-agent`
* On `systemd`-based systems: `sudo systemctl start/stop/restart/status datadog-agent`

[Learn more about Service lifecycle commands][2]

## Configuration

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
The configuration files and folders for the Agent are located in:

* `/etc/datadog-agent/datadog.yaml`

Configuration files for [Integrations][1]:

* `/etc/datadog-agent/conf.d/`

[1]: /integrations/
{{% /tab %}}
{{% tab "Agent v5" %}}

The configuration files and folders for the Agent are located in:

* `/etc/dd-agent/datadog.conf`

Configuration files for [Integrations][1]:

* `/etc/dd-agent/conf.d/`

[1]: /integrations/
{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

See the [Agent Troubleshooting][3] documentation.

## Working with the embedded Agent

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

See the instructions on how to [add packages to the embedded Agent][4] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/ubuntu
[2]: /agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands
[3]: /agent/troubleshooting/
[4]: /developers/guide/custom-python-package/
