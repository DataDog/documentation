---
categories:
- cloud
- azure
dependencies: []
description: Azure Recovery Service Vault のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/azure_recovery_service_vault/
draft: false
git_integration_title: azure_recovery_service_vault
has_logo: true
integration_id: ''
integration_title: Azure Recovery Service Vault
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_recovery_service_vault
public_title: Datadog-Azure Recovery Service Vault インテグレーション
short_description: Azure Recovery Service Vault のキーメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Recovery Service Vault インテグレーションは、Microsoft Azure 上で動作する Recovery Service Vault の健全性を監視するのに役立ちます。

Datadog Azure インテグレーションは、Azure Recovery Service Vault からメトリクスを収集できますが、ご使用の VM に Datadog Agent をインストールすることを[お勧めします][1]。組織が Datadog の US3 サイトを利用しており、Azure で Datadog リソースを構成している場合、[Azure Native インテグレーション手動セットアップガイド][2]の指示に従ってください。**すべてのサイト**は、[Azure インテグレーション手動セットアップガイド][3]または [Azure プログラム管理ガイド][4]の手順を使用できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][5]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_recovery_service_vault" >}}


### ヘルプ

Azure Recovery Service Vault インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Recovery Service Vault インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。


[1]: https://www.datadoghq.com/blog/dont-fear-the-agent/
[2]: https://docs.datadoghq.com/ja/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent
[3]: https://docs.datadoghq.com/ja/integrations/guide/azure-manual-setup/#agent-installation
[4]: https://docs.datadoghq.com/ja/integrations/guide/azure-programmatic-management/#datadog-azure-vm-extension
[5]: https://docs.datadoghq.com/ja/integrations/azure/
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_recovery_service_vault/azure_recovery_service_vault_metadata.csv
[7]: https://docs.datadoghq.com/ja/help/