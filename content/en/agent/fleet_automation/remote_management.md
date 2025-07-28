---
title: Remote Agent Management
description: Remotely upgrade and configure your Agents
further_reading:
- link: "/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "/agent/remote_config/"
  tag: "Documentation"
  text: "Remote Configuration"
---

## Overview

Remote Agent Management simplifies the process of upgrading your Agent fleet by reducing the need to coordinate with multiple deployment or configuration management tools. Remote Agent Management gives you access to:
* **Centralized Management** - Upgrade Agents across all environments with a single tool, ensuring consistency with the latest features and security patches.
* **Visibility and Monitoring** - Track the status of upgrades in real-time, allowing quick verification of deployment success.
* **Operational Efficiency** - Streamline the upgrade process by eliminating cross-team coordination and unifying deployment across different platforms.

## Setup

To enable Remote Agent Management:
1. If you haven't enabled Remote Configuration on the Agent, follow the [configuration instructions][1] to enable it.
1. Go to the [Datadog Agent install page][3] for your platform or configuration management tool.
1. Enable **Remote Agent Management**. Enabling Remote Agent Management adds the `DD_REMOTE_UPDATES` environment variable to the generated Agent installation command.

   {{< img src="/agent/fleet_automation/remote-agent-management-toggle.png" alt="Enable the Remote Agent Management toggle." style="width:100%;" >}}

1. Use the generated Agent installation command to upgrade your Agent to version 7.66+.

<div class="alert alert-info">You must run the generated installation command with <code>DD_REMOTE_UPDATES</code> set to <code>true</code> to gain access to Remote Agent Management. Enabling Remote Agent Management without running the installation command does not grant access to the feature.</div>

## Remotely upgrade your Agents
### Supported platforms

- Linux VMs installed using the install script or Ansible Datadog Role
- Windows VMs

<div class="alert alert-info">Remotely upgrading Agents in containerized environments is not supported.</div>

### Prerequisites

* **User permissions**: Users must have the [Agent Upgrade][2] permission within Fleet Automation. The permission is enabled by default on the Datadog Admin role.
* **Disk space**: Datadog suggests at least 2GB for the initial Agent install and an additional 2GB for upgrading the Agent from Fleet Automation. Specifically, the upgrade requires 1.3GB in the `/opt/datadog-packages` directory on Linux, or `C:\ProgramData\Datadog\Installer\packages` on Windows. The extra space ensures that there is enough room to maintain two Agent installs temporarily during the upgrade process in case a rollback is needed.
* **System service manager**: Remote updates are supported only on machines running `systemd`. Other init systems (for example SysVinit, Upstart) are not supported.
* **Windows Agent User**: To enable remote updates for installations using an Active Directory domain account, provide the password option to the installer when upgrading to Agent 7.66 or later. To avoid providing and manually managing the account password, consider using a [Group Managed Service Account (gMSA)][11]. For more information, see [Installing the Agent with a gMSA account][12].

### Upgrade your Agents

To upgrade your Agents:
1. [Enable Remote Agent Management](#setup).
1. From the [**Upgrade Agents** tab][4], click **Start Agents Upgrade**.

   {{< img src="/agent/fleet_automation/upgrade-screen.png" alt="Select the Agents you want to upgrade." style="width:100%;" >}}
1. Select the Agents you want to upgrade. You can target a group of Agents by filtering on host information or tags.

   {{< img src="/agent/fleet_automation/start-agent-upgrade.png" alt="Select the Agents you want to upgrade." style="width:100%;" >}}

1. Review the deployment plan and click **Upgrade Agents** to start the upgrade.

   {{< img src="/agent/fleet_automation/agent-upgrades-staged.png" alt="Review upgrade deployment plan" style="width:100%;" >}}

1. Use the [Deployments][10] dashboard to track the upgrade process. Clicking on an Agent in the deployments table gives you more information about the upgrade, including the duration time, progress, and the user who started the upgrade.
   {{< img src="/agent/fleet_automation/deployments.png" alt="Select the Agents you want to upgrade." style="width:100%;" >}}

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

### Upgrade precedence

For the most consistent upgrade experience, Datadog recommends managing upgrades from one source at a time. Use either Fleet Automation or a configuration management tool. If you run a configuration management tool on an Agent that has already been upgraded using Fleet Automation, the upgrade reverts the Agent to the [`DD_AGENT_MINOR_VERSION`][9]  specified in your configuration. If no `DD_AGENT_MINOR_VERSION` is set, the Agent is upgraded to the latest available version .

### Mirrors and proxies

You can use Remote Agent Management along with a proxy or mirrored repositories.

For instructions on configuring your Agent to use a proxy, see [Agent Proxy Configuration][6]. After you've configured the proxy, restart the Agent to apply the settings.

For instructions on using mirrored or air-gapped repositories, see:
- [Synchronize Datadog's images with a private container registry][7]
- [Installing the Agent on a server with limited internet connectivity][8]

### Downgrading Agents

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

## Uninstall Remote Agent Management

{{< tabs >}}
{{% tab "Linux" %}}

To uninstall Remote Agent Management from your Linux environment, follow the steps below. Ensure that you have the necessary permissions to perform the uninstall process.

To uninstall the Agent after installing it with Remote Agent Management, in a shell, run `sudo datadog-installer purge`.

{{% /tab %}}
{{% tab "Windows" %}}

There are no steps needed to uninstall Remote Agent Management on Windows, it is packaged with the Agent itself.

To disable Remote Agent Management, configure `remote_updates: false` in `datadog.yaml`.

To uninstall the Agent, see [Uninstall the Agent][1].

[1]: https://docs.datadoghq.com/agent/basic_agent_usage/windows/#uninstall-the-agent

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config/#enabling-remote-configuration
[2]: /account_management/rbac/permissions#fleet-automation
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://app.datadoghq.com/fleet/agent-upgrades
[5]: https://app.datadoghq.com/fleet/deployments
[6]: /agent/configuration/proxy/
[7]: /containers/guide/sync_container_images/
[8]: https://docs.datadoghq.com/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
[9]: https://github.com/DataDog/agent-linux-install-script?tab=readme-ov-file#install-script-configuration-options
[10]: https://app.datadoghq.com/fleet/deployments
[11]: https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview
[12]: https://docs.datadoghq.com/agent/basic_agent_usage/windows/?tab=installationinactivedirectorydomains
[13]: https://app.datadoghq.com/fleet?query=support_remote_upgrade%3Adatadog-installer
[14]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
