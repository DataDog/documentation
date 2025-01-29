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

{{< callout url="https://www.datadoghq.com/product-preview/agent-upgrades/" btn_hidden="false" header="Try the Preview!">}}
Remote Agent Management is in Preview. Use this form to request access.
{{< /callout >}}

## Overview

Remote Agent Management simplifies the process of upgrading your Agent fleet by reducing the need to coordinate with multiple deployment or configuration management tools. Remote Agent Management gives you access to:
* **Centralized Management** - Upgrade Agents across all environments with a single tool, ensuring consistency with the latest features and security patches.
* **Visibility and Monitoring** - Track the status of upgrades in real-time, allowing quick verification of deployment success.
* **Operational Efficiency** - Streamline the upgrade process by eliminating cross-team coordination and unifying deployment across different platforms.

## Setup

To enable Remote Agent Management, you must first upgrade the Agent manually with the **Remote Agent Management** option enabled.

<div class="alert alert-warning">You must run an upgrade with the <code>remote_updates:true</code> option to use remote updates. Updating the <code>remote_updates</code> setting without performing a manual upgrade does not grant access to Remote Agent Management.
</div>

To enable Remote Agent Management:
1. If you haven't enabled Remote Configuration on the Agent, follow the [configuration instructions][1] to enable it.
1. Go to the [Datadog Agent install page][3] for your platform or configuration management tool.
1. Enable **Remote Agent Management** and use the generated Agent installation command to upgrade your Agent. If you're using a configuration tool, ensure that `remote_updates:true` is set for future configuration updates.
   {{< img src="/agent/fleet_automation/remote-agent-management-toggle.png" alt="Enable the Remote Agent Management toggle." style="width:100%;" >}}

## Remotely upgrade your Agents
### Supported platforms

- Linux VMs installed via the install script or Ansible Datadog Role.
- Windows VMs using the default installation method (gMSA or default `ddagentuser` account).
- Container based Agents are not yet supported.

### Prerequisites

* **Remote Configuration (RC)**: Ensure that RC is enabled on your host. You can check if a host has remote configuration enabled by viewing the host in Fleet Automation. Follow the [configuration instructions][1] to enable RC.
* **User Permissions**: Users must have the [Agent Upgrade][2] permission within Fleet Automation. The permission is enabled by default on the Datadog Admin role.
* **Disk Space**: Datadog suggests at least 2GB for the initial Agent install and an additional 2GB for upgrading the Agent from Fleet Automation. Specifically, the upgrade requires 1.3GB in the `/opt/datadog-packages` directory. The extra space ensures that there is enough room to maintain two Agent installs temporarily during the upgrade process, in case a rollback is needed.

### Upgrade your Agents

<div class="alert alert-warning">Remote agent updates are in preview. Test the feature only on hosts that are not critical to production workloads. Try upgrading Agents one at a time before testing bulk upgrades.</div>

To upgrade your Agents:
1. Make sure you've completed the [setup instructions](#setup).
1. From the [**Upgrade Agents** tab][4], click **Start Agents Upgrade**.
   
   {{< img src="/agent/fleet_automation/upgrade-screen.png" alt="Select the Agents you want to upgrade." style="width:100%;" >}}
1. Select the Agents you want to upgrade. You can target a group of Agents by filtering on host information or tags.
   
   {{< img src="/agent/fleet_automation/start-agent-upgrade.png" alt="Select the Agents you want to upgrade." style="width:100%;" >}}
1. Click **Upgrade Agents** to start the upgrade.

You can track the upgrade process in real-time from the [Fleet Automation deployments][5] dashboard to ensure that your Agents are upgraded successfully.

### Upgrade process

Similar to a manual upgrade, expect a brief downtime of 5-30 seconds while the Agent restarts. The full upgrade process takes approximately 5 minutes. Around 2 minutes of this time is used for the upgrade process. The rest of the time is spent monitoring the upgrade to ensure stability or determining if a rollback is necessary. If the upgrade fails and a rollback is necessary, the Agent automatically reverts to the previously running Agent version.

The upgrade process primarily adds files to the following directories:
* `/opt/datadog-packages`
* `/etc/datadog-agent`
* `/etc/systemd/system`

The Agent ensures that the appropriate permissions are set for these files. No configuration files are altered during the installation process.

### Upgrade precedence

Agent upgrades from Fleet Management take precedent over configuration management tools. If you start an upgrade from the Fleet Management page, that upgrade has full control over the Agent and cancels or skips upgrade requests from other sources.

### Mirrors and proxies

You can use use Remote Agent Management along with a proxy or mirrored repositories.

For instructions on configuring your Agent to use a proxy, see [Agent Proxy Configuration][6]. After you've configured the proxy, restart the Agent to apply the settings.

For instructions on using mirrored or air-gapped repositories, see:
- [Synchronize Datadog's images with a private container registry][7]
- [Installing the Agent on a server with limited internet connectivity][8]

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
