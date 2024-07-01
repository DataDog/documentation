---
"app_id": "kyoto-tycoon"
"app_uuid": "5cc7578e-8f8e-43c3-890a-4360581634e7"
"assets":
  "dashboards":
    "kyototycoon": "assets/dashboards/kyototycoon_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "kyototycoon.records"
      "metadata_path": "metadata.csv"
      "prefix": "kyototycoon."
    "process_signatures":
    - "ktserver"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "62"
    "source_type_name": "Kyoto Tycoon"
  "saved_views":
    "kyoto-tycoon_processes": "assets/saved_views/kyoto-tycoon_processes.json"
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
- "https://github.com/DataDog/integrations-core/blob/master/kyototycoon/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "kyototycoon"
"integration_id": "kyoto-tycoon"
"integration_title": "Kyoto Tycoon"
"integration_version": "2.5.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "kyototycoon"
"public_title": "Kyoto Tycoon"
"short_description": "Track get, set, and delete operations; monitor replication lag."
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Data Stores"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": "Track get, set, and delete operations; monitor replication lag."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Kyoto Tycoon"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

The Agent's KyotoTycoon check tracks get, set, and delete operations, and lets you monitor replication lag.

## Setup

### Installation

The KyotoTycoon check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your KyotoTycoon servers.

### Configuration

1. Edit the `kyototycoon.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][2]. See the [sample kyototycoon.d/conf.yaml][3] for all available configuration options:

   ```yaml
   init_config:

   instances:
     ## @param report_url - string - required
     ## The report URL should be a URL to the Kyoto Tycoon "report" RPC endpoint.
     #
     - report_url: http://localhost:1978/rpc/report
   ```

2. [Restart the Agent][4].

##### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

2. Add this configuration block to your `kyototycoon.d/conf.yaml` file to start collecting Kyoto Tycoon logs:

    ```yaml
    logs:
      - type: file
        path: /var/data/ktserver.log
        source: kyototycoon
    ```

    Change the `path` parameter value based on your environment. See the [sample kyototycoon.d/conf.yaml][3] for all available configuration options.

3. [Restart the Agent][4].

### Validation

[Run the Agent's `status` subcommand][5] and look for `kyototycoon` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "kyototycoon" >}}


### Events

The KyotoTycoon check does not include any events.

### Service Checks
{{< get-service-checks-from-git "kyototycoon" >}}


## Troubleshooting

Need help? Contact [Datadog support][8].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/assets/service_checks.json
[8]: https://docs.datadoghq.com/help/

