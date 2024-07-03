---
app_id: singlestoredb-cloud
app_uuid: c7638089-0864-4ddc-bd32-b731c58fe567
assets:
  dashboards:
    singlestoredb_cloud_overview: assets/dashboards/singlestoredb_cloud_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: singlestoredb_cloud.cpu_resource_limits
      metadata_path: metadata.csv
      prefix: singlestoredb_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10373
    source_type_name: SinglestoreDB Cloud
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.singlestore.com
  name: Singlestore
  sales_email: info@singlestore.com
  support_email: support@singlestore.com
categories:
- data stores
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/singlestoredb_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: singlestoredb_cloud
integration_id: singlestoredb-cloud
integration_title: SingleStoreDB Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: singlestoredb_cloud
public_title: SingleStoreDB Cloud
short_description: Send your SinglestoreDB Cloud metrics to Datadog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Send your SinglestoreDB Cloud metrics to Datadog
  media:
  - caption: SinglestoreDB Cloud - Dashboard
    image_url: images/singlestoredb-cloud-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SingleStoreDB Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview

SingleStoreDB Cloud is a distributed, relational database with optimized speed and scalability to support data-intensive and real-time applications. Using this integration, you can monitor the overall health and performance of a SinglestoreDB Cloud Workspace Group/Cluster. To integrate Datadog with SingleStoreDB Cloud, install the Datadog SingleStore integration and then configure it in the [Cloud Portal][1]. 

Connect SinglestoreDB Cloud to Datadog in order to:

- Visualize key SinglestoreDB Cloud metrics
- Improve resource utilization efficiency
- Observe query rate & performance
- Correlate SinglestoreDB performance with the rest of your applications

## セットアップ

### Install the SingleStoreDB Cloud integration in Datadog

1. Navigate to the [SingleStoreDB Cloud][2] integration tile in Datadog.
3. Select **Install Integration** and wait for installation to complete before proceeding.
4. On the **Configure** tab, select **Connect Accounts**. This action takes you to the [Cloud Portal][1] to authorize the integration through OAuth.

The steps above only need to be performed once to connect your first workspace group with Datadog. Once the integration is installed and the accounts are connected, follow the steps specified under [Configure the Datadog Integration in the Cloud Portal](#configure-the-datadog-integration-in-the-cloud-portal) to connect consecutive workspace groups. 

### Configure the Datadog integration in the Cloud Portal

To connect your SingleStoreDB Cloud workspace group with Datadog:

1. Sign in to the Cloud Portal. Upon signing in, you are taken to the **Integration** page. You can also select **Monitoring > Integration** on the left navigation pane to access this page.
2. From the list of available integrations, select **+ Integration** for Datadog.
3. On the **Create Datadog Integration** dialog, from the **Workspace Group** list, select your workspace group.
4. Select **Create**. This action takes you to the Datadog sign-in page. After signing in to Datadog, proceed to the next step.
5. On the **Authorize access** screen, select the **Authorize** button. Upon successful authorization, you are taken to the **Integration** page on the Cloud Portal. 

You can now monitor your SingleStoreDB Cloud databases using Datadog.

### Uninstall the Datadog integration

Follow these steps to uninstall the Datadog integration:

1. **Uninstall the SingleStoreDB Cloud integration on Datadog**: In Datadog, navigate to the [SingleStore DB Cloud integration tile][2] and click **Uninstall Integration**. Once this integration is uninstalled, all previous authorizations are revoked.
2. **Remove the Datadog integration on the SingleStore Cloud Portal**: On the Cloud Portal, go to **Monitoring > Integration**. Select **Delete** for each Datadog configuration you want to remove. 

Additionally, remove all the API keys associated with this integration.

To stop monitoring a specific workspace group (and retain the integration), navigate to the SingleStore DB Cloud Portal and select **Delete** (**Cloud Portal > Monitoring > Integration**) to remove the Datadog configuration for this workspace group.

## 収集データ

### メトリクス
{{< get-metrics-from-git "singlestoredb_cloud" >}}


### サービスチェック

SingleStoreDB Cloud does not include any service checks. 

### イベント

SingleStoreDB Cloud does not include any events. 

## トラブルシューティング

Need help? Contact [Datadog support][4].


[1]: https://portal.singlestore.com
[2]: https://app.datadoghq.com/integrations/singlestoredb-cloud
[3]: https://github.com/DataDog/integrations-extras/blob/master/singlestoredb_cloud/metadata.csv
[4]: https://docs.datadoghq.com/ja/help/