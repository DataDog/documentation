---
title: Set up End User Device Monitoring
description: Set up End User Device Monitoring to collect performance and connectivity data from employee desktops and laptops.
---

## Supported platforms

- Windows 10 and later
- macOS
- Virtual desktop environments such as Amazon WorkSpaces, Azure Virtual Desktop, and Google Cloud Workstations

## Setup

1. [Install the Datadog Agent][1].
2. In `datadog.yaml`, set the following parameter:
   ```yaml
   infrastructure_mode: end_user_device
   ```
3. Enable the following features to collect additional telemetry:
   - [Live Processes][2]
   - [Logs][3]
   - [WiFi/WLAN integration][4]
   - [Crash Detection integration][5]
   - [Network Path integration][6]
4. [Restart the Datadog Agent][7].

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