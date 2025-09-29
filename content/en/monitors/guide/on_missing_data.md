---
title: Migrating to On Missing Data Configuration
description: "Migrate from legacy No Data configurations to On Missing Data options for better handling of missing data in metric monitors."
further_reading:
- link: "/api/latest/monitors/"
  tag: "API"
  text: "Monitors API Documentation"
---

## Overview

Metric monitors offer enhanced options for handling missing data, allowing you to differentiate between missing data as a failure mode and a healthy state. 

These options align with what's available in other monitors types like Logs, Events, CI, Database, Error Tracking, and more.

## Benefits of using On Missing Data options

When measuring the number of bad events, like errors, Monitors should reflect an "OK" when no data is detected. With the legacy No Data configurations, monitors would report No Data. The On Missing Data configuration options allows monitors to reflect health states more accurately, improving clarity.

## Monitors managed through the UI

If you manage your monitors from the UI, the configuration automatically updates the next time you edit them. To update the On Missing Data configuration sooner, see the following sections on adjusting through the API.

## Monitors managed through the API or Terraform

If you are managing your monitors with API or Terraform, replace `notify_no_data` and `no_data_timeframe` with `on_missing_data`. The `no_data_timeframe` parameter is not required since `on_missing_data` uses the same time frame as the time window.  

### API parameters

The previous No Data parameter, `notify_no_data`, remains available on existing monitors and are not automatically upgraded to the new `on_missing_data` features.

| Parameter                               | UI Description                                                                                     |
|-----------------------------------------|----------------------------------------------------------------------------------------------------|
| `"on_missing_data": "show_and_notify_no_data"` | If data is missing Show NO DATA and notify<br>(Formerly, "Notify if data is missing")                       |
| `"on_missing_data": "show_no_data"`     | If data is missing Show NO DATA<br>(Formerly, "Do not notify if data is missing")                           |
| `"on_missing_data": "resolve"`          | If data is missing Show OK                                                                       |
| `"on_missing_data": "default"` if using sum or count aggregation | If data is missing Evaluate as 0 (or other default value)                                  |
| `"on_missing_data": "default"` if using all other aggregation types | If data is missing Show last known status |

For all the available fields, see the [API Documentation][1].

Here's an example of before and after of a JSON monitor with those fields:

**Before**  
{{< highlight yaml "hl_lines=11-12" >}}{ 
  "name": "CPU usage is high for host $host.value",  
    "type": "query alert",  
    "query": "avg(last_5m):100 - avg:system.cpu.idle{$host} > 90",  
    "message": "A high CPU usage has been detected for host $host.value, which can impact the system performance.",  
    "tags": [],  
    "options": {  
        "thresholds": { "critical": 90 },  
        "notify_audit": false,  
        "include_tags": false,  
        "notify_no_data": true,  
        "no_data_timeframe": 10  
    }  
}
{{< /highlight >}}


**After**  
{{< highlight yaml "hl_lines=11" >}}{
  "name": "CPU usage is high for host $host.value",  
    "type": "query alert",  
    "query": "avg(last_5m):100 - avg:system.cpu.idle{$host} > 90",  
    "message": "A high CPU usage has been detected for host $host.value, which can impact the system performance.",  
    "tags": [],  
    "options": {  
       "thresholds": { "critical": 90 },  
       "notify_audit": false,  
       "include_tags": false,  
       "on_missing_data": "show_and_notify_no_data"  
    }  
}  
{{< /highlight >}}

## SLO monitors

SLOs treat uptime and downtime according to this mapping:

| On Missing Data Configuration | Monitor Status                 | SLO Treatment               |
|-------------------------------|--------------------------------|-----------------------------|
| Show OK                       | OK                             | Uptime                      |
| Show No Data                  | No Data                        | Uptime                      |
| Show No Data and Notify       | No Data                        | Downtime                    |
| Show last known status        | Whatever the last status was   | If OK, Uptime<br>If Alert, Downtime |
| Evaluate as zero              | Depends on the threshold configuration | If OK, Uptime<br>If Alert, Downtime |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/api/latest/monitors/
