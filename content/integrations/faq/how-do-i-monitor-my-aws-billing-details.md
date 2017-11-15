---
title: How do I monitor my AWS billing details?
kind: faq
customnav: integrationsnav
---

Billing metrics can be collected from AWS by using the Datadog-AWS Billing integration.

Further information on this can be found within the app here: 
https://app.datadoghq.com/account/settings#integrations/amazon_billing 

To begin collecting billing metrics, it is necessary to select "Billing" on the [AWS configuration tile](/integrations/amazon_web_services) and include the permission 'budgets:ViewBudget' in your Datadog AWS policy.

You must also enable billing metrics within the [AWS Console](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics).

The following metrics are currently available using the Datadog-AWS Billing integration:

|||
|Name|     Units|   Description|
|aws.billing.actual_spend|    dollars   |  The actual spending costs for your budget period|
|aws.billing.budget_limit |   dollars |The spending limit for your budget period|
|aws.billing.estimated_charges |  dollars |The estimated charges for your AWS usage. This can either be estimated charges for one service or a roll-up of estimated charges for all services.|
|aws.billing.forecasted_spend |   dollars |The forecasted spending costs for your budget period |
 
For more robust cost monitoring across a number of cloud services in addition to AWS, Datadog supports 3rd-party integration with [CloudHealth](https://www.cloudhealthtech.com/partners/technology-partners/datadog). [This blog post](https://www.datadoghq.com/blog/monitor-cloudhealth-assets-datadog/) has a more in-depth look at how [CloudHealth](https://www.cloudhealthtech.com/partners/technology-partners/datadog) integrates with Datadog to enable visibility of cost across your hosted infrastructure. 

 

 