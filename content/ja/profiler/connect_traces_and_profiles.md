---
aliases:
- /ja/tracing/profiler/connect_traces_and_profiles/
further_reading:
- link: トレーシング
  tag: ドキュメント
  text: APM 分散型トレーシング
- link: /profiler/enabling
  tag: ドキュメント
  text: アプリケーションの継続的なプロファイラーを有効にする
- link: getting_started/profiler
  tag: ドキュメント
  text: プロファイラーの概要
kind: ドキュメント
title: 遅いトレースやエンドポイントを調査する
---

本番環境においてアプリケーションのパフォーマンスに問題がある場合、分散型トレーシングとプロファイリングによるコードスタックトレースのベンチマークを統合することで、パフォーマンスのボトルネックを特定する強力な方法となります。APM 分散型トレーシングと Continuous Profiler の両方が有効になっているアプリケーションプロセスは、自動的にリンクされます。

Code Hotspots タブでスパン情報からプロファイリングデータに直接移動し、パフォーマンス問題に関連する特定のコード行を見つけることができます。同様に、低速でリソースを消費するエンドポイントも、プロファイリング UI で直接デバッグできます。

## 遅いトレースのコードのホットスポットを特定する

{{< img src="profiler/code_hotspots_tab-2.mp4" alt="Code Hotspots タブで APM トレーススパンのプロファイリング情報を確認" video=true >}}

### 前提条件

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php" >}}
{{< programming-lang lang="java" >}}
[Java サービスのプロファイリングを有効にする][1]と、Code Hotspots の識別がデフォルトで有効化されます。手動でインスツルメントされたコードの場合、Continuous Profiler はスパンのスコープをアクティブにする必要があります。

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

