---
title: Basic Agent Usage for Red Hat
platform: Red Hat
aliases:
    - /guides/basic_agent_usage/redhat/
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

This page outlines the basic features of the Datadog Agent for Red Hat. If you haven't installed the Agent yet, instructions can be found in the [Datadog Agent Integration][1] documentation.

Packages are available for 64-bit x86 and Arm v8 architectures. For other architectures, use the source install.

### Supported Versions
#### x86 64-bit
On the 64-bit x86 architecture, RedHat/CentOS 6 and above are supported. Since Agent 6.33.0/7.33.0, AlmaLinux/Rocky 8 and above are supported.

**Note:** Agent 6.51.x/7.51.x are the last supported versions on RedHat/CentOS 6.x.
#### Arm v8 64-bit
On the 64-bit Arm v8 architecture, RedHat/CentOS 8 and above are supported. Since Agent 6.33.0/7.33.0, AlmaLinux/Rocky 8 and above are supported.

## Commands

In Agent v6 and v7, the service manager provided by the operating system is responsible for the Agent lifecycle, while other commands must be run through the Agent binary directly. In Agent v5, almost everything is done through the service manager.

### Red Hat 7 and higher

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

### Red Hat 6

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

**Note**: If the `service` wrapper is not available on your system, use:

* On `upstart`-based systems: `sudo start/stop/restart/status datadog-agent`
* On `systemd`-based systems: `sudo systemctl start/stop/restart/status datadog-agent`
* On `initctl`-based systems: `sudo initctl start/stop/restart/status datadog-agent`


## Configuration

The configuration files and folders for the Agent are located in:

* `/etc/datadog-agent/datadog.yaml`

Configuration files for [Integrations][4]:

* `/etc/datadog-agent/conf.d/`

## Uninstall the Agent

To uninstall the Agent, run the following command:

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

{{% apm-ssi-uninstall-linux %}}

## Troubleshooting

See the [Agent Troubleshooting documentation][2].

## Working with the embedded Agent

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

See the instructions on how to [add packages to the embedded Agent][3] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=centos
[2]: /agent/troubleshooting/
[3]: /developers/guide/custom-python-package/
[4]: /integrations/
