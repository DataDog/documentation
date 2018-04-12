---
description: Monitor actual and estimated spend on your AWS account.
doclevel: basic
git_integration_title: amazon_billing
integration_title: AWS Billing
kind: integration
newhlevel: true
placeholder: true
title: Datadog-AWS Billing Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

## Overview

Amazon Billing allows you to track your AWS infrastructure billing forecasts and costs.

Enable this integration to see in Datadog all your Billing metrics.

## Setup
### Installation

In order to see AWS Budget metrics, the requirement for this integration is the permission `budgets:ViewBudget`.

You must also enable billing metrics within the [AWS Console](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics).

<div class="alert alert-info">
AWS Budget metrics can only be collected from the AWS master account.
</div> 

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

## Troubleshooting

### No metrics are reporting from my AWS billing integration
Here is a check list that you can apply to troubleshoot your integration:

1. Ensure your IAM policy has `budgets:ViewBudget`
2. Ensure billing metrics are enabled in your payer account
3. Note that AWS Billing metrics are collected every 4 or 8 hours by Datadog.

### `aws.billing.actual_spend` `aws.billing.forecasted_spend` `aws.billing.budget_limit` don't appear on Datadog 

[Create an AWS buget](https://console.aws.amazon.com/billing/home?#/createbudget) in order to start seeing those metrics on your Datadog application. 
Be aware that AWS Billing metrics are collected every 4 or 8 hours by Datadog.
