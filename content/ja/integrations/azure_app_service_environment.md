---
aliases:
- /ja/integrations/azure_appserviceenvironment
categories:
- cloud
- azure
custom_kind: インテグレーション
dependencies: []
description: Track key Azure App Service Environment metrics.
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
public_title: Datadog-Microsoft Azure App Service Environment Integration
short_description: Track key Azure App Service Environment metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

The Azure App Service Environment is an Azure App Service feature that provides a fully isolated and dedicated environment for securely running App Service apps at high scale.

Use the Datadog Azure integration to collect metrics from Azure App Service Environment.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_app_service_environment" >}}


### イベント

The Azure App Service Environment integration does not include any events.

### サービスチェック

The Azure App Service Environment integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_environment/azure_app_service_environment_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/