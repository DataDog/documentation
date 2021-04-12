---
title: プロファイリング入門
kind: Documentation
---
プロファイリングによってサービスがより速く、より安く、より信頼できると聞いたことがあるかもしれません。しかし、プロファイラーを使用したことがない場合は、ダークアートのように思えるかもしれません。

このガイドでは、プロファイリングについて説明し、パフォーマンスの問題があるサンプルサービスのプロファイルを作成し、Continuous Profiler を使用して問題を理解して修正する方法を確認します。

## プロファイリングとは？

プロファイラーは、実行中のプログラムに関するデータを収集することにより、各関数が実行している「作業」の量を示します。たとえば、インフラストラクチャーモニタリングでは、アプリサーバーが CPU の 80% を使用していることが示されている場合があっても、その理由がわからないかもしれません。プロファイリングにより、関数 `doSomeWork` が CPU の 48% を使用していること、関数 `renderGraph` がさらに 19% を使用していることなどがわかります。多くのプログラムはごく少数の場所で多くの時間を費やし、それらがどこにあるのかが明確でないことが多いため、これはパフォーマンスの問題に取り組むときに重要です。プログラムのどの部分を最適化するかを推測した場合、エンジニアは多くの時間を費やし、たいした結果が得られないことがよくあります。プロファイラーを使用することで、コードのどの部分を最適化して最大の利益を得ることができるかを正確に見つけることができます。

APM ツールを使用したことがある方にとっては、プロファイリングは、インスツルメンテーションを必要とせずにコードの非常にきめ細かいビューを提供する「より深い」トレーサーのように考えられるかもしれません。

Datadog Continuous Profiler は、CPU 使用率、メモリに割り当てられているオブジェクトの量と種類、ロックの取得を待機する時間、ネットワークまたはファイル I/O の量など、さまざまな種類の「作業」を追跡できます。使用可能なプロファイルタイプは、プロファイリングされる言語によって異なります。

私たちは、簡単に試すことができるパフォーマンスの問題がある[サンプルサービス][1]を用意しました。サンプルサービスには、5000 本の映画の「データベース」を検索できる API があります。これでパフォーマンスの問題を修正します。このガイドではプロセスを説明しますが、独自のシェル、ブラウザー、および IDE を使用して完全なエクスペリエンスを得ることもできます。

## 前提条件

以下が必要です。
1. [docker-compose][2]
2. Datadog アカウントと [API キー][3] (アプリケーションキーは必要ありません)。Datadog アカウントをまだお持ちでない場合は、[無料トライアルにサインアップ][4]してください。

## サンプルを実行する

サンプルサービスを次の方法で起動して実行します。
```
git clone https://github.com/DataDog/dd-continuous-profiler-example.git
cd dd-continuous-profiler-example
echo "DD_API_KEY=YOUR_API_KEY" > docker.env
docker-compose up -d
```

すべてのコンテナが構築されて実行されたら、「ツールボックス」コンテナにジャンプして次のことを調べることができます。
```
docker exec -it dd-continuous-profiler-example_toolbox_1 bash
```

次で API を試すことができます。
```
curl -s http://movies-api-java:8080/movies?q=wars | jq
```

`movies-api-py` と呼ばれるサンプルサービスの Python バージョンもあります。そちらの方が合っている場合は、それに応じてチュートリアル全体でコマンドを調整できます。

## ベンチマークする

ApacheBench ツール [ab][5] を使用してより多くのトラフィックを生成しましょう。20 秒間リクエストを送信する 10 個の同時 HTTP クライアントを実行します。まだツールボックスコンテナ内で:
```
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
...
Reported latencies by ab:
Percentage of the requests served within a certain time (ms)
  50%    464
  66%    503
  75%    533
  80%    553
  90%    614
  95%    683
  98%    767
  99%    795
 100%    867 (longest request)
```

## プロファイルの読み方

