---
"app_id": "kube-scheduler"
"app_uuid": "1cf58691-ac6b-4f1d-b410-0132a4590378"
"assets":
  "dashboards":
    "kube_scheduler": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": kube_scheduler.threads
      "metadata_path": metadata.csv
      "prefix": kube_scheduler.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10056"
    "source_type_name": Kube_scheduler
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- containers
- kubernetes
- log collection
- orchestration
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "kube_scheduler"
"integration_id": "kube-scheduler"
"integration_title": "Kubernetes Scheduler"
"integration_version": "4.10.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "kube_scheduler"
"public_title": "Kubernetes Scheduler"
"short_description": "Monitors the Kubernetes Scheduler"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Log Collection"
  - "Category::Orchestration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitors the Kubernetes Scheduler
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Kubernetes Scheduler
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Kube Scheduler dashboard][1]

## Overview

This check monitors [Kubernetes Scheduler][2], part of the Kubernetes control plane.

**Note**: This check does not collect data for Amazon EKS clusters, as those services are not exposed.

## Setup

### Installation

The Kubernetes Scheduler check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

### Configuration

See the [Autodiscovery Integration Templates][4] for guidance on applying the parameters below.

#### Metric collection

1. Edit the `kube_scheduler.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your kube_scheduler performance data. See the [sample kube_scheduler.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

#### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][7].

| Parameter      | Value                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "kube_scheduler", "service": "<SERVICE_NAME>"}` |

### Validation

[Run the Agent's status subcommand][8] and look for `kube_scheduler` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "kube_scheduler" >}}


### Events

Kube Scheduler does not include any events.

### Service Checks
{{< get-service-checks-from-git "kube_scheduler" >}}


## Troubleshooting

Need help? Contact [Datadog support][11].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_scheduler/images/kube_scheduler_screenshot.jpeg
[2]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[5]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent
[7]: https://docs.datadoghq.com/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/

