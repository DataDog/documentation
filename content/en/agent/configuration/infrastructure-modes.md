---
title: Infrastructure Modes
description: "Control how much infrastructure monitoring the Datadog Agent performs on a host by setting an infrastructure mode."
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

Infrastructure modes control how much infrastructure monitoring the Datadog Agent performs on a host. Choose a mode based on the level of visibility you need for each host.

If you haven't configured a mode, the Agent defaults to `full`, which provides comprehensive infrastructure monitoring. For hosts that only need metrics collection or non-infrastructure products like APM and Log Management, use `basic` or `none` to reduce overhead.

For monitoring employee workstations and laptops, see [End User Device Monitoring][16].

## Available modes

The following table summarizes the features available in each mode:

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
**Configuration value**: `full` (default)

`full` mode is the default and is recommended for most use cases. The Agent collects system resource metrics and process data, runs all infrastructure integrations, and supports Container Monitoring and Live Processes.

### Basic

**Minimum Agent version**: 7.73.0 (Linux, macOS), 7.76.2 (Windows)<br>
**Configuration value**: `basic`

`basic` mode is designed for VMs and physical servers where you need system resource metrics but not the full set of infrastructure integrations. The Agent reports the following resource usage data:

- CPU
- Memory
- Disk
- Network
- Process and service data (limited)

Only the following integrations run in `basic` mode:

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

<div class="alert alert-info"><code>basic</code> mode does not support Container Monitoring or Live Processes. To use all integrations and features, switch to <code>full</code> mode.</div>

### None

**Minimum Agent version**: 7.77.0<br>
**Configuration value**: `none`

`none` mode is designed for hosts that run non-infrastructure Datadog products such as [Log Management][13], [APM][14], or [Error Tracking][15] and do not need infrastructure metrics. The Agent supports custom metrics, [custom checks][10] prefixed with `custom_`, and logs-only integrations.

<div class="alert alert-info">Hosts in <code>none</code> mode still appear in <a href="https://app.datadoghq.com/fleet">Fleet Automation</a> because the Agent continues to send metadata. However, they do not appear in infrastructure dashboards or queries that rely on infrastructure metrics.</div>

## Configure infrastructure mode

To set the infrastructure mode for a host:

1. Open the [Agent configuration file][18] (`datadog.yaml`) and add the `infrastructure_mode` parameter at the root level, adjacent to `api_key`:

    {{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true"
      collapsible="true" >}}
api_key: <YOUR_API_KEY>
infrastructure_mode: <MODE>  # full, basic, none, or end_user_device
    {{< /code-block >}}

2. [Restart the Datadog Agent][19] to apply the change.

## Verify infrastructure mode

To confirm which infrastructure mode your hosts are running:

1. Navigate to [Fleet Automation][17] and click the **View Agents** tab.
1. Select **Infrastructure Mode** from the **Group by** dropdown.
1. Click a mode group to expand it and see the hosts it contains.
1. Optionally, use the search bar to filter by hostname (for example, `hostname:worker1`).

{{< img src="agent/configuration/fleet_automation_group_by_infra_mode-1.png" alt="Fleet Automation page grouped by infrastructure mode, showing the Full group expanded with a list of hosts." style="width:90%" >}}

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
