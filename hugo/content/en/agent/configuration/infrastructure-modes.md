---
title: Infrastructure Modes
description: "Change Agent behavior to control how much infrastructure monitoring the Datadog Agent performs on a host."
further_reading:
- link: "/agent/configuration/agent-configuration-files/"
  tag: "Guide"
  text: "Agent Configuration Files"
- link: "/agent/guide/upgrade/"
  tag: "Guide"
  text: "Upgrade your Datadog Agent"
algolia:
  tags: ['infrastructure modes']
private: true
---

## Overview

Infrastructure modes determine which infrastructure monitoring capabilities the Datadog Agent enables on a host. Use these modes to match the Agent's behavior to the host's role: full infrastructure monitoring, basic system resource metrics, no infrastructure monitoring, or End User Device monitoring.

## Available modes

The Agent supports four infrastructure modes. A checkmark ({{< X >}}) indicates the capability is available in that mode.

| Capability | [Full](#full) (default) | [Basic](#basic) | [End User Device](#end-user-device) | [None](#none) |
|------------|-------------------------|-----------------|-------------------------------------|---------------|
| System resource metrics | {{< X >}} | {{< X >}} | {{< X >}} | |
| Infrastructure integrations | {{< X >}} (all) | {{< X >}} ([limited set](#basic)) | {{< X >}} | |
| Container Monitoring | {{< X >}} | | | |
| Live Processes | {{< X >}} | | {{< X >}} | |
| Custom checks and logs-only integrations | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Custom metrics | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Visible in infrastructure dashboards | {{< X >}} | {{< X >}} | | |

### Full

`full`
: **Default**: Yes<br>
**Minimum Agent version**: 7.73.0<br>
**Recommended for**: Most use cases<br>
: The Agent collects system resource metrics and process data, runs all infrastructure integrations, and supports Container Monitoring and Live Processes. If you have not set an `infrastructure_mode` value, the Agent runs in `full` mode.

### Basic

`basic`
: **Minimum Agent version**: 7.73.0 (Linux, macOS), 7.76.2 (Windows)<br>
**Recommended for**: VMs and physical servers that only need system resource metrics<br>
: The Agent collects system resource metrics (CPU, memory, disk, network) and limited process and service data. Only the following integrations run:
  - [System Check][1]
  - [Disk][2]
  - [Directory][3] (7.80+)
  - [Network][4]
  - [NTP][5]
  - [Processes][6]
  - [Systemd][7]
  - [Windows Certificate Store][8] (7.80+)
  - [Windows Crash Detection][9]
  - [Windows Kernel Memory][10]
  - [Windows Performance Counters][11] (7.80+)
  - [Windows Registry][12] (7.80+)
  - [Windows Services][13]
  - [WMI Check][14] (7.80+)
  - [Custom checks][15] prefixed with `custom_`
  - Logs-only integrations (for example, [journald][16] or [Windows Event Log][17])

### End User Device

<div class="alert alert-info">End User Device mode is in Preview. For configuration steps and to request access, see <a href="/infrastructure/end_user_device_monitoring/">End User Device Monitoring</a>.</div>

`end_user_device`
: **Minimum Agent version**: 7.76.2<br>
**Recommended for**: Employee desktops, laptops, and workstations<br>
: The Agent includes all [full mode](#full) capabilities except Container Monitoring, plus the following.
  - Device Performance Monitoring
  - Logs Collection
  - Wi-Fi Monitoring
  - Windows Crash Detection
  - Network Path Monitoring

: For full descriptions, see [Key capabilities][18].

### None

`none`
: **Minimum Agent version**: 7.77.0<br>
**Recommended for**: Hosts configured only for [Log Management][19], [APM][20], or [Error Tracking][21]<br>
: The Agent does not collect any infrastructure metrics or run infrastructure integrations. You can still use custom metrics, [custom checks][15] prefixed with `custom_`, and logs-only integrations such as [journald][16] or [Windows Event Log][17].
: Hosts in `none` mode appear in [Fleet Automation][22] under the {{< ui >}}View Agents{{< /ui >}} tab because the Agent continues to send metadata to Datadog. However, these hosts do not appear in infrastructure dashboards or queries that rely on infrastructure metrics.

## Configure Agent infrastructure mode

### New hosts

To configure the infrastructure mode when installing the Agent for the first time, set the `DD_INFRASTRUCTURE_MODE=<MODE>` environment variable before the installation script is invoked:

{{< tabs >}}
{{% tab "Linux" %}}
In the following command, replace `<API_KEY>` with your organization's [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys), `<DD_SITE>` with **{{< region-param key="dd_site" >}}**, and `<MODE>` with `full`, `basic`, `end_user_device`, or `none`:

```shell
DD_API_KEY="<API_KEY>" \
DD_SITE="<DD_SITE>" \
DD_INFRASTRUCTURE_MODE="<MODE>" \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```
{{% /tab %}}
{{% tab "Windows" %}}
In the following command, replace `<API_KEY>` with your organization's [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys), `<DD_SITE>` with **{{< region-param key="dd_site" >}}**, and `<MODE>` with `full`, `basic`, `end_user_device`, or `none`:
```powershell
$p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i "https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi" /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<API_KEY>" SITE="<DD_SITE>" DD_INFRASTRUCTRURE_MODE="<MODE>"'
if ($p.ExitCode -ne 0) {
  Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
}
```
{{% /tab %}}
{{< /tabs >}}

### Existing hosts

To set the infrastructure mode for an existing host:

1. Open the [Agent configuration file][23] and add `infrastructure_mode` at the root level. Replace `<MODE>` with `full`, `basic`, `end_user_device`, or `none`.

    {{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true"
      collapsible="true" >}}
infrastructure_mode: <MODE>
    {{< /code-block >}}

2. [Restart the Datadog Agent][24].

## Verify infrastructure mode

To verify the infrastructure mode set on your hosts:

1. Navigate to [Fleet Automation][22] and click the {{< ui >}}View Agents{{< /ui >}} tab.
1. Select {{< ui >}}Infrastructure Mode{{< /ui >}} from the {{< ui >}}Group by{{< /ui >}} dropdown.
1. Click a mode group to expand it and see the hosts it contains.
1. Optionally, use the search bar to filter to a specific hostname (for example, `hostname:worker1`).

{{< img src="agent/configuration/fa_group_by_infra_mode-1.png" alt="Fleet Automation View Agents page with Infrastructure Mode selected in the Group by dropdown, showing the Full group expanded with 311 hosts and columns for hostname, Agent, OTEL, integrations, services, and remote configuration status." style="width:90%" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/system/
[2]: /integrations/disk/
[3]: /integrations/directory/
[4]: /integrations/network/
[5]: /integrations/ntp/
[6]: /integrations/process/
[7]: /integrations/systemd/
[8]: /integrations/windows-certificate/
[9]: /integrations/wincrashdetect/
[10]: /integrations/winkmem/
[11]: /integrations/windows-performance-counters/
[12]: /integrations/windows-registry/
[13]: /integrations/windows-service/
[14]: /integrations/wmi/
[15]: /extend/custom_checks/
[16]: /integrations/journald/
[17]: /integrations/event-viewer/
[18]: /infrastructure/end_user_device_monitoring/#key-capabilities
[19]: /logs/
[20]: /tracing/
[21]: /error_tracking/
[22]: https://app.datadoghq.com/fleet
[23]: /agent/configuration/agent-configuration-files/
[24]: /agent/configuration/agent-commands/#restart-the-agent