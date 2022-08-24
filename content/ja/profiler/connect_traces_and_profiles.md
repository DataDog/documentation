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

{{< img src="profiler/code_hotspots_tab.mp4" alt="Code Hotspots タブで APM トレーススパンのプロファイリング情報を確認" video=true >}}

### 前提条件

{{< programming-lang-wrapper langs="java,python,go,ruby,.NET,php" >}}
{{< programming-lang lang="java" >}}
[サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。手動でインスツルメントされたコードの場合、Continuous Profiler はスパンのスコープアクティベーションを要求します。

```java
final Span span = tracer.buildSpan("ServicehandlerSpan").start();
try (final Scope scope = tracer.activateSpan(span)) { // mandatory for Datadog continuous profiler to link with span
    // worker thread impl
  } finally {
    // Step 3: Finish Span when work is complete
    span.finish();
  }

```

以下が必要です:
- OpenJDK 11 以上およびトレーシングライブラリバージョン 0.65.0 以上、または
- OpenJDK 8: 8u282 以上およびトレーシングライブラリバージョン 0.77.0 以上の場合。


[1]: /ja/profiler/enabling/java
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

[サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。

トレーシングライブラリのバージョン 0.44.0 以降が必要です。


[1]: /ja/profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

[サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。

トレーシングライブラリのバージョン 0.49.0 以降が必要です。


[1]: /ja/profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Go の Code Hotspots の識別を有効にするには、[サービスのプロファイリングを有効化][1]し、以下を確認します。

- [dd-trace-go][2] のバージョン 1.35.0 以降を使用していること。
- 環境で [`DD_PROFILING_CODE_HOTSPOTS_COLLECTION_ENABLED=true`][3] が設定されているか、 [`tracer.WithProfilerCodeHotspots(true)`][3] オプションが [`tracer.Start()`][4] に渡されていること。このオプションは [dd-trace-go][2] バージョン 1.37.0+ でデフォルトで有効になっています。
- 全スパンの 100% のホットスポットの情報を取得するために [`profiler.CPUDuration(60*time.Second)`][5] と [`profiler.WithPeriod(60*time.Second)`][6] が [`profiler.Start()`][7] に渡されていること。これらの値は [dd-trace-go][2] バージョン 1.37.0+ でデフォルトで設定されています。


**警告:** Go 1.17 以下には、特に CGO を多用する場合に、この機能の精度を低下させる可能性のあるいくつかのバグ ([GH-35057][8]、[GH-48577][9]、[CL-369741][10]、[CL-369983][11] 参照) があります。これらは 1.18 リリースで修正される予定です。

[1]: /ja/profiler/enabling/go
[2]: https://github.com/DataDog/dd-trace-go/releases
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithProfilerCodeHotspots
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#Start
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#CPUDuration
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithPeriod
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#Start
[8]: https://github.com/golang/go/issues/35057
[9]: https://github.com/golang/go/issues/48577
[10]: https://go-review.googlesource.com/c/go/+/369741/
[11]: https://go-review.googlesource.com/c/go/+/369983/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

[サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。

トレーシングライブラリのバージョン 2.7.0 以降が必要です。

[1]: /ja/profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

[サービスのプロファイリングを起動する][1]と、コードのホットスポット識別がデフォルトで有効化されます。

トレーシングライブラリのバージョン 0.71 以降が必要です。

[1]: /ja/profiler/enabling/php
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### スパンからプロファイリングデータにリンクする

各トレースのビューから、選択したスパンの範囲内のプロファイリングデータが Code Hotspots タブに表示されます。

左側の詳細ビューは該当するスパンを実行している時間集計のタイプのリストです。このタイプリストの内容はランタイムと言語に応じて異なります。

- **メソッドの実行時間**は、コードの各メソッドが実行された全体の時間を示します。
- **CPU** は、CPU タスクを実行するのに費やした時間を示します。
- **同期**は、同期されたオブジェクトのロック待機に費やした時間を示します。
- **ガベージコレクション**は、ガベージコレクターの実行待ちに費やした時間を示します。
- **VM オペレーション** (Java のみ) は、ガベージコレクションに関連しない (ヒープダンプなど) VM のオペレーション待機に費やした時間を示します。
- **ファイル I/O** は、ディスクの読み取り/書き込み動作の実行待ちに費やした時間を示します。
- **ソケット I/O** は、ネットワークの読み取り/書き込み動作の実行待ちに費やした時間を示します。
- **オブジェクト待機**は、オブジェクト上の通知コール待機に費やした時間を示します。
- **その他**は、プロファイリングデータで説明不能なスパンの実行に費やした時間を示します。

これらのタイプのうちひとつをクリックし、時間を要したメソッドに対応するリスト (開始時間順) を確認します。プラス (`+`) マークをクリックすると当該メソッドのスタックトレースが**逆の順で**開きます。

#### 'Other' カテゴリで費やされた時間とはどういう意味ですか？

**その他**の説明のつかない時間の記録が少ない (10% 未満) ことは通常ありません。その他の時間が記録される可能性は次の通りです。

  - 選択したスパンが実行に直接マッピングされていない場合。プロファイリングデータとスパンが特定のスレッドで実行される場合、この 2 つは一意の関係性を持ちます。たとえば、いくつかのスパンが作成され、一連の関連する処理ステップの仮想コンテナ一意に使用されたが、どのスレッドの実行とも直接関連していないといった場合が考えられます。
  - アプリケーションのプロセスが CPU リソースにアクセスしてそれを実行または一時停止できない場合。このとき、その他のプロセスやコンテナの競合するリソースについてプロファイラーに知らせる手段は存在しません。
  - アプリケーションがそれぞれ 10 分未満の同期または I/O イベントでロックされている場合: Java プロファイラーは一時停止された 10 分を超えるスレッドイベント (ロック、I/O、パーク) に関するデータを受信します。このしきい値を引き下げたい場合は、[セットアップのデフォルト値変更についてのドキュメント][1]を参照してください。
  - 選択したスパンが短い場合。プロファイリングは定期的にコードの状態をチェックするサンプリング機構であるため、スパンが 50ms より短い場合はそのスパンについての十分なデータが得られないことがあります。
  - インスツルメンテーションが欠けている場合: 詳細なプロファイリングを行うには、ScopeManager でスパンを有効化し、スパンを実行スレッドに関連させる必要があります。カスタムインスツルメンテーションの中にはこれらのスパンを適切に有効化しないものがあり、この場合はスパンを実行スレッドにマッピングできません。このスパンがカスタムインテグレーションに由来する場合は、[カスタムインスツルメンテーションのドキュメント][2]でその改善についての情報を参照してください。

### プロファイルをトレースから閲覧する

{{< img src="profiler/flamegraph_view.mp4" alt="フレームグラフでプロファイルビューを開く" video=true >}}

詳細画面の各タイプについて、**View profile** をクリックするとそのデータをフレームグラフ形式で表示させることができます。**Span/Trace/Full profile** セレクタをクリックして、データのスコープを定義します。

- **Span** は、プロファイリングデータのスコープを以前に選択されたスパンに設定します。
- **Trace** は、プロファイリングデータのスコープを、以前に選択されたスパンとサービスプロセスが同じすべてのスパンに設定します。
- **Full profile** は、データのスコープを以前に選択されたスパンを実行したサービスプロセス全体の 60 秒に設定します。

## コードのパフォーマンスを API エンドポイントごとに分解する

### 前提条件

{{< programming-lang-wrapper langs="python,go,ruby" >}}
{{< programming-lang lang="python" >}}

[Python][1] サービスでプロファイリングを有効にすると、エンドポイントプロファイリングがデフォルトで有効になります。この機能を利用するには、 `dd-trace-py` バージョン 0.54.0 またはそれ以上が必要です。
<p></p>

[1]: /ja/profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
[Go][1] サービスでプロファイリングを有効にすると、エンドポイントプロファイリングはデフォルトで無効になります。これを有効にするには、以下を確認する必要があります。

- [dd-trace-go][2] のバージョン 1.35.0 以降を使用していること。
- 環境で [`DD_PROFILING_ENDPOINT_COLLECTION_ENABLED=true`][3] が設定されているか、 [`tracer.WithProfilerEndpoints(true)`][3] オプションが [`tracer.Start()`][4] に渡されていること。このオプションは [dd-trace-go][2] バージョン 1.37.0+ でデフォルトで有効になっています。

**警告:** Go 1.17 以下には、特に CGO を多用する場合に、この機能の精度を低下させる可能性のあるいくつかのバグ ([GH-35057][5]、[GH-48577][6]、[CL-369741][7]、[CL-369983][8] 参照) があります。これらは 1.18 リリースで修正される予定です。

[1]: /ja/profiler/enabling/go
[2]: https://github.com/DataDog/dd-trace-go/releases
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithProfilerEndpoints
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#Start
[5]: https://github.com/golang/go/issues/35057
[6]: https://github.com/golang/go/issues/48577
[7]: https://go-review.googlesource.com/c/go/+/369741/
[8]: https://go-review.googlesource.com/c/go/+/369983/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

[Ruby][1] サービスでプロファイリングを有効にすると、エンドポイントプロファイリングがデフォルトで有効になります。この機能を利用するには、`dd-trace-rb` バージョン 0.54.0 またはそれ以上が必要です。
<p></p>

[1]: /ja/profiler/enabling/ruby
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### フレームグラフをエンドポイントごとにスコープする

エンドポイントプロファイリングは、Web サービスの任意のエンドポイントでフレームグラフをスコープし、遅いエンドポイント、レイテンシーが多いエンドポイント、エンドユーザーエクスペリエンスが悪い原因となっているエンドポイントを見つけることができます。これらのエンドポイントは、デバッグが難しく、なぜ遅いのかを理解するのが困難な場合があります。遅い原因は、エンドポイントが多くの CPU サイクルを消費するなど、意図しない大量のリソースを消費している可能性があります。

エンドポイントプロファイリングを利用すると、以下のことが可能になります。

- エンドポイント全体のレスポンスタイムを遅くしているボトルネックとなるメソッドを特定する。
- CPU やウォールタイムなどの貴重なリソースを消費する上位のエンドポイントを切り分ける。これは、一般的にパフォーマンスを向上させるためにサービスを最適化しようとしている場合に特に役立ちます。
- サードパーティのコードやランタイムライブラリが、エンドポイントの速度低下やリソース消費の重さの原因になっているかどうかを把握する。

{{< img src="profiler/endpoint_agg_gif.mp4" alt="エンドポイント集計による遅いエンドポイントのトラブルシューティング" video=true >}}


### 最もリソースを消費しているエンドポイントを追跡する

CPU やウォールタイムなどの貴重なリソースを消費している上位のエンドポイントを追跡することは価値があります。このリストは、エンドポイントが回帰していないか、あるいは新たに導入したエンドポイントが大幅にリソースを消費してサービス全体の速度を低下させていないかどうかを確認するのに役立ちます。

{{< img src="profiler/endpoint_metric.mp4" alt="上位のエンドポイントの消費リソースのグラフ化" video=true >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/profiler/profiler_troubleshooting#reduce-overhead-from-default-setup
[2]: /ja/tracing/trace_collection/custom_instrumentation/java#manually-creating-a-new-span