---
aliases:
- /ja/integrations/azure_loadbalancer
categories:
- cloud
- azure
custom_kind: インテグレーション
dependencies: []
description: Track key Azure Load Balancer metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_load_balancer/
draft: false
git_integration_title: azure_load_balancer
has_logo: true
integration_id: azure-load-balancer
integration_title: Microsoft Azure Load Balancer
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_load_balancer
public_title: Datadog-Microsoft Azure Load Balancer Integration
short_description: Track key Azure Load Balancer metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Load Balancer supports inbound and outbound scenarios, provides low latency and high throughput, and scales up to millions of flows for all TCP and UDP applications.

Use the Datadog Azure integration to collect metrics from Azure Load Balancer.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_load_balancer" >}}


### イベント

The Azure Load Balancer integration does not include any events.

### サービスチェック

The Azure Load Balancer integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_load_balancer/azure_load_balancer_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/