---
title: Burn Rate Alerts
kind: documentation
description: "Use Monitors to alert off of the burn rate of an SLO"
aliases:
- /monitors/service_level_objectives/burn_rate/
---
{{< jqmath-vanilla >}}

## Overview

SLO burn rate alerts notify you when the rate of consumption of your SLO error budget has exceeded your specified threshold and is sustained for a specific period of time. For example, you can set an alert if a burn rate of 14.4 or more is measured for the past hour over the past 5 minutes for your SLO's 30-day target. And you can set it to optionally warn you for a slightly lower threshold than you would want an alert, for example if a burn rate of 7.2 or more is observed.

**Note:** Burn rate alerts are available for the following SLO types:

- [Metric-based SLOs][1], 
- [Monitor-based SLOs][2] that are only composed of Metric Monitor types (Metric, Integration, APM Metric, Anomaly, Forecast, or Outlier Monitors), and
- [Time Slice SLOs][7]

{{< img src="service_management/service_level_objectives/slo-burn-rate-alert-v2.png" alt="Burn rate alert configuration">}}

## How Burn Rate Alerts work

A burn rate is a unitless value [coined by Google][3] that indicates how fast your error budget is consumed relative to your SLO's target length. For example, a 30-day target, a burn rate of 1 means your error budget would be fully consumed in exactly 30 days if the rate of 1 was kept constant. A burn rate of 2 means the error budget would be exhausted in 15 days if kept constant, and a burn rate of 3 means 10 days, etc.

This relationship is represented by the following formula:

$${\text"length of SLO target" \text" (7, 30 or 90 days)"} / \text"burn rate" = \text"time until error budget is fully consumed"\$$

A burn rate alert will use the recent "error rate" in its calculation to measure the observed burn rate. Note that "error rate" means the ratio of bad behavior over total behavior during a *given period*:

$$\text"error rate" = 1 - {\text"good behavior during time period" / \text"total behavior during time period"}$$

The units of "behavior" will differ depending on the type of SLO. Metric-based SLOs track the number of occurrences of something (like number of successful or failed requests), while monitor-based SLOs track amounts of time (like downtime and uptime of monitors).

When you set a target for your SLO (like 99.9%), your error budget is the amount of unreliability you're allowed to have:

$$\text"error budget" = 100% - \text"SLO Target"$$

In other words, your error budget (in fractional form) is the ideal error rate you should be maintaining. So, a burn rate can alternatively be interpreted as a multiplier of your ideal error rate. For example, for a 99.9% SLO over 30 days, if the SLO is experiencing a burn rate of 10 that means the error budget is on pace to be completely depleted in 3 days and that the observed error rate is 10 times the ideal error rate: 

$$(\text"burn rate") (\text"ideal error rate") = \text"observed error rate"$$
$$(10)(0.001) = 0.01$$

Ideally, you should always try to maintain a burn rate of 1 over the course of your SLO's target (as you invest in evolving your application with new features). However, in practice, your burn rate will fluctuate as issues or incidents cause your burn rate to increase rapidly until the issue is resolved. Therefore, alerting on burn rates allows you to be proactively notified when an issue is consuming your error budget at an elevated rate that could potentially cause you to miss your SLO target.

When you configure a burn rate alert, you specify the burn rate threshold alongside a "long alerting window" and "short alerting window" over which the observed burn rate will be measured. The long alerting window is specified in hours and ensures the monitor measures the burn rate over a period long enough to correspond to a significant issue. This prevents the monitor from triggering flaky alerts due to minor issues. The short alerting window is specified in minutes. It ensures the monitor recovers quickly after the actual issue is over by checking if the recent burn rate is still above the threshold. Google recommends the short window to be 1/12 of the long window. However, you will be able to customize the short window programmatically in Datadog through the API or with Terraform. Here is the full formula for how the burn rate alert evaluates:

