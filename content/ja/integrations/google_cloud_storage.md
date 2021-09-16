---
categories:
  - cloud
  - data store
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: Google Cloud Storage の主要メトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/google_cloud_storage/
draft: false
git_integration_title: google_cloud_storage
has_logo: true
integration_id: google-cloud-storage
integration_title: Google Storage
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_storage
public_title: Datadog-Google Storage インテグレーション
short_description: Google Cloud Storage の主要メトリクスを追跡。
version: '1.0'
---
## 概要

Google Cloud Storage は、ライブデータの提供からデータ分析/ML、データアーカイブまで、さまざまな機能を備えた開発者/企業向けの統合型オブジェクトストレージです。

Google Storage からメトリクスを取得して、以下のことができます。

- Storage サービスのパフォーマンスを視覚化。
- Storage サービスのパフォーマンスをアプリケーションと関連付け。

## セットアップ

### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

#### コンフィギュレーション

カスタム Cloud Storage ラベルをタグとして収集するには、Cloud Asset Inventory のアクセス権を有効にします。

### ログの収集

Google Cloud Storage のログは Stackdriver により収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。[HTTP プッシュフォワーダーを使用した Cloud Pub/Sub][2] をまだセットアップしていない場合は、これをセットアップしてください。

セットアップが完了したら、Google Cloud Storage のログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver ページ][3]に移動し、Google Cloud Storage のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_storage" >}}


### イベント

Google Cloud Storage インテグレーションには、イベントは含まれません。

### サービスのチェック

Google Cloud Storage インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_storage/google_cloud_storage_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/