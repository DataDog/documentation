---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Azure App Services のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/azure_app_services/
draft: false
git_integration_title: azure_app_services
has_logo: true
integration_id: azure-app-services
integration_title: Microsoft Azure App Service
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_app_services
public_title: Datadog-Microsoft Azure App Service インテグレーション
short_description: Azure App Services のキーメトリクスを追跡。
version: '1.0'
---
## 概要

Azure App Service は、Web、モバイル、API、およびビジネスロジックアプリケーションを実行し、それらのアプリケーションが必要とするリソースを自動的に管理する、PaaS (サービスとしてのプラットフォーム) です。

Azure App Service からメトリクスを取得すると、以下のことができます。

- アプリのパフォーマンスを視覚化できます。
- Azure アプリのパフォーマンスを他のアプリと関連付けることができます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

ログおよびトレース ID 挿入など、その他のモニタリングオプションについては、[Azure App Service 拡張機能][2]をご覧ください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_app_services" >}}


### イベント

Azure App Service インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure App Service インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://docs.datadoghq.com/ja/infrastructure/serverless/azure_app_services/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_services/azure_app_services_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/