$$(\text"long window error rate" / {1 - \text"SLO target"} ≥ \text"burn rate threshold") ∧ (\text"short window error rate" / {1 - \text"SLO target"} ≥ \text"burn rate threshold") = \text"ALERT"$$

## Maximum burn rate values

As noted above, you can use this formula to evaluate the observed burn rate for both the long window and short window: 

$$\text"error rate" / {1 - \text"SLO target"}$$

The maximum error rate that you can ever observe is 1 (for example, when 100% of the total behavior is bad behavior during the given time period). This means that there is a maximum possible burn rate value that you can use in your burn rate alerts: 

$$\text"max burn rate" = 1 / {1 - \text"SLO target"}$$

The lower your SLO target, the lower your maximum possible burn rate value. If you were to attempt to set a burn rate threshold higher than this value, it would be impossible for the alert to trigger. If you set a burn rate alert's condition to a value higher than the maximum determined by the above formula, you're telling the burn rate alert to notify you when your SLO is seeing an error rate greater than 100% (which is impossible). So, to avoid unhelpful alerts from being accidentally created, Datadog blocks the creation of burn rate alerts that set a burn rate value beyond their maximum.

## Picking burn rate values

Picking burn rate values to alert off of depends on the target and time window your SLO uses. When you configure a burn rate alert, your main focus should be on setting the burn rate threshold itself and setting the long window. Datadog recommends initially keeping the short window as 1/12 of the long window, as Google suggests, and then adjust the value if needed after using the alert. Your maximum possible burn rate will be bounded by the relationship described in the previous section.

### Approach #1: Time to error budget depletion

For the burn rate threshold, recall the previous relationship:

$$\text"length of SLO target (7, 30, or 90 days)" / \text"burn rate" = \text"time until error budget is fully consumed"$$
Solve for burn rate and pick a time until the error budget is fully consumed that would qualify as a significant issue. 

For the long window, choose a period of time that an elevated burn rate would have to be sustained to indicate a real issue rather than a minor transient issue. The higher the burn rate you select, the smaller a long window you should pair it with (so that high severity issues are caught sooner).

### Approach #2: Theoretical error budget consumption

Alternatively, you may think of a burn rate and long window pairing in terms of theoretical error budget consumption:

$$\text"burn rate" = {\text"length of SLO target (in hours) " * \text" percentage of error budget consumed"} / {\text"long window (in hours) " * 100%}$$

For example, for a 7-day SLO, to be alerted if the theoretical error budget consumption is 10% with 1 hour as your long window, the selected burn rate should be:

$$\text"burn rate" = {7 \text"days" * 24 \text"hours" * 10% \text"error budget consumed"} / {1 \text"hour" * 100%} = 16.8$$

**Note:** For metric-based SLOs, the relationship in Approach #2 extrapolates the total number of occurrences contained in the long window out to the full length of the SLO target. In practice, the error budget consumption observed won't correspond exactly to this relationship, as the total occurrences tracked by the metric-based SLO in a rolling window will likely differ throughout the day. A burn rate alert is meant to predict significant amounts of error budget consumption before they occur. For monitor-based SLOs, theoretical error budget consumption and actual error budget consumption are equal because time always moves at a constant rate . For example, 60 minutes of monitor data is aways contained in the 1 hour window.

## Monitor creation

