---
categories:
- cloud
- azure
custom_kind: インテグレーション
dependencies: []
description: Azure App Services のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/azure_app_services/
draft: false
git_integration_title: azure_app_services
has_logo: true
integration_id: azure-app-services
integration_title: Microsoft Azure App Service
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_app_services
public_title: Datadog-Microsoft Azure App Service Integration
short_description: Track key Azure App Services metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure App Service is a platform-as-a-service that runs web, mobile, API, and business logic applications and automatically manages the resources required by those apps.

Get metrics from Azure App Service to:

- Visualize your app performance
- Correlate the performance of your Azure Apps with the rest of your apps

### Azure App Service view

In addition to the Azure App Service preset dashboard, you can also use the dedicated Azure App Service view.

Use Azure App Service view to:

- Quickly identify apps with high latency or errors

- Track the utilization of your Web Apps, Function Apps, and App Service Plans

- Get insights into the costs of your App Service Plans by visualizing the number of active instances and seeing which are running apps that are submitting traces or logs to Datadog

- Map which apps are running on which App Service Plans to identify apps that may be impacting costs or performance

To enable Datadog APM and custom metrics for your applications running in Azure App Service, see the documentation for the [Datadog Azure App Service extension][1].

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration first][2]. There are no other installation steps that need to be performed.

For additional monitoring options, including logs and trace ID injection, see the [Azure App Service extension][1].

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_app_services" >}}


### イベント

The Azure App Service integration does not include any events.

### サービスチェック

The Azure App Service integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][4].

[1]: https://docs.datadoghq.com/ja/serverless/azure_app_services/
[2]: https://docs.datadoghq.com/ja/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_services/azure_app_services_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/