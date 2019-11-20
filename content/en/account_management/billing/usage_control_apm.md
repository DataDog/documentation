---
title: Estimate and Control APM Usage
kind: faq
---

Datadog has many pricing plans to fit your needs. For more information, see the [Pricing page][1].
Read APM documentation on [APM Billing][2] to understand how billing works for APM and Distributed Tracing.

App Analytics is billed on the basis of [Analyzed Span][3] count. You can choose to configure [App Analytics][4] per service to manually control the number of Analyzed Spans being generated using the following tools. Note that this, however, limits App Analytics functionality on those services or integration. 

### Choose Analyzed Span Retention

App Analytics Pricing depends on the retention policy of Analyzed Spans. You can control your bill by choosing the duration Analyzed Spans are retained for.

| Analyzed Spans Retention | Pricing |
|----------------------|---------|
| 15 days (default) | $1.70 per million Analyzed Spans per month |
| 3 days | $1.06 per million Analyzed Spans per month |
| 7 days | $1.27 per million Analyzed Spans per month |
| 30 days | $2.50 per million Analyzed Spans per month |

Prices reflect annual billing. Contact [Sales][5] or your [Customer Success][6] Manager to discuss volume discounts for your account.

### Analyzed Span Estimator
[Analyzed Span Estimator][7] is designed to help you decide which services to configure with App Analytics while keeping usage and cost in your control.

To estimate the total number of analyzed spans expected to be sent per service per day or per month, follow these steps:

1. Enable APM on all the hosts for which you want to estimate the volume of analyzed spans.
2. In the [**Analyzed Span Estimator** view][7], select the services that you want to turn APM Analytics on.
3. **Total Estimated APM Volume** denotes the estimated total volume of analyzed spans for all services, per day and per month. Each row corresponding to the service represents the estimated volume of analyzed spans for that service, per day.

{{< img src="tracing/faq/apm_span_estimator.png" alt="Analyzed Span Estimator">}}


4. Total cost can be estimated by multiiplying the Total Volume * [Analyzed Span Retention Pricing][8]

Ex. 1,750,000,000 Analyzed Spans per month for 15 days (default retention)

1,750,000,000 Analyzed Spans per month * $1.70 / 1 million Analyzed Spans
=$2,975/mo for App Analytics


### Analyzed Span Filtering

[Span filtering][9] is configured to send Analyzed Spans at 100% throughput by default. For example, a Java service with 100 requests generates 100 Analyzed Spans from its `servlet.request` spans, as each `servlet.request` span generates an Analyzed Span. 

For cost control, you can reduce the number of billable Analyzed Spans by [filtering Analyzed Spans][9]. This has no effect on [Trace Sampling][10]. If a service has been filtered lower than 100%, Analyzed Span analytics are upscaled to display an estimate by default, and you have the option to display the filtered value.

You can also choose to enable App Analytics per service, or per integration in code using [these language specific instructions][11].

[1]: https://www.datadoghq.com/pricing
[2]: /account_management/billing/apm_distributed_tracing
[3]: /tracing/visualization/#apm-event
[4]: /tracing/app_analytics
[5]: mailto:sales@datadoghq.com
[6]: mailto:success@datadoghq.com
[7]: https://app.datadoghq.com/apm/docs/trace-search
[8]: /account_management/billing/usage_control_apm/#choose-analyzed-span-retention
[9]: https://app.datadoghq.com/apm/settings?env=datadoghq.com&activeTab=0
[10]: https://docs.datadoghq.com/tracing/guide/trace_sampling_and_storage/
[11]: tracing/app_analytics/?tab=java#configure-additional-services-optional
