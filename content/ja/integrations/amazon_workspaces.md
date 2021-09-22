---
aliases:
  - /ja/integrations/awsworkspaces/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: 失敗した接続、セッションのレイテンシー、正常に動作していないワークスペースなどを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_workspaces/
draft: false
git_integration_title: amazon_workspaces
has_logo: true
integration_id: amazon-workspaces
integration_title: AWS Workspaces
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_workspaces
public_title: Datadog-AWS Workspaces インテグレーション
short_description: 失敗した接続、セッションのレイテンシー、正常に動作していないワークスペースなどを追跡。
version: '1.0'
---
## 概要

Amazon WorkSpaces は、AWS クラウド上で実行されるフルマネージド型のセキュアなデスクトップコンピューティングサービスです。

このインテグレーションを有効にすると、Datadog にすべての Workspaces メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`WorkSpaces` をオンにします。
2. [Datadog - Amazon WorkSpaces インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon WorkSpaces から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_workspace` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. lambda 関数がインストールされたら、AWS コンソールから、Amazon WorkSpaces ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_workspaces" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS WorkSpaces インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS WorkSpaces インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-workspaces
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_workspaces/amazon_workspaces_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/