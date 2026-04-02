---
aliases:
- /ja/opentelemetry/runtime_metrics/
- /ja/opentelemetry/integrations/runtime_metrics/go/
- /ja/opentelemetry/integrations/runtime_metrics/dotnet/
- /ja/opentelemetry/integrations/runtime_metrics/java/
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: ドキュメント
  text: APM ランタイム メトリクス
- link: /opentelemetry/mapping/metrics_mapping/
  tag: ドキュメント
  text: OpenTelemetry メトリクスマッピング
title: OpenTelemetry ランタイムメトリクス
---

## 概要

ランタイム メトリクスは、メモリ使用量、ガーベジ コレクション、並列化を含むアプリケーション パフォーマンスに関するインサイトを提供します。Datadog トレース ライブラリは、サポートされている各言語向けに [ランタイム メトリクス収集][5] を提供します。また、OpenTelemetry (OTel) でも、OpenTelemetry SDK を介して Datadog に送信できる互換のランタイム メトリクスを収集します。

## 互換性

Datadog は、以下の言語に対する OpenTelemetry ランタイム メトリクスをサポートします。
- Java
- .NET
- Go

ホストおよびコンテナのメトリクス マッピングの詳細は、[OpenTelemetry メトリクス マッピング][1] を参照してください。

## Setup instructions

### 1. 前提条件

- OpenTelemetry メトリクスを Datadog に送信するよう [構成済み][2] であること。
- Datadog で [対応する言語インテグレーション][3] をインストールしていること。

### 2. アプリケーションを構成する

OpenTelemetry SDK がランタイム メトリクスを送信するように構成する手順を見るには、言語を選択してください:

{{< tabs >}}
{{% tab "Java" %}}

#### 自動インスツルメンテーション

Java アプリケーションで [OpenTelemetry 自動インスツルメンテーション][3] を使用する場合、ランタイム メトリクスはデフォルトで有効です。

#### 手動インスツルメンテーション

[OpenTelemetry 手動インスツルメンテーション][4] を使用する場合は、利用している Java バージョン向けのガイドに従ってください:
- [Java 8][5]
- [Java 17][6]

[3]: https://opentelemetry.io/docs/instrumentation/java/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/java/manual/
[5]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java8/library
[6]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java17/library

{{% /tab %}}

{{% tab "Go" %}}

OpenTelemetry Go アプリケーションは [手動でインスツルメント][3] されています。ランタイム メトリクスを有効にするには、[runtime パッケージ][4] のドキュメントを参照してください。

[3]: https://opentelemetry.io/docs/instrumentation/go/manual/
[4]: https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/runtime

{{% /tab %}}

{{% tab ".NET" %}}

<div class="alert alert-danger">.NET OpenTelemetry SDK のサポートされる最小バージョンは <a href="https://github.com/open-telemetry/opentelemetry-dotnet/releases/tag/core-1.5.0">1.5.0</a> です</div>

#### 自動インスツルメンテーション

.NET アプリケーションで [OpenTelemetry 自動インスツルメンテーション][3] を使用する場合、ランタイム メトリクスはデフォルトで有効です。

#### 手動インスツルメンテーション

[OpenTelemetry 手動インスツルメンテーション][4] を使用する場合は、[OpenTelemetry.Instrumentation.Runtime ライブラリ][5] のドキュメントを参照してください。

#### メトリクスのエクスポート間隔

.NET OTel SDK のデフォルトのメトリクスのエクスポート間隔は、Datadog .NET SDK のデフォルトとは異なります。Datadog は、.NET サービスで [OTEL_METRIC_EXPORT_INTERVAL][7] 環境変数を設定し、Datadog のデフォルトのメトリクス エクスポート間隔に合わせることを推奨します:

```
OTEL_METRIC_EXPORT_INTERVAL=10000
```

[3]: https://opentelemetry.io/docs/instrumentation/net/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/net/manual/
[5]: https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.Runtime
[7]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/#periodic-exporting-metricreader

{{% /tab %}}

{{< /tabs >}}

## ランタイムメトリクスのダッシュボードを表示

セットアップ完了後は、次の場所でランタイム メトリクスを表示できます:
- サービスの詳細ページ (下記の Java の例を参照)
- Flame Graph metrics タブ
- 既定の [ランタイム ダッシュボード][7]

{{< img src="opentelemetry/otel_runtime_metrics_service_page.png" alt="サービスページにある JVM Metrics タブに OpenTelemetry のランタイムメトリクスが表示されている様子" style="width:100%;" >}}

## 収集されたデータ

Datadog で OpenTelemetry ランタイム メトリクスを使用する場合、次の両方を受け取ります:
- OpenTelemetry オリジナルのランタイム メトリクス
- 同等のメトリクスに対応する Datadog マッピング済みランタイム メトリクス

