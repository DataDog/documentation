---
title: Estimate and Control APM Usage
kind: documentation
---

Datadog has many pricing plans to fit your needs. For more information, see the [Pricing page][1].
Read APM documentation on [APM Billing][2] to understand how billing works for APM and Distributed Tracing.

App Analytics is billed on the basis of [indexed span][3] count. You can choose to configure [App Analytics][4] per service to manually control the number of indexed spans being generated using the following tools. Note that this, however, limits App Analytics functionality on those services or integration.

## Choose indexed span Retention

App Analytics Pricing depends on the retention policy of indexed spans. You can control your bill by choosing the duration indexed spans are retained for.

| indexed spans Retention | Pricing                                    |
|--------------------------|--------------------------------------------|
| 15 days (default)        | $1.70 per million indexed spans per month |
| 3 days                   | $1.06 per million indexed spans per month |
| 7 days                   | $1.27 per million indexed spans per month |
| 30 days                  | $2.50 per million indexed spans per month |

Prices reflect annual billing. Contact [Sales][5] or your [Customer Success][6] Manager to discuss volume discounts for your account.

## indexed span Estimator

[indexed span Estimator][7] is designed to help you decide which services to configure with App Analytics while keeping usage and cost in your control.

To estimate the total number of indexed spans expected to be sent per service per day or per month, follow these steps:

1. Enable APM on all the hosts for which you want to estimate the volume of indexed spans.
2. In the [**indexed span Estimator** view][7], sort the column "App Analytics Status" column by "Not Enabled"
3. **Total Estimated APM Volume** denotes the estimated total volume of indexed spans for all services, per day and per month. Each row corresponding to the service represents the estimated volume of indexed spans for that service, per day.

    {{< img src="account_management/billing/usage_control_apm/apm_span_estimator.png" alt="indexed span Estimator" >}}

4. To estimate total cost, multiply the total volume by the [indexed span retention pricing][8].

For example, if you have 1,750,000,000 indexed spans per month for 15 days (default retention), you can calculate:

1,750,000,000 indexed spans per month * $1.70 / 1 million indexed spans = **$2,975 per month** for App Analytics

## indexed span Filtering

[Span filtering][9] is configured to send indexed spans at 100% throughput by default. For example, a Java service with 100 requests generates 100 indexed spans from its `servlet.request` spans, as each `servlet.request` span generates an indexed span.

For cost control, you can reduce the number of billable indexed spans by [filtering indexed spans][9]. This has no effect on [Trace Sampling][10]. If a service has been filtered lower than 100%, indexed span analytics are upscaled to display an estimate by default, and you have the option to display the filtered value.

You can also choose to enable App Analytics per service, or per integration in code using [these language specific instructions][11].

[1]: https://www.datadoghq.com/pricing
[2]: /account_management/billing/apm_distributed_tracing/
[3]: /tracing/visualization/#apm-event
[4]: /tracing/app_analytics/
[5]: mailto:sales@datadoghq.com
[6]: mailto:success@datadoghq.com
[7]: https://app.datadoghq.com/apm/settings
[8]: /account_management/billing/usage_control_apm/#choose-analyzed-span-retention
[9]: https://app.datadoghq.com/apm/settings?env=datadoghq.com&activeTab=0
[10]: /tracing/guide/trace_sampling_and_storage/
[11]: /tracing/app_analytics/?tab=java#configure-additional-services-optional
