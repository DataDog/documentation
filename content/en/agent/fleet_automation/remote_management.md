---
title: Remote Agent Management
description: Remotely upgrade and configure your Agents
further_reading:
- link: "/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "/remote_configuration"
  tag: "Documentation"
  text: "Remote Configuration"
---

## Overview


Remote Agent Management simplifies the process of upgrading your Agent fleet by reducing the need to coordinate with multiple deployment or configuration management tools. Remote Agent Management gives you access to:
* **Centralized Management** - Upgrade Agents across all environments with a single tool, ensuring consistency with the latest features and security patches.
* **Visibility and Monitoring** - Track the status of upgrades in real-time, allowing quick verification of deployment success.
* **Operational Efficiency** - Streamline the upgrade process by eliminating cross-team coordination and unifying deployment across different platforms.

## Prerequisites

### Supported platforms

- Linux VMs installed using the install script or Ansible Datadog Role
- Windows VMs

Remotely upgrading Agents in containerized environments is not supported.

### Permissions 
Users must have the [Agent Upgrade][2] within Fleet Automation for upgrades, and the [Fleet Policies Write][2] permissions to configure Agents remotely. The permission is enabled by default on the Datadog Admin role.

## Enable Remote Agent Management
1. Verify that [Remote Configuration is enabled for your organization][15].
2. Confirm that your Agent version is 7.69 or later (for Windows hosts, use 7.71.1 or later).
3. Ensure that your Datadog Agent configuration (`datadog.yaml`) includes `remote_updates: true`, or alternatively set the environment variable `DD_REMOTE_UPDATES=true`. Enabling either option turns on Remote Agent Management for the Agent.

## Upgrade Agents remotely

### Prerequisites
* **Disk space**: Datadog suggests at least 2GB for the initial Agent install and an additional 2GB for upgrading the Agent from Fleet Automation. Specifically, the upgrade requires 1.3GB in the `/opt/datadog-packages` directory on Linux, or `C:\ProgramData\Datadog\Installer\packages` on Windows. The extra space ensures that there is enough room to maintain two Agent installs temporarily during the upgrade process in case a rollback is needed.

### Upgrade process

Similar to a manual upgrade, expect a downtime of 5-30 seconds while the Agent restarts. The full upgrade process takes approximately 5 minutes. Around 2 minutes of this time is used for the upgrade process. The rest of the time is spent monitoring the upgrade to ensure stability and determining if a rollback is necessary. If the upgrade fails and a rollback is necessary, the Agent automatically reverts to the previously running Agent version.

The upgrade process primarily adds files to the following directories:

Linux:
* `/opt/datadog-packages`
* `/etc/datadog-agent`
* `/etc/systemd/system`

Windows:
* `C:\ProgramData\Datadog\Installer\packages`
* `C:\Program Files\Datadog\Datadog Agent`

The Agent ensures that the appropriate permissions are set for these files. No configuration files are altered during the installation process.

