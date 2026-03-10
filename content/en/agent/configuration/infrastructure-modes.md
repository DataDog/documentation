---
title: Infrastructure Modes
description: "Optimize Agent behavior for specialized compute scenarios."
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

The Agent infrastructure mode determines which capabilities, integrations, and metrics the Agent collects for hosts. This guide explains the behavior of each mode and how to configure it.

**Note**: The availability and behavior of a mode may change between Agent versions.

## Agent infrastructure mode

The Agent supports three infrastructure modes: `full`, `basic`, and `none`.

**Note**: If the `infrastructure_mode` option is not explicitly set in the configuration file, the Agent operates in `full` mode.

{{< tabs >}}
{{% tab "Full" %}}

The `full` mode requires Agent version 7.73.0 or later. 

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

The `none` mode requires Agent version 7.77.0 or later. 

Datadog recommends `none` mode for Agents that do not require infrastructure monitoring (for example, Agents configured only for [Log Management][1], [Application Performance Monitoring][2], or [Error Tracking][3]).

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

### Configure Agent infrastructure mode

1. Add or edit the `infrastructure_mode` option in the main [Agent configuration file][1] on the same level as the API key.

```sh
infrastructure_mode: <MODE>
```

2. [Restart the Datadog Agent][2]. 

### Verify infrastructure mode

To verify the configured infrastructure mode of an Agent in [Fleet Automation][101], search or group by the `Infrastructure Mode` facet.

{{< img src="agent/configuration/fleet_automation_group_by_infra_mode1.png" alt="Screenshot of Fleet Automation showing hosts grouped by their infrastructure mode" style="width:90%" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-configuration-files/
[2]: /agent/configuration/agent-commands/#restart-the-agent
[101]: https://app.datadoghq.com/fleet?group_by=infrastructure_mode
