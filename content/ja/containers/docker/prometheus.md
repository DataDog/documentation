---
aliases:
- /ja/agent/docker/prometheus
further_reading:
- link: /agent/docker/log/
  tag: Documentation
  text: Collect your application logs
- link: /agent/docker/apm/
  tag: Documentation
  text: Collect your application traces
- link: /agent/docker/integrations/
  tag: Documentation
  text: Collect automatically your applications metrics and logs
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limit data collection to a subset of containers only
- link: /agent/docker/tag/
  tag: Documentation
  text: Assign tags to all data emitted by a container
title: Docker Prometheus and OpenMetrics metrics collection
---

Datadog Agent と [Datadog-OpenMetrics][1] または [Datadog-Prometheus][2] インテグレーションを併用して、コンテナ内で実行されているアプリケーションから、公開されている Prometheus および OpenMetrics メトリクスを収集します。

## 概要

バージョン 6.5.0 より、Agent には [OpenMetrics][3] および [Prometheus][4] チェックが用意され、Prometheus エンドポイントをスクレイピングできます。Prometheus テキスト形式を効率よくフルにサポートできるため、Datadog では OpenMetrics チェックの 使用をお勧めします。カスタムチェックの記述を含む `OpenMetricsCheck` インターフェイスの高度な使用方法については、[開発ツール][5]のセクションを参照してください。Prometheus チェックは、メトリクスのエンドポイントがテキスト形式をサポートしていない場合にのみ使用してください。

このページでは、これらのチェックの基本的な使用方法について説明します。これにより、Datadog 内のすべての Prometheus 公開メトリクスをインポートできるようになります。

このページの CLI コマンドは Docker ランタイム用です。containerd ランタイムは `docker` を `nerdctl` に、Podman ランタイムは `podman` に置き換えてください。

## セットアップ

### インストール

以下のコマンドで、`<DATADOG_API_KEY>` を自身のオーガニゼーションの API キーに置き換えて、その他のコンテナに隣接する Docker Agent を起動します。

{{< tabs >}}
{{% tab "標準" %}}

```shell
docker run -d --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Amazon Linux バージョン < 2" %}}

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Windows" %}}

```shell
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

**注**: Datadog サイトは {{< region-param key="dd_site" code="true" >}} です。

### 構成

Agent は、Docker 上で実行されているかどうかを検出し、すべてのコンテナラベルの中から Datadog-OpenMetrics ラベルを自動検索します。オートディスカバリーは、ファイルの種類に応じて、ラベルが以下の例のようになっていることを前提とします。

{{< tabs >}}
{{% tab "Dockerfile" %}}

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint":"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>","namespace":"<NAMESPACE>","metrics":[{"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}]}]'
```

#### 複数のエンドポイントの例

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics","openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{},{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint":"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>","namespace":"<NAMESPACE>","metrics":[{"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}]}, {"openmetrics_endpoint":"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>","namespace":"<NAMESPACE>","metrics":[{"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}]}]'
```

{{% /tab %}}
{{% tab "docker-compose.yaml" %}}

```yaml
labels:
  com.datadoghq.ad.check_names: '["openmetrics"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: |
    [
      {
        "openmetrics_endpoint": "http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>",
        "namespace": "<NAMESPACE>",
        "metrics": [
          {"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}
        ]
      }
    ]
```

**複数のエンドポイントの例**:

```yaml
labels:
  com.datadoghq.ad.check_names: '["openmetrics", "openmetrics"]'
  com.datadoghq.ad.init_configs: '[{},{}]'
  com.datadoghq.ad.instances: |
    [
      {
        "openmetrics_endpoint": "http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>",
        "namespace": "<NAMESPACE>",
        "metrics": [
          {"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}
        ]
      },
      {
        "openmetrics_endpoint": "http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>",
        "namespace": "<NAMESPACE>",
        "metrics": [
          {"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}
        ]
      }
    ]
```

{{% /tab %}}
{{% tab "Docker 実行コマンド" %}}

```shell
# single metric
-l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}]"
```

**Examples of metrics formatting in `com.datadoghq.ad.instances`**

```shell
# multiple metrics
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}, {\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}]"
```

```shell
# all metrics of a base type
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[\"<METRIC_BASE_TO_FETCH>.*\"]}]"
```

```shell
# all metrics
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[\".*\"]}]"
```

**複数のエンドポイントの例**:

```shell
-l com.datadoghq.ad.check_names='["openmetrics", "openmetrics"]' -l com.datadoghq.ad.init_configs='[{},{}]' -l com.datadoghq.ad.instances='["{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}", "{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
```

{{% /tab %}}
{{< /tabs >}}

