---
aliases:
- /ja/integrations/azure_apimanagement
categories:
- cloud
- azure
dependencies: []
description: Azure API Management のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_api_management/
draft: false
git_integration_title: azure_api_management
has_logo: true
integration_id: azure-apimanagement
integration_title: Microsoft Azure API Management
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_api_management
public_title: Datadog-Microsoft Azure API Management インテグレーション
short_description: Azure API Management のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure API Management は、顧客が API を公開、セキュリティ保護、変換、保守、および監視できるフルマネージド型サービスです。

Datadog Azure インテグレーションを使用して、Azure API Management からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_api_management" >}}


### ヘルプ

Azure API Management インテグレーションには、イベントは含まれません。

### ヘルプ

Azure API Management インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_api_management/azure_api_management_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/