---
categories:
- cloud
- data stores
- google cloud
- log collection
dependencies: []
description: パフォーマンス、健全性、レプリケーションに関するデータベースメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/google_cloudsql/
draft: false
git_integration_title: google_cloudsql
has_logo: true
integration_id: google-cloudsql
integration_title: Google Cloud SQL
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloudsql
public_title: Datadog-Google Cloud SQL インテグレーション
short_description: パフォーマンス、健全性、レプリケーションに関するデータベースメトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Cloud SQL は、クラウド内の SQL データベースを簡単にセットアップ、保守、運用、管理できるようにするフルマネージド型のデータベースサービスです。

Google Cloud SQL からメトリクスを取得して、以下のことができます。

- Cloud SQL データベースのパフォーマンスを視覚化。
- Cloud SQL データベースのパフォーマンスをアプリケーションと関連付け。

## 計画と使用

### インフラストラクチャーリスト

#### メトリクスの収集

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

#### ブラウザトラブルシューティング

カスタム Cloud SQL ラベルをタグとして収集するには、Cloud Asset Inventory のアクセス権を有効にします。

#### 収集データ

{{< site-region region="us3" >}}

ログ収集は、このサイトではサポートされていません。

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

Google Cloud SQL のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud SQL のログを Google Cloud Logging から Pub/Sub へエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud SQL のログを絞り込みます。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer

{{< /site-region >}}

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "google_cloudsql" >}}


### ヘルプ

Google Cloud SQL インテグレーションには、イベントは含まれません。

### ヘルプ

**gcp.cloudsql.database.state**
Cloud SQL インスタンスの現在のサービス状態。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloudsql/google_cloudsql_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/