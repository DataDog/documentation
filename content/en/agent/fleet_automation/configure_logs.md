---
title: Configure Custom Logs
description: "Remotely configure custom log collection at scale with Fleet Automation."
private: true
further_reading:
- link: "/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "/agent/fleet_automation/configure_integrations/"
  tag: "Documentation"
  text: "Configure Agent Integrations"
- link: "/agent/fleet_automation/configure_agents/"
  tag: "Documentation"
  text: "Configure Agents"
- link: "/api/latest/fleet-automation/"
  tag: "Documentation"
  text: "Fleet Automation API"
site_support_id: fleet-automation-standard-features
---

Use [Fleet Automation][2] to manage custom log collection settings on your Agents remotely at scale.

## Prerequisites

- [Remote Configuration][1] enabled for your organization
- Agent version 7.76 or later
- Linux VMs (installed with the install script or the Ansible Datadog Role) or Windows VMs

<div class="alert alert-info">
Configuring custom logs on Agents in containerized workloads is not supported.
</div>

## Configure custom logs across multiple Agents

<div class="alert alert-tip">As you step through the configuration wizard, the <strong>Configuration Summary</strong> panel shows your current selected scope of Agents. Use this to check how a change would affect an Agent by previewing configuration diffs on a specific Agent in scope.</a></div>

1. In Fleet Automation, open the [{{< ui >}}Configuration{{< /ui >}}][2] tab and click {{< ui >}}Configure Agents{{< /ui >}}.
1. Scope the configuration to the target Agents. Filter by host information or tags to target a specific group.
1. Choose {{< ui >}}Custom Logs{{< /ui >}}.
1. Select an operation (for more information, see [How configuration changes are applied](#how-configuration-changes-are-applied)):

    - {{< ui >}}Add New{{< /ui >}}. Specify the filename for the new configuration file, and fill in the configuration as prompted. You can add additional log collection settings by clicking {{< ui >}}+ Add Log Collection{{< /ui >}}.
    - {{< ui >}}Edit & Replace{{< /ui >}}. Click {{< ui >}}Select a File{{< /ui >}} and choose the configuration file you want to replace, then update the log collection settings.
    - {{< ui >}}Delete{{< /ui >}}. Click {{< ui >}}Select a File to Delete{{< /ui >}}.

    <div class="alert alert-tip">Toggle between <strong>Visual</strong> and <strong>YAML</strong> mode when filling out the log collection configuration. Use <strong>YAML</strong> mode to paste in YAML directly.</div>

1. Review the deployment plan. Fleet Automation generates a configuration diff for each affected Agent so you can verify the exact changes.
1. Click {{< ui >}}Deploy Configuration{{< /ui >}} to start the deployment. Track progress from the [Deployments page][3].

## How configuration changes are applied

Each operation applies changes to custom log collection on an Agent differently:

- {{< ui >}}Add New{{< /ui >}}: Deploys a new configuration file.

- {{< ui >}}Edit & Replace{{< /ui >}}: Replaces the entire configuration file. Include all desired values in your update. Any values you omit are removed.

- {{< ui >}}Delete{{< /ui >}}: Removes the configuration file from the target Agents.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/setup_remote_config
[2]: https://app.datadoghq.com/fleet/agent-management
[3]: https://app.datadoghq.com/fleet/deployments
