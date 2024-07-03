---
app_id: hbase-master
app_uuid: e53ed650-6454-4f69-abfc-2cedd35ec2c3
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hbase.master.assignmentmanager.rit_oldest_age
      metadata_path: metadata.csv
      prefix: hbase.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10228
    source_type_name: HBase master
  logs:
    source: hbase
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: everpeace@gmail.com
  support_email: everpeace@gmail.com
categories:
- data stores
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/hbase_master/README.md
display_on_public_website: true
draft: false
git_integration_title: hbase_master
integration_id: hbase-master
integration_title: Hbase Master
integration_version: 1.1.1
is_public: true
manifest_version: 2.0.0
name: hbase_master
public_title: Hbase Master
short_description: HBase master integration.
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
  - Category::Data Stores
  - Category::Log Collection
  configuration: README.md#Setup
  description: HBase master integration.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Hbase Master
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from Hbase_master service in real time to:

- Visualize and monitor Hbase_master states.
- Be notified about Hbase_master failovers and events.

## セットアップ

The Hbase_master check is not included in the [Datadog Agent][1] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Hbase_master check on your host. See [Use Community Integrations][2] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-hbase_master==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][3].

### 構成

1. Edit the `hbase_master.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][4] to start collecting your Hbase_master [metrics](#metrics). See the [sample hbase_master.d/conf.yaml][5] for all available configuration options.

    **NOTE**: If using Agent 6, be sure to modify the [`hbase_master.d/metrics.yaml`][6] file and wrap boolean keys in quotes.

    ```yaml
      - include:
          domain: Hadoop
          bean:
            - Hadoop:service=HBase,name=Master,sub=Server
          attribute:
            # Is Active Master
            tag.isActiveMaster:
               metric_type: gauge
               alias: hbase.master.server.tag.is_active_master
               values: {"true": 1, "false": 0, default: 0}
    ```

2. [Restart the Agent][7]

### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `hbase_master.d/conf.yaml` file to start collecting your Hbase_master Logs:

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: hbase
   ```

   Change the `path` parameter value and configure it for your environment.
   See the [sample hbase_master.d/conf.yaml][8] for all available configuration options.

3. [Restart the Agent][7].

### Validation

Run the [Agent's status subcommand][8] and look for `hbase_master` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "hbase_master" >}}


### イベント

The Hbase_master check does not include any events.

### サービスチェック

The Hbase_master check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][9].




<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## HBase RegionServer Integration

## Overview

Get metrics from the HBase RegionServer service in real time to:

- Visualize and monitor HBase RegionServer states.
- Be notified about HBase RegionServer failovers and events.

## セットアップ

The HBase RegionServer check is not included in the [Datadog Agent][1] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the HBase RegionServer check on your host. See [Use Community Integrations][2] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-hbase_regionserver==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][3].

### 構成

1. Edit the `hbase_regionserver.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][4] to start collecting your HBase RegionServer [metrics](#metrics). See the [sample hbase_regionserver.d/conf.yaml][10] for all available configuration options.

2. [Restart the Agent][7]

### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `hbase_regionserver.d/conf.yaml` file to start collecting your Hbase_regionserver Logs:

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: hbase
   ```

   Change the `path` parameter value and configure it for your environment.
   See the [sample hbase_regionserver.d/conf.yaml][10] for all available configuration options.

3. [Restart the Agent][7].

## Validation

Run the [Agent's status subcommand][8] and look for `hbase_regionserver` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "hbase_regionserver" >}}


### イベント

The HBase RegionServer check does not include any events.

### サービスチェック

The HBase RegionServer check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][9].



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/conf.yaml.example
[6]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/metrics.yaml
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[9]: http://docs.datadoghq.com/help
[10]: https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/datadog_checks/hbase_regionserver/data/conf.yaml.example