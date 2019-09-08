---
title: Estimate and Control APM Events
kind: faq
---

You can choose to configure Trace Search and Analytics per service to manually control the number of APM events being generated using the following tools. Note that this, however, limits Trace Search and Analytics functionality on those services or integration. 

### APM Event Estimator

{{< img src="tracing/faq/event_estimator.png" alt="APM Event Filtering" responsive="true" style="width:100%;">}}

To estimate the number of events a service is sending per day or per month, use the [Event Estimator page][1]. This is designed to help you decide which services to configure with Trace Search and Analytics while keeping usage and cost in your control.

### APM Event Filtering

{{< img src="tracing/faq/event_filtering.mp4" alt="Analytics View" video="true" responsive="true" style="width:90%;">}}

Enable [Event Filtering][2] to send APM events at 100% throughput by default. For example, a Java service with 100 requests generates 100 APM events from its `servlet.request` spans, as each `servlet.request` span generates an APM event. [Filtering APM events][3] has the benefit of reducing the number of billable APM events and has no effect on trace sampling. Once a service has been filtered lower than 100%, APM event analytics are upscaled to display an estimate by default, and you have the option to display the filtered value.

Further, you can also choose to enable Trace Search and Analytics per service, or per integration in code using these language specific instructions[4].


[1]: https://app.datadoghq.com/apm/docs/trace-search?env=datadoghq.com
[2]: https://app.datadoghq.com/apm/docs/trace-search?env=datadoghq.com
[3]: https://app.datadoghq.com/apm/settings?env=datadoghq.com&activeTab=0
[4]: tracing/trace_search_and_analytics/?tab=java#configure-additional-services-optional