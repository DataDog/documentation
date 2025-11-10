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
   - [Windows installation instructions][1]
   - [macOS installation instructions][2]
1. In `datadog.yaml`, set the following parameter:
{{< code-block lang="yaml" >}}
infrastructure_mode: end_user_device
{{< /code-block >}}

1. [Restart the Datadog Agent][3].

## Enable related features and integrations

To collect additional data from monitored devices, enable one or more of the following features or integrations:

- [Live Processes][4]
- [Logs][5]
- [WiFi/WLAN integration][6]
- [Crash Detection integration][7]
- [Network Path integration][8]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/supported_platforms/windows/
[2]: /agent/supported_platforms/osx/
[3]: /agent/configuration/agent-commands/#restart-the-agent
[4]: /infrastructure/process/
[5]: /logs/
[6]: /integrations/wlan/
[7]: /integrations/wincrashdetect/
[8]: /network_monitoring/network_path/setup