---
categories:
  - クラウド
  - azure
ddtype: クローラー
dependencies: []
description: Azure Diagnostic Extension のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/azure_diagnostic_extension/'
git_integration_title: azure_diagnostic_extension
has_logo: true
integration_title: Azure Diagnostic Extension
is_public: true
kind: インテグレーション
manifest_version: 1
name: azure_diagnostic_extension
public_title: Datadog-Azure Diagnostic Extension インテグレーション
short_description: Azure Diagnostic Extension のキーメトリクスを追跡
version: 1
---
## 概要
Azure Diagnostic Extension は、Microsoft Azure 上で実行されている VM の健全性の監視を支援します。

Datadog Azure インテグレーションは、Azure Diagnostic Extension からメトリクスを収集できますが、[ご使用の VM に Datadog Agent をインストール][4]することを[お勧めします][5]。

## セットアップ
### インストール
[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure_diagnostic_extension" >}}


### イベント
Azure Diagnostic Extension インテグレーションには、イベントは含まれません。

### サービスのチェック
Azure Diagnostic Extension インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_diagnostic_extension/azure_analysis_services_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://docs.datadoghq.com/ja/integrations/azure/#agent-installation
[5]: https://www.datadoghq.com/blog/dont-fear-the-agent/


