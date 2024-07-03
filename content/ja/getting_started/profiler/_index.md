---
aliases:
- /ja/tracing/profiling/intro_to_profiling
- /ja/tracing/profiler/intro_to_profiling
- /ja/tracing/profiler/getting_started
further_reading:
- link: /profiler/
  tag: Documentation
  text: Continuous Profiler
- link: /profiler/enabling/
  tag: Documentation
  text: Enabling the Profiler
- link: https://learn.datadoghq.com/courses/intro-to-apm
  tag: Learning Center
  text: Introduction to Application Performance Monitoring
- link: https://www.datadoghq.com/blog/engineering/how-we-optimized-our-akka-application-using-datadogs-continuous-profiler/
  tag: Blog
  text: How we optimized our Akka application using Datadog's Continuous Profiler
- link: https://www.datadoghq.com/blog/request-latency-profiling/
  tag: Blog
  text: Understanding Request Latency with Profiling
title: Getting Started with the Continuous Profiler
---

プロファイリングはサービスをより速く、より安く、より信頼性の高いものにするために役立ちますが、プロファイラーを使ったことがない人には少し分かりにくいかもしれません。

このガイドでは、プロファイリングについて説明するとともに、パフォーマンスに問題のあるサンプルサービスを例として、Datadog Continuous Profiler を使用して問題を理解・修正する方法をご紹介します。

## 概要

プロファイラーは、実行中のプログラムに関するデータを収集することで、各関数がどれだけ「仕事」をしているかを示します。たとえば、インフラストラクチャーのモニタリングでアプリサーバーが CPU を 80% 使用していることが確認できても、その理由が分からない場合だってあるでしょう。プロファイリングにより、このような作業の内訳を把握することができます。

| 関数      | CPU の使用率 |
|---------------|-----------|
| `doSomeWork`  | 48%       |
| `renderGraph` | 19%       |
| その他         | 13%       |

パフォーマンスの問題に取り組む際には、この情報が重要になります。というのも、多くのプログラムは複数の場所で実行されており、それが明らかでない場合があるからです。プログラムのどの部分を最適化すべきかを推測している段階では、エンジニアは多くの時間を費やしてもほとんど成果を得ることができません。このような場合、プロファイラーを使えばコードのどの部分を最適化すべきかを正確に見つけることができます。

APM ツールを使用したことがある方にとっては、プロファイリングは、インスツルメンテーションを必要とせずにコードのきめ細かいビューを提供する「より深い」トレーサーのように考えられるかもしれません。

Datadog Continuous Profiler は、CPU 使用率、メモリに割り当てられているオブジェクトの量と種類、ロックの取得を待機する時間、ネットワークまたはファイル I/O の量など、さまざまな種類の「作業」を追跡できます。使用可能なプロファイルタイプは、プロファイリングされる言語によって異なります。

## セットアップ

### 前提条件

はじめに、以下の前提条件を確認してください。

1. [docker-compose][1]
2. Datadog のアカウントと [API キー][2]が必要です。Datadog アカウントをお持ちでない場合は、[無料トライアルにサインアップ][3]してください。

### インストール

[dd-continuous-profiler-example][4] リポジトリでは、パフォーマンスに問題のあるサービスの例を実験用に提供しています。5000 本の映画の「データベース」を検索するための API も含まれています。

サンプルサービスをインストールして実行します。

```shell
git clone https://github.com/DataDog/dd-continuous-profiler-example.git
cd dd-continuous-profiler-example
echo "DD_API_KEY=YOUR_API_KEY" > docker.env
docker-compose up -d
```

### 検証

コンテナが構築・実行されると、「toolbox」コンテナを使用して次のことを調べることができます。

```
docker exec -it dd-continuous-profiler-example-toolbox-1 bash
```

API を以下と共に使用します。
```
curl -s http://movies-api-java:8080/movies?q=wars | jq
```

また、`movies-api-py` と呼ばれるサンプルサービスの Python バージョンもあります。利用する場合は、それに応じてチュートリアル全体でコマンドを調整してください。

### データの生成

ApacheBench ツール [ab][5] を使ってトラフィックを生成します。10 台の同時 HTTP クライアントが 20 秒間リクエストを送信することを想定して実行します。toolbox コンテナの中で次を実行してください。

