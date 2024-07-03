---
aliases:
- /ja/integrations/azure_datalakeanalytics
categories:
- azure
- cloud
- data stores
custom_kind: インテグレーション
dependencies: []
description: Track key Azure Data Lake Analytics metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_data_lake_analytics/
draft: false
git_integration_title: azure_data_lake_analytics
has_logo: true
integration_id: azure-datalakeanalytics
integration_title: Microsoft Azure Data Lake Analytics
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_data_lake_analytics
public_title: Datadog-Microsoft Azure Data Lake Analytics Integration
short_description: Track key Azure Data Lake Analytics metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Data Lake Analytics is an on-demand analytics job service that simplifies big data.

Use the Datadog Azure integration to collect metrics from Data Lake Analytics.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_data_lake_analytics" >}}


### イベント

The Azure Data Lake Analytics integration does not include any events.

### サービスチェック

The Azure Data Lake Analytics integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_lake_analytics/azure_data_lake_analytics_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/