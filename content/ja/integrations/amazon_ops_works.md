---
aliases:
- /ja/integrations/awsopsworks/
categories:
- aws
- cloud
- configuration & deployment
- log collection
- provisioning
dependencies: []
description: AWS OpsWorks のリソース使用状況を追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_ops_works/
draft: false
git_integration_title: amazon_ops_works
has_logo: true
integration_id: ''
integration_title: AWS OpsWorks
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_ops_works
public_title: Datadog-AWS OpsWorks インテグレーション
short_description: AWS OpsWorks のリソース使用状況を追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AWS OpsWorks は、あらゆる形式と規模のアプリケーションを簡単にデプロイして運用できるようにするアプリケーション管理サービスです。

このインテグレーションを有効にすると、Datadog にすべての OpsWorks メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `OpsWorks` が有効になっていることを確認します。
2. [Datadog - AWS OpsWork インテグレーション][3]をインストールします。

### 収集データ

#### ログの有効化

AWS OpsWorks から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_ops_work` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、AWS OpsWorks ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_ops_works" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### ヘルプ

AWS OpsWorks インテグレーションには、イベントは含まれません。

### ヘルプ

AWS OpsWorks インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-ops-works
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ops_works/amazon_ops_works_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/