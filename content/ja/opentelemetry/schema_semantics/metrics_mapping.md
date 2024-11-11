---
aliases:
- /ja/opentelemetry/guide/metrics_mapping/
further_reading:
- link: /metrics/open_telemetry/otlp_metric_types
  tag: ドキュメント
  text: OTLP メトリクスタイプ
- link: /opentelemetry/guide/semantic_mapping
  tag: ドキュメント
  text: OpenTelemetry から Datadog へのリソース属性のマッピング
title: OpenTelemetry メトリクスのマッピング
---

## 概要

Datadog の製品と可視化は、特定の命名パターンに従うメトリクスとタグに基づいて構築されています。Datadog に送信される OpenTelemetry コンポーネントからのメトリクスは、該当する場合、対応する Datadog メトリクスにマッピングされます。これらの追加メトリクスの作成は、Datadog の請求に影響を与えません。

以下の図は、OpenTelemetry のメトリクスを Datadog が使用するメトリクスにマッピングするプロセスを示しています。

{{< img src="opentelemetry/guide/metrics_mapping/otel-mapping-metrics.png" alt="OpenTelemetry のメトリクス名を Datadog のメトリクス名にマッピングする際の決定プロセス。OTel メトリクスが Datadog の製品で使用されていない場合、またはそのセマンティクスが Datadog と同じ場合、そのまま Datadog に送信されます。それ以外の場合、OTel メトリクスから Datadog 形式のメトリクスが作成され、Datadog に送信されます。" style="width:100%;" >}}

## `otel` プレフィックスの使用

Datadog Agent から取得されたメトリクスと `hostmetrics` レシーバーでキャプチャされたメトリクスを区別するために、コレクターで収集されたメトリクスにはプレフィックス `otel` を追加します。メトリクス名が `system.` または `process.` で始まる場合、`otel.` がメトリクス名の先頭に追加されます。Agent とコレクターの両方で同じインフラストラクチャーのアーティファクトを監視することは推奨されません。

<div class="alert alert-info">Datadog は、この <code>otel</code> プレフィックスの廃止を含め、OTLP メトリクスのエクスペリエンスを改善する方法を検討しています。これに関するフィードバックがある場合は、アカウントチームに連絡してご意見をお寄せください。</div>

## ホストメトリクス

ホストメトリクスは、[ホストメトリクスレシーバー][1]によって収集されます。レシーバーのセットアップに関する情報は、[OpenTelemetry Collector Datadog Exporter][2] を参照してください。

Datadog メトリクスにマッピングされたこれらのメトリクスは、以下のビューで使用されます。
- [インフラストラクチャーホストマップ][5]
- [インフラストラクチャーリスト][6]
- [ホストのデフォルトダッシュボード][7]
- [APM トレースビューのホスト情報][8]

**注**: トレースとホストメトリクスを相関付けるには、各サービスに対して [Universal Service Monitoring 属性][3]を構成し、サービスおよびコレクターインスタンスの両方で `host.name` リソース属性を対応する基盤ホストに設定してください。

以下の表は、どの Datadog ホストメトリクス名が対応する OpenTelemetry ホストメトリクス名に関連付けられているか、そして該当する場合、マッピング中に OTel ホストメトリクスを Datadog の単位に変換するためにどのような計算が適用されるかを示しています。