```shell
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
```

結果出力例:

```text
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

## 調査

### プロファイルの読み取り

[プロファイル検索][6]を使用して、トラフィックを生成していた期間をカバーするプロファイルを探します。読み込みに 1 分ほどかかる場合があります。負荷テストを含むプロファイルは、CPU 使用率が高くなります。

{{< img src="profiler/intro_to_profiling/list.png" alt="プロファイルのリスト" style="width:80%;">}}

開くと、次のように視覚化されたプロファイルが表示されます。

{{< img src="profiler/intro_to_profiling/flame_graph.png" alt="フレームグラフ">}}

これはフレームグラフです。これが示す最も重要なことは、各メソッドが使用した CPU の量 (これは CPU プロファイルであるため) と、各メソッドがどのように呼び出されたかです。たとえば、上から 2 番目の行から読み取ると、`Thread.run()` が `QueuedThreadPool$2.run()` を呼び出し (数ある中で)、これが `QueuedThreadPool.runjob(Runnable)` を呼び出し、これが `ReservedTheadExecutor$ReservedThread.run()` を呼び出し、と続いていきます。

フレームグラフの下の部分にズームインするとツールチップが表示され、この `parse()` 関数に約 309ms (0.90%) の CPU 時間が費やされていることがわかります。

{{< img src="profiler/intro_to_profiling/flame_graph_parse.png" alt="フレームグラフ parse() フレーム">}}

`String.length()` が `parse()` 関数の直下にあるのは、その `parse()` 関数を呼び出していることを意味します。`String.length()` にカーソルを合わせると、約 112ms の CPU 時間を要したことがわかります。

{{< img src="profiler/intro_to_profiling/flame_graph_length.png" alt="フレームグラフ String.length() フレーム">}}

つまり、309ms - 112ms で 197 ミリ秒が `parse()` に直接費やされたことになります。それを視覚的に表しているのが、`parse()` ボックス下の何も表示されていない部分です。

フレームグラフは時間の経過を表しているわけでは_ない_ことを覚えておきましょう。プロファイルのこの部分を見ると、`Gson$1.write()` は `TypeAdapters$16.write()` より前には実行されず、その後も同様に実行されなかったことが分かります

{{< img src="profiler/intro_to_profiling/flame_graph_write.png" alt="write() フレームが隣り合っているフレームグラフセクション">}}

 それらは同時に実行されているか、プログラムが一方の呼び出しを複数実行し、次にもう一方の呼び出しを複数実行して、前後に切り替え続けた可能性があります。フレームグラフはプログラムが同じ一連の関数を実行している間は常にマージされるため、関数が呼び出されるたびに多数の小さなボックスが表示されることなく、コードのどの部分が最も多くの CPU を使用しているかが一目でわかります。

拡大してみると、CPU 使用率の約 87% がこの `replyJSON()` メソッド内で発生していることがわかります。その下のグラフでは、`replyJSON()` と呼び出したメソッドが最終的に 4 つの主要なコードパス (「スタックトレース」) に分岐し、ソートや日付のパースに関連する関数を実行していることがわかります。

{{< img src="profiler/intro_to_profiling/flame_graph_replyjson_arrows.png" alt="replyJSON() の下のスタックトレースを指す矢印の付いたフレームグラフ">}}

また、次のような CPU プロファイルの一部も表示されます。

{{< img src="profiler/intro_to_profiling/flame_graph_gc.png" alt="GC (ガベージコレクション) を示すフレームグラフ" style="width:80%;">}}

### プロファイルタイプ

CPU 時間の約 6％ がガベージコレクションに費やされており、大量のガベージを生成している可能性があります。そこで、**Allocated Memory** プロファイルタイプをレビューします。

{{< img src="profiler/intro_to_profiling/types.png" alt="プロファイルタイプセレクター" style="width:60%;">}}

Allocated Memory プロファイルのボックスのサイズは、各関数が割り当てられたメモリの量と、関数が割り当てを実行するようになった呼び出しスタックを示します。ここで、この 1 分間のプロファイル中に、`replyJSON()` メソッドとそれが呼び出した他のメソッドが 17.47 GiB を割り当て、上記の CPU プロファイルで見たのと同じ日付解析コードに主に関連していることがわかります。

{{< img src="profiler/intro_to_profiling/alloc_flame_graph_replyjson_arrows.png" alt="replyJSON() の下のスタックトレースを指す矢印の付いた割り当てプロファイルのフレームグラフ">}}

## 修復

### コードの修正

コードを見直して、何が起こっているのかを確認します。CPU フレームグラフを見ると、高価なコードパスが 66 行目で Lambda を通過し、そのLambda が `LocalDate.parse()` を呼び出していることがわかります。

{{< img src="profiler/intro_to_profiling/flame_graph_sort_lambda.png" alt="ソート Lambda 上にマウスを置いたフレームグラフ">}}

これは [`dd-continuous-profiler-example`][7] で、`LocalDate.parse()` を呼び出す部分のコードに対応しています。

```java
private static Stream<Movie> sortByDescReleaseDate(Stream<Movie> movies) {
  return movies.sorted(Comparator.comparing((Movie m) -> {
    // 問題: ソートされる各アイテムの datetime 解析。
    // サンプルソリューション:
    //   日付はすでに ISO 形式 (yyyy-mm-dd) になっているため、通常の文字列ソートでうまく並び替えることができます。
    //   `return m.releaseDate`
    try {
      return LocalDate.parse(m.releaseDate);
    } catch (Exception e) {
      return LocalDate.MIN;
    }
  }).reversed());
}
```

これはAPI のソートロジックであり、リリース日の降順で結果を返します。ここではソートキーとして、リリース日を `LocalDate` に変換したものを使用しています。時間を節約するために、リクエストごとにパースするのではなく、映画の公開日ごとにパースするよう `LocalDate` をキャッシュすることもできますが、もっと良い方法があります。日付は ISO 8601 形式　(yyyy-mm-dd) でパースされているため、パースする代わりに文字列として並び替えることができます。

次のように、`try` と `catch` を `return m.releaseDate;` で置き換えます。

```java
private static Stream<Movie> sortByDescReleaseDate(Stream<Movie> movies) {
  return movies.sorted(Comparator.comparing((Movie m) -> {
    return m.releaseDate;
  }).reversed());
}
```

次に、サービスを再構築して再起動します。
```
docker-compose build movies-api-java
docker-compose up -d
```

### 再テスト

結果をテストし、トラフィックを再度生成します。

```shell
docker exec -it dd-continuous-profiler-example-toolbox-1 bash
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
```

結果出力例:

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

新しい負荷テストを含む[プロファイル](#read-the-profile)を探し、CPU プロファイルを確認します。フレームグラフの `replyJSON` の部分は、前回の負荷テストに比べて CPU の総使用量に占める割合がかなり小さくなっています。

{{< img src="profiler/intro_to_profiling/flame_graph_optimized_replyjson.png" alt="最適化された replyJSON() スタックトレースを使用したフレームグラフ">}}

### クリーンアップ

確認が終了したら、次を実行してクリーンアップします。

```shell
docker-compose down
```

## 推奨事項

### コストの節約

このように、CPU 使用率を改善してコストを節約することができます。これが実際のサービスであった場合、この小さな改善により、サーバーを半分に縮小でき、年間数千ドルを節約できる可能性があります。これがたった 10 分程度の作業で実現できるのです。

### サービスを改善する

このガイドでは、プロファイリングの概要をほんの少しだけ紹介しましたが、どのように始めればいいのかを理解していただけたかと思います。**[お使いのサービスで、早速プロファイラーを有効にしてみましょう][8]**。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.docker.com/compose/install/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/signup
[4]: https://github.com/DataDog/dd-continuous-profiler-example
[5]: https://httpd.apache.org/docs/2.4/programs/ab.html
[6]: https://app.datadoghq.com/profiling?query=env%3Aexample%20service%3Amovies-api-java
[7]: https://github.com/DataDog/dd-continuous-profiler-example/blob/25819b58c46227ce9a3722fa971702fd5589984f/java/src/main/java/movies/Server.java#L66
[8]: /ja/profiler/enabling/