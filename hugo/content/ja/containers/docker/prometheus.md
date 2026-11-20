---
aliases:
- /ja/agent/docker/prometheus
description: Datadog Agent を使用して、コンテナ化された Docker アプリケーションから Prometheus および OpenMetrics
  メトリクスを収集します。
further_reading:
- link: /agent/docker/log/
  tag: ドキュメント
  text: アプリケーションログの収集
- link: /agent/docker/apm/
  tag: ドキュメント
  text: アプリケーショントレースの収集
- link: /agent/docker/integrations/
  tag: ドキュメント
  text: アプリケーションのメトリクスとログを自動で収集
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/docker/tag/
  tag: ドキュメント
  text: コンテナから送信された全データにタグを割り当てる
title: Docker Prometheus および OpenMetrics メトリクスの収集
---
Datadog Agent と [Datadog-OpenMetrics][1] または [Datadog-Prometheus][2] インテグレーションを使用して、コンテナ内で実行されているアプリケーションから公開されている Prometheus および OpenMetrics メトリクスを収集します。

## 概要 {#overview}

バージョン 6.5.0 以降、Agent には、Prometheus エンドポイントをスクレイピングできる [OpenMetrics][3] と [Prometheus][4] チェックが含まれています。Datadog では、OpenMetrics チェックの方が効率的であり、Prometheus テキスト形式を完全にサポートしているため、その使用を推奨します。カスタムチェックの記述を含む `OpenMetricsCheck` インターフェイスの高度な使用方法については、[開発ツール][5] のセクションを参照してください。Prometheus チェックを使用するのは、メトリクスエンドポイントでテキスト形式がサポートされていない場合だけにしてください。

このページでは、これらのチェックの基本的な使い方を説明し、Prometheus で公開されているすべてのメトリクスを Datadog に取り込めるようにします。

このページの CLI コマンドは Docker ランタイム用です。containerd ランタイムは `docker` を `nerdctl` に、Podman ランタイムは `podman` に置き換えてください。

## セットアップ {#setup}

### インストール {#installation}

以下のコマンドの `<DATADOG_API_KEY>` を組織の API キーに置き換えて、他のコンテナと並行して Docker Agent を起動します。

{{< tabs >}}
{{% tab "標準的な方法" %}}

```shell
docker run -d --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    registry.datadoghq.com/agent:latest
```

{{% /tab %}}
{{% tab "Amazon Linux バージョン < 2" %}}

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    registry.datadoghq.com/agent:latest
```

{{% /tab %}}
{{% tab "Windows" %}}

```shell
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    registry.datadoghq.com/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

**注**: Datadog サイトは {{< region-param key="dd_site" code="true" >}}です。

### 構成 {#configuration}

Agent は Docker 上で実行されているかどうかを検出し、すべてのコンテナラベルから Datadog-OpenMetrics ラベルを自動的に検索します。Autodiscovery では、ファイルタイプに応じてラベルが以下の例のようになることが想定されます。

{{< tabs >}}
{{% tab "Dockerfile" %}}

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint":"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>","namespace":"<NAMESPACE>","metrics":[{"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}]}]'
```

#### 複数のエンドポイントの例 {#multiple-endpoints-example}

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
{{% tab "Docker run コマンド" %}}

```shell
# single metric
-l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}]"
```

**`com.datadoghq.ad.instances`** におけるメトリクスフォーマットの例

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

次の構成プレースホルダー値を使用します。

| プレースホルダー             | 説明                                                                                                                               |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `<PROMETHEUS_PORT>`     | Prometheus エンドポイントにアクセスするために接続するポート。代わりに、[Autodiscovery テンプレート変数][6] `%%port%%` を使用することもできます。|
| `<PROMETHEUS_ENDPOINT>` | コンテナによって提供される Prometheus 形式のメトリクスの URL パス。                                                                  |
| `<NAMESPACE>`           | Datadog で表示する際にすべてのメトリクス名の先頭に付与するネームスペースを設定します。                                                                     |
| `<METRIC_TO_FETCH>`     | Prometheus エンドポイントから取得する Prometheus メトリクスキー。                                                                       |
| `<NEW_METRIC_NAME>`     | Datadog で `<METRIC_TO_FETCH>` メトリクスキーを `<NEW_METRIC_NAME>` に変換します。                                                         |


`metrics` 構成は、カスタムメトリクスとして取得するメトリクスのリストです。取得する各メトリクスと、Datadog での希望するメトリクス名を、キーと値のペアとして含めてください (例: `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}` など)。その代わりに、希望するメトリクスを現在の名前で取得するため、正規表現として解釈されるメトリクス名の文字列リストを提供することもできます。**注:** 正規表現を使うと、大量のカスタムメトリクスが送信される可能性があります。

`namespace` や `metrics` など、インスタンスで利用可能なパラメーターの完全なリストについては、[構成例 openmetrics.d/conf.yaml][7] を参照してください。

## はじめに{#getting-started}

### シンプルなメトリクスの収集 {#simple-metric-collection}

コンテナ内で実行されている Prometheus によって公開されたメトリクスの収集を開始するには、次の手順に従います。

1. Datadog Agent を起動します。
    {{< tabs >}}
    {{% tab "標準的な方法" %}}

```shell
docker run -d --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    registry.datadoghq.com/agent:latest
```
    {{% /tab %}}
    {{% tab "Windows" %}}

```shell
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
    registry.datadoghq.com/agent:latest \
    -v \\.\pipe\docker_engine:\\.\pipe\docker_engine
```
    {{% /tab %}}
    {{< /tabs >}}

2. OpenMetrics チェック用の Autodiscovery ラベルを使用して、Agent が収集するサンプルメトリクスを公開する Prometheus コンテナを起動します。

    以下のラベルにより、Agent はメトリクス `promhttp_metric_handler_requests`、`promhttp_metric_handler_requests_in_flight`、および `go_memory` で始まるすべての公開メトリクスを収集します。

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
    To launch an example Prometheus container with these labels you can run:

    ```shell
    docker run -d -l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances='[{"openmetrics_endpoint":"http://%%host%%:%%port%%/metrics","namespace":"documentation_example_docker","metrics":[{"promhttp_metric_handler_requests":"handler.requests"},{"promhttp_metric_handler_requests_in_flight":"handler.requests.in_flight"},"go_memory.*"]}]' prom/prometheus
    ```

3. 収集されたメトリクスを確認するには、[Metrics Catalog][8] ページに移動します。

    {{< img src="integrations/guide/prometheus_docker/openmetrics_v2_collected_metric_docker.png" alt="Docker で収集された Prometheus メトリクス">}}

## カスタムインテグレーションを公式インテグレーションに{#from-custom-to-official-integration}

デフォルトでは、Prometheus の汎用チェックで取得されたすべてのメトリクスは、カスタムメトリクスとみなされます。市販のソフトウェアを監視していて、公式の統合に値すると考える場合は、遠慮なく[投稿でお知らせ][5]ください。

公式の統合には、それぞれ専用のディレクトリがあります。汎用チェックには、デフォルト構成およびメトリクスメタデータをハードコーディングするためのデフォルトインスタンスメカニズムがあります。たとえば、[kube-proxy][9] インテグレーションを参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/openmetrics/
[2]: /ja/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /ja/extend/custom_checks/prometheus/
[6]: https://docs.datadoghq.com/ja/agent/guide/template_variables/
[7]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[8]: https://app.datadoghq.com/metric/catalog
[9]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy