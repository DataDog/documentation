---
title: Basic Agent Usage
kind: documentation
aliases:
    - /guides/basic_agent_usage/
    - /agent/faq/where-is-the-configuration-file-for-the-agent/
    - /agent/faq/log-location
further_reading:
- link: "agent/faq/how-datadog-agent-determines-the-hostname"
  tag: "FAQ"
  text: "How does Datadog determine the Agent hostname?"
- link: "agent/guide/agent-commands"
  tag: "FAQ"
  text: "List of all Agent commands"
- link: "agent/guide/agent-configuration-files"
  tag: "FAQ"
  text: "Location of all Agent configuration files"
---

{{< partial name="platforms/platforms.html" links="platforms" >}}

## Supported OS versions

{{< tabs >}}
{{% tab "Agent v6" %}}

| OS                                | Supported versions                                |
|-----------------------------------|---------------------------------------------------|
| [Amazon][1]                       | Amazon Linux 2                                    |
| [Debian x86_64][2]                | Debian 7 (wheezy)+ and SysVinit in Agent 6.6.0+)  |
| [Ubuntu x86_64][3]                | Ubuntu 14.04+                                     |
| [RedHat/CentOS x86_64][4]         | RedHat/CentOS 6+                                  |
| [Docker][5]                       | Version 1.12+                                     |
| [Kubernetes][6]                   | Version 1.3+                                      |
| [SUSE Enterprise Linux x86_64][7] | SUSE 11 SP4+ (not SysVinit)                       |
| [Fedora x86_64][8]                | Fedora 26+                                        |
| [macOS][9]                        | macOS 10.12+                                      |
| [Windows server 64-bit][10]       | Windows Server 2008r2+ and Server Core (not Nano) |
| [Windows 64-bit][10]              | Windows 7+                                        |

**Note**: [Source][11] install may work on operating systems not listed here and is supported on a best effort basis.

[1]: /agent/basic_agent_usage/amazonlinux/?tab=agentv6
[2]: /agent/basic_agent_usage/deb
[3]: /agent/basic_agent_usage/ubuntu
[4]: /agent/basic_agent_usage/redhat
[5]: /agent/docker
[6]: /agent/basic_agent_usage/kubernetes
[7]: /agent/basic_agent_usage/suse
[8]: /agent/basic_agent_usage/fedora
[9]: /agent/basic_agent_usage/osx
[10]: /agent/basic_agent_usage/windows
[11]: /agent/basic_agent_usage/source
{{% /tab %}}
{{% tab "Agent v5" %}}

| OS                                | Supported versions     |
|-----------------------------------|------------------------|
| [Amazon][1]                       | Amazon Linux 2         |
| [Debian x86_64][2]                | Debian 7 (wheezy)+     |
| [Ubuntu x86_64][3]                | Ubuntu 12.04+          |
| [RedHat/CentOS x86_64][4]         | RedHat/CentOS 5+       |
| [Docker][5]                       | Version 1.12+          |
| [Kubernetes][6]                   | Version 1.3 to 1.8     |
| [SUSE Enterprise Linux x86_64][7] | SUSE 11 SP4+           |
| [Fedora x86_64][8]                | Fedora 26+             |
| [MacOS][9]                        | macOS 10.10+           |
| [Windows server 64-bit][10]       | Windows server 2008r2+ |
| [Windows 64-bit][10]              | Windows 7+             |

**Note**: [Source][11] install may work on operating systems not listed here and is supported on a best effort basis.


[1]: /agent/basic_agent_usage/amazonlinux/?tab=agentv5
[2]: /agent/basic_agent_usage/deb
[3]: /agent/basic_agent_usage/ubuntu
[4]: /agent/basic_agent_usage/redhat
[5]: /agent/docker
[6]: /agent/basic_agent_usage/kubernetes
[7]: /agent/basic_agent_usage/suse
[8]: /agent/basic_agent_usage/fedora
[9]: /agent/basic_agent_usage/osx
[10]: /agent/basic_agent_usage/windows
[11]: /agent/basic_agent_usage/source
{{% /tab %}}
{{% tab "Unix Agent" %}}

| OS       | Supported versions                        |
|----------|-------------------------------------------|
| [AIX][1] | AIX 6.1 TL9 SP6, 7.1 TL5 SP3, 7.2 TL3 SP0 |



[1]: /agent/basic_agent_usage/aix
{{% /tab %}}
{{< /tabs >}}

## CLI

With Agent v6+ the command line interface is sub-command based. To run a sub-command, first invoke the Agent binary:

```
<AGENT_BIN_PATH> <SUB_COMMAND> <OPTIONS>
```

