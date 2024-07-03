---
app_id: azure-backup
app_uuid: 5116675d-48b4-4ec4-a65f-94ce56caed37
assets:
  dashboards:
    azure-backup: assets/dashboards/azure_backup_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - azure.recoveryservices_vaults.count
      metadata_path: metadata.csv
      prefix: azure.recoveryservices_vaults
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 7440181
    source_type_name: Azure Backup
  monitors:
    '[RecoveryServiceVaults] [Azure] Recovery service vault backups are in an unhealthy state': assets/monitors/recovery_vault_backup_error.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_backup
integration_id: azure-backup
integration_title: Azure Backup
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_backup
public_title: Azure Backup
short_description: Azure Backup provides backup and restore services for Recovery
  Services vaults and Backup vaults
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  configuration: README.md#Installation
  description: Azure Backup provides backup and restore services for Recovery Services
    vaults and Backup vaults
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Backup
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## Overview

Datadog's integration with the [Azure Backup service][1] monitors the health of a [Recovery Services vault][2] running on Microsoft Azure.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][3] first. There are no other installation steps.

Although the Microsoft Azure integration can collect metrics from an Azure Recovery Services vault, Datadog recommends that you also install the Datadog Agent on your VMs. For more information, see the blog on [Agent-based monitoring][4].

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_backup" >}}


### サービスチェック

The Azure Backup Service Integration does not include any service checks.

### イベント

The Azure Backup integration does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][6].

[1]: https://learn.microsoft.com/en-us/azure/backup/backup-overview
[2]: https://learn.microsoft.com/en-us/azure/backup/backup-azure-recovery-services-vault-overview
[3]: https://docs.datadoghq.com/ja/integrations/azure/
[4]: https://www.datadoghq.com/blog/dont-fear-the-agent/
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/azure_backup/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/