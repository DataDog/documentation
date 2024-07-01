---
"app_id": "puma"
"app_uuid": "c517e801-0fa5-4f5e-8175-a7d5d48a8131"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": puma.workers
      "metadata_path": metadata.csv
      "prefix": puma.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10126"
    "source_type_name": Puma
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": justin.morris@ferocia.com.au
  "support_email": justin.morris@ferocia.com.au
"categories":
- metrics
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/puma/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "puma"
"integration_id": "puma"
"integration_title": "Puma"
"integration_version": "1.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "puma"
"public_title": "Puma"
"short_description": "A fast, concurrent web server for Ruby and Rack"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Category::Metrics"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": A fast, concurrent web server for Ruby and Rack
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Puma
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [Puma][1] through the Datadog Agent with the Puma metrics endpoint provided by the [control and status][2] server.

## Setup

The Puma check is not included in the [Datadog Agent][3] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the Puma check on your host. See [Use Community Integrations][4] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-puma==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][5].

### Configuration

1. Edit the `puma.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Puma performance data. See the [sample puma.d/conf.yaml][6] for all available configuration options.

2. [Restart the Agent][7].

### Validation

Run the [Agent's status subcommand][8] and look for `puma` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "puma" >}}


### Events

Puma does not include any events.

### Service Checks
{{< get-service-checks-from-git "puma" >}}


## Troubleshooting

Need help? Contact [Datadog support][11].


[1]: https://puma.io/
[2]: https://github.com/puma/puma#controlstatus-server
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/puma/datadog_checks/puma/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/puma/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/puma/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/

