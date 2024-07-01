---
"app_id": "ns1"
"app_uuid": "8bc08030-a931-42a0-b9c0-9ca87f3e0e12"
"assets":
  "dashboards":
    "NS1": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": ns1.qps
      "metadata_path": metadata.csv
      "prefix": ns1.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10182"
    "source_type_name": NS1
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": NS1
  "sales_email": zjohnson@ns1.com
  "support_email": zjohnson@ns1.com
"categories":
- network
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/ns1/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "ns1"
"integration_id": "ns1"
"integration_title": "ns1"
"integration_version": "0.0.6"
"is_public": true
"manifest_version": "2.0.0"
"name": "ns1"
"public_title": "ns1"
"short_description": "A Datadog integration to collect NS1 metrics"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Category::Network"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": A Datadog integration to collect NS1 metrics
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": documentation
    "url": "https://help.ns1.com/hc/en-us/articles/4402752547219"
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/ns1-monitoring-datadog/"
  "support": "README.md#Support"
  "title": ns1
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This integration monitors [NS1][1] services through the Datadog Agent

![Snap][2]

## Setup

The NS1 check is not included in the [Datadog Agent][3] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the NS1 check on your host. See [Use Community Integrations][4] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-ns1==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][5].

### Configuration

1. Edit the `ns1.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting NS1 metrics. See the sample [ns1.d/conf.yaml][6] for all available configuration options.

2. [Restart the Agent][7].

### Validation

Run the [Agent's status subcommand][5] and look for `ns1` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "ns1" >}}


### Events

The NS1 integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "ns1" >}}


## Troubleshooting

Need help? Contact [Datadog support][10].

## Further Reading

Additional helpful documentation, links, and articles:

- [NS1 + Datadog Integration (Outbound) Quick Start Guide][11]
- [Monitor NS1 with Datadog][12]


[1]: https://ns1.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ns1/images/overview.png
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[4]: https://docs.datadoghq.com/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentabovev68
[5]: https://docs.datadoghq.com/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/ns1/datadog_checks/ns1/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/ns1/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/ns1/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/
[11]: https://help.ns1.com/hc/en-us/articles/4402752547219
[12]: https://www.datadoghq.com/blog/ns1-monitoring-datadog/

