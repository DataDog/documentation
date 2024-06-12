---
aliases:
- /ja/integrations/awsworkspaces/
categories:
- cloud
- aws
- log collection
dependencies: []
description: 失敗した接続、セッションのレイテンシー、正常に動作していないワークスペースなどを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_workspaces/
draft: false
git_integration_title: amazon_workspaces
has_logo: true
integration_id: ''
integration_title: Amazon WorkSpaces
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_workspaces
public_title: Datadog-Amazon WorkSpaces インテグレーション
short_description: 失敗した接続、セッションのレイテンシー、正常に動作していないワークスペースなどを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon WorkSpaces は、AWS クラウド上で実行されるフルマネージド型のセキュアなデスクトップコンピューティングサービスです。

このインテグレーションを有効にすると、Datadog にすべての Amazon WorkSpaces メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `WorkSpaces` が有効になっていることを確認します。
2. [Datadog - Amazon WorkSpaces インテグレーション][3]をインストールします。

### 収集データ

#### ログの有効化

Amazon WorkSpaces から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_workspace` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon WorkSpaces ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_workspaces" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### ヘルプ

Amazon WorkSpaces インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon WorkSpaces インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-workspaces
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_workspaces/amazon_workspaces_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/