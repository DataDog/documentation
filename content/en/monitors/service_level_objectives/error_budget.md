---
title: Error Budget Alerts
kind: documentation
description: "Use Monitors to alert off of Service Level Objectives"
---

<div class="alert alert-warning">
This feature is in open beta. Email <a href="mailto:slo-help@datadoghq.com">slo-help@datadoghq.com</a> to ask questions or to provide feedback on this feature.
</div>

## Overview

SLO error budget alerts are threshold based and notify you when a certain percentage of your SLO’s error budget has been consumed. For example, alert me if 75% of the error budget for my 7-day target is consumed. Warn me if 50% is consumed (optional).

**Note:** Error budget alerts are only available for [metric-based SLOs][1] or for [monitor-based SLOs][6] that are only composed of Metric Monitor types (Metric, Integration, APM Metric, Anomaly, Forecast, or Outlier Monitors).

{{< img src="monitors/service_level_objectives/error_budget_alert_config.png" alt="Error budget alert configuration">}}

## Monitor creation

1. Navigate to the [SLO status page][2].
2. Create a new SLO or edit an existing one, then click the ‘Save and Set Alert’ button. For existing SLOs, you can also click the “Enable Alerts” link in the SLO detail side panel to take you directly to the alert configuration.
3. Set an alert to trigger when the percentage of the error budget consumed is above the `threshold`
over the past `target` number of days.
4. Add [Notification information][3] into the **Say what’s happening** and **Notify your team** sections.
5. Click the ‘Save and Set Alert’ button on the SLO configuration page.

**Note:** Clicking the `New Condition` button adds an optional warning condition. The warning threshold must be less than the alert threshold.

{{< img src="monitors/service_level_objectives/save_set_alert.png" alt="Save SLO and set up an error budget alert">}}

### API and Terraform

You can create SLO error budget alerts using the [create-monitor API endpoint][4]. Below is an example query for an SLO monitor, which alerts when more than 75% of the error budget of an SLO is consumed:

```
error_budget("slo_id").over("time_window") > 75
```

In addition, SLO error budget alerts can also be created using the [datadog_monitor resource in Terraform][5]. Below is an example `.tf` for configuring an error budget alert for a metric-based SLO using the same example query as above.

**Note:** SLO error budget alerts are only supported in Terraform provider v2.7.0 or earlier and in provider v2.13.0 or later. Versions between v2.7.0 and v2.13.0 are not supported.

```
resource "datadog_monitor" "metric-based-slo" {
    name = "SLO Error Budget Alert Example"
    type  = "slo alert"
    
    query = <<EOT
    error_budget("slo_id").over("time_window") > 75 
    EOT

    message = "Example monitor message"
    thresholds = {
      critical = 75
    }
    tags = ["foo:bar", "baz"]
}
```

Replace `slo_id` with the alphanumeric ID of the metric-based SLO you wish to configure an error budget alert on and replace `time_window` with one of `7d`, `30d` or `90d`- depending on which target is used to configure your metric-based SLO.

## Beta restrictions

- Alerting is available for only metric-based SLOs.
- The alert status of an SLO monitor is available in the **Alerts** tab in the SLO’s detail panel.
- You can only set one alert per SLO (target + time window) in the UI, but you can set multiple alerts per SLO using the API or Terraform.

[1]: /monitors/service_level_objectives/metric/
[2]: https://app.datadoghq.com/slo
[3]: /monitors/notifications/
[4]: /api/v1/monitors/#create-a-monitor
[5]: https://www.terraform.io/docs/providers/datadog/r/monitor.html
[6]: /monitors/service_level_objectives/monitor/
