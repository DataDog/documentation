---
app_id: torchserve
app_uuid: d5400c22-0f0a-4ce4-894d-c3cda48140e9
assets:
  dashboards:
    torchserve_overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check:
      - torchserve.openmetrics.inference.count
      - torchserve.management_api.models
      metadata_path: metadata.csv
      prefix: torchserve.
    process_signatures:
    - torchserve
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10357
    source_type_name: TorchServe
  monitors:
    error_ratio: assets/monitors/error_ratio.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- log collection
- ai/ml
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/torchserve/README.md
display_on_public_website: true
draft: false
git_integration_title: torchserve
integration_id: torchserve
integration_title: TorchServe
integration_version: 2.2.1
is_public: true
manifest_version: 2.0.0
name: torchserve
public_title: TorchServe
short_description: Monitor the health and performance of TorchServe
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::AI/ML
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitor the health and performance of TorchServe
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TorchServe
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [TorchServe][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Agent リリース 7.47.0 から、TorchServe チェックは [Datadog Agent][3] パッケージに含まれています。サーバーに追加インストールする必要はありません。

<div class="alert alert-warning">このチェックでは、<a href="https://docs.datadoghq.com/integrations/openmetrics/">OpenMetrics</a> を使って TorchServe が公開できる OpenMetrics エンドポイントからメトリクスを収集します。</div>

### 前提条件

TorchServe チェックは、3 つの異なるエンドポイントを使用して TorchServe のメトリクスとパフォーマンスデータを収集します。
   - [Inference API][4] で TorchServe インスタンスの全体的な健全性ステータスを収集します。
   - [Management API][5] で実行中のさまざまなモデルのメトリクスを収集します。
   - TorchServe が公開する [OpenMetrics エンドポイント][6]。

[TorchServe のドキュメント][7]で説明されているように、`config.properties` ファイルを使用してこれらのエンドポイントを構成することができます。例:

```
inference_address=http://0.0.0.0:8080
management_address=http://0.0.0.0:8081
metrics_address=http://0.0.0.0:8082
metrics_mode=prometheus
number_of_netty_threads=32
default_workers_per_model=10
job_queue_size=1000
model_store=/home/model-server/model-store
workflow_store=/home/model-server/wf-store
load_models=all
```

このコンフィギュレーションファイルは、インテグレーションがインスタンスを監視するために使用できる 3 つの異なるエンドポイントを公開します。

#### OpenMetrics エンドポイント

Prometheus エンドポイントを有効にするには、2 つのオプションを構成する必要があります。

- `metrics_address`: メトリクス API のバインディングアドレス。デフォルトは `http://127.0.0.1:8082` です。
- `metrics_mode`: TorchServe では `log` と `prometheus` の 2 つのメトリクスモードがサポートされています。デフォルトは `log` です。このエンドポイントからメトリクスを収集するには `prometheus` に設定する必要があります。

例:

```
metrics_address=http://0.0.0.0:8082
metrics_mode=prometheus
```

この場合、OpenMetrics のエンドポイントは次の URL で公開されます: `http://<TORCHSERVE_ADDRESS>:8082/metrics`

### 構成

これら 3 つの異なるエンドポイントは独立して監視することができ、インスタンスごとに 1 つの API をコンフィギュレーションファイルで個別に設定する必要があります。利用可能なすべての構成オプションについては[サンプル torchserve.d/conf.yaml][8] を参照してください。

{{< tabs >}}
{{% tab "OpenMetrics エンドポイント" %}}
#### OpenMetrics エンドポイントの構成

OpenMetrics エンドポイントの構成オプションはコンフィギュレーションファイルの `TorchServe OpenMetrics endpoint configuration` セクションにあります。最小構成では `openmetrics_endpoint` オプションだけが必要です。

```yaml
init_config:
  ...
instances:
  - openmetrics_endpoint: http://<TORCHSERVE_ADDRESS>:8082/metrics
```

その他のオプションについては、[サンプル `torchserve.d/conf.yaml` ファイル][1]を参照してください。

TorchServe allows the custom service code to emit [metrics that will be available based on the configured `metrics_mode`][2]. You can configure this integration to collect these metrics using the `extra_metrics` option. These metrics will have the `torchserve.openmetrics` prefix, just like any other metrics coming from this endpoint.

<div class="alert alert-info">これらのカスタム TorchServe メトリクスは、Datadog では標準メトリクスとみなされます。</div>

[1]: https://github.com/DataDog/integrations-core/blob/master/torchserve/datadog_checks/torchserve/data/conf.yaml.example
[2]: https://pytorch.org/serve/metrics.html#custom-metrics-api
{{% /tab %}}
{{% tab "Inference API" %}}
#### Inference API の構成

このインテグレーションでは、TorchServe インスタンスの全体的なステータスを取得するために [Inference API][1] に依存しています。Inference API の構成オプションは[コンフィギュレーションファイル][2]の `TorchServe Inference API endpoint configuration` セクションにあります。最小構成では `inference_api_url` オプションのみが必要です。

```yaml
init_config:
  ...
instances:
  - inference_api_url: http://<TORCHSERVE_ADDRESS>:8080
```

このインテグレーションは [Ping エンドポイント][3]を利用して、TorchServe サーバーの全体的な健全性ステータスを収集します。

[1]: https://pytorch.org/serve/inference_api.html
[2]: https://github.com/DataDog/integrations-core/blob/master/torchserve/datadog_checks/torchserve/data/conf.yaml.example
[3]: https://pytorch.org/serve/inference_api.html#health-check-api
{{% /tab %}}
{{% tab "Management API" %}}
#### Management API の構成

[Management API][1] を利用することで、TorchServe サーバーで実行中のモデルに関するメトリクスを収集することができます。Inference API の構成オプションは[コンフィギュレーションファイル][2]の `TorchServe Management API endpoint configuration` セクションにあります。最小構成では `management_api_url` オプションのみが必要です。

```yaml
init_config:
  ...
instances:
  - management_api_url: http://<TORCHSERVE_ADDRESS>:8081
```

デフォルトでは、インテグレーションはすべてのモデルからデータを収集します。これは `limit`、`include`、`exclude` オプションで変更できます。例:

```yaml
init_config:
  ...
instances:
  - management_api_url: http://<TORCHSERVE_ADDRESS>:8081
    limit: 25
    include: 
      - my_model.* 
```

この構成では、`my_model.*` 正規表現にマッチするモデル名 (最大 25 モデル) のメトリクスのみを収集します。

また、一部のモデルを除外することもできます。

```yaml
init_config:
  ...
instances:
  - management_api_url: http://<TORCHSERVE_ADDRESS>:8081
    exclude: 
      - test.* 
```

この構成では、`test.*` 正規表現にマッチしないモデル名 (最大 100 モデル) ごとにメトリクスを収集します。

<div class="alert alert-info">同じ構成で `include` と `exclude` オプションを使用することができます。`exclude` フィルターは `include` フィルターの後に適用されます。</div>

デフォルトでは、インテグレーションはチェックを実行するたびにモデルの完全なリストを取得します。このチェックのパフォーマンスを向上させるために、`interval` オプションを使用してこのリストをキャッシュすることができます。

<div class="alert alert-warning">`interval` オプションを使うと、メトリクスやイベントを遅らせることもできます。</div>

[1]: https://pytorch.org/serve/management_api.html
[2]: https://github.com/DataDog/integrations-core/blob/master/torchserve/datadog_checks/torchserve/data/conf.yaml.example
{{% /tab %}}
{{< /tabs >}}

#### 完全な構成

{{< tabs >}}
{{% tab "ホスト" %}}

この例では、前のセクションで説明した 3 つの異なる API を活用した完全な構成を示します。

```yaml
init_config:
  ...
instances:
  - openmetrics_endpoint: http://<TORCHSERVE_ADDRESS>:8082/metrics
    # 独自の TorchServe メトリクスも収集します
    extra_metrics:
      - my_custom_torchserve_metric
  - inference_api_url: http://<TORCHSERVE_ADDRESS>:8080
  - management_api_url: http://<TORCHSERVE_ADDRESS>:8081
    # 正規表現にマッチするモデル名をすべて含めます
    include:
      - my_models.*
    # ただし、`-test` で終わるものはすべて除外します
    exclude: 
      - .*-test 
    # 1 時間ごとにモデルリストのみを更新します
    interval: 3600
```

構成変更後、[Agent を再起動][1]します。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

この例では、`docker-compose.yml` 内の Docker ラベルとして、前のセクションで説明した 3 つの異なる API を活用した完全な構成を示します。

```yaml
labels:
  com.datadoghq.ad.checks: '{"torchserve":{"instances":[{"openmetrics_endpoint":"http://%%host%%:8082/metrics","extra_metrics":["my_custom_torchserve_metric"]},{"inference_api_url":"http://%%host%%:8080"},{"management_api_url":"http://%%host%%:8081","include":["my_models.*"],"exclude":[".*-test"],"interval":3600}]}}'
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

この例では、Torchserve ポッド上の Kubernetes アノテーションとして、前のセクションで説明した 3 つの異なる API を活用した完全な構成を示します。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/torchserve.checks: |-
      {
        "torchserve": {
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8082/metrics",
              "extra_metrics": [
                "my_custom_torchserve_metric"
              ]
            },
            {
              "inference_api_url": "http://%%host%%:8080"
            },
            {
              "management_api_url": "http://%%host%%:8081",
              "include": [
                ".*"
              ],
              "exclude": [
                ".*-test"
              ],
              "interval": 3600
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'torchserve'
# (...)
```

{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションの `torchserve` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "torchserve" >}}


