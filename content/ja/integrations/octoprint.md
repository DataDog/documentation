---
"app_id": "octoprint"
"app_uuid": "f076efc3-c1c7-4e0a-b0dc-92870d655211"
"assets":
  "dashboards":
    "OctoPrint Overview": assets/dashboards/octoprint_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": octoprint.printer_state
      "metadata_path": metadata.csv
      "prefix": octoprint.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10201"
    "source_type_name": OctoPrint
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": gwaldo@gmail.com
  "support_email": gwaldo@gmail.com
"categories":
- developer tools
- log collection
- orchestration
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/octoprint/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "octoprint"
"integration_id": "octoprint"
"integration_title": "Datadog OctoPrint"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "octoprint"
"public_title": "Datadog OctoPrint"
"short_description": "Monitor OctoPrint, a web interface for managing 3d printers"
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Developer Tools"
  - "Category::Log Collection"
  - "Category::Orchestration"
  - "Supported OS::Linux"
  "configuration": "README.md#Setup"
  "description": Monitor OctoPrint, a web interface for managing 3d printers
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Datadog OctoPrint
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [OctoPrint][1] through the Datadog Agent.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

To install the OctoPrint check on your host by running:

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-octoprint==<VERSION>
```

**Note**: The `VERSION` is listed at the top of this page.

#### Install from source (optional)

1. Install the [developer toolkit][3] on any machine.

2. Run `ddev release build octoprint` to build the package.

3. [Download the Datadog Agent][4].

4. Upload the build artifact to any host with an Agent and
 run `datadog-agent integration install -w
 path/to/octoprint/dist/datadog_octoprint*.whl`.

### Configuration

1. From the OctoPrint web interface, create an API key for use with Datadog. This can be found within Settings --> Application Keys.

2. Edit the `octoprint.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory. Paste the OctoPrint API key as the value for `octo_api_key`. See the [sample octoprint.d/conf.yaml][5] for all available configuration options.

3. [Restart the Agent][6].

### Validation

[Run the Agent's status subcommand][7] and look for `octoprint` under the Checks section.

### Logs

By default this integration assumes that you are using the [OctoPi][8] image that is pre-configured to run OctoPrint from a Raspberry Pi.

The logs that it collects by default (and their default locations) are:

- OctoPrint App log: `/home/pi/.octoprint/logs`
- OctoPrint Webcam log: `/var/log/webcamd.log`
- HA Proxy log: `/var/log/haproxy.log`

Any or all of these may be changed or removed by modifying the integration's `conf.yaml` file.

#### Log processing

OctoPrint uses its own log format (not an object format). To make use of the logs, create a log processing pipeline with some parsing rules, for example:

1. Main Pipeline: "OctoPrint"
    1. Sub Pipeline 1: "OctoPrint Print Job"
        1. Grok parser rule:
            - `OctoPrint_Print_Job %{date("yyyy-MM-dd HH:mm:ss,SSS"):date}\s+-\s+%{notSpace:source}\s+-\s+%{word:level}\s+-\s+Print\s+job\s+%{notSpace:job_status}\s+-\s+%{data::keyvalue(":"," ,")}`
    1. Sub Pipeline 2: "General OctoPrint Log"
        1. Grok parser rule:
            - `General_OctoPrint_Log %{date("yyyy-MM-dd HH:mm:ss,SSS"):date}\s+-\s+%{notSpace:source}\s+-\s+%{word:level}\s+-\s+%{data:message}`

For more information, see the [Datadog Log Processing documentation][9].

## Data Collected

### Metrics
{{< get-metrics-from-git "octoprint" >}}


### Events

OctoPrint does not include any events.

### Service Checks
{{< get-service-checks-from-git "octoprint" >}}


## Troubleshooting

Need help? Contact [Datadog support][12].


[1]: https://octoprint.org/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/developers/integrations/python/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/datadog_checks/octoprint/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://octoprint.org/download/
[9]: https://docs.datadoghq.com/logs/processing/
[10]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/assets/service_checks.json
[12]: https://docs.datadoghq.com/help/

