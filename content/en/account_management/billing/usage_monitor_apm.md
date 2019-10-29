---
title: View and Alert on APM Usage
kind: faq
---

Datadog has many pricing plans to fit your needs. For more information, see the [Pricing page][1].
Read APM documentation on [APM Billing][2] to understand how billing works for APM and Distributed Tracing.

### Usage Page

If you are an admin of your account, you can view your account usage using the [Usage Page][3] which gets updated every 72 hours.

{{< img src="tracing/faq/usage_page.png" alt="APM Event Filtering" responsive="true" style="width:100%;">}}

| Metric | Description |
| ------- | -------- |
| APM Hosts | Shows the 99th percentile of all distinct APM hosts over all hours in the current month. |
| Analyzed Spans | Shows the sum of all Analyzed Spans indexed over all hours in the current month. |
| Fargate Tasks | Shows the average of all Fargate tasks over all hours in the current month. |

### Set Alert on APM Hosts

To get alerts in case a code deployment scales the number of hosts sending traces, set up monitor on APM host count. Get notified if the host volumes in any scope (`prod`, `availablity-zone`, etc…) of your infrastructure is growing unexpectedly:

{{< img src="tracing/faq/apm_host_monitor.mp4" alt="Analytics View" video="true" responsive="true" style="width:90%;">}}

1. Go to Monitors -> New Monitor
2. Set up a [new metric monitor][4] with `datadog.apm.host_instance`
3.  Define the rate you would like to set as a warning or error.
4. Define an explicit notification: The volume of hosts on this env just got too high has exceeded the allocated threshold value. Scale down the number of APM enabled hosts.

### Set Alert on Analyzed Spans

To get alerts in case a code deployment causes a spike in Analyzed Spans generated, set up [App Analytics monitors][5] on Analyzed Spans. Get notified at any moment if the APM event volumes in any scope (`service`, `availability-zone`, etc…) of your infrastructure is growing unexpectedly:

{{< img src="tracing/faq/apm_events_monitor.mp4" alt="Analytics View" video="true" responsive="true" style="width:90%;">}}

1. Go to [App Analytics view][6] in APM
2. Select the `env` (you can select `*`)
3. Select `count` (you can select `*`)
4. Select Export -> Export to Monitor
5. Define the APM event volume rate you would like to set as a warning or error.
6. Define an explicit notification: The volume of Analyzed Spans on this service just got too high. Define an additional exclusion filter or increase the filtering rate to put it back under control. 

Learn more about Event Filtering and usage control [here][7].


[1]: https://www.datadoghq.com/pricing
[2]: /account_management/billing/apm_distributed_tracing
[3]: https://app.datadoghq.com/account/usage
[4]: https://app.datadoghq.com/monitors#create/metric
[5]: /monitors/monitor_types/apm/?tab=traceanalytics#monitor-creation
[6]: https://app.datadoghq.com/apm/search/analytics
[7]: /account_management/billing/usage_control_apm
