---
title: Monitor APM Usage
kind: faq
---

If you are an admin of your account, you can monitor your account usage using the [Usage Page][1]. This page gets updated every 72 hours.

{{< img src="tracing/faq/usage_page.png" alt="APM Event Filtering" responsive="true" style="width:100%;">}}

| Metric | Description |
| ------- | -------- |
| APM Hosts | Shows the 99th percentile of all distinct APM hosts over all hours in the current month. |
| Containers | Shows the average of all distinct containers over all hours in the current month. |
| APM Events | Shows the sum of all APM events indexed over all hours in the current month. |
| Fargate Tasks | Shows the average of all Fargate tasks over all hours in the current month. |


### Monitor Hosts

To get alerts in case a code deployment scales the number of hosts sending traces, set up monitor on cardinality of host count. Get notified if the host volumes in any scope (`prod`, `availablity-zone`, etc…) of your infrastructure is growing unexpectedly:

{{< img src="tracing/faq/apm_host_monitor.mp4" alt="Analytics View" video="true" responsive="true" style="width:90%;">}}

1. Go to Monitors -> New Monitor
2. Set up a new metric monitor[link] with `datadog.apm.host_instance`
3.  Define the rate you would like to set as a warning or error.
4. Define an explicit notification: The volume on this env just got too high. Define an additional exclusion filter or increase the filtering rate to put it back under control

### Monitor APM events

To get alerts in case a code deployment causes a spike in APM events generated, set up [trace analytics monitors][2] on APM events. Get notified at any moment if the APM event volumes in any scope (`service`, `availability-zone`, etc…) of your infrastructure is growing unexpectedly:

{{< img src="tracing/faq/apm_events_monitor.mp4" alt="Analytics View" video="true" responsive="true" style="width:90%;">}}

1. Go to [Trace Analytics view][3] in APM
2. Select the `env` (you can select `*`)
3. Select `count` (you can select `*`)
4. Select the time period you want to roll it up for.
5. Select Export -> Export to Monitor
6. Define the rate you would like to set as a warning or error.
7. Define an explicit notification: The volume on this service just got too high. Define an additional exclusion filter or increase the filtering rate to put it back under control

[1]: https://app.datadoghq.com/account/usage
[2]: /monitors/monitor_types/trace_analytics
[3]: https://app.datadoghq.com/apm/search/analytics