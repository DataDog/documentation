---
categories:
  - cloud
  - data store
  - caching
  - azure
ddtype: クローラー
dependencies: []
description: キャッシュのヒット、ミス、削除、接続されているクライアントなどを追跡
doc_link: 'https://docs.datadoghq.com/integrations/azure_redis_cache/'
git_integration_title: azure_redis_cache
has_logo: true
integration_title: Microsoft Azure Redis Cache
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_redis_cache
public_title: Datadog-Microsoft Azure Redis Cache インテグレーション
short_description: キャッシュのヒット、ミス、削除、接続されているクライアントなどを追跡
version: '1.0'
---
## 概要
Azure Redis Cache は、Azure アプリケーション用のマネージド型のデータキャッシュです。

Azure Redis Cache からメトリクスを取得すると、以下のことができます。

* Redis Cache のパフォーマンスを視覚化できます。
* Redis Cache のパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ
### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure_redis_cache" >}}


### イベント
Azure Redis Cache インテグレーションには、イベントは含まれません。

### サービスのチェック
Azure Redis Cache インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_redis_cache/azure_redis_cache_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}