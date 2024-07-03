---
aliases:
- /ja/opentelemetry/runtime_metrics/dotnet/
code_lang: dotnet
code_lang_weight: 20
title: OpenTelemetry .NET Runtime Metrics
type: multi-code-lang
---

## 前提条件

- [OpenTelemetry のメトリクスを Datadog に送信する][1]ことに成功しました。
- [.NET][2] の言語インテグレーションをインストールしました。
- Minimum .NET OTel SDK version of [1.5.0][6].

## OpenTelemetry SDK の構成

.NET アプリケーションを [OpenTelemetry 自動インスツルメンテーション][3]でインスツルメンテーションしている場合、ランタイムメトリクスは自動的に有効になります。

.NET アプリケーションを [OpenTelemetry 手動インスツルメンテーション][4]でインスツルメンテーションしている場合は、[OpenTelemetry.Instrumentation.Runtime ライブラリ][5]のドキュメントを参照してください。

The default metric export interval for the .NET OTel SDK is different from the default for the Datadog .NET SDK. Datadog recommends setting the [OTEL_METRIC_EXPORT_INTERVAL][7] environment variable on your .NET service to match the default Datadog metric export interval for viewing integration metric graphs:
- `OTEL_METRIC_EXPORT_INTERVAL=10000`

## ランタイムメトリクスのマッピング

以下の表は、OpenTelemetry ランタイムメトリクスをマッピングすることによってサポートされる Datadog ランタイムメトリクスのリストです。"N/A" は、OpenTelemetry に対応するものが存在しないことを示します。

| Datadog メトリクス | 説明 |  OpenTelemetry の対応するもの |
| --- | --- | --- |
| `runtime.dotnet.threads.contention_count` | スレッドがロック待ちのために停止した回数。 | `process.runtime.dotnet.`<br/>`monitor.lock_contention.count` |
| `runtime.dotnet.exceptions.count` | ファーストチャンスの例外の数。 | `process.runtime.dotnet.`<br/>`exceptions.count` |
| `runtime.dotnet.gc.size.gen0` | 第 0 世代ヒープのサイズ。 | `process.runtime.dotnet.`<br/>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen1` | 第 1 世代ヒープのサイズ。 | `process.runtime.dotnet.`<br/>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen2` | 第 2 世代ヒープのサイズ。 | `process.runtime.dotnet.`<br/>`gc.heap.size` |
| `runtime.dotnet.gc.size.loh` | ラージオブジェクトヒープのサイズ。 | `process.runtime.dotnet.`<br/>`gc.heap.size` |
| `runtime.dotnet.gc.count.gen0` | 第 0 世代ガベージコレクションの回数。 | `process.runtime.dotnet.`<br/>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen1` | 第 1 世代ガベージコレクションの回数。 | `process.runtime.dotnet.`<br/>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen2` | 第 2 世代ガベージコレクションの回数。 | `process.runtime.dotnet.`<br/>`gc.collections.count` |
| `runtime.dotnet.cpu.system` | カーネル内で実行されているミリ秒数。 | N/A |
| `runtime.dotnet.cpu.user` | カーネル外で実行されているミリ秒数。 | N/A |
| `runtime.dotnet.cpu.percent` | アプリケーションが使用する総 CPU の割合。 | N/A |
| `runtime.dotnet.mem.committed` | メモリ使用量。 | N/A |
| `runtime.dotnet.threads.count` | スレッドの数。 | N/A |
| `runtime.dotnet.threads.workers_count` | スレッドプールのワーカー数 (.NET Core のみ)。 | N/A |
| `runtime.dotnet.threads.contention_time` | ロック待ちのスレッドが費やした累積時間。(.NET Core のみ) | N/A |
| `runtime.dotnet.gc.memory_load` | プロセスが使用する総メモリの割合。この値が 85 以上になると、ガベージコレクション (GC) の動作が変わります。(.NET Core のみ) | N/A |
| `runtime.dotnet.gc.pause_time` | GC がアプリケーションスレッドを一時停止した時間。(.NET Core のみ) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`requests.total` | サーバーが受信した HTTP リクエストの総数。(.NET Core のみ) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`requests.failed` | サーバーが受信した HTTP リクエストの失敗数。(.NET Core のみ) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`requests.current` | まだ停止していない HTTP リクエストの総数。(.NET Core のみ) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`requests.queue_length` | サーバーの HTTP リクエストキューの現在の長さ。(.NET Core のみ) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`connections.total` | サーバーに確立された HTTP 接続の総数。(.NET Core のみ) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`connections.current` | サーバーへの現在のアクティブな HTTP 接続数。(.NET Core のみ) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`connections.queue_length` | HTTP サーバー接続キューの現在の長さ。(.NET Core のみ) | N/A |


[1]: /ja/opentelemetry/otel_metrics
[2]: https://app.datadoghq.com/integrations/dotnet
[3]: https://opentelemetry.io/docs/instrumentation/net/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/net/manual/
[5]: https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.Runtime
[6]: https://github.com/open-telemetry/opentelemetry-dotnet/releases/tag/core-1.5.0
[7]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/#periodic-exporting-metricreader