---
aliases:
- /ja/getting_started/prometheus
- /ja/getting_started/integrations/prometheus
- /ja/agent/openmetrics
- /ja/agent/prometheus
- /ja/agent/kubernetes/prometheus
description: Datadog Agent と Autodiscovery を使用することにより、Kubernetes ワークロードから Prometheus
  と OpenMetrics を収集します。
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: ブログ
  text: Kubernetes オペレーターを監視して、アプリケーションがスムーズに動作するようにします。
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
## 概要 {#overview}

Datadog Agent と [OpenMetrics][1] または [Prometheus][2] のインテグレーションを併用して、Kubernetes 内で実行されているアプリケーションから、公開されている Prometheus および OpenMetrics メトリクスを収集します。デフォルトでは、Prometheus の汎用チェックで取得されたすべてのメトリクスは、カスタムメトリクスとみなされます。

バージョン 6.5.0 以降、Agent には、Prometheus エンドポイントをスクレイピングできる [OpenMetrics][3] と [Prometheus][4] チェックが含まれています。カスタムチェックの記述を含む `OpenMetricsCheck` インターフェイスの高度な使用方法については、[開発ツール][5]のセクションを参照してください。

このページでは、このチェックの基本的な使用方法について説明します。これにより、カスタムメトリクスを Prometheus エンドポイントからスクレイピングできるようになります。Datadog メトリクスにおける Prometheus および OpenMetrics メトリクスのマッピング方法に関する詳細は、[Datadog メトリクスにおける Prometheus メトリクスのマッピング][6]ガイドを参照してください。

**注**: Datadog では、OpenMetrics チェックを使用することを推奨しています。それは、より効率的であり、Prometheus テキスト形式をフルにサポートしているためです。Prometheus チェックを使用するのは、メトリクスエンドポイントでテキスト形式がサポートされていない場合だけにしてください。

## セットアップ {#setup}

### インストール {#installation}

[Kubernetes クラスターに Datadog Agent をデプロイします][7]。OpenMetrics および Prometheus チェックは [Datadog Agent][8] パッケージに含まれています。コンテナまたはホストに追加でインストールする必要はありません。

### 構成 {#configuration}

OpenMetrics/Prometheus のメトリクスを公開する **pod** に以下の `annotations` を適用し、Autodiscovery を使用して OpenMetrics または Prometheus のチェックを構成します。

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**注:** AD Annotations v2 は、インテグレーション構成を簡素化するために、Datadog Agent バージョン 7.36 で導入されました。Datadog Agent の以前のバージョンでは、AD Annotations v1 を使用してください。

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
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
    - name: '<CONTAINER_NAME>'
```

{{% /tab %}}
{{% tab "Kubernetes (AD v1)" %}}

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.check_names: |
      ["openmetrics"]
    ad.datadoghq.com/<CONTAINER_NAME>.init_configs: |
      [{}]
    ad.datadoghq.com/<CONTAINER_NAME>.instances: |
      [
        {
          "openmetrics_endpoint": "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT> ",
          "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
          "metrics": [{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}]
        }
      ]
spec:
  containers:
    - name: '<CONTAINER_NAME>'
```

{{% /tab %}}
{{< /tabs >}}

次の構成プレースホルダー値を使用します。

| プレースホルダー                              | 説明                                                                                        |
|------------------------------------------|----------------------------------------------------------------------------------------------------|
| `<CONTAINER_NAME>`                 | メトリクスを公開するコンテナの名前と一致します。|
| `<PROMETHEUS_ENDPOINT>`                  | コンテナによって処理されたメトリクスの URL パス (Prometheus 形式)。                           |
| `<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>` | Datadog で表示する際に、すべてのメトリクスの前にネームスペースを付加します。                              |
| `<METRIC_TO_FETCH>`                      | Prometheus エンドポイントから取得される Prometheus メトリクスキー。                                |
| `<NEW_METRIC_NAME>`                      | Datadog で `<METRIC_TO_FETCH>` メトリクスキーを `<NEW_METRIC_NAME>` に変換します。                  |


`metrics` 構成は、カスタムメトリクスとして取得するメトリクスのリストです。取得する各メトリクスと、Datadog での希望するメトリクス名を、キーと値のペアとして含めてください(例: `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}` など)。カスタムメトリクスの料金が高くなりすぎるのを防ぐため、Datadog では、必要なメトリクスのみを含めるようにスコープを制限することを推奨しています。その代わりに、希望するメトリクスを現在の名前で取得するため、正規表現として解釈されるメトリクス名の文字列リストを提供することもできます。**すべて**のメトリクスが必要な場合は、`"*"` の代わりに `".*"` を使用してください。

**注:** 正規表現を使うと、大量のカスタムメトリクスが送信される可能性があります。

`namespace` や `metrics` など、インスタンスで利用可能なパラメーターの完全なリストについては、[構成例 openmetrics.d/conf.yaml][9] を参照してください。

**注**: チェックは、デフォルトで 2000 メトリクスに制限されています。この制限を変更するには、オプションとして `max_returned_metrics` パラメーターを指定してください。

## はじめに {#getting-started}

### シンプルなメトリクスの収集 (OpenMetrics チェック){#simple-metric-collection-openmetrics-check}

1. [Datadog Agent を起動します][10]。

2. [Prometheus `prometheus.yaml`][11] を使用して、Pod 上に Autodiscovery を構成したサンプル Prometheus Deployment を起動します。
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

     Command to create the Prometheus Deployment:

    ```shell
    kubectl create -f prometheus.yaml
    ```

3. [Fleet Automation][16] ページに移動し、`openmetrics` 統合をフィルタリングして、チェックのステータスに関する詳細情報を表示します。

4. [メトリクス概要][12] ページに移動して、この例の Pod から収集されたメトリクスを確認します。この構成では、メトリクス `promhttp_metric_handler_requests` および `promhttp_metric_handler_requests_in_flight` に加えて、`go_memory` で始まるすべての公開メトリクスを収集します。

    {{< img src="integrations/guide/prometheus_kubernetes/openmetrics_v2_collected_metric_kubernetes.png" alt="Kubernetes における Prometheus メトリクスの収集">}}

## Prometheus アノテーションによるメトリクスの収集 (Prometheus チェック) {#metric-collection-with-prometheus-annotations-prometheus-check}

Prometheus Autodiscovery を使用して、Datadog Agent でネイティブ Prometheus アノテーション (`prometheus.io/scrape`、`prometheus.io/path`、`prometheus.io/port` など) を検出し、Kubernetes で自動的に Prometheus メトリクスを収集するよう OpenMetrics チェックをスケジュールできます。

**注**: Datadog では、OpenMetrics チェックを使用することを推奨しています。それは、より効率的であり、Prometheus テキスト形式をフルにサポートしているためです。Prometheus チェックを使用するのは、メトリクスエンドポイントでテキスト形式がサポートされていない場合だけにしてください。

### 要件 {#requirements}

- Datadog Agent v7.27 以降または v6.27 以降 (Pod チェックの場合)
- Datadog Cluster Agent v1.11 以降 (サービスとエンドポイントチェックの場合)

### 構成 {#configuration-1}

この機能を有効にする前に、どの Pod とサービスに `prometheus.io/scrape=true` アノテーションがあるか最初に確認することをお勧めします。これは、以下のコマンドで実行できます。

```shell
kubectl get pods -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces

kubectl get services -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces
```

