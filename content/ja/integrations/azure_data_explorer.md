---
categories:
- azure
- クラウド
- ネットワーク
dependencies: []
description: Azure Data Explorer のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_data_explorer/
draft: false
git_integration_title: azure_data_explorer
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Data Explorer
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_data_explorer
public_title: Datadog-Microsoft Azure Data Explorer インテグレーション
short_description: Azure Data Explorer のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Data Explorer は非常にスケーラブルで安全な分析サービスで、構造化されたデータと構造化されていないデータを精査して、即座に詳細な情報を得ることができます。アドホッククエリ用に最適化された Azure Data Explorer は、生データ、構造化データ、半構造化データのデータ探索を可能にし、詳細な情報を獲得するまでの時間を短縮します。Datadog を使用して、Azure Data Explorer のパフォーマンスと使用状況を、他のアプリケーションやインフラストラクチャーとの関連で監視します。

Azure Data Explorer からメトリクスを取得すると、以下のことができます。

* Data Explorer インスタンスの取り込み、処理、レイテンシーのパフォーマンスを追跡する。
* Data Explorer のコンピューティング、メモリ、ネットワークリソースの使用状況を監視する。

## 計画と使用
### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング
### データセキュリティ
{{< get-metrics-from-git "azure_data_explorer" >}}


### ヘルプ
Azure Data Explorer インテグレーションには、イベントは含まれません。

### ヘルプ
Azure Data Explorer インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_explorer/azure_data_explorer_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/