| Datadog メトリクス名   | OTel メトリクス名      | メトリクスの説明         | OTel メトリクスに適用される変換      |
|-----------------------|-----------------------|----------------------------|--------------------------|
| `system.load.1`         | `system.cpu.load_average.1m`     | 1 分間の平均システム負荷。 (Linux のみ)       |         |
| `system.load.5`         | `system.cpu.load_average.5m`        | 5 分間の平均システム負荷。 (Linux のみ)   | |
| `system.load.15`        | `system.cpu.load_average.15m`     | 15 分間の平均システム負荷。 (Linux のみ)         |            |
| `system.cpu.idle`       | `system.cpu.utilization` <br>属性フィルター state: `idle`    | CPU がアイドル状態にあった時間の割合。パーセントで表示。   | 100 を乗算     |
| `system.cpu.user`       | `system.cpu.utilization` <br>属性フィルター state: `user`    | CPU がユーザースペースプロセスを実行していた時間の割合。パーセントで表示。  | 100 を乗算     |
| `system.cpu.system`     | `system.cpu.utilization` <br>属性フィルター state: `system`  | CPU がカーネルを実行していた時間の割合。    | 100 を乗算    |
| `system.cpu.iowait`     | `system.cpu.utilization` <br>属性フィルター state: `wait`    | CPU が I/O 操作の完了を待機していた時間のパーセント。         | 100 を乗算       |
| `system.cpu.stolen`     | `system.cpu.utilization` <br>属性フィルター state: `steal`     | 仮想 CPU が他の仮想 CPU を処理するためにハイパーバイザーを待機していた時間のパーセント。仮想マシンにのみ適用。パーセントで表示。| 100 を乗算   |
| `system.mem.total`      | `system.memory.usage`     | 物理 RAM の総量 (バイト単位)。   | MB に変換 (2^20 で除算) |
| `system.mem.usable`     | `system.memory.usage` <br>属性フィルター state: `(free, cached, buffered)` | `/proc/meminfo` の `MemAvailable` の値が存在する場合、その値。存在しない場合は、`free + buffered + cached memory` を加算。バイト単位。    | MB に変換 (2^20 で除算) |
| `system.net.bytes_rcvd` | `system.network.io` <br>属性フィルターの方向: `receive`   | デバイスで受信したバイト数/秒。       |         |
| `system.net.bytes_sent` | `system.network.io` <br>属性フィルター direction: `transmit`   | デバイスから送信されたバイト数/秒。           |       |
| `system.swap.free`      | `system.paging.usage` <br>属性フィルター state: `free`    | 空きスワップ領域の量 (バイト単位)。      | MB に変換 (2^20 で除算) |
| `system.swap.used`      | `system.paging.usage` <br>属性フィルター state: `used`     | 使用中のスワップ領域の量 (バイト単位)。  | MB に変換 (2^20 で除算) |
| `system.disk.in_use`    | `system.filesystem.utilization`    | ディスク領域の使用量を総量の割合で示す。      |        |

## コンテナメトリクス

Docker Stats レシーバーは、OpenTelemetry Collector のためにコンテナメトリクスを生成します。Datadog Exporter は、以下のビューで使用するためにコンテナメトリクスを対応する Datadog メトリクスに変換します。

- [コンテナ概要デフォルトダッシュボード][9]
- コンテナメトリクスを含む [APM トレースビュー][10]

**注**: トレースとコンテナメトリクスを相関付けるには、各サービスに対して [Universal Service Monitoring 属性][3]を構成し、各サービスの以下のリソース属性を設定してください。
  - `k8s.container.name` 
  - `k8s.pod.name` 
  - `container.name` 
  - `container.id`

  [OpenTelemetry と Datadog のリソース属性のセマンティック規約のマッピング][4]の詳細をご覧ください。

以下の表は、Datadog のコンテナメトリクス名が対応する OpenTelemetry のコンテナメトリクス名とどのように関連付けられているかを示しています。

