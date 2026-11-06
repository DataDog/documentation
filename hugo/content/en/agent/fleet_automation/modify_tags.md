---
title: Modify Tags
description: One line description
further_reading:
- link: "/getting_started/tagging"
  tag: "Documentation"
  text: "Getting Started with Tags"
---

[Fleet Automation][1] can add, remove, and rename [tags][2] on your Agents remotely. Select target Agents by host or tag, specify your tag changes, and preview your deployment before Fleet Automation pushes the change across your fleet.

## Prerequisites

- [Remote Configuration][3] enabled for your organization and the Agent's API key
- [Remote updates][4] enabled on each target VM Agent (`remote_updates: true`)
- Agent version 7.76 or later. To upgrade your Agents, see [Upgrade Agents][5].
- Linux VMs (installed with the install script or the Ansible Datadog Role) or Windows VMs

## Modify tags across multiple Agents

<div class="alert alert-tip">As you step through the configuration wizard, the <strong>Configuration Summary</strong> panel shows your current selected scope of Agents. Use this to check how a change would affect an Agent by previewing configuration diffs on a specific Agent in scope.</div>

1. In Fleet Automation, open the [{{< ui >}}Configuration{{< /ui >}}][6] tab and choose {{< ui >}}Modify Tags{{< /ui >}} under {{< ui >}}Configure Agents{{< /ui >}}.
1. Scope the configuration to the target Agents. Filter by host information or tags to target a specific group.
1. Choose tags to add, remove, or replace:

    - {{< ui >}}Add Tags{{< /ui >}}: Specify the tag name. Use spaces to separate multiple tags.
    - {{< ui >}}Remove Tags{{< /ui >}}: Specify the tag to remove. As you type, suggested tags appear in the dropdown. Use spaces to separate multiple tags.
    - {{< ui >}}Replace Tags{{< /ui >}}: Specify an existing tag in the {{< ui >}}Old tag{{< /ui >}} field, then enter a {{< ui >}}New tag{{< /ui >}} to replace it with.

      By default, the old tag is matched as plain text. Click the {{< ui >}}.*{{< /ui >}} button to use regular expressions to match tags instead.

    {{< img src="agent/fleet_automation/fa_modify_tags.png" alt="Your image description" style="width:100%;" >}}


    <div class="alert alert-info">When you specify multiple tag rules in the same deployment, the rules are applied sequentially, from top to bottom as they appear in the <strong>Choose tags to add or remove</strong> screen. This means, for example, that a tag added with <strong>Add Tags</strong> can be modified by a <strong>Replace Tags</strong> rule, and the second <strong>Replace Tags</strong> rule that you specify can modify a tag already modified by your first <strong>Replace Tags</strong> rule. Keep this in mind when writing your tag rules.</div>

1. Review the deployment plan. Fleet Automation generates a configuration diff for each affected Agent so you can verify the exact changes.
1. Click {{< ui >}}Deploy Configuration{{< /ui >}} to start the deployment. Track progress from the [Deployments page][3].

[1]: https://app.datadoghq.com/fleet/agent-management
[2]: /getting_started/tagging/
[3]: /agent/guide/setup_remote_config
[4]: /agent/guide/setup_remote_config/#enable-remote-agent-management
[5]: /agent/fleet_automation/upgrade_agents/
[6]: https://app.datadoghq.com/fleet/deployments
