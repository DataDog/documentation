---
title: Docker Prometheus および OpenMetrics メトリクスの収集
kind: ドキュメント
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
    text: コンテナから送信された全データにタグを割り当て
---
Datadog Agent と [Datadog-OpenMetrics][1] または [Datadog-Prometheus][2] インテグレーションを併用して、コンテナ内で実行されているアプリケーションから、公開されている Prometheus および OpenMetrics メトリクスを収集します。

## 概要

バージョン 6.5.0 より、Agent には [OpenMetrics][3] および [Prometheus][4] チェックが用意され、Prometheus エンドポイントをスクレイピングできます。Prometheus テキスト形式を効率よくフルにサポートできるため、Datadog では OpenMetrics チェックの 使用をお勧めします。カスタムチェックの記述を含む `OpenMetricsCheck` インターフェイスの高度な使用方法については、[開発ツール][5]のセクションを参照してください。Prometheus チェックは、メトリクスのエンドポイントがテキスト形式をサポートしていない場合にのみ使用してください。

このページでは、これらのチェックの基本的な使用方法について説明します。これにより、Datadog 内のすべての Prometheus 公開メトリクスをインポートできるようになります。

## セットアップ

### インストール

以下のコマンドで、`<DATADOG_API_KEY>` を自身のオーガニゼーションの API キーに置き換えて、その他のコンテナに隣接する Docker Agent を起動します。

{{< tabs >}}
{{% tab "標準" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY="<DATADOG_API_KEY>" \
              -e DD_SITE="<YOUR_DATADOG_SITE>" \
              datadog/agent
```

{{% /tab %}}
{{% tab "Amazon Linux バージョン <2" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro \
                              -v /proc/:/host/proc/:ro \
                              -v /cgroup/:/host/sys/fs/cgroup:ro \
                              -e DD_API_KEY="<DATADOG_API_KEY>" \
                              -e DD_SITE="<YOUR_DATADOG_SITE>" \
                              datadog/agent

```

{{% /tab %}}
{{% tab "Windows" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
              -e DD_SITE="<YOUR_DATADOG_SITE>" \
              datadog/agent
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
LABEL "com.datadoghq.ad.instances"='["{\"prometheus_url\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
```

{{% /tab %}}
{{% tab "docker-compose.yaml" %}}

```yaml
labels:
    com.datadoghq.ad.check_names: '["openmetrics"]'
    com.datadoghq.ad.init_configs: '[{}]'
    com.datadoghq.ad.instances:  >
    [
      "{\
        "prometheus_url\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",
        \"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]
      }"
    ]
```

{{% /tab %}}
{{% tab "Docker 実行コマンド" %}}

```shell
-l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances='["{\"prometheus_url\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
```

{{% /tab %}}
{{< /tabs >}}

コンフィギュレーションには次のプレースホルダー値を使用します。

| プレースホルダー                              | 説明                                                                                                                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<PROMETHEUS_PORT>`                      | Prometheus エンドポイントにアクセスするための接続先ポート。                                                                                                                                                 |
| `<PROMETHEUS_ENDPOINT>`                  | コンテナによって処理されたメトリクスの URL (Prometheus 形式)。                                                                                                                                             |
| `<NAMESPACE>` | Datadog で表示するときに、すべてのメトリクスの前にネームスペースを付加します。                                                                                                                                           |
| `<METRIC_TO_FETCH>`                      | Prometheus エンドポイントから取得される Prometheus メトリクスキー。                                                                                                                                             |
| `<NEW_METRIC_NAME>`                      | オプションパラメーター。設定すると、`<METRIC_TO_FETCH>` メトリクスキーは Datadog の `<NEW_METRIC_NAME>` に変換されます。このオプションを使用しない場合は、`key:value` ペアではなく、文字列のリストを渡します。 |

**注**: 使用可能なすべてのコンフィギュレーションオプションについては、サンプル [openmetrics.d/conf.yaml][6] を参照してください。

## はじめに

### シンプルなメトリクスの収集

コンテナ内で動作する Prometheus によって公開されたメトリクスの収集を開始するには、次の手順に従います。

1. Datadog Agent を起動します。
    {{< tabs >}}
    {{% tab "Standard" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY="<DATADOG_API_KEY>" \
              datadog/agent
```
    {{% /tab %}}
    {{% tab "Windows" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
              datadog/agent \
              -v \\.\pipe\docker_engine:\\.\pipe\docker_engine
```
    {{% /tab %}}
    {{< /tabs >}}

2. コンテナで Prometheus を起動するには、`docker run -p 9090:9090 prom/prometheus` を実行します。Agent に OpenMetrics チェックでこのコンテナにクエリするよう通知する場合は、以下のコンフィギュレーションを使用します。

    ```shell
    -l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances='[  {"prometheus_url":"http://%%host%%:%%port%%/metrics","namespace":"documentation_example_docker","metrics":[ {"promhttp_metric_handler_requests_total": "prometheus.handler.requests.total"}]}]'
    ```

     オートディスカバリーの動作に適切なアノテーションを設定して Prometheus コンテナを起動する場合は、以下を実行します。

    ```shell
    docker run -p 9090:9090 -l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com. datadoghq.ad.instances='[{"prometheus_url":"http://%%host%%:%%port%%/metrics","namespace":"documentation_example_docker",  "metrics":[{"promhttp_metric_handler_requests_total": "prometheus.handler.requests.total"}]}]' prom/prometheus
    ```

3. [メトリクスの概要][7]ページに移動して、収集されたメトリクス `prometheus_target_interval_length_seconds*` を確認します。

    {{< img src="integrations/guide/prometheus_docker/prometheus_collected_metric_docker.png" alt="Docker で収集された Prometheus メトリクス">}}

## カスタムインテグレーションを公式インテグレーションに

デフォルトでは、汎用の Prometheus チェックによって取得されるすべてのメトリクスが、カスタムメトリクスだと見なされます。既製ソフトウェアを監視されて、公式のインテグレーションにするべきだと思われた場合は、[ぜひご提供をお願いします][5]。

公式インテグレーションは、それぞれ専用のディレクトリを持ちます。汎用のチェックには、デフォルトの構成とメトリクスメタデータをハードコードするためのデフォルトのインスタンスメカニズムがあります。たとえば、[kube-proxy][8] インテグレーションを参照します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/openmetrics/
[2]: /ja/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /ja/developers/prometheus/
[6]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[7]: https://app.datadoghq.com/metric/summary
[8]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy