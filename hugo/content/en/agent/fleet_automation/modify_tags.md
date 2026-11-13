---
title: Modify Tags
description: "Remotely add, remove, and replace Agent tags at scale with Fleet Automation."
further_reading:
- link: "/getting_started/tagging"
  tag: "Documentation"
  text: "Getting Started with Tags"
---

[Fleet Automation][1] can add, remove, and replace [tags][2] on your Agents remotely. Select target Agents by host or tag, specify your tag changes, and preview your deployment before Fleet Automation pushes the change across your fleet.

## Prerequisites

- Agent version 7.82 or later. To upgrade your Agents, see [Upgrade Agents][5].
- Linux VMs (installed with the install script or the Ansible Datadog Role) or Windows VMs
- [Remote Configuration][3] enabled for your organization and the Agent's API key

## Modify tags across multiple Agents

<div class="alert alert-tip">As you step through the configuration wizard, the <strong>Configuration Summary</strong> panel shows your current selected scope of Agents. Use this to check how a change would affect an Agent by previewing configuration diffs on a specific Agent in scope.</div>

1. In Fleet Automation, open the [{{< ui >}}Configuration{{< /ui >}}][1] tab and choose {{< ui >}}Modify Tags{{< /ui >}}.
1. Scope the configuration to the target Agents. Filter by host information or tags to target a specific group.
1. Choose tags to add, remove, or replace:

    - {{< ui >}}Add Tags{{< /ui >}}: Enter the tags to add, such as `managed_by:fleet`. Use spaces to separate multiple tags.
    - {{< ui >}}Remove Tags{{< /ui >}}: Enter the tags to remove. As you type, suggested tags appear in the dropdown. Use spaces to separate multiple tags.
    - {{< ui >}}Replace Tags{{< /ui >}}: Specify an existing tag in the {{< ui >}}Old tag{{< /ui >}} field, then enter a {{< ui >}}New tag{{< /ui >}} to replace it with.

      By default, the old tag is matched as plain text. Click the {{< ui >}}.*{{< /ui >}} button to use regular expressions to match tags instead.

      In a regular expression, use `(...)` or `(?<name>...)` to define capture groups, and `${index}` or `${name}` to reference them in the {{< ui >}}New tag{{< /ui >}} field. For example, to rename `team:` tags to `owner:` while keeping their values, enter `team:(.*)` as the old tag and `owner:${1}` as the new tag.

    {{< img src="agent/fleet_automation/fa_modify_tags.png" alt="The Choose tags to add or remove step in Fleet Automation's Modify Tags workflow, showing the managed_by:fleet tag in the Add Tags field, an empty Remove Tags field, and a Replace Tags rule that uses a regular expression to replace env:p.* with env:prod." style="width:100%;" >}}

    <div class="alert alert-info">When a deployment has multiple tag rules, Fleet Automation applies them in order, from top to bottom. A later rule can act on the result of an earlier one. For example, a <strong>Replace Tags</strong> rule can change a tag that <strong>Add Tags</strong> added, or a tag that an earlier <strong>Replace Tags</strong> rule changed.</div>

1. Review the deployment plan. Fleet Automation generates a configuration diff for each affected Agent so you can verify the exact changes.
1. Click {{< ui >}}Deploy Configuration{{< /ui >}} to start the deployment. Track progress from the [Deployments page][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/agent-management
[2]: /getting_started/tagging/
[3]: /agent/guide/setup_remote_config
[4]: /agent/guide/setup_remote_config/#enable-remote-agent-management
[5]: /agent/fleet_automation/upgrade_agents/
[6]: https://app.datadoghq.com/fleet/deployments
