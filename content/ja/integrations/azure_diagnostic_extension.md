---
categories:
- cloud
- azure
dependencies: []
description: Azure Diagnostic Extension のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_diagnostic_extension/
draft: false
git_integration_title: azure_diagnostic_extension
has_logo: true
integration_id: ''
integration_title: Azure Diagnostic Extension
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_diagnostic_extension
public_title: Datadog-Azure Diagnostic Extension インテグレーション
short_description: Azure Diagnostic Extension のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
<div class="alert alert-warning">このインテグレーションは非推奨です。Datadog Agent をインストールすることで、Azure VM のゲストレベルおよびプロセスレベルのインサイトを、より詳細な粒度とレイテンシーで把握することができます。

このページに記載されているメトリクスは、新しく作成された Datadog 組織には入力されなくなりました。既存のユーザーについては、これらのメトリクスは 2023 年 6 月 1 日に無効化されました。

ご質問は、<a href="https://docs.datadoghq.com/help/" target="_blank">Datadog サポート</a>までご連絡ください。</div>

## 概要

Azure Diagnostic Extension は、Microsoft Azure 上で実行されている VM の健全性の監視を支援します。

Datadog Azure インテグレーションは、Azure Diagnostic Extension からメトリクスを収集できますが、VM に Datadog Agent をインストールすることを[お勧めします][1]。

- 組織が Datadog の US3 サイトを利用しており、Azure で Datadog リソースを構成している場合、[Azure Native インテグレーション手動セットアップガイド][2]の指示に従ってください。
- **すべてのサイト**は、[Azure インテグレーション手動セットアップガイド][3]または [Azure プログラム管理ガイド][4]の手順を使用できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][5]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_diagnostic_extension" >}}


### ヘルプ

Azure Diagnostic Extension インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Diagnostic Extension インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://www.datadoghq.com/blog/dont-fear-the-agent/
[2]: https://docs.datadoghq.com/ja/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent
[3]: https://docs.datadoghq.com/ja/integrations/guide/azure-manual-setup/#agent-installation
[4]: https://docs.datadoghq.com/ja/integrations/guide/azure-programmatic-management/#datadog-azure-vm-extension
[5]: https://docs.datadoghq.com/ja/integrations/azure/
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_diagnostic_extension/azure_analysis_services_metadata.csv
[7]: https://docs.datadoghq.com/ja/help/