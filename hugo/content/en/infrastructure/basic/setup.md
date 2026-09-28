---
title: Set up Infrastructure Basic
description: Configure the Datadog Agent and supported virtualization integrations for Infrastructure Basic.
---

## Prerequisites

- Contact your Datadog account team to get access to Infrastructure Basic. Your contract must include an Infrastructure Basic subscription; configuring Basic mode alone does not enroll you in the product.
- For hosts monitored directly by the Datadog Agent, use Agent version 7.76.2 or later, as recommended for Infrastructure Basic. The virtualization integrations below have their own version requirements.
- Review the [capabilities and limitations][2] before configuring your hosts.

<!-- TODO: Confirm minimum Agent version. Wiki recommends 7.76.2+ for correct metering, but existing-Agent instructions and the shared Infrastructure Modes guide allow 7.73.0+ on Linux. -->
<!-- Mac support? -->

## Configure the Datadog Agent

Set the Agent's infrastructure mode to `basic` on each host you want to monitor directly with Infrastructure Basic.

### New hosts

For a new installation, set `DD_INFRASTRUCTURE_MODE="basic"` when running the Agent installation script. Replace `<API_KEY>` with your [Datadog API key][3] and `<DD_SITE>` with **{{< region-param key="dd_site" >}}**:

**Linux**:

```shell
DD_API_KEY="<API_KEY>" \
DD_SITE="<DD_SITE>" \
DD_INFRASTRUCTURE_MODE="basic" \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

**Windows**:

```powershell
$p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i "https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi" /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<API_KEY>" SITE="<DD_SITE>" DD_INFRASTRUCTURE_MODE="basic"'
if ($p.ExitCode -ne 0) {
  Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
}
```

Setting the mode during installation configures the host to use Basic mode from its first connection to Datadog.

### Existing hosts

1. Check the installed Agent version in [Fleet Automation][4] or run `datadog-agent version` on the host. [Upgrade the Agent][5] if needed.
2. Open the [Agent configuration file][6] and add the following setting at the root level. If the setting already exists, update its value:

   ```yaml
   infrastructure_mode: basic
   ```

3. [Restart the Datadog Agent][7] to apply the change.

In Basic mode, the Agent runs a limited set of infrastructure integrations. Review the [supported integrations][1] before changing the mode of a host that already runs Agent checks.

## Configure virtualization integrations

To report hosts through a virtualization integration as Infrastructure Basic, configure `infrastructure_mode: basic` in the integration instance. This is a separate setting from the host Agent's top-level `infrastructure_mode` setting in `datadog.yaml`.

The examples below show the fields to add or update in an existing integration configuration. Retain the authentication settings and other required options from the integration's setup instructions. After updating the configuration, [restart the Agent][7] running the integration.

<!-- TODO: Confirm the required infrastructure tier for the host running each integration. The technical wiki specifies a Pro/Pro+/Enterprise collection host for vSphere but does not clearly cover Proxmox or Nutanix. Do not instruct users to put the collection Agent itself in Basic mode. -->

### vSphere

On the host running the vSphere integration, use Agent version 7.74.0 or later. Follow the [vSphere integration setup instructions][8], then set `infrastructure_mode` to `basic` in the relevant instance:

```yaml
instances:
  - host: <VCENTER_HOSTNAME>
    infrastructure_mode: basic
    # Retain the other required settings for this instance.
```

The vSphere integration can report ESXi hosts and VMs without an Agent installed on each monitored host. If a monitored host also runs the Datadog Agent, configure that Agent to use Basic mode as well. If the integration and the Agent report different modes for the same host, the Agent's mode takes precedence.

### Proxmox

Follow the [Proxmox integration setup instructions][9], then set `infrastructure_mode` to `basic` in the relevant instance:

```yaml
instances:
  - proxmox_server: <PROXMOX_API_ENDPOINT>
    infrastructure_mode: basic
    # Retain the other required settings for this instance.
```

<!-- TODO: Confirm the minimum Agent version for Proxmox. The technical wiki's Proxmox section lists 7.82.0 but mistakenly refers to Nutanix throughout the prose. The Proxmox integration's public sample configuration confirms the instance-level infrastructure_mode option. Also confirm mode precedence when an Agent runs on a monitored Proxmox host or VM. -->

### Nutanix

On the host running the Nutanix integration, use Agent version 7.83.0 or later. Follow the [Nutanix integration setup instructions][10], then set `infrastructure_mode` to `basic` in the relevant instance:

```yaml
instances:
  - pc_ip: <PRISM_CENTRAL_HOSTNAME>
    infrastructure_mode: basic
    # Retain the other required settings for this instance.
```

<!-- TODO: Confirm mode precedence when an Agent also runs on a monitored Nutanix host or VM. -->

## Verify the Agent configuration

For hosts running the Datadog Agent:

1. Navigate to [Fleet Automation][4] and select the {{< ui >}}View Agents{{< /ui >}} tab.
2. Select {{< ui >}}Infrastructure Mode{{< /ui >}} from the {{< ui >}}Group by{{< /ui >}} dropdown.
3. Expand the Basic group and confirm that your hosts appear. To find a specific host, filter by hostname, for example, `hostname:worker1`.

<!-- TODO: Add a verified way to check the mode of hosts reported only through a virtualization integration. Fleet Automation verifies the Agent mode, not necessarily the integration-reported mode of each remote host. -->

[1]: /agent/configuration/infrastructure-modes/#basic
[2]: /infrastructure/basic/#limitations
[3]: /account_management/api-app-keys/#api-keys
[4]: https://app.datadoghq.com/fleet
[5]: /agent/guide/upgrade/
[6]: /agent/configuration/agent-configuration-files/
[7]: /agent/configuration/agent-commands/#restart-the-agent
[8]: /integrations/vsphere/#setup
[9]: /integrations/proxmox/#setup
[10]: /integrations/nutanix/#setup

