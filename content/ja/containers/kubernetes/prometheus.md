---
aliases:
- /ja/getting_started/prometheus
- /ja/getting_started/integrations/prometheus
- /ja/agent/openmetrics
- /ja/agent/prometheus
- /ja/agent/kubernetes/prometheus
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentation
  text: Collect your application logs
- link: /agent/kubernetes/apm/
  tag: Documentation
  text: Collect your application traces
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Automatically collect your applications' metrics and logs
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limit data collection to a subset of containers only
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Assign tags to all data emitted by a container
- link: /integrations/guide/prometheus-metrics/
  tag: Documentation
  text: Mapping Prometheus Metrics to Datadog Metrics
title: Kubernetes Prometheus and OpenMetrics metrics collection
---

## 概要

Datadog Agent と [OpenMetrics][1] または [Prometheus][2] インテグレーションを併用して、Kubernetes 内で実行されているアプリケーションから、公開されている Prometheus および OpenMetrics メトリクスを収集します。デフォルトでは、一般的な Prometheus チェックによって取得されたメトリクスはすべてカスタムメトリクスと見なされます。

バージョン 6.5.0 より、Agent には [OpenMetrics][3] および [Prometheus][4] チェックが用意され、Prometheus エンドポイントをスクレイピングできます。Prometheus テキスト形式を効率よくフルにサポートできるため、Datadog では OpenMetrics チェックの 使用をお勧めします。カスタムチェックの記述を含む `OpenMetricsCheck` インターフェイスの高度な使用方法については、[開発ツール][5]のセクションを参照してください。Prometheus チェックは、メトリクスのエンドポイントがテキスト形式をサポートしていない場合にのみ使用してください。

このページでは、Prometheus のエンドポイントからカスタムメトリクスをスクレイピングするための、これらのチェックの基本的な使い方を説明します。Prometheus や OpenMetrics のメトリクスと Datadog のメトリクスのマッピング方法については、[Prometheus メトリクスと Datadog メトリクスのマッピング][6]ガイドを参照してください。

## セットアップ

### インストール

[Kubernetes クラスターに Datadog Agent をデプロイします][7]。OpenMetrics および Prometheus チェックは [Datadog Agent][8] パッケージに含まれています。コンテナまたはホストに追加でインストールする必要はありません。

### 構成

OpenMetrics/Prometheus のメトリクスを公開する **pod** に以下の `annotations` を適用し、オートディスカバリーを使用して OpenMetrics または Prometheus のチェックを構成します。

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**注:** AD Annotations v2 は、インテグレーション構成を簡素化するために、Datadog Agent バージョン 7.36 で導入されました。Datadog Agent の以前のバージョンでは、AD Annotations v1 を使用してください。

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
      {
        "openmetrics": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT> ",
              "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
              "metrics": [{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}]
            }
          ]
        }
      }

spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
```

{{% /tab %}}
{{% tab "Kubernetes (AD v1)" %}}

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: |
      ["openmetrics"]
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: |
      [{}]
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: |
      [
        {
          "openmetrics_endpoint": "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT> ",
          "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
          "metrics": [{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}]
        }
      ]
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
```

{{% /tab %}}
{{< /tabs >}}

コンフィギュレーションには次のプレースホルダー値を使用します。

| プレースホルダー                              | 説明                                                                                        |
|------------------------------------------|----------------------------------------------------------------------------------------------------|
| `<CONTAINER_IDENTIFIER>`                 | `annotations` で使用される識別子は、メトリクスを公開しているコンテナ `name` と一致しなければならない。 |
| `<PROMETHEUS_ENDPOINT>`                  | コンテナによって処理されたメトリクスの URL パス (Prometheus 形式)。                            |
| `<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>` | Datadog で表示するときに、すべてのメトリクスの前にネームスペースを付加します。                               |
| `<METRIC_TO_FETCH>`                      | Prometheus エンドポイントから取得される Prometheus メトリクスキー。                                 |
| `<NEW_METRIC_NAME>`                      | Datadog の `<METRIC_TO_FETCH>` メトリクスキーを `<NEW_METRIC_NAME>` に変換します。                   |


The `metrics` configuration is a list of metrics to retrieve as custom metrics. Include each metric to fetch and the desired metric name in Datadog as key value pairs, for example, `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}`. To prevent excess custom metrics charges, Datadog recommends limiting the scope to only include metrics that you need. You can alternatively provide a list of metric names strings, interpreted as regular expressions, to bring the desired metrics with their current names. If you want **all** metrics, then use `".*"` rather than `"*"`.

**注:** 正規表現では、多くのカスタムメトリクスを送信できる可能性があります。

`namespace` や `metrics` など、インスタンスで利用可能なパラメーターの一覧は、[構成例 openmetrics.d/conf.yaml][9] を参照してください。

