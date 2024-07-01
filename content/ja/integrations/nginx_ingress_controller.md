---
"app_id": "nginx-ingress-controller"
"app_uuid": "f84e3ebf-848b-4894-a5b0-9abbd21d4189"
"assets":
  "dashboards":
    "nginx_ingress_controller": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": nginx_ingress.nginx.process.count
      "metadata_path": metadata.csv
      "prefix": nginx_ingress.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10050"
    "source_type_name": nginx-ingress-controller
  "saved_views":
    "4xx_errors": assets/saved_views/4xx_errors.json
    "5xx_errors": assets/saved_views/5xx_errors.json
    "bot_errors": assets/saved_views/bot_errors.json
    "status_code_overview": assets/saved_views/status_code_overview.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- containers
- kubernetes
- log collection
- network
- orchestration
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "nginx_ingress_controller"
"integration_id": "nginx-ingress-controller"
"integration_title": "nginx-ingress-controller"
"integration_version": "2.6.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "nginx_ingress_controller"
"public_title": "nginx-ingress-controller"
"short_description": "Monitor metrics about the NGINX ingress controller and the embedded NGINX."
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
  - "Category::Network"
  - "Category::Orchestration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor metrics about the NGINX ingress controller and the embedded NGINX.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": nginx-ingress-controller
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors the Kubernetes [NGINX Ingress Controller][1]. To monitor the F5 NGINX Ingress Controller, set up the [Datadog Prometheus integration][2] to monitor desired metrics from the list provided by the [NGINX Prometheus Exporter][3].


## Setup

### Installation

The `nginx-ingress-controller` check is included in the [Datadog Agent][4] package, so you do not need to install anything else on your server.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

If your Agent is running on a host, edit the `nginx_ingress_controller.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory. See the [sample nginx_ingress_controller.d/conf.yaml][1] for all available configuration options. Then, [restart the Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Metric collection

By default, NGINX metrics are collected by the `nginx-ingress-controller` check, but for convenience you might want to run the regular `nginx` check on the ingress controller.

You can achieve this by making the NGINX status page reachable from the Agent. To do this, use the `nginx-status-ipv4-whitelist` setting on the controller and add Autodiscovery annotations to the controller pod.

For example these annotations, enable both the `nginx` and `nginx-ingress-controller` checks and the log collection:

| Parameter            | Value                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `["nginx","nginx_ingress_controller"]`                                                                             |
| `<INIT_CONFIG>`      | `[{},{}]`                                                                                                          |
| `<INSTANCE_CONFIG>`  | `[{"nginx_status_url": "http://%%host%%:18080/nginx_status"},{"prometheus_url": "http://%%host%%:10254/metrics"}]` |

See the [sample nginx_ingress_controller.d/conf.yaml][5] for all available configuration options.

**Note**: For `nginx-ingress-controller` 0.23.0+ versions, the `nginx` server listening in port `18080` was removed, it can be restored by adding the following `http-snippet` to the configuration configmap:

```text
  http-snippet: |
    server {
      listen 18080;

      location /nginx_status {
        allow all;
        stub_status on;
      }

      location / {
        return 404;
      }
    }
```

#### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes log collection][6].

| Parameter      | Value                                                              |
| -------------- | ------------------------------------------------------------------ |
| `<LOG_CONFIG>` | `[{"service": "controller", "source": "nginx-ingress-controller"}]` |

### Validation

[Run the Agent's status subcommand][7] and look for `nginx_ingress_controller` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "nginx_ingress_controller" >}}


### Events

The NGINX Ingress Controller does not include any events.

### Service Checks

The NGINX Ingress Controller does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].


[1]: https://kubernetes.github.io/ingress-nginx
[2]: https://docs.datadoghq.com/agent/kubernetes/prometheus/
[3]: https://github.com/nginxinc/nginx-prometheus-exporter#exported-metrics
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/help/
