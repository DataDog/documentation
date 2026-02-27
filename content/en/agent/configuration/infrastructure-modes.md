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

The Agent infrastructure mode determines which capabilities, integrations, and metrics are collected for hosts.
The sections below provide details on the behavior of each mode as well as how to configure it.

**Note**: The availability and behavior of a mode may change between Agent versions.

## Changing Agent's infrastructure mode

To change the infrastructure mode, edit or add the `infrastructure_mode: [full | basic | none]` option in the main Agent configuration file (`datadog.yaml`) and then [restart the Datadog Agent][1].

If the `infrastructure_mode` option is not explicitly set in the configuration file, the agent will operate in `full` mode.

```yaml
infrastructure_mode: basic
```

You can verify the configured infrastructure mode of an agent in Fleet Automation by searching for or grouping by the `Infrastructure Mode` facet.

{{< img src="/static/images/agent/configuration/fleet_automation_group_by_infra_mode.png" alt="Screenshot of Fleet Automation showing hosts grouped by their infrastructure mode" style="width:100%" >}}

## Infrastructure mode behaviors

### Full mode

Full mode is the default Agent infrastructure mode and is recommended for most use cases.
All Agent infrastructure monitoring features are available in full mode.

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
| IoT            | Not applicable        |
| AIX            | Not applicable        |

Only the following integrations run in basic mode:
  - [System Check][2]
  - [Disk][3]
  - [Network][4]
  - [NTP][5]
  - [Processes][6]
  - [Systemd][7]
  - [Windows Crash Detection][8]
  - [Windows Kernel Memory][9]
  - [Windows Services][10]
  - [Custom checks][11] prefixed with `custom_`
  - Logs-only integrations such as [journald][12] or [Windows Event Log][13]

Integrations that are configured, but not included in the list above, will not be scheduled by the Datadog agent.
To run other integrations, change the agent to full mode.

### None mode

None mode disables all infrastructure monitoring in the Agent.
No infrastructure metrics will be collected from the host.

None mode is compatible with other Datadog products that do not require infrastructure monitoring such as [Log Management][14] and [Error Tracking][15].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-configuration-files/
[2]: /integrations/system/
[3]: /integrations/disk/
[4]: /integrations/network/
[5]: /integrations/ntp/
[6]: /integrations/process/
[7]: /integrations/systemd/
[8]: /integrations/wincrashdetect/
[9]: /integrations/winkmem/
[10]: /integrations/windows-service/
[11]: /extend/custom_checks/
[12]: /integrations/journald/
[13]: /integrations/event-viewer/
[14]: /logs/
[15]: /error_tracking/