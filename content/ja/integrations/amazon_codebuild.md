---
aliases:
  - /ja/integrations/awscodebuild/
categories:
  - cloud
  - aws
  - ログの収集
ddtype: crawler
dependencies: []
description: 行われているデプロイを表示し、その所要時間を追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_codebuild/
draft: false
git_integration_title: amazon_codebuild
has_logo: true
integration_id: amazon-codebuild
integration_title: AWS CodeBuild
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_codebuild
public_title: Datadog-AWS CodeBuild インテグレーション
short_description: 行われているデプロイを表示し、その所要時間を追跡
version: '1.0'
---
## 概要

AWS CodeBuild は、ソースコードのコンパイル、テストの実行、デプロイ可能なソフトウェアパッケージの生成を行うビルドサービスです。

Datadog AWS CodeBuild インテグレーションをインストールすると、以下のことができます。

- プロジェクトごとにビルドを追跡できます。
- ビルドに関するメトリクスを収集できます。
- 他の Datadog メトリクスとビルドを関連付けることができます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`CloudBuild` をオンにします。

2. [Datadog - AWS Codebuild インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

S3 バケットまたは CloudWatch のいずれかにログを送信するよう AWS CodeBuild を構成します。

**注**: S3 バケットにログを送信する場合は、_Target prefix_ が `amazon_codebuild` に設定されていることを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. Lambda 関数がインストールされたら、AWS コンソールで、AWS CodeBuild ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_codebuild" >}}


### イベント

AWS CodeBuild インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS CodeBuild インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-codebuild
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_codebuild/amazon_codebuild_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/