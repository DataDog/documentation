---
categories:
- cloud
- azure
custom_kind: インテグレーション
dependencies: []
description: Track key Synapse metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_synapse/
draft: false
git_integration_title: azure_synapse
has_logo: true
integration_id: azure-synapse
integration_title: Microsoft Azure Synapse
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_synapse
public_title: Datadog-Microsoft Azure Synapse Integration
short_description: Track key Azure Synapse metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Synapse Analytics is an analytics service that brings together data integration, enterprise data warehousing and big data analytics.

Use the Datadog Azure integration to collect metrics from Azure Synapse.

## セットアップ
### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure_synapse" >}}


### イベント
The Azure Synapse integration does not include any events.

### サービスチェック
The Azure Synapse integration does not include any service checks.

## トラブルシューティング
Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_synapse/azure_synapse_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/