メトリクスには、API を使って以下のプレフィックスが付けられます。
- OpenMetrics エンドポイントからのメトリクスには `torchserve.openmetrics.*`。
- Inference API からのメトリクスには `torchserve.inference_api.*`。
- Management API からのメトリクスには `torchserve.management_api.*`。

### イベント

TorchServe インテグレーションには、Management API を使用した 3 つのイベントがあります。

- `torchserve.management_api.model_added`: このイベントは、新しいモデルが追加されたときに発生します。
- `torchserve.management_api.model_removed`: このイベントは、モデルが削除されたときに発生します。
- `torchserve.management_api.default_version_changed`: このイベントは、指定されたモデルにデフォルトのバージョンが設定されたときに発生します。

<div class="alert alert-info"><a href="https://github.com/DataDog/integrations-core/blob/master/torchserve/datadog_checks/torchserve/data/conf.yaml.example">コンフィギュレーションファイル</a>で `submit_events` オプションを `false` に設定することで、イベントを無効にすることができます。</div>

### サービスチェック
{{< get-service-checks-from-git "torchserve" >}}


### ログ

TorchServe インテグレーションは、TorchServe のサービスからログを収集し、Datadog に転送することができます。

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. `torchserve.d/conf.yaml` ファイルのログ構成ブロックのコメントを解除して編集します。これがその例です。

   ```yaml
   logs:
     - type: file
       path: /var/log/torchserve/model_log.log
       source: torchserve
       service: torchserve
     - type: file
       path: /var/log/torchserve/ts_log.log
       source: torchserve
       service: torchserve
   ```

すべてのログを収集する方法については、[コンフィギュレーションファイルの例][8]を参照してください。

For more information about the logging configuration with TorchServe, see the [official TorchServe documentation][10].

<div class="alert alert-warning">`access_log.log` ファイルからログを収集することもできます。ただし、これらのログは `ts_log.log` ファイルに含まれるため、両方のファイルを構成すると Datadog のログが重複することになります。</div>

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://pytorch.org/serve/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://pytorch.org/serve/inference_api.html
[5]: https://pytorch.org/serve/management_api.html
[6]: https://pytorch.org/serve/metrics_api.html
[7]: https://pytorch.org/serve/configuration.html#configure-torchserve-listening-address-and-port
[8]: https://github.com/DataDog/integrations-core/blob/master/torchserve/datadog_checks/torchserve/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://pytorch.org/serve/logging.html?highlight=logs
[11]: https://docs.datadoghq.com/ja/help/