| Sub-Command       | Notes                                                                          |
|-------------------|--------------------------------------------------------------------------------|
| `check`           | Run the specified check                                                        |
| `configcheck`     | Print all configurations loaded & resolved of a running Agent                  |
| `diagnose`        | Execute some connectivity diagnosis on your system                             |
| `flare`           | [Collect a flare and send it to Datadog](/agent/troubleshooting/send_a_flare/) |
| `health`          | Print the current Agent health                                                 |
| `help`            | Help about any command                                                         |
| `hostname`        | Print the hostname used by the Agent                                           |
| `import`          | Import and convert configuration files from previous versions of the Agent     |
| `installservice`  | Installs the Agent within the service control manager                          |
| `launch-gui`      | Starts the Datadog Agent GUI                                                   |
| `regimport`       | Import the registry settings into datadog.yaml                                 |
| `remove-service`  | Removes the Agent from the service control manager                             |
| `restart`         | [Restart the Agent](/agent/guide/agent-commands/#restart-the-agent)            |
| `restart-service` | Restarts the Agent within the service control manager                          |
| `start`           | [Start the Agent](/agent/guide/agent-commands/#start-the-agent)                |
| `start-service`   | Starts the Agent within the service control manager                            |
| `status`          | [Print the current Agent status](/agent/guide/agent-commands/#service-status)  |
| `stop`            | [Stop the Agent](/agent/guide/agent-commands/#stop-the-agent)                  |
| `stopservice`     | Stops the Agent within the service control manager                             |
| `version`         | Print the version info                                                         |


**Note**: Some options have their own set of flags and options detailed in a help message. For example, to see how to use the `check` sub-command, run:

```
<AGENT_BIN_PATH> check --help
```

## GUI

You can configure the port on which the GUI runs in the `datadog.yaml` file. To disable the GUI, set the port's value to `-1`. For Windows and macOS, the GUI is enabled by default and runs on port `5002`. For Linux, the GUI is disabled by default. When the Agent is running, use the `datadog-agent launch-gui` command to open the GUI in your default web browser.

**Note**: The Agent GUI isn't supported on 32-bit Windows platforms.

### Requirements

1. Cookies must be enabled in your browser. The GUI generates and saves a token in your browser which is used for authenticating all communications with the GUI server.

2. To start the GUI, the user must have the required permissions. If you are able to open `datadog.yaml`, you are able to use the GUI.

3. For security reasons, the GUI can **only** be accessed from the local network interface (```localhost```/```127.0.0.1```), therefore you must be on the same host that the Agent is running. That is, you can't run the Agent on a VM or a container and access it from the host machine.

## Agent Overhead

An example of the Datadog Agent resource consumption is below. Tests were made on an AWS EC2 machine `c5.xlarge` instance (4 VCPU/ 8GB RAM). The vanilla `datadog-agent` was running with a process check to monitor the Agent itself. Enabling more integrations may increase Agent resource consumption.
Enabling JMX Checks forces the Agent to use more memory depending on the number of beans exposed by the monitored JVMs. Enabling the trace and process Agents increases the resource consumption as well.

{{< tabs >}}
{{% tab "Agent v6" %}}

* Agent Test version: 6.7.0
* CPU: ~ 0.12% of the CPU used on average
* Memory: ~ 60MB of RAM used (RSS memory)
* Network bandwidth: ~ 86 B/s ▼ | 260 B/s ▲
* Disk:
  * Linux 350MB to 400MB depending on the distribution
  * Windows: 260MB

{{% /tab %}}
{{% tab "Agent v5" %}}

* Agent Test version: 5.24.0
* CPU: ~ 0.35% of the CPU used on average
* Memory: ~ 115MB of RAM used.
* Network bandwidth: ~ 1900 B/s ▼ | 800 B/s ▲
* Disk:
  * Linux 312MB
  * Windows: 295MB

**Note**: Since v5.15 of the container Agent, it is recommended to set container resources to at least 256MB due to an added memory cache -- upping the limit is not to account for baseline usage but rather to accommodate temporary spikes. Agent 6 has a much more limited memory footprint.

{{% /tab %}}
{{< /tabs >}}

## Configuration management tools

Manage the Datadog Agent and [Integrations][1] using configuration management tools:

{{< tabs >}}
{{% tab "Chef Cookbook" %}}

* [Chef GitHub project][1]
* [Installing Datadog Agent with Chef][2]


[1]: https://github.com/DataDog/chef-datadog
[2]: https://app.datadoghq.com/account/settings#integrations/chef
{{% /tab %}}
{{% tab "Puppet" %}}

* [Puppet GitHub project][1]
* [Installing Datadog Agent with Puppet][2]


[1]: https://github.com/DataDog/puppet-datadog-agent
[2]: https://app.datadoghq.com/account/settings#integrations/puppet
{{% /tab %}}
{{% tab "Ansible" %}}

* [Ansible GitHub project][1]
* [Installing Datadog Agent with Ansible][2]


[1]: https://github.com/DataDog/ansible-datadog
[2]: https://app.datadoghq.com/account/settings#agent/ansible
{{% /tab %}}
{{% tab "SaltStack" %}}

* [Installing Datadog Agent with Saltstack][1]


[1]: https://github.com/DataDog/datadog-formula
{{% /tab %}}
{{< /tabs >}}

## Getting further with the Datadog Agent

### Update the Agent

To manually update the Datadog Agent core between two minor versions on a given host, run the [corresponding install command for your platform][2].

Note: If you want to manually update one specific Agent integration refer to the [Integration Management guide][3].

### Configuration files

[See the dedicated documentation for Agent configuration files][4].

### Datadog site

To send your Agent data to the [Datadog EU site][5], edit your [Agent main configuration file][6] `datadog.yaml` and set the `site` parameter to:

`site: datadoghq.eu`

### Log location

[See the dedicated documentation for Agent log files][7]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: /agent/guide/integration-management
[4]: /agent/guide/agent-configuration-files
[5]: https://app.datadoghq.eu
[6]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[7]: /agent/guide/agent-log-files
