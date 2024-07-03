---
aliases:
- /ja/tracing/profiler/connect_traces_and_profiles/
further_reading:
- link: tracing
  tag: Documentation
  text: APM Distributed Tracing
- link: /profiler/enabling
  tag: Documentation
  text: Enable Continuous Profiler for Your Application
- link: getting_started/profiler
  tag: Documentation
  text: Getting Started with Profiler
title: Investigate Slow Traces or Endpoints
---

本番環境においてアプリケーションのパフォーマンスに問題がある場合、分散型トレーシングとプロファイリングによるコードスタックトレースのベンチマークを統合することで、パフォーマンスのボトルネックを特定する強力な方法となります。APM 分散型トレーシングと Continuous Profiler の両方が有効になっているアプリケーションプロセスは、自動的にリンクされます。

Code Hotspots タブでスパン情報からプロファイリングデータに直接移動し、パフォーマンス問題に関連する特定のコード行を見つけることができます。同様に、低速でリソースを消費するエンドポイントも、プロファイリング UI で直接デバッグできます。

## 遅いトレースのコードのホットスポットを特定する

{{< img src="profiler/code_hotspots_tab.png" alt="Code Hotspots tab shows profiling information for a APM trace span" >}}

### 前提条件

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php" >}}
{{< programming-lang lang="java" >}}
Code Hotspots identification is enabled by default when you [turn on profiling for your Java service][1] on Linux and macOS.
The feature is not available on Windows.

For manually instrumented code, continuous profiler requires scope activation of spans:

```java
final Span span = tracer.buildSpan("ServicehandlerSpan").start();
try (final Scope scope = tracer.activateSpan(span)) { // mandatory for Datadog continuous profiler to link with span
    // worker thread impl
  } finally {
    // Step 3: Finish Span when work is complete
    span.finish();
  }

```

<div class="alert alert-warning">
Java Flight Recorder (JFR) の代わりに <a href="/profiler/enabling/java/?tab=datadog#requirements">Datadog プロファイラーを使用する</a>ことを強くお勧めします。
</div>

[1]: /ja/profiler/enabling/java
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

