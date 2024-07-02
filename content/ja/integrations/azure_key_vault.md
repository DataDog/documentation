---
"aliases":
- /integrations/azure_keyvault
"categories":
- cloud
- azure
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure Key Vault metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_key_vault/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/azure-key-vault-monitoring-events/"
  "tag": Blog
  "text": Monitor expiration events from Azure Key Vault
"git_integration_title": "azure_key_vault"
"has_logo": true
"integration_id": "azure-keyvault"
"integration_title": "Microsoft Azure Key Vault"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_key_vault"
"public_title": "Datadog-Microsoft Azure Key Vault Integration"
"short_description": "Track key Azure Key Vault metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Key Vault is used to safeguard and manage cryptographic keys and secrets used by cloud applications and services.

Use the Datadog Azure integration to collect metrics from Azure Key Vault.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_key_vault" >}}


### イベント

Datadog sends *credential expiry events*, which grant visibility into credential expirations for Azure app registrations, Key Vault keys, Key Vault secrets, and Key Vault certificates. The *Azure Key Vault* integration must be installed to receive events for Key Vault keys, Key Vault secrets, and Key Vault certificates.

- **Expiration events** are sent 60, 30, 15, and 1 day(s) before credential expiration, and once after expiration.
- **Missing permission events** are sent every 15 days. A missing permission event lists the Key Vaults for which Datadog has not been given permissions. If no changes have been made regarding Key Vault permissions in the previous 15-day cycle, the event notification is not sent again.

You can view these events in [Event Explorer][3].

**Notes**: 

- To collect Azure app registration expiration events, [enable access to the Microsoft Graph API][4].
- If a certificate and its associated key and secret expire at the exact same time, one expiration event is sent for all resources.

### サービスチェック

The Azure Key Vault integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_key_vault/azure_key_vault_metadata.csv
[3]: https://app.datadoghq.com/event/explorer?query=status%3Awarn%20source%3Aazure
[4]: https://docs.datadoghq.com/integrations/guide/azure-graph-api-permissions/
[5]: https://docs.datadoghq.com/help/