OpenTelemetry ランタイム メトリクスには、ソースに応じて次のプレフィックスが付きます:

| ソース | プレフィックス |
| --- | --- |
| [OTel Collector Datadog Exporter][100] | `otel.process.runtime.*` |
| [Datadog Agent OTLP Ingest][101] | `process.runtime.*` |

以下の表は、OpenTelemetry マッピングでサポートされる Datadog ランタイム メトリクスを示します。「N/A」は、対応する OpenTelemetry メトリクスが存在しないことを示します。

<div class="alert alert-danger">OpenTelemetry ランタイム メトリクスは、メトリクス名により Datadog へマッピングされます。OpenTelemetry ランタイム メトリクスのためにホスト メトリクスの名前を変更しないでください。マッピングが壊れます。</div>

[100]: /ja/opentelemetry/setup/collector_exporter/
[101]: /ja/opentelemetry/setup/otlp_ingest_in_the_agent

{{< tabs >}}
{{% tab "Java" %}}

| Datadog メトリクス | 説明 |  OpenTelemetry メトリクス |
| --- | --- | --- |
| `jvm.heap_memory` | 使用されている Java ヒープメモリの合計。 | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.heap_memory_committed` | 使用するためにコミットされた Java ヒープメモリの合計。 | `process.runtime.jvm.memory.committed` <br> `jvm.memory.committed` |
| `jvm.heap_memory_init` | 最初に割り当てられた Java ヒープメモリ。 | `process.runtime.jvm.memory.init` <br> `jvm.memory.init` |
| `jvm.heap_memory_max` | 利用可能な Java ヒープメモリの最大値。 | `process.runtime.jvm.memory.limit` <br> `jvm.memory.limit` |
| `jvm.non_heap_memory` | 使用される Java 非ヒープメモリの合計。非ヒープメモリとは、`Metaspace + CompressedClassSpace + CodeCache`です。 | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.non_heap_memory_committed` | 使用するためにコミットされた Java 非ヒープメモリの合計。 | `process.runtime.jvm.memory.committed` <br> `jvm.memory.committed` |
| `jvm.non_heap_memory_init` | 最初に割り当てられた Java 非ヒープメモリ。 | `process.runtime.jvm.memory.init` <br> `jvm.memory.init` |
| `jvm.non_heap_memory_max` | 利用可能な Java 非ヒープメモリの最大値。 | `process.runtime.jvm.memory.limit` <br> `jvm.memory.limit` |
| `jvm.gc.old_gen_size` | Old Generation メモリプールの現在の Java ヒープメモリ使用量 | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.eden_size` | Eden メモリプールの現在の Java ヒープメモリ使用量 | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.survivor_size` | Survivor メモリプールの現在の Java ヒープメモリ使用量 | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.metaspace_size` | Metaspace メモリプールの現在の Java 非ヒープメモリ使用量 | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.thread_count` | ライブスレッドの数。 | `process.runtime.jvm.threads.count` <br> `jvm.thread.count` |
| `jvm.loaded_classes` | 現在ロードされているクラスの数。 | `process.runtime.jvm.classes.current_loaded` <br> `jvm.class.count` |
| `jvm.cpu_load.system` | システム全体の最近の CPU 使用率。 | `process.runtime.jvm.system.cpu.utilization` <br> `jvm.system.cpu.utilization` |
| `jvm.cpu_load.process` | プロセスの最近の CPU 使用率。 | `process.runtime.jvm.cpu.utilization` <br> `jvm.cpu.recent_utilization` |
| `jvm.buffer_pool.direct.used` | ダイレクトバッファが使用するメモリの量。 | `process.runtime.jvm.buffer.usage` <br> `jvm.buffer.memory.usage` |
| `jvm.buffer_pool.direct.count` | プール内のダイレクトバッファの数。 | `process.runtime.jvm.buffer.count`<br> `jvm.buffer.count` |
| `jvm.buffer_pool.direct.limit` | ダイレクトバッファの総メモリ容量。 | `process.runtime.jvm.buffer.limit` <br> `jvm.buffer.memory.limit` |
| `jvm.buffer_pool.mapped.used` | マップされたバッファが使用するメモリの量。 | `process.runtime.jvm.buffer.usage`<br> `jvm.buffer.memory.usage` |
| `jvm.buffer_pool.mapped.count` | プール内のマップされたバッファの数。 | `process.runtime.jvm.buffer.count`<br> `jvm.buffer.count` |
| `jvm.buffer_pool.mapped.limit` | マップされたバッファの総メモリ容量。 | `process.runtime.jvm.buffer.limit` <br> `jvm.buffer.memory.limit` |
| `jvm.gc.parnew.time` | 経過したガベージコレクションのおおよその累積時間。 | N/A |
| `jvm.gc.cms.count` | 発生したガベージコレクションの総数。 | N/A |
| `jvm.gc.major_collection_count` | メジャーガベージコレクションの発生率。このメトリクスを受け取るには `new_gc_metrics: true` を設定します。 | N/A |
| `jvm.gc.minor_collection_count` | マイナーガベージコレクションの発生率。このメトリクスを受け取るには `new_gc_metrics: true` を設定します。 | N/A |
| `jvm.gc.major_collection_time` | メジャーガベージコレクションに費やされた時間の割合。このメトリクスを受け取るには `new_gc_metrics: true` を設定します。 | N/A |
| `jvm.gc.minor_collection_time` | マイナーガベージコレクションに費やされた時間の割合。このメトリクスを受け取るには `new_gc_metrics: true` を設定します。 | N/A |
| `jvm.os.open_file_descriptors` | オープン ファイル ディスクリプタの数。 | N/A |

