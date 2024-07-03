---
aliases:
- /ja/integrations/azure_cognitiveservices
categories:
- cloud
- azure
custom_kind: インテグレーション
dependencies: []
description: Track key Azure Cognitive Services metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_cognitive_services/
draft: false
git_integration_title: azure_cognitive_services
has_logo: true
integration_id: azure-cognitiveservices
integration_title: Microsoft Azure Cognitive Services
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_cognitive_services
public_title: Datadog-Microsoft Azure Cognitive Services Integration
short_description: Track key Azure Cognitive Services metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Cognitive Services are APIs, SDKs, and services available to help developers build intelligent applications without having direct AI or data science skills or knowledge.

Use the Datadog Azure integration to collect metrics from Azure Cognitive Services.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_cognitive_services" >}}


### イベント

The Azure Cognitive Services integration does not include any events.

### サービスチェック

The Azure Cognitive Services integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cognitive_services/azure_cognitive_services_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/