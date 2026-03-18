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
- link: "/infrastructure/end_user_device_monitoring/"
  tag: "Guide"
  text: "End User Device Monitoring"
algolia:
  tags: ['infrastructure modes']
private: true
---

## Overview

Infrastructure modes control how much infrastructure monitoring the Datadog Agent performs on a host. Set a mode on each host to match its monitoring role: collecting full infrastructure data, reporting basic system metrics, or running only non-infrastructure products like APM and logs.

## Available modes

The Agent supports three infrastructure modes. A checkmark ({{< X >}}) indicates the feature is available in that mode.

| Feature | [Full](#full) (default) | [Basic](#basic) | [None](#none) |
|---------|-------------------------|-----------------|---------------|
| System resource metrics | {{< X >}} | {{< X >}} | |
| Infrastructure integrations | {{< X >}} | {{< X >}} ([limited set](#basic)) | |
| Container Monitoring | {{< X >}} | | |
| Live Processes | {{< X >}} | | |
| Custom checks and logs-only integrations | {{< X >}} | {{< X >}} | {{< X >}} |
| Custom metrics | {{< X >}} | | {{< X >}} |
| Visible in infrastructure dashboards | {{< X >}} | {{< X >}} | |

<div class="alert alert-info">For monitoring employee workstations and laptops, use <code>end_user_device</code> mode (Preview). See <a href="/infrastructure/end_user_device_monitoring/">End User Device Monitoring</a> for details.</div>

### Full

`full`
: **Default**: Yes<br>
**Minimum Agent version**: 7.73.0<br>
**Recommended for**: Most use cases<br>
The Agent collects system resource metrics and process data, runs all infrastructure integrations, and supports Container Monitoring and Live Processes. If you have not set an `infrastructure_mode` value, the Agent runs in `full` mode.

### Basic

`basic`
: **Minimum Agent version**: 7.73.0 (Linux, macOS), 7.76.2 (Windows)<br>
**Recommended for**: VMs and physical servers that need system resource metrics only<br>
The Agent collects system resource metrics (CPU, memory, disk, network) and limited process and service data. Only the following integrations run:

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
The Agent does not collect infrastructure metrics or run infrastructure integrations. The Agent supports custom metrics, [custom checks][10] prefixed with `custom_`, and logs-only integrations.

<div class="alert alert-info">Hosts in <code>none</code> mode still appear in <a href="https://app.datadoghq.com/fleet">Fleet Automation</a> because the Agent continues to send metadata. However, they do not appear in infrastructure dashboards or queries that rely on infrastructure metrics.</div>

## Configure infrastructure mode

To set the infrastructure mode for a host:

1. Open the [Agent configuration file][18] and add `infrastructure_mode` at the root level:

    {{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true"
      collapsible="true" >}}
## @param infrastructure_mode - string - optional - default: full
## Set the level of infrastructure monitoring the Agent performs.
## Available values: full, basic, none, end_user_device
#
infrastructure_mode: basic
    {{< /code-block >}}

2. [Restart the Datadog Agent][19] to apply the change.

## Verify infrastructure mode

To confirm which infrastructure mode your hosts are running:

1. Navigate to [Fleet Automation][17] and click the **View Agents** tab.
1. Select **Infrastructure Mode** from the **Group by** dropdown.
1. Click a mode group to expand it and see the hosts it contains.

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
[17]: https://app.datadoghq.com/fleet
[18]: /agent/configuration/agent-configuration-files/
[19]: /agent/configuration/agent-commands/#restart-the-agent
