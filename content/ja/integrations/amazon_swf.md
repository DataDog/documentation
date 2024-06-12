---
aliases:
- /ja/integrations/awsswf/
categories:
- cloud
- configuration & deployment
- aws
- log collection
dependencies: []
description: Amazon Simple Workflow Service のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_swf/
draft: false
git_integration_title: amazon_swf
has_logo: true
integration_id: ''
integration_title: Amazon Simple Workflow Service
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_swf
public_title: Datadog-Amazon Simple Workflow Service インテグレーション
short_description: Amazon Simple Workflow Service のキーメトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon SWF は、並列ステップまたは順次ステップからなるバックグラウンドジョブを構築、実行、スケーリングする開発者を支援します。

このインテグレーションを有効にすると、Datadog にすべての SWF メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `SWF` が有効になっていることを確認します。
2. [Datadog - Amazon SWF インテグレーション][3]をインストールします。

### 収集データ

#### ログの有効化

Amazon SWF から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_swf` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon SWF ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_swf" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### ヘルプ

Amazon SWF インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon SWF インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-swf
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_swf/amazon_swf_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/