| Datadog メトリクス名     | OTel Docker Stats メトリクス名         | メトリクスの説明             |
|-------------------------|--------------------------------|----------------------|
| `container.cpu.usage`    | `container.cpu.usage.total`       | コンテナの総 CPU 使用率     |
| `container.cpu.user`     | `container.cpu.usage.usermode`         | コンテナのユーザースペース CPU 使用率   |
| `container.cpu.system`    | `container.cpu.usage.system`    | コンテナのシステム CPU 使用率      |
| `container.cpu.throttled`    | `container.cpu. throttling_data.throttled_time`      | 総 CPU スロットル時間      |
| `container.cpu.throttled.periods` | `container.cpu. throttling_data.throttled_periods`       | コンテナがスロットルされた期間の数 |
| `container.memory.usage`          | `container.memory.usage.total`      | コンテナの総メモリ使用量      |
| `container.memory.kernel`         | `container.memory.active_anon`        | コンテナのカーネルメモリ使用量     |
| `container.memory.limit`          | `container.memory. hierarchical_memory_limit`    | コンテナのメモリ制限    |
| `container.memory.soft_limit`     | `container.memory.usage.limit`       | コンテナのメモリソフト制限     |
| `container.memory.cache`          | `container.memory.total_cache`      | コンテナのキャッシュ使用量   |
| `container.memory.swap`           | `container.memory.total_swap`         | コンテナのスワップ使用量      |
| `container.io.write`              | `container.blockio. io_service_bytes_recursive` <br>属性フィルター operation=`write` | このコンテナによってディスクに書き込まれたバイト数         |
| `container.io.read`               | `container.blockio. io_service_bytes_recursive` <br>属性フィルター operation=`read`  | このコンテナによってディスクから読み取られたバイト数          |
| `container.io.write.operations`   | `container.blockio. io_serviced_recursive` <br>属性フィルター operation=`write`      | このコンテナによって行われた書き込み操作の数          |
| `container.io.read.operations`    | `container.blockio. io_serviced_recursive` <br>属性フィルター operation=`read`       | このコンテナによって行われた読み取り操作の数           |
| `container.net.sent`              | `container.network.io. usage.tx_bytes`      | 送信されたネットワークバイト数 (インターフェイスごと)    |
| `container.net.sent.packets`      | `container.network.io. usage.tx_packets`    | 送信されたネットワークパケット数 (インターフェイスごと)   |
| `container.net.rcvd`              | `container.network.io. usage.rx_bytes`     | 受信されたネットワークバイト数 (インターフェイスごと)   |
| `container.net.rcvd.packets`      | `container.network.io. usage.rx_packets`   | 受信されたネットワークパケット数 (インターフェイスごと)    |

## Kafka メトリクス

