---
aliases:
  - /ja/integrations/azure_analysisservices
categories:
  - クラウド
  - azure
ddtype: クローラー
dependencies: []
description: Azure Analysis Services のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/azure_analysis_services/'
git_integration_title: azure_analysis_services
has_logo: true
integration_title: Microsoft Azure Analysis Services
is_public: true
kind: インテグレーション
manifest_version: 1
name: azure_analysis_services
public_title: Datadog-Microsoft Azure Analysis Services インテグレーション
short_description: Azure Analysis Services のキーメトリクスを追跡
version: 1
---
## 概要

Azure Analysis Services は、クラウド上でエンタープライズレベルのデータモデル提供する、フルマネージド型の「サービスとしてのプラットフォーム (PaaS)」です。

Datadog Azure インテグレーションを使用して、Azure Analysis Services からメトリクスを収集できます。

## セットアップ
### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure_analysis_services" >}}


### イベント
Azure Analysis Services インテグレーションには、イベントは含まれません。

### サービスのチェック
Azure Analysis Services インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_analysis_services/azure_analysis_services_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}