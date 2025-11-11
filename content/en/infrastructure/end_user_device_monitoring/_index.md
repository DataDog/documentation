---
title: End User Device Monitoring
description: Monitor employee desktops and laptops to detect performance, connectivity, and application issues across your organization.
further_reading:
   - link: "/infrastructure/end_user_device_monitoring/setup"
     tag: "Documentation"
     text: "Set up End User Device Monitoring"
---

{{< callout url="https://www.datadoghq.com/product-preview/end-user-device-monitoring/" btn_hidden="false" >}}
End User Device Monitoring is in Preview. To enroll, click <b>Request Access</b>.
{{< /callout >}}

<div align="center"><b>INSERT SCREENSHOT HERE</b></div></br>

End User Device Monitoring gives IT teams visibility into the health and performance of employee desktops and laptops, both physical and virtual. It helps identify performance and connectivity issues affecting employees and provides a unified view of device, network, and application health across your workforce.

## How it works

End User Device Monitoring uses the Datadog Agent to collect data directly from employee desktops, laptops, and workstations. The Agent gathers system metrics, network information, and logs from each device and sends the data to Datadog, where it can be monitored and visualized.

The [End User Devices][5] page provides built-in dashboards and metrics that summarize health and performance across your organization's devices. You can view summary metrics for all devices and detailed metrics for individual ones, including CPU, memory, and network usage.

Use [Fleet Automation][6] to manage the Agents installed on those devices, including checking version status, verifying configuration consistency, and ensuring that the necessary integrations are enabled.

## Key capabilities

| Capability                        | Description                                                                                                                                                                                               |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Device performance monitoring** | Monitor overall system health metrics such as CPU, memory, disk, and network utilization to identify underperforming devices.                                                                             |
| **Process visibility**            | Use [Live Processes][1] to monitor resource usage by individual processes and identify applications affecting device performance.                                                                         |
| **Logs collection**               | Use [Logs][7] to collect and explore logs from end-user devices and applications for troubleshooting crashes, errors, and performance issues.                                                             |
| **Wi-Fi monitoring**              | Monitor Wi-Fi metrics such as signal quality, transmission rate, and access point transitions with the [WiFi/WLAN integration][2], which helps identify connectivity issues and overloaded access points. |
| **Windows crash detection**       | Detect Blue Screen of Death (BSOD) events on Windows devices with the [Windows Crash Detection integration][3], which generates Datadog events showing when system crashes occur.                         |
| **Network path analysis**         | Use [Network Path][4] to trace network traffic from an end-user device to its destination and identify where latency or connectivity issues occur.                                                        |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /infrastructure/process
[2]: /integrations/wlan/
[3]: /integrations/wincrashdetect/
[4]: /network_monitoring/network_path/
[5]: https://app.datadoghq.com/end-user-devices
[6]: /agent/fleet_automation/
[7]: /logs/