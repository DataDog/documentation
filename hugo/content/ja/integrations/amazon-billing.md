---
aliases:
- /ja/integrations/amazon_billing
app_id: amazon-billing
categories:
- aws
- モニター
- cloud
- コスト管理
custom_kind: integration
description: AWS Billing を使うと、AWS の請求予測とコストを追跡できます。
media: []
title: AWS Billing and Cost Management
---
## 概要

AWS Billing and Cost Management は、推定請求額と予算メトリクスを表示します。

このインテグレーションを有効にすると、AWS Billing and Cost Management メトリクスを Datadog で確認することができます。

**注**: このインテグレーションを完全に有効にするには、`budgets:ViewBudget` 権限が必要です。請求メトリクスは AWS console で有効にしておく必要があります。AWS の設定方法について詳しくは、[Amazon Web Services インテグレーションドキュメント](https://docs.datadoghq.com/integrations/amazon_web_services/) を参照してください。

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration](https://docs.datadoghq.com/integrations/amazon_web_services/) first.

### メトリクスの収集

1. [AWS インテグレーション ページ](https://app.datadoghq.com/integrations/amazon-web-services) の `Metric Collection` タブで、`Billing` が有効になっていることを確認します。
1. [Datadog - AWS Billing インテグレーション](https://app.datadoghq.com/integrations/amazon-billing) をインストールします。

### ログ収集

#### ログの有効化

S3 バケットまたは CloudWatch のいずれかにログを送信するよう AWS Billing を構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_billing` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. If you haven’t already, set up the [Datadog Forwarder Lambda function](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Lambda 関数がインストールされたら、AWS コンソールで、AWS Billing ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

   - [Add a manual trigger on the S3 bucket](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Add a manual trigger on the CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## CloudWatch 使用状況の監視

AWS アクセス許可を設定して `budgets:ViewBudget` アクセス許可を追加すると、このインテグレーションを使用して CloudWatch の請求情報を監視できます。

AWS の請求メトリクスは、約 4 時間ごとに取得できます。Datadog がこのメトリクスを収集するまで 4 時間かかる場合があります。

メトリクスが利用可能になったら、`aws.billing.estimated_charges` と `aws.billing.forecasted_charges` を調べます。これらのメトリクスを使用して、コンテキストを `service:amazoncloudwatch` まで絞り込むことで、CloudWatch の使用状況を追跡できます。また、`max:account_id` を使用して、支払額を AWS アカウントごとに分けることができます。

メトリクス `aws.billing.estimated_charges` は、当月のその時点までの CloudWatch 請求額と AWS が見なす額を示します。この値は、毎月初に 0 にリセットされます。メトリクス `aws.billing.forecasted_charges` は、当月の使用状況に基づいた月末の CloudWatch の推定請求額です。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.billing.estimated_charges** <br>(gauge) | AWS 利用料の推定請求額。単一サービスの推定請求額にも、全サービスの合計推定請求額にもなり得ます。<br>_単位は dollar_ |
| **aws.billing.actual_spend** <br>(gauge) | 予算期間中の実際の支出額<br>_単位は dollar_ |
| **aws.billing.budget_limit** <br>(gauge) | 予算期間中の支出上限<br>_単位は dollar_ |
| **aws.billing.forecasted_spend** <br>(gauge) | 予算期間中の予測支出額<br>_単位は dollar_ |

### イベント

AWS Billing and Cost Management インテグレーションには、イベントは含まれません。

### サービス チェック

AWS Billing and Cost Management インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。