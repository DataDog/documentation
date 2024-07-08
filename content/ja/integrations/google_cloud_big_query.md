---
categories:
  - cloud
  - google cloud
  - data store
  - log collection
ddtype: crawler
dependencies: []
description: クエリ数、実行回数、アップロードバイト数、行数などを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_big_query/'
draft: false
git_integration_title: google_cloud_big_query
has_logo: true
integration_id: google-cloud-bigquery
integration_title: Google BigQuery
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_big_query
public_title: Datadog-Google BigQuery インテグレーション
short_description: クエリ数、実行回数、アップロードバイト数、行数などを追跡。
version: '1.0'
---
## 概要

BigQuery は、Google が提供するフルマネージド型の企業向け分析用データウェアハウスです。ペタバイト規模の処理を低コストで行うことができます。

Google BigQuery からメトリクスを取得して、以下のことができます。

- BigQuery クエリのパフォーマンスを視覚化。
- BigQuery クエリのパフォーマンスをアプリケーションと関連付け。

## セットアップ

### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

### ログの収集

Google BigQuery のログは Stackdriver により収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。[HTTP プッシュフォワーダーを使用した Cloud Pub/Sub][2] をまだセットアップしていない場合は、これをセットアップしてください。

セットアップが完了したら、Google BigQuery のログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver ページ][3]に移動し、Google BigQuery のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_big_query" >}}


### イベント

Google BigQuery インテグレーションには、イベントは含まれません。

### サービスのチェック

Google BigQuery インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_big_query/google_cloud_big_query_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/