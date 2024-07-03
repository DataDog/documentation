---
aliases:
- /ja/opentelemetry/runtime_metrics/go/
code_lang: go
code_lang_weight: 30
title: OpenTelemetry Go Runtime Metrics
type: multi-code-lang
---

## 前提条件

- [OpenTelemetry のメトリクスを Datadog に送信する][1]ことに成功しました。
- [Go][2] の言語インテグレーションをインストールしました。

## OpenTelemetry SDK の構成

OpenTelemetry (OTel) Go アプリケーションは[手動でインスツルメンテーション][3]されます。ランタイムメトリクスを有効にするには、[ランタイムパッケージ][4]のドキュメントを参照してください。

## ランタイムメトリクスのマッピング

以下の表は、OpenTelemetry ランタイムメトリクスをマッピングすることによってサポートされる Datadog ランタイムメトリクスのリストです。"N/A" は、OpenTelemetry に対応するものが存在しないことを示します。

| Datadog メトリクス | 説明 |  OpenTelemetry の対応するもの |
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

[1]: /ja/opentelemetry/otel_metrics
[2]: https://app.datadoghq.com/integrations/go
[3]: https://opentelemetry.io/docs/instrumentation/go/manual/
[4]: https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/runtime