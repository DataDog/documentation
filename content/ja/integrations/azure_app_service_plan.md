---
aliases:
- /ja/integrations/azure_appserviceplan
categories:
- cloud
- azure
custom_kind: インテグレーション
dependencies: []
description: Track key Azure App Service Plan metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_app_service_plan/
draft: false
git_integration_title: azure_app_service_plan
has_logo: true
integration_id: azure-appserviceplan
integration_title: Microsoft Azure App Service Plan
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_app_service_plan
public_title: Datadog-Microsoft Azure App Service Plan Integration
short_description: Track key Azure App Service Plan metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure App Service Plan defines a set of compute resources for a web app to run. These compute resources are analogous to the server farm in conventional web hosting.

Use the Datadog Azure integration to collect metrics from the Azure App Service Plan.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_app_service_plan" >}}


### イベント

The Azure App Service Plan integration does not include any events.

### サービスチェック

The Azure App Service Plan integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_plan/azure_app_service_plan_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/