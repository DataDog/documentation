---
title: Device Health
description: "Detect network device issues and correlate them with configuration changes in NDM."
further_reading:
  - link: "/network_monitoring/devices/config_management"
    tag: "Documentation"
    text: "Network Configuration Management"
  - link: "/bits_ai/bits_investigation/"
    tag: "Documentation"
    text: "Bits Investigation"
  - link: "/network_monitoring/devices/troubleshooting"
    tag: "Documentation"
    text: "NDM Troubleshooting"
---

{{< callout url="https://www.datadoghq.com/product-preview/network-device-remediation-with-bits/" btn_hidden="false" header="Device Health is in Preview">}}
{{< /callout >}}

## Overview

[Device Health][1] surfaces network device issues across your infrastructure and helps you correlate them with configuration changes. Use Device Health to:

- Identify degraded devices and affected metrics across your fleet
- Correlate metric anomalies with configuration changes on a shared timeline
- Launch [Bits Investigation][2] to pinpoint root causes
- Take action by rolling back configuration changes directly from the investigation flow

Navigate to [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Devices{{< /ui >}} > {{< ui >}}Health{{< /ui >}}][1] for a fleet-wide view of all device issues. To see active issues for a specific device, select it from the [Devices][3] list or any NDM visualization to open any active issues in the device side panel.

## Investigate an issue

Select an issue to open the issue panel, which shows:

- A plain-language summary of what happened
- A graph of the affected metric showing when the issue started and its severity
- A timeline overlay showing when configuration changes occurred on the device, so you can correlate metric anomalies with specific changes

{{< img src="network_device_monitoring/health/investigate-issue.png" alt="A device health issue showing a bandwidth utilization drop on interface ge0/0, with a summary of the root cause, a timeseries graph with configuration change markers, and a button to investigate further with Bits Investigation." style="width:100%;" >}}

### Launch a Bits Investigation

From a selected issue, you can trigger a [Bits Investigation][2]. Bits Investigation analyzes the issue and provides:

- A step-by-step summary of the investigation and its findings
- Root cause analysis in plain language

To start a Bits Investigation, click {{< ui >}}Investigate further with Bits{{< /ui >}}. Click {{< ui >}}View full investigation{{< /ui >}} to open the complete investigation in a new tab. For more information, see [Bits Investigation][2].

### Apply a proposed fix

Take action directly from the issue panel by applying the proposed fix (such as rolling back the configuration to the last trusted version). See a diff of the exact configuration change to be applied.

{{< img src="network_device_monitoring/health/proposed-fix.png" alt="A proposed fix panel showing a rollback to a previous configuration version, with an Apply Fix button and a side-by-side diff of the current running configuration and the suggested fix." style="width:100%;" >}}

### View impacted devices and dependencies

The issue panel also shows other devices and dependencies potentially affected by the same issue, helping you assess the scope of impact across your network. To investigate further, select any device in the diagram or the affected devices list to open its Device page.

{{< img src="network_device_monitoring/health/affected-devices-and-dependencies.png" alt="A dependency map for the ny-edge device showing connected devices, and a list of nine affected devices all marked as degraded." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/health
[2]: /bits_ai/bits_investigation/
[3]: https://app.datadoghq.com/devices
