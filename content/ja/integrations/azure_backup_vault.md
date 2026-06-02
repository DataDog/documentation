---
app_id: azure-backup-vault
app_uuid: 7689f6dd-24d8-44ea-8596-ebbd918837af
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.dataprotection_backupvaults.count
      metadata_path: metadata.csv
      prefix: azure.dataprotection_backupvaults.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 40187039
    source_type_name: Azure Backup Vault
  monitors:
    Azure Backup Job Errors: assets/monitors/azure_backup_job_errors.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- azure
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_backup_vault
integration_id: azure-backup-vault
integration_title: Azure Backup Vault
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_backup_vault
public_title: Azure Backup Vault
short_description: Azure Backup Vault インテグレーションを利用すると、バックアップ ボールトで実行されるバックアップおよび復元の正常性イベントを追跡できます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Installation
  description: Azure Backup Vault インテグレーションを利用すると、バックアップ ボールトで実行されるバックアップおよび復元の正常性イベントを追跡できます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Backup Vault
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Azure Backup Vault は、Azure Blob や Azure Database for PostgreSQL などの新しいワークロードのバックアップ データを格納します。Azure Backup Vault インテグレーションを利用すると、バックアップ ボールトで実行されるバックアップおよび復元の正常性イベントを追跡できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_backup_vault" >}}


### サービスチェック

Azure Backup Vault にはサービス チェックは含まれません。

### イベント

Azure Backup Vault にはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/help/