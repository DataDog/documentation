---
aliases:
- /ja/integrations/azure_arc
categories:
- クラウド
- azure
dependencies: []
description: 主要な Azure Arc メトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/azure_arc/
draft: false
git_integration_title: azure_arc
has_logo: true
integration_id: azure-arc
integration_title: Microsoft Azure Arc
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_arc
public_title: Datadog-Microsoft Azure Arc インテグレーション
short_description: 主要な Azure Arc メトリクスを追跡します。
version: '1.0'
---

## 概要

Azure Arc は、Azure プラットフォームを拡張するブリッジであり、データセンター間、エッジ、マルチクラウド環境で実行できる柔軟性を備えたアプリケーションやサービスの構築を支援します。

Datadog Azure インテグレーションを使用して、Azure Arc からメトリクスとホストを収集します。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_arc" >}}


### イベント

Azure Arc インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Arc インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_arc/azure_arc_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/