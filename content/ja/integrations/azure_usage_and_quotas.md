---
categories:
- azure
- cloud
- cost management
- network
custom_kind: インテグレーション
dependencies: []
description: Track usage against preconfigured limits on Azure compute, network, and
  storage resources for your subscription
doc_link: https://docs.datadoghq.com/integrations/azure_usage_and_quotas/
draft: false
git_integration_title: azure_usage_and_quotas
has_logo: true
integration_id: azure-usage-and-quotas
integration_title: Microsoft Azure Usage and Quotas
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_usage_and_quotas
public_title: Datadog-Microsoft Azure Usage and Quotas Integration
short_description: Track usage against preconfigured limits on Azure.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure places preconfigured limits on resources for your subscription. To avoid unexpected provisioning failures, keep these limits in mind as you design and scale your Azure environment. Get metrics from Azure Usage and Quotas to:

- Visualize utilization of computer, network, and storage resources against your quota.
- Understand and prevent provisioning failures from hitting quota limits.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration first][1]. There are no other installation steps that need to be performed.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_usage_and_quotas" >}}


### イベント

The Azure Quota integration does not include any events.

### サービスチェック

The Azure Quota integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_usage_and_quotas/azure_usage_and_quotas_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/