[Python サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。

`dd-trace-py` バージョン 0.44.0+ が必要です。

[1]: /ja/profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

[Ruby サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。

The new [timeline feature](#span-execution-timeline-view) is enabled by default in `dd-trace-rb` 1.21.1+.

To additionally enable showing [GC in timeline](#span-execution-timeline-view):
- set `DD_PROFILING_FORCE_ENABLE_GC=true`

[1]: /ja/profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Linux と macOS で [Node.js サービスのプロファイリングを有効にする][1]と、Code Hotspots の識別がデフォルトで有効になります。Windows ではこの機能は利用できません。

`dd-trace-js` のバージョン 5.0.0 以降、4.24.0 以降または 3.45.0 以降が必要です。

The new [timeline feature](#span-execution-timeline-view) is enabled by default in `dd-trace-js` 5.11.0+, 4.35.0+, and 3.56.0+.

[1]: /ja/profiler/enabling/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

[Go サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。

To enable the new [timeline feature](#span-execution-timeline-view), set the environment variables below:

```go
os.Setenv("DD_PROFILING_EXECUTION_TRACE_ENABLED", "true")
os.Setenv("DD_PROFILING_EXECUTION_TRACE_PERIOD", "15m")
```

Setting these variables will record up to 1 minute (or 5 MiB) of execution tracing data [every 15 minutes][2].

このデータは、

- 検索クエリに `go_execution_traced:yes` を追加して [Profile List][3] で表示できます。プロファイルをクリックすると [Profile Timeline][4] が表示されます。さらに深く見るには、プロファイルをダウンロードし、`go tool trace` または [gotraceui][5] を使用して、含まれている `go.trace` ファイルを表示します。
- 検索クエリに `@go_execution_traced:yes` (`@` に注意) を追加して[トレースエクスプローラー][6]で表示できます。スパンをクリックし、`Code Hotspots` タブを選択して[スパンタイムライン](#span-execution-timeline-view)を表示します。

実行トレースを記録している間、アプリケーションがガベージコレクションのように CPU 使用率の増加を観測する可能性があります。ほとんどのアプリケーションでは大きな影響はないはずですが、Go 1.21 にはこのオーバーヘッドをなくすための[パッチ][7]が含まれています。

This capability requires `dd-trace-go` version 1.37.0+ (1.52.0+ for timeline view) and works best with Go version 1.18 or later (1.21 or later for timeline view).

[1]: /ja/profiler/enabling/go
[2]: https://github.com/DataDog/dd-trace-go/issues/2099
[3]: /ja/profiler/profile_visualizations/#single-profile
[4]: /ja/profiler/profile_visualizations/#timeline-view
[5]: https://github.com/dominikh/gotraceui
[6]: /ja/tracing/trace_explorer/
[7]: https://blog.felixge.de/waiting-for-go1-21-execution-tracing-with-less-than-one-percent-overhead/
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

[.NET サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。

This capability requires `dd-trace-dotnet` version 2.30.0+.

[1]: /ja/profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

[PHP サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。

Requires `dd-trace-php` version 0.71+.

To enable the [timeline feature](#span-execution-timeline-view):
- Upgrade to `dd-trace-php` version 0.98+.
- Set the environment variable `DD_PROFILING_TIMELINE_ENABLED=1` or INI setting `datadog.profiling.timeline_enabled=1`

[1]: /ja/profiler/enabling/php
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### スパン実行の内訳

各トレースのビューから、選択したスパンの範囲内のプロファイリングデータが Code Hotspots タブに表示されます。

左側の値は、選択されたスパンの間にそのメソッド呼び出しに費やされた時間を表します。ランタイムと言語によって、カテゴリーは異なります。
{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php" >}}
{{< programming-lang lang="java" >}}
- **CPU** は、CPU タスクを実行するのに費やした時間を示します。
- **Synchronization** は、モニター待ちの時間、スレッドがスリープしている時間、パークしている時間などを表示します。
- **VM operations** は、VM オペレーション (例えば、ガベージコレクション、コンパイル、セーフポイント、ヒープダンプ) の待ち時間を示します。
- **ファイル I/O** は、ディスクの読み取り/書き込み動作の実行待ちに費やした時間を示します。
- **ソケット I/O** は、ネットワークの読み取り/書き込み動作の実行待ちに費やした時間を示します。
- **Monitor enter** は、スレッドがロックでブロックされている時間を表示します。
- **Uncategorized** は、前述のカテゴリーに分類できないスパンの実行に要した時間を表示します。
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
- **CPU** は、CPU タスクを実行するのに費やした時間を示します。
- **Lock Wait** は、スレッドがロックでブロックされている時間を表示します。
- **Uncategorized** は、前述のカテゴリーに分類できないスパンの実行に要した時間を表示します。
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
- **CPU** は、CPU タスクを実行するのに費やした時間を示します。
- **Uncategorized** は、CPU 実行以外のスパン実行に要した時間を表示します。
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}
- **CPU** は、CPU タスクの実行にかかった時間を示します。Node.js experimental CPU プロファイラーで収集されたプロファイルにのみ表示されます。
- **Uncategorized** は、CPU 実行以外のスパン実行に要した時間を表示します。
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
- **CPU** は、CPU タスクを実行するのに費やした時間を示します。
- **Off-CPU** は、CPU 実行以外のスパン実行に要した時間を表示します。
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
- **CPU** は、CPU タスクを実行するのに費やした時間を示します。
- **Lock Wait** は、スレッドがロックでブロックされている時間を表示します。
- **Uncategorized** は、前述のカテゴリーに分類できないスパンの実行に要した時間を表示します。
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
- **CPU** は、CPU タスクを実行するのに費やした時間を示します。
- **Uncategorized** は、CPU 実行以外のスパン実行に要した時間を表示します。
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

Click the plus icon `+` to expand the stack trace to that method **in reverse order**. Hover over the value to see the percentage of time explained by category.

### Span execution timeline view

{{< img src="profiler/code_hotspots_tab-timeline.png" alt="Code Hotspots tab has a timeline view that breakdown execution over time and threads" >}}

**Timeline** ビューは、スパンの期間における時間ベースのパターンと作業分布を表示します。

スパンの **Timeline** ビューでは、次のことが可能です。

- 時間のかかるメソッドを分離する。
- スレッド間の複雑な相互作用を整理する。
- Surface runtime activity that impacted the request.

ランタイムや言語によって、レーンは異なります。

{{< programming-lang-wrapper langs="java,go,ruby,nodejs,dotnet,php" >}}
{{< programming-lang lang="java" >}}
各レーンは**スレッド**を表しています。共通のプールからのスレッドはまとめてグループ化されています。プールを展開することで、各スレッドの詳細を確認できます。

上のレーンは、余分なレイテンシーを追加するかもしれないランタイムアクティビティです。これらはリクエスト自体に関係ないこともあります。

For additional information about debugging slow p95 requests or timeouts using the timeline, see the blog post [Understanding Request Latency with Profiling][1].

[1]: https://www.datadoghq.com/blog/request-latency-profiling/
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
Each lane represents a **goroutine**. This includes the goroutine that started the selected span, as well as any goroutines it created and their descendants. Goroutines created by the same `go` statement are grouped together. You can expand the group to view details for each goroutine.

上のレーンは、余分なレイテンシーを追加するかもしれないランタイムアクティビティです。これらはリクエスト自体に関係ないこともあります。

タイムラインを使って p95 リクエストの遅延やタイムアウトをデバッグする方法については、ブログ記事 [Datadog のプロファイリングタイムラインによる Go リクエストレイテンシーのデバッグ][1]を参照してください。

[1]: https://blog.felixge.de/debug-go-request-latency-with-datadogs-profiling-timeline/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
See [prerequisites](#prerequisites) to learn how to enable this feature for Ruby.

Each lane represents a **thread**. Threads from a common pool are grouped together. You can expand the pool to view details for each thread.
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
Each lane represents a **thread**. Threads from a common pool are grouped together. You can expand the pool to view details for each thread.

上部のレーンは、余分なレイテンシーを追加する可能性のあるランタイムアクティビティを表しています。これらはリクエスト自体に関係ないこともあります。
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}
Node.js でこの機能を有効にする方法については、[前提条件](#prerequisites)を参照してください。

JavaScript の**スレッド**には 1 つのレーンがあります。

上のレーンはガベージコレクターの**ランタイムアクティビティ**で、リクエストに余分なレイテンシーを追加する可能性があります。
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
PHP でこの機能を有効にする方法については、[前提条件](#prerequisites)を参照してください。

There is one lane for each PHP **thread** (in PHP NTS, this is only one lane). Fibers that run in this **thread** are represented in the same lane.

Lanes on the top are runtime activities that may add extra latency to your request, due to file compilation and garbage collection.
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### プロファイルをトレースから閲覧する

{{< img src="profiler/view_profile_from_trace.png" alt="Opening a view of the profile in a flame graph" >}}

For each type from the breakdown, click **Open in Profiling** to see the same data opened up in a new page. From there, you can change the visualization to a flame graph.
Click the **Focus On** selector to define the scope of the data:

- **Span & Children** は、選択したスパンと同じサービス内のすべての子孫スパンにプロファイリングデータをスコープします。
- **Span only** は、プロファイリングデータをあらかじめ選択されたスパンにのみスコープします。
- **Span time period** は、スパンがアクティブだった期間中のすべてのスレッドにプロファイリングデータをスコープします。
- **Full profile** は、データのスコープを以前に選択されたスパンを実行したサービスプロセス全体の 60 秒に設定します。

## コードのパフォーマンスを API エンドポイントごとに分解する

### 前提条件

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php" >}}
{{< programming-lang lang="java" >}}
Endpoint profiling is enabled by default when you [turn on profiling for your Java service][1].

[Datadog プロファイラーの使用][2]が必要です。JFR はサポートされていません。

[1]: /ja/profiler/enabling/java
[2]: /ja/profiler/enabling/java/?tab=datadog#requirements
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

[Python サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

Requires `dd-trace-py` version 0.54.0+.

[1]: /ja/profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
[Go サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

`dd-trace-go` バージョン 1.37.0 以上が必要で、Go バージョン 1.18 以降で最適に動作します。

[1]: /ja/profiler/enabling/go
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

[Ruby サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

Requires `dd-trace-rb` version 0.54.0+.

[1]: /ja/profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Linux と macOS で [Node.js サービスのプロファイリングを有効にする][1]と、エンドポイントプロファイリングがデフォルトで有効になります。Windows ではこの機能は利用できません。

`dd-trace-js` のバージョン 5.0.0 以降、4.24.0 以降または 3.45.0 以降が必要です。

[1]: /ja/profiler/enabling/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

[.NET サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

Requires `dd-trace-dotnet` version 2.15.0+.

[1]: /ja/profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

[PHP サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

Requires `dd-trace-php` version 0.79.0+.

[1]: /ja/profiler/enabling/php
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### エンドポイントプロファイリング

エンドポイントプロファイリングは、Web サービスの任意のエンドポイントでフレームグラフをスコープし、遅いエンドポイント、レイテンシーが多いエンドポイント、エンドユーザーエクスペリエンスが悪い原因となっているエンドポイントを見つけることができます。これらのエンドポイントは、デバッグが難しく、なぜ遅いのかを理解するのが困難な場合があります。遅い原因は、エンドポイントが多くの CPU サイクルを消費するなど、意図しない大量のリソースを消費している可能性があります。

エンドポイントプロファイリングを利用すると、以下のことが可能になります。

- エンドポイント全体のレスポンスタイムを遅くしているボトルネックとなるメソッドを特定する。
- CPU、メモリ、例外などの貴重なリソースを消費する上位のエンドポイントを切り分ける。これは、一般的にパフォーマンスを向上させるためにサービスを最適化しようとしている場合に特に役立ちます。
- サードパーティのコードやランタイムライブラリが、エンドポイントの速度低下やリソース消費の重さの原因になっているかどうかを把握する。

{{< img src="profiler/endpoint_agg.png" alt="Troubleshooting a slow endpoint by using endpoint aggregation" >}}

### Surface code that impacted your production latency

In the APM Service page, use the information in the **Profiling** tab to correlate a latency or throughput change to a code performance change.

この例では、レイテンシーが、以下のコードによって引き起こされる`/GET train` でのロック競合の増加とどのようにリンクしているかがわかります。

```java
Thread.sleep(DELAY_BY.minus(elapsed).toMillis());
```

{{< img src="profiler/apm_service_page_pivot_to_contention_comparison.mp4" alt="Pivoting from APM service page to Profiling comparison page to find the line of code causing latency" video=true >}}

### Track endpoints that consume the most resources

CPU やウォールタイムなどの貴重なリソースを消費している上位のエンドポイントを追跡することは価値があります。このリストは、エンドポイントが回帰していないか、あるいは新たに導入したエンドポイントが大幅にリソースを消費してサービス全体の速度を低下させていないかどうかを確認するのに役立ちます。

The following image shows that `GET /store_history` is periodically impacting this service by consuming 20% of its CPU and 50% of its allocated memory:

{{< img src="profiler/apm_endpoint_metric.png" alt="Graphing top endpoints in terms of resource consumption" >}}

### リクエストごとの平均リソース消費量の追跡

`Per endpoint call` を選択すると、トラフィックが時間の経過とともに変化しても、動作の変化を確認できます。これは、プログレッシブロールアウトのサニティチェックや日々のトラフィックパターンの分析に役立ちます。

The following example shows that CPU per request increased for `/GET train`:

{{< img src="profiler/endpoint_per_request2.mp4" alt="Troubleshooting a endpoint that started using more resource per request" video="true" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}