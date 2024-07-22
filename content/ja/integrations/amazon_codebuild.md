---
aliases:
- /ja/integrations/awscodebuild/
categories:
- AWS
- クラウド
- 構成 & デプロイ
- ログの収集
dependencies: []
description: 行われているデプロイを表示し、その所要時間を追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_codebuild/
draft: false
git_integration_title: amazon_codebuild
has_logo: true
integration_id: ''
integration_title: AWS CodeBuild
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_codebuild
public_title: Datadog-AWS CodeBuild インテグレーション
short_description: 行われているデプロイを表示し、その所要時間を追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AWS CodeBuild は、ソースコードのコンパイル、テストの実行、デプロイ可能なソフトウェアパッケージの生成を行うビルドサービスです。

Datadog AWS CodeBuild インテグレーションをインストールすると、以下のことができます。

- プロジェクトごとにビルドを追跡できます。
- ビルドに関するメトリクスを収集できます。
- 他の Datadog メトリクスとビルドを関連付けることができます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `CloudBuild` が有効になっていることを確認します。

2. [Datadog - AWS Codebuild インテグレーション][3]をインストールします。

### 収集データ

#### ログの有効化

S3 バケットまたは CloudWatch のいずれかにログを送信するよう AWS CodeBuild を構成します。

**注**: S3 バケットにログを送信する場合は、_Target prefix_ が `amazon_codebuild` に設定されていることを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで、AWS CodeBuild ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_codebuild" >}}


### ヘルプ

AWS CodeBuild インテグレーションには、イベントは含まれません。

### ヘルプ

AWS CodeBuild インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-codebuild
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_codebuild/amazon_codebuild_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/