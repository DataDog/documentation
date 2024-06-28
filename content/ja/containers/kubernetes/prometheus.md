---
aliases:
- /ja/getting_started/prometheus
- /ja/getting_started/integrations/prometheus
- /ja/agent/openmetrics
- /ja/agent/prometheus
- /ja/agent/kubernetes/prometheus
further_reading:
- link: /agent/kubernetes/log/
  tag: ドキュメント
  text: アプリケーションログの収集
- link: /agent/kubernetes/apm/
  tag: ドキュメント
  text: アプリケーショントレースの収集
- link: /agent/kubernetes/integrations/
  tag: ドキュメント
  text: アプリケーションのメトリクスとログを自動的に収集する
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/kubernetes/tag/
  tag: ドキュメント
  text: コンテナから送信された全データにタグを割り当て
- link: /integrations/guide/prometheus-metrics/
  tag: ドキュメント
  text: Datadog メトリクスにおける Prometheus メトリクスのマッピング
title: Kubernetes Prometheus および OpenMetrics メトリクスの収集
---

Datadog Agent と [Datadog-OpenMetrics][1] または [Datadog-Prometheus][2] インテグレーションを併用して、Kubernetes 内で実行されているアプリケーションから、公開されている Prometheus および OpenMetrics メトリクスを収集します。

**注**: デフォルトでは、Prometheus の汎用チェックで取得されたすべてのメトリクスは、カスタムメトリクスとみなされます。

## 概要

バージョン 6.5.0 より、Agent には [OpenMetrics][3] および [Prometheus][4] チェックが用意され、Prometheus エンドポイントをスクレイピングできます。Prometheus テキスト形式を効率よくフルにサポートできるため、Datadog では OpenMetrics チェックの 使用をお勧めします。カスタムチェックの記述を含む `OpenMetricsCheck` インターフェイスの高度な使用方法については、[開発ツール][5]のセクションを参照してください。Prometheus チェックは、メトリクスのエンドポイントがテキスト形式をサポートしていない場合にのみ使用してください。

このページでは、このチェックの基本的な使用方法について説明します。これにより、カスタムメトリクスを Prometheus エンドポイントからスクレイピングできるようになります。

Datadog メトリクスにおける Prometheus および OpenMetrics メトリクスのマッピング方法に関する詳細は、[Datadog メトリクスにおける Prometheus メトリクスのマッピング][6]ガイドを参照してください。

## セットアップ

### インストール

[Kubernetes クラスターに Datadog Agent をデプロイします][7]。OpenMetrics および Prometheus チェックは [Datadog Agent][8] パッケージに含まれています。コンテナまたはホストに追加でインストールする必要はありません。

### コンフィギュレーション

OpenMetrics/Prometheus のメトリクスを公開する **pod** に以下の `annotations` を適用し、オートディスカバリーを使用して OpenMetrics または Prometheus のチェックを構成します。

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**注:** AD Annotations v2 は、インテグレーション構成を簡素化するために、Datadog Agent 7.36 で導入されました。Datadog Agent の以前のバージョンでは、AD Annotations v1 を使用してください。

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


`metrics` の構成は、カスタムメトリクスとして取得するメトリクスのリストです。取得する各メトリクスと Datadog で希望するメトリクス名をキー値のペアで、例えば `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}` のように記載します。代わりに、正規表現として解釈されるメトリクス名の文字列のリストを提供し、現在の名前で必要なメトリクスをもたらすことができます。**すべての**メトリクスが必要な場合は、`"*"` ではなく、`".*"` を使用します。

**注:** 正規表現では、多くのカスタムメトリクスを送信できる可能性があります。

`namespace` や `metrics` など、インスタンスで利用可能なパラメーターの一覧は、[構成例 openmetrics.d/conf.yaml][9] を参照してください。

## はじめに

### シンプルなメトリクスの収集

1. [Datadog Agent を起動します][10]。

2. [Prometheus `prometheus.yaml`][11] を使用して、ポッドにオートディスカバリーの構成をした Prometheus Deployment の例を起動します。
   {{< tabs >}}
   {{% tab "Kubernetes (AD v2)" %}}

   **注:** AD Annotations v2 は、インテグレーション構成を簡素化するために、Datadog Agent 7.36 で導入されました。Datadog Agent の以前のバージョンでは、AD Annotations v1 を使用してください。

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

### コンフィギュレーション

この機能を有効にする前に、まずどのポッドやサービスが `prometheus.io/scrape=true` アノテーションを持っているかをチェックすることをお勧めします。これは以下のコマンドで行うことができます。

```shell
kubectl get pods -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces

kubectl get services -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces
```