コンフィギュレーションには次のプレースホルダー値を使用します。

| プレースホルダー             | 説明                                                                                                                               |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `<PROMETHEUS_PORT>`     | Prometheus のエンドポイントにアクセスするための接続先ポート。代わりに[オートディスカバリーテンプレート変数][6] `%%port%%` を使用することも可能です。 |
| `<PROMETHEUS_ENDPOINT>` | コンテナによって処理されたメトリクスの URL パス (Prometheus 形式)。                                                                   |
| `<NAMESPACE>`           | Datadog で表示するときに、すべてのメトリクスの前にネームスペースを付加します。                                                                      |
| `<METRIC_TO_FETCH>`     | Prometheus エンドポイントから取得される Prometheus メトリクスキー。                                                                        |
| `<NEW_METRIC_NAME>`     | Datadog の `<METRIC_TO_FETCH>` メトリクスキーを `<NEW_METRIC_NAME>` に変換します。                                                          |


`metrics` の構成は、カスタムメトリクスとして取得するメトリクスのリストです。取得する各メトリクスと Datadog で希望するメトリクス名をキー値のペアで、例えば `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}` のように記載します。代わりに、正規表現として解釈されるメトリクス名の文字列のリストを提供し、現在の名前で必要なメトリクスをもたらすことができます。**注:** 正規表現では、多くのカスタムメトリクスを送信できる可能性があります。

`namespace` や `metrics` など、インスタンスで利用可能なパラメーターの一覧は、[構成例 openmetrics.d/conf.yaml][7] を参照してください。

## はじめに

### シンプルなメトリクスの収集

コンテナ内で動作する Prometheus によって公開されたメトリクスの収集を開始するには、次の手順に従います。

1. Datadog Agent を起動します。
    {{< tabs >}}
    {{% tab "Standard" %}}

```shell
docker run -d --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    gcr.io/datadoghq/agent:latest
```
    {{% /tab %}}
    {{% tab "Windows" %}}

```shell
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
    gcr.io/datadoghq/agent:latest \
    -v \\.\pipe\docker_engine:\\.\pipe\docker_engine
```
    {{% /tab %}}
    {{< /tabs >}}

2. OpenMetrics チェック用の Autodiscovery Labels を使用して、Agent が収集するサンプルメトリクスを公開する Prometheus コンテナを起動します。

   &nbsp;以下のラベルは、Agent が `promhttp_metric_handler_requests`、`promhttp_metric_handler_requests_in_flight`、および `go_memory` で始まるすべての公開メトリクスを収集することを意味します。

    ```yaml
    labels:
      com.datadoghq.ad.check_names: '["openmetrics"]'
      com.datadoghq.ad.init_configs: '[{}]'
      com.datadoghq.ad.instances:  |
        [
          {
            "openmetrics_endpoint": "http://%%host%%:%%port%%/metrics",
            "namespace": "documentation_example_docker",
            "metrics": [
              {"promhttp_metric_handler_requests": "handler.requests"},
              {"promhttp_metric_handler_requests_in_flight": "handler.requests.in_flight"},
              "go_memory.*"
            ]
          }
        ]
    ```
   これらのラベルで Prometheus コンテナのサンプルを起動するには、次を実行します。

    ```shell
    docker run -d -l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances='[{"openmetrics_endpoint":"http://%%host%%:%%port%%/metrics","namespace":"documentation_example_docker","metrics":[{"promhttp_metric_handler_requests":"handler.requests"},{"promhttp_metric_handler_requests_in_flight":"handler.requests.in_flight"},"go_memory.*"]}]' prom/prometheus
    ```

3. [Metric summary][8] ページにアクセスし、収集したメトリクスを確認します。

    {{< img src="integrations/guide/prometheus_docker/openmetrics_v2_collected_metric_docker.png" alt="Docker で収集された Prometheus メトリクス">}}

## カスタムインテグレーションを公式インテグレーションに

デフォルトでは、汎用の Prometheus チェックによって取得されるすべてのメトリクスが、カスタムメトリクスだと見なされます。既製ソフトウェアを監視されて、公式のインテグレーションにするべきだと思われた場合は、[ぜひご提供をお願いします][5]。

公式インテグレーションは、それぞれ専用のディレクトリを持ちます。汎用のチェックには、デフォルトの構成とメトリクスメタデータをハードコードするためのデフォルトのインスタンスメカニズムがあります。たとえば、[kube-proxy][9] インテグレーションを参照します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/openmetrics/
[2]: /ja/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /ja/developers/custom_checks/prometheus/
[6]: https://docs.datadoghq.com/ja/agent/guide/template_variables/
[7]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[8]: https://app.datadoghq.com/metric/summary
[9]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy