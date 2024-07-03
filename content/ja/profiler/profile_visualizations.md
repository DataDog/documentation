---
aliases:
- /ja/tracing/profiling/search_profiles/
- /ja/tracing/profiler/search_profiles/
- /ja/profiler/search_profiles/
further_reading:
- link: profiler/enabling
  tag: Documentation
  text: Enable continuous profiler for your application
- link: getting_started/profiler
  tag: Documentation
  text: Getting Started with Profiler
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: ブログ
  text: Introducing always-on production profiling in Datadog
- link: https://www.datadoghq.com/blog/continuous-profiler-timeline-view/
  tag: ブログ
  text: Diagnose runtime and code inefficiencies using Continuous Profiler's timeline
    view
title: Profile Visualizations
---

## プロファイルの検索

{{< img src="profiler/search_profiles3.mp4" alt="Search profiles by tags" video=true >}}

プロファイルを表示するには、**APM -> Profiles** に進み、サービスを選択します。さまざまなリソース (CPU、メモリ、例外、I/O など) を表示するには、プロファイルタイプを選択します。

[環境トレース構成][1]から設定されたインフラストラクチャータグまたはアプリケーションタグに従ってフィルタリングできます。デフォルトでは、次のファセットを使用できます。

| ファセット   | 定義                                                                |
| ------- | ------------------------------------------------------------------------- |
| Env     | アプリケーションが実行されている環境（`production`、`staging`）。 |
| サービス | コードが実行している[サービス][2]の名前。                        |
| バージョン | コードのバージョン。                                                 |
| ホスト    | プロファイルされたプロセスが実行しているホスト名。                         |
| ランタイム | プロファイルされたプロセスが実行しているランタイムのタイプ（`JVM`、`CPython`）。   |

次のメジャーを使用できます。

| メジャー                | 定義                                                                                                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU                    | CPU 使用量 (コア単位)                                                                                                                                                            |
| メモリ割り当て | プロファイル全体でのメモリ割り当て率。割り当てられたメモリはプロファイル中にガベージコレクションされる可能性があるため、この値はシステムのメモリ量を超える可能性があります。 |
| ウォールタイム              | コードが使用した経過時間。経過時間には、コードが CPU で実行されている時間、I/O を待機している時間、およびコードの実行中に発生するその他の時間が含まれます。  |

各ランタイムには、より広範なメトリクスセットも用意されており、[時系列ごとにリストアップ][3]されています。

## プロファイルタイプ

**Profiles** タブでは、特定の言語で使用できるすべてのプロファイルタイプを確認できます。言語によって、プロファイルについて収集される情報は異なります。各言語で利用可能なプロファイルタイプの一覧については、[プロファイルタイプ][4]を参照してください。

## 視覚化

### フレームグラフ

フレームグラフは Continuous Profiler のデフォルトの視覚化です。これは、各メソッドがどれだけの CPU を使用したか (これは CPU プロファイルであるため)と、各メソッドがどのように呼び出されたかを示しています。

{{< img src="profiler/profiling_viz-flamegraph.png" alt="フレームグラフ" >}}

例えば、前のイメージの 1 行目から、`Thread.run()` は `ThreadPoolExecutor$Worker.run()` を呼び出し、これが `ThreadPoolExecutor.runWorker(ThreadPoolExecutor$Worker)` を呼び出す、といった具合です。

フレームの幅は、そのフレームが全 CPU のうちどれだけ消費したかを表します。右側には、**CPU time by Method** のトップリストがあり、セルフタイム (他のメソッドを呼び出さずにメソッドが CPU に費やした時間) のみを考慮しています。

Flame graphs can be be included in Dashboards and Notebooks with the [Profiling Flame Graph Widget][5].

### 単一のプロファイル

デフォルトでは、プロファイルは 1 分に 1 回アップロードされます。言語に応じて、これらのプロセスは 15 秒から 60 秒の間でプロファイルされます。

特定のプロファイルを表示するには、**Visualize as** オプションを **Profile List** に設定し、リスト内の項目をクリックします。

{{< img src="profiler/profiling_single-profile.png" alt="Select a single profile" >}}

ヘッダーには、プロファイルを生成したサービスや、それに関連付けられた環境とコードバージョンなど、プロファイルに関連付けられた情報が含まれています。

4 つのタブがプロファイルヘッダーの下にあります。

| タブ               | 定義                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| プロファイル          | 現在見ているプロファイルのフレームグラフとサマリーテーブル。プロファイルタイプ（例えば、`CPU`、`Memory allocation`）を切り替えることができます |
| Analysis          | コードの潜在的な問題または改善の領域を示唆する一連のヒューリスティック。Java でのみ利用できます。            |
| メトリクス           | 同じサービスのすべてのプロファイルからのプロファイラーメトリクス                                                                        |
| ランタイム情報 | サポートされている言語のランタイムプロパティとプロファイルタグ。                                                                          |

