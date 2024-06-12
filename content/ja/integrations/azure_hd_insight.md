---
aliases:
- /ja/integrations/azure_hdinsight
categories:
- cloud
- azure
dependencies: []
description: Azure HDInsight のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_hd_insight/
draft: false
git_integration_title: azure_hd_insight
has_logo: true
integration_id: azure-hdinsight
integration_title: Microsoft Azure HDInsight
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_hd_insight
public_title: Datadog-Microsoft Azure HDInsight インテグレーション
short_description: Azure HDInsight のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure HDInsight は、膨大な量のデータを簡単、迅速かつコスト効率よく処理できるようにするクラウドサービスです。

Datadog Azure インテグレーションを使用すると、Azure HDInsight からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_hd_insight" >}}


### ヘルプ

Azure HDInsight インテグレーションには、イベントは含まれません。

### ヘルプ

Azure HDInsight インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_hd_insight/azure_hd_insight_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/