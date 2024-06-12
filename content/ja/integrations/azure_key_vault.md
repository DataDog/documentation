---
aliases:
- /ja/integrations/azure_keyvault
categories:
- cloud
- azure
dependencies: []
description: Azure Key Vault のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_key_vault/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-key-vault-monitoring-events/
  tag: ブログ
  text: Azure Key Vault からの期限切れイベントの監視
git_integration_title: azure_key_vault
has_logo: true
integration_id: azure-keyvault
integration_title: Microsoft Azure Key Vault
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_key_vault
public_title: Datadog-Microsoft Azure Key Vault インテグレーション
short_description: Azure Key Vault のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Key Vault は、クラウドアプリケーションおよびサービスが使用する暗号化キーとシークレットを保護および管理するために使用されます。

Datadog Azure インテグレーションを使用して、Azure Key Vault からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_key_vault" >}}


### ヘルプ

Datadog は*資格情報期限切れイベント*を送信し、Azure アプリ登録、Key Vault キー、Key Vault シークレット、Key Vault 証明書の資格情報の期限切れを視覚化します。Key Vault キー、Key Vault シークレット、Key Vault 証明書のイベントを受信するには、*Azure Key Vault* インテグレーションをインストールする必要があります。

- **期限切れイベント**は、資格情報有効期限の 60 日、30 日、15 日、1 日前に送信され、期限切れ後に 1 回送信されます。
- **権限欠落イベント**は 15 日ごとに送信されます。権限欠落イベントは、Datadog に権限が与えられていない Key Vault をリストアップします。前の 15 日間のサイクルで Key Vault 権限に関して変更が行われていない場合、イベント通知は再度送信されません。

これらのイベントは[イベントエクスプローラー][3]で表示できます。

**注**: 

- Azure アプリ登録期限切れイベントを収集するには、[Microsoft Graph API へのアクセスを有効にします][4]。
- 証明書とそれに関連するキーとシークレットがまったく同時に期限切れになる場合、すべてのリソースに対して 1 つの期限切れイベントが送信されます。

### ヘルプ

Azure Key Vault インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_key_vault/azure_key_vault_metadata.csv
[3]: https://app.datadoghq.com/event/explorer?query=status%3Awarn%20source%3Aazure
[4]: https://docs.datadoghq.com/ja/integrations/guide/azure-graph-api-permissions/
[5]: https://docs.datadoghq.com/ja/help/