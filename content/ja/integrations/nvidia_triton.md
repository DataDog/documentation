---
"app_id": "nvidia-triton"
"app_uuid": "72d17043-fa30-4f5c-95cb-939906d86fb7"
"assets":
  "dashboards":
    "Nvidia Triton Overview": assets/dashboards/nvidia_triton_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": nvidia_triton.cpu.memory.total_bytes
      "metadata_path": metadata.csv
      "prefix": nvidia_triton.
    "process_signatures":
    - tritonserver
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10416"
    "source_type_name": Nvidia Triton
  "monitors":
    "[Nvidia Triton] CPU Memory Usage is high": assets/monitors/cpu_memory.json
    "[Nvidia Triton] GPU utilization is high": assets/monitors/gpu_utilization.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- ai/ml
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/nvidia_triton/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "nvidia_triton"
"integration_id": "nvidia-triton"
"integration_title": "Nvidia Triton"
"integration_version": "1.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "nvidia_triton"
"public_title": "Nvidia Triton"
"short_description": "NVIDIA Triton Inference Server is open source inference-serving software"
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
  - "Category::Log Collection"
  - "Category::AI/ML"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": NVIDIA Triton Inference Server is open source inference-serving software
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Nvidia Triton
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

This check monitors [Nvidia Triton][1] through the Datadog Agent.

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

The Nvidia Triton check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

#### OpenMetrics エンドポイント

By default, the Nvidia Triton server exposes all metrics through the Prometheus endpoint.
To enable all metrics reportings:

```
tritonserver --allow-metrics=true
```

To change the metric endpoint, use the `--metrics-address` option.

例:

```
tritonserver --metrics-address=http://0.0.0.0:8002
```

In this case, the OpenMetrics endpoint is exposed at this URL: `http://<NVIDIA_TRITON_ADDRESS>:8002/metrics`.

The [latency summary][4] metrics are disabled by default. To enable summary metrics for latencies, use the command below:

```
tritonserver --metrics-config summary_latencies=true
```

The [response cache metrics][5] are not reported by default. You need to enable a cache implementation on the server side by specifying a <cache_implementation> and corresponding configuration.

例:

```
tritonserver --cache-config local,size=1048576
```

Nvidia Triton also offers the possibility to expose [custom metrics][6] through their Openemtrics endpoint. Datadog can also collect these custom metrics using the `extra_metrics` option.
<div class="alert alert-warning">These custom Nvidia Triton metrics are considered standard metrics in Datadog.</div>

### 構成

1. Edit the `nvidia_triton.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your nvidia_triton performance data. See the [sample nvidia_triton.d/conf.yaml][7] for all available configuration options.

2. [Agent を再起動します][8]。

### 検証

[Run the Agent's status subcommand][9] and look for `nvidia_triton` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "nvidia_triton" >}}


### イベント

The Nvidia Triton integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "nvidia_triton" >}}


### ログ

The Nvidia Triton integration can collect logs from the Nvidia Triton server and forward them to Datadog.

{{< tabs >}}
{{% tab "ホスト" %}}

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Uncomment and edit the logs configuration block in your `nvidia_triton.d/conf.yaml` file. Here's an example:

   ```yaml
   logs:
     - type: docker
       source: nvidia_triton
       service: nvidia_triton
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
  name: nvidia_triton
  annotations:
    ad.datadoghq.com/apache.logs: '[{"source":"nvidia_triton","service":"nvidia_triton"}]'
spec:
  containers:
    - name: ray
```

[1]: https://docs.datadoghq.com/agent/kubernetes/log/#setup
[2]: https://docs.datadoghq.com/agent/kubernetes/log/#configuration
{{% /tab %}}
{{< /tabs >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。



[1]: https://www.nvidia.com/en-us/ai-data-science/products/triton-inference-server/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/metrics.html#summaries
[5]: https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/metrics.html#response-cache-metrics
[6]: https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/metrics.html#custom-metrics
[7]: https://github.com/DataDog/integrations-core/blob/master/nvidia_triton/datadog_checks/nvidia_triton/data/conf.yaml.example
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/help/
