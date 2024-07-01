---
"app_id": "arangodb"
"app_uuid": "2851c4fa-97d2-4949-9673-b21671b57b0a"
"assets":
  "dashboards":
    "ArangoDB Overview": assets/dashboards/arangodb_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": arangodb.process.system_time
      "metadata_path": metadata.csv
      "prefix": arangodb.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10266"
    "source_type_name": ArangoDB
  "monitors":
    "[ArangoDB] High server Kernel mode percentage usage": assets/monitors/high_server_kernel_mode.json
    "[ArangoDB] High server User mode percentage usage": assets/monitors/high_server_user_mode.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- caching
- data stores
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/arangodb/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "arangodb"
"integration_id": "arangodb"
"integration_title": "ArangoDB"
"integration_version": "2.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "arangodb"
"public_title": "ArangoDB"
"short_description": "Track metrics for your ArangoDB configuration."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Caching"
  - "Category::Data Stores"
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Track metrics for your ArangoDB configuration.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": ArangoDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [ArangoDB][1] through the Datadog Agent. ArangoDB 3.8 and above are supported.

Enable the Datadog-ArangoDB integration to:

- Identify slow queries based on user-defined thresholds.
- Understand the impact of a long request and troubleshoot latency issues.
- Monitor underlying RocksDB memory, disk, and cache limits.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] to apply these instructions.

### Installation

The ArangoDB check is included in the [Datadog Agent][3] package.

### Configuration

1. Edit the `arangodb.d/conf.yaml` file in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your ArangoDB performance data. See the [sample arangodb.d/conf.yaml][4] for all available configuration options.

2. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `arangodb` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "arangodb" >}}


### Log collection

_Available for Agent versions >6.0_

To collect logs from your ArangoDB instance, first make sure that your ArangoDB is configured to output logs to a file.
For example, if using the `arangod.conf` file to configure your ArangoDB instance, you should include the following:

```
# ArangoDB configuration file
#
# Documentation:
# https://www.arangodb.com/docs/stable/administration-configuration.html
#

...

[log]
file = /var/log/arangodb3/arangod.log 

...
```

ArangoDB logs contain [many options][8] for log verbosity and output files. Datadog's integration pipeline supports the default conversion pattern.

1. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Uncomment and edit the logs configuration block in your `arangodb.d/conf.yaml` file:

   ```yaml
   logs:
      - type: file
        path: /var/log/arangodb3/arangod.log
        source: arangodb
   ```

### Events

The ArangoDB integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "arangodb" >}}


## Troubleshooting

Need help? Contact [Datadog Support][10].


[1]: https://www.arangodb.com/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/arangodb/datadog_checks/arangodb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/arangodb/metadata.csv
[8]: https://www.arangodb.com/docs/3.8/programs-arangod-log.html
[9]: https://github.com/DataDog/integrations-core/blob/master/arangodb/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/

