---
"app_id": "cri-o"
"app_uuid": "a5f9ace1-19b5-4928-b98b-21f15d62cce2"
"assets":
  "dashboards":
    "crio": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": crio.operations.count
      "metadata_path": metadata.csv
      "prefix": crio.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10044"
    "source_type_name": CRI-O
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- containers
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/crio/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "crio"
"integration_id": "cri-o"
"integration_title": "CRI-O"
"integration_version": "2.6.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "crio"
"public_title": "CRI-O"
"short_description": "Track all your CRI-O metrics with Datadog"
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
  - "Category::Containers"
  "configuration": "README.md#Setup"
  "description": Track all your CRI-O metrics with Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": CRI-O
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [CRI-O][1].

## Setup

### Installation

The integration relies on the `--enable-metrics` option of CRI-O that is disabled by default, when enabled metrics are exposed at `127.0.0.1:9090/metrics`.

### Configuration

1. Edit the `crio.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your CRI-O performance data. See the [sample crio.d/conf.yaml][2] for all available configuration options.

2. [Restart the Agent][3].

### Validation

[Run the Agent's status subcommand][4] and look for `crio` under the Checks section.

## Data Collected

CRI-O collects metrics about the count and latency of operations that are done by the runtime.
The Datadog-CRI-O integration collects CPU and memory usage of the CRI-O golang binary itself.

### Metrics
{{< get-metrics-from-git "crio" >}}


### Service Checks
{{< get-service-checks-from-git "crio" >}}


## Troubleshooting

Need help? Contact [Datadog support][7].


[1]: http://cri-o.io
[2]: https://github.com/DataDog/integrations-core/blob/master/crio/datadog_checks/crio/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-information
[5]: https://github.com/DataDog/integrations-core/blob/master/crio/metadata.csv
[6]: https://github.com/DataDog/integrations-core/blob/master/crio/assets/service_checks.json
[7]: https://docs.datadoghq.com/help/

