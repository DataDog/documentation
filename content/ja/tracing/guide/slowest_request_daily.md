---
title: ウェブサービスの最も遅いエンドポイントで最も遅いトレースをデバッグする
kind: ガイド
further_reading:
  - link: /tracing/guide/alert_anomalies_p99_database/
    tag: 3 分
    text: データベースサービスの異常な p99 レイテンシーに関するアラート
  - link: /tracing/guide/week_over_week_p50_comparison/
    tag: 2 分
    text: サービスのレイテンシーを前週と比較する
  - link: /tracing/guide/apm_dashboard/
    tag: 4 分
    text: ダッシュボードを作成して、APM メトリクスを追跡、関連付ける
  - link: /tracing/guide/add_span_md_and_graph_it/
    tag: 7 分
    text: スパンタグを追加し、アプリケーションのパフォーマンスをフィルタリングし、グループ化する
  - link: /tracing/guide/
    tag: ''
    text: すべてのガイド
---
_所要時間 3 分_

{{< img src="tracing/guide/slowest_request_daily/slowest_trace_1.mp4" video="true" alt="最も遅いトレースを特定し、そのホストメトリクスを解明する"  style="width:90%;">}}

Datadog APM を使用すると、エンドポイントのパフォーマンスを調査して遅いリクエストを特定し、レイテンシー問題の根本原因を調査できます。上記の例では、E コマースチェックポイントのエンドポイントについて、1 日のうちで最も遅い[トレース][1]と、CPU 使用率が高いためにそのトレースが遅くなっている様子を示しています。

1. **[Services ページ][2]を開きます**。

    このページには、 Datadog  APM で利用可能なインスツルメント済みの全[サービス][3]の一覧が表示されます。キーワードによる検索、`env-tag` によるフィルター設定、タイムラインの設定が可能です。

2. **関連性があるアクティブなウェブサービスを検索し、そのサービス詳細画面を開きます**。

   ここでは、テクノロジースタックのプライマリサーバーであり、サードパーティのサービスへのコールのほとんどを制御しているウェブストアサービスを例として使用しています。

    {{< img src="tracing/guide/slowest_request_daily/slowest_trace_2.png" alt="最も遅いトレースを特定し、その原因となっているボトルネックを解明する"  style="width:90%;">}}

    スループット、レイテンシー、エラー率に関する情報のほか、サービス詳細画面では、サービスで特定されたリソース (API エンドポイント、SQL クエリ、ウェブリクエストなどの主なオペレーション) の一覧も確認できます。

3. **リソース表を p99 レイテンシーで並べ替え**、最も遅いリソースをクリックして開きます。
    **注**: p99 レイテンシーの列が表示されていない場合は、歯車アイコン `Change Columns` をクリックして `p99` に切り替えます。

    [Resource][4] ページには、スループット、レイテンシー、エラー率、リソースからの各ダウンストリームサービスにかかった時間の内訳など、このリソースに関する上位のメトリクスが表示されます。また、リソースをパススルーする特定の[トレース][1]や、このトレースを構成する[スパン][5]の集計ビューも確認できます。

     {{< img src="tracing/guide/slowest_request_daily/slowest_trace_3.png" alt="最も遅いトレースを特定し、その原因となっているボトルネックを解明する" style="width:90%;">}}

4. 時間フィルターを `1d One Day` に設定します。トレース表までスクロールダウンし、**期間で並べ替え**、表の一番上のトレースにマウスを合わせ **View Trace をクリックします**。

    これはフレームグラフと関連情報です。トレースの各ステップの時間と、エラーの有無を確認でき、遅いコンポーネントやエラーを起こしやすいコンポーネントを特定するのに便利です。フレームグラフでは、拡大、スクロール、調査が可能です。フレームグラフの下には、関連するメタデータ、ログ、ホストの情報が表示されます。

    フレームグラフは、エラーが発生しているスタックや、遅いスタックを正確に特定するのに最適です。エラーは赤くハイライト表示され、時間は横向きスパンで表されます。つまり、長いスパンが最も遅いスタックということになります。フレームグラフの活用については、[トレースビューガイド][6]を参照してください。

    また、フレームグラフの下には、すべてのタグ ([カスタムタグ][7]を含む) が表示されます。ここから、関連するログ ([ログをトレースに接続][8]してある場合) を確認したり、CPU の使用率やメモリの使用量など、ホストレベルの情報を確認したりできます。

    {{< img src="tracing/guide/slowest_request_daily/slowest_trace_4.png" alt="最も遅いトレースを特定し、その原因となっているボトルネックを解明する" style="width:90%;">}}

5. **Host タブをクリックして開き**、リクエストがヒットしていた間の下層のホストの CPU とメモリのパフォーマンスを調査します。
6. **Open Host Dashboard をクリックして**、ホストに関するすべての関連データを表示します。

Datadog APM では、インフラストラクチャーメトリクスやログなど、他の Datadog のメトリクスや情報がシームレスに統合されています。フレームグラフを使用すればこのような情報や、トレースと一緒に送信しているあらゆる[カスタムメタデータ][7]を利用できます。

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/#trace
[2]: https://app.datadoghq.com/apm/services
[3]: /ja/tracing/visualization/#services
[4]: /ja/tracing/visualization/#resources
[5]: /ja/tracing/visualization/#spans
[6]: /ja/tracing/visualization/trace/?tab=spanmetadata
[7]: /ja/tracing/guide/adding_metadata_to_spans/
[8]: /ja/tracing/connect_logs_and_traces/