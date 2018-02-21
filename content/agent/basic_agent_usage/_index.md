---
title: Basic Agents Usage
kind: documentation
aliases:
    - /guides/basic_agent_usage/
    - /agent/faq/where-is-the-configuration-file-for-the-agent/
    - /agent/faq/log-location
---

{{< partial name="platforms/platforms.html" >}}

## Configuration management tools

Manage the Datadog Agent and [integrations](/integrations) using configuration management tools:

### Chef
* [Chef Github project](https://github.com/DataDog/chef-datadog)
* [Chef installation](https://app.datadoghq.com/account/settings#integrations/chef)

### Puppet
* [Puppet Github project](https://github.com/DataDog/puppet-datadog-agent)
* [Puppet installation](https://app.datadoghq.com/account/settings#integrations/puppet)

### Ansible
* [Ansible Github project](https://github.com/DataDog/ansible-datadog)
* [Ansible installation](https://app.datadoghq.com/account/settings#agent/ansible)

Chef, Puppet, and Ansible [integrations](/integrations) use our public APIs, so if you're interested in using another automation tool, the above could be leveraged as examples to get you started.

There is also community support for Saltstack:

* Saltstack Formula - https://github.com/DataDog/datadog-formula

## Configuration file

The configuration files and folders for the Agent are located at:

{{% table responsive="true" %}}
| OS                                                                       | Agent v5                                                                   |  Agent v6                       |
| :-------                                                                 | :--------                                                                  | :--------                       |
| [Mac OS X](/agent/basic_agent_usage/osx)                                 | `~/.datadog-agent/datadog.conf`                                            | `~/.datadog-agent/datadog.yaml` |
| [Linux](/agent/basic_agent_usage/ubuntu)                                 | `/etc/dd-agent/datadog.conf`                                               | `/etc/datadog-agent/datadog.yaml`                                |
| SmartOS                                                                  | `/opt/local/datadog/agent/datadog.conf`                                    | `n/a`                                 |
| [Source](/agent/basic_agent_usage/source)                                | `~/.datadog-agent/agent/datadog.conf`                                      | `/etc/datadog-agent/datadog.yaml`                                |
| [Windows Server 2008, Vista and newer](/agent/basic_agent_usage/windows) | `\\ProgramData\Datadog\datadog.conf`                                       |                                 |
| [Windows Server 2003, XP or older](/agent/basic_agent_usage/windows)     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` |                                 |
{{% /table %}}

## Log location

* For Linux and Mac OS X, Datadog Agent logs are located in the `/var/log/datadog/` directory
* For Windows, Datadog Agent logs are located in  the `c:\programdata\Datadog\logs` directory

The Datadog logs do a rollover every 10MB. When a rollover occurs, one backup is kept (e.g. `agent.log.1`). If a previous backup exists, it is overwritten on the rollover.

## How does Datadog determine the agent hostname?

The Datadog Agent collects potential hostnames from a number of different sources. To see all the names the Agent is detecting, [run the Agent info command](/agent/#agent-status-and-information), for example:
```
$ sudo /etc/init.d/datadog-agent info

...

Hostnames
=========

  hostname: my.special.hostname
  agent-hostname: my.special.hostname
  ec2-hostname: ip-192-0-0-1.internal
  instance-id: i-deadbeef
  socket-hostname: myhost
  socket-fqdn: myhost.mydomain

...
```

From these names, a canonical name is picked for the host. This is the name the Agent primarily uses to identify itself to Datadog. The other names are submitted as well, but only as candidates for aliasing.

The canonical host name is picked according to the following rules. The first match is selected.

* **agent-hostname**: If a host name is explicitly set in the Agent configuration file.
* **hostname**: If the DNS host name is not an EC2 default (e.g. ip-192-0-0-1).
* **instance-id**: If the Agent can reach the EC2 metadata endpoint from the host.
* **hostname**: Fall back on the DNS host name even if it is an EC2 default.

If name is recognized as obviously non-unique (e.g. localhost.localdomain), the current rule fails and passes through to the next.

### Host Aliases

A single host running in EC2 might have an instance ID (i-abcd1234), a generic hostname provided by EC2 based on the host’s IP address (ip-192-0-0-1), and a meaningful host name provided by an internal DNS server or a config-managed hosts file (myhost.mydomain). Datadog creates aliases for host names when there are multiple uniquely identifiable names for a single host.

The names collected by the Agent (detailed above) are added as aliases for the chosen canonical name.

See a list of all the hosts in your account from the Infrastructure tab in Datadog. From the Inspect panel, which you get to by clicking the "Inspect" button while hovering over a host row, see (among other things) the list of aliases associated with each host.

{{< img src="agent/faq/host_aliases.png" alt="Host aliases" responsive="true" popup="true">}}