---
aliases:
- /ja/opentelemetry/collector_exporter/collector_health_metrics
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
title: 健全性メトリクス
---

## 概要

{{< img src="/opentelemetry/collector_exporter/collector_health_metrics.png" alt="OpenTelemetry Collector の健全性メトリクスダッシュボード" style="width:100%;" >}}

OpenTelemetry Collector 自体の健全性メトリクスを収集するには、Datadog Exporter で [Prometheus レシーバー][1]を構成します。

詳しくは、OpenTelemetry プロジェクトドキュメントの[Prometheus レシーバー][1]を参照してください。

## セットアップ

Collector の構成に以下の行を追加します。

```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
      - job_name: 'otelcol'
        scrape_interval: 10s
        static_configs:
        - targets: ['0.0.0.0:8888']
```

## データ収集

| OpenTelemetry メトリクス | 説明 |
|---|---|
| `otelcol_process_uptime` | プロセスのアップタイム |
| `otelcol_process_memory_rss` | 全体の物理メモリ (レジデントセットサイズ) |
| `otelcol_exporter_queue_size` | 再試行キューの現在のサイズ (バッチ単位) |
| `otelcol_exporter_sent_spans` | 宛先に正常に送信されたスパンの数 |
| `otelcol_exporter_send_failed_metric_points` | 失敗した宛先への送信試行のメトリクスポイントの数 |
| `otelcol_exporter_send_failed_spans` | 失敗した宛先への送信試行のスパンの数 |
| `otelcol_process_cpu_seconds` | CPU ユーザーとシステムの合計時間 (秒単位) |
| `otelcol_receiver_refused_spans` | パイプラインにプッシュできなかったスパンの数 |
| `otelcol_exporter_queue_capacity` | 再試行キューの固定容量 (バッチ単位) |
| `otelcol_receiver_accepted_spans` | パイプラインに正常にプッシュされたスパンの数 |
| `otelcol_exporter_sent_metric_points` | 宛先に正常に送信されたメトリクスポイントの数 |
| `otelcol_exporter_enqueue_failed_spans` | 送信キューへの追加に失敗したスパンの数 |
| `otelcol_scraper_errored_metric_points` | スクレイピングできなかったメトリクスポイントの数 |
| `otelcol_scraper_scraped_metric_points` | 正常にスクレイピングしたメトリクスポイントの数 |
| `otelcol_receiver_refused_metric_points` | パイプラインにプッシュできなかったメトリクスポイントの数 |
| `otelcol_receiver_accepted_metric_points` | パイプラインに正常にプッシュされたメトリクスポイントの数 |
| `otelcol_process_runtime_heap_alloc_bytes` | 割り当てられたヒープオブジェクトのバイト数 ('go doc runtime.MemStats.HeapAlloc' を参照) |
| `otelcol_process_runtime_total_alloc_bytes` | ヒープオブジェクトに割り当てられた累計バイト数 ('go doc runtime.MemStats.TotalAlloc' を参照) |
| `otelcol_exporter_enqueue_failed_log_records` | 送信キューへの追加に失敗したログレコードの数 |
| `otelcol_processor_batch_timeout_trigger_send` | タイムアウトトリガーによりバッチが送信された回数 |
| `otelcol_exporter_enqueue_failed_metric_points` | 送信キューへの追加に失敗したメトリクスポイントの数 |
| `otelcol_process_runtime_total_sys_memory_bytes` | OS から取得したメモリの総バイト数 ([`runtime.MemStats.Sys` の Go ドキュメント][3]を参照)。 |
| `otelcol_processor_batch_batch_size_trigger_send` | サイズトリガーによりバッチが送信された回数 |
| `otelcol_exporter_sent_log_records` | 宛先に正常に送信されたログレコードの数 |
| `otelcol_receiver_refused_log_records` | パイプラインにプッシュできなかったログレコードの数 |
| `otelcol_receiver_accepted_log_records` | パイプラインに正常にプッシュされたログレコードの数 |


## 完全な構成例

Datadog Exporter を用いた実際に動作する構成の完全な例については、[`collector-metrics.yaml`][2] を参照してください。

## ログ出力例

```
ResourceMetrics #0
Resource SchemaURL: https://opentelemetry.io/schemas/1.6.1
Resource attributes:
     -> service.name: Str(opentelemetry-collector)
     -> net.host.name: Str(192.168.55.78)
     -> service.instance.id: Str(192.168.55.78:8888)
     -> net.host.port: Str(8888)
     -> http.scheme: Str(http)
     -> k8s.pod.ip: Str(192.168.55.78)
     -> cloud.provider: Str(aws)
     -> cloud.platform: Str(aws_ec2)
     -> cloud.region: Str(us-east-1)
     -> cloud.account.id: Str(XXXXXXXXX)
     -> cloud.availability_zone: Str(us-east-1c)
     -> host.id: Str(i-0368add8e328c28f7)
     -> host.image.id: Str(ami-08a2e6a8e82737230)
     -> host.type: Str(m5.large)
     -> host.name: Str(ip-192-168-53-115.ec2.internal)
     -> os.type: Str(linux)
     -> k8s.pod.name: Str(opentelemetry-collector-agent-gqwm8)
     -> k8s.daemonset.name: Str(opentelemetry-collector-agent)
     -> k8s.daemonset.uid: Str(6d6fef61-d4c7-4226-9b7b-7d6b893cb31d)
     -> k8s.node.name: Str(ip-192-168-53-115.ec2.internal)
     -> kube_app_name: Str(opentelemetry-collector)
     -> kube_app_instance: Str(opentelemetry-collector)
     -> k8s.namespace.name: Str(otel-staging)
     -> k8s.pod.start_time: Str(2023-11-20T12:53:23Z)
     -> k8s.pod.uid: Str(988d1bdc-5baf-4e98-942f-ab026a371daf)
ScopeMetrics #0
ScopeMetrics SchemaURL: 
InstrumentationScope otelcol/prometheusreceiver 0.88.0-dev
Metric #0
Descriptor:
     -> Name: otelcol_otelsvc_k8s_namespace_added
     -> Description: Number of namespace add events received
     -> Unit: 
     -> DataType: Sum
     -> IsMonotonic: true
     -> AggregationTemporality: Cumulative
NumberDataPoints #0
Data point attributes:
     -> service_instance_id: Str(d80d11f9-aa84-4e16-818d-3e7d868c0cfe)
     -> service_name: Str(otelcontribcol)
     -> service_version: Str(0.88.0-dev)
StartTimestamp: 1970-01-01 00:00:00 +0000 UTC
Timestamp: 2023-11-20 13:17:36.881 +0000 UTC
Value: 194151496.000000
Metric #9
Descriptor:
     -> Name: otelcol_receiver_accepted_spans
     -> Description: Number of spans successfully pushed into the pipeline.
     -> Unit: 
     -> DataType: Sum
     -> IsMonotonic: true
     -> AggregationTemporality: Cumulative
```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector-metrics.yaml
[3]: https://pkg.go.dev/runtime#MemStats.Sys