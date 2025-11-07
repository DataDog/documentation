---
title: End User Device Monitoring
description: Monitor employee desktops and laptops to detect performance, connectivity, and application issues across your organization.
---

{{< callout url="https://www.datadoghq.com/product-preview/end-user-device-monitoring/" btn_hidden="false" >}}
End User Device Monitoring is in Preview. To enroll, click <b>Request Access</b>.
{{< /callout >}}

End User Device Monitoring helps IT teams monitor the health and performance of employee desktops and laptops, physical or virtual, to detect and resolve issues that affect productivity. This gives organizations a unified view of device, network, and application performance across their workforce.

## How it works

End User Device Monitoring uses the Datadog Agent to collect data directly from employee desktops and laptops. The Agent gathers system metrics, network information, and logs from each device and sends them to Datadog for analysis.

Devices appear in the Infrastructure Host List, where you can view performance data such as CPU, memory, and network usage. You can use Fleet Automation to manage the Agents installed on those devices, including checking version status, verifying configuration consistency, and ensuring that the necessary integrations are enabled.

## Supported platforms

- Windows 10 and later
- macOS
- Virtual desktop environments such as Amazon WorkSpaces, Azure Virtual Desktop, and Google Cloud Workstations

## Key capabilities

### Monitor device performance

Track CPU, memory, disk, and network utilization collected automatically by the Datadog Agent. These metrics help identify devices that are running slowly or consuming excessive resources.

### Identify resource-heavy processes

Use Live Processes to view real-time CPU and memory usage by individual processes. This helps pinpoint applications that impact device performance.

### Investigate issues with logs

Collect operating system and application logs from monitored devices to troubleshoot crashes, errors, and performance problems.

### Troubleshoot Wi-Fi and network connectivity

The WiFi/WLAN integration reports wireless signal strength and connection information from the endpoint perspective, helping diagnose weak or unstable connections.

### Analyze Windows crash events

The Windows Crash Detection integration captures Blue Screen of Death (BSOD) events and related driver details for root-cause analysis.

### Trace network paths from devices

Network Path shows the hop-by-hop route between a device and its destination, making it easier to isolate connectivity or latency issues along the network path.

## Setup

## Further reading

{{< partial name="whats-next/whats-next.html" >}}