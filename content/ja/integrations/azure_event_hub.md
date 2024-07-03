---
categories:
- azure
- cloud
- log collection
- notifications
custom_kind: インテグレーション
dependencies: []
description: Azure Event Hub のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/azure_event_hub/
draft: false
git_integration_title: azure_event_hub
has_logo: true
integration_id: azure-event-hub
integration_title: Microsoft Azure Event Hub
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_event_hub
public_title: Datadog-Microsoft Azure Event Hub Integration
short_description: Track key Azure Event Hub metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Event Hub is a large scale data stream managed service.

Get metrics from Azure Event Hub to:

- Visualize the performance of your Event Hubs.
- Correlate the performance of your Event Hubs with your applications.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps needed.

### Metric collection

In the [Azure integration tile][1], ensure that `Event Hub` is checked under metric collection.

### Log collection

To collect logs from Event Hubs follow this general process:

- Create an Azure Event Hub from the Azure portal, the Azure CLI, or Powershell.
- Setup the Datadog-Azure Function which forwards logs from your event hub to Datadog.
- Forward your Event Hubs logs to the newly created Event Hub.

For detailed instructions follow the main [Azure log documentation][2].

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_event_hub" >}}


### イベント

The Azure Event Hub integration does not include any events.

### サービスチェック

The Azure Event Hub integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][4].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://docs.datadoghq.com/ja/integrations/azure/#log-collection
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_event_hub/azure_event_hub_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/