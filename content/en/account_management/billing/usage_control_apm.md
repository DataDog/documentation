---
title: Estimate and Control APM Usage
kind: faq
---

Datadog has many pricing plans to fit your needs. For more information, see the [Pricing page][1].
Read APM documentation on [APM Billing][2] to understand how billing works for APM and Distributed Tracing.

Trace Search and Analytics is billed on the basis of [APM event][3] count. You can choose to configure [Trace Search and Analytics][4] per service to manually control the number of APM events being generated using the following tools. Note that this, however, limits Trace Search and Analytics functionality on those services or integration. 

### Choose APM Event Retention

Trace Search and Analytics Pricing depends on the retention policy of APM events. You can control your bill by choosing the duration APM events are retained for.

| APM events Retention | Pricing |
|----------------------|---------|
| 15 days (default) | $1.70 per million APM events per month |
| 3 days | $1.06 per million APM events per month |
| 7 days | $1.27 per million APM events per month |
| 30 days | $2.50 per million APM events per month |

Prices reflect annual billing. Contact [Sales][5] or your [Customer Success][6] Manager to discuss volume discounts for your account.

### APM Event Estimator

{{< img src="tracing/faq/event_estimator.png" alt="APM Event Filtering" responsive="true" style="width:100%;">}}

To estimate the number of events a service is sending per day or per month, use the [Event Estimator page][7]. This is designed to help you decide which services to configure with Trace Search and Analytics while keeping usage and cost in your control.

### APM Event Filtering

{{< img src="tracing/faq/event_filtering.mp4" alt="Analytics View" video="true" responsive="true" style="width:90%;">}}

[Event Filtering][8] is configured to send APM events at 100% throughput by default. For example, a Java service with 100 requests generates 100 APM events from its `servlet.request` spans, as each `servlet.request` span generates an APM event. 

For cist control, you can reduce the number of billable APM events by [filtering APM events][8]. This has no effect on [Trace Sampling][9]. If a service has been filtered lower than 100%, APM event analytics are upscaled to display an estimate by default, and you have the option to display the filtered value.

You can also choose to enable Trace Search and Analytics per service, or per integration in code using [these language specific instructions][10].

[1]: https://www.datadoghq.com/pricing
[2]: /account_management/billing/apm_distributed_tracing
[3]: /tracing/visualization/#apm-event
[4]: /tracing/trace_search_and_analytics
[5]: mailto:sales@datadoghq.com
[6]: mailto:success@datadoghq.com
[7]: https://app.datadoghq.com/apm/docs/trace-search
[8]: https://app.datadoghq.com/apm/settings?env=datadoghq.com&activeTab=0
[9]: https://docs.datadoghq.com/tracing/guide/trace_sampling_and_storage/
[10]: tracing/trace_search_and_analytics/?tab=java#configure-additional-services-optional