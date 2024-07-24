---
title: SLO Type Comparison

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
- link: "/service_management/service_level_objectives/time_slice/"
  tag: "Documentation"
  text: "Time Slice SLOs"
---

## Overview

When creating SLOs, you can choose from the following types:
- **Metric-based SLOs**: can be used when you want the SLI calculation to be count-based, the SLI is calculated as the sum of good events divided by the sum of total events.
- **Monitor-based SLOs**: can be used when you want the SLI calculation to be time-based, the SLI is based on the Monitor's uptime. Monitor-based SLOs must be based on a new or existing Datadog monitor, any adjustments must be made to the underlying monitor (cannot be done through SLO creation).
- **Time Slice SLOs**: can be used when you want the SLI calculation to be time-based, the SLI is based on your custom uptime definition (amount of time your system exhibits good behavior divided by the total time). Time Slice SLOs do not require a Datadog monitor, you can try out different metric filters and thresholds and instantly explore downtime during SLO creation.
 
<div class="alert alert-info">The supported history duration for Metric-based and Time Slice SLOs matches your account's metric duration (by default, this is 15 months).</div>

## Comparison chart

|                                                                       | **Metric-based SLO**                                                                                                                      | **Monitor-based SLO**                                                                                                                                               | **Time Slice SLO**                                                                   |
|-----------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| **Supported data types**                                              | Metrics with type of count, rate, or distribution                                                                                         | Metric Monitor types, Synthetic Monitors, and Service Checks                                                                                                        | All metric types (including gauge metrics)                                           |
| **Functionality for SLO with Groups**                                               | SLO calculated based on all groups<br><br>Can view all groups in SLO side panel and SLO widget                                                                                                                  | Supported for SLOs with a single multi alert Monitor<br><br>**Option 1:** SLO calculated based on all groups (can view all groups in SLO side panel and SLO widget)<br>**Option 2:** SLO calculated based on up to 20 selected groups (can view all selected groups in SLO side panel and SLO widget)                                                                                                                                | SLO calculated based on all groups<br><br>Can view all groups in SLO side panel and SLO widget                                                           |
| **SLO side panel** | Can set custom time windows to view up to 15 months of SLO history                                                                                                | Can set custom time windows to view up to 3 months of SLO history                                                                                                                     | Can set custom time windows to view up to 15 months of SLO history                                         |
| **SLO alerting ([Error Budget][1] or [Burn Rate][2] Alerts)**         | Available                                                                                                      | Available for SLOs based on Metric Monitor types only (not available for Synthetic Monitors or Service Checks)                                                      | Available                                                    |
| [**SLO Status Corrections**][3]                                       | Correction periods are ignored from SLO status calculation                                                              | Correction periods are ignored from SLO status calculation                                                                                        | Correction periods are counted as uptime in SLO status calculation |
| **SLO widgets ([SLO List widget][10] or [SLO widget][9])**                                                  | Can view up to 15 months of historical data with the SLO widget                                                                                                           | Can view up to 3 months of historical data with the SLO widget                                                                                                                           | Can view up to 15 months of historical data with the SLO widget                                                         |
| **[SLO Data Source][5] (up to 15 months of historical data)**                                              | Available                                                                | Not available                                                                                                                                     | Available                                                |
| **Handling missing data in the SLO calculation**                      | Missing data is ignored in SLO status and error budget calculations                                                                       | Missing data is handled based on the [underlying Monitor's configuration][6]                                                                                        | Missing data is treated as uptime in SLO status and error budget calculations        |
| **Uptime Calculations**                                          |  N/A                                                                                  |  Uptime calculations are based on the underlying Monitor <br><br>If groups are present, overall uptime requires *all* groups to have uptime| [Uptime][7] is calculated by looking at discrete time chunks, not rolling time windows<br><br>If groups are present, overall uptime requires *all* groups to have uptime |
| **[Calendar View][11] on SLO Manage Page**                                   | Available                                                                                                                                | Not available                                                                                                                                                      | Available                                                                            |
| **Public [APIs][8] and Terraform Support**                                   | Available                                                                                                                                 | Available                                                                                                                                                     | Available                                                                            |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/service_management/service_level_objectives/error_budget/
[2]: https://docs.datadoghq.com/service_management/service_level_objectives/burn_rate/
[3]: https://docs.datadoghq.com/service_management/service_level_objectives/#slo-status-corrections
[4]: https://docs.datadoghq.com/service_management/service_level_objectives/#slo-widgets
[5]: https://docs.datadoghq.com/dashboards/guide/slo_data_source/
[6]: https://docs.datadoghq.com/service_management/service_level_objectives/monitor/#missing-data
[7]: /service_management/service_level_objectives/time_slice/#uptime-calculations
[8]: https://docs.datadoghq.com/api/latest/service-level-objectives/
[9]: https://docs.datadoghq.com/dashboards/widgets/slo/
[10]: https://docs.datadoghq.com/dashboards/widgets/slo_list/
[11]: https://docs.datadoghq.com/service_management/service_level_objectives/#slo-calendar-view
