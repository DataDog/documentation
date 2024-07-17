---
app_id: argo-rollouts
app_uuid: 28d531ac-954c-4c5a-8769-589589f793e0
assets:
  dashboards:
    Argo Rollouts Overview: assets/dashboards/argo_rollouts_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: argo_rollouts.go.threads
      metadata_path: metadata.csv
      prefix: argo_rollouts.
    process_signatures:
    - rollouts-controller
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8465752
    source_type_name: Argo Rollouts
  monitors:
    Rollout Phase: assets/monitors/rollout_phase.json
  saved_views:
    Argo Rollouts Error Logs Overview: assets/saved_views/error_logs_overview.json
    Argo Rollouts Logs Overview: assets/saved_views/logs_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- metrics
- kubernetes
- 開発ツール
- ログの収集
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/README.md
display_on_public_website: true
draft: false
git_integration_title: argo_rollouts
integration_id: argo-rollouts
integration_title: Argo Rollouts
integration_version: 1.0.2
is_public: true
manifest_version: 2.0.0
name: argo_rollouts
public_title: Argo Rollouts
short_description: Monitor the health and performance of Argo Rollouts
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Metrics
  - Category::Kubernetes
  - Category::Developer Tools
  - Category::Log Collection
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitor the health and performance of Argo Rollouts
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Argo Rollouts
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Argo Rollouts][1] through the Datadog Agent.

## Setup

Follow the instructions below to install and configure this check for an Agent running in your Kubernetes environment. For more information about configuration in containerized environments, see the [Autodiscovery Integration Templates][2] for guidance.

### Installation

Starting from Agent release 7.53.0, the Argo Rollouts check is included in the [Datadog Agent][3] package. No additional installation is needed in your environment.

This check uses [OpenMetrics][4] to collect metrics from the OpenMetrics endpoint that Karpenter exposes, which requires Python 3.

### Configuration

The Argo Rollouts controller has Prometheus-formatted metrics readily available at `/metrics` on port `8090`. For the Agent to start collecting metrics, the Argo Rollouts pods need to be annotated. For more information about annotations, refer to the [Autodiscovery Integration Templates][2] for guidance. You can find additional configuration options by reviewing the [sample argo_rollouts.d/conf.yaml][5].

**Note**: The listed metrics can only be collected if they are available. Some metrics are generated only when certain actions are performed. For example, the `argo_rollout.info.replicas.updated` metric is exposed only after a replica is updated.

The only parameter required for configuring the Argo Rollouts check is:
- `openmetrics_endpoint`: This parameter should be set to the location where the Prometheus-formatted metrics are exposed. The default port is `8090`. In containerized environments, `%%host%%` should be used for [host autodetection][2]. 

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argo-rollouts.checks: |
      {
        "argo_rollouts": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8090/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argo-rollouts'
# (...)
```

#### Log collection

_Available for Agent versions >6.0_

Argo Rollouts logs can be collected from the different Argo Rollouts pods through Kubernetes. Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][6].

See the [Autodiscovery Integration Templates][2] for guidance on applying the parameters below.

| Parameter      | Value                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "argo_rollouts", "service": "<SERVICE_NAME>"}`  |

### Validation

[Run the Agent's status subcommand][7] and look for `argo_rollouts` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "argo_rollouts" >}}


### Events

The Argo Rollouts integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "argo_rollouts" >}}


## Troubleshooting

Need help? Contact [Datadog support][10].


[1]: https://argoproj.github.io/rollouts/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[5]: https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/datadog_checks/argo_rollouts/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/