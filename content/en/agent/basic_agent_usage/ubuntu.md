---
title: Basic Agent Usage for Ubuntu
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

This page outlines the basic features of the Datadog Agent for Ubuntu. 

To install the Agent, see the [installation instructions][1]. Packages are available for 64-bit x86 and Arm v8 architectures. For other architectures, use the source install.

**Note**: Ubuntu 14.04 and above are supported on the 64-bit x86 architecture. Ubuntu 16.04 and above are supported on the 64-bit Arm v8 architecture.

## Commands

In Agent v6 and v7, the service manager provided by the operating system is responsible for the Agent lifecycle, while other commands must be run through the Agent binary directly. In Agent v5, almost everything is done through the service manager.

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

**Note**: If the `service` wrapper is not available on your system, use:

* On `upstart`-based systems: `sudo start/stop/restart/status datadog-agent`
* On `systemd`-based systems: `sudo systemctl start/stop/restart/status datadog-agent`

## Configuration

The configuration files and folders for the Agent are located in:

* `/etc/datadog-agent/datadog.yaml`

Configuration files for [Integrations][5]:

* `/etc/datadog-agent/conf.d/`

## Uninstall the Agent

To uninstall the Agent, run the following command:

```shell
sudo apt-get remove datadog-agent -y
```

This command removes the Agent, but does not remove:

* The `datadog.yaml` configuration file
* User-created files in the `/etc/datadog-agent` configuration folder
* User-created files in the `/opt/datadog-agent` folder
* The `dd-agent` user
* Datadog log files

If you also want to remove these elements, run this command after removing the Agent:

```shell
sudo apt-get remove --purge datadog-agent -y
```

{{% apm-ssi-uninstall-linux %}}

## Troubleshooting

See the [Agent Troubleshooting documentation][3].

## Working with the embedded Agent

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

See the instructions on how to [add packages to the embedded Agent][4] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=ubuntu
[2]: /agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands
[3]: /agent/troubleshooting/
[4]: /developers/guide/custom-python-package/
[5]: /integrations/
