---
categories:
- azure
- caching
- cloud
dependencies: []
description: キャッシュのヒット数、ミス数、エビクション数、接続クライアント数などを追跡。
doc_link: https://docs.datadoghq.com/integrations/azure_redis_cache/
draft: false
git_integration_title: azure_redis_cache
has_logo: true
integration_id: azure-redis-cache
integration_title: Microsoft Azure Redis Cache
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_redis_cache
public_title: Datadog-Microsoft Azure Redis Cache インテグレーション
short_description: キャッシュのヒット数、ミス数、エビクション数、接続クライアント数などを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Redis Cache は、Azure アプリケーション用のマネージド型のデータキャッシュです。

Azure Redis Cache からメトリクスを取得すると、以下のことができます。

- Redis Cache のパフォーマンスを視覚化。
- Redis Cache のパフォーマンスをアプリケーションと関連付け。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_redis_cache" >}}


### ヘルプ

Azure Redis Cache インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Redis Cache インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_redis_cache/azure_redis_cache_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/