**注**: 各プロファイルの右上隅には、次のオプションがあります。

- このプロファイルを他と比較
- リポジトリのコミットを表示
- View traces for the same process and time frame
- プロフィールをダウンロードする
- プロファイルを全画面で開く

### タイムラインビュー

The timeline view is equivalent to the flame graph, with time-based patterns and work distribution over [the period of a single profile](#single-profile), a single process in [profiling explorer][7] and [a trace][6].

フレームグラフに比べ、タイムラインビューは以下のことに役に立ちます。

- スパイクのあるメソッドを分離 する
- スレッド間の複雑な相互作用を整理する
- プロセスに影響を与えたランタイムアクティビティを表面化する

{{< img src="profiler/profiling_viz-timeline3.png" alt="A timeline" >}}

To access the timeline view:

1. Go to [**APM** > **Profiles** > **Explorer**][7].
2. Set the **Visualize as** option to **Thread Timeline**.

ランタイムや言語によって、タイムラインレーンは異なります。

{{< programming-lang-wrapper langs="java,go,ruby,nodejs,dotnet,php" >}}
{{< programming-lang lang="java" >}}
各レーンは**スレッド**を表しています。共通のプールからのスレッドはまとめてグループ化されています。プールを展開することで、各スレッドの詳細を確認できます。

上のレーンは、パフォーマンスに影響を与える可能性のあるランタイムアクティビティです。

For additional information about debugging slow p95 requests or timeouts using the timeline, see the blog post [Understanding Request Latency with Profiling][1].

[1]: https://www.datadoghq.com/blog/request-latency-profiling/
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
See [prerequisites][1] to learn how to enable this feature for Go.

各レーンは ** goroutine** を表します。同じ `go` ステートメントで作成された goroutine はグループ化されています。グループを展開すると各 goroutine の詳細を見ることができます。

上のレーンは、パフォーマンスに影響を与える可能性のあるランタイムアクティビティです。

タイムラインを使って p95 リクエストの遅延やタイムアウトをデバッグする方法については、ブログ記事 [Datadog のプロファイリングタイムラインによる Go リクエストレイテンシーのデバッグ][2]を参照してください。

[1]: /ja/profiler/connect_traces_and_profiles/#prerequisites
[2]: https://blog.felixge.de/debug-go-request-latency-with-datadogs-profiling-timeline/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
See [prerequisites][1] to learn how to enable this feature for Ruby.

Each lane represents a **thread**. Threads from a common pool are grouped together. You can expand the pool to view details for each thread.

The thread ID is shown as `native-thread-id (ruby-object-id)` where the native thread ID is `Thread#native_thread_id` (when available) and the Ruby object ID is `Thread#object_id`.

**Note**: The Ruby VM or your operating system might reuse native thread IDs.

[1]: /ja/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}
See [prerequisites][1] to learn how to enable this feature for Node.js.

JavaScript の**スレッド**には 1 つのレーンがあります。

There can also be lanes visualizing various kinds of **asynchronous activity** consisting of DNS requests and TCP connect operations. The number of lanes matches
the maximum concurrency of these activities so they can be visualized without overlaps.

Lanes on the top are garbage collector **runtime activities** that may add extra latency to your request.

[1]: /ja/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
各レーンは**スレッド**を表します。共通のプールからのスレッドは一緒にグループ化されます。プールを展開すると、各スレッドの詳細を表示できます。

上のレーンは、パフォーマンスに影響を与える可能性のあるランタイムアクティビティです。

The thread ID is shown as `<unique-id> [#OS-thread-id]`.

**Note**: Your operating system might reuse thread IDs.

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
See [prerequisites][1] to learn how to enable this feature for PHP.

There is one lane for each PHP **thread** (in PHP NTS, this is only one lane as there is only one thread per process).
Fibers that run in this **thread** are represented in the same lane.

Lanes on the top are runtime activities that may add extra latency to your request, due to file compilation and garbage collection.

[1]: /ja/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/send_traces/#configure-your-environment
[2]: /ja/tracing/glossary/#services
[3]: https://app.datadoghq.com/profiling/search?viz=timeseries
[4]: /ja/profiler/profile_types/
[5]: /ja/dashboards/widgets/profiling_flame_graph
[6]: /ja/profiler/connect_traces_and_profiles/#span-execution-timeline-view
[7]: https://app.datadoghq.com/profiling/explorer?viz=thread_timeline