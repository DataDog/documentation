---
app_id: tidb-cloud
app_uuid: 9ed710d3-49d4-41fa-a304-0b27f289bdb7
assets:
  dashboards:
    TiDB Cloud Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: tidb_cloud.db_queries_total
      metadata_path: metadata.csv
      prefix: tidb_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10247
    source_type_name: TiDB Cloud
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: PingCAP
  sales_email: xuyifan02@pingcap.com
  support_email: xuyifan02@pingcap.com
categories:
- cloud
- data stores
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/tidb_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: tidb_cloud
integration_id: tidb-cloud
integration_title: TiDB Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: tidb_cloud
public_title: TiDB Cloud
short_description: Monitoring TiDB Cloud clusters with Datadog
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
  - Category::Cloud
  - Category::Data Stores
  configuration: README.md#Setup
  description: Monitoring TiDB Cloud clusters with Datadog
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TiDB Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[TiDB Cloud][1] is a fully managed cloud service of TiDB, an open-source database.

Use the TiDB Cloud Datadog integration to export metrics from TiDB Cloud clusters to Datadog.

> **Note:**
>
> - For TiDB clusters on premises, see the [TiDB Integration][2].

## セットアップ

To set up the TiDB Cloud Datadog integration for your cluster, provide a Datadog API key and region to TiDB Cloud.

See [TiDB Cloud Preferences][3] to configure the Datadog integration for your TiDB Cloud project.

## 収集データ

### メトリクス
{{< get-metrics-from-git "tidb_cloud" >}}


### サービスチェック

The TiDB Cloud integration does not include any service checks.

### イベント

The TiDB Cloud integration does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://tidbcloud.com
[2]: https://docs.datadoghq.com/ja/integrations/tidb/
[3]: https://tidbcloud.com/console/preferences
[4]: https://github.com/DataDog/integrations-extras/blob/master/tidb_cloud/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/