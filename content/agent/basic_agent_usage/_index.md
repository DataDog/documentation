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

### Configuration files

[See the dedicated documentation for Agent configuration files][2].

### Datadog site

To send your Agent data to the [Datadog EU site][3], edit your [Agent main configuration file][4] `datadog.yaml` and set the `dd_site` parameter to:

`dd_site:datadoghq.eu`

### Log location

[See the dedicated documentation for Agent log files][5]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations
[2]: /agent/faq/agent-configuration-files
[3]: https://app.datadoghq.eu
[4]: /agent/faq/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[5]: /agent/faq/agent-log-files
