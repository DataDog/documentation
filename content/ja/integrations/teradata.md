---
app_id: teradata
app_uuid: 8cac0599-64ca-4a46-8c68-1c5db6cc65ca
assets:
  dashboards:
    Teradata Overview: assets/dashboards/teradata_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: teradata.disk_space.curr_perm.total
      metadata_path: metadata.csv
      prefix: teradata.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10275
    source_type_name: Teradata
  monitors:
    High disk space: assets/monitors/high_disk_space.json
    Low ready threads: assets/monitors/low_ready_threads.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- data stores
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/teradata/README.md
display_on_public_website: true
draft: false
git_integration_title: teradata
integration_id: teradata
integration_title: Teradata
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: teradata
public_title: Teradata
short_description: Monitor the health and performance of your Teradata Vantage Database.
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Supported OS::Linux
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Monitor the health and performance of your Teradata Vantage Database.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Teradata
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

[Teradata][1] is an enterprise-level relational database management system within a multi-cloud data platform. 

This check monitors Teradata through the Datadog Agent. Enable the Datadog-Teradata integration to view Teradata performance, disk usage, and resource consumption.

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### インストール

The Teradata check is included in the [Datadog Agent][3] package.

#### Prepare Teradata

1. Download and install the [Teradata SQL Driver for Python][4] using the embedded agent pip command for your [operating system][5]:

**Linux**

```
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install teradatasql
```

**Windows**

```
%PROGRAMFILES%\Datadog\"Datadog Agent"\embedded<PYTHON_MAJOR_VERSION>\python -m pip install teradatasql
```

2. Create a read-only `datadog` user with proper access to your Teradata Database. Start a `BTEQ` session on your Teradata Database:

```shell
CREATE USER "datadog" AS PASSWORD="<PASSWORD>";
```

Optional, but strongly recommended: Grant a new or existing role to the `datadog` user designated for read-only monitoring purposes. 

```shell
GRANT "<READ_ONLY_ROLE>" TO "datadog"; 
```

The Teradata system grants the `SELECT` privilege to PUBLIC on most [Data Dictionary views][12] by default. All Teradata Database users have `PUBLIC` privileges.

3. To collect resource usage metrics, enable the [SPMA Resource Usage Table][6]. This is done with the [`ctl` Teradata Utility][7]:

```shell
# Start ctl session
ctl

# View RSS screen
screen rss

# Enable SPMA resource usage table
SPMA=yes

# Save the configuration setting
write
```

Note: The SPMA Resource Table logs statistics every 10 minutes by default. The logging interval can be configured in the `rss` screen using `ctl`. Resource Usage logging may impact database performance. To reduce the frequency of Resource Usage logging, increase the logging interval of the `Node Logging Rate` setting. See the Teradata [documentation][8] for more information on Resource Usage Logging.

4. The Teradata integration collects disk space metrics from the DBC.DiskSpaceV system view by default. To collect additional disk space metrics on your database tables, enable the `collect_table_disk_metrics` option. 

```
collect_table_disk_metrics: true
```

To filter the monitored tables, configure the `tables` option:

Specify tables to monitor with a list:

```
tables:
    - <TABLE_1>
    - <TABLE_2>
```

Customize your monitored tables by specifying a map with the `include` and `exclude` options:

```
tables:
    include:
        - <TABLE_1>
        - <TABLE_2>
    exclude:
        - <TABLE_3>
```

### 構成

1. Edit the `teradata.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your teradata performance data. See the [sample teradata.d/conf.yaml][9] for all available configuration options.

2. [Restart the Agent][10].

### Validation

[Run the Agent's status subcommand][11] and look for `teradata` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "teradata" >}}


### イベント

The Teradata integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "teradata" >}}


## トラブルシューティング

Need help? Contact [Datadog support][14].


[12]:https://docs.teradata.com/r/Teradata-VantageTM-Data-Dictionary/July-2021/Data-Dictionary-Views/Access-to-Data-Dictionary-Views/Default-PUBLIC-Privileges-for-Views
[1]: https://www.teradata.com/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/Teradata/python-driver#Installation
[5]: https://docs.datadoghq.com/ja/developers/guide/custom-python-package/?tab=linux#pagetitle
[6]: https://docs.teradata.com/r/Teradata-VantageTM-Resource-Usage-Macros-and-Tables/July-2021/ResUsageSpma-Table
[7]: https://docs.teradata.com/r/Teradata-VantageTM-Database-Utilities/July-2021/Control-GDO-Editor-ctl/Ctl-Commands/SCREEN
[8]: https://docs.teradata.com/r/Teradata-VantageTM-Resource-Usage-Macros-and-Tables/July-2021/Planning-Your-Resource-Usage-Data/Resource-Usage-Logging
[9]: https://github.com/DataDog/integrations-core/blob/master/teradata/datadog_checks/teradata/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/teradata/metadata.csv
[13]: https://github.com/DataDog/integrations-core/blob/master/teradata/assets/service_checks.json
[14]: https://docs.datadoghq.com/ja/help/