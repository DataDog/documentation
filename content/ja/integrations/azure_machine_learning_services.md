---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Azure Machine Learning の主要メトリクスを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/azure_machine_learning_services/'
draft: false
git_integration_title: azure_machine_learning_services
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Machine Learning
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_machine_learning_services
public_title: Datadog-Microsoft Azure Machine Learning インテグレーション
short_description: Azure Machine Learning の主要メトリクスを追跡。
version: '1.0'
---
## 概要

Azure Machine Learning サービスでは、開発者やデータサイエンティストに向けに、機械学習モデルをより速く構築、トレーニング、展開するための生産的な機能を数多く提供しています。Datadog を使用して、他のアプリケーションやインフラストラクチャーに応じて Azure Machine Learning のパフォーマンスと使用状況を監視します。

Azure Machine Learning からメトリクスを取得すると、以下のことができます。

* 実行数、実行ステータス、モデルのデプロイメント数、モデルのデプロイメントステータスを追跡。
* 機械学習ノードの使用状況を監視。
* 対コストパフォーマンスの最適化。

## セットアップ
### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure_machine_learning_services" >}}


### イベント
Azure Machine Learning インテグレーションには、イベントは含まれません。

### サービスチェック
Azure Machine Learning インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_machine_learning_services/azure_machine_learning_services_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/