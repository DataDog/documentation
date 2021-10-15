---
aliases:
  - /ja/integrations/azure_customerinsights
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Azure Customer Insights のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/azure_customer_insights/'
draft: false
git_integration_title: azure_customer_insights
has_logo: true
integration_id: azure-customerinsights
integration_title: Microsoft Azure Customer Insights
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_customer_insights
public_title: Datadog-Microsoft Azure Customer Insights インテグレーション
short_description: Azure Customer Insights のキーメトリクスを追跡
version: '1.0'
---
## 概要

Azure Customer Insights を使用すると、どのような規模のオーガニゼーションであっても、多種多様なデータセットを結合して知識やインサイトを得ることで、あらゆる角度から捉えた顧客の全体像を構築することができます。

Datadog Azure インテグレーションを使用して、Customer Insights からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_customer_insights" >}}


### イベント

Azure Customer Insights インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Customer Insights インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_customer_insights/azure_customer_insights_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/