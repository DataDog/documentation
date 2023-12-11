---
title: SLO Type Comparison
kind: Guide
further_reading:
- link: "/service_management/service_level_objectives/"
  tag: "Documentation"
  text: "Overview of Service Level Objectives"
- link: "/service_management/service_level_objectives/metric/"
  tag: "Documentation"
  text: "Metric-based SLOs"
- link: "/service_management/service_level_objectives/monitor/"
  tag: "Documentation"
  text: "Monitor-based SLOs"
---

## Overview

Datadog Service Level Objectives (SLOs) are measured in the following ways: By Count (Metric-based), By Monitor Uptime (Monitor-based), and by Time Slices. Compare what functionalities are supported by each type to see which SLO meets your use case.

## Comparison chart

|                                                                       | **Metric-based SLO**                                                                                                                      | **Monitor-based SLO**                                                                                                                                               | **Time Slice SLO**                                                                   |
|-----------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| **Supported data types**                                              | Metrics with type of count, rate, or distribution                                                                                         | Metric Monitor types, Synthetic Monitors, and Service Checks                                                                                                        | All metric types (including gauge metrics)                                           |
| **Group functionality**                                               | Unlimited groups per SLO                                                                                                                  | Limited to 20 monitor groups per SLO                                                                                                                                | Up to 5,000 groups per SLO                                                           |
| **SLO details side panel History (up to 90 days of historical data)** | Can set custom time windows to view SLO info                                                                                              | Cannot set custom time windows to view SLO info                                                                                                                     | Can set custom time windows to view SLO info                                         |
| **SLO alerting ([Error Budget][1] or [Burn Rate][2] Alerts)**         | Available for all metric-based SLOs                                                                                                       | Available for SLOs based on Metric Monitor types only (not available for Synthetic Monitors or Service Checks)                                                      | Not available for Time Slice SLOs                                                    |
| [**SLO Status Corrections**][3]                                       | Correction periods are ignored from SLO status and error budget calculations                                                              | Correction periods are ignored from SLO status and error budget calculations                                                                                        | Correction periods are counted as uptime in SLO status and error budget calculations |
| [**SLO Widgets**][4]                                                  | Available for Metric-based SLOs                                                                                                           | Available for all Monitor-based SLO types                                                                                                                           | Available for Time Slice SLOs                                                        |
| [**SLO Data Source**][5]                                              | Available for this SLO type (up to 15 months of historical data available)                                                                | Not available for this SLO type                                                                                                                                     | Not yet available for Time Slice SLOs                                                |
| **Handling missing data in the SLO calculation**                      | Missing data is ignored in SLO status and error budget calculations                                                                       | Missing data is handled based on the [underlying Monitor's configuration][6]                                                                                        | Missing data is treated as uptime in SLO status and error budget calculations        |
| **Uptime Calculations**                                               | Uptime calculations are based on the underlying Monitor<br><br>If groups are present, overall uptime requires *all* groups to have uptime | Uptime is calculated by looking at discrete time chunks, not rolling time windows<br><br>If groups are present, overall uptime requires *all* groups to have uptime | N/A                                                                                  |



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/service_management/service_level_objectives/error_budget/
[2]: https://docs.datadoghq.com/service_management/service_level_objectives/burn_rate/
[3]: https://docs.datadoghq.com/service_management/service_level_objectives/#slo-status-corrections
[4]: https://docs.datadoghq.com/service_management/service_level_objectives/#slo-widgets
[5]: https://docs.datadoghq.com/dashboards/guide/slo_data_source/
[6]: https://docs.datadoghq.com/service_management/service_level_objectives/monitor/#missing-data
