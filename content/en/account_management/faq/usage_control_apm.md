---
title: Estimate and Control APM Usage
---

<div class="alert alert-danger">
This page describes deprecated features with configuration information relevant to legacy App Analytics, useful for troubleshooting or modifying some old setups. To have full control over your traces, use <a href="/tracing/trace_ingestion">ingestion controls</a> and <a href="/tracing/trace_retention">retention filters</a> instead.
<br>
</div>

Datadog has many pricing plans to fit your needs. For more information, see the [Pricing page][1].
Read APM documentation on [APM Billing][2] to understand how billing works for APM and Distributed Tracing.

App Analytics is billed on the basis of [Indexed Span][3] count. You can choose to configure [App Analytics][4] per service to manually control the number of Indexed Spans being generated using the following tools. **Note**: This limits App Analytics functionality on those services or integration.

## Indexed span retention

App Analytics Pricing depends on the retention policy of Indexed Spans. You can control your bill by choosing the duration Indexed Spans are retained for.

| Indexed Spans Retention | Pricing                                    |
|--------------------------|--------------------------------------------|
| 15 days (default)        | $1.70 per million Indexed Spans per month |
| 3 days                   | $1.06 per million Indexed Spans per month |
| 7 days                   | $1.27 per million Indexed Spans per month |
| 30 days                  | $2.50 per million Indexed Spans per month |

Prices reflect annual billing. Contact [Sales][5] or your [Customer Success][6] Manager to discuss volume discounts for your account.

## Indexed span estimator

[Indexed Span Estimator][7] helps you decide which services to configure with App Analytics while keeping usage and cost in your control.

To estimate the total number of Indexed Spans expected to be sent per service per day or per month, follow these steps:

1. Enable APM on all the hosts for which you want to estimate the volume of Indexed Spans.
2. In the [**Indexed Span Estimator** view][7], sort the column "App Analytics Status" column by "Not Enabled"
3. **Total Estimated APM Volume** denotes the estimated total volume of Indexed Spans for all services, per day and per month. Each row corresponding to the service represents the estimated volume of Indexed Spans for that service, per day.

    {{< img src="account_management/billing/usage_control_apm/apm_span_estimator.png" alt="Indexed Span Estimator" >}}

4. To estimate total cost, multiply the total volume by the [Indexed Span retention pricing][8].

For example, if you have 1,750,000,000 Indexed Spans per month for 15 days (default retention), you can calculate:

1,750,000,000 Indexed Spans per month * $1.70 / 1 million Indexed Spans = **$2,975 per month** for App Analytics

## Indexed span filtering

[Span filtering][9] is configured to send Indexed Spans at 100% throughput by default. For example, a Java service with 100 requests generates 100 Indexed Spans from its `servlet.request` spans, as each `servlet.request` span generates an Indexed Span.

For cost control, you can reduce the number of billable Indexed Spans by [filtering Indexed Spans][9]. This has no effect on [Trace Sampling][10]. If a service has been filtered lower than 100%, Indexed Span analytics are upscaled to display an estimate by default, and you have the option to display the filtered value.

You can also choose to enable App Analytics per service, or per integration in code using [these language specific instructions][11].

[1]: https://www.datadoghq.com/pricing
[2]: /account_management/billing/apm_distributed_tracing/
[3]: /tracing/glossary/#apm-event
[4]: /tracing/app_analytics/
[5]: mailto:sales@datadoghq.com
[6]: mailto:success@datadoghq.com
[7]: https://app.datadoghq.com/apm/settings
[8]: /account_management/billing/usage_control_apm/#choose-analyzed-span-retention
[9]: https://app.datadoghq.com/apm/settings?env=datadoghq.com&activeTab=0
[10]: /tracing/guide/trace_sampling_and_storage/
[11]: /tracing/app_analytics/?tab=java#configure-additional-services-optional
