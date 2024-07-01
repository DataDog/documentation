---
"app_id": "sortdb"
"app_uuid": "02cd7f3d-5394-4d08-8364-35c9d1af1377"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": sortdb.stats.total_requests
      "metadata_path": metadata.csv
      "prefix": sortdb.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10205"
    "source_type_name": Sortdb
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": namrata.deshpande4@gmail.com
  "support_email": namrata.deshpande4@gmail.com
"categories":
- data stores
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/sortdb/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "sortdb"
"integration_id": "sortdb"
"integration_title": "Sortdb"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "sortdb"
"public_title": "Sortdb"
"short_description": "Datadog support for sortdb monitoring"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Data Stores"
  "configuration": "README.md#Setup"
  "description": Datadog support for sortdb monitoring
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Sortdb
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from [Sortdb][1] service in real time to:

- Visualize and monitor Sortdb stats.
- Be notified about Sortdb failovers.
- Check health of and get stats from multiple instances

## Setup

The Sortdb check is not included in the [Datadog Agent][2] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the Sortdb check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-sortdb==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### Configuration

1. Edit the `sortdb.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][5] to start collecting your Sortdb [metrics](#metric-collection). See the [sample sortdb.d/conf.yaml][6] for all available configuration options.

2. [Restart the Agent][7].

### Validation

[Run the Agent's status subcommand][8] and look for `sortdb` under the Checks section.

## Compatibility

The SortDB check is compatible with all major platforms.

## Data Collected

### Metrics

See [metadata.csv][9] for a list of metrics provided by this integration.

### Service Checks
{{< get-service-checks-from-git "sortdb" >}}


## Troubleshooting

The SortDB check does not include any events.


[1]: https://github.com/jehiah/sortdb
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/getting_started/integrations/
[5]: https://docs.datadoghq.com/agent/faq/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/datadog_checks/sortdb/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/assets/service_checks.json

