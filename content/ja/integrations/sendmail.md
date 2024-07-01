---
"app_id": "sendmail"
"app_uuid": "8169d145-8d1f-4bb8-a4de-a0aa9aa84c0b"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": sendmail.queue.size
      "metadata_path": metadata.csv
      "prefix": sendmail.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10204"
    "source_type_name": Sendmail
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": david.bouchare@datadoghq.com
  "support_email": david.bouchare@datadoghq.com
"categories":
- metrics
- network
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/sendmail/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "sendmail"
"integration_id": "sendmail"
"integration_title": "Sendmail"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "sendmail"
"public_title": "Sendmail"
"short_description": "Sendmail integration to monitor mail queues"
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Metrics"
  - "Category::Network"
  - "Supported OS::Linux"
  "configuration": "README.md#Setup"
  "description": Sendmail integration to monitor mail queues
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Sendmail
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [Sendmail][1] through the Datadog Agent.

## Setup

The Sendmail check is not included in the [Datadog Agent][2] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the Sendmail check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-sendmail==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### Configuration

1. Edit the `sendmail.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your sendmail performance data. See the [sample sendmail.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

### Validation

[Run the Agent's status subcommand][7] and look for `sendmail` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "sendmail" >}}


### Events

Sendmail does not include any events.

### Service Checks
{{< get-service-checks-from-git "sendmail" >}}


## Troubleshooting

Need help? Contact [Datadog support][10].


[1]: https://www.proofpoint.com/us/open-source-email-solution
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/datadog_checks/sendmail/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/

