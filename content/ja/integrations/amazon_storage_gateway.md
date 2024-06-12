---
aliases:
- /ja/integrations/awsstoragegateway/
categories:
- cloud
- data stores
- aws
- log collection
dependencies: []
description: AWS Storage Gateway のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_storage_gateway/
draft: false
git_integration_title: amazon_storage_gateway
has_logo: true
integration_id: ''
integration_title: AWS Storage Gateway
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_storage_gateway
public_title: Datadog-AWS Storage Gateway インテグレーション
short_description: AWS Storage Gateway のキーメトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AWS Storage Gateway は、オーガニゼーションの IT 環境と AWS のストレージインフラストラクチャーとの間にシームレスで安全なインテグレーションを提供します。

このインテグレーションを有効にすると、Datadog にすべての Storage Gateway メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `StorageGateway` が有効になっていることを確認します。
2. [Datadog - AWS Storage Gateway インテグレーション][3]をインストールします。

### 収集データ

#### ログの有効化

AWS Storage Gateway から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_storage_gateway` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、AWS Storage Gateway ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_storage_gateway" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### ヘルプ

AWS Storage Gateway インテグレーションには、イベントは含まれません。

### ヘルプ

AWS Storage Gateway インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-storage-gateway
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_storage_gateway/amazon_storage_gateway_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/