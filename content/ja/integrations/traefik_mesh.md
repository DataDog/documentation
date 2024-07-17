---
app_id: traefik-mesh
app_uuid: 8ace5f4d-ba92-4b68-acf0-20275c8c2a2a
assets:
  dashboards:
    Traefik Mesh Overview: assets/dashboards/traefik_mesh_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: traefik_mesh.entrypoint.open_connections
      metadata_path: metadata.csv
      prefix: traefik_mesh.
    process_signatures:
    - traefik
    - traefik-mesh
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 15633073
    source_type_name: Traefik Mesh
  monitors:
    High Request Count: assets/monitors/high_request_count.json
  saved_views:
    Traefik Mesh Error Logs Overview: assets/saved_views/traefik_mesh_error_overview.json
    Traefik Mesh Logs Overview: assets/saved_views/traefik_mesh_log_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- network
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/traefik_mesh/README.md
display_on_public_website: true
draft: false
git_integration_title: traefik_mesh
integration_id: traefik-mesh
integration_title: Traefik Mesh
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: traefik_mesh
public_title: Traefik Mesh
short_description: Tracks metrics related to Traefik Mesh
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Submitted Data Type::Traces
  - Offering::Integration
  configuration: README.md#Setup
  description: Tracks metrics related to Traefik Mesh
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Traefik Mesh
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Traefik Mesh is a lightweight and easy-to-deploy service mesh that offers advanced traffic management, security, and observability features for microservices applications, leveraging the capabilities of Traefik Proxy. With Datadog's Traefik integration, you can:
- Obtain insights into the traffic entering your service mesh.
- Gain critical insights into the performance, reliability, and security of individual services within your mesh which ensures your services are operating efficiently while also helping to identify and resolve issues quickly.
- Gain detailed insights into the internal traffic flows within your service mesh which helps monitor performance and ensure reliability.

This check monitors [Traefik Mesh][1] through the Datadog Agent.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

Starting from Agent release v7.55.0, the Traefik Mesh check is included in the [Datadog Agent][3] package. No additional installation is needed on your server.

**Note**: This check requires Agent v7.55.0 or later.

### Configuration

Traefik Mesh can be configured to expose Prometheus-formatted metrics. The Datadog Agent can collect these metrics using the integration described below. Follow the instructions to configure data collection for your Traefik Mesh instances. For the required configurations to expose the Prometheus metrics, see the [Observability page in the official Traefik Mesh documentation][4].

In addition, a small subset of metrics can be collected by communicating with different API endpoints. Specifically:
- `/api/version`: Version information on the Traefik proxy.
- `/api/status/nodes`: Ready status of nodes visible by the Traefik [controller][5].
- `/api/status/readiness`: Ready status of the Traefik controller.

**Note**: This check uses [OpenMetrics][6] for metric collection, which requires Python 3.

#### Containerized
##### Metric collection

Make sure that the Prometheus-formatted metrics are exposed in your Traefik Mesh cluster. You can configure and customize this by following the instructions on the [Observability page in the official Traefik Mesh documentation][4]. In order for the Agent to start collecting metrics, the Traefik Mesh pods need to be annotated. For more information about annotations, refer to the [Autodiscovery Integration Templates][2] for guidance. You can find additional configuration options by reviewing the [`traefik_mesh.d/conf.yaml` sample][7].

**Note**: The following metrics can only be collected if they are available. Some metrics are generated only when certain actions are performed.

When configuring the Traefik Mesh check, you can use the following parameters:
- `openmetrics_endpoint`: This parameter should be set to the location where the Prometheus-formatted metrics are exposed. The default port is `8082`, but it can be configured using the `--entryPoints.metrics.address`. In containerized environments, `%%host%%` can be used for [host autodetection][2].
- `traefik_proxy_api_endpooint:` This parameter is optional. The default port is `8080` and can be configured using `--entryPoints.traefik.address`. In containerized environments, `%%host%%` can be used for [host autodetection][2].
- `traefik_controller_api_endpoint`: This parameter is optional. The default port is set to `9000`.

#### Traefik Proxy
```yaml
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "traefik_mesh": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8082/metrics",
              "traefik_proxy_api_endpoint": "http://%%host%%:8080"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: <CONTAINER_NAME>
# (...)
```

#### Traefik Controller
```yaml
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "traefik_mesh": {
          "init_config": {},
          "instances": [
            {
              "traefik_controller_api_endpoint": "http://%%host%%:9000"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: <CONTAINER_NAME>
# (...)
```

See the [sample traefik_mesh.d/conf.yaml][7] for all available configuration options.

### Log collection

_Available for Agent versions >6.0_

Traefik Mesh logs can be collected from the different Traefik Mesh pods through Kubernetes. Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][8].

See the [Autodiscovery Integration Templates][2] for guidance on applying the parameters below.

| Parameter      | Value                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "traefik_mesh", "service": "<SERVICE_NAME>"}` |

### Validation

[Run the Agent's status subcommand][9] and look for `traefik_mesh` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "traefik_mesh" >}}


### Events

The Traefik Mesh integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "traefik_mesh" >}}


## Troubleshooting

Need help? Contact [Datadog support][12].


[1]: https://traefik.io/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://doc.traefik.io/traefik/observability/metrics/overview/
[5]: https://doc.traefik.io/traefik-mesh/api/
[6]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[7]: https://github.com/DataDog/integrations-core/blob/master/traefik_mesh/datadog_checks/traefik_mesh/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/containers/kubernetes/log/
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/traefik_mesh/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/traefik_mesh/assets/service_checks.json
[12]: https://docs.datadoghq.com/ja/help/