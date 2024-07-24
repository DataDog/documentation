---
categories:
- クラウド
- google cloud
- data store
- ログの収集
dependencies: []
description: クエリ数、実行回数、アップロードされたバイト数および行数などを追跡
doc_link: https://docs.datadoghq.com/integrations/google_cloud_alloydb/
draft: false
git_integration_title: google_cloud_alloydb
has_logo: true
integration_id: google-cloud-alloydb
integration_title: Google AlloyDB
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_alloydb
public_title: Datadog-Google AlloyDB インテグレーション
short_description: クエリ数、実行回数、アップロードされたバイト数および行数などを追跡
version: '1.0'
---

## 概要

AlloyDB は、要求の厳しいトランザクションワークロードに対応した、PostgreSQL 互換のフルマネージド型データベースです。
オープンソースの PostgreSQL と 100% の互換性を保ちながら、エンタープライズクラスの性能と可用性を提供します。

Google AlloyDB からメトリクスを取得して、以下のことができます。

- AlloyDB クラスターのパフォーマンスを視覚化する。
- AlloyDB インスタンスのパフォーマンスとデータベースを関連付ける。

## セットアップ

### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

### ログの収集

Google AlloyDB のログは Google Cloud Logging により収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。[HTTP プッシュフォワーダーを使用した Cloud Pub/Sub][2] をまだセットアップしていない場合は、これをセットアップしてください。

これが完了したら、Google AlloyDB のログを Google Cloud Logging から Pub/Sub へエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google AlloyDB のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_alloydb" >}}


### イベント

Google AlloyDB インテグレーションには、イベントは含まれません。

### サービスのチェック

Google AlloyDB インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_alloydb/google_cloud_alloydb_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/