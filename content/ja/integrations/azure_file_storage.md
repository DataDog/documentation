---
aliases:
- /ja/integrations/azure_filestorage
categories:
- azure
- cloud
- data stores
custom_kind: インテグレーション
dependencies: []
description: Track key Azure File Storage metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_file_storage/
draft: false
git_integration_title: azure_file_storage
has_logo: true
integration_id: azure-filestorage
integration_title: Microsoft Azure File Storage
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_file_storage
public_title: Datadog-Microsoft Azure File Storage Integration
short_description: Track key Azure File Storage metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure File Storage offers fully managed file shares in the cloud that are accessible using the industry standard protocol - Server Message Block (SMB).

Use the Datadog Azure integration to collect metrics from Azure File Storage.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_file_storage" >}}


### イベント

The Azure File Storage integration does not include any events.

### サービスチェック

The Azure File Storage integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_file_storage/azure_file_storage_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/