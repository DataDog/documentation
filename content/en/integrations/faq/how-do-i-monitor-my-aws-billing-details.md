---
title: How do I monitor my AWS billing details?
kind: faq
---

Billing metrics can be collected from AWS by using the Datadog-AWS Billing integration.

Further information on this can be found within the app here:
https://app.datadoghq.com/account/settings#integrations/amazon_billing

To begin collecting billing metrics:

1. Select "Billing" on the [AWS configuration tile][1] and include the permission `budgets:ViewBudget` in your Datadog AWS policy.

2. Enable billing metrics within the [AWS Console][2].

The following metrics are available using the Datadog-AWS Billing integration:

| Name                            | Units   | Description                                                                                                                                        |
| -----                           | ------  | ------                                                                                                                                             |
| `aws.billing.actual_spend`      | dollars | The actual spending costs for your budget period                                                                                                   |
| `aws.billing.budget_limit`      | dollars | The spending limit for your budget period                                                                                                          |
| `aws.billing.estimated_charges` | dollars | The estimated charges for your AWS usage. This can either be estimated charges for one service or a roll-up of estimated charges for all services. |
| `aws.billing.forecasted_spend`  | dollars | The forecasted spending costs for your budget period                                                                                               |

For more robust cost monitoring across a number of cloud services in addition to AWS, Datadog supports 3rd-party integration with [CloudHealth][3]. [This blog post][4] has a more in-depth look at how [CloudHealth][3] integrates with Datadog to enable visibility of cost across your hosted infrastructure.

[1]: /integrations/amazon_web_services/
[2]: http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[3]: /integrations/cloudhealth/
[4]: https://www.datadoghq.com/blog/monitor-cloudhealth-assets-datadog
