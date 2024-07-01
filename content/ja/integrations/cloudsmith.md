---
"app_id": "cloudsmith"
"app_uuid": "92b5a159-e5e9-4e38-a4d4-b987cd03b7a1"
"assets":
  "dashboards":
    "Cloudsmith": assets/dashboards/cloudsmith_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": cloudsmith.bandwidth_used
      "metadata_path": metadata.csv
      "prefix": cloudsmith.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10208"
    "source_type_name": Cloudsmith
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Cloudsmith
  "sales_email": ccarey@cloudsmith.io
  "support_email": ccarey@cloudsmith.io
"categories":
- cloud
- metrics
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "cloudsmith"
"integration_id": "cloudsmith"
"integration_title": "Cloudsmith"
"integration_version": "0.0.2"
"is_public": true
"manifest_version": "2.0.0"
"name": "cloudsmith"
"public_title": "Cloudsmith"
"short_description": "Monitor Cloudsmith metrics"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Metrics"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor Cloudsmith metrics
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Cloudsmith
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [Cloudsmith][1] through the Datadog Agent.
- Monitor storage, bandwidth and token usage in your Cloudsmith account. 


## Setup

The Cloudsmith check is not included in the [Datadog Agent][2] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the Cloudsmith check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-cloudsmith==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### Configuration

1. Edit the `cloudsmith.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Cloudsmith performance data. See the [sample cloudsmith.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

### Validation

[Run the Agent's status subcommand][7] and look for `cloudsmith` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "cloudsmith" >}}


### Events

All Cloudsmith related events collected appear within the Datadog Event Stream with the `source:cloudsmith` property. They are collected every five minutes to reduce the number of requests sent to the Cloudsmith API.

There are two types of events:

- Security Scan event
- Audit Logs event

They are accessible with aggregation keys: `@aggregation_key:audit_log` and `@aggregation_key:vulnerabilities`.

## Troubleshooting

Need help? Contact [Cloudsmith support][10].

[1]: https://cloudsmith.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/datadog_checks/cloudsmith/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/assets/service_checks.json
[10]: https://help.cloudsmith.io/docs/contact-us#live-chat-via-intercom

