---
aliases:
- /ja/integrations/azure_eventgrid
categories:
- cloud
- azure
custom_kind: インテグレーション
dependencies: []
description: Track key Azure Event Grid metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_event_grid/
draft: false
git_integration_title: azure_event_grid
has_logo: true
integration_id: azure-eventgrid
integration_title: Microsoft Azure Event Grid
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_event_grid
public_title: Datadog-Microsoft Azure Event Grid Integration
short_description: Track key Azure Event Grid metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Event Grid is a fully-managed, intelligent event routing service that allows for uniform event consumption using a publish-subscribe model.

Use the Datadog Azure integration to collect metrics from Azure Event Grid.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_event_grid" >}}


### イベント

The Azure Event Grid integration does not include any events.

### サービスチェック

The Azure Event Grid integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_event_grid/azure_event_grid_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/