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

{{< programming-lang-wrapper langs="java,python,go,ruby,dotnet,php" >}}
{{< programming-lang lang="java" >}}
[Java サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。手動でインスツルメントされたコードの場合、Continuous Profiler はスパンのスコープアクティベーションを要求します。

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

`dd-trace-rb` バージョン 0.49.0+ が必要です。

[1]: /ja/profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

[Go サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。

新しい[タイムライン機能](#span-execution-timeline-view) (ベータ版) を有効にするには、以下の環境変数を設定してください。

```go
os.Setenv("DD_PROFILING_EXECUTION_TRACE_ENABLED", "true")
os.Setenv("DD_PROFILING_EXECUTION_TRACE_PERIOD", "15m")
```

これらの変数を設定すると、最大 1 分 (または 5 MiB) の実行トレースデータが [15 分ごとに][2]記録されます。

実行トレースを記録している間、アプリケーションがガベージコレクションのように CPU 使用率の増加を観測する可能性があります。ほとんどのアプリケーションでは大きな影響はないはずですが、Go 1.21 にはこのオーバーヘッドをなくすための[パッチ][3]が含まれています。

この機能を使用するには、`dd-trace-go` バージョン 1.37.0 以降 (タイムラインベータは 1.52.0 以降) が必要で、Go バージョン 1.18 以降 (タイムラインベータは 1.21 以降) で最適に動作します。

[1]: /ja/profiler/enabling/go
[2]: https://github.com/DataDog/dd-trace-go/issues/2099
[3]: https://blog.felixge.de/waiting-for-go1-21-execution-tracing-with-less-than-one-percent-overhead/
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

[.NET サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。

この機能を使用するには `dd-trace-dotnet` バージョン 2.30.0+ が必要です。

[1]: /ja/profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

[PHP サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。

`dd-trace-php` バージョン 0.71+ が必要です。

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

プラスアイコン `+` をクリックすると、スタックトレースをそのメソッドに**逆順**に展開します。値の上にカーソルを置くと、カテゴリー別に説明される時間の割合が表示されます。

### スパン実行タイムラインビュー

{{< img src="profiler/code_hotspots_tab-timeline.mp4" alt="Code Hotspots タブには、時間とスレッドに渡る実行の内訳を示すタイムラインビューがあります" video=true >}}

**Timeline** ビューは、スパンの期間における時間ベースのパターンと作業分布を表示します。

スパンの **Timeline** ビューでは、次のことが可能です。

- 時間のかかるメソッドを分離する。
- スレッド間の複雑な相互作用を整理する。
- リクエストに影響を与えたランタイムアクティビティを表面化する。

ランタイムや言語によって、レーンは異なります。

{{< programming-lang-wrapper langs="java,go,dotnet" >}}
{{< programming-lang lang="java" >}}
各レーンは**スレッド**を表します。共通のプールからのスレッドは一緒にグループ化されます。プールを展開すると、各スレッドの詳細を表示できます。

上のレーンは、余分なレイテンシーを追加するかもしれないランタイムアクティビ ティです。これらはリクエスト自体に関係ないこともあります。
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
各レーンは **goroutine** を表します。これには、選択されたスパンを開始した goroutine と、その goroutine が作成した goroutine とその子孫が含まれます。同じ `go` ステートメントで作成された goroutine はグループ化されます。グループを展開して各 goroutine の詳細を見ることができます。

上のレーンは、余分なレイテンシーを追加するかもしれないランタイムアクティビティです。これらはリクエスト自体に関係ないこともあります。

タイムラインを使って p95 リクエストの遅延やタイムアウトをデバッグする方法については、ブログ記事 [Datadog のプロファイリングタイムラインによる Go リクエストレイテンシーのデバッグ][2]を参照してください。

[2]: https://blog.felixge.de/debug-go-request-latency-with-datadogs-profiling-timeline/
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

{{< programming-lang-wrapper langs="java,python,go,ruby,dotnet,php" >}}
{{< programming-lang lang="java" >}}
[Java サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

[Datadog プロファイラーの使用][2]が必要です。JFR はサポートされていません。

[1]: /ja/profiler/enabling/java
[2]: /ja/profiler/enabling/java/?tab=datadog#requirements
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

[Python サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

`dd-trace-py` バージョン 0.54.0+ が必要です。

[1]: /ja/profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
[Go サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

`dd-trace-go` バージョン 1.37.0 以上が必要で、Go バージョン 1.18 以降で最適に動作します。

[1]: /ja/profiler/enabling/go
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

[Ruby サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

`dd-trace-rb` バージョン 0.54.0+ が必要です。

[1]: /ja/profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

[.NET サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

`dd-trace-dotnet` バージョン 2.15.0+ が必要です。

[1]: /ja/profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

[PHP サービスのプロファイリングを起動する][1]と、エンドポイントプロファイリングがデフォルトで有効化されます。

`dd-trace-php` バージョン 0.79.0+ が必要です。

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