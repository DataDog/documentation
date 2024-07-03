---
categories:
- azure
- cloud
- network
custom_kind: インテグレーション
dependencies: []
description: Track key Azure Virtual Network metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_virtual_networks/
draft: false
git_integration_title: azure_virtual_networks
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Virtual Network
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_virtual_networks
public_title: Datadog-Microsoft Azure Virtual Network Integration
short_description: Track key Azure Virtual Network metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Virtual Network is the fundamental building block for your private network in Azure. Virtual Network enables many types of Azure resources, such as Azure Virtual Machines, to securely communicate with each other, the internet, and on-premises networks. Use Datadog to monitor your available address space to avoid running out of space at critical times.

Get metrics from Azure Virtual Network to:

* Monitor the number of allocated and unallocated addresses for your virtual networks.
* Track the number of total vs connected network peerings.
* Track the number of addresses available vs assigned within your subnets.
* Avoid running out of address space at critical times.

**The metrics from this integration are not available from Azure Monitor**. Datadog generates them by querying Azure metadata APIs and converting the responses to timeseries data points. They are provided in Datadog as standard metrics from the Azure integration.

## セットアップ

**Note**: Usages for gateway subnets are not supported by Azure and return a value of (-1) for both available and assigned address space. Be sure to take this into account when looking at aggregate usage across virtual networks containing gateway subnets.

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure_virtual_networks" >}}


### イベント
The Azure Virtual Network integration does not include any events.

### サービスチェック
The Azure Virtual Network integration does not include any service checks.

## トラブルシューティング
Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_virtual_networks/azure_virtual_networks_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/