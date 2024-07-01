---
"app_id": "singlestore"
"app_uuid": "5e8c3b5f-278f-4423-90d9-969c06a478eb"
"assets":
  "dashboards":
    "Singlestore Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": singlestore.bytes_received
      "metadata_path": metadata.csv
      "prefix": singlestore.
    "process_signatures":
    - memsqld
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10215"
    "source_type_name": SingleStore
  "monitors":
    "[SingleStore] License expiration": assets/monitors/license_expiration.json
    "[SingleStore] Read failures rate": assets/monitors/read_failures.json
    "[SingleStore] Write failures rate": assets/monitors/write_failures.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- data stores
- log collection
- network
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/singlestore/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "singlestore"
"integration_id": "singlestore"
"integration_title": "SingleStore"
"integration_version": "2.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "singlestore"
"public_title": "SingleStore"
"short_description": "Collect SingleStore metrics from leaves and aggregators."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Data Stores"
  - "Category::Log Collection"
  - "Category::Network"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Collect SingleStore metrics from leaves and aggregators.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": SingleStore
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [SingleStore][1] through the Datadog Agent. SingleStore offers transactional and analytical processing of stored data. Enable the Datadog-SingleStoreDB integration to:

- Understand the health of clusters and nodes through metrics and events.
- Address drops in storage capacity.
- Improve resource utilization efficiency.


## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

The SingleStore check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

### Configuration

#### Host

##### Metric collection
1. Edit the `singlestore.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your SingleStore performance data. See the [sample singlestore.d/conf.yaml][4] for all available configuration options.

2. [Restart the Agent][5].

**Note**: By default, the SingleStore integration only collects metrics from the `MV_GLOBAL_STATUS`, `AGGREGATORS`, and `LEAVES` tables. To collect additional system level metrics (CPU, disk, network IO, and memory), set `collect_system_metrics: true`  in your `singlestore.d/conf.yaml` file.

##### Log collection


{{< site-region region="us3" >}}
**Log collection is not supported for this site.**
{{< /site-region >}}


1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Add the log files you are interested in to your `singlestore.d/conf.yaml` file to start collecting your SingleStore logs:

   ```yaml
     logs:
       - type: file
         path: /var/lib/memsql/<NODE_ID>/tracelogs/memsql.log
         source: singlestore
         service: "<SERVICE_NAME>"
   ```

    Change the `path` and `service` parameter values and configure them for your environment. See the [sample singlestore.d/conf.yaml][4] for all available configuration options.

3. [Restart the Agent][5].

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying the parameters below.

#### Metric collection

| Parameter            | Value                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `singlestore`                                                   |
| `<INIT_CONFIG>`      | blank or `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port": "%%port%%", "username": "<USER>", "password": "<PASSWORD>"}`       |

##### Log collection


{{< site-region region="us3" >}}
**Log collection is not supported for this site.**
{{< /site-region >}}


Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][6].

| Parameter      | Value                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "singlestore", "service": "<SERVICE_NAME>"}` |


### Validation

[Run the Agent's status subcommand][7] and look for `singlestore` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "singlestore" >}}



### Events

The SingleStore integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "singlestore" >}}


## Troubleshooting

Need help? Contact [Datadog support][10].


[1]: https://www.singlestore.com/
[2]: https://docs.datadoghq.com/getting_started/agent/autodiscovery#integration-templates
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/singlestore/datadog_checks/singlestore/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/singlestore/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/singlestore/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/

