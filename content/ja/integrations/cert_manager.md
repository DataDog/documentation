---
"app_id": "cert-manager"
"app_uuid": "d8bac6db-8cf7-49ca-a4b8-643714fbc7b9"
"assets":
  "dashboards":
    "Cert-Manager Overview Dashboard": assets/dashboards/certmanager_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": cert_manager.clock_time
      "metadata_path": metadata.csv
      "prefix": cert_manager.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10161"
    "source_type_name": cert-manager
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- security
- configuration & deployment
- containers
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/cert_manager/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "cert_manager"
"integration_id": "cert-manager"
"integration_title": "cert-manager"
"integration_version": "4.1.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "cert_manager"
"public_title": "cert-manager"
"short_description": "Track all your cert-manager metrics with Datadog"
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
  - "Category::Security"
  - "Category::Configuration & Deployment"
  - "Category::Containers"
  "configuration": "README.md#Setup"
  "description": Track all your cert-manager metrics with Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": cert-manager
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check collects metrics from [cert-manager][1].

![Cert-Manager Overview Dashboard][2]

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][3] for guidance on applying these instructions.

### Installation

The cert_manager check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

### Configuration

1. Edit the `cert_manager.d/conf.yaml` file in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your cert_manager performance data. See the [sample cert_manager.d/conf.yaml][4] for all available configuration options.

2. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `cert_manager` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "cert_manager" >}}


### Events

The cert_manager integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "cert_manager" >}}


## Troubleshooting

### Duplicate name tags

Each certificate name is exposed within the `name` label in the Prometheus payload and is converted to a tag by the Datadog Agent. If your hosts also use the `name` tag (for instance, automatically collected by the [AWS integration][9]), metrics coming from this integration will present both values. To avoid duplicate `name` tags, you can use the [`rename_labels`configuration parameter][10] to map the Prometheus label `name` to the Datadog tag `cert_name`. This ensures you have a single value within the tag `cert_name` to identify your certificates :
```yaml
init_config:
instances:
- openmetrics_endpoint: <OPENMETRICS_ENDPOINT>
  rename_labels:
    name: cert_name
```

Need further help? Contact [Datadog support][11].

[1]: https://github.com/jetstack/cert-manager
[2]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cert_manager/images/overview_dashboard.png
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/cert_manager/datadog_checks/cert_manager/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/cert_manager/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/cert_manager/assets/service_checks.json
[9]: https://docs.datadoghq.com/integrations/amazon_web_services/
[10]: https://github.com/DataDog/integrations-core/blob/81b91a54328f174c5c1e92cb818640cba1ddfec3/cert_manager/datadog_checks/cert_manager/data/conf.yaml.example#L153-L155
[11]: https://docs.datadoghq.com/help/

