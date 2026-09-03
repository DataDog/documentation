---
app_id: ray
app_uuid: bae260a0-91be-4dc4-9767-61f072f82d76
assets:
  dashboards:
    Ray Overview Dashboard: assets/dashboards/overview_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ray.process.open_fds
      metadata_path: metadata.csv
      prefix: ray.
    process_signatures:
    - ray.util.client.server
    - gcs_server
    - raylet
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10393
    source_type_name: Ray
  monitors:
    High CPU Utilization on Ray.io node: assets/monitors/cpu_utilization.json
    High Memory Usage: assets/monitors/mem_utilization.json
    High Number of Failed Tasks on Ray.io Node: assets/monitors/failed_task.json
    Low GPU Utilization low on Ray.io Node: assets/monitors/gpu_utilization.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ai/ml
- ログの収集
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ray/README.md
display_on_public_website: true
draft: false
git_integration_title: ray
integration_id: ray
integration_title: Ray
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: ray
public_title: Ray
short_description: Ray の健全性とパフォーマンスの監視
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
  - Category::AI/ML
  - Category::Log Collection
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Ray の健全性とパフォーマンスの監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Ray
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Ray][1] を監視します。Ray はオープンソースの統一コンピューティングフレームワークで、強化学習から深層学習、チューニング、モデルサービングまで、AI と Python のワークロードを簡単にスケールすることができます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Agent リリース 7.49.0 以降、Ray チェックは [Datadog Agent][3] パッケージに含まれています。サーバーに追加のインストール作業は不要です。

**警告**: このチェックは [OpenMetrics][4] を使用し、Ray が公開する OpenMetrics エンドポイントからメトリクスを収集します。Python 3 が必要です。

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

##### メトリクスの収集

1. Ray のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `ray.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションについては、[サンプル構成ファイル][1] を参照してください。

    ここでは構成の一例を示しています。

    ```yaml
    init_config:
      ...
    instances:
      - openmetrics_endpoint: http://<RAY_ADDRESS>:8080
    ```

2. 構成変更後、[Agent を再起動][2] します。

[1]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

##### メトリクスの収集

この例は、`docker-compose.yml` 内の Docker ラベルとしての構成を示しています。使用可能なすべての構成オプションについては、[サンプル構成ファイル][1] を参照してください。

```yaml
labels:
  com.datadoghq.ad.checks: '{"ray":{"instances":[{"openmetrics_endpoint":"http://%%host%%:8080"}]}}'
```

[1]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

##### メトリクスの収集

この例は、Ray の Pod に付与する Kubernetes アノテーションとしての構成を示しています。使用可能なすべての構成オプションについては、[サンプル構成ファイル][1] を参照してください。

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

Ray のメトリクスは OpenMetrics エンドポイントで利用できます。さらに、Ray では [アプリケーションレベルのカスタムメトリクスをエクスポート][5] できます。これらのメトリクスを収集するように Ray インテグレーションを構成するには、`extra_metrics` オプションを使用します。カスタムメトリクスを含め、Ray のメトリクスはすべて、プレフィックス `ray.` を使用します。

**注:** Ray のカスタムメトリクスは、Datadog では標準メトリクスとみなされます。

この例では、`extra_metrics` オプションを活用した構成を示しています。

```yaml
init_config:
  ...
instances:
  - openmetrics_endpoint: http://<RAY_ADDRESS>:8080
    # 独自の Ray メトリクスも収集
    extra_metrics:
      - my_custom_ray_metric
```

このオプションの構成方法の詳細は、[サンプル `ray.d/conf.yaml` 構成ファイル][6] で確認できます。

### 検証

[Agent の status サブコマンドを実行][7] し、Checks セクションで `ray` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ray" >}}


### イベント

Ray インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "ray" >}}


### Logs

Ray インテグレーションは、Ray サービスからログを収集し、Datadog に転送することができます。

{{< tabs >}}
{{% tab "ホスト" %}}

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. `ray.d/conf.yaml` ファイルのログ構成ブロックのコメントを解除して編集します。以下はその一例です。

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

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][1]を参照してください。

次に、Log Integrations をポッドのアノテーションとして設定します。これは、ファイル、configmap、または key-valueストアで設定することもできます。詳細については、[Kubernetes Log Collection][2] の構成セクションを参照してください。


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

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/log/#setup
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/#configuration
{{% /tab %}}
{{< /tabs >}}

Ray でのログ構成およびすべてのログファイルについては、[Ray の公式ドキュメント][8]を参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://www.ray.io/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[5]: https://docs.ray.io/en/latest/ray-observability/user-guides/add-app-metrics.html
[6]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example#L59-L105
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.ray.io/en/latest/ray-observability/user-guides/configure-logging.html
[9]: https://docs.datadoghq.com/ja/help/