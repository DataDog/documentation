---
categories:
- azure
- クラウド
- コスト管理
- ネットワーク
dependencies: []
description: Azure の各サブスクリプションリソース (コンピューティング、ネットワーク、ストレージ) について、事前に構成された上限に照らして使用状況を追跡します
doc_link: https://docs.datadoghq.com/integrations/azure_usage_and_quotas/
draft: false
git_integration_title: azure_usage_and_quotas
has_logo: true
integration_id: azure-usage-and-quotas
integration_title: Microsoft Azure Usage and Quotas
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_usage_and_quotas
public_title: Datadog-Microsoft Azure Usage and Quotas インテグレーション
short_description: Azure の使用状況を、事前に構成された上限に照らして追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure では、サブスクリプションリソースに対して事前に構成された上限を設定しています。予期せぬプロビジョニングの失敗を防ぐには、この上限を念頭に置いて Azure 環境の設計やスケーリングを行ってください。Azure Usage and Quotas からメトリクスを取得して、以下を行うことができます。

- リソース (コンピューティング、ネットワーク、ストレージ) の使用状況を割り当てに照らして視覚化。
- 割り当てが上限に達したこと把握し、プロビジョニングの失敗を予防。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_usage_and_quotas" >}}


### ヘルプ

Azure Quota インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Quota インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_usage_and_quotas/azure_usage_and_quotas_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/