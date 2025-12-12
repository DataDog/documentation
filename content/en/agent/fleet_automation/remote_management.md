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

Remote Agent management with Fleet Automation simplifies how you deploy and upgrade your Datadog Agents. Instead of relying on external deployment or configuration tools, you can perform these actions directly from the Datadog platform. With Fleet Automation, you can:
1. [Upgrade your Agent](#upgrade-agents-remotely)  
1. [Configure your Agent](#configure-agents)


## Getting started 
### Prerequisites
1. Verify that Remote Configuration is enabled for your organization.
1. Confirm that your Agent version is 7.73 or later.

### Supported platforms
- Linux VMs installed using the install script or Ansible Datadog Role 
- Windows VMs

<div class="alert alert-info">
Remotely upgrading Agents in containerized environments is not supported.
</div>

### Permissions 
Users must have the [Agent Upgrade][2] within Fleet Automation for upgrades, and the Agent Configuration Management permissions to configure Agents remotely. The permission is enabled by default on the Datadog Admin role.

## Upgrade Agents

### Disk space requirement 
Datadog suggests at least 2GB for the initial Agent install and an additional 2GB to use Fleet Automation to upgrade the Agent. Specifically, the upgrade requires 1.3GB in the `/opt/datadog-packages` directory on Linux, or `C:\ProgramData\Datadog\Installer\packages` on Windows. The extra space ensures that there is enough room to maintain two Agent installs temporarily during the upgrade process in case a rollback is needed.

### Upgrade steps 

{{% collapse-content title=" How to upgrade Agents remotely" level="h4" expanded=false id="id-for-anchoring" %}}

1. From the **Upgrade Agents** tab, click **Start Agents Upgrade**.

   {{< img src="/agent/fleet_automation/upgrade-screen.png" alt="Select the Agents you want to upgrade." style="width:100%;" >}}
1. Select the Agents you want to upgrade. You can target a group of Agents by filtering on host information or tags.

   {{< img src="/agent/fleet_automation/start-agent-upgrade.png" alt="Select the Agents you want to upgrade." style="width:100%;" >}}

1. Review the deployment plan and click **Upgrade Agents** to start the upgrade.

   {{< img src="/agent/fleet_automation/agent-upgrades-staged.png" alt="Review upgrade deployment plan" style="width:100%;" >}}

1. Use the [Deployments][10] dashboard to track the upgrade process. Clicking on an Agent in the deployments table gives you more information about the upgrade, including the duration time, progress, and the user who started the upgrade.
   {{< img src="/agent/fleet_automation/deployments.png" alt="Select the Agents you want to upgrade." style="width:100%;" >}}
{{% /collapse-content %}}


{{% collapse-content title="How to schedule Agent upgrades" level="h4" expanded=false id="id-for-anchoring" %}}

1. From the [**Upgrade Agents** tab][4], click **+ Create Schedule**.

1. On the Upgrade Schedule page, add a **Schedule name**.

1. **Select the Agent version**. You have the option to upgrade the Agents to the latest version, to one version behind, or to two versions behind. 

   {{< img src="/agent/fleet_automation/agent_upgrade_select_version1.png" alt="See a list of scheduled Agent upgrades." style="width:100%;" >}}

1. **Specify the Agents to be upgraded**. You can target a group of Agents by filtering on host information or tags.
   
   {{< img src="/agent/fleet_automation/agent_upgrade_select_agents.png" alt="See a list of Agent to be upgraded." style="width:100%;" >}}

1. **Set the deployment window** for these upgrades. You can select the weekdays, time frame, and timezone for the upgrade.

   {{< img src="/agent/fleet_automation/agent_upgrade_set_window.png" alt="Select the time frame for your Agent upgrades." style="width:100%;" >}}

1. Set up notifications to receive updates on the deployment. You can notify individuals or communication integration channels like Slack, Teams, or PagerDuty. 

   {{< img src="/agent/fleet_automation/agent_upgrade_set_notification.png" alt="Select people or channels to be notified about the progess of the upgrade." style="width:100%;" >}}

1. Click **Create Schedule** to save the schedule. 

1. See a list of your scheduled upgrades under the [**Upgrade Agents** tab][4], in the **Upgrade Schedules** section. 

   {{< img src="/agent/fleet_automation/agent_upgrade_schedule_list2.png" alt="See a list of upgrades scheduled for your Agents." style="width:100%;" >}}
{{% /collapse-content %}}

<br>

### Upgrade process

Similar to a manual upgrade, expect a downtime of 5-30 seconds while the Agent restarts. The full upgrade process takes approximately 5 minutes. Around 2 minutes of this time is used for the upgrade process. The rest of the time is spent monitoring the upgrade to ensure stability and determining if a rollback is necessary. If the upgrade fails and a rollback is necessary, the Agent automatically reverts to the previously running Agent version.

The upgrade process primarily adds files to the following directories:

Linux:
- `/opt/datadog-packages`
- `/etc/datadog-agent`
- `/etc/systemd/system`

Windows:
- `C:\ProgramData\Datadog\Installer\packages`
- `C:\Program Files\Datadog\Datadog Agent`

The Agent ensures that the appropriate permissions are set for these files. No configuration files are altered during the installation process.

### Upgrade precedence

For the most consistent upgrade experience, Datadog recommends managing upgrades from one source at a time. Use either Fleet Automation or a configuration management tool. If you run a configuration management tool on an Agent that has already been upgraded using Fleet Automation, the upgrade reverts the Agent to the [`DD_AGENT_MINOR_VERSION`][9]  specified in your configuration. If no `DD_AGENT_MINOR_VERSION` is set, the Agent is upgraded to the latest available version.


## Configure Datadog Agents

With Fleet Automation, you can roll out configuration changes across your Agents through guided workflows or bring your own YAML. You can also update and standardize Agent configuration at scale. With Fleet Automation you can:
- Set up Datadog product telemetry such as APM, Logs, and NDM
- Enable or adjust Agent integrations
- Manage Agent tags
- Apply consistent configuration across environments


### Configuration steps 
{{% collapse-content title="Configure multiple Agents" level="h4" expanded=false id="id-for-anchoring" %}}

1. In Fleet Automation, open the [Configure Agents][16] tab and click **Create Configuration**.
1. Select and configure the products (for example, APM, Logs, NDM) that you want the target Agents to run.

   {{< img src="/agent/fleet_automation/fa_create_agent_configuration2.png" alt="Select which product to enable." style="width:100%;" >}}

1. Review and name your final configuration and begin scoping deployment to your Agents. Alternatively, you can save the configuration to edit or deploy to your Agents at a later time from the Configure Agents page.
1. Scope Agents to deploy configuration to (for example, through tags such as host names, site, or environment).
1. Review the deployment plan to confirm scoped Agents and deployment settings, such as rollout concurrency.
1. Start deployment and track progress from the Deployments page.
{{% /collapse-content %}}


{{% collapse-content title="Edit configuration of a single Agent" level="h4" expanded=false id="id-for-anchoring" %}}
1. In the Datadog UI, navigate to the [Fleet Automation][18] page and select **View Agents**. 

1. (**Optional**) You can target a group of Agents by filtering on host information or tags.

1. Select your host to open a side panel. In the side panel, click on the **Configuration** tab to access your modifiable configurations. 

1. Click the **Edit** button to edit your configuration. 

1. Submit these changes by selecting **Deploy Changes**.

**Note**: There are some configuration fields ( for example, `api_key`, `site`, and `notable_events`) that cannot be modified.

In the following example, the `logs_enabled` field is changed from `false` to `true`. After the changes are deployed, log collection on this Agent is enabled. 

{{< img src="/agent/fleet_automation/agent_remote_management_single_agent_config2.png" alt="Edit and deploy Agent configuration changes." style="width:90%;" >}}

[18]: https://app.datadoghq.com/fleet
{{% /collapse-content %}}


### Configuration precedence

The latest configuration is applied. If another tool is also used to configure the DD Agent. If the latest change is made from another tool aside from Fleet Automation, the change takes effect.

### Mirrors and proxies

You can use Remote Agent Management along with a proxy or mirrored repositories.

For instructions on configuring your Agent to use a proxy, see [Agent Proxy Configuration][6]. After you've configured the proxy, restart the Agent to apply the settings.

For instructions on using mirrored or air-gapped repositories, see:
- [Synchronize Datadog's images with a private container registry][7]
- [Installing the Agent on a server with limited internet connectivity][8]


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
