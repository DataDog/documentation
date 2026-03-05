---
title: Infrastructure Modes
description: "Learn how to optimize Agent behavior for specialized compute scenarios"
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

<!-- PROPOSED RESTRUCTURE — BEGIN -->

## Overview

The Agent infrastructure mode determines which capabilities, integrations, and metrics the Agent collects for hosts. This guide explains the behavior of each mode and how to configure it.

**Note**: The availability and behavior of a mode may change between Agent versions.

## Agent infrastructure mode

### Infrastructure mode options

The Agent supports three infrastructure modes: `full`, `basic`, and `none`.

| Mode | Description |
| ---- | ----------- |
| `full` | Default. All Agent infrastructure monitoring features are available. |
| `basic` | Collects core system metrics only. |
| `none` | Disables all infrastructure monitoring in the Agent. |

**Note**: If the `infrastructure_mode` option is not explicitly set in the configuration file, the Agent operates in `full` mode.

To change the infrastructure mode, edit or add the `infrastructure_mode` option in the main [Agent configuration file][1] and then [restart the Datadog Agent][2]:

```yaml
infrastructure_mode: <Mode>
```

To verify the configured infrastructure mode of an Agent in [Fleet Automation][101], search or group by the `Infrastructure Mode` facet.

{{< img src="agent/configuration/fleet_automation_group_by_infra_mode.png" alt="Screenshot of Fleet Automation showing hosts grouped by their infrastructure mode" style="width:100%" >}}

### Infrastructure mode behaviors

{{< tabs >}}
{{% tab "Full" %}}

<!-- TODO: 
- Confirm with author what specific use cases full mode is recommended for
- Confirm with author what specific capabilities are included (container monitoring, Live Processes, etc.)
- Confirm minimum Agent version for full mode 
- Confirm Agent version
-->

The `full` mode requires Agent version X.xx.x or later. 

Datadog recommends `full` mode for most use cases. When in this mode, all Agent infrastructure monitoring features are available.

To configure the Agent in `full` mode, add the following setting to `datadog.yaml`:

```yaml
infrastructure_mode: full
```

{{% /tab %}}
{{% tab "Basic" %}}

The `basic` mode requires the following Agent versions:

| Platform | Minimum Version |
| -------- | ------- |
| Linux    | 7.73.0  |
| Windows  | 7.76.2  |
| macOS    | 7.73.0  |

Datadog recommends `basic` mode for VMs and physical servers with low observability requirements.

When in `basic` mode, the Agent reports system resource usage data for the following:
- CPU
- Memory
- Disk
- Network
- Process and service data (limited)

Datadog disables the following features in `basic` mode:
- Container monitoring
- Live Processes
- Agent integrations (See exceptions below)

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

**Note**: Configured integrations that are not in the list above are ignored. To run them, switch to `full` mode. 

To configure the Agent in `basic` mode, add the following setting to `datadog.yaml`:

```yaml
infrastructure_mode: basic
```

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

{{% /tab %}}
{{% tab "None" %}}
<!-- TODO: 
- Confirm with author what happens to the host in the Datadog UI (does it disappear from Infrastructure List?)
-->

The `none` mode requires Agent version 7.77.0 or later. 

Datadog recommends `none` mode for Agents that do not require infrastructure monitoring (for example, Agents configured to collect only [Log Management][1], [Application Performance Monitoring][2], or [Error Tracking][3]).

When in `none` mode, the Agent does not collect any infrastructure metrics or run infrastructure integrations. You can still use custom metrics, [custom checks][4] prefixed with `custom_`, and logs-only integrations.

To configure the Agent in `none` mode, add the following setting to `datadog.yaml`:

```yaml
infrastructure_mode: none
```

[1]: /logs/
[2]: /tracing/
[3]: /error_tracking/
[4]: /extend/custom_checks/

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-configuration-files/
[2]: /agent/configuration/agent-commands/#restart-the-agent
[101]: https://app.datadoghq.com/fleet?group_by=infrastructure_mode

<!-- PROPOSED RESTRUCTURE — END -->

<!-- ORIGINAL CONTENT — BEGIN

The Agent infrastructure mode determines which capabilities, integrations, and metrics are collected for hosts.
The sections below provide details on the behavior of each mode as well as how to configure it.

**Note**: The availability and behavior of a mode may change between Agent versions.

## Changing Agent's infrastructure mode

To change the infrastructure mode, edit or add the `infrastructure_mode: [full | basic | none]` option in the main [Agent configuration file][1] and then [restart the Datadog Agent][2].

If the `infrastructure_mode` option is not explicitly set in the configuration file, the agent will operate in `full` mode.

You can verify the configured infrastructure mode of an agent in Fleet Automation by searching for or grouping by the `Infrastructure Mode` facet.

{{< img src="agent/configuration/fleet_automation_group_by_infra_mode.png" alt="Screenshot of Fleet Automation showing hosts grouped by their infrastructure mode" style="width:100%" >}}

## Infrastructure mode behaviors

### Full mode

Full mode is the default Agent infrastructure mode and is recommended for most use cases.
All Agent infrastructure monitoring features are available in full mode.

To configure Agent in full mode, add the following to `datadog.yaml`:

```yaml
infrastructure_mode: full
```

### Basic mode

Basic mode configures the Agent to only collect core system metrics for VMs and physical servers with low observability requirements.
An Agent configured in basic mode will report system resource usage information for the CPU, memory, disk, and network, as well as limited data on processes and services.
Container monitoring, Live Processes, and most agent integrations are not available in basic mode.

Basic mode is available in the following Agent versions:

| Agent platform | Minimum agent version |
| -------------- | --------------------- |
| Linux          | 7.73.0                |
| Windows        | 7.76.2                |
| macOS          | 7.73.0                |

Only the following integrations run in basic mode:
  - [System Check][3]
  - [Disk][4]
  - [Network][5]
  - [NTP][6]
  - [Processes][7]
  - [Systemd][8]
  - [Windows Crash Detection][9]
  - [Windows Kernel Memory][10]
  - [Windows Services][11]
  - [Custom checks][12] prefixed with `custom_`
  - Logs-only integrations such as [journald][13] or [Windows Event Log][14]

Integrations that are configured, but not included in the list above, will not be scheduled by the Datadog agent.
To run other integrations, change the agent to full mode.

To configure Agent in basic mode, add the following to `datadog.yaml`:

```yaml
infrastructure_mode: basic
```

### None mode

None mode disables all infrastructure monitoring in the Agent.
Agent will not collect any infrastructure metrics or run infrastructure integrations in this mode.
You may still use custom metrics, [custom checks][12] prefixed with `custom_`, and logs-only integrations with Agent in none mode.

None mode is compatible with other Datadog products that do not require infrastructure monitoring such as [Log Management][15], [Application Performance Monitoring][16], or [Error Tracking][17].

None mode is available with agent version `7.77.0` or later.

To configure Agent in none mode, add the following to `datadog.yaml`:

```yaml
infrastructure_mode: none
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-configuration-files/
[2]: /agent/configuration/agent-commands/#restart-the-agent
[3]: /integrations/system/
[4]: /integrations/disk/
[5]: /integrations/network/
[6]: /integrations/ntp/
[7]: /integrations/process/
[8]: /integrations/systemd/
[9]: /integrations/wincrashdetect/
[10]: /integrations/winkmem/
[11]: /integrations/windows-service/
[12]: /extend/custom_checks/
[13]: /integrations/journald/
[14]: /integrations/event-viewer/
[15]: /logs/
[16]: /tracing/
[17]: /error_tracking/

ORIGINAL CONTENT — END -->
