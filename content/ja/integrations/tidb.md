---
"app_id": "tidb"
"app_uuid": "79e5c6d7-c494-4df7-98bc-c639e211c0b8"
"assets":
  "dashboards":
    "TiDB Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": tidb_cluster.tidb_executor_statement_total
      "metadata_path": metadata.csv
      "prefix": tidb_cluster
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10172"
    "source_type_name": TiDB
  "logs":
    "source": tidb
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": PingCAP
  "sales_email": xuyifan02@pingcap.com
  "support_email": xuyifan02@pingcap.com
"categories":
- data stores
- cloud
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/tidb/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "tidb"
"integration_id": "tidb"
"integration_title": "TiDB"
"integration_version": "2.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "tidb"
"public_title": "TiDB"
"short_description": "The integration for TiDB cluster"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Data Stores"
  - "Category::Cloud"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": The integration for TiDB cluster
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": TiDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Connect [TiDB][1] cluster to Datadog in order to:

- Collect key TiDB metrics of your cluster.
- Collect logs of your cluster, such as TiDB/TiKV/TiFlash logs and slow query logs.
- Visualize cluster performance on the provided dashboard.

> **Note**:
>
> - TiDB 4.0+ is required for this integration. 
> - For TiDB Cloud, see the [TiDB Cloud Integration][2].

## Setup

### Installation

First, [download and launch the Datadog Agent][3].

Then, manually install the TiDB check. [Instructions vary depending on the environment][4]. 

Run `datadog-agent integration install -t datadog-tidb==<INTEGRATION_VERSION>`.

### Configuration

##### Metric collection

1. Edit the `tidb.d/conf.yaml` file in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your TiDB performance data. See the [sample tidb.d/conf.yaml][5] for all available configuration options.

  The [sample tidb.d/conf.yaml][5] only configures the PD instance. You need to manually configure the other instances in the TiDB cluster. Like this:

  ```yaml
  init_config:

  instances:

    - pd_metric_url: http://localhost:2379/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tidb_metric_url: http://localhost:10080/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tikv_metric_url: http://localhost:20180/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tiflash_metric_url: http://localhost:8234/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tiflash_proxy_metric_url: http://localhost:20292/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01
  ```

3. [Restart the Agent][6].

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `tidb.d/conf.yaml` file to start collecting your TiDB logs:

   ```yaml
   logs:
    # pd log
    - type: file
      path: "/tidb-deploy/pd-2379/log/pd*.log"
      service: "tidb-cluster"
      source: "pd"

    # tikv log
    - type: file
      path: "/tidb-deploy/tikv-20160/log/tikv*.log"
      service: "tidb-cluster"
      source: "tikv"

    # tidb log
    - type: file
      path: "/tidb-deploy/tidb-4000/log/tidb*.log"
      service: "tidb-cluster"
      source: "tidb"
      exclude_paths:
        - /tidb-deploy/tidb-4000/log/tidb_slow_query.log
    - type: file
      path: "/tidb-deploy/tidb-4000/log/tidb_slow_query*.log"
      service: "tidb-cluster"
      source: "tidb"
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_datetime
          pattern: '#\sTime:'
      tags:
        - "custom_format:tidb_slow_query"

    # tiflash log
    - type: file
      path: "/tidb-deploy/tiflash-9000/log/tiflash*.log"
      service: "tidb-cluster"
      source: "tiflash"
   ```

   Change the `path` and `service` according to your cluster's configuration. 

   Use these commands to show all log path:

   ```shell
   # show deploying directories
   tiup cluster display <YOUR_CLUSTER_NAME>
   # find specific logging file path by command arguments
   ps -fwwp <TIDB_PROCESS_PID/PD_PROCESS_PID/etc.>
   ```

3. [Restart the Agent][6].

### Validation

Run the [Agent's status subcommand][7] and look for `tidb` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "tidb" >}}


> It is possible to use the `metrics` configuration option to collect additional metrics from a TiDB cluster.

### Events

TiDB check does not include any events.

### Service Checks
{{< get-service-checks-from-git "tidb" >}}


## Troubleshooting

### Missing CPU and Memory metrics for TiKV and TiFlash instances on macOS

CPU and Memory metrics are not provided for TiKV and TiFlash instances in the following cases:

- Running TiKV or TiFlash instances with [tiup playground][10] on macOS.
- Running TiKV or TiFlash instances with [docker-compose up][11] on a new Apple M1 machine.

### Too many metrics

The TiDB check enables Datadog's `distribution` metric type by default. This part of data is quite large and may consume lots of resources. You can modify this behavior in `tidb.yml` file:

- `send_distribution_buckets: false`

Since there are many important metrics in a TiDB cluster, the TiDB check sets `max_returned_metrics` to `10000` by default. You can decrease `max_returned_metrics` in `tidb.yml` file if necessary:

- `max_returned_metrics: 1000`

Need help? Contact [Datadog support][12].

[1]: https://docs.pingcap.com/tidb/stable
[2]: https://docs.datadoghq.com/integrations/tidb_cloud/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/agent/guide/community-integrations-installation-with-docker-agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/tidb/datadog_checks/tidb/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/tidb/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/tidb/assets/service_checks.json
[10]: https://docs.pingcap.com/tidb/stable/tiup-playground
[11]: https://github.com/DataDog/integrations-extras/tree/master/tidb/tests/compose
[12]: https://docs.datadoghq.com/help/

