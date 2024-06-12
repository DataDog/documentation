---
categories:
- cloud
- azure
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
kind: インテグレーション
manifest_version: '1.0'
name: azure_app_services
public_title: Datadog-Microsoft Azure App Service インテグレーション
short_description: Azure App Services のキーメトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure App Service は、Web、モバイル、API、およびビジネスロジックアプリケーションを実行し、それらのアプリケーションが必要とするリソースを自動的に管理する、PaaS (サービスとしてのプラットフォーム) です。

Azure App Service からメトリクスを取得すると、以下のことができます。

- アプリのパフォーマンスを視覚化できます。
- Azure アプリのパフォーマンスを他のアプリと関連付けることができます。

### Azure App Service ビュー

Azure App Service のプリセットダッシュボードに加え、Azure App Service 専用のビューを利用することも可能です。

Azure App Service ビューを使用すると、次のことができます。

- レイテンシーやエラーの多いアプリをすばやく特定

- Web App、Function App、App Service Plan の使用量を追跡

- アクティブなインスタンスの数を視覚化し、Datadog にトレースまたはログを送信している実行中のアプリを確認することで、App Service Plan のコストに関する洞察を取得

- どの App Service Plan でどのアプリが実行されているかをマッピングして、コストやパフォーマンスに影響を与える可能性のあるアプリを特定

Azure App Service で実行するアプリケーションに対して Datadog APM およびカスタムメトリクスを有効にするには、[Datadog Azure App Service 拡張機能][1]のドキュメントを参照してください。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

ログおよびトレース ID 挿入など、その他のモニタリングオプションについては、[Azure App Service 拡張機能][1]をご覧ください。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_app_services" >}}


### ヘルプ

Azure App Service インテグレーションには、イベントは含まれません。

### ヘルプ

Azure App Service インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.datadoghq.com/ja/serverless/azure_app_services/
[2]: https://docs.datadoghq.com/ja/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_services/azure_app_services_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/