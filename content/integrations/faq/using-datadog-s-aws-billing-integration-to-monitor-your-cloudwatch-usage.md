---
title: Using Datadog's AWS Billing Integration to monitor your CloudWatch usage
kind: faq
---

Once you have the Datadog AWS Integration installed, it's a very short process to set up the AWS Billing sub-integration to monitor your CloudWatch spend.

To allow Datadog to monitor your AWS Billing information you need to configure your AWS account as follows:

1. Add the `budgets:ViewBudget` permission to your AWS policy for the Datadog role
2. Enable billing alerts in the AWS console using the steps in the [AWS documentation][1]

**Important: billing metrics are always delivered to the us-east-1 region, and for linked AWS accounts, always under the main AWS account.**

Once you have done that, install the Billing sub-integration by checking the box from the list in the main tile or clicking "Install" on the [AWS Billing sub-integration tile][2].

AWS billing metrics are available about once every four hours, so you may have to wait that long for Datadog to collect the metrics.

Once the metrics are available, look at aws.billing.estimated_charges and aws.billing.forecasted_charges. You can use these metrics to track your cloudwatch usage by filtering the context down to service:amazoncloudwatch. You should break down the spend to each AWS account using max:account_id.

The metric aws.billing.estimated_charges is what AWS believes to be the CloudWatch bill so far for the current month. This value is reset to 0 at the start of each month. The metric aws.billing.forecasted_charges is what CloudWatch estimates your bill will be at the end of the month based on current usage.

Either of these cloud be useful for making an alert. Let's use aws.billing.estimated_charges and set our alert threshold to the maximum expected bill we expect to have for the month:

After creating this monitor, Datadog will alert you when your CloudWatch spend becomes unexpectedly high. 

You can read more about our [AWS billing integration here][3].

[1]: /integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_billing
[3]: /integrations/faq/how-do-i-monitor-my-aws-billing-details
