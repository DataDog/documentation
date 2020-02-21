---
categories:
  - クラウド
  - azure
ddtype: クローラー
dependencies: []
description: Azure Search のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/azure_search/'
git_integration_title: azure_search
has_logo: true
integration_title: Microsoft Azure Search
is_public: true
kind: integration
manifest_version: 1
name: azure_search
public_title: Datadog-Microsoft Azure Search インテグレーション
short_description: Azure Search のキーメトリクスを追跡
version: 1
---
## 概要

Azure Search は、プライベートな異種コンテンツに対する優れた検索エクスペリエンスを Web、モバイル、およびエンタープライズアプリケーションに追加するための API およびツールを開発者に提供する、サービスとしての検索クラウドソリューションです。

Datadog Azure インテグレーションを使用して、Azure Search からメトリクスを収集できます。

## セットアップ
### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure_search" >}}


### イベント
Azure Search インテグレーションには、イベントは含まれません。

### サービスのチェック
Azure Search インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_search/azure_search_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/


