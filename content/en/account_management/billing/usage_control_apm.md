---
title: Estimate and Control APM Events
kind: faq
---

You can choose to configure Trace Search and Analytics per service to manually control the number of APM events being generated using the following tools. Note that this, however, limits Trace Search and Analytics functionality on those services or integration. 

### Choose APM Event Retention

Trace Search and Analytics Pricing depends on the retention policy of APM events. You can control your bill by choosing the duration APM events are retained for.

| APM events Retention | Pricing |
|----------------------|---------|
| 15 days (default) | $1.70 per million APM events per month |
| 7 days | $1.27 per million APM events per month |
| 30 days | $2.50 per million APM events per month |


### APM Event Estimator

{{< img src="tracing/faq/event_estimator.png" alt="APM Event Filtering" responsive="true" style="width:100%;">}}

To estimate the number of events a service is sending per day or per month, use the [Event Estimator page][1]. This is designed to help you decide which services to configure with Trace Search and Analytics while keeping usage and cost in your control.

### APM Event Filtering

{{< img src="tracing/faq/event_filtering.mp4" alt="Analytics View" video="true" responsive="true" style="width:90%;">}}

[Event Filtering][2] is enabled to send APM events at 100% throughput by default. For example, a Java service with 100 requests generates 100 APM events from its `servlet.request` spans, as each `servlet.request` span generates an APM event. By [filtering APM events][3] you can reduce the number of billable APM events. This has no effect on trace sampling. Once a service has been filtered lower than 100%, APM event analytics are upscaled to display an estimate by default, and you have the option to display the filtered value.

Further, you can also choose to enable Trace Search and Analytics per service, or per integration in code using [these language specific instructions][4].


[1]: https://app.datadoghq.com/apm/docs/trace-search?env=datadoghq.com
[2]: https://app.datadoghq.com/apm/docs/trace-search?env=datadoghq.com
[3]: https://app.datadoghq.com/apm/settings?env=datadoghq.com&activeTab=0
[4]: tracing/trace_search_and_analytics/?tab=java#configure-additional-services-optional