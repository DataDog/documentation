---
title: Basic Agent Usage for Amazon Linux
platform: Amazon Linux
aliases:
    - /guides/basic_agent_usage/amazonlinux/
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
- link: "/agent/basic_agent_usage/#agent-architecture"
  tag: "Documentation"
  text: "Find out more about the Agent's architecture"
- link: "/agent/configuration/network#configure-ports"
  tag: "Documentation"
  text: "Configure inbound ports"
algolia:
  tags: ['uninstall', 'uninstalling']
---

## Overview

This page outlines the basic features of the Datadog Agent for Amazon Linux. If you haven't installed the Agent yet, instructions can be found in the [Datadog Agent Integration][1] documentation.

Packages are available for 64-bit x86 and Arm v8 architectures. For other architectures, use the source install.

## Commands

In Agent v6 and v7, the service manager provided by the operating system is responsible for the Agent lifecycle, while other commands must be run through the Agent binary directly. In Agent v5, almost everything is done through the service manager.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

### Amazon Linux 2, Amazon Linux 2022/2023

<div class="alert alert-info">Amazon Linux 2022/2023 installations on Agent versions <= 6.39/7.39 require the <code>libxcrypt-compat</code> package. To install the package, run:<br/><pre><code>dnf install -y libxcrypt-compat</code></pre></div>

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

### Amazon Linux

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

## Uninstall the Agent

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}


```shell
sudo yum remove datadog-agent
```

This command removes the Agent, but does not remove:
* The `datadog.yaml` configuration file
* User-created files in the `/etc/datadog-agent` configuration folder
* User-created files in the `/opt/datadog-agent` folder
* The `dd-agent` user
* Datadog log files

If you also want to remove these elements, run this command after removing the Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "Agent v5" %}}
```shell
sudo yum remove datadog-agent
```

This command removes the Agent, but does not remove:

* The `datadog.yaml` configuration file
* User-created files in the `/etc/dd-agent` configuration folder
* User-created files in the `/opt/datadog-agent` folder
* The `dd-agent` user
* Datadog log files

If you also want to remove these elements, run this command after removing the Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}
{{< /tabs >}}

{{% apm-ssi-uninstall-linux %}}

## Troubleshooting

See the [Agent Troubleshooting documentation][2].

## Working with the embedded Agent

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

See the instructions on how to [add packages to the embedded Agent][3] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=aws
[2]: /agent/troubleshooting/
[3]: /developers/guide/custom-python-package/
