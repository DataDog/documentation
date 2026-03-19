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

Infrastructure modes control how much infrastructure monitoring the Datadog Agent performs on a host. Set a mode on each host to match its monitoring role: collecting full infrastructure data, reporting basic system metrics, or running only non-infrastructure products like APM and logs.

## Available modes
The Agent supports four infrastructure modes. A checkmark ({{< X >}}) indicates the capability is available in that mode.

| Capability | [Full](#full) (default) | [Basic](#basic) | [None](#none) | [End User Device](#end-user-device) |
|------------|-------------------------|-----------------|---------------|--------------------------------------|
| System resource metrics | {{< X >}} | {{< X >}} | | {{< X >}} |
| Infrastructure integrations | {{< X >}} (all) | {{< X >}} ([limited set](#basic)) | | {{< X >}} ([limited set][20]) |
| Container Monitoring | {{< X >}} | | | |
| Live Processes | {{< X >}} | | | {{< X >}} |
| Custom checks and logs-only integrations | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Custom metrics | {{< X >}} | | {{< X >}} | |
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
**Recommended for**: VMs and physical servers that need system resource metrics only<br>
: The Agent collects system resource metrics (CPU, memory, disk, network) and limited process and service data. Only the following integrations run:
  - [System Check][1]
  - [Disk][2]
  - [Network][3]
  - [NTP][4]
  - [Processes][5]
  - [Systemd][6]
  - [Windows Crash Detection][7]
  - [Windows Kernel Memory][8]
  - [Windows Services][9]
  - [Custom checks][10] prefixed with `custom_`
  - Logs-only integrations (for example, [journald][11] or [Windows Event Log][12])

### None

`none`

: **Minimum Agent version**: 7.77.0<br>
**Recommended for**: Hosts configured only for [Log Management][13], [APM][14], or [Error Tracking][15]<br>
: In `none` mode, the Agent does not collect any infrastructure metrics or run infrastructure integrations. You can use custom metrics, [custom checks][10] prefixed with `custom_`, and logs-only integrations such as [journald][11] or [Windows Event Log][12].
: The host in `none` mode appears in [Fleet Automation][17] under the **View Agents** tab because the Agent continues to send metadata to Datadog. However, the host does not appear in infrastructure dashboards or queries that rely on infrastructure metrics, or when the hosts list is grouped by Infrastructure Mode.

### End User Device

`end_user_device`
: **Minimum Agent version**: 7.76.0<br>
**Recommended for**: Employee desktops, laptops, and workstations<br>
: This mode is in Preview. For configuration steps and to request access, see [End User Device Monitoring][16].

## Configure Agent infrastructure mode

To set the infrastructure mode for a host:

1. Open the [Agent configuration file][18] and add `infrastructure_mode` at the root level:

    {{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true"
      collapsible="true" >}}
infrastructure_mode: <MODE>  # The available options are `full`, `basic`, `none`, and `end_user_device`.
    {{< /code-block >}}

2. [Restart the Datadog Agent][19].

## Verify infrastructure mode

To verify the infrastructure mode set on your hosts:

1. Navigate to [Fleet Automation][17] and click the **View Agents** tab.
1. Select **Infrastructure Mode** from the **Group by** dropdown.
1. Click a mode group to expand it and see the hosts it contains.
1. Optionally, use the search bar to filter to a specific hostname (for example, `hostname:worker1`).

{{< img src="agent/configuration/fa_group_by_infra_mode-1.png" alt="Fleet Automation View Agents page with Infrastructure Mode selected in the Group by dropdown, showing the Full group expanded with 311 hosts and columns for hostname, Agent, OTEL, integrations, services, and remote configuration status." style="width:90%" >}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/system/
[2]: /integrations/disk/
[3]: /integrations/network/
[4]: /integrations/ntp/
[5]: /integrations/process/
[6]: /integrations/systemd/
[7]: /integrations/wincrashdetect/
[8]: /integrations/winkmem/
[9]: /integrations/windows-service/
[10]: /extend/custom_checks/
[11]: /integrations/journald/
[12]: /integrations/event-viewer/
[13]: /logs/
[14]: /tracing/
[15]: /error_tracking/
[16]: /infrastructure/end_user_device_monitoring/
[17]: https://app.datadoghq.com/fleet
[18]: /agent/configuration/agent-configuration-files/
[19]: /agent/configuration/agent-commands/#restart-the-agent
[20]: /infrastructure/end_user_device_monitoring/#key-capabilities
