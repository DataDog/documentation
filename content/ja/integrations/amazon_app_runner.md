---
app_id: amazon-app-runner
app_uuid: ff109e6f-e212-4655-bebf-c8ee54d4f7b2
assets:
  dashboards:
    aws_app_runner: assets/dashboards/aws_app_runner.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.apprunner.active_instances
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.apprunner.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 322
    source_type_name: Amazon App Runner
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- クラウド
- 構成とデプロイ
- ログの収集
- プロビジョニング
custom_kind: インテグレーション
dependencies: []
description: 主要な AWS App Runner メトリクスを追跡します。
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_app_runner/
draft: false
git_integration_title: amazon_app_runner
has_logo: true
integration_id: amazon-app-runner
integration_title: AWS App Runner
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_app_runner
public_title: AWS App Runner
short_description: Quick, easy, and cost-effective deployment from source code or
  container images.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Log Collection
  - Category::Provisioning
  - Offering::Integration
  configuration: README.md#Setup
  description: Quick, easy, and cost-effective deployment from source code or container
    images.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS App Runner
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

AWS App Runner を使用すると、ソースコードまたはコンテナイメージから AWS にアプリケーションをデプロイできます。

このインテグレーションを有効にすると、Datadog にすべての App Runner メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `AppRunner` が有効になっていることを確認します。
2. [Datadog - AWS App Runner インテグレーション][3]をインストールします。

### ログ収集
AWS App Runner によって管理されるアプリケーションから Datadog と統合できるログには 2 種類あります。これらのログは、2 つの異なるロググループで CloudWatch に送信されます。1 つ目は、アプリケーションのビルドやデプロイなど、App Runner サービスのすべてのライフサイクルアクティビティログをキャプチャするサービスロググループです。2 つ目は、実行中のアプリケーションのコードからのログ出力を含むアプリケーションロググループです。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数をインストールしたら、AWS コンソールで App Runner サービスまたはアプリケーション CloudWatch ロググループにトリガーを手動で追加します。
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="CloudWatch Logs グループ" popup="true" style="width:70%;">}}
   対応する CloudWatch ロググループを選択し、フィルター名を追加して (空にすることも可能)、トリガーを追加します。
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="Cloudwatch トリガー" popup="true" style="width:70%;">}}
3. 手順 2 を繰り返して、追加のロググループを追加します。
4. 完了したら、[Datadog Log セクション][5]に移動し、ログを確認します。

### イベント収集
AWS App Runner は、サービスとオペレーションのステータス変更イベントの両方を EventBridge に送信します。これを Datadog に転送して [Event Stream][6] で表示できます。これらのイベントを Datadog に送信するには、次の手順を実行します。

1. [Datadog イベントの EventBridge API 宛先][7]を作成します。
2. AWS App Runner のイベントに対応する EventBridge ルールを作成します ([EventBridge で App Runner のイベントを処理する][8]を参照)。ターゲットとして API Destination を選択します。
3. Datadog イベントストリームで新しいステータス変更イベントの表示を開始します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon-app-runner" >}}


### イベント

AWS App Runner インテグレーションは、EventBridge からのサービスとオペレーションのステータス変更イベントの両方をサポートします。

### サービスチェック

AWS App Runner  インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-app-runner
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/event/stream
[7]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destination-partners.html#eb-api-destination-datadog
[8]: https://docs.aws.amazon.com/apprunner/latest/dg/monitor-ev.html
[9]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_app_runner/assets/metrics/metric-spec.yaml
[10]: https://docs.datadoghq.com/ja/help/