---
categories:
- cloud
- azure
dependencies: []
description: Azure Service Bus のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_service_bus/
draft: false
git_integration_title: azure_service_bus
has_logo: true
integration_id: azure-service-bus
integration_title: Microsoft Azure Service Bus
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_service_bus
public_title: Datadog-Microsoft Azure Service Bus インテグレーション
short_description: Azure Service Bus のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Microsoft Azure Service Bus は、フルマネージド型のエンタープライズ統合メッセージブローカーです。

Azure Service Bus からメトリクスを取得すると、以下のことができます。

- サービスバスのパフォーマンスを視覚化できます。
- サービスバスのパフォーマンスをアプリケーションと関連付けることができます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_service_bus" >}}


### ヘルプ

Azure Service Bus インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Service Bus インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_service_bus/azure_service_bus_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/