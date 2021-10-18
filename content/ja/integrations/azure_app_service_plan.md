---
aliases:
  - /ja/integrations/azure_appserviceplan
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Azure App Service Plan のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/azure_app_service_plan/'
draft: false
git_integration_title: azure_app_service_plan
has_logo: true
integration_id: azure-appserviceplan
integration_title: Microsoft Azure App Service Plan
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_app_service_plan
public_title: Datadog-Microsoft Azure App Service Plan インテグレーション
short_description: Azure App Service Plan のキーメトリクスを追跡
version: '1.0'
---
## 概要

Azure App Service Plan は、1 つの Web アプリを実行するためのコンピューティングリソース一式を定義します。これらのコンピューティングリソースは、従来の Web ホスティングのサーバーファームに相当します。

Datadog Azure インテグレーションを使用して、Azure App Service Plan からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_app_service_plan" >}}


### イベント

Azure App Service Plan インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure App Service Plan インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_plan/azure_app_service_plan_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/