### How to upgrade Agents remotely
To upgrade your Agents remotely:
1. [Enable Remote Agent Management](#enable-remote-agent-management).
1. From the [**Upgrade Agents** tab][4], click **Start Agents Upgrade**.

   {{< img src="/agent/fleet_automation/upgrade-screen.png" alt="Select the Agents you want to upgrade." style="width:100%;" >}}
1. Select the Agents you want to upgrade. You can target a group of Agents by filtering on host information or tags.

   {{< img src="/agent/fleet_automation/start-agent-upgrade.png" alt="Select the Agents you want to upgrade." style="width:100%;" >}}

1. Review the deployment plan and click **Upgrade Agents** to start the upgrade.

   {{< img src="/agent/fleet_automation/agent-upgrades-staged.png" alt="Review upgrade deployment plan" style="width:100%;" >}}

1. Use the [Deployments][10] dashboard to track the upgrade process. Clicking on an Agent in the deployments table gives you more information about the upgrade, including the duration time, progress, and the user who started the upgrade.
   {{< img src="/agent/fleet_automation/deployments.png" alt="Select the Agents you want to upgrade." style="width:100%;" >}}


### How to schedule remote Agent upgrades

To schedule your Agent upgrades: 
1. [Enable Remote Agent Management](#enable-remote-agent-management).

1. From the [**Upgrade Agents** tab][4], click **+ Create Schedule** to open the upgrade scheduling page.

1. On the the upgrade scheduling page add a **Schedule name**.

1. Select the version you want your Agents to be upgraded to. You have the option to upgrade the Agent to the latest version, one version behind the latest, or two versions behind the latest. 

   {{< img src="/agent/fleet_automation/agent_upgrade_select_version.png" alt="See a list of upgrades scheduled for your Agents." style="width:100%;" >}}


1. Select the Agents to be upgraded. You can use a filter or a search query to specify the Agents by various attributes including the Agent;s environment, operation system, or hostname. You are then able to see the Agents that are included within the specified scope and those that are not eligible for deployment. You can adjust your filter to include all the Agents you want to upgrade. 

1. After you've selected the Agents for upgrade, set the deployment window for these upgrades. You can select the weekdays, time frame, and timezone for the upgrade.

1. You can also optionally set notifications to receive updates on the deployment status along with a summary. You can add individuals or communication integration channels like Slack, teams, or pagerduty. 

1. Click Create Schedule to save the schedule. 


1. See a list of your scheduled upgrades under the [**Upgrade Agents** tab][4], in the **Upgrade Schedules** section. 

   {{< img src="/agent/fleet_automation/agent_upgrade_schedule_list2.png" alt="See a list of upgrades scheduled for your Agents." style="width:100%;" >}}




### Upgrade precedence

For the most consistent upgrade experience, Datadog recommends managing upgrades from one source at a time. Use either Fleet Automation or a configuration management tool. If you run a configuration management tool on an Agent that has already been upgraded using Fleet Automation, the upgrade reverts the Agent to the [`DD_AGENT_MINOR_VERSION`][9]  specified in your configuration. If no `DD_AGENT_MINOR_VERSION` is set, the Agent is upgraded to the latest available version.


## Configure Agents
{{< callout url="https://www.datadoghq.com/product-preview/manage-agent-configurations-from-fleet-automation/" >}}
Managing Agent Configurations in Fleet Automation is in <strong>preview</strong>. To get access, complete the preview sign‑up form.
{{< /callout >}}

1. In Fleet Automation, open the [Configure Agents][16] tab and click Create Configuration.
1. Select and configure the products (for example, APM, Logs, NDM) that you want the target Agents to run.

   {{< img src="/agent/fleet_automation/fa_create_agent_configuration2.png" alt="Select which product to enable." style="width:100%;" >}}

1. Review and name your final configuration and begin scoping deployment to your Agents. Alternatively, you can save the configuration to edit or deploy to your Agents at a later time from the Configure Agents page.
1. Scope Agents to deploy configuration to (for example through tags such as host names, site, or environment).
1. Review the deployment plan to confirm scoped Agents and deployment settings, such as rollout concurrency.
1. Start deployment and track progress from the Deployments page.

### Configuration precedence

When a configuration file on the host conflicts with a Fleet Automation configuration, Fleet Automation takes precedence, ensuring a single source of truth. See [Configuration Order Precedence][17].

### Edit, deploy or roll back configurations
From your list of configurations in the [Configure Agents][16] tab, you can
   - Deploy the unused configuration to your Agents
   - Edit the configuration, save a new version, and redeploy the updated configuration.
   - Rollback the configuration to a previous version and redeploy.


### Mirrors and proxies
You can use Remote Agent Management along with a proxy or mirrored repositories.

For instructions on configuring your Agent to use a proxy, see [Agent Proxy Configuration][6]. After you've configured the proxy, restart the Agent to apply the settings.

For instructions on using mirrored or air-gapped repositories, see:
- [Synchronize Datadog's images with a private container registry][7]
- [Installing the Agent on a server with limited internet connectivity][8]

## Downgrade Agents

If you need to downgrade an Agent, follow the steps in [Upgrade your Agents](#upgrade-your-agents) and specify the version you wish to downgrade to. Datadog recommends using the latest version of the Agent and upgrading your Agents regularly to make sure you have access to the latest features.

## Troubleshooting

### Datadog Installer incompatible with Agent (pre-7.66)

If you were a Preview customer and set up remote Agent Management before Agent version 7.66, your Datadog Installer might be incompatible with the Agent.

To support general availability of remote Agent upgrades, the installer component was bundled with the Agent starting in version 7.66. This change ensures that both components stay up to date together, preventing version mismatches and related compatibility issues. Earlier versions of the Agent did not bundle these components, resulting in a possible version mismatch that could prevent automatic updates and remote Agent Management functionality.

To diagnose and fix the issue:
1. Use the following [query in Fleet Automation][13] to identify affected hosts:
   ```txt
   support_remote_upgrade:datadog-installer
   ```
1. If your setup is impacted, [re-run the install script][14] on each affected Agent to manually upgrade them to Agent version 7.66 or higher. This ensures full compatibility with Remote Agent Management features.

Manual Agent upgrades are not required after you've updated to 7.66 or higher. Future upgrades are handled automatically without requiring manual intervention.

If you don't upgrade an earlier Agent version to 7.66 or higher, there is no impact on your existing Agent. However, remote upgrades remain unavailable until you update the Agent.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/remote-config
[2]: /account_management/rbac/permissions#fleet-automation
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://app.datadoghq.com/fleet/agent-upgrades
[5]: https://app.datadoghq.com/fleet/deployments
[6]: /agent/configuration/proxy/
[7]: /containers/guide/sync_container_images/
[8]: https://docs.datadoghq.com/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
[9]: https://github.com/DataDog/agent-linux-install-script?tab=readme-ov-file#install-script-configuration-options
[10]: https://app.datadoghq.com/fleet/deployments
[13]: https://app.datadoghq.com/fleet?query=support_remote_upgrade%3Adatadog-installer
[14]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[15]: /agent/guide/setup_remote_config
[16]: https://app.datadoghq.com/fleet/agent-management
[17]: https://docs.datadoghq.com/agent/remote_config/?tab=configurationyamlfile#configuration-order-precedence
