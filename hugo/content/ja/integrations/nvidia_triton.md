---
app_id: nvidia-triton
app_uuid: 72d17043-fa30-4f5c-95cb-939906d86fb7
assets:
  dashboards:
    Nvidia Triton Overview: assets/dashboards/nvidia_triton_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: nvidia_triton.cpu.memory.total_bytes
      metadata_path: metadata.csv
      prefix: nvidia_triton.
    process_signatures:
    - tritonserver
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10416
    source_type_name: NVIDIA Triton
  monitors:
    Nvidia Triton CPU memory usage is high!: assets/monitors/cpu_memory.json
    Nvidia Triton GPU Utilization is high!: assets/monitors/gpu_utilization.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- ai/ml
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nvidia_triton/README.md
display_on_public_website: true
draft: false
git_integration_title: nvidia_triton
integration_id: nvidia-triton
integration_title: Nvidia Triton
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: nvidia_triton
public_title: Nvidia Triton
short_description: NVIDIA Triton Inference Server は、推論サービング用のオープンソースソフトウェアです。
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
  - Category::Log Collection
  - Category::AI/ML
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: NVIDIA Triton Inference Server は、オープンソースの推論サービスソフトウェアです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nvidia Triton
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは Datadog Agent を通じて [NVIDIA Triton][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

NVIDIA Triton チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加のインストールは不要です。

#### OpenMetrics エンドポイント

デフォルトで、NVIDIA Triton サーバーは Prometheus エンドポイントを通じてすべてのメトリクスを公開します。
すべてのメトリクスの公開を有効にするには:

```
tritonserver --allow-metrics=true
```

メトリクスのエンドポイントを変更するには、`--metrics-address` オプションを使用します。

例:

```
tritonserver --metrics-address=http://0.0.0.0:8002
```

この場合、OpenMetrics のエンドポイントは次の URL で公開されます: `http://<NVIDIA_TRITON_ADDRESS>:8002/metrics`

デフォルトでは、[レイテンシーサマリー][4] メトリクスは無効です。レイテンシーのサマリーメトリクスを有効にするには、次のコマンドを使用します。

```
tritonserver --metrics-config summary_latencies=true
```

[応答キャッシュのメトリクス][5]は、デフォルトでは報告されません。<cache_implementation> と対応する構成を指定して、サーバー側でキャッシュの実装を有効にする必要があります。

例:

```
tritonserver --cache-config local,size=1048576
```

また、NVIDIA Triton では OpenMetrics エンドポイントを通じて [カスタムメトリクス][6] を公開できます。Datadog は `extra_metrics` オプションを使用して、これらのカスタムメトリクスも収集できます。
<div class="alert alert-danger">これらの NVIDIA Triton のカスタムメトリクスは、Datadog では標準メトリクスとみなされます。</div>

### 構成

1. nvidia_triton のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `nvidia_triton.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル nvidia_triton.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `nvidia_triton` を確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "nvidia_triton" >}}


### イベント

NVIDIA Triton インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "nvidia_triton" >}}


### Logs

NVIDIA Triton インテグレーションは NVIDIA Triton サーバーからログを収集し、Datadog に転送できます。

{{< tabs >}}
{{% tab "ホスト" %}}

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. `nvidia_triton.d/conf.yaml` ファイルのログ構成ブロックのコメントを解除して編集します。以下はその一例です。

   ```yaml
   logs:
     - type: docker
       source: nvidia_triton
       service: nvidia_triton
   ```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][1]を参照してください。

次に、Log Integrations をポッドのアノテーションとして設定します。これは、ファイル、configmap、または key-valueストアで設定することもできます。詳細については、[Kubernetes Log Collection][2] の構成セクションを参照してください。


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

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/log/#setup
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/#configuration
{{% /tab %}}
{{< /tabs >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。



[1]: https://www.nvidia.com/en-us/ai-data-science/products/triton-inference-server/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/metrics.html#summaries
[5]: https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/metrics.html#response-cache-metrics
[6]: https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/metrics.html#custom-metrics
[7]: https://github.com/DataDog/integrations-core/blob/master/nvidia_triton/datadog_checks/nvidia_triton/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/ja/help/