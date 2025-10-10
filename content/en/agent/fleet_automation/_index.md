---
title: Fleet Automation
description: "Centrally govern and remotely manage Datadog Agents at scale with configuration views, upgrades, flare collection, and API key rotation."
disable_toc: false
further_reading:
- link: "/remote_configuration"
  tag: "Documentation"
  text: "Find out more about Remote Configuration"
- link: "/infrastructure/list/#agent-configuration"
  tag: "Documentation"
  text: "Learn about the Agent configuration view"
- link: "https://www.datadoghq.com/blog/fleet-automation/"
  tag: "Blog"
  text: "Centrally govern and remotely manage Datadog Agents at scale with Fleet Automation"
---

## Overview

Datadog Fleet Automation allows you to centrally govern and remotely manage Datadog Agents at scale to support your evolving observability needs.

{{< img src="/agent/fleet_automation/fleet_automation2.png" alt="The fleet automation page" style="width:100%;" >}}

## Use cases

With the Fleet Automation platform, you can:
- View the latest Agent configurations and historical changes to help confirm deployment updates and ensure configuration consistency.
- Ensure your fleet of Agents is using the latest feature enhancements by identifying and upgrading outdated Agent versions.
- Send a flare from within your organization, reducing the time it takes to debug issues on an Agent.
- Help rotate API keys and ensure old keys can be disabled with no impact by identifying which Agents, and how many Agents, are using a particular key.

## Configure Fleet Automation

- **Remotely Upgrade and Configure Agents**: For information on supported Agent versions and configuration steps, see [Enable Remote Agent Management][3].
- **View Agent configuration**: The Agent configuration view is enabled by default in Agent versions 7.47.0 or later. To enable Agent configuration manually, set `inventories_configuration_enabled` in your [Agent configuration file][2] to `true`. Alternatively, use the `DD_INVENTORIES_CONFIGURATION_ENABLED` environment variable.
- **View Agent integration configuration**: Agent integration configuration is enabled by default on Agent versions 7.49 or later. To enable Agent integration configuration manually, set `inventories_checks_configuration_enabled` in your [Agent configuration file][2] to `true`. Alternatively, use the environment variable `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED`.

## Observe your fleet

Use the [**Fleet Automation**][1] page to gain insight into unmonitored hosts, Agents that need to be updated, or Agents that have integration issues. For each Agent, you can see:
- The Agent version
- Whether the Agent has any unconfigured or misconfigured integrations
- The services that the Agent is monitoring
- The Agent's Remote Configuration status
- The products that are enabled on the Agent
- Agent Audit Trail events including configuration changes, upgrades and flares

### Examine an Agent

Selecting an Agent gives you more information about it, including its configuration, connected integrations, audit events, and a support tab that you can use to send a remote flare.

{{< img src="agent/fleet_automation/fleet-automation-view-config.png" alt="An Agent's integration information" style="width:100%;" >}}

### View Agent Audit Trail events

The Audit Events tab displays Audit Trail events associated with the selected Agent.
Use this tab to:
- Identify configuration changes, API key updates, installs, upgrades and support flares.
- Determine when changes were made and from where

Audit Trail event visibility depends on your plan. When Audit Trail is enabled in your organization, you can view Agent events for up to 90 days based on your Audit Trail retention settings. If Audit Trail is not enabled in your organization, you can view the past 24 hours of events.

### Send a remote flare

After you enable Remote Configuration on an Agent, you can send a flare from Datadog. For instructions on sending a flare, see [Send a flare from the Datadog site][7].

When contacting Datadog Support with Remote Configuration enabled for an Agent, the Support team may initiate a flare from your environment in order to better assist you in a timely manner. Flares provide troubleshooting information to Datadog Support to help you resolve your issue.

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="Send a remote flare" style="width:100%;" >}}

## Remote Agent Management

Remote Agent Management simplifies the process of upgrading your Agent fleet by reducing the need to coordinate with multiple deployment or configuration management tools. For more information, see [Remote Agent Management][6].

{{< img src="agent/fleet_automation/fleet-automation-upgrades-2.png" alt="Upgrade agents remotely in Fleet Automation" style="width:100%;" >}}

## Control access to Fleet Automation

Fleet Automation is available to all users in a Datadog organization. You can control access to specific functionality:

| Permission | Description |
|--------------|---------------|
| `API Keys Read`| Restricts which users can view and search Agents by API key. |
| `Agent Flare Collection` | Restricts which users can remotely send flares from Fleet Automation. |
| `Agent Upgrade` | Restricts which users have access to upgrade Agents from Fleet Automation. |
| `Agent Configuration Management` | Restricts which users have access to configure Agents from Fleet Automation. |

For information on setting up roles and permissions, see [Access Control][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /agent/configuration/agent-configuration-files/
[3]: /agent/fleet_automation/remote_management/#setup
[4]: /infrastructure/list/#agent-configuration
[5]: /account_management/rbac/
[6]: /agent/fleet_automation/remote_management/
[7]: /agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
