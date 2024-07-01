---
"app_id": "winkmem"
"app_uuid": "70d34855-e504-4716-be0a-cc9d7d82e5ab"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": winkmem.paged_pool_bytes
      "metadata_path": metadata.csv
      "prefix": winkmem.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10254"
    "source_type_name": Windows Kernel Memory
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- os & system
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/winkmem/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "winkmem"
"integration_id": "winkmem"
"integration_title": "Windows Kernel Memory"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "winkmem"
"public_title": "Windows Kernel Memory"
"short_description": "Monitor your Windows kernel memory allocation."
"supported_os":
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Windows"
  - "Category::OS & System"
  "configuration": "README.md#Setup"
  "description": Monitor your Windows kernel memory allocation.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Windows Kernel Memory
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Get Windows kernel memory usage to create visualizations and monitors in Datadog.

**Note:** The list of metrics collected by this integration may change between minor Agent versions. Such changes may not be mentioned in the Agent's changelog.

## Setup

### Installation

The Windows Kernel Memory integration is included in the [Datadog Agent][1] package, so you don't need to install anything else on your servers.

### Configuration

1. Edit the `winkmem.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][2]. See the [sample winkmem.d/conf.yaml.example][3] for all available configuration options.

2. [Restart the Agent][4].

### Validation

[Run the Agent's status subcommand][5] and look for `winkmem` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "winkmem" >}}


### Events

The Windows Kernel Memory integration does not include any events.

### Service Checks

The Windows Kernel Memory integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][6].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/winkmem.d/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/master/winkmem/metadata.csv
[6]: https://docs.datadoghq.com/help/

