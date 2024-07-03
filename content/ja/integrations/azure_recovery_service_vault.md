---
categories:
- cloud
- azure
custom_kind: インテグレーション
dependencies: []
description: Track key Azure Recovery Service Vault metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_recovery_service_vault/
draft: false
git_integration_title: azure_recovery_service_vault
has_logo: true
integration_id: ''
integration_title: Azure Recovery Service Vault
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_recovery_service_vault
public_title: Datadog-Azure Recovery Service Vault Integration
short_description: Track key Azure Recovery Service Vault metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

The Azure Recovery Service Vault integration helps you monitor the health of a Recovery service vault running on Microsoft Azure.

The Datadog Azure integration can collect metrics from the Azure Recovery Service Vault, but it is [recommended][1] that you install the Datadog Agent on your VMs. If your organization is on Datadog's US3 site and you've configured the Datadog resource in Azure, use the instructions on the [Azure Native Integration Manual Setup Guide][2]. **All sites** can use the instructions on the [Azure Integration Manual Setup Guide][3] or [Azure Programmatic Management Guide][4].

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][5] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_recovery_service_vault" >}}


### イベント

The Azure Recovery Service Vault integration does not include any events.

### サービスチェック

The Azure Recovery Service Vault integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][7].


[1]: https://www.datadoghq.com/blog/dont-fear-the-agent/
[2]: https://docs.datadoghq.com/ja/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent
[3]: https://docs.datadoghq.com/ja/integrations/guide/azure-manual-setup/#agent-installation
[4]: https://docs.datadoghq.com/ja/integrations/guide/azure-programmatic-management/#datadog-azure-vm-extension
[5]: https://docs.datadoghq.com/ja/integrations/azure/
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_recovery_service_vault/azure_recovery_service_vault_metadata.csv
[7]: https://docs.datadoghq.com/ja/help/