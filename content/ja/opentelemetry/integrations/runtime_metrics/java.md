---
aliases:
- /ja/opentelemetry/runtime_metrics/java/
code_lang: java
code_lang_weight: 10
title: OpenTelemetry Java Runtime Metrics
type: multi-code-lang
---

## 前提条件

- [OpenTelemetry のメトリクスを Datadog に送信する][1]ことに成功しました。
- [Java][2] の言語インテグレーションをインストールしました。

## OpenTelemetry SDK の構成

Java アプリケーションを [OpenTelemetry 自動インスツルメンテーション][3]でインスツルメンテーションしている場合、ランタイムメトリクスは自動的に有効になります。

Java アプリケーションを [OpenTelemetry 手動インスツルメンテーション][4]でインスツルメンテーションしている場合は、Java のバージョンに応じた以下のガイドを参照してください。
- [Java 8][5]
- [Java 17][6]

## ランタイムメトリクスのマッピング

以下の表は、OpenTelemetry ランタイムメトリクスをマッピングすることによってサポートされる Datadog ランタイムメトリクスのリストです。"N/A" は、OpenTelemetry に対応するものが存在しないことを示します。

| Datadog メトリクス | 説明 |  OpenTelemetry の対応するもの |
| --- | --- | --- |
| `jvm.heap_memory` | 使用されている Java ヒープメモリの合計。 | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.heap_memory_committed` | 使用するためにコミットされた Java ヒープメモリの合計。 | `process.runtime.jvm.memory.committed` <br> `jvm.memory.committed` |
| `jvm.heap_memory_init` | 最初に割り当てられた Java ヒープメモリ。 | `process.runtime.jvm.memory.init` <br> `jvm.memory.init` |
| `jvm.heap_memory_max` | 利用可能な Java ヒープメモリの最大値。 | `process.runtime.jvm.memory.limit` <br> `jvm.memory.limit` |
| `jvm.non_heap_memory` | 使用される Java 非ヒープメモリの合計。非ヒープメモリとは、`Metaspace + CompressedClassSpace + CodeCache`です。 | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.non_heap_memory_committed` | 使用するためにコミットされた Java 非ヒープメモリの合計。 | `process.runtime.jvm.memory.committed` <br> `jvm.memory.committed` |
| `jvm.non_heap_memory_init` | 最初に割り当てられた Java 非ヒープメモリ。 | `process.runtime.jvm.memory.init` <br> `jvm.memory.init` |
| `jvm.non_heap_memory_max` | 利用可能な Java 非ヒープメモリの最大値。 | `process.runtime.jvm.memory.limit` <br> `jvm.memory.limit` |
| `jvm.gc.old_gen_size` | The current Java heap memory usage of the Old Generation memory pool. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.eden_size` | The current Java heap memory usage of the Eden memory pool. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.survivor_size` | The current Java heap memory usage of the Survivor memory pool. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.metaspace_size` | The current Java non-heap memory usage of the Metaspace memory pool. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
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
|   `jvm.gc.cms.count` | 発生したガベージコレクションの総数。 | N/A |
|   `jvm.gc.major_collection_count` | メジャーガベージコレクションの発生率。このメトリクスを受け取るには `new_gc_metrics: true` を設定します。 | N/A |
|   `jvm.gc.minor_collection_count` | マイナーガベージコレクションの発生率。このメトリクスを受け取るには `new_gc_metrics: true` を設定します。 | N/A |
|   `jvm.gc.major_collection_time` | メジャーガベージコレクションに費やされた時間の割合。このメトリクスを受け取るには `new_gc_metrics: true` を設定します。 | N/A |
|   `jvm.gc.minor_collection_time` | マイナーガベージコレクションに費やされた時間の割合。このメトリクスを受け取るには `new_gc_metrics: true` を設定します。 | N/A |
|   `jvm.os.open_file_descriptors` | | N/A |


[1]: /ja/opentelemetry/otel_metrics
[2]: https://app.datadoghq.com/integrations/java
[3]: https://opentelemetry.io/docs/instrumentation/java/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/java/manual/
[5]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java8/library
[6]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java17/library