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
---

Fleet Automation allows you to remotely upgrade Datadog Agents across your fleet without direct access to individual hosts. You can trigger upgrades immediately, schedule them during maintenance windows, or automate them through the API. Upgrades are supported on Linux and Windows VMs.

## Disk space requirement

Datadog suggests at least 2 GB for the initial Agent install and an additional 2 GB to use Fleet Automation to upgrade the Agent. Specifically, the upgrade requires 1.3 GB in the `/opt/datadog-packages` directory on Linux, or `C:\ProgramData\Datadog\Installer\packages` on Windows. The extra space helps ensure there is enough room to maintain two Agent installs temporarily during the upgrade process in case a rollback is needed.

## Upgrade Agents immediately

1. From the [{{< ui >}}Upgrade Agents{{< /ui >}}][1] tab, click {{< ui >}}Upgrade Now{{< /ui >}}.

   {{< img src="/agent/fleet_automation/upgrade-screen2.png" alt="UI showing the Upgrade Agents tab with the 'Upgrade Now' button." style="width:100%;" >}}
1. Select the Agents you want to upgrade. You can target a group of Agents by filtering on host information or tags.

   {{< img src="/agent/fleet_automation/start-agent-upgrade.png" alt="Agent selection screen with filtering options to narrow the list of Agents to upgrade." style="width:100%;" >}}

1. Review the deployment plan and click {{< ui >}}Upgrade Agents{{< /ui >}} to start the upgrade.

   {{< img src="/agent/fleet_automation/agent-upgrades-staged.png" alt="Deployment plan view showing the list of Agents staged for upgrade." style="width:100%;" >}}

1. Use the [Deployments][2] dashboard to track the upgrade process. Clicking an Agent in the deployments table gives you more information about the upgrade, including the duration time, progress, and the user who started the upgrade.
   {{< img src="/agent/fleet_automation/deployments.png" alt="Deployments dashboard showing upgrade progress and details for each Agent." style="width:100%;" >}}

## Schedule Agent upgrades

1. From the [{{< ui >}}Upgrade Agents{{< /ui >}} tab][1], click {{< ui >}}+ Create Schedule{{< /ui >}}.

1. On the Upgrade Schedule page, add a {{< ui >}}Schedule name{{< /ui >}}.

1. Select the Agent version. You have the option to upgrade the Agents to the latest version, to one version behind, or to two versions behind. 

   {{< img src="/agent/fleet_automation/agent_upgrade_select_version1.png" alt="See a list of scheduled Agent upgrades." style="width:100%;" >}}

1. Specify the Agents to be upgraded. You can target a group of Agents by filtering on host information or tags.
   
   {{< img src="/agent/fleet_automation/agent_upgrade_select_agents.png" alt="See a list of Agents to be upgraded." style="width:100%;" >}}

1. Set the deployment window for these upgrades. You can select the days, time frame, and timezone for the upgrade.

   {{< img src="/agent/fleet_automation/agent_upgrade_set_window.png" alt="Select the time frame for your Agent upgrades." style="width:100%;" >}}

1. Set up notifications to receive updates on the status of the deployment. You can notify your team of the deployment status through the services you've already connected with Datadog, like Slack, Teams, or PagerDuty.

   {{< img src="/agent/fleet_automation/agent_upgrade_set_notification.png" alt="Select people or channels to be notified about the progress of the upgrade." style="width:100%;" >}}

1. Click {{< ui >}}Create Schedule{{< /ui >}} to save the schedule. 

1. See a list of your scheduled upgrades under the [{{< ui >}}Upgrade Agents{{< /ui >}} tab][1], in the {{< ui >}}Upgrade Schedules{{< /ui >}} section. 

   {{< img src="/agent/fleet_automation/agent_upgrade_schedule_list3.png" alt="See a list of upgrades scheduled for your Agents." style="width:100%;" >}}

## Upgrade Agents using the API

Fleet Automation provides an API to trigger Agent upgrades programmatically or on a recurring schedule. Start upgrades for any set of hosts using filter queries, or create schedules that run during defined maintenance windows with a specified Agent version. For full details, see the [Fleet Automation API][3].

## Upgrade process

Similar to a manual upgrade, expect a downtime of 5-30 seconds while the Agent restarts. The full upgrade process takes approximately 5 minutes. Around 2 minutes of this time is used for the upgrade process. The rest of the time is spent monitoring the upgrade to help ensure stability and determining if a rollback is necessary. If the upgrade fails and a rollback is necessary, the Agent automatically reverts to the previously running Agent version.

The upgrade process primarily adds files to the following directories:

Linux:
- `/opt/datadog-packages`
- `/etc/datadog-agent`
- `/etc/systemd/system`

Windows:
- `C:\ProgramData\Datadog\Installer\packages`
- `C:\Program Files\Datadog\Datadog Agent`

The Agent helps ensure that the appropriate permissions are set for these files. No configuration files are altered during the installation process.

## Upgrade precedence

For the most consistent upgrade experience, Datadog recommends managing upgrades from one source at a time. Use either Fleet Automation or a configuration management tool. If you run a configuration management tool on an Agent that has already been upgraded using Fleet Automation, the upgrade reverts the Agent to the [`DD_AGENT_MINOR_VERSION`][4] specified in your configuration. If no `DD_AGENT_MINOR_VERSION` is set, the Agent is upgraded to the latest available version.

## Troubleshooting

### Datadog Installer incompatible with Agent (pre-7.66)

If you were a Preview customer and set up remote Agent Management before Agent version 7.66, your Datadog Installer might be incompatible with the Agent.

To support general availability of remote Agent upgrades, the installer component was bundled with the Agent starting in version 7.66. This change helps ensure that both components stay up to date together, preventing version mismatches and related compatibility issues. Earlier versions of the Agent did not bundle these components, resulting in a possible version mismatch that could prevent automatic updates and remote Agent Management functionality.

To diagnose and fix the issue:

1. Use the following [query in Fleet Automation][5] to identify affected hosts:
   ```txt
   support_remote_upgrade:datadog-installer
   ```
1. If your setup is impacted, [re-run the install script][6] on each affected Agent to manually upgrade them to Agent version 7.66 or higher. This helps ensure full compatibility with remote Agent management features.

Manual Agent upgrades are not required after you've updated to 7.66 or higher. Future upgrades are handled automatically without requiring manual intervention.

If you don't upgrade an earlier Agent version to 7.66 or higher, there is no impact on your existing Agent. However, remote upgrades remain unavailable until you update the Agent.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/agent-upgrades
[2]: https://app.datadoghq.com/fleet/deployments
[3]: /api/latest/fleet-automation/
[4]: https://github.com/DataDog/agent-linux-install-script?tab=readme-ov-file#install-script-configuration-options
[5]: https://app.datadoghq.com/fleet?query=support_remote_upgrade%3Adatadog-installer
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