## はじめに

### シンプルなメトリクスの収集

1. [Datadog Agent を起動します][10]。

2. [Prometheus `prometheus.yaml`][11] を使用して、ポッドにオートディスカバリーの構成をした Prometheus Deployment の例を起動します。
   {{< tabs >}}
   {{% tab "Kubernetes (AD v2)" %}}

   **注:** AD Annotations v2 は、インテグレーション構成を簡素化するために、Datadog Agent バージョン 7.36 で導入されました。Datadog Agent の以前のバージョンでは、AD Annotations v1 を使用してください。

   ```yaml
     # (...)
    spec:
      template:
        metadata:
          annotations:
            ad.datadoghq.com/prometheus-example.checks: |
              {
                "openmetrics": {
                  "instances": [
                    {
                      "openmetrics_endpoint": "http://%%host%%:%%port%%/metrics",
                      "namespace": "documentation_example_kubernetes",
                      "metrics": [
                          {"promhttp_metric_handler_requests": "handler.requests"},
                          {"promhttp_metric_handler_requests_in_flight": "handler.requests.in_flight"},
                          "go_memory.*"
                        ]
                    }
                  ]
                }
              }
        spec:
          containers:
          - name: prometheus-example
          # (...)
   ```
   {{% /tab %}}
   {{% tab "Kubernetes (AD v1)" %}}

   ```yaml
     # (...)
    spec:
      template:
        metadata:
          annotations:
            ad.datadoghq.com/prometheus-example.check_names: |
              ["openmetrics"]
            ad.datadoghq.com/prometheus-example.init_configs: |
              [{}]
            ad.datadoghq.com/prometheus-example.instances: |
              [
                {
                  "openmetrics_endpoint": "http://%%host%%:%%port%%/metrics",
                  "namespace": "documentation_example_kubernetes",
                  "metrics": [
                    {"promhttp_metric_handler_requests": "handler.requests"},
                    {"promhttp_metric_handler_requests_in_flight": "handler.requests.in_flight"},
                    "go_memory.*"
                  ]
                }
              ]
        spec:
          containers:
          - name: prometheus-example
          # (...)
   ```

   {{% /tab %}}
   {{< /tabs >}}

    Prometheus Deployment を作成するコマンド:

    ```shell
    kubectl create -f prometheus.yaml
    ```

3. [Metric summary][12] ページにアクセスし、このサンプルポッドから収集されたメトリクスを確認します。この構成では、`promhttp_metric_handler_requests`、`promhttp_metric_handler_requests_in_flight`、および `go_memory` で始まるすべての公開メトリクスを収集することになります。

    {{< img src="integrations/guide/prometheus_kubernetes/openmetrics_v2_collected_metric_kubernetes.png" alt="Kubernetes で収集された Prometheus メトリクス">}}

## Prometheus アノテーションによるメトリクスの収集

Prometheus Autodiscovery を使用して、Datadog Agent でネイティブ Prometheus アノテーション（`prometheus.io/scrape`、`prometheus.io/path`、`prometheus.io/port` など）を検出し、Kubernetes で自動的に Prometheus メトリクスを収集するよう OpenMetrics チェックをスケジュールできます。

### 要件

- Datadog Agent v7.27 以降または v6.27 以降 (Pod チェックの場合)
- Datadog Cluster Agent v1.11 以降（サービスおよびエンドポイントチェックの場合）

### 構成

この機能を有効にする前に、まずどのポッドやサービスが `prometheus.io/scrape=true` アノテーションを持っているかをチェックすることをお勧めします。これは以下のコマンドで行うことができます。

```shell
kubectl get pods -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces

kubectl get services -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces
```