Prometheus スクレイプ機能が有効になると、Datadog Agent はそれらのリソースからカスタムメトリクスを収集します。これらのリソースからはカスタムメトリクスを収集しないようにする場合は、このアノテーションを削除するか、[高度な構成のセクション](#advanced-configuration)に記載されている説明に従って Autodiscovery ルールを更新することができます。

**注**: 高度な構成なしでこの機能を有効にすると、カスタムメトリクスが大幅に増加し、料金に影響を与える可能性があります。[高度な構成のセクション](#advanced-configuration)を参照して、特定のコンテナ/Pod/サービスからのみメトリクスを収集する方法について詳細をご確認ください。

#### 基本構成 {#basic-configuration}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

次の内容を含むように Datadog Operator 設定を更新してください。

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

次の内容を含むように Helm 設定を更新してください。

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

これにより、Datadog Agent がネイティブ Prometheus アノテーションのある Pod を検出し、対応する OpenMetrics チェックを生成するようになります。

また、Datadog Cluster Agent (有効な場合) にネイティブ Prometheus アノテーションのあるサービスを検出し、対応する OpenMetrics チェックを生成するよう指示します。

- `prometheus.io/scrape=true`: 必須。
- `prometheus.io/path`: オプション、デフォルトは `/metrics`。
- `prometheus.io/port`: オプション。デフォルトは `%%port%%` であり、コンテナ/サービスのポートにより置換される[テンプレート変数][13]です。

このコンフィギュレーションでは、[OpenMetrics インテグレーション][1]のデフォルトコンフィギュレーションを使用して、公開されたすべてのメトリクスを収集するチェックを生成します。

#### 高度な構成 {#advanced-configuration}

`additionalConfigs` フィールドを使用して、(ネイティブ Prometheus アノテーションを超えて) メトリクス収集をさらに構成できます。

##### 追加の OpenMetrics チェック構成 {#additional-openmetrics-check-configurations}

追加の OpenMetrics チェック構成を定義するには、`additionalConfigs.configurations` を使用します。`additionalConfigs`に渡すことができるパラメーターについては、[サポートされている OpenMetrics パラメーターのリスト][15]を参照してください。

##### カスタム Autodiscovery ルール {#custom-autodiscovery-rules}

カスタム Autodiscovery ルールを定義するには、`additionalConfigs.autodiscovery` を使用します。これらのルールは、コンテナ名、Kubernetes アノテーション、またはその両方に基づいて指定できます。

`additionalConfigs.autodiscovery.kubernetes_container_names`
: 対象とするコンテナ名のリスト、正規表現形式。

`additionalConfigs.autodiscovery.kubernetes_annotations`
: Autodiscovery ルールを定義するためのアノテーションの 2 つのマップ (`include` と `exclude`)。

  デフォルト:
  ```yaml
  include:
     prometheus.io/scrape: "true"
  exclude:
     prometheus.io/scrape: "false"
  ```

`kubernetes_container_names` と `kubernetes_annotations` の両方が定義されている場合、**AND** ロジックが使用されます (両方のルールが一致する必要があります)。

##### 例 {#examples}

次の構成は、アノテーションが `app=my-app` の Pod で実行されている `my-app` という名前のコンテナをターゲットとしています。OpenMetrics チェック構成は、`send_distribution_buckets` オプションを有効にし、5 秒のカスタムタイムアウトを定義するようにカスタマイズされています。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

次の内容を含むように Datadog Operator 設定を更新してください。

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
      additionalConfigs: |-
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
{{% tab "手動 (DaemonSet)" %}}

DaemonSet の場合、高度な構成は、`additionalConfigs` フィールドではなく `DD_PROMETHEUS_SCRAPE_CHECKS` 環境変数で定義されます。

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

## カスタムインテグレーションを公式インテグレーションに{#from-custom-to-official-integration}

デフォルトでは、Prometheus の汎用チェックで取得されたすべてのメトリクスは、カスタムメトリクスとみなされます。市販のソフトウェアを監視していて、公式の統合に値すると考える場合は、遠慮なく[投稿でお知らせ][5]ください！

公式の統合には、それぞれ専用のディレクトリがあります。汎用チェックには、デフォルト構成およびメトリクスメタデータをハードコーディングするためのデフォルトインスタンスメカニズムがあります。たとえば、[kube-proxy][14]の統合を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/openmetrics/
[2]: /ja/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /ja/extend/custom_checks/prometheus/
[6]: /ja/integrations/guide/prometheus-metrics
[7]: /ja/agent/kubernetes/#installation
[8]: /ja/getting_started/tagging/
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[11]: /ja/resources/yaml/prometheus.yaml
[12]: https://app.datadoghq.com/metric/summary
[13]: /ja/agent/faq/template_variables/
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/common/types/prometheus.go#L57-L123
[16]: https://app.datadoghq.com/fleet?query=integration:openmetrics