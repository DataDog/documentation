---
aliases:
  - /ja/integrations/azure_keyvault
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Azure Key Vault のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_key_vault/
draft: false
git_integration_title: azure_key_vault
has_logo: true
integration_id: azure-keyvault
integration_title: Microsoft Azure Key Vault
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_key_vault
public_title: Datadog-Microsoft Azure Key Vault インテグレーション
short_description: Azure Key Vault のキーメトリクスを追跡
version: '1.0'
---
## 概要

Azure Key Vault は、クラウドアプリケーションおよびサービスが使用する暗号化キーとシークレットを保護および管理するために使用されます。

Datadog Azure インテグレーションを使用して、Azure Key Vault からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_key_vault" >}}


### イベント

Azure Key Vault インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Key Vault インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_key_vault/azure_key_vault_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/