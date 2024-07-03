---
aliases:
- /ja/integrations/azure_publicipaddress
categories:
- cloud
- azure
custom_kind: インテグレーション
dependencies: []
description: Track key Azure Public IP Address metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_public_ip_address/
draft: false
git_integration_title: azure_public_ip_address
has_logo: true
integration_id: azure-publicipaddress
integration_title: Microsoft Azure Public IP Address
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_public_ip_address
public_title: Datadog-Microsoft Azure Public IP Address Integration
short_description: Track key Azure Public IP Address metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

When an Azure Public IP Address is assigned to a resource, it enables inbound communication and outbound connectivity from the Internet.

Use the Datadog Azure integration to collect metrics from Azure Public IP Address.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_public_ip_address" >}}


### イベント

The Azure Public IP Address integration does not include any events.

### サービスチェック

The Azure Public IP Address integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_public_ip_address/azure_public_ip_address_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/