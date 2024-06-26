---
categories:
- 自動化
- azure
- クラウド
dependencies: []
description: Azure Automation のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_automation/
draft: false
git_integration_title: azure_automation
has_logo: true
integration_id: azure-automation
integration_title: Microsoft Azure Automation
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_automation
public_title: Datadog-Microsoft Azure Automation インテグレーション
short_description: Azure Automation のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Automation は、Azure 環境と非 Azure 環境の両方を一貫して管理できる、クラウドベースの自動化および構成サービスを提供します。

Datadog Azure インテグレーションを使用して、Azure Automation からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_automation" >}}


### ヘルプ

Azure Automation インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Automation インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_automation/azure_automation_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/