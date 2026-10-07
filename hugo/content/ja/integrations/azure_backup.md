---
app_id: azure-backup
app_uuid: 5116675d-48b4-4ec4-a65f-94ce56caed37
assets:
  dashboards:
    azure-backup: assets/dashboards/azure_backup_overview.json
  integration:
    auto_install: true
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
    Azure Backup Job Errors: assets/monitors/recovery_vault_backup_error.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- Azure
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
short_description: Azure Backup は、Recovery Services vault および Backup vault に対してバックアップおよびリストア
  サービスを提供します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Installation
  description: Azure Backup は、Recovery Services vault および Backup vault に対してバックアップおよびリストア
    サービスを提供します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Backup
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Datadog の [Azure Backup サービス][1] とのインテグレーションは、Microsoft Azure 上で稼働する [Recovery Services vault][2] の健全性を監視します。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][3]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

Microsoft Azure インテグレーションでも Azure Recovery Services vault からメトリクスを収集できますが、Datadog では VM に Datadog Agent をインストールすることを推奨しています。詳細は、[エージェント ベース監視][4] に関するブログを参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_backup" >}}


### サービスチェック

Azure Backup サービス インテグレーションにはサービス チェックが含まれていません。

### イベント

Azure Backup インテグレーションにはイベントが含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://learn.microsoft.com/en-us/azure/backup/backup-overview
[2]: https://learn.microsoft.com/en-us/azure/backup/backup-azure-recovery-services-vault-overview
[3]: https://docs.datadoghq.com/ja/integrations/azure/
[4]: https://www.datadoghq.com/blog/dont-fear-the-agent/
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/azure_backup/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/