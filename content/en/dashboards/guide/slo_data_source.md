---
title: Graph historical SLO data on Dashboards
kind: guide
disable_toc: false
---

{{< callout url="#" btn_hidden="true" header="false">}}
  The SLO data source is in public beta. This feature is only supported for <strong>metric-based</strong> SLOs.
{{< /callout >}}

## Overview

Graph metric-based SLOs on dashboards and track trends over 15 months. You can also leverage the [scheduled dashboard reporting][1] functionality to automatically deliver visual reports to key stakeholders. 

## Configuration

{{< img src="dashboards/guide/slo_data_type/slo_data_type.png" alt="Graph editor configuration with the slo data type selected and the good events measure selected" style="width:100%;" >}}

To get started, pick one of the standard visualization types from the dashboard widget tray and select *SLOs* as the data source in the query dropdown menu. 

For the *Measure* parameter, see the table below for more information on what each measure visualizes.

The *Display* parameter allows you to break out the query by the groups that are already configured for the SLO. 

**Note**: [SLO status corrections][2] are applied to scalar widgets only. 

| Measure / Widget type | Timeseries widget    | Scalar widgets |
| ---  | ----------- | ----------- |
| Good events | Visualizes the good events over the global time interval. Each time bucket represents the sum of good events across that time period. The bucket size is controlled by the length of the global time interval. | The sum of good events across all groups over the global time interval. |
| Bad events | Visualizes the bad events over the global time interval. Each time bucket represents the sum of bad events across that time period. The bucket size is controlled by the length of the global time interval. | The sum of bad events across all groups over the global time interval. |
| SLO status | For each time bucket, the SLO status is calculated as the number of good events divided by the total number of events across that time period. | The sum of good events divided by total number of events over the global time interval. |
| Error budget remaining | Each time bucket represents the error budget remaining across that time period. The target for the [primary time window][3] is used in the error budget calculation. | The error budget remaining at the end of the global time interval. |
| Burn rate | Each time bucket represents the burn rate across that time period. Burn rate is defined as the observed error rate divided by the ideal error rate. | The burn rate over the global time interval. |
| Error budget burndown | Error budget burndown graphs how you spent your error budget, that is, when your service had bad events. The graph begins at 100% error budget remaining at the start of the global time interval (unless there were bad events within the first time bucket) and monotonically decreases. | Error budget burndown is only available as a timeseries. |


[1]: /dashboards/scheduled_reports/
[2]: /service_management/service_level_objectives/#slo-status-corrections
[3]: /service_management/service_level_objectives/#configuration