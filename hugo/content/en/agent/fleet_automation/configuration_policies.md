---
title: Configuration Policies
description: One line description
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

Define a desired Agent configuration once and apply it to all Agents or a tag-scoped subset. Fleet Automation re-applies the policy on a schedule and reports hosts that drift from it.

## What is a configuration policy?

When you use any of the options in the Fleet Automation {{< ui >}}Configuration{{< /ui >}} tab, the configuration changes you specify are deployed only once, at the time you use it. With configuration policies, you can define your desired configuration ahead of time, and the changes are applied on a regular schedule.

## Create a configuration policy

1. Confirm that you have X permissions.
1. In Fleet Automation, go to the [{{< ui >}}Configuration{{< /ui >}}][1] tab, then click {{< ui >}}+ Create Policy{{< /ui >}}.
1. Enter a policy name and optional description.
1. Scope the configuration to the target Agents. Filter by host information or tags to target a specific group.
1. Choose what to configure. You can select multiple things to configure. See the following topics for more guidance on completing your desired configuration:

    - [Configure Agents][2]
    - [Configure Agent Integrations][3]
    - [Configure Custom Logs][4]
    - [Modify Tags][5]

1. After you've set all configurations, review your policy. Choose a {{< ui >}}Policy status{{< /ui >}}:

    - {{< ui >}}Enabled{{< /ui >}}: Deploy to the matching Agents now, then check hourly for new or drifted Agents
    - {{< ui >}}Disabled{{< /ui >}}: Save without deploying. You can enable the policy from the policy list later

## Viewing policies

View all your configuration policies in the [{{< ui >}}Configuration{{< /ui >}}][1] tab in Fleet Automation.

<!-- screenshot with a couple representative example policies? -->

Click the three dots menu to the right of any policy name to enable or disable the policy, or edit, duplicate, or delete it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/agent-management
[2]: /agent/fleet_automation/configure_agents
[3]: /agent/fleet_automation/configure_integrations
[4]: /agent/fleet_automation/configure_logs
[5]: /agent/fleet_automation/modify_tags