{{% /tab %}}

{{% tab "Go" %}}

| Datadog メトリクス | 説明 |  OpenTelemetry メトリクス |
| --- | --- | --- |
| `runtime.go.num_goroutine` | 生成された goroutines の数。 | `process.runtime.go.goroutines` |
| `runtime.go.num_cgo_call` | CGO コールの回数。 |`process.runtime.go.cgo.calls` |
| `runtime.go.mem_stats.lookups` | ランタイムが実行したポインタールックアップの数。 | `process.runtime.go.mem.lookups` |
| `runtime.go.mem_stats.heap_alloc` | 割り当てられたヒープオブジェクトのバイト数。 | `process.runtime.go.mem.heap_alloc` |
| `runtime.go.mem_stats.heap_sys` | オペレーティングシステムから取得したヒープメモリのバイト数。 | `process.runtime.go.mem.heap_sys` |
| `runtime.go.mem_stats.heap_idle` | アイドル (未使用) スパンのバイト数。 | `process.runtime.go.mem.heap_idle` |
| `runtime.go.mem_stats.heap_inuse` | 使用中のスパンのバイト数。 | `process.runtime.go.mem.heap_inuse` |
| `runtime.go.mem_stats.heap_released` | オペレーティングシステムに返される物理メモリのバイト数。 | `process.runtime.go.mem.heap_released` |
| `runtime.go.mem_stats.heap_objects` | 割り当てられたヒープオブジェクトの数。 | `process.runtime.go.mem.heap_objects` |
| `runtime.go.mem_stats.pause_total_ns` | ガベージコレクション (GC) の累積ナノ秒。 | `process.runtime.go.gc.pause_total_ns` |
| `runtime.go.mem_stats.num_gc` | 完了した GC サイクルの数。 | `process.runtime.go.gc.count` |
| `runtime.go.num_cpu` | ランタイムが検出した CPU の数。 | N/A |
| `runtime.go.mem_stats.alloc` | 割り当てられたヒープオブジェクトのバイト数。 | N/A |
| `runtime.go.mem_stats.total_alloc` | ヒープオブジェクトに割り当てられた累積バイト数。 | N/A |
| `runtime.go.mem_stats.sys` | オペレーティングシステムから取得したメモリの合計バイト数。 | N/A |
| `runtime.go.mem_stats.mallocs` | 割り当てられたヒープオブジェクトの累積数。 | N/A |
| `runtime.go.mem_stats.frees` | 解放されたヒープオブジェクトの累積数。 | N/A |
| `runtime.go.mem_stats.stack_inuse` | スタックスパンのバイト数。 | N/A |
| `runtime.go.mem_stats.stack_sys` | オペレーティングシステムから取得したスタックメモリのバイト数。 | N/A |
| `runtime.go.mem_stats.m_span_inuse` | 割り当てられた mspan 構造体のバイト数。 | N/A |
| `runtime.go.mem_stats.m_span_sys` | mspan 構造体のためにオペレーティングシステムから取得したメモリのバイト数。 | N/A |
| `runtime.go.mem_stats.m_cache_inuse` | 割り当てられた mcache 構造体のバイト数。 | N/A |
| `runtime.go.mem_stats.m_cache_sys` | mcache 構造体のためにオペレーティングシステムから取得したメモリのバイト数。 | N/A |
| `runtime.go.mem_stats.buck_hash_sys` | プロファイリングバケットハッシュテーブルのメモリのバイト数。 | N/A |
| `runtime.go.mem_stats.gc_sys` | ガベージコレクションのメタデータに含まれるメモリのバイト数。 | N/A |
| `runtime.go.mem_stats.other_sys` | 雑多なオフヒープにあるメモリのバイト数。 | N/A |
| `runtime.go.mem_stats.next_gc` | 次の GC サイクルのターゲットヒープサイズ。 | N/A |
| `runtime.go.mem_stats.last_gc` | UNIX エポックからのナノ秒単位で、最後に終了したガベージコレクション。 | N/A |
| `runtime.go.mem_stats.num_forced_gc` | GC 関数を呼び出したアプリケーションによって強制された GC サイクルの数。 | N/A |
| `runtime.go.mem_stats.gc_cpu_fraction` | プログラムが開始してから GC によって使用された、このプログラムの利用可能な CPU 時間の割合。 | N/A |
| `runtime.go.gc_stats.pause_quantiles.min` | GC 休止時間の分布: 最小値。 | N/A |
| `runtime.go.gc_stats.pause_quantiles.25p` | GC 休止時間の分布: 25 パーセンタイル。 | N/A |
| `runtime.go.gc_stats.pause_quantiles.50p` | GC 休止時間の分布: 50 パーセンタイル。 | N/A |
| `runtime.go.gc_stats.pause_quantiles.75p` | GC 休止時間の分布: 75 パーセンタイル。 | N/A |
| `runtime.go.gc_stats.pause_quantiles.max` | GC 休止時間の分布: 最大値。 | N/A |

