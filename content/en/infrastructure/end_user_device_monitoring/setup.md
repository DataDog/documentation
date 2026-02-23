---
title: Set up End User Device Monitoring
description: Set up End User Device Monitoring to collect performance and connectivity data from employee desktops and laptops.
further_reading:
   - link: "/infrastructure/end_user_device_monitoring/"
     tag: "Documentation"
     text: "End User Device Monitoring"
---

{{< callout url="https://www.datadoghq.com/product-preview/end-user-device-monitoring/" btn_hidden="false" >}}
End User Device Monitoring is in Preview. To enroll, click <b>Request Access</b>.
{{< /callout >}}

This page explains how to configure the Datadog Agent to enable End User Device Monitoring.

## Supported platforms

- Windows 10 and later
- macOS
- Linux
- Virtual desktop environments such as Amazon WorkSpaces, Azure Virtual Desktop, and Google Cloud Workstations

## Configure the Datadog Agent

1. Install the Datadog Agent:
   - [Windows installation instructions][1]
   - [macOS installation instructions][2]
   - [Linux installation instructions][3]
1. In `datadog.yaml`, set the following parameter:
{{< code-block lang="yaml" >}}
infrastructure_mode: end_user_device
{{< /code-block >}}

1. [Restart the Datadog Agent][4].

## Enable related features and integrations

To collect additional data from monitored devices, enable one or more of the following features or integrations:

- [Live Processes][5]
- [Logs][6]
- [Network Path][7]
- [WiFi/WLAN integration][8]
- [Windows Crash Detection integration][9]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/supported_platforms/windows/
[2]: /agent/supported_platforms/osx/
[3]: /agent/supported_platforms/linux/
[4]: /agent/configuration/agent-commands/#restart-the-agent
[5]: /infrastructure/process/
[6]: /logs/
[7]: /network_monitoring/network_path/setup
[8]: /integrations/wlan/
[9]: /integrations/wincrashdetect/