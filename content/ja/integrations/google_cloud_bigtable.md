---
categories:
  - クラウド
  - google cloud
  - データストア
ddtype: クローラー
dependencies: []
description: Google Bigtable のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_bigtable/'
git_integration_title: google_cloud_bigtable
has_logo: true
integration_title: Google Bigtable
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_bigtable
public_title: Datadog-Google Bigtable インテグレーション
short_description: Google Bigtable のキーメトリクスを追跡
version: 1
---
## 概要
Bigtable は Google が提供する NoSQL ビッグデータデータベースサービスです。検索、アナリティクス、マップ、Gmail など、Google の多数のコアサービスを支えているデータベースと同じです。

Datadog Google Cloud Platform インテグレーションを使用して、Google Bigtable からメトリクスを収集できます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_bigtable" >}}


### イベント
Google Bigtable インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Bigtable インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_bigtable/google_cloud_bigtable_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}