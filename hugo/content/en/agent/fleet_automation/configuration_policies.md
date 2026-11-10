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

When you make changes from the Fleet Automation {{< ui >}}Configuration{{< /ui >}} tab, Fleet Automation applies those changes once, in a one-time deployment, and doesn't correct later changes on the host. Use a _configuration policy_ to define the configuration you want and then keep it in place. Fleet Automation re-applies the policy hourly to matching Agents, including Agents that join the scope later.

A policy adds to the existing local configuration on each Agent. If a policy setting conflicts with a local setting, the policy setting takes precedence.

## Prerequisites

- [Remote Configuration][6] enabled for your organization and the Agent's API key
- [Remote updates][7] enabled on each target VM Agent (`remote_updates: true`)
- Agent version 7.76 or later. To upgrade your Agents, see [Upgrade Agents][8].
- Linux VMs (installed with the install script or the Ansible Datadog Role) or Windows VMs
- The `<TODO>` permission

## Create a configuration policy

1. In Fleet Automation, go to the [{{< ui >}}Configuration{{< /ui >}}][1] tab, then click {{< ui >}}Create Policy{{< /ui >}} in the {{< ui >}}Configuration Policies{{< /ui >}} section.
1. Enter a policy name and optional description.
1. Scope the configuration to the target Agents. Filter by host information or tags to target a specific group. If you don't add a scope, the policy targets all eligible Agents.
1. Choose one or more configuration types. Each type you select adds its own step to the workflow. For guidance on each type, see:

    - {{< ui >}}Datadog Products{{< /ui >}}: [Configure Agents][2]
    - {{< ui >}}Agent Integrations{{< /ui >}}: [Configure Agent Integrations][3]
    - {{< ui >}}Custom Logs{{< /ui >}}: [Configure Custom Logs][4]
    - {{< ui >}}Modify Tags{{< /ui >}}: [Modify Tags][5]

1. After you've set all configurations, review your policy. Choose a {{< ui >}}Policy status{{< /ui >}}:

    - {{< ui >}}Enabled{{< /ui >}}: Deploy to the matching Agents immediately, then check hourly for new or drifted Agents. Click {{< ui >}}Save and Enable{{< /ui >}}.
    - {{< ui >}}Disabled{{< /ui >}}: Save the policy without deploying it. Click {{< ui >}}Save as Disabled{{< /ui >}}. To enable the policy later, use {{< ui >}}Enable Policy{{< /ui >}} in the policy list.

## View policies

View all your configuration policies in the [{{< ui >}}Configuration{{< /ui >}}][1] tab in Fleet Automation.

{{< img src="agent/fleet_automation/configuration_policies_list.png" alt="The Configuration Policies list in Fleet Automation, showing five policies. Each policy has a status, name, last run time, a summary of what it configures, and a scope showing the number of Agents and the tags that target them. Four policies are enabled and one is disabled." style="width:100%;" >}}

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
