---
categories:
- クラウド
- azure
dependencies: []
description: Azure App Configuration のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/azure_app_configuration/
draft: false
git_integration_title: azure_app_configuration
has_logo: true
integration_id: ''
integration_title: Microsoft Azure App Configuration
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_app_configuration
public_title: Datadog-Microsoft Azure App Configuration インテグレーション
short_description: Azure App Configuration のキーメトリクスを追跡します。
version: '1.0'
---

## 概要

Azure App Configuration は、アプリケーションの設定と機能フラグを管理するためのセントラルサービスを提供します。App Configuration では、アプリケーションのすべての設定を保存し、そのアクセスを一箇所で保護することができます。

[Datadog Azure インテグレーション][1]を利用することで、Azure App Configuration からメトリクスを収集し、リクエストの着信やレイテンシー、スロットリングエラーをモニタリングすることができます。

## セットアップ
### APM に Datadog Agent を構成する

[Microsoft Azure インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure_app_configuration" >}}


### イベント
Azure App Configuration インテグレーションには、イベントは含まれません。

### サービスのチェック
Azure App Configuration インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://app.datadoghq.com/integrations/azure
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_configuration/azure_app_configuration_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/