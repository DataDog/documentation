---
title: Graph historical SLO data on Dashboards
kind: guide
disable_toc: false
---

## Overview

Graph metric-based SLOs on dashboards and track trends across 15 months. You can also leverage the scheduled dashboard reporting functionality to automatically deliver visual reports to key stakeholders. 

## Configuration

{{< img src="dashboards/guide/slo_data_type/slo_data_type.png" alt="Graph editor configuration with the slo data type selected and the good events measure selected" style="width:100%;" >}}

To get started, pick one of the standard visualization types from the dashboard widget tray and select *SLOs* as the data source in the query dropdown menu. 

For the *Measure* parameter, see the table below for more information on what each measure visualizes.

The *Display* parameter allows you to break out the query by the groups that are already configured for the SLO. 

**Note**: SLO corrections are applied to scalar widgets only. 

| Measure / Widget type | Timeseries widget    | Other scalar widgets |
| ---  | ----------- | ----------- |
| Good events | Visualizes the good events over the global time interval. Each time bucket represents the sum of good events across that time period. The bucket size is controlled by the length of the global time interval. | The sum of good events across all groups over the global time interval. |
| Bad events | Visualizes the bad events over the global time interval. Each time bucket represents the sum of bad events across that time period. The bucket size is controlled by the length of the global time interval. | The sum of bad events across all groups over the global time interval. |
| SLO status | For each time bucket, the SLO status is calculated as the number of good events divided by the total number of events. | The sum of good events divided by total number of events over the global time interval. |
| Error budget remaining | Each time bucket represents the error budget remaining across that time period. The target for the primary time window is used in the error budget calculation. | The error budget remaining at the end of the global time interval. |
| Burn rate | Each time bucket represents the burn rate across that time period. Burn rate is defined as the observed error rate divided by the ideal error rate (1-target). | The burn rate over the global time interval. |
| Error budget burndown | Error budget burndown graphs how you spent your error budget, that is, when you had bad events. The graph begins at 100% error budget remaining at the start of the global time interval and monotonically decreases. | Error budget burndown is only available as a timeseries. |
