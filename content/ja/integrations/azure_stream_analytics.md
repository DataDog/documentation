---
aliases:
  - /ja/integrations/azure_streamanalytics
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Azure Stream Analytics のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/azure_stream_analytics/'
draft: false
git_integration_title: azure_stream_analytics
has_logo: true
integration_id: azure-streamanalytics
integration_title: Microsoft Azure Stream Analytics
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_stream_analytics
public_title: Datadog-Microsoft Azure Stream Analytics インテグレーション
short_description: Azure Stream Analytics のキーメトリクスを追跡
version: '1.0'
---
## 概要

Azure Stream Analytics は、デバイスからの大量のデータストリーミングを調べることができるイベント処理エンジンです。

Datadog Azure インテグレーションを使用して、Azure Stream Analytics からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_stream_analytics" >}}


### イベント

Azure Stream Analytics インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Stream Analytics インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_stream_analytics/azure_stream_analytics_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/