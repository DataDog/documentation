---
aliases:
- /ja/integrations/azure_appserviceenvironment
categories:
- cloud
- azure
custom_kind: integration
dependencies: []
description: Azure App Service Environment のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_app_service_environment/
draft: false
git_integration_title: azure_app_service_environment
has_logo: true
integration_id: azure-appserviceenvironment
integration_title: Microsoft Azure App Service Environment
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_app_service_environment
public_title: Datadog-Microsoft Azure App Service Environment インテグレーション
short_description: Azure App Service Environment のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure App Service Environment は、App Service アプリを大規模かつ安全に実行するために完全に分離された専用の環境を提供する Azure App Service の機能です。

Datadog Azure インテグレーションを使用して、Azure App Service Environment からメトリクスを収集できます。

## Setup

### Installation

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_app_service_environment" >}}


### Events

Azure App Service Environment インテグレーションには、イベントは含まれません。

### Service Checks

Azure App Service Environment インテグレーションには、サービスのチェック機能は含まれません。

## Troubleshooting

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_environment/azure_app_service_environment_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/