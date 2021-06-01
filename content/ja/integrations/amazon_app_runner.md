---
categories:
  - cloud
  - AWS
  - ログの収集
ddtype: crawler
dependencies: []
description: 主要な AWS App Runner メトリクスを追跡します。
doc_link: 'https://docs.datadoghq.com/integrations/amazon_app_runner/'
draft: false
git_integration_title: amazon_app_runner
has_logo: true
integration_id: amazon-app-runner
integration_title: AWS App Runner
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_app_runner
public_title: Datadog-AWS App Runner Integration
short_description: 主要な AWS App Runner メトリクスを追跡します。
version: '1.0'
---
## 概要

AWS App Runner を使用すると、ソースコードまたはコンテナイメージから AWS にアプリケーションをデプロイできます。

このインテグレーションを有効にすると、Datadog にすべての App Runner メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`AppRunner` をオンにします。
2. [Datadog - AWS App Runner インテグレーション][3]をインストールします。

### ログの収集
AWS App Runner によって管理されるアプリケーションから Datadog と統合できるログには 2 種類あります。これらのログは、2 つの異なるロググループで CloudWatch に送信されます。1 つ目は、アプリケーションのビルドやデプロイなど、App Runner サービスのすべてのライフサイクルアクティビティログをキャプチャするサービスロググループです。2 つ目は、実行中のアプリケーションのコードからのログ出力を含むアプリケーションロググループです。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. Lambda 関数をインストールしたら、AWS コンソールで App Runner サービスまたはアプリケーション CloudWatch ロググループにトリガーを手動で追加します。
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="CloudWatch Logs グループ" popup="true" style="width:70%;">}}
   対応する CloudWatch ロググループを選択し、フィルター名を追加して (空にすることも可能)、トリガーを追加します。
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="Cloudwatch トリガー" popup="true" style="width:70%;">}}
3. 手順 2 を繰り返して、追加のロググループを追加します。
4. 完了したら、[Datadog Log セクション][5]に移動し、ログを確認します。

### イベント収集
AWS App Runner は、サービスとオペレーションのステータス変更イベントの両方を EventBridge に送信します。これを Datadog に転送して [Event Stream][6] で表示できます。これらのイベントを Datadog に送信するには、次の手順を実行します。

1. [Datadog イベントの EventBridge API 宛先][7]を作成します。
2. AWS の[ドキュメント][8]に従って、AWS App Runner イベントで動作する EventBridge ルールを作成します。ターゲットとして API 宛先を選択します。
3. Datadog イベントストリームで新しいステータスチャンスイベントの表示を開始します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_app_runner" >}}


### イベント

AWS App Runner インテグレーションは、EventBridge からのサービスとオペレーションのステータス変更イベントの両方をサポートします。

### サービスのチェック

AWS App Runner  インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-app-runner
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/event/stream
[7]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destination-partners.html#eb-api-destination-datadog
[8]: https://docs.aws.amazon.com/apprunner/latest/dg/monitor-ev.html
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_app_runner/amazon_app_runner_metadata.csv
[10]: https://docs.datadoghq.com/ja/help/