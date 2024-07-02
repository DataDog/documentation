---
"app_id": "ray"
"app_uuid": "bae260a0-91be-4dc4-9767-61f072f82d76"
"assets":
  "dashboards":
    "Ray Overview Dashboard": assets/dashboards/overview_dashboard.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": ray.process.open_fds
      "metadata_path": metadata.csv
      "prefix": ray.
    "process_signatures":
    - python -m ray.util.client.server
    - gcs_server
    - raylet
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10393"
    "source_type_name": Ray
  "monitors":
    "high cpu utilization": assets/monitors/cpu_utilization.json
    "high failed tasks": assets/monitors/failed_task.json
    "high memory utilization": assets/monitors/mem_utilization.json
    "low GPU utilization": assets/monitors/gpu_utilization.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- ai/ml
- log collection
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/ray/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "ray"
"integration_id": "ray"
"integration_title": "Ray"
"integration_version": "1.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "ray"
"public_title": "Ray"
"short_description": "Monitor the health and performance of Ray"
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
  - "Category::AI/ML"
  - "Category::Log Collection"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Monitor the health and performance of Ray
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Ray
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

This check monitors [Ray][1] through the Datadog Agent. Ray is an open-source unified compute framework that makes it easy to scale AI and Python workloads, from reinforcement learning to deep learning to tuning, and model serving.

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Starting from Agent release 7.49.0, the Ray check is included in the [Datadog Agent][3] package. No additional installation is needed on your server.

**WARNING**: This check uses [OpenMetrics][4] to collect metrics from the OpenMetrics endpoint Ray can expose, which requires Python 3.

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

##### メトリクスの収集

1. Edit the `ray.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Ray performance data. See the [sample configuration file][1] for all available configuration options.

    This example demonstrates the configuration:

    ```yaml
    init_config:
      ...
    instances:
      - openmetrics_endpoint: http://<RAY_ADDRESS>:8080
    ```

2. [Restart the Agent][2] after modifying the configuration.

[1]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

##### メトリクスの収集

This example demonstrates the configuration as a Docker label inside `docker-compose.yml`. See the [sample configuration file][1] for all available configuration options.

```yaml
labels:
  com.datadoghq.ad.checks: '{"ray":{"instances":[{"openmetrics_endpoint":"http://%%host%%:8080"}]}}'
```

[1]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

##### メトリクスの収集

This example demonstrates the configuration as Kubernetes annotations on your Ray pods. See the [sample configuration file][1] for all available configuration options.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/ray.checks: |-
      {
        "ray": {
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8080"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'ray'
# (...)
```

[1]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example
{{% /tab %}}
{{< /tabs >}}

Ray metrics are available on the OpenMetrics endpoint. Additionally, Ray allows you to [export custom application-level metrics][5]. You can configure the Ray integration to collect these metrics using the `extra_metrics` option. All Ray metrics, including your custom metrics, use the `ray.` prefix.

**Note:** Custom Ray metrics are considered standard metrics in Datadog.

This example demonstrates a configuration leveraging the `extra_metrics` option:

```yaml
init_config:
  ...
instances:
  - openmetrics_endpoint: http://<RAY_ADDRESS>:8080
    # Also collect your own Ray metrics
    extra_metrics:
      - my_custom_ray_metric
```

More info on how to configure this option can be found in the [sample `ray.d/conf.yaml` configuration file][6].

### 検証

[Run the Agent's status subcommand][7] and look for `ray` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "ray" >}}


### イベント

The Ray integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "ray" >}}


### ログ

The Ray integration can collect logs from the Ray service and forward them to Datadog. 

{{< tabs >}}
{{% tab "ホスト" %}}

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Uncomment and edit the logs configuration block in your `ray.d/conf.yaml` file. Here's an example:

   ```yaml
   logs:
     - type: file
       path: /tmp/ray/session_latest/logs/dashboard.log
       source: ray
       service: ray
     - type: file
       path: /tmp/ray/session_latest/logs/gcs_server.out
       source: ray
       service: ray
   ```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][1].

Then, set Log Integrations as pod annotations. This can also be configured with a file, a configmap, or a key-value store. For more information, see the configuration section of [Kubernetes Log Collection][2].


**Annotations v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: ray
  annotations:
    ad.datadoghq.com/apache.logs: '[{"source":"ray","service":"ray"}]'
spec:
  containers:
    - name: ray
```

[1]: https://docs.datadoghq.com/agent/kubernetes/log/#setup
[2]: https://docs.datadoghq.com/agent/kubernetes/log/#configuration
{{% /tab %}}
{{< /tabs >}}

For more information about the logging configuration with Ray and all the log files, see the [official Ray documentation][8].

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://www.ray.io/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/integrations/openmetrics/
[5]: https://docs.ray.io/en/latest/ray-observability/user-guides/add-app-metrics.html
[6]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example#L59-L105
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.ray.io/en/latest/ray-observability/user-guides/configure-logging.html
[9]: https://docs.datadoghq.com/help/
