---
"app_id": "impala"
"app_uuid": "faf33df8-b1e0-4529-a281-7e176b2365ec"
"assets":
  "dashboards":
    "Impala - Catalog - Overview": assets/dashboards/impala_catalog_overview.json
    "Impala - Daemon - Overview": assets/dashboards/impala_daemon_overview.json
    "Impala - Overview": assets/dashboards/impala_overview.json
    "Impala - Statestore - Overview": assets/dashboards/impala_statestore_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": impala.daemon.jvm.gc.count
      "metadata_path": metadata.csv
      "prefix": impala.
    "process_signatures":
    - impalad
    - catalogd
    - statestored
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10301"
    "source_type_name": Impala
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/impala/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "impala"
"integration_id": "impala"
"integration_title": "Impala"
"integration_version": "2.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "impala"
"public_title": "Impala"
"short_description": "Monitor the health and performance of Apache Impala."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": Monitor the health and performance of Apache Impala.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Impala
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Impala][1] through the Datadog Agent.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

The Impala check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

### Configuration

1. Edit the `impala.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Impala performance data. See the [sample impala.d/conf.yaml][4] for all available configuration options.

Here is an example monitoring a daemon:

```yaml
init_config:

instances:
  ## @param service_type - string - required
  ## The Impala service you want to monitor. Possible values are `daemon`, `statestore`, and `catalog`.
  #
- service_type: daemon

  ## @param openmetrics_endpoint - string - required
  ## The URL exposing metrics in the OpenMetrics format.
  ##
  ## The default port for the services are:
  ## - Daemon: 25000
  ## - Statestore: 25010
  ## - Catalog: 25020
  #
  openmetrics_endpoint: http://%%host%%:25000/metrics_prometheus
```

You can also monitor several services at the same time with the same agent:

```yaml
init_config:

instances:

- service_type: daemon
  service: daemon-1
  openmetrics_endpoint: http://<DAEMON-1-IP>:25000/metrics_prometheus
- service_type: daemon
  service: daemon-2
  openmetrics_endpoint: http://<DAEMON-2-IP>:25000/metrics_prometheus
- service_type: statestore
  openmetrics_endpoint: http://<STATESTORE-IP>:25010/metrics_prometheus
- service_type: catalog
  openmetrics_endpoint: http://<CATALOG-IP>:25020/metrics_prometheus
```

2. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `impala` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "impala" >}}


### Events

The Impala integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "impala" >}}


### Logs

The Impala integration can collect logs from the Impala services and forward them to Datadog. 

1. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Uncomment and edit the logs configuration block in your `impalad.d/conf.yaml` file. Here's an example with the daemon process:

   ```yaml
   logs:
     - type: file
       path: /var/log/impala/impalad.INFO
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
     - type: file
       path: /var/log/impala/impalad.WARNING
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
     - type: file
       path: /var/log/impala/impalad.ERROR
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
     - type: file
       path: /var/log/impala/impalad.FATAL
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
   ```

See [the example configuration file][9] on how to collect all logs.

## Troubleshooting

Need help? Contact [Datadog support][10].


[1]: https://impala.apache.org
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/impala/datadog_checks/impala/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/impala/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/impala/assets/service_checks.json
[9]: https://github.com/DataDog/integrations-core/blob/master/impala/datadog_checks/impala/data/conf.yaml.example#L632-L755
[10]: https://docs.datadoghq.com/help/

