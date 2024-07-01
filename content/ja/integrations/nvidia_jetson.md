---
"app_id": "nvidia-jetson"
"app_uuid": "eccb9836-9dc7-443c-ac05-9c341e5ccf90"
"assets":
  "dashboards":
    "Nvidia Jetson": assets/dashboards/nvidia_jetson.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": nvidia.jetson.mem.used
      "metadata_path": metadata.csv
      "prefix": nvidia.jetson.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10134"
    "source_type_name": Nvidia Jetson
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- iot
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/nvidia_jetson/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "nvidia_jetson"
"integration_id": "nvidia-jetson"
"integration_title": "Nvidia Jetson"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "nvidia_jetson"
"public_title": "Nvidia Jetson"
"short_description": "Get metrics about your Nvidia Jetson board"
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Category::IoT"
  "configuration": "README.md#Setup"
  "description": Get metrics about your Nvidia Jetson board
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Nvidia Jetson
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors an [Nvidia Jetson][1] board.
It reports the metrics collected from `tegrastats`.

## Setup

### Installation

The Nvidia Jetson check is included in the [Datadog Agent][2] package.
No additional installation is needed on your server.

### Configuration

1. Create a `jetson.d/conf.yaml` file in the `conf.d/` folder at the root of your
   Agent's configuration directory to start collecting your Jetson performance data.
   See the [sample jetson.d/conf.yaml.example][3] for all available configuration options.

2. [Restart the Agent][4].

### Validation

Run the [Agent's status subcommand][5] and look for `jetson` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "nvidia_jetson" >}}


Some metrics are reported only if `use_sudo` is set to true:
- `nvidia.jetson.iram.used`
- `nvidia.jetson.iram.total`
- `nvidia.jetson.iram.lfb`
- `nvidia.jetson.emc.freq`
- `nvidia.jetson.gpu.freq`
- `nvidia.jetson.cpu.freq`

### Service Checks

The Nvidia Jetson integration does not include any service checks.

### Events

The Nvidia Jetson integration does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][7].

[1]: https://developer.nvidia.com/embedded-computing
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/jetson.d/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/nvidia_jetson/metadata.csv
[7]: https://docs.datadoghq.com/help/

