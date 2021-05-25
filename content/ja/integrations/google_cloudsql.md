---
categories:
  - cloud
  - data store
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: パフォーマンス、健全性、レプリケーションに関するデータベースメトリクスを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/google_cloudsql/'
draft: false
git_integration_title: google_cloudsql
has_logo: true
integration_title: Google CloudSQL
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloudsql
public_title: Datadog-Google CloudSQL インテグレーション
short_description: パフォーマンス、健全性、レプリケーションに関するデータベースメトリクスを追跡。
version: '1.0'
---
## 概要

Google Cloud SQL は、クラウド内の MySQL データベースを簡単にセットアップ、保守、運用、管理できるようにするフルマネージド型のデータベースサービスです。

Google CloudSQL からメトリクスを取得して、以下のことができます。

- CloudSQL データベースのパフォーマンスを視覚化。
- CloudSQL データベースのパフォーマンスをアプリケーションと関連付け。

## セットアップ

### インストール

#### メトリクスの収集

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

#### コンフィギュレーション

カスタム CloudSQL ラベルをタグとして収集するには、Cloud Asset Inventory のアクセス権を有効にします。

#### ログの収集

Google Cloud SQL のログは Stackdriver 経由で収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。[HTTP プッシュフォワーダーを使用した Cloud Pub/Sub][2] をまだセットアップしていない場合は、これをセットアップしてください。

セットアップが完了したら、Google Cloud SQL のログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver ページ][3]に移動し、Google Cloud SQL のログを絞り込みます。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloudsql" >}}


### イベント

Google Cloud SQL インテグレーションには、イベントは含まれません。

### サービスのチェック

**gcp.cloudsql.database.state**
Cloud SQL インスタンスの現在のサービス状態。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloudsql/google_cloudsql_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/