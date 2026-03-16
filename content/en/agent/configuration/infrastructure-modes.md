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

Infrastructure modes let you control how much infrastructure monitoring the Datadog Agent performs on a host. You can configure each of your hosts to run in one of three modes, `full`, `basic`, and `none`, allowing you to reduce resource overhead where needed and run different levels of monitoring across your fleet.

## Available modes

The level of infrastructure monitoring determines which integrations, metrics, and features the Agent collects. See [Full](#full), [Basic](#basic), and [None](#none) for configuration details.

| Feature | Full | Basic | None |
|---------|------|-------|------|
| System resource metrics | {{< X >}} | {{< X >}} | |
| Infrastructure integrations | All | Limited set | |
| Container Monitoring | {{< X >}} | | |
| Live Processes | {{< X >}} | | |
| Custom checks and logs-only integrations | {{< X >}} | {{< X >}} | {{< X >}} |
| Custom metrics | {{< X >}} | | {{< X >}} |
| Appears in infrastructure dashboards | {{< X >}} | {{< X >}} | |


<!-- TODO: Confirm with SME:
- Does basic mode appear in infrastructure dashboards? (Assumed yes, since only none explicitly says it doesn't.)
- Are custom metrics available in basic mode? (Not stated in docs, left unchecked to be safe.)
-->


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

**Note**: The Agent in `basic` mode does not run other integrations or support Container Monitoring and Live Processes. Switch to `full` mode to use all integrations and features.


### None

**Minimum Agent version**: 7.77.0<br>
**Recommended for**: Hosts configured only for [Log Management][13], [APM][14], or [Error Tracking][15]<br>
**Configuration value**: `none`

In `none` mode, the Agent does not collect any infrastructure metrics or run infrastructure integrations. You can use custom metrics, [custom checks][16] prefixed with `custom_`, and logs-only integrations.

The host in `none` mode appears in [Fleet Automation][17] under the **View Agents** tab because the Agent continues to send metadata to Datadog. However, the host does not appear in infrastructure dashboards or queries that rely on infrastructure metrics.


<!-- {{< collapse-content title="Feature comparison across modes" level="h4" >}}

| Feature | Full | Basic | None |
|---------|----|-----|----|
| Minimum Agent version | 7.73.0 | 7.73.0 (Linux, macOS), 7.76.2 (Windows) | 7.77.0 |
| System resource metrics (CPU, Memory, Disk, Network) | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | |
| Process and service data | <i class="icon-check-bold"></i> | Limited | |
| Infrastructure integrations | <i class="icon-check-bold"></i> | System, Disk, Network, NTP, Processes, Systemd, Windows Crash Detection, Windows Kernel Memory, Windows Services | |
| Container Monitoring | <i class="icon-check-bold"></i> | | |
| Live Processes | <i class="icon-check-bold"></i> | | |
| Custom checks (prefixed with `custom_`) | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Logs-only integrations | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Custom metrics | <i class="icon-check-bold"></i> | | <i class="icon-check-bold"></i> |
| Appears in Fleet Automation | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Appears in infrastructure dashboards | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | |

{{< /collapse-content >}} -->


## Configure Agent infrastructure mode
<!-- ADD LEADING SENTENCE: To select your infrastructure mode -->
1. Add the `infrastructure_mode` option at the root level of the [Agent configuration file][18].

    {{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true"
      collapsible="true" >}}
api_key: <API_KEY>
infrastructure_mode: <MODE>  # The available options are `full`, `basic`, and `none`.
    {{< /code-block >}}

2. [Restart the Datadog Agent][19].

## Verify infrastructure mode
<!-- ADD STEPS HERE (select) -->
In [Fleet Automation][20], group by the `Infrastructure Mode` facet to see a grouping of hosts by mode.

{{< img src="agent/configuration/fleet_automation_group_by_infra_mode1.png" alt="Fleet Automation View Agents page with hosts grouped by Infrastructure Mode, showing Full and Basic groups with host counts." style="width:90%" >}}

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
[16]: /extend/custom_checks/
[17]: https://app.datadoghq.com/fleet
[18]: /agent/configuration/agent-configuration-files/
[19]: /agent/configuration/agent-commands/#restart-the-agent
[20]: https://app.datadoghq.com/fleet?group_by=infrastructure_mode
