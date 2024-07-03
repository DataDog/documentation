---
app_id: celerdata
app_uuid: 790d8932-0833-43ac-b9d8-d6d0a4f11517
assets:
  dashboards:
    CelerData Default Dashboard: assets/dashboards/CelerData.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: celerdata.fe.job
      metadata_path: metadata.csv
      prefix: celerdata.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10130457
    source_type_name: celerdata
author:
  homepage: https://celerdata.com
  name: CelerData
  sales_email: Sales@celerdata.com
  support_email: support@celerdata.com
categories:
- log collection
- data stores
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/celerdata/README.md
display_on_public_website: true
draft: false
git_integration_title: celerdata
integration_id: celerdata
integration_title: CelerData
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: celerdata
public_title: CelerData
short_description: Gathers CelerData metrics and logs
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Data Stores
  - Offering::Integration
  - Supported OS::Linux
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Gathers CelerData metrics and logs
  media:
  - caption: CelerData Dashboard
    image_url: images/celerdata-dashboard.png
    media_type: image
  - caption: CelerData Logs
    image_url: images/celerdata-logs.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: CelerData
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[CelerData][1] is the enterprise version of the open source OLAP database StarRocks.  StarRocks/CelerData is designed for low latency analytics directly on your data lake house.

This integration allows users to collect metrics and logs. By leveraging this integration, customers can gain insights into query performance, system health, and resource utilization, enabling them to have visibility into the database.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

To collect StarRocks [metrics][3] and logs:

1. Download and install the [Datadog Agent][4].
2. Install the CelerData check on your host with the following command:

   ```shell
   datadog-agent integration install -t datadog-celerdata==1.0.0
   ```

### Configuration

1. Edit the `celerdata.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory, to start collecting metrics and logs. See the [celerdata.d/conf.yaml.example][5] for all available configuration options.

2. Datadog listens on port 5000 for the `dogstatsd_stats_port` and `expvar_port`. In your `celerdata.conf` file, you will need to change the `server.discovery.listen_address` and the `server.discovery.advertised_address` to use a port other than 5000.

3. [Restart the Agent][6].

### Validation

[Run the Agent's status subcommand][7] and look for `celerdata` under the Checks section.

## 収集データ

### Metrics
{{< get-metrics-from-git "celerdata" >}}


### Events

The CelerData integration does not include any events.

## Troubleshooting

Need help? Contact [CelerData support][10].

[1]: https://celerdata.com/
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://docs.starrocks.io/docs/administration/metrics/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-extras/blob/master/celerdata/datadog_checks/celerdata/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/celerdata/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/celerdata/service_checks.json
[10]: mailto:support@celerdata.com