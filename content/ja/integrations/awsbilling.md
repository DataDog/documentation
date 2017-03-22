---
last_modified: 2017/01/25
translation_status: progress
language: ja
title: Datadog-AWS Billing インテグレーション
integration_title: AWS Billing
kind: integration
doclevel: basic
newhlevel: true
git_integration_title: amazon_billing
---

<!-- # Overview

Amazon Billing allows you to track your AWS infrastructure billing forecasts and costs.

Enable this integration to see in Datadog all your Billing metrics.
 -->

# Overview

Amazon Billing allows you to track your AWS infrastructure billing forecasts and costs.

Enable this integration to see in Datadog all your Billing metrics.


<!-- # Installation

In order to see AWS Budget metrics, the requirement for this integration is the permission `budgets:ViewBudget`.

You must also enable billing metrics within the [AWS Console](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics).

Note: AWS Budget metrics can only be collected from the AWS master account. -->

# Installation

In order to see AWS Budget metrics, the requirement for this integration is the permission `budgets:ViewBudget`.

You must also enable billing metrics within the [AWS Console](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics).

Note: AWS Budget metrics can only be collected from the AWS master account.


<!-- # Metrics

<%= get_metrics_from_git() %> -->

# Metrics

<%= get_metrics_from_git() %>