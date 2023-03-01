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
kind: integration
manifest_version: '1.0'
name: azure_recovery_service_vault
public_title: Datadog-Azure Recovery Service Vault インテグレーション
short_description: Azure Recovery Service Vault のキーメトリクスを追跡します。
version: '1.0'
---

## 概要

Azure Recovery Service Vault インテグレーションは、Microsoft Azure 上で動作する Recovery Service Vault の健全性を監視するのに役立ちます。

Datadog Azure インテグレーションは、Azure Recovery Service Vault からメトリクスを収集できますが、[ご使用の VM に Datadog Agent をインストール][2]することを[お勧めします][1]。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][3]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_recovery_service_vault" >}}


### イベント

Azure Recovery Service Vault インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Recovery Service Vault インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://www.datadoghq.com/blog/dont-fear-the-agent/
[2]: https://docs.datadoghq.com/ja/integrations/azure/#agent-installation
[3]: https://docs.datadoghq.com/ja/integrations/azure/
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_recovery_service_vault/azure_recovery_service_vault_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/