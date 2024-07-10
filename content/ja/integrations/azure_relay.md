---
categories:
- azure
- クラウド
- ネットワーク
dependencies: []
description: Azure Relay のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_relay/
draft: false
git_integration_title: azure_relay
has_logo: true
integration_id: azure-relay
integration_title: Microsoft Azure Relay
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_relay
public_title: Datadog-Microsoft Azure Relay インテグレーション
short_description: Azure Relay のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Relay サービスを使用すると、ファイアウォールでポートを解放したり企業ネットワークインフラストラクチャーの内部に及んだりするような変更を加える必要なく、企業ネットワーク内で実行されているサービスをパブリッククラウドに安全に公開することができます。

Datadog Azure インテグレーションを使用して、Azure Relay からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_relay" >}}


### ヘルプ

Azure Relay インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Relay インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_relay/azure_relay_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/