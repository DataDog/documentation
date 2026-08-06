---
title: Upgrade Agents
description: "Remotely upgrade Datadog Agents using Fleet Automation."
further_reading:
- link: "/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "/api/latest/fleet-automation/"
  tag: "Documentation"
  text: "Fleet Automation API"
site_support_id: fleet-automation-standard-features
---

Fleet Automation allows you to remotely upgrade Datadog Agents across your fleet without direct access to individual hosts. You can trigger upgrades immediately, schedule them during maintenance windows, or automate them through the API.

## Prerequisites

- [Remote Configuration][7] enabled for your organization
- Agent version 7.71 for Windows and 7.69 for Linux
- Linux VMs or Windows VMs
- At least 2 GB disk space for the initial Agent install, plus an additional 2 GB for upgrades. (The upgrade requires 1.3 GB in `/opt/datadog-packages` on Linux, or `C:\ProgramData\Datadog\Installer\packages` on Windows. The additional space maintains two Agent installs temporarily during the upgrade in case a rollback is needed.)

<div class="alert alert-info">
Remote upgrading of Agents in containerized workloads is not supported.
</div>

## Upgrade Agents immediately

1. From the [{{< ui >}}Upgrades{{< /ui >}}][1] tab, click {{< ui >}}Upgrade Now{{< /ui >}}.

   {{< img src="/agent/fleet_automation/upgrade-screen2.png" alt="The Upgrades tab with the Upgrade Now button." style="width:100%;" >}}
1. Select the Agents to upgrade. Filter by host information or tags to target a specific group.

   {{< img src="/agent/fleet_automation/start-agent-upgrade.png" alt="Agent selection screen with filtering options to narrow the list of Agents to upgrade." style="width:100%;" >}}

1. Review the deployment plan and click {{< ui >}}Upgrade Agents{{< /ui >}} to start the upgrade.

   {{< img src="/agent/fleet_automation/agent-upgrades-staged.png" alt="Deployment plan view showing the list of Agents staged for upgrade." style="width:100%;" >}}

1. Track progress on the [Deployments][2] dashboard. Click an Agent in the deployments table to view duration, progress, and the user who initiated the upgrade.
   {{< img src="/agent/fleet_automation/deployments.png" alt="Deployments dashboard showing upgrade progress and details for each Agent." style="width:100%;" >}}

## Schedule Agent upgrades

1. From the [{{< ui >}}Upgrades{{< /ui >}} tab][1], click {{< ui >}}+ Create Schedule{{< /ui >}}.

1. On the Upgrade Schedule page, add a {{< ui >}}Schedule name{{< /ui >}}.

1. Select the Agent version. You can upgrade to the latest version, one version behind, or two versions behind. 

   {{< img src="/agent/fleet_automation/agent_upgrade_select_version1.png" alt="See a list of scheduled Agent upgrades." style="width:100%;" >}}

1. Specify the Agents to upgrade. Filter by host information or tags to target a specific group.
   
   {{< img src="/agent/fleet_automation/agent_upgrade_select_agents.png" alt="See a list of Agents to be upgraded." style="width:100%;" >}}

1. Set the deployment window for these upgrades. You can select the days, time frame, and timezone for the upgrade.

   {{< img src="/agent/fleet_automation/agent_upgrade_set_window.png" alt="Select the time frame for your Agent upgrades." style="width:100%;" >}}

1. Set up notifications for deployment status updates. Notify your team through services connected to Datadog, such as Slack, Teams, or PagerDuty.

   {{< img src="/agent/fleet_automation/agent_upgrade_set_notification.png" alt="Select people or channels to be notified about the progress of the upgrade." style="width:100%;" >}}

1. Click {{< ui >}}Create Schedule{{< /ui >}} to save the schedule. 

1. See a list of your scheduled upgrades under the [{{< ui >}}Upgrades{{< /ui >}} tab][1], in the {{< ui >}}Upgrade Schedules{{< /ui >}} section. 

   {{< img src="/agent/fleet_automation/agent_upgrade_schedule_list3.png" alt="See a list of upgrades scheduled for your Agents." style="width:100%;" >}}

## Upgrade Agents with the API

Fleet Automation provides an API to trigger Agent upgrades programmatically or on a recurring schedule. Start upgrades for any set of hosts with filter queries, or create schedules that run during defined maintenance windows with a specified Agent version. For full details, see the [Fleet Automation API][3].

## Upgrade process

Similar to a manual upgrade, expect 5-30 seconds of downtime while the Agent restarts. The full upgrade process takes approximately 5 minutes: around 2 minutes for the upgrade itself, with the remaining time spent monitoring stability. If the upgrade fails, the Agent automatically reverts to the previous version.

The upgrade process primarily adds files to the following directories:

Linux:
- `/opt/datadog-packages`
- `/etc/datadog-agent`
- `/etc/systemd/system`

Windows:
- `C:\ProgramData\Datadog\Installer\packages`
- `C:\Program Files\Datadog\Datadog Agent`

The Agent sets the appropriate permissions for these files. No configuration files are altered during the upgrade.

## Upgrade precedence

Datadog recommends managing upgrades from one source at a time. Use either Fleet Automation or a configuration management tool, not both. If you run a configuration management tool on an Agent that was upgraded through Fleet Automation, the tool reverts the Agent to the [`DD_AGENT_MINOR_VERSION`][4] in your configuration. If no `DD_AGENT_MINOR_VERSION` is set, the Agent upgrades to the latest available version.

## Troubleshooting

### Newly released Agent version is not yet available for upgrade

After a new Agent version is released, it can take up to 24 hours before it appears as an upgrade target in Fleet Automation. If a recently released version is missing from the upgrade picker, wait up to 24 hours and retry.

### Datadog Installer incompatible with Agent (pre-7.66)

If you were a Preview customer and set up remote Agent Management before Agent version 7.66, your Datadog Installer might be incompatible with the Agent.

Starting in version 7.66, the installer component is bundled with the Agent. This keeps both components in-sync and prevents version mismatches that can block remote management. Earlier Agent versions did not bundle the installer, which can cause compatibility issues.

To diagnose and fix the issue:

1. Use the following [query in Fleet Automation][5] to identify affected hosts:
   ```txt
   support_remote_upgrade:datadog-installer
   ```
1. If your setup is impacted, [re-run the install script][6] on each affected Agent to upgrade to Agent 7.66 or later.

After updating to 7.66 or later, future upgrades are handled automatically. If you do not upgrade, the existing Agent continues to function, but remote upgrades remain unavailable.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/agent-upgrades
[2]: https://app.datadoghq.com/fleet/deployments
[3]: /api/latest/fleet-automation/
[4]: https://github.com/DataDog/agent-linux-install-script?tab=readme-ov-file#install-script-configuration-options
[5]: https://app.datadoghq.com/fleet?query=support_remote_upgrade%3Adatadog-installer
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[7]: /agent/guide/setup_remote_config
