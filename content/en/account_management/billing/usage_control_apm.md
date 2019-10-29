---
title: Estimate and Control APM Usage
kind: faq
---

Datadog has many pricing plans to fit your needs. For more information, see the [Pricing page][1].
Read APM documentation on [APM Billing][2] to understand how billing works for APM and Distributed Tracing.

App Analytics is billed on the basis of [APM event][3] count. You can choose to configure [App Analytics][4] per service to manually control the number of Analyzed Spans being generated using the following tools. Note that this, however, limits App Analytics functionality on those services or integration. 

### Choose APM Event Retention

App Analytics Pricing depends on the retention policy of Analyzed Spans. You can control your bill by choosing the duration Analyzed Spans are retained for.

| Analyzed Spans Retention | Pricing |
|----------------------|---------|
| 15 days (default) | $1.70 per million Analyzed Spans per month |
| 3 days | $1.06 per million Analyzed Spans per month |
| 7 days | $1.27 per million Analyzed Spans per month |
| 30 days | $2.50 per million Analyzed Spans per month |

Prices reflect annual billing. Contact [Sales][5] or your [Customer Success][6] Manager to discuss volume discounts for your account.

### APM Event Estimator

{{< img src="tracing/faq/event_estimator.png" alt="APM Event Filtering" responsive="true" style="width:100%;">}}

To estimate the number of events a service is sending per day or per month, use the [Event Estimator page][7]. This is designed to help you decide which services to configure with App Analytics while keeping usage and cost in your control.

### APM Event Filtering

{{< img src="tracing/faq/event_filtering.mp4" alt="Analytics View" video="true" responsive="true" style="width:90%;">}}

[Event Filtering][8] is configured to send Analyzed Spans at 100% throughput by default. For example, a Java service with 100 requests generates 100 Analyzed Spans from its `servlet.request` spans, as each `servlet.request` span generates an APM event. 

For cist control, you can reduce the number of billable Analyzed Spans by [filtering Analyzed Spans][8]. This has no effect on [Trace Sampling][9]. If a service has been filtered lower than 100%, APM event analytics are upscaled to display an estimate by default, and you have the option to display the filtered value.

You can also choose to enable App Analytics per service, or per integration in code using [these language specific instructions][10].

[1]: https://www.datadoghq.com/pricing
[2]: /account_management/billing/apm_distributed_tracing
[3]: /tracing/visualization/#apm-event
[4]: /tracing/app_analytics
[5]: mailto:sales@datadoghq.com
[6]: mailto:success@datadoghq.com
[7]: https://app.datadoghq.com/apm/docs/trace-search
[8]: https://app.datadoghq.com/apm/settings?env=datadoghq.com&activeTab=0
[9]: https://docs.datadoghq.com/tracing/guide/trace_sampling_and_storage/
[10]: tracing/app_analytics/?tab=java#configure-additional-services-optional