Prometheus Scrape 機能が有効になると、Datadog Agent はこれらのリソースからカスタムメトリクスを収集します。これらのリソースからカスタムメトリクスを収集したくない場合は、このアノテーションを削除するか、[高度な構成セクション](#advanced-configuration)で説明されているようにオートディスカバリールールを更新することができます。

#### 基本のコンフィギュレーション

{{< tabs >}}
{{% tab "Helm" %}}

Helm `values.yaml` で、以下を追加します。

```yaml
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
  # (...)
```
{{% /tab %}}
{{% tab "DaemonSet" %}}

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

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` の `additionalConfigs` コンフィギュレーションフィールドで、ネイティブの Prometheus アノテーション以外にも高度な OpenMetrics チェックコンフィギュレーションまたはオートディスカバリーのカスタムルールを定義することができます。

`additionalConfigs` は OpenMetrics チェックコンフィギュレーションとオートディスカバリーのルールを含む構造のリストです。

[このページの][2]パラメーターだけが、OpenMetrics v2 with Autodiscovery でサポートされており、構成リストで渡すことができます。

オートディスカバリーのコンフィギュレーションはコンテナ名、Kubernetes アノテーション、またはその両方に基づきます。`kubernetes_container_names` および `kubernetes_annotations` の両方が定義されている場合、AND のロジックが使用されます (両方のルールに一致する必要があります)。

- `kubernetes_container_names` は対象とするコンテナ名のリストで、正規表現形式です。
- `kubernetes_annotations` には、ディスカバリーのルールを定義する `include` と `exclude` の 2 つのアノテーションマップが含まれます。

**注:** Datadog Agent コンフィギュレーションでの `kubernetes_annotations` のデフォルト値は次の通りです:

```yaml
kubernetes_annotations:
  include:
     prometheus.io/scrape: "true"
  exclude:
     prometheus.io/scrape: "false"
```

**例:**

この例では、アノテーション `app=my-app` が付いたポッドで実行される `my-app` という名前のコンテナを対象とする高度なコンフィギュレーションを定義しています。`send_distribution_buckets` オプションを有効化し、5 秒のカスタムタイムアウトを定義することで、OpenMetrics チェックのコンフィギュレーションも同様にカスタマイズすることができます。

```yaml
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
    additionalConfigs:
      -
        configurations:
        - timeout: 5
          send_distribution_buckets: true
        autodiscovery:
          kubernetes_container_names:
            - my-app
          kubernetes_annotations:
            include:
              app: my-app
```


[1]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/autodiscovery/common/types/prometheus.go#L92-L100
{{% /tab %}}
{{% tab "DaemonSet" %}}

Agent と Cluster Agent のマニフェストの `DD_PROMETHEUS_SCRAPE_CHECKS` 環境変数で、ネイティブの Prometheus アノテーション以外にも高度な OpenMetrics チェックコンフィギュレーションまたはオートディスカバリーのカスタムルールを定義することができます。

`DD_PROMETHEUS_SCRAPE_CHECKS` は OpenMetrics チェックコンフィギュレーションとオートディスカバリーのルールを含む構造のリストです。

[このページの][2]パラメーターだけが、OpenMetrics v2 with Autodiscovery でサポートされており、構成リストで渡すことができます。

オートディスカバリーのコンフィギュレーションはコンテナ名、Kubernetes アノテーション、またはその両方に基づきます。`kubernetes_container_names` および `kubernetes_annotations` の両方が定義されている場合、AND のロジックが使用されます (両方のルールに一致する必要があります)。

- `kubernetes_container_names` は対象とするコンテナ名のリストで、正規表現形式です。
- `kubernetes_annotations` には、ディスカバリーのルールを定義する `include` と `exclude` の 2 つのアノテーションマップが含まれます。

**注:** Datadog Agent コンフィギュレーションでの `kubernetes_annotations` のデフォルト値は次の通りです:

```yaml
- name: DD_PROMETHEUS_SCRAPE_CHECKS
  value: "[{\"autodiscovery\":{\"kubernetes_annotations\":{\"exclude\":{\"prometheus.io/scrape\":\"false\"},\"include\":{\"prometheus.io/scrape\":\"true\"}}}}]"
```

**例:**

この例では、アノテーション `app=my-app` が付いたポッドで実行される `my-app` という名前のコンテナを対象とする高度なコンフィギュレーションを定義しています。`send_distribution_buckets` オプションを有効化し、5 秒のカスタムタイムアウトを定義することで、OpenMetrics チェックのコンフィギュレーションも同様にカスタマイズすることができます。

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_CHECKS
  value: "[{\"autodiscovery\":{\"kubernetes_annotations\":{\"include\":{\"app\":\"my-app\"}},\"kubernetes_container_names\":[\"my-app\"]},\"configurations\":[{\"send_distribution_buckets\":true,\"timeout\":5}]}]"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```


[1]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/autodiscovery/common/types/prometheus.go#L92-L100
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