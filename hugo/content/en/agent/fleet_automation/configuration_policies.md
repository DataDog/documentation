---
title: Configuration Policies
description: "Define a desired Agent configuration once and keep your fleet in line with it using Fleet Automation configuration policies."
further_reading:
- link: "/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "/agent/fleet_automation/configure_agents/"
  tag: "Documentation"
  text: "Configure Agents"
- link: "/agent/fleet_automation/modify_tags/"
  tag: "Documentation"
  text: "Modify Tags"
---

Define a desired Agent configuration once and apply it to all Agents or to a subset that you filter by host information or tags. Fleet Automation re-applies the policy on a schedule and reports Agents that drift from it.

## What is a configuration policy?

Changes you make from the Fleet Automation {{< ui >}}Configuration{{< /ui >}} tab are one-time deployments: Fleet Automation applies them once, and doesn't correct later changes on the host. A configuration policy defines the configuration you want and keeps it in place. Fleet Automation re-applies the policy hourly to matching Agents, including Agents that join the scope later.

## Prerequisites

- [Remote Configuration][6] enabled for your organization and the Agent's API key
- [Remote updates][7] enabled on each target VM Agent (`remote_updates: true`)
- Agent version 7.76 or later. To upgrade your Agents, see [Upgrade Agents][8].
- Linux VMs (installed with the install script or the Ansible Datadog Role) or Windows VMs
- The `<TODO>` permission

## Create a configuration policy

1. In Fleet Automation, go to the [{{< ui >}}Configuration{{< /ui >}}][1] tab, then click {{< ui >}}+ Create Policy{{< /ui >}}.
1. Enter a policy name and optional description.
1. Scope the configuration to the target Agents. Filter by host information or tags to target a specific group.
1. Choose one or more configuration types. For guidance on each type, see:

    - [Configure Agents][2]
    - [Configure Agent Integrations][3]
    - [Configure Custom Logs][4]
    - [Modify Tags][5]

1. After you've set all configurations, review your policy. Choose a {{< ui >}}Policy status{{< /ui >}}:

    - {{< ui >}}Enabled{{< /ui >}}: Deploy to the matching Agents immediately, then check hourly for new or drifted Agents.
    - {{< ui >}}Disabled{{< /ui >}}: Save the policy without deploying it. You can enable the policy from the policy list later.

1. Click {{< ui >}}Save and Enable{{< /ui >}} (or {{< ui >}}Save as Disabled{{< /ui >}}) to save the policy.

## View policies

View all your configuration policies in the [{{< ui >}}Configuration{{< /ui >}}][1] tab in Fleet Automation.

<!-- screenshot with a couple representative example policies? -->

Click the three-dot menu to the right of any policy name to enable or disable the policy, or edit, duplicate, or delete it.

## Monitor policy drift

<!-- what counts as drift, where per-host status appears, and what Fleet Automation does when it detects drift. -->

<TODO>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/agent-management
[2]: /agent/fleet_automation/configure_agents/
[3]: /agent/fleet_automation/configure_integrations/
[4]: /agent/fleet_automation/configure_logs/
[5]: /agent/fleet_automation/modify_tags/
[6]: /agent/guide/setup_remote_config
[7]: /agent/guide/setup_remote_config/#enable-remote-agent-management
[8]: /agent/fleet_automation/upgrade_agents/
