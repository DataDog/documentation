---
categories:
  - クラウド
  - google cloud
ddtype: クローラー
dependencies: []
description: Google Cloud Memorystore for Redis のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_redis/'
git_integration_title: google_cloud_redis
has_logo: true
integration_title: Google Cloud Memorystore for Redis
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_redis
public_title: Datadog-Google Cloud Memorystore for Redis インテグレーション
short_description: Google Cloud Memorystore for Redis のキーメトリクスを追跡
version: 1
---
## 概要
Google Cloud Memorystore for Redis は、拡張性、安全性、可用性に優れたインフラストラクチャー上に構築されたフルマネージド型のインメモリデータストアサービスです。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Memorystore for Redis からメトリクスを収集できます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_redis" >}}


### イベント
Google Cloud Memorystore for Redis インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Memorystore for Redis インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_redis/google_cloud_redis_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}