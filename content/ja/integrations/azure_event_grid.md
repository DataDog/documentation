---
aliases:
- /ja/integrations/azure_eventgrid
categories:
- cloud
- azure
dependencies: []
description: Azure Event Grid のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_event_grid/
draft: false
git_integration_title: azure_event_grid
has_logo: true
integration_id: azure-eventgrid
integration_title: Microsoft Azure Event Grid
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_event_grid
public_title: Datadog-Microsoft Azure Event Grid インテグレーション
short_description: Azure Event Grid のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Event Grid は、公開/サブスクライブモデルを使用して均一なイベント消費を可能にするフルマネージド型のインテリジェントなイベントルーティングサービスです。

Datadog Azure インテグレーションを使用して、Azure Event Grid からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_event_grid" >}}


### ヘルプ

Azure Event Grid インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Event Grid インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_event_grid/azure_event_grid_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/