---
aliases:
- /ja/tracing/profiling/search_profiles/
- /ja/tracing/profiler/search_profiles/
- /ja/profiler/search_profiles/
further_reading:
- link: profiler/enabling
  tag: ドキュメント
  text: アプリケーションの継続的なプロファイラー有効化
- link: getting_started/profiler
  tag: ドキュメント
  text: プロファイラーの概要
- link: https://learn.datadoghq.com/courses/continuous-profiler-course
  tag: ラーニングセンター
  text: Continuous Profiler でコードのパフォーマンス問題を診断する
- link: https://learn.datadoghq.com/courses/profiling-timeline
  tag: ラーニングセンター
  text: プロファイリングタイムラインでリクエストのレイテンシーを最適化する
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: ブログ
  text: Datadog に常時接続型の本番環境プロファイリングが登場
- link: https://www.datadoghq.com/blog/continuous-profiler-timeline-view/
  tag: ブログ
  text: Continuous Profiler のタイムラインビューを使用して、ランタイムとコードの非効率性を診断する
- link: https://www.datadoghq.com/blog/profiling-visualizations/
  tag: ブログ
  text: 利用可能なプロファイリングの可視化
title: プロファイルの視覚化
---
## プロファイルの検索 {#search-profiles}

{{< img src="profiler/search_profiles4.mp4" alt="タグを使用してプロファイルを検索" video=true >}}

[{{< ui >}}APM{{< /ui >}}] > [{{< ui >}}Profiles{{< /ui >}}] (プロファイル) に移動し、サービスを選択してそのプロファイルを表示します。

[環境トレース構成][1]から設定されたインフラストラクチャータグまたはアプリケーションタグに従ってフィルタリングできます。デフォルトでは、次のファセットを使用できます。

| ファセット   | 定義                                                                |
| ------- | ------------------------------------------------------------------------- |
| 環境     | アプリケーションが実行されている環境 (`production`、`staging`)。|
| サービス | コードが実行している[サービス][2]の名前。                       |
| バージョン | コードのバージョン。                                                |
| ホスト    | プロファイルされたプロセスが実行されているホスト名。                        |
| ランタイム | プロファイルされたプロセスが実行しているランタイムのタイプ (`JVM`、`CPython`)。  |

## 可視化 {#visualizations}

### フレームグラフ {#flame-graph}

フレームグラフは、Continuous Profiler のデフォルトの可視化です。下のフレームグラフは、各メソッドが使用した CPU の量と、各メソッドがどのように呼び出されたかを示しています。言語に応じて、ほかの[プロファイルタイプ][4]も利用できます。

{{< img src="profiler/profiling_viz-flamegraph2.png" alt="フレームグラフ" >}}

たとえば、前の画像の最初の行から見てみると、`Thread.run()` が `Thread.runWith(Object, Runnable)` を呼び出し、それが `ThreadPoolExecutor$Worker.run()` を呼び出す、というように続きます。

フレームの幅は、合計 CPU のうち、そのフレームで消費された量を表します。右側には、自己時間のみを考慮した [{{< ui >}}CPU time by Method{{< /ui >}}] (メソッド別の CPU 時間) トップリストが表示されます。自己時間とは、メソッドがほかのメソッドを呼び出さずに CPU 上で費やした時間のことです。

デフォルトでは、フレームの色が濃いほど CPU 使用率が高く、色が薄いほど使用率が低いことを示します。最もリソースを消費するメソッドは、フレームグラフの左端にまとめて表示されます。

フレームグラフは、[プロファイリングフレームグラフウィジェット][5]を使用して、ダッシュボードやノートブックに含めることができます。ノートブックにエクスポートされたプロファイリングデータは、1 年間保持されます。

### タイムラインビュー {#timeline-view}

タイムラインビューはフレームグラフと同等で、[単一プロファイルの期間](#single-profile)、[プロファイリングエクスプローラー][7]内の単一プロセス、および[トレース][6]における時間ベースのパターンと作業の分布を示します。

フレームグラフに比べ、タイムラインビューは以下のことに役に立ちます。

- スパイクのあるメソッドを分離する
- スレッド間の複雑な相互作用を明らかにする
- プロセスに影響を与えたランタイムアクティビティを特定する

{{< img src="profiler/profiling_viz-timeline3.png" alt="タイムライン" >}}

タイムラインビューにアクセスするには:

1. [[{{< ui >}}APM{{< /ui >}}] > [{{< ui >}}Profiles{{< /ui >}}] (プロファイル) > [{{< ui >}}Explorer{{< /ui >}}] (エクスプローラー)][7] の順に移動します。
2. [{{< ui >}}Visualize as{{< /ui >}}] (次として可視化) オプションを [{{< ui >}}Thread Timeline{{< /ui >}}] (スレッドタイムライン) に設定します。

ランタイムや言語によって、タイムラインレーンは異なります。

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php,full_host" >}}
{{< programming-lang lang="java" >}}
各レーンは**スレッド**を表します。共通プールからのスレッドはグループ化されます。プールを展開して、各スレッドの詳細を表示できます。

上のレーンは、パフォーマンスに影響を与える可能性のあるランタイムアクティビティです。

タイムラインを使って p95 リクエストの遅延やタイムアウトをデバッグする方法については、ブログ記事「[プロファイリングによるリクエストレイテンシーの理解][1]」を参照してください。

[1]: https://www.datadoghq.com/blog/request-latency-profiling/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
Python でこの機能を有効にする方法については、[前提条件][1]を参照してください。

各レーンは**スレッド**を表します。共通プールからのスレッドはグループ化されます。プールを展開して、各スレッドの詳細を表示できます。

[1]: /ja/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
Go でこの機能を有効にする方法については、[前提条件][1]を参照してください。

各レーンは **goroutine** を表します。同じ `go` ステートメントによって作成された goroutine はグループ化されます。グループを展開して、各 goroutine の詳細を表示できます。

上のレーンは、パフォーマンスに影響を与える可能性のあるランタイムアクティビティです。

タイムラインを使って p95 リクエストの遅延やタイムアウトをデバッグする方法については、ブログ記事「[Datadog のプロファイリングタイムラインによるGoリクエストレイテンシーのデバッグ][2]」を参照してください。

[1]: /ja/profiler/connect_traces_and_profiles/#prerequisites
[2]: https://blog.felixge.de/debug-go-request-latency-with-datadogs-profiling-timeline/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
Ruby でこの機能を有効にする方法については、[前提条件][1] を参照してください。

各レーンは**スレッド**を表します。共通プールからのスレッドはグループ化されます。プールを展開して、各スレッドの詳細を表示できます。

スレッド ID は `native-thread-id (ruby-object-id)` として表示されます。ネイティブスレッド ID は `Thread#native_thread_id` (利用可能な場合)、Ruby オブジェクト ID は `Thread#object_id` です。

**注**: Ruby VM またはオペレーティングシステムがネイティブスレッド ID を再利用する場合があります。

[1]: /ja/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}
Node.js でこの機能を有効にする方法については、[前提条件][1]を参照してください。

