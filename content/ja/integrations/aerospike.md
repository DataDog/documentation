---
"app_id": "aerospike"
"app_uuid": "68799442-b764-489c-8bbd-44cb11a15f4e"
"assets":
  "dashboards":
    "Aerospike Overview": "assets/dashboards/overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "aerospike.uptime"
      - "aerospike.namespace.memory_free_pct"
      "metadata_path": "metadata.csv"
      "prefix": "aerospike."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10067"
    "source_type_name": "Aerospike"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "data stores"
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/aerospike/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "aerospike"
"integration_id": "aerospike"
"integration_title": "Aerospike"
"integration_version": "2.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "aerospike"
"public_title": "Aerospike"
"short_description": "Collect cluster and namespaces statistics from the Aerospike database"
"supported_os":
- "linux"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Category::Data Stores"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": "Collect cluster and namespaces statistics from the Aerospike database"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Aerospike"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Get metrics from Aerospike Database in real time to:

- Visualize and monitor Aerospike states.
- Be notified about Aerospike failovers and events.

## Setup

NOTE: The current aerospike integration is only compatible with Aerospike server v4.9 or above, see Aerospike's [Python Client Library Release Notes][1] for more info.
If you use an older Aerospike server version, it is still possible to monitor it with version 7.29.0 or lower of the Datadog Agent.

### Installation

The Aerospike check is included in the [Datadog Agent][2] package.
No additional installation is needed on your server.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

##### Metric collection
To configure this check for an Agent running on a host:

1. Install and configure the [Aerospike Prometheus Exporter][1]- refer to [Aerospike's documentation][2] for more details.

2. Edit the `aerospike.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Aerospike performance data. See the [sample aerospike.d/conf.yaml][3] for all available configuration options.

3. [Restart the Agent][4].

**Note**: Version 1.16.0+ of this check uses [OpenMetrics][5] for metric collection, which requires Python 3. For hosts that are unable to use Python 3, or if you would like to use a legacy version of this check, refer to the [example config][6].

##### Log collection


1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `aerospike.d/conf.yaml` file to start collecting your Aerospike Logs:

   ```yaml
   logs:
     - type: file
       path: /var/log/aerospike/aerospike.log
       source: aerospike
   ```

    Change the `path` parameter value and configure them for your environment. See the [sample aerospike.d/conf.yaml][3] for all available configuration options.

3. [Restart the Agent][4].

[1]: https://github.com/aerospike/aerospike-prometheus-exporter
[2]: https://docs.aerospike.com/monitorstack/new/installing-components
[3]: https://github.com/DataDog/integrations-core/blob/master/aerospike/datadog_checks/aerospike/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/integrations/openmetrics/
[6]: https://github.com/DataDog/integrations-core/blob/7.36.x/aerospike/datadog_checks/aerospike/data/conf.yaml.example
{{% /tab %}}
{{% tab "Containerized" %}}


#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `aerospike`                          |
| `<INIT_CONFIG>`      | blank or `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:9145/metrics"}` |

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "aerospike", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][3] and look for `aerospike` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "aerospike" >}}


### Service Checks

**aerospike.can_connect**
**aerospike.cluster_up**

### Events

Aerospike does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][4].


[1]: https://download.aerospike.com/download/client/python/notes.html#5.0.0
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
