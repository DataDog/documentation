---
"app_id": "cyral"
"app_uuid": "da6e2ea6-1611-4d37-9cc6-efce73bc4f31"
"assets":
  "dashboards":
    "Cyral Overview": assets/dashboards/cyral_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": cyral.analysis_time
      "metadata_path": metadata.csv
      "prefix": cyral.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10115"
    "source_type_name": Cyral
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Cyral
  "sales_email": product@cyral.com
  "support_email": product@cyral.com
"categories":
- data stores
- security
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/cyral/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "cyral"
"integration_id": "cyral"
"integration_title": "Cyral"
"integration_version": "0.0.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "cyral"
"public_title": "Cyral"
"short_description": "Collect runtime metrics from a Cyral instance monitoring MySQL."
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Data Stores"
  - "Category::Security"
  - "Supported OS::Linux"
  "configuration": "README.md#Setup"
  "description": Collect runtime metrics from a Cyral instance monitoring MySQL.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Cyral
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors a [Cyral][1] MySQL sidecar through the Datadog Agent.

## Setup

The Cyral check is not included in the [Datadog Agent][2] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the Cyral check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-cyral==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### Configuration

1. Edit the `cyral.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your cyral performance data. See the [sample cyral.d/conf.yaml][5] for all available configuration options.

    ```yaml
    init_config:

    instances:
     # url of the metrics endpoint of prometheus
     - prometheus_url: http://localhost:9018/metrics
    ```

2. [Restart the Agent][6].

### Validation

[Run the Agent's status subcommand][7] and look for `cyral` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "cyral" >}}


### Service Checks

Cyral does not include any service checks.

### Events

Cyral does not include any events.

## Troubleshooting

### Agent cannot connect

```text
    cyral
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

Check that the `url` in `cyral.yaml` is correct.

Need help? Contact [Datadog support][9].

[1]: https://cyral.com/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/cyral/datadog_checks/cyral/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/cyral/metadata.csv
[9]: https://docs.datadoghq.com/help/

