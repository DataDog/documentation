---
"app_id": "gitea"
"app_uuid": "f4cd02de-cfb8-4de9-a809-7a772ba738ca"
"assets":
  "dashboards":
    "Gitea Overview Dashboard": assets/dashboards/gitea_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": gitea.process.start_time
      "metadata_path": metadata.csv
      "prefix": gitea.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10283"
    "source_type_name": Gitea
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": florent.clarret@gmail.com
  "support_email": florent.clarret@gmail.com
"categories":
- collaboration
- source control
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/gitea/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "gitea"
"integration_id": "gitea"
"integration_title": "Gitea"
"integration_version": "1.0.2"
"is_public": true
"manifest_version": "2.0.0"
"name": "gitea"
"public_title": "Gitea"
"short_description": "Track all your Gitea metrics with Datadog"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Collaboration"
  - "Category::Source Control"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Track all your Gitea metrics with Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Gitea
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Gitea][1] is a community managed lightweight code hosting solution written in Go.

This integration monitors Gitea instances through the Datadog [Agent][2].

## Setup

### Prerequisite

Gitea doesn't expose its internal metrics by default. You need to enable the built-in HTTP server that exposes the metrics endpoint in your `app.ini` configuration file.

```ini
[metrics]
ENABLED = true
```

See the official [documentation][1] for more information.

### Installation

The Gitea integration is not included in the [Datadog Agent][3] package by default, it must be installed.

For Agent v7.36+, follow the instructions below to install the Gitea check on your host. See [Use Community Integrations][4] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

```shell
datadog-agent integration install -t datadog-gitea==<INTEGRATION_VERSION>
```

2. Configure your integration similar to Agent-based [integrations][5].

### Configuration

1. Edit the `gitea.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Gitea data. See the [sample gitea.d/conf.yaml][6] for all available configuration options.

2. [Restart the Agent][7].

### Validation

[Run the Agent's status subcommand][8] and look for `gitea` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "gitea" >}}


### Events

The Gitea check does not include any events.

### Service Checks
{{< get-service-checks-from-git "gitea" >}}


## Troubleshooting

Need help? Contact [Datadog support][11].

[1]: https://docs.gitea.io/en-us/
[2]: https://docs.datadoghq.com/agent/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/gitea/datadog_checks/gitea/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/gitea/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/gitea/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/

