---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Azure Diagnostic Extension のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/azure_diagnostic_extension/'
draft: false
git_integration_title: azure_diagnostic_extension
has_logo: true
integration_id: ''
integration_title: Azure Diagnostic Extension
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_diagnostic_extension
public_title: Datadog-Azure Diagnostic Extension インテグレーション
short_description: Azure Diagnostic Extension のキーメトリクスを追跡
version: '1.0'
---
## 概要

Azure Diagnostic Extension は、Microsoft Azure 上で実行されている VM の健全性の監視を支援します。

Datadog Azure インテグレーションは、Azure Diagnostic Extension からメトリクスを収集できますが、[ご使用の VM に Datadog Agent をインストール][2]することを[お勧めします][1]。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][3]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_diagnostic_extension" >}}


### イベント

Azure Diagnostic Extension インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Diagnostic Extension インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://www.datadoghq.com/blog/dont-fear-the-agent/
[2]: https://docs.datadoghq.com/ja/integrations/azure/#agent-installation
[3]: https://docs.datadoghq.com/ja/integrations/azure/
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_diagnostic_extension/azure_analysis_services_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/