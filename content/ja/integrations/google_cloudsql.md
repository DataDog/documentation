---
categories:
  - cloud
  - data store
  - google cloud
  - log collection
ddtype: クローラー
dependencies: []
description: パフォーマンス、健全性、レプリケーションに関するデータベースメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloudsql/'
git_integration_title: google_cloudsql
has_logo: true
integration_title: Google CloudSQL
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloudsql
public_title: Datadog-Google CloudSQL インテグレーション
short_description: パフォーマンス、健全性、レプリケーションに関するデータベースメトリクスを追跡
version: '1.0'
---
## 概要
Google Cloud SQL は、クラウド内の MySQL データベースを簡単にセットアップ、保守、運用、管理できるようにするフルマネージド型のデータベースサービスです。

Google CloudSQL からメトリクスを取得して、以下のことができます。

* CloudSQL データベースのパフォーマンスを視覚化できます。
* CloudSQL データベースのパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ
### インストール
#### メトリクスの収集
[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

#### ログの収集
Google Cloud SQL のログは、Stackdriver を使用して収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。Cloud Pub/Sub をまだセットアップしていない場合は、[HTTP プッシュフォワーダーを使用してセットアップ][4]してください。

これが完了したら、Google Cloud SQL のログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver のページ][5]に移動し、Google Cloud SQL のログを絞り込みます。
2. **エクスポートを作成**をクリックし、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクトに置くこともできます。

{{< img src="integrations/google_cloudsql/export_cloudsql_database.png" alt="Export Google Cloud Sql Logs to Pub Sub" responsive="true">}}

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
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloudsql/google_cloudsql_metadata.csv
[3]: https://docs.datadoghq.com/ja/help
[4]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[5]: https://console.cloud.google.com/logs/viewer


{{< get-dependencies >}}