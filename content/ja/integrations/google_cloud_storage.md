---
categories:
  - cloud
  - data store
  - google cloud
ddtype: クローラー
dependencies: []
description: Google Cloud Storage のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_storage/'
git_integration_title: google_cloud_storage
has_logo: true
integration_title: Google Storage
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_storage
public_title: Datadog-Google Storage インテグレーション
short_description: Google Cloud Storage のキーメトリクスを追跡
version: '1.0'
---
## 概要

Google Cloud Storage は、ライブデータの提供からデータ分析/ML、データアーカイブまで、さまざまな機能を備えた開発者/企業向けの統合型オブジェクトストレージです。

Google Storage からメトリクスを取得して、以下のことができます。

* Storage サービスのパフォーマンスを視覚化できます。
* Storage サービスのパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_storage" >}}


### イベント
Google Cloud Storage インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Storage インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_storage/google_cloud_storage_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}