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

Infrastructure modes let you control how much infrastructure monitoring the Datadog Agent performs on a host. You can choose between three modes, `full`, `basic`, and `none`, based on your monitoring needs. For example, use `basic` mode to reduce resource overhead on hosts that only need system metrics, or `none` mode on hosts dedicated to log collection or APM.

<div class="alert alert-info"> If the <code>infrastructure_mode</code> option is not explicitly set in the configuration file, the Agent operates in <code>full</code> mode. </div>

## Available modes
<!-- TURN THE TABS INTO DESCRIPTIONS -->
The Agent supports three infrastructure modes: `full`, `basic`, and `none`.

If your host only needs system resource metrics, use `basic` mode. If it does not need any infrastructure monitoring, use `none` mode.

<!-- TODO: Confirm with SME:
- Does basic mode appear in infrastructure dashboards? (Assumed yes, since only none explicitly says it doesn't.)
- Are custom metrics available in basic mode? (Not stated in docs, left unchecked to be safe.)
-->

| Feature | Full | Basic | None |
|---------|:----:|:-----:|:----:|
| Minimum Agent version | 7.73.0 | 7.73.0 (Linux, macOS), 7.76.2 (Windows) | 7.77.0 |
| System resource metrics (CPU, Memory, Disk, Network) | {{< X >}} | {{< X >}} | |
| Process and service data | {{< X >}} | Limited | |
| Infrastructure integrations | {{< X >}} | System, Disk, Network, NTP, Processes, Systemd, Windows Crash Detection, Windows Kernel Memory, Windows Services | |
| Container Monitoring | {{< X >}} | | |
| Live Processes | {{< X >}} | | |
| Custom checks (prefixed with `custom_`) | {{< X >}} | {{< X >}} | {{< X >}} |
| Logs-only integrations | {{< X >}} | {{< X >}} | {{< X >}} |
| Custom metrics | {{< X >}} | | {{< X >}} |
| Appears in Fleet Automation | {{< X >}} | {{< X >}} | {{< X >}} |
| Appears in infrastructure dashboards | {{< X >}} | {{< X >}} | |

### Full
<div class="alert alert-info"> This is the default. You do not need additional configuration unless you are switching from another mode.
</div>

The `full` mode requires Agent version 7.73.0 or later.

In `full` mode, all Agent infrastructure monitoring features are available. Datadog recommends `full` mode for most use cases.

<!-- ADD EXAMPLE HERE
do container monitoring, live processes run here?
-->

### Basic

The `basic` mode requires the following Agent versions:

| Platform | Minimum Version |
| -------- | ------- |
| Linux    | 7.73.0  |
| Windows  | 7.76.2  |
| macOS    | 7.73.0  |

Datadog recommends `basic` mode for VMs and physical servers that only need system resource metrics.

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

**Note**: All other integrations, including Container Monitoring and Live Processes, are disabled. Configured integrations that are not in the previous list do not run. To run them, switch to `full` mode.

### None

The `none` mode requires Agent version 7.77.0 or later.

Datadog recommends `none` mode for Agents that do not require infrastructure monitoring, such as those configured only for [Log Management][13], [Application Performance Monitoring][14], or [Error Tracking][15].

In `none` mode, the Agent does not collect any infrastructure metrics or run infrastructure integrations. You can use custom metrics, [custom checks][16] prefixed with `custom_`, and logs-only integrations.

<!-- STEPS ON HOW TO VIEW NONEs. SEARCH FOR THE NONE BY HOST NAMES. -->
The host in `none` mode appears in [Fleet Automation][17] under the **View Agents** tab because the Agent continues to send metadata to Datadog. However, the host does not appear in infrastructure dashboards or queries that rely on infrastructure metrics.

## Configure Agent infrastructure mode
<!-- ADD LEADING SENTENCE: To select your infrastructure mode -->
1. Add the `infrastructure_mode` option at the root level of the [Agent configuration file][18].

    {{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true"
      collapsible="true" >}}
api_key: <API_KEY>
infrastructure_mode: <MODE>
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
