---
"app_id": "argo-workflows"
"app_uuid": "f96fd144-a3c0-4fed-adcc-53f11f80ec04"
"assets":
  "dashboards":
    "Argo Workflows": assets/dashboards/argo_workflows.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check":
      - argo_workflows.go.info
      "metadata_path": metadata.csv
      "prefix": argo_workflows.
    "process_signatures":
    - workflow-controller
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "8511369"
    "source_type_name": Argo Workflows
  "monitors":
    "errors": assets/monitors/errors.json
  "saved_views":
    "errors": assets/saved_views/errors.json
    "overview": assets/saved_views/overview.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- developer tools
- log collection
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/argo_workflows/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "argo_workflows"
"integration_id": "argo-workflows"
"integration_title": "Argo Workflows"
"integration_version": "1.0.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "argo_workflows"
"public_title": "Argo Workflows"
"short_description": "Monitor the health and performance of Argo Workflows"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Developer Tools"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": Monitor the health and performance of Argo Workflows
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Argo Workflows
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

This check monitors [Argo Workflows][1] through the Datadog Agent.

## セットアップ

Follow the instructions below to install and configure this check for an Agent running in your Kubernetes environment. For more information about configuration in containerized environments, see the [Autodiscovery Integration Templates][2] for guidance.

### インストール

Starting from Agent release 7.53.0, the Argo Workflows check is included in the [Datadog Agent][3] package. No additional installation is needed in your environment.

This check uses [OpenMetrics][4] to collect metrics from the OpenMetrics endpoint.

### 構成

The Argo Workflows Workflow Controller has [Prometheus-formatted metrics][5] available at `/metrics` on port `9090`. For the Agent to start collecting metrics, the Workflow Controller pod needs to be annotated. For more information about annotations, refer to the [Autodiscovery Integration Templates][2] for guidance. You can find additional configuration options by reviewing the [sample argo_workflows.d/conf.yaml][6].

The only parameter required for configuring the Argo Workflows check is:
- `openmetrics_endpoint`: This parameter should be set to the location where the Prometheus-formatted metrics are exposed. The default port is `9090`. In containerized environments, `%%host%%` should be used for [host autodetection][2].

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argo-workflows.checks: |
      {
        "argo_workflows": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:9090/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argo-workflows'
# (...)
```

#### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Argo Workflows logs can be collected from the different Argo Workflows pods through Kubernetes. Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][7].

See the [Autodiscovery Integration Templates][2] for guidance on applying the parameters below.

| パラメーター      | 値                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "argo_workflows", "service": "<SERVICE_NAME>"}`  |

### 検証

[Run the Agent's status subcommand][8] and look for `argo_workflows` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "argo_workflows" >}}


### イベント

The Argo Workflows integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "argo_workflows" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://argo-workflows.readthedocs.io/en/stable/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/integrations/openmetrics/
[5]: https://argo-workflows.readthedocs.io/en/stable/metrics/
[6]: https://github.com/DataDog/integrations-core/blob/master/argo_workflows/datadog_checks/argo_workflows/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/argo_workflows/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/argo_workflows/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/