[プロファイル検索][6]に進み、トラフィックを生成していた期間をカバーするプロファイルを探します。1 分ほどかかる場合があります。CPU 使用率が高くなるため、どのプロファイルに負荷テストが含まれているかがわかります。

{{< img src="tracing/profiling/intro_to_profiling/list.png" alt="プロファイルのリスト" style="width:80%;">}}

開くと、次のようなプロファイルの視覚化が表示されます。

{{< img src="tracing/profiling/intro_to_profiling/flame_graph.png" alt="フレームグラフ">}}

これはフレームグラフです。これが示す最も重要なことは、各メソッドが使用した CPU の量 (これは CPU プロファイルであるため) と、各メソッドがどのように呼び出されたかです。たとえば、上から 2 番目の行から読み取ると、`Thread.run()` が `QueuedThreadPool$2.run()` を呼び出し (数ある中で)、これが `QueuedThreadPool.runjob(Runnable)` を呼び出し、これが `ReservedTheadExecutor$ReservedThread.run()` を呼び出し、と続いていきます。

フレームグラフの下部にある 1 つの領域を拡大すると、次のように表示されます。

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_parse.png" alt="フレームグラフ parse() フレーム">}}

ツールチップは、この `parse()` 関数内で CPU 時間の約 390ms (0.90%) が費やされたことを示しています。`String.length()` は `parse()` のすぐ下にあります。これは、`parse()` がそれを呼び出すことを意味します。

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_length.png" alt="フレームグラフ String.length() フレーム">}}

`String.length()` にカーソルを合わせると、約 112ms の CPU 時間がかかったことがわかります。したがって、278ms 秒が `parse()` に直接費やされたことがわかります (390ms - 112ms)。これは、その下に何もない `parse()` ボックスの部分によって視覚的に表されます。

フレームグラフは時間の経過を表していないことに注目してください。プロファイルのこのビットを見ると、

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_write.png" alt="write() フレームが隣り合っているフレームグラフセクション">}}

`Gson$1.write()` は `TypeAdapters$16.write()` の前には実行されませんでしたが、その後にも実行されなかった可能性があります。それらは同時に実行されている可能性があります。または、プログラムが一方の呼び出しを複数実行し、次にもう一方の呼び出しを複数実行して、前後に切り替え続けた可能性があります。フレームグラフは、プログラムが同じ一連の関数を実行している間は常にマージされるため、関数が呼び出されるたびに多数の小さなボックスが表示されることなく、コードのどの部分が最も多くの CPU を使用しているかが一目でわかります。

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_replyjson.png" alt="replyJSON() の上にマウスを置いたフレームグラフ">}}

ズームアウトすると、CPU 使用率の約 87% が `replyJSON()` メソッド内にあることがわかります。そして、下を見ると、

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_replyjson_arrows.png" alt="replyJSON() の下のスタックトレースを指す矢印の付いたフレームグラフ">}}

`replyJSON()` とそれが呼び出すメソッドは、最終的に 4 つのメインコードパス (「スタックトレース」) に分岐し、それぞれが並べ替えと日付の解析に関係する関数を実行していることがわかります。

また、次のような CPU プロファイルの一部も表示されます。

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_gc.png" alt="GC (ガベージコレクション) を示すフレームグラフ" style="width:60%;">}}

## プロファイルタイプ

CPU 時間のほぼ 6% をガベージコレクションに費やしたという事実は、私たちが大量のガベージを生成している可能性があることを示唆しています。したがって、割り当てメモリプロファイルタイプに移動します。

{{< img src="tracing/profiling/intro_to_profiling/types.png" alt="プロファイルタイプセレクター" style="width:60%;">}}

割り当てメモリプロファイルでは、ボックスのサイズは、各関数が割り当てられたメモリの量と、関数が割り当てを実行するようになった呼び出しスタックを示します。ここで、この 1 分間のプロファイル中に、`replyJSON()` メソッドとそれが呼び出した他のメソッドが 17.47 GiB を割り当て、上記の CPU プロファイルで見たのと同じ日付解析コードに主に関連していることがわかります。

