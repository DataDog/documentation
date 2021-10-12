---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Azure Cognitive Search の主要メトリクスを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/azure_search/'
draft: false
git_integration_title: azure_search
has_logo: true
integration_id: azure-search
integration_title: Microsoft Azure Cognitive Search
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_search
public_title: Datadog-Microsoft Azure Cognitive Search インテグレーション
short_description: Azure Cognitive Search の主要メトリクスを追跡。
version: '1.0'
---
## 概要

Azure Cognitive Search は、ウェブ、モバイル、エンタープライズアプリケーションで非公開の異種コンテンツを詳細に検索できるよう開発者向けに API およびツールを提供する、サービスとしての検索クラウドソリューションです。

Datadog Azure インテグレーションを使用して、Azure Cognitive  Search からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_search" >}}


### イベント

Azure Cognitive Search インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Cognitive Search インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_search/azure_search_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/