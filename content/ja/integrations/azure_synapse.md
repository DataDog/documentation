---
categories:
- クラウド
- azure
dependencies: []
description: Synapse のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/azure_synapse/
draft: false
git_integration_title: azure_synapse
has_logo: true
integration_id: azure-synapse
integration_title: Microsoft Azure Synapse
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_synapse
public_title: Datadog-Microsoft Azure Synapse インテグレーション
short_description: Azure Synapse のキーメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Synapse Analytics は、データインテグレーション、エンタープライズデータウェアハウス、ビッグデータアナリティクスを統合したアナリティクスサービスです。

Datadog Azure インテグレーションを使用して、Azure Synapse からメトリクスを収集できます。

## 計画と使用
### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング
### データセキュリティ
{{< get-metrics-from-git "azure_synapse" >}}


### ヘルプ
Azure Synapse インテグレーションには、イベントは含まれません。

### ヘルプ
Azure Synapse インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_synapse/azure_synapse_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/