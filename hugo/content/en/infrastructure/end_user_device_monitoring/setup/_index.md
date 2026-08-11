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

Set up the Datadog Agent on employee desktops and laptops to collect [End User Device Monitoring data][11].

<div class="alert alert-danger">You must receive confirmation of Preview access before data appears in Datadog. After submitting your request, wait for an access confirmation before completing the setup steps below.</div>

## Supported platforms

- Windows 10 and later
- macOS 11 and later

## Set up the Datadog Agent

1. Confirm that you have received access to the Preview before continuing. If you have not received confirmation, [request access][12] and wait for approval.

2. Follow the setup instructions for your platform:
    - [macOS][14]
    - [Windows][15]

## Next steps

To collect additional data from monitored devices, enable one or more of the following features or integrations:

- [Live Processes][5]
- [Logs][6]
- [Network Path][7]
- [WiFi/WLAN integration][8]
- [Windows Crash Detection integration][9]
- [Windows Event Log][13]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[5]: /infrastructure/process/
[6]: /logs/
[7]: /network_monitoring/network_path/setup/
[8]: /integrations/wlan/
[9]: /integrations/wincrashdetect/
[11]: /infrastructure/end_user_device_monitoring/
[12]: https://www.datadoghq.com/product-preview/end-user-device-monitoring/
[13]: /integrations/event-viewer/?tab=logs
[14]: /infrastructure/end_user_device_monitoring/setup/macos/
[15]: /infrastructure/end_user_device_monitoring/setup/windows/
