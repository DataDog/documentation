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

## Permissions

The following permissions control access to End User Device Monitoring:

| Name | Description | Default role |
| --- | --- | --- |
| End User Devices Read (`end_user_devices_read`) | View End User Device Monitoring, including the command center, summary, and devices explorer. | Datadog Standard Role |
| End User Devices Config Read (`end_user_devices_config_read`) | View End User Device Monitoring organization settings. | Datadog Admin Role |
| End User Devices Config Write (`end_user_devices_config_write`) | Change End User Device Monitoring organization settings. | Datadog Admin Role |

The Datadog Standard Role includes End User Devices Read. The Datadog Admin Role includes all three permissions. If your organization uses [custom roles][23], an admin with the User Access Manage permission needs to add these permissions to the roles that should use End User Device Monitoring. For details, see [Datadog Role Permissions][24].

End User Device Monitoring also uses permissions from other Datadog products for the full product to work.

Command Center requires **Work Items Read** (`cases_read`) and **Work Items Write** (`cases_write`).

Identity mapping requires **Reference Tables Read** (`reference_tables_read`) or **Reference Tables Write** (`reference_tables_write`), depending on the action. Access restrictions on the configured reference table also apply.

The following permissions apply to the corresponding feature, not to basic End User Device Monitoring access:

- Network Path data requires **Network Path Data Read** (`network_path_config_read`).
- Network-device and access-point information requires **NDM Read** (`ndm_devices_read`).
- Network connection data requires **Network Connections Read** (`network_connections_read`) when network-connection permission enforcement is enabled for the organization.

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

## Getting started
Once devices start populating, start exploring End User Devices by:
1. **Mapping devices to end users with a Reference Table.** On the Settings page, click Edit to upload a mapping between device identifiers, such as hostname, and user attributes such as name, email, and team.
2. **Asking Bits about device health and trends.** Open [Bits Chat][16] and ask questions about the fleet in natural language. For example, ask which devices are using the most CPU, which laptops have low battery capacity, or which users lost connectivity.
3. **Querying device data with the Datadog MCP Server.** Connect an AI client, such as Cursor or Claude, to the [Datadog MCP Server][17] to retrieve device metrics, logs, and related telemetry through that client. See [Set up the Datadog MCP Server][18] to get started.
4. **Reviewing battery health.** Create a dashboard with [battery metrics][20] such as maximum capacity, cycle count, and charge status to identify laptops to replace.
5. **Tracking latency to destinations.** Set up [Network Path][7] on monitored devices to measure latency from a device to a destination, such as a SaaS application, and find the hop where delay is introduced. Read [Trace network paths from user devices to SaaS applications][19] for examples.


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
[16]: /bits_ai/bits_chat/
[17]: /mcp_server/
[18]: /mcp_server/setup/
[19]: /infrastructure/end_user_device_monitoring/#trace-network-paths-from-user-devices-to-saas-applications
[20]: /integrations/battery/#data-collected
[23]: /account_management/rbac/permissions/#custom-roles
[24]: /account_management/rbac/permissions/#end-user-device-monitoring
