---
"app_id": "hikaricp"
"app_uuid": "fa40ec7e-e8f6-4c4b-a675-31716b23a9fa"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": hikaricp.connections.active
      "metadata_path": metadata.csv
      "prefix": hikaricp.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10308"
    "source_type_name": hikaricp
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": damien.bertau@blablacar.com
  "support_email": damien.bertau@blablacar.com
"categories": []
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/hikaricp/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "hikaricp"
"integration_id": "hikaricp"
"integration_title": "HikariCP"
"integration_version": "1.2.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "hikaricp"
"public_title": "HikariCP"
"short_description": "HikariCP integration with openmetrics v2"
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
  "configuration": "README.md#Setup"
  "description": HikariCP integration with openmetrics v2
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": HikariCP
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview
[HikariCP][1] is a lightweight and fast JDBC connection pooling framework.
This check monitors HikariCP through the Datadog Agent.

## Setup

### Installation

To install the HikariCP check on your host:


1. Install the [developer toolkit][2]
 on any machine.

2. Run `ddev release build hikaricp` to build the package.

3. [Download the Datadog Agent][3].

4. Upload the build artifact to any host with an Agent and
 run `datadog-agent integration install -w
 path/to/hikaricp/dist/<ARTIFACT_NAME>.whl`.

### Configuration

1. Edit the `hikaricp/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your HikariCP performance data. See the [sample hikaricp/conf.yaml][4] for all available configuration options.

2. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `hikaricp` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "hikaricp" >}}


### Events

HikariCP does not include any events. 

## Troubleshooting

Need help? Contact [Datadog support][9].


[1]: https://github.com/brettwooldridge/HikariCP
[2]: https://docs.datadoghq.com/developers/integrations/python/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-extras/blob/master/hikaricp/datadog_checks/hikaricp/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/hikaricp/metadata.csv
[8]: https://github.com/DataDog/integrations-extras/blob/master/hikaricp/assets/service_checks.json
[9]: https://docs.datadoghq.com/help/

