---
aliases:
- /ja/integrations/azure_applicationgateway
categories:
- cloud
- azure
dependencies: []
description: Azure Application Gateway のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_application_gateway/
draft: false
git_integration_title: azure_application_gateway
has_logo: true
integration_id: azure-applicationgateway
integration_title: Microsoft Azure Application Gateway
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_application_gateway
public_title: Datadog-Microsoft Azure Application Gateway インテグレーション
short_description: Azure Application Gateway のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Application Gateway は、Web アプリケーションへのトラフィックを管理できる Web トラフィックロードバランサーです。

Datadog Azure インテグレーションを使用して、Azure Application Gateway からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_application_gateway" >}}


### ヘルプ

Azure Application Gateway インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Application Gateway インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_application_gateway/azure_application_gateway_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/