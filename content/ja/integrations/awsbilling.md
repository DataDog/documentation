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

# 概要

Amazon Billing では、AWS 上のインフラストラクチャの請求金額の予測や現在のコストなどを継続的に監視することができます。

このインテグレーションを有効にすると、全ての以下の課金関連メトリクスが Datadog に表示されるようになります。


<!-- # Installation

In order to see AWS Budget metrics, the requirement for this integration is the permission `budgets:ViewBudget`.

You must also enable billing metrics within the [AWS Console](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics).

Note: AWS Budget metrics can only be collected from the AWS master account. -->

# インストール

AWS 予算メトリクスを表示するには、`budgets:ViewBudget` の IAM 権限を、このインテグレーションに
許可する必要があります。更に、[AWS コンソール][1]上で、請求関連のメトリクスを有効にする必要があります。

注: AWS 予算メトリクスは、AWS マスター アカウントからのみの収集になります。

[1]: http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics


<!-- # Metrics

<%= get_metrics_from_git() %> -->

# メトリクス

<%= get_metrics_from_git() %>