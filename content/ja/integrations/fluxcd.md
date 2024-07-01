---
"app_id": "fluxcd"
"app_uuid": "11cc5047-83aa-44df-b7ca-9c6e1c32b723"
"assets":
  "dashboards":
    "Fluxcd": assets/dashboards/fluxcd.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": fluxcd.gotk.suspend.status
      "metadata_path": metadata.csv
      "prefix": fluxcd.
    "process_signatures":
    - helm-controller
    - kustomize-controller
    - notification-controller
    - source-controller
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10302"
    "source_type_name": fluxcd
  "monitors":
    "Active Workers": assets/monitors/active_workers.json
    "Error Count": assets/monitors/error_count.json
  "saved_views":
    "flux_errors": assets/saved_views/errors.json
    "flux_overview": assets/saved_views/overview.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- kubernetes
- developer tools
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/fluxcd/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "fluxcd"
"integration_id": "fluxcd"
"integration_title": "fluxcd"
"integration_version": "1.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "fluxcd"
"public_title": "fluxcd"
"short_description": "Fluxcd integration with openmetric v2"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Kubernetes"
  - "Category::Developer Tools"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Fluxcd integration with openmetric v2
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": fluxcd
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Flux][1] through the Datadog Agent. Flux is a set of continuous and progressive delivery solutions for Kubernetes that is open and extensible.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

Starting from Agent release 7.51.0, the Fluxcd check is included in the [Datadog Agent][3] package. No additional installation is needed on your server.

For older versions of the Agent, [use these steps to install][4] the integration.


### Configuration

This integration supports collecting metrics and logs from the following Flux services:

- `helm-controller`
- `kustomize-controller`
- `notification-controller`
- `source-controller`

You can pick and choose which services you monitor depending on your needs.

#### Metric collection

This is an example configuration with Kubernetes annotations on your Flux pods. See the [sample configuration file][5] for all available configuration options.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/manager.checks: |-
      {
        "fluxcd": {
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8080/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'manager'
# (...)
```

#### Log collection

_Available for Agent versions >6.0_

Flux logs can be collected from the different Flux pods through Kubernetes. Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][6].

See the [Autodiscovery Integration Templates][2] for guidance on applying the parameters below.

| Parameter      | Value                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "fluxcd", "service": "<SERVICE_NAME>"}`  |

### Validation

[Run the Agent's status subcommand][7] and look for `fluxcd` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "fluxcd" >}}


### Events

The fluxcd integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "fluxcd" >}}


## Troubleshooting

Need help? Contact [Datadog support][10].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitoring your container-native technologies][11]


[1]: https://fluxcd.io/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/agent/guide/use-community-integrations/?tab=agentv721v621#installation
[5]: https://github.com/DataDog/integrations-core/blob/7.51.x/fluxcd/datadog_checks/fluxcd/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/fluxcd/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/fluxcd/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/
[11]: https://www.datadoghq.com/blog/container-native-integrations/#cicd-with-flux

