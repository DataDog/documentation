---
aliases:
- /integrations/awsbilling/
categories:
- cloud
- Cost Management
- aws
ddtype: crawler
description: Monitor actual and estimated spend on your AWS account.
doc_link: https://docs.datadoghq.com/integrations/amazon_billing/
git_integration_title: amazon_billing
has_logo: true
integration_title: AWS Billing
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_billing
public_title: Datadog-AWS Billing Integration
short_description: Monitor actual and estimated spend on your AWS account.
version: '1.0'
---

## Overview

Amazon Billing allows you to track your AWS infrastructure billing forecasts and costs.

Enable this integration to see in Datadog all your Billing metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Installation

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `Billing` is checked under metric collection.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon Billing metrics: 

    * `budgets:ViewBudget`: Used to view budget metrics

    For more information on Budget policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_budgets.html).

3. Enable Billing metrics within the [AWS Console](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics).

4. Install the [Datadog - AWS Billing integration](https://app.datadoghq.com/account/settings#integrations/amazon_billing).

**AWS Budget metrics can only be collected from the AWS master account.**

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_billing" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Billing integrationdoes not include any event at this time.

### Service Checks
The AWS Billing integration does not include any service check at this time.

## Troubleshooting

### No metrics are reporting from my AWS billing integration
Here is a check list that you can apply to troubleshoot your integration:

1. Ensure your IAM policy has `budgets:ViewBudget`
2. Ensure billing metrics are enabled in your payer account
3. Note that AWS Billing metrics are collected every 4 or 8 hours by Datadog.

### `aws.billing.actual_spend` `aws.billing.forecasted_spend` `aws.billing.budget_limit` don't appear on Datadog 

[Create an AWS buget](https://console.aws.amazon.com/billing/home?#/createbudget) in order to start seeing those metrics on your Datadog application. 
Be aware that AWS Billing metrics are collected every 4 or 8 hours by Datadog.

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
