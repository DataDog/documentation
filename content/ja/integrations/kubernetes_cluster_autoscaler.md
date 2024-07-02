---
"app_id": "kubernetes-cluster-autoscaler"
"app_uuid": "3a3fc186-af02-48e5-8b68-ee9ef37ea566"
"assets":
  "dashboards":
    "Kubernetes Cluster Autoscaler Overview": assets/dashboards/kubernetes_cluster_autoscaler_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": kubernetes_cluster_autoscaler.nodes.count
      "metadata_path": metadata.csv
      "prefix": kubernetes_cluster_autoscaler.
    "process_signatures":
    - cluster-autoscaler
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "14391189"
    "source_type_name": Kubernetes Cluster Autoscaler
  "logs":
    "source": kubernetes_cluster_autoscaler
  "monitors":
    "Not safe to autoscale": assets/monitors/KCA_not_safe_to_autosclae.json
    "Reporting Errors": assets/monitors/KCA_reporting_errors.json
    "Unused Nodes Forcast": assets/monitors/KCA_unused_nodes_forecast.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com (日本語対応)
  "support_email": help@datadoghq.com
"categories":
- モニター
- kubernetes
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/kubernetes_cluster_autoscaler/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "kubernetes_cluster_autoscaler"
"integration_id": "kubernetes-cluster-autoscaler"
"integration_title": "Kubernetes Cluster Autoscaler"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "kubernetes_cluster_autoscaler"
"public_title": "Kubernetes Cluster Autoscaler"
"short_description": "Integration for Kubernetes Cluster Autoscaler"
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
  - "Category::Metrics"
  - "Category::Kubernetes"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Integration for Kubernetes Cluster Autoscaler
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Kubernetes Cluster Autoscaler
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

This check monitors [Kubernetes Cluster Autoscaler][1] through the Datadog Agent.

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

The Kubernetes Cluster Autoscaler check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

### 構成

1. Edit the `kubernetes_cluster_autoscaler.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your kubernetes_cluster_autoscaler performance data. See the [sample kubernetes_cluster_autoscaler.d/conf.yaml][4] for all available configuration options.

2. [Agent を再起動します][5]。

#### メトリクスの収集

Make sure that the Prometheus-formatted metrics are exposed in your `kubernetes_cluster_autoscaler` cluster. 
For the Agent to start collecting metrics, the `kubernetes_cluster_autoscaler` pods need to be annotated.

[Kubernetes Cluster Autoscaler][6] has metrics and livenessProbe endpoints that can be accessed on port `8085`. These endpoints are located under `/metrics` and `/health-check` and provide valuable information about the state of your cluster during scaling operations.

**Note**: To change the default port, use the `--address` flag.

To configure the Cluster Autoscaler to expose metrics, do the following:

1. Enable access to the `/metrics` route and expose port `8085` for your Cluster Autoscaler deployment:

```
ports:
--name: app
containerPort: 8085
``` 

b) instruct your Prometheus to scrape it, by adding the following annotation to your Cluster Autoscaler service:
```
prometheus.io/scrape: true
```

**Note**: The listed metrics can only be collected if they are available. Some metrics are generated only when certain actions are performed. 

The only parameter required for configuring the `kubernetes_cluster_autoscaler` check is `openmetrics_endpoint`. This parameter should be set to the location where the Prometheus-formatted metrics are exposed. The default port is `8085`. To configure a different port, use the `METRICS_PORT` [environment variable][7]. In containerized environments, `%%host%%` should be used for [host autodetection][2]. 

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/controller.checks: |
      {
        "kubernetes_cluster_autoscaler": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8085/metrics"
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


### 検証

[Run the Agent's status subcommand][8] and look for `kubernetes_cluster_autoscaler` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "kubernetes_cluster_autoscaler" >}}


### イベント

The Kubernetes Cluster Autoscaler integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "kubernetes_cluster_autoscaler" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: **LINK_TO_INTEGRATION_SITE**
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_cluster_autoscaler/datadog_checks/kubernetes_cluster_autoscaler/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#how-can-i-monitor-cluster-autoscaler
[7]: https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_cluster_autoscaler/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_cluster_autoscaler/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/

