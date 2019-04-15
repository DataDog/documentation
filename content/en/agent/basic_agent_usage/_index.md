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
- link: "agent/guide/agent-commands"
  tag: "FAQ"
  text: "List of all Agent commands"
- link: "agent/guide/agent-configuration-files"
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

### Update the Agent

To manually update the Datadog Agent core between to minor versions on a given host, run the [corresponding install command for your platform][2].

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
