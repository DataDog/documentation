---
title: Configure Custom Logs
description: "Remotely configure custom log collection at scale with Fleet Automation."
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
- link: "/agent/logs/"
  tag: "Documentation"
  text: "Host Agent Log Collection"
- link: "/logs/guide/log-collection-troubleshooting-guide/"
  tag: "Documentation"
  text: "Log Collection Troubleshooting Guide"
site_support_id: fleet-automation-standard-features
---

Use [Fleet Automation][2] to manage [custom log collection][4] settings on your Agents remotely at scale. Instead of editing `conf.d` configuration files host by host, scope a change by host information or tag and deploy it to all matching Agents at once. Before deploying, review the configuration diff for each Agent in scope.

## Prerequisites

- [Remote Configuration][1] enabled for your organization
- Agent version 7.76 or later. To upgrade your Agents, see [Upgrade Agents][5].
- Linux VMs (installed with the install script or the Ansible Datadog Role) or Windows VMs
- Log collection enabled on the target Agents (`logs_enabled: true` in `datadog.yaml`). Fleet Automation deploys the configuration file either way, but the Agent does not start collecting logs until log collection is enabled. See [Host Agent Log Collection][8].

<div class="alert alert-info">
Configuring custom logs on Agents in containerized workloads is not supported. For containerized environments, see <a href="/containers/kubernetes/log/">Kubernetes Log Collection</a>.
</div>

## Configure custom logs across multiple Agents

<div class="alert alert-tip">As you step through the configuration wizard, the <strong>Configuration Summary</strong> panel shows your current selected scope of Agents. Use this to check how a change would affect an Agent by previewing configuration diffs on a specific Agent in scope.</div>

1. In Fleet Automation, open the [{{< ui >}}Configuration{{< /ui >}}][2] tab and click {{< ui >}}Configure Agents{{< /ui >}}.
1. Scope the configuration to the target Agents. Filter by host information or tags to target a specific group.
1. Choose {{< ui >}}Custom Logs{{< /ui >}}.
1. Select an operation (for more information, see [How configuration changes are applied](#how-configuration-changes-are-applied)):

    - {{< ui >}}Add New{{< /ui >}}. Specify the filename for the new configuration file, and fill in the configuration as prompted. For an explanation of the log collection fields, see [Custom log collection][4]. Use the {{< ui >}}Tags{{< /ui >}} field to attach [tags][6] to the collected logs. Click {{< ui >}}+ Add Log Collection{{< /ui >}} to add more log collection settings.
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

## Verify log collection

After you deploy a configuration:

1. In [Fleet Automation][9], open the details page for one of the targeted Agents.
1. In the {{< ui >}}Configuration{{< /ui >}} tab, confirm that the new or updated custom log configuration file is listed with no error status. This means the configuration was pushed and applied successfully.

If the deployment succeeded but no logs arrive, see the [Log Collection Troubleshooting Guide][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/setup_remote_config
[2]: https://app.datadoghq.com/fleet/agent-management
[3]: https://app.datadoghq.com/fleet/deployments
[4]: /agent/logs/?tab=tailfiles#custom-log-collection
[5]: /agent/fleet_automation/upgrade_agents/
[6]: /getting_started/tagging/assigning_tags/
[7]: /logs/guide/log-collection-troubleshooting-guide/
[8]: /agent/logs/
[9]: https://app.datadoghq.com/fleet
