---
categories:
- cloud
- configuration & deployment
- azure
dependencies: []
description: Azure Batch Service のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/azure_batch/
draft: false
git_integration_title: azure_batch
has_logo: true
integration_id: azure-batch
integration_title: Microsoft Azure Batch
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_batch
public_title: Datadog-Microsoft Azure Batch インテグレーション
short_description: Azure Batch Service のキーメトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Batch Service は、Azure アプリケーション用のマネージド型タスクスケジューラーおよびプロセッサーです。Azure Batch Service からメトリクスを取得すると、以下のことができます。

- Batch アカウントのパフォーマンスを視覚化。
- Batch アカウントのパフォーマンスをアプリケーションと関連付け。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_batch" >}}


### ヘルプ

Azure Batch Service インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Batch Service インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_batch/azure_batch_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/