JavaScript の**スレッド**には 1 つのレーンがあります。

DNS リクエストや TCP 接続操作で構成される、さまざまな種類の**非同期アクティビティ**を可視化するレーンが存在することもあります。レーンの数は、
これらのアクティビティの最大同時実行数と一致するため、重複することなく可視化できます。

上のレーンは、リクエストのレイテンシーを増加させる可能性があるガベージコレクターの**ランタイムアクティビティ**です。

[1]: /ja/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
各レーンは**スレッド**を表します。同じ名前のスレッドはグループ化されます。グループを展開して、各スレッドの詳細を表示することができます。コードによって明示的に作成されたスレッドは、_マネージドスレッド_の下にグループ化されることに注意してください。

上のレーンは、GC アクティビティなど、パフォーマンスに影響を与える可能性のあるランタイムアクティビティです。

スレッド ID は `<unique-id> [#OS-thread-id]` と表示されます。

**注**: オペレーティングシステムがスレッド ID を再利用する場合があります。

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
PHP でこの機能を有効にする方法については、[前提条件][1]を参照してください。

各 PHP **スレッド**に 1 つのレーンがあります (PHP NTS では、プロセスごとにスレッドが 1 つしかないため、レーンは 1 つのみです)。
この**スレッド**で実行されるファイバーは、同じレーンに表示されます。

上のレーンは、ファイルのコンパイルやガベージコレクションが原因でリクエストのレイテンシーを増加させる可能性のあるランタイムアクティビティです。

[1]: /ja/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}

{{< programming-lang lang="full_host" >}}
タイムラインビューは現在、完全なホストプロファイリングではサポートされていません。
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 時系列とテーブル {#timeseries-and-table}

各ランタイムには、幅広いメトリクスセットが用意されており、[時系列ごとに示されています][3]。

### コールグラフ {#call-graph}

コールグラフは、フレームグラフで使用されるものと同じプロファイリングデータを使用しますが、各メソッドを単一のノードとして一度だけ表示し、どのメソッドが相互に呼び出されたかを示すためにエッジを使用します。

エッジの太さはほかのメソッドの呼び出しに費やされた時間を示し、色とサイズは自己時間を示します。

{{< img src="profiler/profiling_viz-callgraph.png" alt="コールグラフ" >}}

### 単一のプロファイル {#single-profile}

デフォルトでは、プロファイルは 1 分ごとにアップロードされます。言語に応じて、これらのプロセスは 15 秒～ 60 秒の間でプロファイリングされます。

特定のプロファイルを表示するには、[{{< ui >}}Visualize as{{< /ui >}}] オプションを [{{< ui >}}Profile List{{< /ui >}}] (プロファイルリスト) に設定し、リスト内の項目をクリックします。

{{< img src="profiler/profiling_single-profile2.png" alt="単一のプロファイルを選択" >}}

ヘッダーには、プロファイルを生成したサービスや、それに関連付けられた環境とコードバージョンなど、プロファイルに関連する情報が含まれています。

4 つのタブがプロファイルヘッダーの下にあります。

| タブ                    | 定義                                                                                                                                         |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| プロファイル               | 表示しているプロファイルのフレームグラフとサマリーテーブル。プロファイルタイプ (例: `CPU`、`Memory allocation`) を切り替えることができます。|
| インサイト               | コードの潜在的な問題または改善の領域を示唆する一連のヒューリスティック。                                                           |
| メトリクス                | 同じサービスのすべてのプロファイルからのプロファイラーメトリクス。                                                                                    |
| ランタイム情報      | サポートされている言語のランタイムプロパティとプロファイルタグ。                                                                                      |
| 関連プロセス | プロファイルに関連するプロセス。                                                                                                                 |

**注**: 各プロファイルの右上隅には、次のオプションがあります。

- このプロファイルをほかのプロファイルと比較
- リポジトリのコミットを表示
- 同じプロセスと時間枠のトレースを表示
- プロファイルをダウンロード
- プロファイルを全画面で開く

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/send_traces/#configure-your-environment
[2]: /ja/tracing/glossary/#services
[3]: https://app.datadoghq.com/profiling/explorer?viz=timeseries
[4]: /ja/profiler/profile_types/
[5]: /ja/dashboards/widgets/profiling_flame_graph
[6]: /ja/profiler/connect_traces_and_profiles/#span-execution-timeline-view
[7]: https://app.datadoghq.com/profiling/explorer?viz=thread_timeline