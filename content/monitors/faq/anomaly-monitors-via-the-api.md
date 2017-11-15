---
title: Anomaly Monitors via the API
kind: faq
customnav: monitornav
---

## Overview 

If you are an enterprise-level customer, you can create an anomaly detection monitor via the API with the standard [create-monitor API endpoint](/api/#monitor-create) if you add the "anomalies" function to the monitor query. The query will then follow this formula:
```
time_aggr(time_window):anomalies(space_aggr:metric{tags}, 'algorithm_used', deviation_number, direction='both/above/below') >= threshold_value
Acceptable algorithm values are basic, agile, robust, or adaptive.
```

Note that anomaly detection monitors may only be used by enterprise-level customer subscriptions. If you have a pro-level customer subscription and would like to use the anomaly detection monitoring feature, you can reach out to your customer success representative or [email our billing team](mailto:billing@datadoghq.com) to discuss that further. 

## Example

If you wanted to create an anomaly detection monitor to notify you when your average cassandra node's cpu was three standard deviations above the ordinary value for 80% of the time over the last 5 minutes, you could use the following query in your API call:

```
avg(last_5m):anomalies(avg:system.cpu.system{name:cassandra}, 'basic', 3, direction='above') >= 0.8
```