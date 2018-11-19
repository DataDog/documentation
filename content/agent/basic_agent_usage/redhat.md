---
title: Basic Agent Usage for Red Hat
kind: documentation
platform: Red Hat
aliases:
    - /guides/basic_agent_usage/redhat/
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
---

## Overview

This page outlines the basic features of the Datadog Agent for Red Hat. If you haven't installed the Agent yet, instructions can be found in the [Datadog Agent Integration][1] documentation.

**Note**: RedHat 6 and above are supported.

## Commands

In Agent v6, the service manager provided by the operating system is responsible for the Agent lifecycle, while other commands must be run via the Agent binary directly. In Agent v5, almost everything is done via the service manager.

{{< tabs >}}
{{% tab "Agent v6" %}}

| Description                        | Command                                                |
| --------------------               | --------------------                                   |
| Start Agent as a service           | `sudo service datadog-agent start`                     |
| Stop Agent running as a service    | `sudo service datadog-agent stop`                      |
| Restart Agent running as a service | `sudo service datadog-agent restart`                   |
| Status of Agent service            | `sudo service datadog-agent status`                    |
| Status page of running Agent       | `sudo datadog-agent status`                            |
| Send flare                         | `sudo datadog-agent flare`                             |
| Display command usage              | `sudo datadog-agent --help`                            |
| Run a check                        | `sudo -u dd-agent -- datadog-agent check <check_name>` |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Description                        | Command                                           |
| --------------------               | --------------------                              |
| Start Agent as a service           | `sudo service datadog-agent start`                |
| Stop Agent running as a service    | `sudo service datadog-agent stop`                 |
| Restart Agent running as a service | `sudo service datadog-agent restart`              |
| Status of Agent service            | `sudo service datadog-agent status`               |
| Status page of running Agent       | `sudo service datadog-agent info`                 |
| Send flare                         | `sudo service datadog-agent flare`                |
| Display command usage              | `sudo service datadog-agent`                      |
| Run a check                        | `sudo -u dd-agent -- dd-agent check <check_name>` |

{{% /tab %}}
{{< /tabs >}}

**Note**: If `service` is not available on your system, use:

* `upstart`-based systems: `initctl`
* `systemd`-based systems: `systemctl`

[Learn more about Service lifecycle commands][4]

## Configuration

{{< tabs >}}
{{% tab "Agent v6" %}}
The configuration files and folders for the Agent are located in:

* `/etc/datadog-agent/datadog.yaml` 

Configuration files for [Integrations][2]:

* `/etc/datadog-agent/conf.d/` 

[2]: /integrations

{{% /tab %}}
{{% tab "Agent v5" %}}

The configuration files and folders for the Agent are located in:

* `/etc/dd-agent/datadog.conf`  

Configuration files for [Integrations][2]:

* `/etc/dd-agent/conf.d/` 

[2]: /integrations

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting
{{< tabs >}}
{{% tab "Agent v6" %}}

Run the `status` command to see the state of the Agent. The Agent logs are located in the `/var/log/datadog/` directory and are consolidated in the `agent.log` file.

If you're still having trouble, [our support team][3] is glad to provide further assistance.

[3]: /help

{{% /tab %}}
{{% tab "Agent v5" %}}

Run the `info` command to see the state of the Agent. The Agent logs are located in the `/var/log/datadog/` directory and are split into:

  * `datadog-supervisord.log`
  * `collector.log`
  * `dogstatsd.log`
  * `forwarder.log`

If you're still having trouble, [our support team][3] is glad to provide further assistance.

[3]: /help

{{% /tab %}}
{{< /tabs >}}

## Working with the embedded Agent

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

See the instructions on how to [add packages to the embedded Agent][5] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/redhat
[2]: /integrations
[3]: /help
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands
[5]: /agent/faq/custom-python-package
