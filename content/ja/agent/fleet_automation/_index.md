---
disable_toc: false
further_reading:
- link: /agent/remote_config
  tag: Documentation
  text: Find out more about Remote Configuration
- link: /infrastructure/list/#agent-configuration
  tag: Documentation
  text: Learn about the Agent configuration view
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: Blog
  text: Centrally govern and remotely manage Datadog Agents at scale with Fleet Automation
title: Fleet Automation
---

{{< callout btn_hidden="true">}}Fleet Automation is in beta. Access it from the <a href="https://app.datadoghq.com/fleet">Fleet Automation</a> page in Datadog.{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">Fleet Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## 概要

Datadog Fleet Automation allows you to centrally govern and remotely manage Datadog Agents at scale to support your evolving observability needs.

{{< img src="agent/fleet_automation/fleet-automation.png" alt="The fleet automation page" style="width:100%;" >}}

With the Fleet Automation platform, you can:
- View Agent and Agent integration configurations to help confirm deployment changes and ensure configuration consistency.
- Send a flare from within your organization, reducing the time it takes to debug issues on an Agent.
- Ensure your fleet of Agents is using the latest feature enhancements by identifying outdated Agent versions.
- Help rotate API keys and ensure old keys can be disabled with no impact by identifying which Agents, and how many Agents, are using a particular key.

Use the [**Fleet Automation**][1] page to gain insight into unmonitored hosts, Agents that need to be updated, or Agents that have integration issues. For each Agent, you can see:
- The Agent version
- Whether the Agent has any unconfigured or misconfigured integrations
- The services that the Agent is monitoring
- The Agent's Remote Configuration status
- The products that are enabled on the Agent

Selecting an Agent gives you more information about it, including its configuration, connected integrations, and a support tab that you can use to send a remote flare.

{{< img src="agent/fleet_automation/fleet-automation-agent.png" alt="An Agent's integration information" style="width:100%;" >}}

## Configuring Fleet Automation

Fleet Automation incorporates several Datadog features, which are all enabled automatically in Agent version 7.49/6.49 or later. To ensure you have access to all of the features, upgrade your Agents to version 7.49/6.49 or later.

If you're using an older Agent, you might still be able to enable the following Datadog features individually:
- **Remote Configuration**: For information on supported Agent versions and configuration steps, see [Enabling Remote Configuration][3].
- **Agent configuration**: Agent version 7.39/6.39 or later is required to enable the Agent configuration tab. It is enabled by default in Agent versions 7.47.0/6.47.0 or later. To enable Agent configuration manually, set `inventories_configuration_enabled` in your [Agent configuration file][2] to `true`. Alternatively, use the `DD_INVENTORIES_CONFIGURATION_ENABLED` environment variable.
- **Agent integration configuration**: Agent integration configuration is enabled by default on Agent versions 7.49/6.49 or later. To enable Agent integration configuration manually, set `inventories_checks_configuration_enabled` in your [Agent configuration file][2] to `true`. Alternatively, use the environment variable `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED`.

Datadog recommends upgrading your Agents regularly to make sure you have access to the latest features.

## Send a remote flare

Before you send a flare, make sure that Remote Configuration is [enabled](#configuring-fleet-automation) on the selected Agent.

{{% remote-flare %}}

{{< img src="agent/fleet_automation/fleet-automation-flares.png" alt="The Send Ticket button launches a form to send a flare for an existing or new support ticket" style="width:100%;" >}}

## Control access to Fleet Automation

Fleet Automation is available to all users in a Datadog organization. You can control access to specific functionality:

| アクセス許可 | 説明 |
|--------------|---------------|
| `API keys read`| Restricts which users can view and search Agents by API key. |
| `Agent flare collection` | Restricts which users can remotely send flares. |

For information on setting up roles and permissions, see [Access Control][5].

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /ja/agent/configuration/agent-configuration-files/
[3]: /ja/agent/remote_config#enabling-remote-configuration
[4]: /ja/infrastructure/list/#agent-configuration
[5]: https://docs.datadoghq.com/ja/account_management/rbac/