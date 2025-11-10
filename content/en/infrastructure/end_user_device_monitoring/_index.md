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

End User Device Monitoring helps IT teams monitor the health and performance of employee desktops and laptops, physical or virtual, to detect and resolve issues that affect productivity. This gives organizations a unified view of device, network, and application performance across their workforce.

## How it works

End User Device Monitoring uses the Datadog Agent to collect data directly from employee desktops and laptops. The Agent gathers system metrics, network information, and logs from each device and sends them to Datadog for analysis.

Devices appear in the Infrastructure Host List, where you can view performance data such as CPU, memory, and network usage. You can use Fleet Automation to manage the Agents installed on those devices, including checking version status, verifying configuration consistency, and ensuring that the necessary integrations are enabled.

## Key capabilities

| Capability                        | Description                                                                                                                                    |
|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| **Device performance monitoring** | Track CPU, memory, disk, and network utilization collected automatically by the Datadog Agent to identify slow or resource-intensive devices.  |
| **Process visibility**            | Use [Live Processes][1] to view real-time CPU and memory usage by individual processes.                                                             |
| **Logs collection**               | Collect operating system and application logs from monitored devices to troubleshoot crashes, errors, and performance issues.                  |
| **Wi-Fi monitoring**              | Use the [WiFi/WLAN integration][2] to view wireless signal strength and connection information from the endpoint perspective.                       |
| **Crash detection**               | Detect Windows Blue Screen of Death (BSOD) events and driver information with the [Crash Detection integration][3].                                 |
| **Network path analysis**         | Visualize hop-by-hop routes between a device and its destination using [Network Path][4] to isolate connectivity or latency issues. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /infrastructure/process
[2]: /integrations/wlan/
[3]: /integrations/wincrashdetect/
[4]: /network_monitoring/network_path/