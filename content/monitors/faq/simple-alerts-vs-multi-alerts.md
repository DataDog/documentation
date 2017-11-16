---
title: Simple Alerts vs Multi Alerts
kind: faq
customnav: monitornav
---

## Simple Alerts
**A Simple Alert aggregates over all reporting sources.**

You will get one alert when the aggregated value meets the set conditions. This works best to monitor a metric from a single host, like max of `system.cpu.iowait` over `host:xxx` or for an aggregate metric across many hosts, like sum of `nginx.net.request_per_s` over `availability-zone:us-east-1b`.

{{< img src="monitors/faq/single_monitor.png" alt="single_monitor" responsive="true">}}

## Multi-alerts
**A Multi Alert applies the alert to each source, according to your group parameters.**

To alert on disk space you might group by host and device, creating the query: 
```
avg of system.disk.in_use over name:cassandra by host,device. 
```

This will trigger a separate alert for each device on each host tagged `name:cassandra` when the alert conditions are met.  
**Note**: Anything reporting this metric that does not have the chosen groups will be ignored during alert evaluation.

{{< img src="monitors/faq/multi_alerts.png" alt="multi_alerts" responsive="true">}}

Your Multi-alert monitor will automatically identify new scopes to monitor over within the tag groups you've chosen, which makes the multi-alert setup especially useful for monitoring on environments that quickly or automatically scale up/down. 

It takes a multi-alert monitor approximately 1 minute to identify a new tag group when it becomes available for monitoring.

When a tag group stops reporting data, the monitor will "drop" that tag group after it reports no-data for a consecutive 24 hours.