1. Navigate to the [SLO status page][4].
2. Create a new SLO or edit an existing one, then click the **Save and Set Alert** button. For existing SLOs, you can also click the **Set up Alerts** button in the SLO detail side panel to take you directly to the alert configuration.
3. Select the **Burn Rate** tab in **Step 1: Setting alerting conditions**
4. Set an alert to trigger when a certain burn rate is measured during a specific long window:
   * The burn rate value must be in the range of
     $$0 < \text"burn rate" ≤ 1 / {1 - \text"SLO target"}$$
   * Datadog supports a maximum value of 48 hours for the long window. Your long window must be in the range of `1 hour <= long window <= 48 hours`.
   * The short window is then automatically calculated in the UI as `short window = 1/12 * long window`.
   * You can specify a different short window value using the [API or Terraform](#api-and-terraform), but it must always be less than the long window.
5. Add [Notification information][4] into the **Configure notifications and automations** section.
6. Click the **Save and Exit** button on the SLO configuration page.

### Examples

Below are tables of Datadog's recommended values for 7, 30, and 90-day targets. 

- These examples assume a 99.9% target, but they are reasonable for targets as low as 96% (the max burn rate for 96% is 25). However, if you are using lower targets you may require lower thresholds as described in the [Maximum Burn Rate Values](#maximum-burn-rate-values) section, Datadog recommends that you use [Approach #2](#approach-2-theoretical-error-budget-consumption) with either a smaller value for theoretical error budget consumed or a higher value for the long window.
- For metric-based SLOs, the theoretical error budget consumed is calculated by extrapolating the number of total occurrences observed in the long alerting window out to the total length of the SLO target. 

For 7-day targets:

| Burn rate | Long window | Short window | Theoretical error budget consumed |
|---|---|---|---|
| 16.8  | 1 hour  | 5 minutes  | 10%  |
| 5.6  | 6 hours  | 30 minutes  | 20%  |
| 2.8  | 24 hours  | 120 minutes  | 40%  |

For 30-day targets:

| Burn rate | Long window | Short window | Theoretical error budget consumed |
|---|---|---|---|
| 14.4  | 1 hour  | 5 minutes  | 2%  |
| 6  | 6 hours  | 30 minutes  | 5%  |
| 3  | 24 hours  | 120 minutes  | 10%  |

For 90-day targets:

| Burn rate | Long window | Short window | Theoretical error budget consumed |
|---|---|---|---|
| 21.6  | 1 hour  | 5 minutes  | 1%  |
| 10.8  | 6 hours  | 30 minutes  | 3%  |
| 4.5  | 24 hours  | 120 minutes  | 5%  |

**Recommendation:** If you find that your burn rate alert is consistently too flaky, this is an indication that you should make your short window slightly larger. However, note that the larger you make your short window, the slower the monitor will be in recovering after an issue has ended.

### API and Terraform

You can create SLO burn rate alerts using the [create-monitor API endpoint][5]. Below is an example query for a burn rate alert, which alerts when a burn rate of 14.4 is measured for the past hour and past 5 minutes. Replace *slo_id* with the alphanumeric ID of the SLO you wish to configure a burn rate alert on and replace *time_window* with one of 7d, 30d or 90d - depending on which target is used to configure your SLO:

```
burn_rate("slo_id").over("time_window").long_window("1h").short_window("5m") > 14.4
```

In addition, SLO burn rate alerts can also be created using the [datadog_monitor resource in Terraform][6]. Below is an example .tf for configuring a burn rate alert for a metric-based SLO using the same example query as above.

**Note:** SLO burn rate alerts are only supported in Terraform provider v2.7.0 or earlier and in provider v2.13.0 or later. Versions between v2.7.0 and v2.13.0 are not supported.

```
resource "datadog_monitor" "metric-based-slo" {
    name = "SLO Burn Rate Alert Example"
    type  = "slo alert"

    query = <<EOT
    burn_rate("slo_id").over("time_window").long_window("1h").short_window("5m") > 14.4
    EOT

    message = "Example monitor message"
    monitor_thresholds {
      critical = 14.4
    }
    tags = ["foo:bar", "baz"]
}
```


[1]: /service_management/service_level_objectives/metric/
[2]: /service_management/service_level_objectives/monitor/
[3]: https://sre.google/workbook/alerting-on-slos/
[4]: https://app.datadoghq.com/slo
[5]: /api/v1/monitors/#create-a-monitor
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[7]: /service_management/service_level_objectives/time_slice
