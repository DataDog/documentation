---
title: SLO Alerts
kind: documentation
aliases :
  - /monitors/create/types/slo/
---

## Overview

[Service Level Objectives][1], or SLOs, are a key part of the site reliability engineering toolkit. SLOs provide a framework for defining clear targets around application performance, which ultimately help teams provide a consistent customer experience, balance feature development with platform stability, and improve communication with internal and external users.

## Monitor creation

To create an [SLO alert][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> SLO*.

### Select SLO

Select a [Service Level Objective][1].

### Set alert conditions

Two types of alerts are available:

[Error budget alerts][3] notify you when a certain percentage of your SLO's error budget has been consumed.

[Burn rate alerts][4] notify you when the rate of consumption of your SLO error budget has exceeded your specified threshold and is sustained for a certain period of time.

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][5] page.

In addition to the [standard template variables][6] available across all monitor types, SLO alerts also support the following variables: 

| Variable   | Description   |
| ---------- | ------------- |
| `{{timeframe}}` | The time window of the SLO (7, 30, 90 days). |
| `{{value}}` | The percentage of error budget consumed (error budget alerts only). |
| `{{short_window_burn_rate}}` | The burn rate value observed by the short window (burn rate alerts only). |
| `{{long_window_burn_rate}}` | The burn rate value observed by the long window (burn rate alerts only). |

[1]: /service_management/service_level_objectives/
[2]: https://app.datadoghq.com/monitors/create/slo
[3]: /service_management/service_level_objectives/error_budget/
[4]: /service_management/service_level_objectives/burn_rate/
[5]: /monitors/notify/#overview
[6]: /monitors/notify/variables/?tab=is_alert#template-variables
