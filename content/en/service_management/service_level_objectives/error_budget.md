---
title: Error Budget Alerts
description: "Use Monitors to alert off of the error budget consumption of an SLO"
aliases:
- /monitors/service_level_objectives/error_budget/
further_reading:
- link: "/service_management/service_level_objectives/"
  tag: "Documentation"
  text: "Overview of Service Level Objectives"
---

## Overview

SLO error budget alerts are threshold based and notify you when a certain percentage of your SLO's error budget has been consumed. For example, alert me if 75% of the error budget for my 7-day target is consumed. Warn me if 50% is consumed (optional).

**Note:** Error budget alerts are available for the following SLO types:

- [Metric-based SLOs][1], 
- [Monitor-based SLOs][2] that are only composed of Metric Monitor types (Metric, Integration, APM Metric, Anomaly, Forecast, or Outlier Monitors), and
- [Time Slice SLOs][8]

For a description of key terminology around SLOs, including *error budgets*, see [Service Level Objectives][3].

{{< img src="service_management/service_level_objectives/slo-error-budget-alert-v2.png" alt="Error budget alert configuration">}}

## Monitor creation

1. Navigate to the [SLO status page][4].
2. Create a new SLO or edit an existing one, then click the **Save and Set Alert** button. For existing SLOs, you can also click the **Set up Alerts** button in the SLO detail side panel to take you directly to the alert configuration.
3. Select the **Error Budget** tab in **Step 1: Setting alerting conditions**.
4. Set an alert to trigger when the percentage of the error budget consumed is above the `threshold`.
over the past `target` number of days.
4. Add [Notification information][5] in the **Configure notifications and automations** section.
5. Click the **Create & Set Alert** button on the SLO configuration page.

{{< img src="service_management/service_level_objectives/slo_create_set_alert.png" alt="Create SLO and set up an error budget alert" style="width:80%;">}}

### API and Terraform

You can create SLO error budget alerts using the [create-monitor API endpoint][6]. Below is an example query for an SLO monitor, which alerts when more than 75% of the error budget of an SLO is consumed. Replace *slo_id* with the alphanumeric ID of the SLO you wish to configure a burn rate alert on and replace *time_window* with one of 7d, 30d or 90d - depending on which target is used to configure your SLO:

```
error_budget("slo_id").over("time_window") > 75
```

In addition, SLO error budget alerts can also be created using the [datadog_monitor resource in Terraform][7]. Below is an example `.tf` for configuring an error budget alert for a metric-based SLO using the same example query as above.

**For provider versions v2.7.0 or earlier and v2.13.0 or later**

**Note:** SLO error budget alerts are only supported in Terraform provider v2.7.0 or earlier and in provider v2.13.0 or later. Versions between v2.7.0 and v2.13.0 are not supported.

```
resource "datadog_monitor" "metric-based-slo" {
    name = "SLO Error Budget Alert Example"
    type  = "slo alert"
    
    query = <<EOT
    error_budget("slo_id").over("time_window") > 75 
    EOT

    message = "Example monitor message"
    monitor_thresholds {
      critical = 75
    }
    tags = ["foo:bar", "baz"]
}
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /service_management/service_level_objectives/metric/
[2]: /service_management/service_level_objectives/monitor/
[3]: /service_management/service_level_objectives/#key-terminology
[4]: https://app.datadoghq.com/slo
[5]: /monitors/notify/
[6]: /api/v1/monitors/#create-a-monitor
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[8]: /service_management/service_level_objectives/time_slice
