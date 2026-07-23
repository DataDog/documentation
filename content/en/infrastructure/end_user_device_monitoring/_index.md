---
title: End User Device Monitoring
description: Monitor employee desktops and laptops to detect performance, connectivity, and application issues across your organization.
---

{{< callout url="https://www.datadoghq.com/product-preview/end-user-device-monitoring/" btn_hidden="false" >}}
End User Device Monitoring is in Preview. To enroll, click <b>Request Access</b>.
{{< /callout >}}

{{< img src="/infrastructure/end_user_device_monitoring/end_user_device_monitoring.png" alt="End User Devices page showing four healthy devices, charts for device types and operating systems, and a device table with one laptop marked for system crashes." style="width:100%;" >}}

End User Device Monitoring gives IT teams visibility into the health and performance of employee desktops and laptops, both physical and virtual. It helps identify performance and connectivity issues affecting employees and provides a unified view of device, network, and application health across your workforce to help answer questions such as:
- Why does this employee's laptop slow down every time they open a specific application?
- Which employees are affected by an overloaded Wi-Fi access point in the office?
- Is a laggy Zoom, Microsoft Teams, or Google Meet call caused by the device, the network, or the application itself?
- Where along the path to a SaaS application is latency being introduced?
- Which devices are crashing with a Blue Screen of Death, and how often?
- What software (and which versions) are installed across the fleet, for hardware and license inventory planning?
- Which devices are underperforming on CPU, memory, or disk, and need attention or replacement?
- What was happening on a device (which processes, logs, or events) right before a reported issue occurred?

## How it works

End User Device Monitoring uses the Datadog Agent to collect data directly from employee desktops, laptops, and workstations. The Agent gathers system metrics, network information, and logs from each device and sends the data to Datadog, where it can be monitored and visualized.

The [End User Devices][5] page provides built-in dashboards and metrics that summarize health and performance across your organization's devices. You can view summary metrics for all devices and detailed metrics for individual ones, including CPU, memory, and network usage.

Use [Fleet Automation][6] to manage the Agents installed on those devices, including checking version status, verifying configuration consistency, and ensuring that the necessary integrations are enabled.

## Key capabilities

| Capability                        | Description                                                                                                                                                                                               |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Device performance monitoring** | Monitor overall system health metrics such as CPU, memory, disk, and network utilization to identify underperforming devices.                                                                             |
| **Battery health** | Plan hardware life cycles with battery metrics such as maximum capacity, cycle count, and charge status.                                                                              |
| **Process visibility**            | Use [Live Processes][1] to monitor resource usage by individual processes and identify applications affecting device performance.                                                                         |
| **Logs collection**               | Use [Logs][7] to collect and explore logs from end-user devices and applications for troubleshooting crashes, errors, and performance issues.                                                             |
| **Wi-Fi monitoring**              | Monitor Wi-Fi metrics such as signal quality, transmission rate, and access point transitions with the [WiFi/WLAN integration][2], which helps identify connectivity issues and overloaded access points. |
| **Windows crash detection**       | Detect Blue Screen of Death (BSOD) events on Windows devices with the [Windows Crash Detection integration][3], which generates Datadog events showing when system crashes occur.                         |
| **Network traffic**         | See traffic volume per destination along with latency and error rate.                                                        |
| **Network path tracing**         | Use [Network Path][4] to trace network traffic from an end-user device to its destination and identify where latency or connectivity issues occur.                                                        |
| **Application inventory**         | Capture applications running on the device to verify version updates.                                          |
| **Identity mapping**         | Map devices back to the end user for pattern and cohort analysis.                                          | 

## Featured workflows

### Trace network paths from user devices to SaaS applications

When users report slow application performance or degraded video call quality (for example, on Zoom), the issue could be on the device, somewhere along the network path, or within the application itself. End User Device Monitoring integrates with [Network Path][4] to trace the full route from a user's device to the destination SaaS application, giving you visibility across all three layers.

The traceroute visualization shows every hop along the path, from the local router and ISP through the public internet to the application's CDN and servers. Each hop includes latency data, so you can pinpoint where a slowdown is introduced rather than seeing only the total round-trip time.

With network path tracing, you can:

- **Compare paths across devices**: View traceroutes from multiple devices on the same network to determine whether an issue affects a single user or the broader network.
- **Compare paths across time**: Examine how the network path changes before and after a reported issue to identify when and where latency increased.


[1]: /infrastructure/process
[2]: /integrations/wlan/
[3]: /integrations/wincrashdetect/
[4]: /network_monitoring/network_path/
[5]: https://app.datadoghq.com/end-user-devices
[6]: /agent/fleet_automation/
[7]: /logs/
