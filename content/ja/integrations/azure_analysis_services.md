---
aliases:
- /ja/integrations/azure_analysisservices
categories:
- cloud
- azure
custom_kind: インテグレーション
dependencies: []
description: Track key Azure Analysis Services metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_analysis_services/
draft: false
git_integration_title: azure_analysis_services
has_logo: true
integration_id: azure-analysisservices
integration_title: Microsoft Azure Analysis Services
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_analysis_services
public_title: Datadog-Microsoft Azure Analysis Services Integration
short_description: Track key Azure Analysis Services metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Analysis Services is a fully managed platform as a service (PaaS) that provides enterprise-grade data models in the cloud.

Use the Datadog Azure integration to collect metrics from Azure Analysis Services.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_analysis_services" >}}


### イベント

The Azure Analysis Services integration does not include any events.

### サービスチェック

The Azure Analysis Services integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_analysis_services/azure_analysis_services_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/