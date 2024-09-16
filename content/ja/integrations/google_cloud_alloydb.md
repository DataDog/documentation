---
categories:
- クラウド
- google cloud
- data stores
- ログの収集
custom_kind: integration
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
manifest_version: '1.0'
name: google_cloud_alloydb
public_title: Datadog-Google AlloyDB インテグレーション
short_description: クエリ数、実行回数、アップロードされたバイト数および行数などを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AlloyDB は、要求の厳しいトランザクションワークロードに対応した、PostgreSQL 互換のフルマネージド型データベースです。
オープンソースの PostgreSQL と 100% の互換性を保ちながら、エンタープライズクラスの性能と可用性を提供します。

Google AlloyDB からメトリクスを取得して、以下のことができます。

- AlloyDB クラスターのパフォーマンスを視覚化する。
- AlloyDB インスタンスのパフォーマンスとデータベースを関連付ける。

## セットアップ

### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

### 収集データ

Google AlloyDB logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google AlloyDB logs from Google Cloud Logging to the Pub/Sub topic:

1. [Google Cloud Logging のページ][3]に移動し、Google AlloyDB のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_alloydb" >}}


### イベント

Google AlloyDB インテグレーションには、イベントは含まれません。

### サービスチェック

Google AlloyDB インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_alloydb/google_cloud_alloydb_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/
