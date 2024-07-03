---
categories:
- azure
- caching
- cloud
custom_kind: インテグレーション
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
public_title: Datadog-Microsoft Azure Redis Cache Integration
short_description: Track cache hits, misses, evictions, connected clients, and more.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Redis Cache is a managed data cache for your Azure applications.

Get metrics from Azure Redis Cache to:

- Visualize the performance of your Redis Caches.
- Correlate the performance of your Redis Caches with your applications.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration first][1]. There are no other installation steps that need to be performed.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_redis_cache" >}}


### イベント

The Azure Redis Cache integration does not include any events.

### サービスチェック

The Azure Redis Cache integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_redis_cache/azure_redis_cache_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/