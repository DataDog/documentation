---
"app_id": "scalr"
"app_uuid": "d74ce5c8-4e5a-485a-be79-ff55f8205c9d"
"assets":
  "dashboards":
    "Scalr Overview Dashboard": assets/dashboards/scalr_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": true
    "metrics":
      "check": scalr.runs.count
      "metadata_path": metadata.csv
      "prefix": scalr.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10312"
    "source_type_name": Scalr (Community Version)
"author":
  "homepage": "https://scalr.com"
  "name": Scalr
  "sales_email": sales@scalr.com
  "support_email": support@scalr.com
"categories":
- automation
- configuration & deployment
- orchestration
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/scalr/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "scalr"
"integration_id": "scalr"
"integration_title": "Scalr"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "scalr"
"public_title": "Scalr"
"short_description": "Scalr is a Terraform Automation and COllaboration (TACO) product"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Automation"
  - "Category::Configuration & Deployment"
  - "Category::Orchestration"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Scalr is a Terraform Automation and COllaboration (TACO) product
  "media":
  - "caption": Scalr dashboard.
    "image_url": images/scalr_dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": documentation
    "url": "https://docs.scalr.com"
  - "resource_type": documentation
    "url": "https://docs.scalr.com/en/latest/integrations.html#datadog"
  "support": "README.md#Support"
  "title": Scalr
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Scalr is a terraform cloud alternative that provides you with the controls, visibility, and flexibility to decentralize your terraform operations in one place.

The Scalr [integration][1] sends Terraform run execution [event][2] details and metrics for in-depth analysis and reporting such as queue runs, queue state, the number of environments, and workspace count. These metrics are visualized in their out-of-the-box dashboard to help correlate deployments with other infrastructure changes and to track trends within your Terraform pipeline.

## Setup
The Scalr integration is not included in the [Datadog Agent][3] package, so you need to install it.

### Installation

For the Datadog Agent v7.21 or v6.21 and later, follow these instructions to install the Scalr integration on your host. See [Use Community Integrations][4] to install it with the Docker Agent or earlier versions of the Datadog Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-scalr==1.0.0
   ```

2. Configure your integration similar to an Agent-based [integration][5].

### Configuration

1. Edit the `scalr.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][6] to start collecting your [Scalr metrics](#metrics). See the [sample scalr.d/conf.yaml][7] for all available configuration options.

2. [Restart the Agent][8].

### Validation

Run the [Agent's status subcommand][9] and look for `scalr` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "scalr" >}}


### Events

Scalr sends run execution results as an event to the [Events Explorer][12].

## Troubleshooting

Need help? Contact [Datadog support][13] or [Scalr support][14].

## Further Reading

- [Scalr customer documentation][15]
- [Scalr Datadog integration documentation][16]


[1]: https://docs.scalr.com/en/latest/integrations.html
[2]: https://docs.datadoghq.com/events/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/getting_started/integrations/
[6]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/scalr/datadog_checks/scalr/data/conf.yaml.example
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/scalr/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/scalr/assets/service_checks.json
[12]: https://docs.datadoghq.com/events/explorer/
[13]: https://docs.datadoghq.com/help/
[14]: https://scalr-labs.atlassian.net/servicedesk/customer/portal/31
[15]: https://docs.scalr.com
[16]: https://docs.scalr.com/en/latest/integrations.html#datadog

