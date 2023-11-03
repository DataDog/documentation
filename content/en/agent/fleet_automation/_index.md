---
title: Fleet Automation
kind: documentation
disable_toc: false
further_reading:
- link: "/agent/remote_config"
  tag: "Documentation"
  text: "Find out more about Remote Configuration"
- link: "/infrastructure/list/#agent-configuration"
  tag: "Documentation"
  text: "Learn about the Agent configuration view"
---

{{< callout btn_hidden="true">}}Fleet Automation is in beta.{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">Fleet Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Datadog Fleet Automation allows you to gain visibility into your fleet of Agents to ensure they are set up correctly and optimized to meet your evolving observability needs.

{{< img src="agent/fleet_automation/fleet_automation.png" alt="The fleet automation page." style="width:100%;" >}}

With Fleet Automation, you can:
- Reduce the time it takes to debug an issue by sending a remote flare straight from the [Fleet Automation][1] page.
- Ensure you're running up-to-date Agents with the latest security fixes and feature enhancements by identifying outdated Agent versions.
- Identify which Agents are using a particular API Key so you can safely rotate keys and disable old keys without impact.
- View Agent and Agent integration configurations to help confirm deployment changes and troubleshoot any configuration related issues.

To access Fleet Automation, click **Integrations** > [**Fleet Automation**][1].

From the Fleet Automation page, you can gain insight into unmonitored Agents, Agents that need to be updated, or Agents that have integration issues. For each Agent, you can see the version running on each host, whether the host has any unconfigured or misconfigured integrations, the services running on the host, and the Remote Configuration status of each host.

Selecting a host gives you more information about the host, including its configuration, connected integrations, and a support tab that you can use to send a remote flare.

{{< img src="agent/fleet_automation/selected_host.png" alt="A host's integration information," style="width:100%;" >}}

## Configuring Fleet Automation

Fleet Automation incorporates several Datadog features, which are all enabled automatically in Agents version 7.49/6.49 or later. To ensure you have access to all of the features, upgrade your Agent to version 7.49/6.49 or later.

If you're using an older Agent, you might still be able to enable the following Datadog features individually:
- **Remote Configuration**: For information on supported Agent versions and configuration steps, see [Enabling Remote Configuration][3]
- **Agent configuration**: For information on supported Agent versions and configuration steps, see [Agent configuration][4]
- **Agent integration configuration**: Agent integration configuration is enabled by default on Agent versions 7.49/6.49 or later. To disable it, set the value of `inventories_checks_configuration_enabled` in your [Agent configuration file][2] to `false`. You can also use the environment variable `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED`.

Datadog recommends upgrading your Agents regularly to make sure you have access to the latest features and security updates.

## Send a remote flare

To send a remote flare:
1. From the [Fleet Automation][1] page, select an Agent that requires support.
1. Click **Support**.
1. Click **Send Support Ticket**.
1. If you have an existing support ticket, enter the ticket number. To create a new ticket, leave the ticket number blank.
1. Ensure **Debug mode** is enabled. This option allows Datadog support staff to troubleshoot your issue faster. The log level is reset to its previous setting after the flare is sent.
1. Click **Send Ticket**.

## Controlling access to Fleet Automation

Fleet Automation is available to all users in a Datadog organization. You can control access to specific functionality:

| :Permission: | :Description: |
|--------------|---------------|
| `API keys read`| Restricts which users can view and search agents by API key. |
| `Agent flare collection` | Restricts which users can remotely send flares. `Agent flare collection` is derived from the `Write Dashboards` permission. Existing users that are able to write dashboards are able to send flares by default. |

For information on setting up roles and permissions, see [Access Control][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /agent/configuration/agent-configuration-files/
[3]: /agent/remote_config#enabling-remote-configuration
[4]: /infrastructure/list/#agent-configuration
[5]: https://docs.datadoghq.com/account_management/rbac/