{{% /tab %}}

{{% tab ".NET" %}}

| Datadog メトリクス | 説明 |  OpenTelemetry メトリクス |
| --- | --- | --- |
| `runtime.dotnet.threads.contention_count` | スレッドがロック待ちのために停止した回数。 | `process.runtime.dotnet.`<br>`monitor.lock_contention.count` |
| `runtime.dotnet.exceptions.count` | ファーストチャンスの例外の数。 | `process.runtime.dotnet.`<br>`exceptions.count` |
| `runtime.dotnet.gc.size.gen0` | 第 0 世代ヒープのサイズ。 | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen1` | 第 1 世代ヒープのサイズ。 | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen2` | 第 2 世代ヒープのサイズ。 | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.size.loh` | ラージオブジェクトヒープのサイズ。 | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.count.gen0` | 第 0 世代ガベージコレクションの回数。 | `process.runtime.dotnet.`<br>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen1` | 第 1 世代ガベージコレクションの回数。 | `process.runtime.dotnet.`<br>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen2` | 第 2 世代ガベージコレクションの回数。 | `process.runtime.dotnet.`<br>`gc.collections.count` |
| `runtime.dotnet.cpu.system` | カーネル内で実行されているミリ秒数。 | N/A |
| `runtime.dotnet.cpu.user` | カーネル外で実行されているミリ秒数。 | N/A |
| `runtime.dotnet.cpu.percent` | アプリケーションが使用する総 CPU の割合。 | N/A |
| `runtime.dotnet.mem.committed` | メモリ使用量。 | N/A |
| `runtime.dotnet.threads.count` | スレッドの数。 | N/A |
| `runtime.dotnet.threads.workers_count` | スレッドプールのワーカー数 (.NET Core のみ)。 | N/A |
| `runtime.dotnet.threads.contention_time` | ロック待ちのスレッドが費やした累積時間。(.NET Core のみ) | N/A |
| `runtime.dotnet.gc.memory_load` | プロセスが使用する総メモリの割合。この値が 85 以上になると、ガベージコレクション (GC) の動作が変わります。(.NET Core のみ) | N/A |
| `runtime.dotnet.gc.pause_time` | GC がアプリケーションスレッドを一時停止した時間。(.NET Core のみ) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.total` | サーバーが受信した HTTP リクエストの総数。(.NET Core のみ) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.failed` | サーバーが受信した HTTP リクエストの失敗数。(.NET Core のみ) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.current` | まだ停止していない HTTP リクエストの総数。(.NET Core のみ) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.queue_length` | サーバーの HTTP リクエストキューの現在の長さ。(.NET Core のみ) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`connections.total` | サーバーに確立された HTTP 接続の総数。(.NET Core のみ) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`connections.current` | サーバーへの現在のアクティブな HTTP 接続数。(.NET Core のみ) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`connections.queue_length` | HTTP サーバー接続キューの現在の長さ。(.NET Core のみ) | N/A |

{{% /tab %}}

{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/opentelemetry/mapping/metrics_mapping/
[2]: /ja/opentelemetry/setup/
[3]: https://app.datadoghq.com/integrations
[5]: /ja/tracing/metrics/runtime_metrics/
[7]: https://app.datadoghq.com/dash/integration/256/jvm-metrics