Prometheus スクレイピング機能が有効になると、Datadog Agent はこれらのリソースからカスタムメトリクスを収集します。これらのリソースからカスタムメトリクスを収集したくない場合は、このアノテーションを削除するか、[高度な構成セクション](#advanced-configuration)で説明されているようにオートディスカバリールールを更新することができます。

**Note**: Enabling this feature without advanced configuration can cause a significant increase in custom metrics, which can lead to billing implications. See the [advanced configuration section](#advanced-configuration) to learn how to only collect metrics from a subset of containers/pods/services.

#### 基本のコンフィギュレーション

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Update your Datadog Operator configuration to contain the following:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    prometheusScrape:
      enabled: true
      enableServiceEndpoints: true
{{< /code-block >}}

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

Update your Helm configuration to contain the following:

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
  # (...)
{{< /code-block >}}

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{% tab "手動 (DaemonSet)" %}}

Agent 用の DaemonSet マニフェスト `daemonset.yaml` に、Agent コンテナ用の以下の環境変数を追加します。
```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```
Cluster Agent が有効な場合、そのマニフェスト `cluster-agent-deployment.yaml` 内に、Cluster Agent コンテナ用の以下の環境変数を追加します。
```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_SERVICE_ENDPOINTS
  value: "true"
```

{{% /tab %}}
{{< /tabs >}}

これにより、Datadog Agent がネイティブ Prometheus アノテーションのあるポッドを検出し、対応する OpenMetrics チェックを生成するよう指示します。

また、Datadog Cluster Agent（有効な場合）にネイティブ Prometheus アノテーションのあるサービスを検出し、対応する OpenMetrics チェックを生成するよう指示します。

- `prometheus.io/scrape=true`: 必須。
- `prometheus.io/path`: 任意。デフォルトは `/metrics`。
- `prometheus.io/port`: 任意。デフォルトは `%%port%%` で、container/service により置換される[テンプレート変数][13]。

このコンフィギュレーションでは、[OpenMetrics インテグレーション][1]のデフォルトコンフィギュレーションを使用して、公開されたすべてのメトリクスを収集するチェックを生成します。

#### 高度なコンフィギュレーション

You can further configure metric collection (beyond native Prometheus annotations) with the `additionalConfigs` field. 

##### Additional OpenMetrics check configurations

Use `additionalConfigs.configurations` to define additional OpenMetrics check configurations. See the [list of supported OpenMetrics parameters][15] that you can pass in `additionalConfigs`.

##### Custom Autodiscovery rules

Use `additionalConfigs.autodiscovery` to define custom Autodiscovery rules. These rules can be based on container names, Kubernetes annotations, or both. 

`additionalConfigs.autodiscovery.kubernetes_container_names`
: A list of container names to target, in regular expression format.

`additionalConfigs.autodiscovery.kubernetes_annotations` 
: Two maps (`include` and `exclude`) of annotations to define discovery rules.

  Default:
  ```yaml
  include:
     prometheus.io/scrape: "true"
  exclude:
     prometheus.io/scrape: "false"
  ```

If both `kubernetes_container_names` and `kubernetes_annotations` are defined, **AND** logic is used (both rules must match).

##### 例

The following configuration targets a container named `my-app` running in a pod with the annotation `app=my-app`. The OpenMetrics check configuration is customized to enable the `send_distribution_buckets` option and define a custom timeout of 5 seconds.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Update your Datadog Operator configuration to contain the following:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    prometheusScrape:
      enabled: true
      enableServiceEndpoints: true
      additionalConfigs:
        - autodiscovery:
            kubernetes_container_names:
              - my-app
            kubernetes_annotations:
              include:
                app: my-app
          configurations:
            - timeout: 5
              send_distribution_buckets: true
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
    additionalConfigs:
      - autodiscovery:
          kubernetes_container_names:
            - my-app
          kubernetes_annotations:
            include:
              app: my-app
        configurations:
          - timeout: 5
            send_distribution_buckets: true

{{< /code-block >}}
{{% /tab %}}
{{% tab "Manual (DaemonSet)" %}}

For DaemonSet, advanced configuration is defined in the `DD_PROMETHEUS_SCRAPE_CHECKS` environment variable, not an `additionalConfigs` field.

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_CHECKS
  value: "[{\"autodiscovery\":{\"kubernetes_annotations\":{\"include\":{\"app\":\"my-app\"}},\"kubernetes_container_names\":[\"my-app\"]},\"configurations\":[{\"send_distribution_buckets\":true,\"timeout\":5}]}]"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```


[1]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[2]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/common/types/prometheus.go#L99-L123
{{% /tab %}}
{{< /tabs >}}

## カスタムインテグレーションを公式インテグレーションに

デフォルトでは、汎用の Prometheus チェックによって取得されるすべてのメトリクスが、カスタムメトリクスだと見なされます。既製ソフトウェアを監視されて、公式のインテグレーションにするべきだと思われた場合は、[ぜひご提供をお願いします][5]。

公式インテグレーションは、それぞれ専用のディレクトリを持ちます。汎用のチェックには、デフォルトの構成とメトリクスメタデータをハードコードするためのデフォルトのインスタンスメカニズムがあります。たとえば、[kube-proxy][14] インテグレーションを参照します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/openmetrics/
[2]: /ja/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /ja/developers/custom_checks/prometheus/
[6]: /ja/integrations/guide/prometheus-metrics
[7]: /ja/agent/kubernetes/#installation
[8]: /ja/getting_started/tagging/
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[11]: /resources/yaml/prometheus.yaml
[12]: https://app.datadoghq.com/metric/summary
[13]: /ja/agent/faq/template_variables/
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/common/types/prometheus.go#L57-L123