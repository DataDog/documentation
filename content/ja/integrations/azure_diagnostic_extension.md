---
categories:
- cloud
- azure
custom_kind: インテグレーション
dependencies: []
description: Track key Azure Diagnostic Extension metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_diagnostic_extension/
draft: false
git_integration_title: azure_diagnostic_extension
has_logo: true
integration_id: ''
integration_title: Azure Diagnostic Extension
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_diagnostic_extension
public_title: Datadog-Azure Diagnostic Extension Integration
short_description: Track key Azure Diagnostic Extension metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
<div class="alert alert-warning">This integration is deprecated. Install the Datadog Agent for similar guest-level and process-level insights into your Azure VMs, with better granularity and latency.

The metrics listed on this page are no longer populated for newly created Datadog organizations. For existing users, these metrics were disabled on June 1, 2023.

For any questions, contact <a href="https://docs.datadoghq.com/help/" target="_blank">Datadog Support</a>.</div>

## Overview

The Azure Diagnostic Extension helps a user monitor the health of a VM running on Microsoft Azure.

The Datadog Azure integration can collect metrics from the Azure Diagnostic Extension, but it is [recommended][1] that you install the Datadog Agent on your VMs:

- If your organization is on Datadog's US3 site and you've configured the Datadog resource in Azure, use the instructions on the [Azure Native Integration Manual Setup Guide][2]. 
- **All sites** can use the instructions on the [Azure Integration Manual Setup Guide][3] or [Azure Programmatic Management Guide][4].

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][5] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_diagnostic_extension" >}}


### イベント

The Azure Diagnostic Extension integration does not include any events.

### サービスチェック

The Azure Diagnostic Extension integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][7].

[1]: https://www.datadoghq.com/blog/dont-fear-the-agent/
[2]: https://docs.datadoghq.com/ja/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent
[3]: https://docs.datadoghq.com/ja/integrations/guide/azure-manual-setup/#agent-installation
[4]: https://docs.datadoghq.com/ja/integrations/guide/azure-programmatic-management/#datadog-azure-vm-extension
[5]: https://docs.datadoghq.com/ja/integrations/azure/
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_diagnostic_extension/azure_analysis_services_metadata.csv
[7]: https://docs.datadoghq.com/ja/help/