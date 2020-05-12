---
categories:
  - cloud
  - processing
  - notification
  - azure
  - log collection
ddtype: crawler
dependencies: []
description: Azure Event Hub のキーメトリクスを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/azure_event_hub/'
git_integration_title: azure_event_hub
has_logo: true
integration_title: Microsoft Azure Event Hub
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_event_hub
public_title: Datadog-Microsoft Azure Event Hub インテグレーション
short_description: Azure Event Hub のキーメトリクスを追跡。
version: '1.0'
---
## 概要

Azure Event Hub は、マネージド型の大規模データストリーミングサービスです。

Azure Event Hub からメトリクスを取得すると、以下のことができます。

- イベントハブのパフォーマンスを視覚化。
- イベントハブのパフォーマンスをアプリケーションと関連付け。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順は必要ありません。

### メトリクスの収集

[Azure インテグレーションタイル][1]のメトリクス収集で、`Event Hub` をオンにします。

### Log Collection

イベントハブからログを収集するには、以下の手順に従ってください。

- Azure ポータル、Azure CLI、または Powershell から Azure イベントハブを作成します。
- イベントハブから Datadog へログを転送する Datadog-Azure 関数をセットアップします。
- イベントハブのログを新しく作成したイベントハブに転送します。

詳細な手順については、[Azure のログに関するドキュメント][2]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_event_hub" >}}


### イベント

Azure Event Hub インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Event Hub インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://docs.datadoghq.com/ja/integrations/azure/#log-collection
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_event_hub/azure_event_hub_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/