---
categories:
  - cloud
  - processing
  - messaging
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: Google Cloud PubSub の主要メトリクスを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_pubsub/'
draft: false
git_integration_title: google_cloud_pubsub
has_logo: true
integration_id: google-cloud-pubsub
integration_title: Google Pub/Sub
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_pubsub
public_title: Datadog-Google Pub/Sub インテグレーション
short_description: Google Cloud PubSub の主要メトリクスを追跡。
version: '1.0'
---
## 概要

Google Cloud Pub/Sub は、エンタープライズメッセージ指向ミドルウェアの拡張性、柔軟性、信頼性をクラウドにもたらします。

Google Pub/Sub からメトリクスを取得して、以下のことができます。

- Pub/Sub のトピックおよびサブスクリプションのパフォーマンスを視覚化。
- Pub/Sub のトピックおよびサブスクリプションのパフォーマンスをアプリケーションと関連付け。

## セットアップ

### メトリクスの収集

#### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

#### コンフィギュレーション

カスタム Pub/Sub ラベルをタグとして収集するには、Cloud Asset Inventory のアクセス権を有効にします。

### ログの収集

Google Cloud Pub/Sub のログは Stackdriver により収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。[HTTP プッシュフォワーダーを使用した Cloud Pub/Sub][2] をまだセットアップしていない場合は、これをセットアップしてください。

セットアップが完了したら、Google Cloud Pub/Sub のログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver ページ][3]に移動し、Google Cloud Pub/Sub のログを絞り込みます。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_pubsub" >}}


### イベント

Google Cloud Pub/Sub インテグレーションには、イベントは含まれません。

### サービスのチェック

Google Cloud Pub/Sub インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_pubsub/google_cloud_pubsub_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/