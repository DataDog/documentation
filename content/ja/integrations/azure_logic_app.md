---
categories:
- cloud
- configuration & deployment
- network
- azure
dependencies: []
description: トリガーワークフロー、アクションのレイテンシー、失敗したアクションなどを追跡。
doc_link: https://docs.datadoghq.com/integrations/azure_logic_app/
draft: false
git_integration_title: azure_logic_app
has_logo: true
integration_id: azure-logic-app
integration_title: Microsoft Azure Logic App
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_logic_app
public_title: Datadog-Microsoft Azure Logic App インテグレーション
short_description: トリガーワークフロー、アクションのレイテンシー、失敗したアクションなどを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Logic App を使用して、開発者はトリガーと一連の手順で目的を明確化するワークフローを設計できます。

Azure Logic App からメトリクスを取得すると、以下のことができます。

- Logic App ワークフローのパフォーマンスを視覚化。
- Logic App ワークフローのパフォーマンスをアプリケーションと関連付け。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_logic_app" >}}


### ヘルプ

Azure Logic App インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Logic App インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_logic_app/azure_logic_app_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/