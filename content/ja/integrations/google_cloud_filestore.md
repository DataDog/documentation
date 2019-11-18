---
categories:
  - クラウド
  - google cloud
ddtype: クローラー
dependencies: []
description: Google Cloud Filestore のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_filestore/'
git_integration_title: google_cloud_filestore
has_logo: true
integration_title: Google Cloud Filestore
is_public: true
kind: インテグレーション
manifest_version: 1
name: google_cloud_filestore
public_title: Datadog-Google Cloud Filestore インテグレーション
short_description: Google Cloud Filestore のキーメトリクスを追跡
version: 1
---
## 概要
Google Cloud Filestore は、データ用のファイルシステムインターフェイスと共有ファイルシステムを必要とするアプリケーション向けのマネージド型ファイルストレージサービスです。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Filestore からメトリクスを収集できます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_filestore" >}}


### イベント
Google Cloud Filestore インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Filestore インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_file/google_cloud_filestore_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}