---
"app_id": "kube-metrics-server"
"app_uuid": "df9c9e3c-368a-4472-b0cb-b32f1066a2f5"
"assets":
  "dashboards":
    "Kubernetes Metrics Server - Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": kube_metrics_server.process.open_fds
      "metadata_path": metadata.csv
      "prefix": kube_metrics_server.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10061"
    "source_type_name": Kube metrics server
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- containers
- kubernetes
- orchestration
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/kube_metrics_server/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "kube_metrics_server"
"integration_id": "kube-metrics-server"
"integration_title": "Kubernetes Metrics Server"
"integration_version": "3.3.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "kube_metrics_server"
"public_title": "Kubernetes Metrics Server"
"short_description": "Monitors the Kubernetes Metrics Server"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Orchestration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitors the Kubernetes Metrics Server
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Kubernetes Metrics Server
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Kube_metrics_server][1] v0.3.0+, a component used by the Kubernetes control plane.

## セットアップ

### インストール

The Kube_metrics_server check is included in the [Datadog Agent][2] package. No additional installation is needed on your server.

### 構成

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

To configure this check for an Agent running on a host:

1. Edit the `kube_metrics_server.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your kube_metrics_server performance data. See the [sample kube_metrics_server.d/conf.yaml][1] for all available configuration options.

2. [Restart the Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/kube_metrics_server/datadog_checks/kube_metrics_server/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Kubernetes Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                                |
| -------------------- | ---------------------------------------------------- |
| `<INTEGRATION_NAME>` | `kube_metrics_server `                                         |
| `<INIT_CONFIG>`      | blank or `{}`                                        |
| `<INSTANCE_CONFIG>`  | `{"prometheus_url": "https://%%host%%:443/metrics"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### SSL

If your endpoint is secured, additional configuration is required:

1. Identify the certificate used for securing the metric endpoint.

2. Mount the related certificate file in the Agent pod.

3. Apply your SSL configuration. See the [default configuration file][3] for more information.

### Validation

[Run the Agent's status subcommand][4] and look for `kube_metrics_server` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "kube_metrics_server" >}}


### イベント

kube_metrics_server does not include any events.

### サービスチェック
{{< get-service-checks-from-git "kube_metrics_server" >}}


## トラブルシューティング

Need help? Contact [Datadog support][5].



[1]: https://github.com/kubernetes-incubator/metrics-server
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/help/
