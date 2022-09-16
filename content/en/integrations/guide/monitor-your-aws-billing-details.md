---
title: Monitor your AWS billing details
kind: guide
aliases:
  - /integrations/faq/how-do-i-monitor-my-aws-billing-details

---

Billing metrics can be collected from AWS with the Datadog-AWS Billing integration. See the [Amazon Billing][1] integration in Datadog for more information. 

To begin collecting billing metrics:

1. Ensure that `Billing` is enabled under the `Metric Collection` tab on the [AWS configuration page][2], and include the permission `budgets:ViewBudget` in your Datadog AWS policy.

2. [Enable billing][3] metrics within the AWS console.

The following metrics are available using the Datadog-AWS Billing integration:

| Name                            | Units   | Description                                                                                                                                        |
| -----                           | ------  | ------                                                                                                                                             |
| `aws.billing.actual_spend`      | dollars | The actual spending costs for your budget period                                                                                                   |
| `aws.billing.budget_limit`      | dollars | The spending limit for your budget period                                                                                                          |
| `aws.billing.estimated_charges` | dollars | The estimated charges for your AWS usage. This can either be estimated charges for one service or a roll-up of estimated charges for all services. |
| `aws.billing.forecasted_spend`  | dollars | The forecasted spending costs for your budget period                                                                                               |

For more robust cost monitoring across a number of cloud services in addition to AWS, Datadog supports 3rd-party integration with [CloudHealth][4]. [This blog post][5] has a more in-depth look at how [CloudHealth][4] integrates with Datadog to enable visibility of cost across your hosted infrastructure.

[1]: https://app.datadoghq.com/integrations/amazon-billing
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[4]: /integrations/cloudhealth/
[5]: https://www.datadoghq.com/blog/monitor-cloudhealth-assets-datadog
