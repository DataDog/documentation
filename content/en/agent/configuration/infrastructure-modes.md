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

Infrastructure modes let you control how much infrastructure monitoring the Datadog Agent performs on a host. Use a non-default mode to reduce resource overhead on hosts that only need system metrics or no infrastructure monitoring, such as hosts dedicated to log collection or APM.

## Available modes

The Agent supports three infrastructure modes: `full`, `basic`, and `none`.

If the `infrastructure_mode` option is not explicitly set in the configuration file, the Agent operates in `full` mode.

If your host only needs system resource metrics, use `basic` mode. If it does not need any infrastructure monitoring, use `none` mode.

{{< tabs >}}
{{% tab "Full" %}}
<div class="alert alert-info"> This is the default. You do not need additional configuration unless you are switching from another mode.
</div>

The `full` mode requires Agent version 7.73.0 or later.

Datadog recommends `full` mode for most use cases. In `full` mode, all Agent infrastructure monitoring features are available.

{{% /tab %}}
{{% tab "Basic" %}}

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

In `basic` mode, only the following integrations run. All others, including Container Monitoring and Live Processes, are disabled:

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

**Note**: Configured integrations that are not in the previous list do not run. To run them, switch to `full` mode.

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

Datadog recommends `none` mode for Agents that do not require infrastructure monitoring, such as those configured only for [Log Management][1], [Application Performance Monitoring][2], or [Error Tracking][3].

In `none` mode, the Agent does not collect any infrastructure metrics or run infrastructure integrations. You can use custom metrics, [custom checks][4] prefixed with `custom_`, and logs-only integrations.

The host in `none` mode appears in [Fleet Automation][5] under the **View Agents** tab because the Agent continues to send metadata to Datadog. However, the host does not appear in infrastructure dashboards or queries that rely on infrastructure metrics.

[1]: /logs/
[2]: /tracing/
[3]: /error_tracking/
[4]: /extend/custom_checks/
[5]: https://app.datadoghq.com/fleet

{{% /tab %}}
{{< /tabs >}}

## Configure Agent infrastructure mode

1. Add the `infrastructure_mode` option at the root level of the [Agent configuration file][1] (`datadog.yaml`).

    {{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true"
      collapsible="true" >}}
api_key: <API_KEY>
infrastructure_mode: <MODE>
    {{< /code-block >}}

2. [Restart the Datadog Agent][2].

## Verify infrastructure mode

In [Fleet Automation][101], group by the `Infrastructure Mode` facet to see a grouping of hosts by mode.

{{< img src="agent/configuration/fleet_automation_group_by_infra_mode1.png" alt="Fleet Automation View Agents page with hosts grouped by Infrastructure Mode, showing Full and Basic groups with host counts." style="width:90%" >}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-configuration-files/
[2]: /agent/configuration/agent-commands/#restart-the-agent
[101]: https://app.datadoghq.com/fleet?group_by=infrastructure_mode
