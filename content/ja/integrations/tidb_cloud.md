---
app_id: tidb-cloud
app_uuid: 9ed710d3-49d4-41fa-a304-0b27f289bdb7
assets:
  dashboards:
    TiDB Cloud Overview: assets/dashboards/overview.json
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: tidb_cloud.db_queries_total
      metadata_path: metadata.csv
      prefix: tidb_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: TiDB Cloud
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: PingCAP
  sales_email: xuyifan02@pingcap.com
  support_email: xuyifan02@pingcap.com
categories:
- cloud
- data store
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/tidb_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: tidb_cloud
integration_id: tidb-cloud
integration_title: TiDB Cloud
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: tidb_cloud
public_title: TiDB Cloud
short_description: Datadog による TiDB Cloud クラスターのモニタリング
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
  - Category::Data Store
  configuration: README.md#Setup
  description: Datadog による TiDB Cloud クラスターのモニタリング
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TiDB Cloud
---



## 概要

[TiDB Cloud][1] は、オープンソースデータベースである TiDB のフルマネージドクラウドサービスです。

TiDB Cloud と Datadog のインテグレーションを使用して、TiDB Cloud クラスターから Datadog にメトリクスをエクスポートします。

> **注:**
>
> - オンプレミスの TiDB クラスターについては、[TiDB インテグレーション][2]を参照してください。

## セットアップ

クラスターに対して TiDB Cloud と Datadog のインテグレーションを設定するには、Datadog API キーとリージョンを TiDB Cloud に提供します。

TiDB Cloud プロジェクトの Datadog インテグレーションを構成するには、[TiDB Cloud Preferences][3] を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "tidb_cloud" >}}


### サービスのチェック

TiDB Cloud インテグレーションには、サービスのチェック機能は含まれません。

### イベント

TiDB Cloud インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://tidbcloud.com
[2]: https://docs.datadoghq.com/ja/integrations/tidb/
[3]: https://tidbcloud.com/console/preferences
[4]: https://github.com/DataDog/integrations-extras/blob/master/tidb_cloud/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/