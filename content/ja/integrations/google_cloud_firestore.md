---
categories:
  - クラウド
  - google cloud
ddtype: クローラー
dependencies: []
description: Google Cloud Firestore のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_firestore/'
git_integration_title: google_cloud_firestore
has_logo: true
integration_title: Google Cloud Firestore
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_firestore
public_title: Datadog-Google Cloud Firestore インテグレーション
short_description: Google Cloud Firestore のキーメトリクスを追跡
version: 1
---
## 概要
Google Cloud Firestore は、Firebase と Google Cloud Platform によるモバイル、Web、およびサーバー開発に対応した柔軟で拡張性の高いデータベースです。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Firestore からメトリクスを収集できます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_firestore" >}}


### イベント
Google Cloud Firestore インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Firestore インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_firestore/google_cloud_firestore_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}