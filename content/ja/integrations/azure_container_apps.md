---
aliases: []
categories:
- azure
- クラウド
- コンテナ
dependencies: []
description: Azure Container Apps からメトリクスを取得します。
doc_link: https://docs.datadoghq.com/integrations/azure_container_apps/
draft: false
git_integration_title: azure_container_apps
has_logo: true
integration_id: azure-container-apps
integration_title: Microsoft Azure Container Apps
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_container_apps
public_title: Datadog-Microsoft Azure Container Apps インテグレーション
short_description: Azure Container Apps からメトリクスを取得します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Container Apps を使用すると、サーバーレスコンテナを使用してモダンなアプリやマイクロサービスを構築およびデプロイすることができます。詳細については、Azure Container Apps の [Microsoft のドキュメント][1]を参照してください。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_container_apps" >}}


### ヘルプ

Azure Container Apps インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Container Apps インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.microsoft.com/en-us/azure/container-apps/overview
[2]: https://docs.datadoghq.com/ja/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_apps/azure_container_apps_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/