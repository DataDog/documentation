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

Infrastructure modes let you control how much infrastructure monitoring the Datadog Agent performs on a host. You can configure each of your hosts to run in one of four modes: `full`, `basic`, `none`, and `end_user_device`.

This page covers `full`, `basic`, and `none` modes. For `end_user_device`, see [End User Device Monitoring][16].

## Available modes

The level of infrastructure monitoring determines which integrations, metrics, and features the Agent collects. See [Full](#full), [Basic](#basic), and [None](#none) for configuration details. For End User Device Monitoring, see [End User Device](#end-user-device).

|  | Full | Basic | None |
|--|------|-------|------|
| System resource metrics | {{< X >}} | {{< X >}} | |
| Infrastructure integrations | All | Limited set | |
| Container Monitoring | {{< X >}} | | |
| Live Processes | {{< X >}} | | |
| Custom checks and logs-only integrations | {{< X >}} | {{< X >}} | {{< X >}} |
| Custom metrics | {{< X >}} | | {{< X >}} |
| Appears in infrastructure dashboards | {{< X >}} | {{< X >}} | |

### Full

**Minimum Agent version**: 7.73.0<br>
**Recommended for**: Most use cases<br>
**Configuration value**: `full` (default)

In `full` mode, the Agent collects system resource metrics and process data, runs all infrastructure integrations, and supports Container Monitoring and Live Processes.

Use `full` mode for hosts that require comprehensive infrastructure monitoring.

You do not need additional configuration unless you are switching from another mode.

### Basic

**Minimum Agent version**: 7.73.0 (Linux, macOS), 7.76.2 (Windows)<br>
**Recommended for**: VMs and physical servers that only need system resource metrics<br>
**Configuration value**: `basic`

In `basic` mode, the Agent reports system resource usage data for the following:
- CPU
- Memory
- Disk
- Network
- Process and service data (limited)

In `basic` mode, only the following integrations run:

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

<div class="alert alert-info">The Agent in <code>basic</code> mode does not run integrations other than those listed above, and does not support Container Monitoring or Live Processes. Switch to <code>full</code> mode to use all integrations and features.</div>

### None

**Minimum Agent version**: 7.77.0<br>
**Recommended for**: Hosts configured only for [Log Management][13], [APM][14], or [Error Tracking][15]<br>
**Configuration value**: `none`

In `none` mode, the Agent does not collect any infrastructure metrics or run infrastructure integrations. You can use custom metrics, [custom checks][10] prefixed with `custom_`, and logs-only integrations.

The host in `none` mode appears in [Fleet Automation][17] under the **View Agents** tab because the Agent continues to send metadata to Datadog. However, the host does not appear in infrastructure dashboards or queries that rely on infrastructure metrics.

### End User Device

{{% collapse-content title="End User Device details" level="h4" %}}
<div class="alert alert-info">End User Device Monitoring is in Preview. For configuration steps and to request access, see <a href="/infrastructure/end_user_device_monitoring/">End User Device Monitoring</a>.</div>

**Minimum Agent version**: 7.76.0<br>
**Recommended for**: Employee desktops, laptops, and workstations<br>
**Configuration value**: `end_user_device`

In `end_user_device` mode, the Agent collects system resource metrics, runs a limited set of infrastructure integrations, and supports Live Processes, custom checks, and logs-only integrations. It does not support Container Monitoring, custom metrics, or infrastructure dashboards.

End User Device Monitoring is not intended for general infrastructure monitoring use cases. See [Key capabilities][20] for more information.

{{% /collapse-content %}}

## Configure Agent infrastructure mode

To configure the Agent infrastructure mode:

1. Add the `infrastructure_mode` parameter at the root level of the [Agent configuration file][18]

    {{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true"
      collapsible="true" >}}
infrastructure_mode: <MODE>  # The available options are `full`, `basic`, `none`, and `end_user_device`.
    {{< /code-block >}}

2. [Restart the Datadog Agent][19]

## Verify infrastructure mode

To verify the infrastructure mode set on your hosts:

1. Navigate to [Fleet Automation][17] and click the **View Agents** tab
1. Select **Infrastructure Mode** from the **Group by** dropdown
1. Expand the mode group to see your hosts
1. Optionally, use the search bar to filter to a specific hostname (for example, `hostname:worker1`)

{{< img src="agent/configuration/fleet_automation_group_by_infra_mode-1.png" alt="Fleet Automation View Agents page showing hosts grouped by Infrastructure Mode, with separate groups for Full, End User Device, and Basic modes." style="width:90%" >}}

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
