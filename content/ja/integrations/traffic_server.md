---
"app_id": "traffic-server"
"app_uuid": "aaf78f60-10de-453c-b2d8-dc44818720c9"
"assets":
  "dashboards":
    "Traffic Server - Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": traffic_server.node.restarts.proxy.restart_count
      "metadata_path": metadata.csv
      "prefix": traffic_server.
    "process_signatures":
    - traffic_cop
    - traffic_manager
    - traffic_server
    - trafficserver start
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10259"
    "source_type_name": Traffic Server
  "monitors":
    "[Traffic Server] 4xx Errors higher than usual": assets/monitors/4xx.json
    "[Traffic Server] 5xx Errors higher than usual": assets/monitors/5xx.json
  "saved_views":
    "traffic_server_error_logs": assets/saved_views/traffic_server_error_logs.json
    "traffic_server_overview": assets/saved_views/traffic_server_overview.json
    "traffic_server_patterns": assets/saved_views/traffic_server_error_patterns.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- caching
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/traffic_server/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "traffic_server"
"integration_id": "traffic-server"
"integration_title": "Traffic Server"
"integration_version": "2.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "traffic_server"
"public_title": "Traffic Server"
"short_description": "Monitor connection, cache, and DNS metrics"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Caching"
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor connection, cache, and DNS metrics
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Traffic Server
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Traffic Server][1] through the Datadog Agent. 

Enable the Datadog-Apache Traffic Server integration to:

- Ensure the availability and performance of online resources, such as websites and applications.
- Track metrics such as hits, volume, and changes in traffic to websites and applications.
- Determine average response times and sizes for requests.
- Monitor system and error logs. 


## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

The Traffic Server check is included in the [Datadog Agent][3] package.

To enable monitoring in Traffic Server, enable the [Stats Over HTTP plugin][4] on your Traffic Server by adding the following line to your `plugin.config` file and reloading Traffic Server:

```
stats_over_http.so
```

### Configuration

1. Edit the `traffic_server.d/conf.yaml` file in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Traffic Server performance data. See the [sample traffic_server.d/conf.yaml][5] for all available configuration options.

**Note**: When using the default [configuration file][5], not all metrics are collected by default.

Comment out the `metric_patterns` option to collect all available metrics, or edit it to collect a different subset of metrics:

```
    ## @param metric_patterns - mapping - optional
    ## A mapping of metrics to include or exclude, with each entry being a regular expression.
    ##
    ## Metrics defined in `exclude` will take precedence in case of overlap.
    ## Comment out this option to collect all available metrics.
    #
    metric_patterns:
      include:
         - <METRIC_1>
         - <METRIC_2>
```

2. [Restart the Agent][6].

### Validation

[Run the Agent's status subcommand][7] and look for `traffic_server` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "traffic_server" >}}


### Log collection

_Available for Agent versions >6.0_

1. Traffic Server logs are highly [customizable][9], but Datadog's integration pipeline supports the default conversion pattern. Clone and edit the [integration pipeline][10] if you have a different format.

2. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

3. Uncomment and edit the logs configuration block in your `traffic_server.d/conf.yaml` file. Change the `path` and `service` parameter values based on your environment. See the [sample traffic_server.d/conf.yaml][5] for all available configuration options.

   ```yaml
   logs:
      - type: file
        path: /opt/trafficserver/var/log/trafficserver/traffic.out
        source: traffic_server
      - type: file
        path: /opt/trafficserver/var/log/trafficserver/diags.log
        source: traffic_server
      - type: file
        path: /opt/trafficserver/var/log/trafficserver/error.log
        source: traffic_server
   ```

### Events

The Traffic Server integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "traffic_server" >}}


## Troubleshooting

Need help? Contact [Datadog support][12].


[1]: https://trafficserver.apache.org/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.trafficserver.apache.org/en/latest/admin-guide/monitoring/statistics/accessing.en.html#stats-over-http
[5]: https://github.com/DataDog/integrations-core/blob/master/traffic_server/datadog_checks/traffic_server/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/traffic_server/metadata.csv
[9]: https://docs.trafficserver.apache.org/en/9.1.x/admin-guide/logging/understanding.en.html
[10]: https://docs.datadoghq.com/logs/processing/#integration-pipelines
[11]: https://github.com/DataDog/integrations-core/blob/master/traffic_server/assets/service_checks.json
[12]: https://docs.datadoghq.com/help/

