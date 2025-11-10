---
title: Set up End User Device Monitoring
description: Set up End User Device Monitoring to collect performance and connectivity data from employee desktops and laptops.
further_reading:
   - link: "/infrastructure/end_user_device_monitoring/"
     tag: "Documentation"
     text: "End User Device Monitoring"
---

This page explains how to configure the Datadog Agent to enable End User Device Monitoring.

## Supported platforms

- Windows 10 and later
- macOS
- Virtual desktop environments such as Amazon WorkSpaces, Azure Virtual Desktop, and Google Cloud Workstations

## Configure the Datadog Agent

1. Install the Datadog Agent:
   - [Windows installation instructions][9]
   - [macOS installation instructions][10]
1. In `datadog.yaml`, set the following parameter:
{{< code-block lang="yaml" >}}
   infrastructure_mode: end_user_device
{{< /code-block >}}
1. [Restart the Datadog Agent][7].

## Enable related features and integrations

To collect additional data from monitored devices, enable one or more of the following features or integrations:

- [Live Processes][2]
- [Logs][3]
- [WiFi/WLAN integration][4]
- [Crash Detection integration][5]
- [Network Path integration][6]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: /infrastructure/process/
[3]: /logs/
[4]: /integrations/wifi/
[5]: /integrations/crash_detection/
[6]: /integrations/network_path/
[7]: /agent/configuration/agent-commands/#restart-the-agent
[8]: https://app.datadoghq.com/infrastructure
[9]: /agent/supported_platforms/windows/
[10]: /agent/supported_platforms/osx/