---
categories:
  - cloud
  - google cloud
  - data store
ddtype: クローラー
dependencies: []
description: データストアの読み取り/書き込みパフォーマンス、リクエスト数などを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_datastore/'
git_integration_title: google_cloud_datastore
has_logo: true
integration_title: Google Datastore
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_datastore
public_title: Datadog-Google Datastore インテグレーション
short_description: データストアの読み取り/書き込みパフォーマンス、リクエスト数などを追跡
version: '1.0'
---
## 概要
Cloud Datastore は、Web およびモバイルアプリケーション用の高い拡張性を備えた NoSQL データベースです。

Google Datastore からメトリクスを取得して、以下のことができます。

* データストアのパフォーマンスを視覚化できます。
* データストアのパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_datastore" >}}


### イベント
Google Cloud Datastore インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Datastore インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_datastore/google_cloud_datastore_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}