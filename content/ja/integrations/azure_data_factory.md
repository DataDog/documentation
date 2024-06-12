---
aliases:
- /ja/integrations/azure_datafactory
categories:
- azure
- クラウド
- data stores
dependencies: []
description: Azure Data Factory のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_data_factory/
draft: false
git_integration_title: azure_data_factory
has_logo: true
integration_id: azure-datafactory
integration_title: Microsoft Azure Data Factory
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_data_factory
public_title: Datadog-Microsoft Azure Data Factory インテグレーション
short_description: Azure Data Factory のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Data Factory は、データの保管・移動・処理サービスを自動化されたデータパイプラインとして構築するクラウドデータ統合サービスです。

Datadog Azure インテグレーションを使用して、Data Factory からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_data_factory" >}}


### ヘルプ

Azure Data Factory インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Data Factory インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_factory/azure_data_factory_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/