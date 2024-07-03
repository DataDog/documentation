---
app_id: hcp-vault
app_uuid: ad48fccf-95f1-4ead-ae7f-efac1757418a
assets:
  dashboards:
    HCPVault Overview: assets/dashboards/hcp_vault_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: hcp_vault.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10223
    source_type_name: HCPVault
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories: []
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/hcp_vault/README.md
display_on_public_website: true
draft: false
git_integration_title: hcp_vault
integration_id: hcp-vault
integration_title: HCP Vault
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: hcp_vault
public_title: HCP Vault
short_description: The HCP Vault integration provides an overview of your Vault clusters
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  configuration: README.md#Setup
  description: The HCP Vault integration provides an overview of your Vault clusters
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: HCP Vault
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

The HCP Vault integration provides an overview of your Vault clusters so you can monitor performance and cluster health.

HCP Vault metrics streaming is available for all production grade cluster tiers. The feature is not available for Development tier clusters.

For details on metrics scope and interpretation, see the [HCP Vault Metrics Guidance][1]

## セットアップ

### インストール

Follow the Configuration instructions below.

### Prerequisites
- A production grade HCP Vault cluster
- Your Datadog region and your [Datadog API key][2]
- An account with Admin or Contributor [role assigned in HCP][3]

### 構成

To enable metrics streaming:

1. From the HCP Vault cluster Overview, select the Metrics view.

   ![Metrics Streaming][4]

2. If you have not yet configured metrics streaming, click Enable streaming.

3. From the Stream Vault metrics view, select Datadog as the provider.

4. Under Datadog configuration, enter your API Key and select the Datadog site region that matches your Datadog environment.

   ![Choose Provider][5]

5. Click Save. 
**Note**: HCP Vault supports metrics streaming to only one metrics endpoint at a time.

6. Navigate to Datadog, and enable the integration by clicking Install on the integration tile. This installs a HCP Vault dashboard with widgets that make the most of your HCP Vault telemetry. You can find the dashboard by searching for "HCP Vault Overview" in the dashboard list.
   **Note**: On the dashboard, give the values of `cluster` & `project_id` to select the metrics for the right cluster. The `cluster` is the name of the cluster that you have set on cluster creation. The `project_id` is the present in the URL on HCP portal `https://portal.cloud.hashicorp.com/orgs/xxxx/projects/xxxx`

## 収集データ

### メトリクス

For details on metrics scope and interpretation, see the [HCP Vault Metrics Guidance][1].

### サービスチェック

The HCP Vault integration does not include any service checks.

### イベント

The HCP Vault integration does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][6].

[1]: https://learn.hashicorp.com/collections/vault/cloud
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[3]: https://cloud.hashicorp.com/docs/hcp/access-control
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/hcp_vault/images/metrics-streaming.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/hcp_vault/images/choose-provider.png
[6]: https://docs.datadoghq.com/ja/help/