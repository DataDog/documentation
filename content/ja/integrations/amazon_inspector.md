---
app_id: amazon_inspector
categories:
- aws
- クラウド
- コンプライアンス
- ログの収集
custom_kind: インテグレーション
description: Amazon Inspector のキーメトリクスを追跡
title: Amazon Inspector
---
## 概要

Amazon Inspector は、AWS リソースのセキュリティとコンプライアンスの強化を支援するセキュリティ脆弱性評価サービスです。

このインテグレーションを有効にすると、Datadog にすべての Inspector メトリクスを表示できます。

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration](https://docs.datadoghq.com/integrations/amazon_web_services/) first.

### メトリクスの収集

1. In the [AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services), ensure that `Inspector` is enabled under the `Metric Collection` tab.
1. Install the [Datadog - Amazon Inspector integration](https://app.datadoghq.com/integrations/amazon-inspector).

### ログ収集

#### ログの有効化

S3 バケットまたは CloudWatch のいずれかにログを送信するように Amazon Inspector を構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_inspector` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. If you haven't already, set up the [Datadog Forwarder Lambda function](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Lambda 関数がインストールされたら、AWS コンソールから、Amazon Inspector ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

   - [Add a manual trigger on the S3 bucket](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets)
   - [Add a manual trigger on the CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-cloudwatch-log-group)

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.inspector.total_assessment_run_findings** <br>(count) | The number of findings for this target.|
| **aws.inspector.total_assessment_runs** <br>(count) | The number of assessment runs for this target.|
| **aws.inspector.total_healthy_agents** <br>(count) | The number of agents that match this target that are healthy.|
| **aws.inspector.total_matching_agents** <br>(count) | The number of agents that match this target.|

### イベント

Amazon Inspector インテグレーションには、イベントは含まれません。

### サービスチェック

Amazon Inspector インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。