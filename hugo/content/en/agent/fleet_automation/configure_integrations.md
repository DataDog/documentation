---
title: Configure Agent Integrations
description: "Remotely configure Datadog Agent integrations at scale with Fleet Automation."
further_reading:
- link: "/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "/agent/fleet_automation/configure_agents/"
  tag: "Documentation"
  text: "Configure Agents"
- link: "/api/latest/fleet-automation/"
  tag: "Documentation"
  text: "Fleet Automation API"
site_support_id: fleet-automation-standard-features
---

Fleet Automation can deploy, update, and remove [integration][1] configuration files (`conf.d`) on your Agents remotely. Select target Agents by host or tag, choose an integration, and Fleet Automation pushes the configuration change across your fleet.

## Prerequisites

- [Remote Configuration][2] enabled for your organization
- Agent version 7.76 or later
- Linux VMs (installed with the install script or the Ansible Datadog Role) or Windows VMs

<div class="alert alert-info">
Configuring integrations on Agents in containerized workloads is not supported.
</div>

## Compatibility

Fleet Automation supports configuring out-of-the-box integrations that have a `conf.d` configuration file, such as Redis, MySQL, and Windows Certificate Store.

Custom checks are **not** supported.

## Configure integrations across multiple Agents

<div class="alert alert-tip">As you step through the configuration wizard, the <strong>Configuration Summary</strong> panel shows your current selected scope of Agents. Use this to check how a change would affect an Agent by previewing configuration diffs on a specific Agent in scope.</a></div>

1. In Fleet Automation, open the [{{< ui >}}Configuration{{< /ui >}}][3] tab and click {{< ui >}}Configure Agents{{< /ui >}}.
1. Scope the configuration to the target Agents. Filter by host information or tags to target a specific group.
1. Choose {{< ui >}}Agent integrations{{< /ui >}}.
1. Select the integration to configure.

    <div class="alert alert-info">Fleet Automation can detect unconfigured integrations on your hosts. If a process is running on a host that has an available Datadog integration but no active configuration, it appears in the list of <strong>Unconfigured integrations detected on your hosts</strong>. Use this to identify monitoring gaps across your fleet.</div>

1. Select an operation (see [How configuration changes are applied](#how-configuration-changes-are-applied) for more information about each operation):

    - {{< ui >}}Add New{{< /ui >}}. Specify the filename for the new configuration file, and fill in the configuration as prompted.
    - {{< ui >}}Edit & Replace{{< /ui >}}. Click {{< ui >}}Select a file{{< /ui >}} and choose the configuration file you want to replace, then fill in the new configuration as prompted.
    - {{< ui >}}Delete{{< /ui >}}. Click {{< ui >}}Select a File to Delete{{< /ui >}}.

    <div class="alert alert-tip">Toggle between <strong>Visual</strong> and <strong>YAML</strong> mode when filling out the integration configuration. Use <strong>YAML</strong> mode to paste in YAML directly.</div>

1. Review the deployment plan. Fleet Automation generates a configuration diff for each affected Agent so you can verify the exact changes.
1. Click {{< ui >}}Deploy Configuration{{< /ui >}} to start the deployment. Track progress from the [Deployments page][4].

## How configuration changes are applied

Each operation applies changes to the integration's `conf.d` configuration file differently:

- {{< ui >}}Add New{{< /ui >}}: Deploys a new integration configuration file. If a configuration file already exists, it is replaced entirely and the YAML you provide becomes the complete new configuration for that integration on the target Agents.

- {{< ui >}}Edit & Replace{{< /ui >}}: Only the fields you specify are modified; unmentioned fields remain unchanged.

  <div class="alert alert-warning">
  Array fields (such as <code>tags</code>) are fully replaced during an Edit & Replace, not merged. Include all desired values in your update. Any values you omit are removed.
  </div>

- {{< ui >}}Delete{{< /ui >}}: Removes the integration configuration file from the target Agents.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[2]: /agent/guide/setup_remote_config
[3]: https://app.datadoghq.com/fleet/agent-management
[4]: https://app.datadoghq.com/fleet/deployments
[5]: https://www.rfc-editor.org/rfc/rfc7386
