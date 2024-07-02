---
"app_id": "yugabytedb-managed"
"app_uuid": "c5cf1ad4-fa3f-4835-9f3b-f467288b382a"
"assets":
  "dashboards":
    "yugabytedb_managed_overview": assets/dashboards/yugabytedb_managed_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": ybdb.up
      "metadata_path": metadata.csv
      "prefix": ybdb.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10408"
    "source_type_name": YugabyteDB Managed
"author":
  "homepage": "https://yugabyte.com/"
  "name": YugabyteDB
  "sales_email": sales@yugabyte.com
  "support_email": support@yugabyte.com
"categories":
- data stores
- cloud
- aws
- azure
- google cloud
- モニター
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/yugabytedb_managed/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "yugabytedb_managed"
"integration_id": "yugabytedb-managed"
"integration_title": "YugabyteDB Managed"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "yugabytedb_managed"
"public_title": "YugabyteDB Managed"
"short_description": "Export YugabyteDB Managed cluster metrics to Datadog"
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Data Stores"
  - "Supported OS::Linux"
  - "Category::Cloud"
  - "Category::AWS"
  - "Category::Azure"
  - "Category::Google Cloud"
  - "Category::Metrics"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Export YugabyteDB Managed cluster metrics to Datadog
  "media":
  - "caption": The YugabyteDB Managed Overview dashboard
    "image_url": images/overview.png
    "media_type": image
  - "caption": Graphs to monitor YSQL metrics
    "image_url": images/ysql.png
    "media_type": image
  - "caption": Graphs to monitor YCQL metrics
    "image_url": images/ycql.png
    "media_type": image
  - "caption": Graphs to monitor node/infrastructure metrics
    "image_url": images/infrastructure.png
    "media_type": image
  - "caption": Graphs to monitor master server metrics
    "image_url": images/master.png
    "media_type": image
  - "caption": Graphs to monitor tablet-server metrics
    "image_url": images/tserver.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": YugabyteDB Managed
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[YugabyteDB][1] is a cloud-native, distributed database that is API compatible with PostgreSQL.

[YugabyteDB Managed][2] is YugabyteDB's fully-managed Database-as-a-service (DBaaS). With this integration, you can send your cluster metrics to Datadog for visibility into the health and performance of your YugabyteDB Managed clusters. This integration comes with an out-of-the-box dashboard to provide visibility into all the most important metrics needed to monitor the health and performance of a YugabyteDB Managed cluster such as:
- Node resource usage (disk, memory, CPU, networking, and more).
- Read/write operation throughput and latencies (both YSQL and YCQL).
- Advanced Master and Tablet Server telemetry (for example, internal RPC throughput/latencies and WAL read/write throughput).

## セットアップ
**Note**: This feature is not available for [Sandbox Clusters][3].

### インストール

To enable the YugabyteDB Managed integration with Datadog:

#### Create a configuration
1. In YugabyteDB Managed, navigate to the **Integrations > Metrics** tab.
2. Click **Create Export Configuration** or **Add Export Configuration**.
3. Select the **Datadog** provider.
4. Fill in the **API key** and **Site** fields with the corresponding values. For more information, see the [Datadog API and Application Keys][4] and [Datadog Site URL][5] documentation.
5. Click **Test Configuration** to validate the configuration.
6. Click **Create Configuration**.

#### Associate a configuration to a cluster
1. In YugabyteDB Managed, navigate to the **Integrations > Metrics** tab.
2. Find your cluster in the **Export Metrics by Cluster** table.
3. Select the desired configuration from the **Export Configuration** dropdown menu.
4. Wait for the **Export Status** to show `Active`.

**Note**: Your cluster cannot associate a configuration when paused or when another operation is in progress.

For more information on setup, see the [YugabyteDB documentation][6].

## Uninstallation

To disable metrics being exported to Datadog:
1. In YugabyteDB Managed, navigate to the **Integrations > Metrics** tab.
2. Find your cluster in the **Export Metrics by Cluster** table.
3. Open the dropdown for your cluster under the **Export Configuration** dropdown and select `None`.
4. Wait for the **Export Status** to show `-`.

**Note**: Your cluster cannot associate a configuration when paused or when another operation is in progress.

## 収集データ

### メトリクス
{{< get-metrics-from-git "yugabytedb_managed" >}}


### サービスチェック

YugabyteDB Managed does not include any service checks.

### イベント

YugabyteDB Managed does not include any events.

## Support

Need help? Contact [YugabyteDB support][8].


[1]: https://yugabyte.com/
[2]: https://www.yugabyte.com/managed/
[3]: https://docs.yugabyte.com/preview/yugabyte-cloud/cloud-basics/create-clusters/create-clusters-free/
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token
[5]: https://docs.datadoghq.com/getting_started/site/
[6]: https://docs.yugabyte.com/preview/yugabyte-cloud/cloud-monitor/metrics-export/#datadog
[7]: https://github.com/DataDog/integrations-extras/blob/master/yugabytedb_managed/metadata.csv
[8]: https://support.yugabyte.com/hc/en-us/requests/new

