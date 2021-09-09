---
categories:
  - cloud
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: 関数実行時間の最小、最大、平均を追跡。
doc_link: https://docs.datadoghq.com/integrations/google_cloud_functions/
draft: false
git_integration_title: google_cloud_functions
has_logo: true
integration_id: google-cloud-functions
integration_title: Google Cloud Functions
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_functions
public_title: Datadog-Google Cloud Functions インテグレーション
short_description: 関数実行時間の最小、最大、平均を追跡。
version: '1.0'
---
## 概要

Google Cloud Functions は、単一目的の小規模な関数を作成できる、軽量、イベントベース、かつ非同期のコンピューティングソリューションです。

Google Functions からメトリクスを取得して、以下のことができます。

- 関数のパフォーマンスを視覚化。
- 関数のパフォーマンスをアプリケーションと関連付け。

## セットアップ

### メトリクスの収集

#### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### ログの収集

Google Cloud Function のログは Stackdriver により収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。[HTTP プッシュフォワーダーを使用した Cloud Pub/Sub][2] をまだセットアップしていない場合は、これをセットアップしてください。

セットアップが完了したら、Google Cloud Function のログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver ページ][3]に移動し、Google Cloud Function のログを絞り込みます。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。

    {{< img src="integrations/google_cloud_pubsub/creating_sink.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_functions" >}}


### イベント

Google Cloud Functions インテグレーションには、イベントは含まれません。

### サービスのチェック

Google Cloud Functions インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_functions/google_cloud_functions_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/