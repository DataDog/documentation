---
app_id: couchbase
app_uuid: e7fac1cd-65ba-4a58-af73-ee5f160cc6f9
assets:
  dashboards:
    couchbase: assets/dashboards/couchbase_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: couchbase.ram.used
      metadata_path: metadata.csv
      prefix: couchbase.
    process_signatures:
    - beam.smp couchbase
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 59
    source_type_name: Couchbase
  logs:
    source: couchdb
  saved_views:
    couchbase_processes: assets/saved_views/couchbase_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- data stores
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/couchbase/README.md
display_on_public_website: true
draft: false
git_integration_title: couchbase
integration_id: couchbase
integration_title: CouchBase
integration_version: 3.2.1
is_public: true
manifest_version: 2.0.0
name: couchbase
public_title: CouchBase
short_description: Track and graph your Couchbase activity and performance metrics.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Track and graph your Couchbase activity and performance metrics.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CouchBase
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Couchbase Bytes Read][1]

## Overview

Identify busy buckets, track cache miss ratios, and more. This Agent check collects metrics like:

- Hard disk and memory used by data
- Current connections
- Total objects
- Operations per second
- Disk write queue size

And many more.

## セットアップ

### インストール

The Couchbase check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your Couchbase nodes.

### 構成

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `couchbase.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to start collecting your Couchbase data. See the [sample couchbase.d/conf.yaml][2] for all available configuration options.

   ```yaml
   init_config:

   instances:
     ## @param server - string - required
     ## The server's url.
     #
     - server: http://localhost:8091
   ```

2. [Restart the Agent][3].

#### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `couchbase.d/conf.yaml` file to start collecting your Couchbase Logs:

   ```yaml
   logs:
     - type: file
       path: /opt/couchbase/var/lib/couchbase/logs/couchdb.log
       source: couchdb
   ```

    Change the `path` and `service` parameter values and configure them for your environment. See the [sample couchbase.d/conf.yaml][2] for all available configuration options.

3. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `couchbase`                          |
| `<INIT_CONFIG>`      | blank or `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"server": "http://%%host%%:8091"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's `status` subcommand][3] and look for `couchbase` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "couchbase" >}}


### イベント

The Couchbase check emits an event to Datadog each time the cluster is rebalanced.

### サービスチェック
{{< get-service-checks-from-git "couchbase" >}}


## トラブルシューティング

Need help? Contact [Datadog support][4].

## Further Reading

- [Monitor key Couchbase metrics][5].


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couchbase/images/couchbase_graph.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/monitoring-couchbase-performance-datadog