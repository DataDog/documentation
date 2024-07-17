---
app_id: karpenter
app_uuid: 1a063da6-9cd9-4302-a5de-e76d576f2637
assets:
  dashboards:
    Karpenter Overview: assets/dashboards/karpenter_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: karpenter.go_goroutines
      metadata_path: metadata.csv
      prefix: karpenter.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10437
    source_type_name: Karpenter
  monitors:
    pod states: assets/monitors/pod_state.json
  saved_views:
    Karpenter Error Logs: assets/saved_views/karpenter_error_logs.json
    Karpenter Overview: assets/saved_views/karpenter_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- metrics
- kubernetes
- ログの収集
- プロビジョニング
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/karpenter/README.md
display_on_public_website: true
draft: false
git_integration_title: karpenter
integration_id: karpenter
integration_title: Karpenter
integration_version: 1.4.1
is_public: true
manifest_version: 2.0.0
name: karpenter
public_title: Karpenter
short_description: Monitor the health and performance of Karpenter
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
  - Category::Log Collection
  - Category::Provisioning
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitor the health and performance of Karpenter
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/container-native-integrations/#autoscaling-and-resource-utilization-with-karpenter
  support: README.md#Support
  title: Karpenter
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Karpenter][1] through the Datadog Agent. For more information, see [Karpenter monitoring][2].

## Setup

Follow the instructions below to install and configure this check for an Agent running in your Kubernetes environment. For more information about configuration in containerized environments, see the [Autodiscovery Integration Templates][3] for guidance.

### Installation

Starting from Agent release 7.50.0, the Karpenter check is included in the [Datadog Agent][4] package. No additional installation is needed in your environment.

This check uses [OpenMetrics][5] to collect metrics from the OpenMetrics endpoint that Karpenter exposes, which requires Python 3.

### Configuration

#### Metric collection

Make sure that the Prometheus-formatted metrics are exposed in your Karpenter cluster and on which port. You can configure the port by following the instructions on the [Metrics][2] page in the Karpenter documentation. For the Agent to start collecting metrics, the Karpenter pods need to be annotated. For more information about annotations, refer to the [Autodiscovery Integration Templates][3] for guidance. You can find additional configuration options by reviewing the [sample karpenter.d/conf.yaml][6].

**Note**: The listed metrics can only be collected if they are available. Some metrics are generated only when certain actions are performed. For example, the `karpenter.nodes.terminated` metric is exposed only after a node is terminated.

The only parameter required for configuring the Karpenter check is:
- `openmetrics_endpoint`: This parameter should be set to the location where the Prometheus-formatted metrics are exposed. The default port is `8000`, but it can be configured using the `METRICS_PORT` [environment variable][2]. In containerized environments, `%%host%%` should be used for [host autodetection][3]. 

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/controller.checks: |
      {
        "karpenter": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8000/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'controller'
# (...)
```

#### Log collection

_Available for Agent versions >6.0_

Karpenter logs can be collected from the different Karpenter pods through Kubernetes. Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][7].

See the [Autodiscovery Integration Templates][3] for guidance on applying the parameters below.

| Parameter      | Value                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "karpenter", "service": "<SERVICE_NAME>"}`  |

### Validation

[Run the Agent's status subcommand][8] and look for `karpenter` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "karpenter" >}}


### Events

The Karpenter integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "karpenter" >}}


## Troubleshooting

Need help? Contact [Datadog support][11].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitoring your container-native technologies][12]


[1]: https://karpenter.sh/
[2]: https://karpenter.sh/docs/reference/metrics/
[3]: https://docs.datadoghq.com/ja/containers/kubernetes/integrations/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[6]: https://github.com/DataDog/integrations-core/blob/master/karpenter/datadog_checks/karpenter/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/ja/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/karpenter/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/karpenter/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/
[12]: https://www.datadoghq.com/blog/container-native-integrations/#autoscaling-and-resource-utilization-with-karpenter