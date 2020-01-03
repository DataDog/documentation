---
categories:
  - cloud
  - processing
  - messaging
  - google cloud
  - log collection
ddtype: クローラー
dependencies: []
description: Google Cloud Pub/Sub のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_pubsub/'
git_integration_title: google_cloud_pubsub
has_logo: true
integration_title: Google Pub/Sub
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_pubsub
public_title: Datadog-Google Pub/Sub インテグレーション
short_description: Google Cloud Pub/Sub のキーメトリクスを追跡
version: '1.0'
---
## 概要
Google Cloud Pub/Sub は、エンタープライズメッセージ指向ミドルウェアの拡張性、柔軟性、信頼性をクラウドにもたらします。

Google Pub/Sub からメトリクスを取得して、以下のことができます。

* Pub/Sub のトピックとサブスクリプションのパフォーマンスを視覚化できます。
* Pub/Sub のトピックとサブスクリプションのパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ
### メトリクスの収集
#### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### ログの収集

Google Cloud Pub/Sub のログは、Stackdriver を使用して収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。Cloud Pub/Sub をまだセットアップしていない場合は、[HTTP プッシュフォワーダーを使用してセットアップ][4]してください。

これが完了したら、Google Cloud Pub/Sub のログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver のページ][5]に移動し、Google Cloud Pub/Sub のログを絞り込みます。
2. **エクスポートを作成**をクリックし、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクトに置くこともできます。

{{< img src="integrations/google_cloud_pubsub/export_pubsub_subscription.png" alt="Export Google Cloud Pub/Sub Logs to Pub Sub" >}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_pubsub" >}}


### イベント
Google Cloud Pub/Sub インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Pub/Sub インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_pubsub/google_cloud_pubsub_metadata.csv
[3]: https://docs.datadoghq.com/ja/help
[4]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[5]: https://console.cloud.google.com/logs/viewer


{{< get-dependencies >}}