{{< img src="tracing/profiling/intro_to_profiling/alloc_flame_graph_replyjson_arrows.png" alt="replyJSON() の下のスタックトレースを指す矢印の付いた割り当てプロファイルのフレームグラフ">}}

## 問題の修正

ここでコードを見て、何が起こっているのかを見てみましょう。CPU フレームグラフをもう一度見ると、これらの高価なコードパスが 66 行目の Lambda を通過していることがわかります。Lambda は `LocalDate.parse()` を呼び出します。

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_sort_lambda.png" alt="ソート Lambda 上にマウスを置いたフレームグラフ">}}

これは、[`dd-continuous-profiler-example/java/src/main/java/movies-api/Server.java`][7] のこのコードに対応しており、ここで 66 行目の `LocalDate.parse()` に対する呼び出しを確認します。

{{< img src="tracing/profiling/intro_to_profiling/slow_sort_code.png" alt="遅いソートコード">}}

これは API のソートロジックであり、リリース日の降順で結果を返します。これは、`LocalDate` に変換されたリリース日をソートキーとして使用することによって行われます。これらの `LocalDate` をキャッシュできるので、各映画のリリース日をすべてのリクエストではなく 1 回だけ解析しますが、さらに簡単な修正があります。日付を ISO 8601 形式 (yyyy-mm-dd) で解析していることがわかります。つまり、日付を文字列として並べ替えることができ、まったく解析することはできません。

先に進み、try/catch 全体を次のように `returnm.releaseDate;` に置き換えます。

{{< img src="tracing/profiling/intro_to_profiling/optimized_sort_code.png" alt="最適化されたソートコード">}}

次に、サービスを再構築して再起動します。
```
docker-compose build movies-api-java
docker-compose up -d
```

## 再テスト

結果を確認しましょう。以前と同じように、もう一度トラフィックを生成します。
```
docker exec -it dd-continuous-profiler-example_toolbox_1 bash
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
```

新しい結果は次のようになります。
```
Reported latencies by ab:
Percentage of the requests served within a certain time (ms)
  50%     82
  66%    103
  75%    115
  80%    124
  90%    145
  95%    171
  98%    202
  99%    218
 100%    315 (longest request)
```

p99 は 795ms から 218ms になり、全体として、以前の 4〜6 倍高速になりました。

この新しい負荷テストを含むプロファイルを見つけてCPUプロファイルを見ると、私たちが調べていたフレームグラフの `replyJSON` 部分が CPU 使用率全体のはるかに小さい割合になっていることがわかります。

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_optimized_replyjson.png" alt="最適化された replyJSON() スタックトレースを使用したフレームグラフ">}}

## クリーンアップ

探索が終了したら、次でクリーンアップできます。
```
docker-compose down
```

## お金の節約

このように CPU 使用率を改善すると、簡単にコストを節約できます。これが実際のサービスであった場合、この小さな改善により、サーバーを半分に縮小でき、年間数千ドルを節約できる可能性があります。これがたった 10 分程度の作業で実現できるのです。

## サービスを改善する

ここでは表面をざっと見ただけですが、これで始め方がわかったはずです。**[あなたのサービスで試してみましょう][8]**。

{{< site-region region="us" >}}{{< /site-region >}}
{{< site-region region="eu" >}}{{< /site-region >}}

[1]: https://github.com/DataDog/dd-continuous-profiler-example
[2]: https://docs.docker.com/compose/install/
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://app.datadoghq.com/signup
[5]: https://httpd.apache.org/docs/2.4/programs/ab.html
[6]: https://app.datadoghq.com/profiling?query=env%3Aexample%20service%3Amovies-api-java
[7]: https://github.com/DataDog/dd-continuous-profiler-example/blob/25819b58c46227ce9a3722fa971702fd5589984f/java/src/main/java/movies/Server.java#L66
[8]: /ja/tracing/profiler/getting_started/