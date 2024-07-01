---
"app_id": "eventstore"
"app_uuid": "b0c2527f-671e-4a98-aa74-807d7f1826e3"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": eventstore.proc.mem
      "metadata_path": metadata.csv
      "prefix": eventstore.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10221"
    "source_type_name": Eventstore
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": help@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- caching
- data stores
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/eventstore/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "eventstore"
"integration_id": "eventstore"
"integration_title": "Eventstore"
"integration_version": "2.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "eventstore"
"public_title": "Eventstore"
"short_description": "Collects Eventstore Metrics"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Caching"
  - "Category::Data Stores"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Collects Eventstore Metrics
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Eventstore
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from EventStore in real time to:

* Visualize and monitor EventStore queues
* Capture all available metrics within the following API endpoints: stats, node info, non-transient projections, subscriptions, cluster gossip (the list of endpoints to scrape is configurable)

## Setup

The EventStore check is not included in the [Datadog Agent][1] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the EventStore check on your host. See [Use Community Integrations][2] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-eventstore==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][3].

### Configuration

1. Edit the `eventstore.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][4] to start collecting your EventStore [metrics](#metrics).
   See the [sample eventstore.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

### Validation

[Run the Agent's status subcommand][7] and look for `eventstore` under the Checks section.

## Compatibility

The check is compatible with all major platforms.

## Data Collected

### Metrics
{{< get-metrics-from-git "eventstore" >}}


### Events

The eventstore check does not include any events.

### Service Checks

The eventstore check does not include any service checks.

## Troubleshooting

Need help? Contact the [maintainer][9] of this integration.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/getting_started/integrations/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/datadog_checks/eventstore/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/manifest.json

