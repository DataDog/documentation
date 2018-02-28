---
title: Basic Agents Usage
kind: documentation
aliases:
    - /guides/basic_agent_usage/
    - /agent/faq/where-is-the-configuration-file-for-the-agent/
    - /agent/faq/log-location
further_reading:
- link: "/agent/faq/how-datadog-agent-determines-the-hostname"
  tag: "FAQ"
  text: "How does Datadog determine the agent hostname?"
- link: "/agent/faq/agent-commands"
  tag: "FAQ"
  text: "List of all agent commands"
---

{{< partial name="platforms/platforms.html" >}}

## Configuration management tools

Manage the Datadog Agent and [integrations](/integrations) using configuration management tools:

### Chef Cookbook
* [Chef Github project](https://github.com/DataDog/chef-datadog)
* [Installing Datadog Agent with Chef](https://app.datadoghq.com/account/settings#integrations/chef)

### Puppet
* [Puppet Github project](https://github.com/DataDog/puppet-datadog-agent)
* [Installing Datadog Agent with Puppet](https://app.datadoghq.com/account/settings#integrations/puppet)

### Ansible
* [Ansible Github project](https://github.com/DataDog/ansible-datadog)
* [Installing Datadog Agent with Ansible](https://app.datadoghq.com/account/settings#agent/ansible)

### SaltStack

* [Installing Datadog Agent with Saltstack](https://github.com/DataDog/datadog-formula)

## Configuration file

The configuration files and folders for the Agent are located at:

{{% table responsive="true" %}}
| OS                                                                       | Agent v5                                                                   |  Agent v6                       |
| :-------                                                                 | :--------                                                                  | :--------                       |
| [Mac OS X](/agent/basic_agent_usage/osx)                                 | `~/.datadog-agent/datadog.conf`                                            | `~/.datadog-agent/datadog.yaml` |
| [Linux](/agent/basic_agent_usage/ubuntu)                                 | `/etc/dd-agent/datadog.conf`                                               | `/etc/datadog-agent/datadog.yaml`                                |
| [Source](/agent/basic_agent_usage/source)                                | `~/.datadog-agent/agent/datadog.conf`                                      | `/etc/datadog-agent/datadog.yaml`                                |
| [Windows Server 2008, Vista and newer](/agent/basic_agent_usage/windows) | `\\ProgramData\Datadog\datadog.conf`                                       | `n/a`                                |
| [Windows Server 2003, XP or older](/agent/basic_agent_usage/windows)     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` | `n/a`                                |
{{% /table %}}

## Log location

* For Linux and Mac OS X, Datadog Agent logs are located in the `/var/log/datadog/` directory
* For Windows, Datadog Agent logs are located in  the `c:\programdata\Datadog\logs` directory

The Datadog logs do a rollover every 10MB. When a rollover occurs, one backup is kept (e.g. `agent.log.1`). If a previous backup exists, it is overwritten on the rollover.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}