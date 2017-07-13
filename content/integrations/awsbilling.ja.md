---
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

## Installation

In order to see AWS Budget metrics, the requirement for this integration is the permission `budgets:ViewBudget`.

You must also enable billing metrics within the [AWS Console](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics).

Note: AWS Budget metrics can only be collected from the AWS master account.

## Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