新しい[タイムライン機能](#span-execution-timeline-view) (ベータ版) を有効にするには
- `dd-trace-rb` 1.15 以上にアップグレードする
- `DD_PROFILING_EXPERIMENTAL_TIMELINE_ENABLED=true` に設定する

[1]: /ja/profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Code Hotspots (ベータ版) の識別は、[Node.js サービスのプロファイリングを有効にする][1] と、デフォルトでは有効になりません。この追加の環境変数を設定することで有効になります。

```shell
export DD_PROFILING_CODEHOTSPOTS_ENABLED=true
```

`dd-trace-js` のバージョン 4.17.0 以降または 3.38.0 以降が必要です。

[1]: /ja/profiler/enabling/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

[Go サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。

新しい[タイムライン機能](#span-execution-timeline-view) (ベータ版) を有効にするには、以下の環境変数を設定してください。

```go
os.Setenv("DD_PROFILING_EXECUTION_TRACE_ENABLED", "true")
os.Setenv("DD_PROFILING_EXECUTION_TRACE_PERIOD", "15m")
```

これらの変数を設定すると、実行トレースデータが [15 分ごとに][2]最大 1 分間 (または 5 MiB) 記録されます。

このデータは、

- 検索クエリに `go_execution_traced:yes` を追加して [Profile List][3] で表示できます。プロファイルをクリックすると [Profile Timeline][4] が表示されます。さらに深く見るには、プロファイルをダウンロードし、`go tool trace` または [gotraceui][5] を使用して、含まれている `go.trace` ファイルを表示します。
- 検索クエリに `@go_execution_traced:yes` (`@` に注意) を追加して[トレースエクスプローラー][6]で表示できます。スパンをクリックし、`Code Hotspots` タブを選択して[スパンタイムライン](#span-execution-timeline-view)を表示します。

実行トレースを記録している間、アプリケーションがガベージコレクションのように CPU 使用率の増加を観測する可能性があります。ほとんどのアプリケーションでは大きな影響はないはずですが、Go 1.21 にはこのオーバーヘッドをなくすための[パッチ][7]が含まれています。

この機能を利用するには、`dd-trace-go` のバージョン 1.37.0 以上 (タイムラインベータの場合は 1.52.0 以上) が必要で、Go のバージョン 1.18 以上 (タイムラインベータの場合は 1.21 以上) で最適に動作します。

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

この機能を使用するには `dd-trace-dotnet` のバージョン 2.30.0 以上が必要です。

[1]: /ja/profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

[PHP サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。

`dd-trace-php` のバージョン 0.71 以上が必要です。

[1]: /ja/profiler/enabling/php
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### スパン実行の内訳

各トレースのビューから、選択したスパンの範囲内のプロファイリングデータが Code Hotspots タブに表示されます。

左側の値は、選択されたスパンの間にそのメソッド呼び出しに費やされた時間を表します。ランタイムと言語によって、カテゴリーは異なります。
{{< programming-lang-wrapper langs="java,python,go,ruby,dotnet,php" >}}
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

プラスアイコン `+` をクリックすると、そのメソッドのスタックトレースが**逆順**に展開されます。値の上にカーソルを置くと、カテゴリー別に説明される時間の割合が表示されます。

### スパン実行のタイムラインビュー

{{< img src="profiler/code_hotspots_tab-timeline.mp4" alt="Code Hotspots タブには、時間とスレッドに渡る実行の内訳を示すタイムラインビューがあります" video=true >}}

**Timeline** ビューは、スパンの期間における時間ベースのパターンと作業分布を表示します。

スパンの **Timeline** ビューでは、次のことが可能です。

- 時間のかかるメソッドを分離する。
- スレッド間の複雑な相互作用を整理する。
- リクエストに影響を与えたランタイムアクティビティを明らかにする。

ランタイムや言語によって、レーンは異なります。

{{< programming-lang-wrapper langs="java,go,ruby,dotnet" >}}
{{< programming-lang lang="java" >}}
各レーンは**スレッド**を表します。共通のプールからのスレッドは一緒にグループ化されます。プールを展開すると、各スレッドの詳細を表示できます。

上のレーンは、余分なレイテンシーを追加するかもしれないランタイムアクティビティです。これらはリクエスト自体に関係ないこともあります。

タイムラインを使って p95 リクエストの遅延やタイムアウトをデバッグする方法については、ブログ記事 [プロファイリングでリクエストの遅延を理解する][1]を参照してください。

[1]: https://richardstartin.github.io/posts/wallclock-profiler
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
各レーンは **goroutine** を表します。これには、選択されたスパンを開始した goroutine と、その goroutine が作成した goroutine とその子孫が含まれます。同じ `go` ステートメントで作成された goroutine はグループ化されます。グループを展開して各 goroutine の詳細を見ることができます。

上のレーンは、余分なレイテンシーを追加するかもしれないランタイムアクティビティです。これらはリクエスト自体に関係ないこともあります。

タイムラインを使って p95 リクエストの遅延やタイムアウトをデバッグする方法については、ブログ記事 [Datadog のプロファイリングタイムラインによる Go リクエストレイテンシーのデバッグ][1]を参照してください。

[1]: https://blog.felixge.de/debug-go-request-latency-with-datadogs-profiling-timeline/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
Ruby でこの機能を有効にする方法については、[前提条件](#prerequisites)を参照してください。

各レーンは**スレッド**を表します。共通のプールからのスレッドは一緒にグループ化されます。プールを展開すると、各スレッドの詳細を表示できます。
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
各レーンは**スレッド**を表します。共通のプールからのスレッドは一緒にグループ化されます。プールを展開すると、各スレッドの詳細を表示できます。

上のレーンは、余分なレイテンシーを追加するかもしれないランタイムアクティビティです。これらはリクエスト自体に関係ないこともあります。
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### プロファイルをトレースから閲覧する

{{< img src="profiler/flamegraph_view-1.mp4" alt="フレームグラフでプロファイルビューを開く" video=true >}}

内訳のデータタイプごとに、**View In Full Page** をクリックすると、同じデータが新しいページで表示されます。そこから、フレームグラフに視覚化を変更することができます。
**Focus On** セレクタをクリックすると、データの範囲を定義することができます。

- **Span & Children** は、選択したスパンと同じサービス内のすべての子孫スパンにプロファイリングデータをスコープします。
- **Span only** は、プロファイリングデータをあらかじめ選択されたスパンにのみスコープします。
- **Span time period** は、スパンがアクティブだった期間中のすべてのスレッドにプロファイリングデータをスコープします。
- **Full profile** は、データのスコープを以前に選択されたスパンを実行したサービスプロセス全体の 60 秒に設定します。

## コードのパフォーマンスを API エンドポイントごとに分解する

### 前提条件

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php" >}}
{{< programming-lang lang="java" >}}
[Java サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

[Datadog プロファイラーの使用][2]が必要です。JFR はサポートされていません。

[1]: /ja/profiler/enabling/java
[2]: /ja/profiler/enabling/java/?tab=datadog#requirements
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

[Python サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

`dd-trace-py` のバージョン 0.54.0 以上が必要です。

[1]: /ja/profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
[Go サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

`dd-trace-go` バージョン 1.37.0 以上が必要で、Go バージョン 1.18 以降で最適に動作します。

[1]: /ja/profiler/enabling/go
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

[Ruby サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

`dd-trace-rb` のバージョン 0.54.0 以上が必要です。

[1]: /ja/profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

エンドポイントのプロファイリング (ベータ版) は、[Node.js サービスのプロファイリングを有効にする][1] と、デフォルトでは有効になりません。この追加の環境変数を設定することで有効になります。

```shell
export DD_PROFILING_ENDPOINT_COLLECTION_ENABLED=true
```

この環境変数を設定すると、エンドポイントのプロファイリングに必要な [Code Hotspots (ベータ版)][2] も有効になります。

`dd-trace-js` のバージョン 4.17.0 以降または 3.38.0 以降が必要です。

[1]: /ja/profiler/enabling/nodejs
[2]: /ja/profiler/connect_traces_and_profiles/?code-lang=nodejs#identify-code-hotspots-in-slow-traces
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

[.NET サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

`dd-trace-dotnet` のバージョン 2.15.0 以上が必要です。

[1]: /ja/profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

[PHP サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

`dd-trace-php` のバージョン 0.79.0 以上が必要です。

[1]: /ja/profiler/enabling/php
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### エンドポイントプロファイリング

エンドポイントプロファイリングは、Web サービスの任意のエンドポイントでフレームグラフをスコープし、遅いエンドポイント、レイテンシーが多いエンドポイント、エンドユーザーエクスペリエンスが悪い原因となっているエンドポイントを見つけることができます。これらのエンドポイントは、デバッグが難しく、なぜ遅いのかを理解するのが困難な場合があります。遅い原因は、エンドポイントが多くの CPU サイクルを消費するなど、意図しない大量のリソースを消費している可能性があります。

エンドポイントプロファイリングを利用すると、以下のことが可能になります。

- エンドポイント全体のレスポンスタイムを遅くしているボトルネックとなるメソッドを特定する。
- CPU、メモリ、例外などの貴重なリソースを消費する上位のエンドポイントを切り分ける。これは、一般的にパフォーマンスを向上させるためにサービスを最適化しようとしている場合に特に役立ちます。
- サードパーティのコードやランタイムライブラリが、エンドポイントの速度低下やリソース消費の重さの原因になっているかどうかを把握する。

{{< img src="profiler/endpoint_agg.mp4" alt="エンドポイント集計による遅いエンドポイントのトラブルシューティング" video=true >}}

### 最もリソースを消費しているエンドポイントを追跡する

CPU やウォールタイムなどの貴重なリソースを消費している上位のエンドポイントを追跡することは価値があります。このリストは、エンドポイントが回帰していないか、あるいは新たに導入したエンドポイントが大幅にリソースを消費してサービス全体の速度を低下させていないかどうかを確認するのに役立ちます。

次のイメージは、`GET /store_history` がこのサービスの CPU の 20% を消費して定期的に影響を与えていることを示しています。

{{< img src="profiler/endpoint_metric.png" alt="上位のエンドポイントの消費リソースのグラフ化" >}}

### リクエストごとの平均リソース消費量の追跡

`Per endpoint call` を選択すると、トラフィックが時間の経過とともに変化しても、動作の変化を確認できます。これは、プログレッシブロールアウトのサニティチェックや日々のトラフィックパターンの分析に役立ちます。

次のビデオは、`/GET train` のリクエストあたりの CPU が 2 倍になったことを示しています。

{{< img src="profiler/endpoint_per_request.mp4" alt="リクエストごとに多くのリソースを使用し始めたエンドポイントのトラブルシューティング" video=true >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}