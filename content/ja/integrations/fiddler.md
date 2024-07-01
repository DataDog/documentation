---
"app_id": "fiddler"
"app_uuid": "ee617671-508e-4bb3-ba25-8815b11a16aa"
"assets":
  "dashboards":
    "Fiddler": assets/dashboards/fiddler_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": fiddler.accuracy
      "metadata_path": metadata.csv
      "prefix": fiddler.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10307"
    "source_type_name": fiddler
"author":
  "homepage": "http://www.fiddler.ai"
  "name": Fiddler
  "sales_email": sales@fiddler.ai
  "support_email": sales@fiddler.ai
"categories":
- alerting
- metrics
- ai/ml
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/fiddler/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "fiddler"
"integration_id": "fiddler"
"integration_title": "Fiddler"
"integration_version": "3.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "fiddler"
"public_title": "Fiddler"
"short_description": "Gain visibility into your ML systems with the Fiddler Datadog integration"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Alerting"
  - "Category::Metrics"
  - "Category::AI/ML"
  - "Offering::Integration"
  - "Queried Data Type::Metrics"
  - "Submitted Data Type::Events"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Gain visibility into your ML systems with the Fiddler Datadog integration
  "media":
  - "caption": Fiddler Dashboard in DataDog
    "image_url": images/fiddler-datadog.png
    "media_type": image
  - "caption": Model Accuracy Chart
    "image_url": images/accuracy-drift.png
    "media_type": image
  - "caption": Model Analytics
    "image_url": images/analytics.png
    "media_type": image
  - "caption": Performing counterfactual explanations
    "image_url": images/counterfactual.png
    "media_type": image
  - "caption": Data Drift Charts
    "image_url": images/data-drift.png
    "media_type": image
  - "caption": Model Explanations
    "image_url": images/explanation.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Fiddler
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview
Fiddler's Model Performance Management platform monitors Machine Learning model performance by sending real-time alerts when model performance metrics drop, allowing users to analyze inference data to understand why model performance is degrading. This integration includes metrics and an out-of-the-box dashboard that displays performance metrics such as accuracy, traffic, and drift.


## Setup

The Fiddler check is not included in the [Datadog Agent][1] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the Fiddler check on your host. See [Use Community Integrations][2] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-fiddler==3.0.0
   ```

2. Configure your integration similar to Agent-based [integrations][3].

### Configuration

1. Edit the `fiddler.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Fiddler performance data. See the [sample `fiddler.d/conf.yaml`][4] for all available configuration options. The `url`, `org`, and `fiddler_api_key` parameters need to be updated for the Fiddler environment you wish the integration to query. Fiddler also suggests setting the `minimum_collection_interval` setting in the `conf.yaml` file to `300` (5 minutes).

2. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `fiddler` under the Checks section.

## Data Collected

### Metrics

See [metadata.csv][7] for a list of metrics provided by this check.

### Service Checks
{{< get-service-checks-from-git "fiddler" >}}


## Troubleshooting

Need help? Contact [Fiddler support][9].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/getting_started/integrations/
[4]: https://github.com/DataDog/integrations-extras/blob/master/fiddler/datadog_checks/fiddler/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/fiddler/metadata.csv
[8]: https://github.com/DataDog/integrations-extras/blob/master/fiddler/assets/service_checks.json
[9]: https://fiddlerlabs.zendesk.com/hc/en-us

