---
title: Top List Widget
widget_type: "toplist"
aliases:
    - /graphing/widgets/top_list/
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
- link: /notebooks/
  tag: Documentation
  text: Notebooks
- link: "/dashboards/guide/context-links/#overview/"
  tag: Documentation
  text: Context Links
---

トップリストの視覚化を使用すると、CPU の消費量が最も多い対象、ディスク容量が最も少ないホスト、コストが最も高いクラウド製品など、メトリクスまたはイベントの値が最も多いまたは最も少ないタグ値のリストを表示できます。

## セットアップ

{{< img src="dashboards/widgets/toplist/top_list_graph_display.png" alt="Stacked、Relative display mode、Visual Formatting Rules をハイライトしているグラフ表示の構成オプション" style="width:100%;" >}}

### 構成

1. グラフ化するデータを選択します。
    * メトリクス: メトリクスのクエリを構成するには、[クエリ作成][1]のドキュメントを参照してください。
    * メトリクス以外のデータソース: イベントクエリを構成するには、[トレース検索ドキュメント][2]または[ログ検索ドキュメント][3]を参照してください。

2. オプション: [グラフ表示](#graph-display)の追加構成を参照してください。

### オプション

#### グラフ表示

オプションの Display Mode 機能を構成して、トップリストの視覚化にコンテキストを追加します。

* 複数のスタックグループを表示して、クエリの各ディメンションの内訳を示します。デフォルトでは、**Stacked** は有効になっています。**Flat** に切り替えることもできます。
* 値を全体のパーセントで表示するには **Relative** 表示モードを、クエリするデータの生カウントを表示するには **Absolute** 表示モードを選択します。</br>
   **注**: 相対表示は、カウントメトリクスやログイベントなどのカウントデータでのみ使用できます。
* **Visual Formatting Rules** で、エントリーの値に応じて条件付き書式を構成します。

#### コンテキストリンク

[コンテキストリンク][1]は、デフォルトで有効になっており、オンまたはオフに切り替えることができます。コンテキストリンクは、ダッシュボードウィジェットと Datadog の他のページまたはサードパーティアプリケーションの橋渡しをします。

#### グローバルタイム

スクリーンボードとノートブックの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、グローバルタイムフレームを使用するかを選択します。

## API

このウィジェットは **[Dashboards API][5]** で使用できます。[ウィジェット JSON スキーマ定義][6]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/querying/
[2]: /tracing/trace_explorer/query_syntax/#search-bar
[3]: /logs/search_syntax/
[4]: /dashboards/guide/context-links
[5]: /api/latest/dashboards/
[6]: /dashboards/graphing_json/widget_json/
