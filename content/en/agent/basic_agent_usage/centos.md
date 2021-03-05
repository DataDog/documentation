---
title: Basic Agent Usage for CentOS
kind: documentation
platform: CentOS
aliases:
    - /guides/basic_agent_usage/centos/
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

This page outlines the basic features of the Datadog Agent for CentOS. To install the Datadog Agent, follow the [Agent Installation Instructions][1] for CentOs.

Packages are available for 64-bit x86 and Arm v8 architectures. For other architectures, use the source install.

**Note**: CentOS 6 and above are supported.

## Commands

In Agent v6 and v7, the service manager provided by the operating system is responsible for the Agent lifecycle, while other commands must be run via the Agent binary directly. In Agent v5, almost everything is done via the service manager.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

### CentOS 7 and higher

| Description                        | Command                                                |
|------------------------------------|--------------------------------------------------------|
| Start Agent as a service           | `sudo systemctl start datadog-agent`                   |
| Stop Agent running as a service    | `sudo systemctl stop datadog-agent`                    |
| Restart Agent running as a service | `sudo systemctl restart datadog-agent`                 |
| Status of Agent service            | `sudo systemctl status datadog-agent`                  |
| Status page of running Agent       | `sudo datadog-agent status`                            |
| Send flare                         | `sudo datadog-agent flare`                             |
| Display command usage              | `sudo datadog-agent --help`                            |
| Run a check                        | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

### CentOS 6

| Description                        | Command                                                |
|------------------------------------|--------------------------------------------------------|
| Start Agent as a service           | `sudo start datadog-agent`                             |
| Stop Agent running as a service    | `sudo stop datadog-agent`                              |
| Restart Agent running as a service | `sudo restart datadog-agent`                           |
| Status of Agent service            | `sudo status datadog-agent`                            |
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

**Note**: If the `service` wrapper is not available on your system, use:

* On `upstart`-based systems: `sudo start/stop/restart/status datadog-agent`
* On `systemd`-based systems: `sudo systemctl start/stop/restart/status datadog-agent`

[Learn more about Service lifecycle commands][2]

{{% /tab %}}
{{< /tabs >}}


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

[Refer to the dedicated Agent Troubleshooting documentation][2].

## Working with the embedded Agent

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

See the instructions on how to [add packages to the embedded Agent][3] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/centos
[2]: /agent/troubleshooting/
[3]: /developers/guide/custom-python-package/
