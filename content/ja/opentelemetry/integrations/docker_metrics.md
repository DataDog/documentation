---
aliases:
- /ja/opentelemetry/collector_exporter/docker_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
title: Docker メトリクス
---

## 概要

{{< img src="/opentelemetry/collector_exporter/docker_metrics.png" alt="Containers ダッシュボードの OpenTelemetry Docker メトリクス" style="width:100%;" >}}

コンテナメトリクスを収集するには、Datadog Exporter で [Docker 統計レシーバー][1]を構成します。

詳しくは、OpenTelemetry プロジェクトドキュメントの [Docker 統計レシーバー][1]を参照してください。


## Setup

{{< tabs >}}
{{% tab "ホスト" %}}

Docker 統計レシーバーは Docker ソケットにアクセスする必要があります。デフォルトでは、レシーバーは `unix:///var/run/docker.sock` にある Docker ソケットを探します。これが Docker ソケットのパスでない場合は、`endpoint` 構成行でパスを指定してください。

Collector の構成に以下の行を追加します。

```yaml
receivers:
  docker_stats:
    endpoint: unix:///var/run/docker.sock # (デフォルト)
    metrics:
      container.network.io.usage.rx_packets:
        enabled: true
      container.network.io.usage.tx_packets:
        enabled: true
      container.cpu.usage.system:
        enabled: true
      container.memory.rss:
        enabled: true
      container.blockio.io_serviced_recursive:
        enabled: true
      container.uptime:
        enabled: true
      container.memory.hierarchical_memory_limit:
        enabled: true
```
**注**: コレクターイメージを使用している場合、[コレクターが Docker ソケットにアクセスできるように追加の権限を構成する][1]必要があるかもしれません。

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/issues/11791

{{% /tab %}}

{{% tab "Kubernetes" %}}

Docker 統計レシーバーは Docker ソケットにアクセスする必要があります。Kubernetes では、ランタイムとして Docker を実行している場合、Docker ソケットをマウントしてください。

以下の行を `values.yaml` に追加します。
```yaml
extraVolumes:
 - name: docker-sock
   hostPath:
     path: /var/run/docker.sock
extraVolumeMounts:
 - name: docker-sock
   mountPath: /var/run/docker.sock
```

Collector 構成に以下を追加します。

```yaml
receivers:
  docker_stats:
    endpoint: unix:///var/run/docker.sock # デフォルト
    metrics:
      container.network.io.usage.rx_packets:
        enabled: true
      container.network.io.usage.tx_packets:
        enabled: true
      container.cpu.usage.system:
        enabled: true
      container.memory.rss:
        enabled: true
      container.blockio.io_serviced_recursive:
        enabled: true
      container.uptime:
        enabled: true
      container.memory.hierarchical_memory_limit:
        enabled: true
```

{{% /tab %}}

{{< /tabs >}}

## Data collected

収集されたコンテナメトリクスについては、[OpenTelemetry メトリクスのマッピング][2]を参照してください。


## 完全な構成例

Datadog Exporter を用いた実際に動作する構成の完全な例については、[`docker-stats.yaml`][3] を参照してください。

## ログ出力例

```
Resource SchemaURL: https://opentelemetry.io/schemas/1.6.1
Resource attributes:
     -> container.runtime: Str(docker)
     -> container.hostname: Str(be51776e036e)
     -> container.id: Str(be51776e036e04461169fce2847d4e77be3d83856b474ad544143afc3d48e9e5)
     -> container.image.name: Str(sha256:9bdff337981de15f8cdf9e73b24af64a03e2e6dd1f156a274a15c1d8db98ab79)
     -> container.name: Str(redis-otel)
ScopeMetrics #0
ScopeMetrics SchemaURL: 
InstrumentationScope otelcol/dockerstatsreceiver 0.89.0-dev
Metric #6
Descriptor:
     -> Name: container.cpu.utilization
     -> Description: Percent of CPU used by the container.
     -> Unit: 1
     -> DataType: Gauge
NumberDataPoints #0
StartTimestamp: 2023-11-20 14:58:17.522765 +0000 UTC
Timestamp: 2023-11-20 14:58:19.550208 +0000 UTC
Value: 0.170933
```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver
[2]: /ja/opentelemetry/guide/metrics_mapping/#container-metrics
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/docker-stats.yaml