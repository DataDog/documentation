---
title: Basic Agents Usage
kind: documentation
aliases:
    - /guides/basic_agent_usage/
    - /agent/faq/where-is-the-configuration-file-for-the-agent/
    - /agent/faq/log-location
further_reading:
- link: "agent/faq/how-datadog-agent-determines-the-hostname"
  tag: "FAQ"
  text: "How does Datadog determine the Agent hostname?"
- link: "agent/faq/agent-commands"
  tag: "FAQ"
  text: "List of all Agent commands"
- link: "agent/faq/agent-configuration-files"
  tag: "FAQ"
  text: "Location of all Agent configuration files"
---

{{< partial name="platforms/platforms.html" >}}

## Configuration management tools

Manage the Datadog Agent and [Integrations][1] using configuration management tools:

{{< tabs >}}
{{% tab "Chef Cookbook" %}}

* [Chef Github project][2]
* [Installing Datadog Agent with Chef][3]

[2]: https://github.com/DataDog/chef-datadog
[3]: https://app.datadoghq.com/account/settings#integrations/chef

{{% /tab %}}
{{% tab "Puppet" %}}

* [Puppet Github project][4]
* [Installing Datadog Agent with Puppet][5]

[4]: https://github.com/DataDog/puppet-datadog-agent
[5]: https://app.datadoghq.com/account/settings#integrations/puppet

{{% /tab %}}
{{% tab "Ansible" %}}

* [Ansible Github project][6]
* [Installing Datadog Agent with Ansible][7]

[6]: https://github.com/DataDog/ansible-datadog
[7]: https://app.datadoghq.com/account/settings#agent/ansible

{{% /tab %}}
{{% tab "SaltStack" %}}

* [Installing Datadog Agent with Saltstack][8]

[8]: https://github.com/DataDog/datadog-formula

{{% /tab %}}
{{< /tabs >}}


## Configuration files

[Refer to the dedicated page for Agent configuration files][9].

## Log location

{{< tabs >}}
{{% tab "Linux" %}}

Datadog Agent logs are located in the `/var/log/datadog/` directory

{{% /tab %}}
{{% tab "macOS" %}}

Datadog Agent logs are located in the `/var/log/datadog/` directory

{{% /tab %}}
{{% tab "Windows" %}}

Datadog Agent logs are located in  the `C:\ProgramData\Datadog\logs` directory

{{% /tab %}}
{{< /tabs >}} 

The Datadog logs do a rollover every 10MB. When a rollover occurs, **one** backup is kept (e.g. `agent.log.1`). If a previous backup exists, it is overwritten during the rollover.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations
[9]: /agent/faq/agent-configuration-files