| OpenTelemetry メトリクス | Datadog メトリクス | ソース | Datadog メトリクスに適用される変換 |
|---|---|---|---|
| otel.kafka.producer.request-rate | kafka.producer.request_rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka-producer} | |
| otel.kafka.producer.response-rate | kafka.producer.response_rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka-producer} | |
| otel.kafka.producer.request-latency-avg|kafka.producer.request_latency_avg | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka-producer}| |
| kafka.producer.outgoing-byte-rate | kafka.producer.outgoing-byte-rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka-producer}| |
| kafka.producer.io-wait-time-ns-avg | kafka.producer.io_wait | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka-producer}| |
| kafka.producer.byte-rate | kafka.producer.bytes_out | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka-producer} | |
| kafka.consumer.total.bytes-consumed-rate | kafka.consumer.bytes_in | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka-consumer} | |
| kafka.consumer.total.records-consumed-rate | kafka.consumer.messages_in | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka-consumer} | |
| kafka.network.io{state:out} | kafka.net.bytes_out.rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | 秒あたりのレートを計算し、Gauge として送信 |
| kafka.network.io{state:in} | kafka.net.bytes_in.rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | 秒あたりのレートを計算し、Gauge として送信 |
| kafka.purgatory.size{type:produce} | kafka.request.producer_request_purgatory.size | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.purgatory.size{type:fetch} | kafka.request.fetch_request_purgatory.size | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.partition.under_replicated | kafka.replication.under_replicated_partitions | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.isr.operation.count{operation:shrink} | kafka.replication.isr_shrinks.rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | 秒あたりのレートを計算し、Gauge として送信 |
| kafka.isr.operation.count{operation:expand} | kafka.replication.isr_expands.rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | 秒あたりのレートを計算し、Gauge として送信 | 
| kafka.leader.election.rate | kafka.replication.leader_elections.rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | 秒あたりのレートを計算し、Gauge として送信 | 
| kafka.partition.offline | kafka.replication.offline_partitions_count | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.request.time.avg{type:produce} | kafka.request.produce.time.avg | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.request.time.avg{type:fetchconsumer} | kafka.request.fetch_consumer.time.avg | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.request.time.avg{type:fetchfollower} | kafka.request.fetch_follower.time.avg |JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.message.count |kafka.messages_in.rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | 秒あたりのレートを計算し、Gauge として送信 |
| kafka.request.failed{type:produce} | kafka.request.produce.failed.rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | 秒あたりのレートを計算し、Gauge として送信 |
| kafka.request.failed{type:fetch} | kafka.request.fetch.failed.rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | 秒あたりのレートを計算し、Gauge として送信 |
| kafka.request.time.99p{type:produce} | kafka.request.produce.time.99percentile | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.request.time.99p{type:fetchconsumer} | kafka.request.fetch_consumer.time.99percentile | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.request.time.99p{type:fetchfollower} | kafka.request.fetch_follower.time.99percentile | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.partition.count | kafka.replication.partition_count | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.max.lag | kafka.replication.max_lag | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.controller.active.count | kafka.replication.active_controller_count | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.unclean.election.rate | kafka.replication.unclean_leader_elections.rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | 秒あたりのレートを計算し、Gauge として送信 |
| kafka.request.queue | kafka.request.channel.queue.size | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.logs.flush.time.count | kafka.log.flush_rate.rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka} | 秒あたりのレートを計算し、Gauge として送信 |
| kafka.consumer.bytes-consumed-rate | kafka.consumer.bytes_consumed | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka-consumer} | |
| kafka.consumer.records-consumed-rate | kafka.consumer.records_consumed | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka-consumer} | |
| otel.kafka.consumer.fetch-size-avg | kafka.consumer.fetch_size_avg | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka-consumer} | |
| otel.kafka.producer.compression-rate | kafka.producer.compression-rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka-producer} | |
| otel.kafka.producer.record-error-rate | kafka.producer.record_error_rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka-producer} | |
| otel.kafka.producer.record-retry-rate | kafka.producer.record_retry_rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka-producer} | |
| otel.kafka.producer.record-send-rate | kafka.producer.record_send_rate | JMX レシーバー / JMX Metrics Gatherer {target_system:kafka-producer} | |
| kafka.partition.current_offset | kafka.broker_offset | kafkametricsreceiver | |
| kafka.consumer_group.lag | kafka.consumer_lag | kafkametricsreceiver
| kafka.consumer_group.offset | kafka.consumer_offset | kafkametricsreceiver
| jvm.gc.collections.count{name:Copy && name:PS Scavenge && name:ParNew && name:G1 Young Generation} | jvm.gc.minor_collection_count | JMX レシーバー / JMX Metrics Gatherer {target_system:jvm} | 秒あたりのレートを計算し、Gauge として送信 |
| jvm.gc.major_collection_count{name:MarkSweepCompact && name:PS MarkSweep && name:ConcurrentMarkSweep && name:G1 Mixed Generation && G1 Old Generation && Shenandoah Cycles && ZGC} | jvm.gc.major_collection_count | JMX レシーバー / JMX Metrics Gatherer {target_system:jvm} | 秒あたりのレートを計算し、Gauge として送信 |
| jvm.gc.collections.elapsed{name:Copy && name:PS Scavenge && name:ParNew && name:G1 Young Generation} | jvm.gc.minor_collection_time | JMX レシーバー / JMX Metrics Gatherer {target_system:jvm} | 秒あたりのレートを計算し、Gauge として送信 |
| jvm.gc.collections.elapsed{name:MarkSweepCompact && name:PS MarkSweep && name:ConcurrentMarkSweep && name:G1 Mixed Generation && G1 Old Generation && Shenandoah Cycles && ZGC} | jvm.gc.major_collection_time | JMX レシーバー / JMX Metrics Gatherer {target_system:jvm} | 秒あたりのレートを計算し、Gauge として送信

**注:** Datadog では `-` が `_` に変換されます。先頭に `otel.` が付くメトリクスの場合、これは OTel メトリクス名と Datadog メトリクス名が同じであることを意味します (例: `kafka.producer.request-rate` と `kafka.producer.request_rate`)。これらのメトリクスの二重カウントを避けるために、OTel メトリクスの先頭には `otel.` が追加されます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[2]: /ja/opentelemetry/otel_collector_datadog_exporter/
[3]: /ja/universal_service_monitoring/setup/
[4]: /ja/opentelemetry/guide/semantic_mapping/
[5]: https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&groupby=availability-zone
[6]: https://app.datadoghq.com/infrastructure
[7]: /ja/opentelemetry/collector_exporter/#out-of-the-box-dashboards
[8]: /ja/tracing/trace_explorer/trace_view/?tab=hostinfo
[9]: /ja/opentelemetry/otel_collector_datadog_exporter/?tab=onahost#containers-overview-dashboard
[10]: /ja/tracing/trace_explorer/trace_view/