---
aliases:
- /ja/graphing/widgets/table/
description: 列、行、並べ替え機能を備えたテーブルで、詳細なメトリクスとイベントの分析を表示します。
further_reading:
- link: /dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
- link: /dashboards/querying/
  tag: ドキュメント
  text: グラフクエリの構築方法について
- link: https://learn.datadoghq.com/courses/discovering-table-list-widgets
  tag: ラーニングセンター
  text: テーブル、リスト、SLO、アーキテクチャウィジェットの紹介
title: テーブルウィジェット
widget_type: query_table
---
## 概要 {#overview}

テーブルによる視覚化では、タグキーでグループ化された集計データの列が表示されます。テーブルを使用して、多くのデータグループ間で値を比較し、傾向、変化、外れ値を確認します。

{{< img src="/dashboards/widgets/table/table_conditional_formatting.png" alt="条件付き書式が適用されたテーブルウィジェット" style="width:100%;">}}

## セットアップ {#setup}

### 構成 {#configuration}

1. グラフ化するデータを選択します。
    * メトリクス: メトリクスクエリの構成については、[グラフ作成方法に関するドキュメント][1] を参照してください。
    * メトリクス以外のデータソース: イベントクエリを構成するには、[ログ検索ドキュメント][2] を参照してください。

2. {{< ui >}}\+ Add Query{{< /ui >}} および {{< ui >}}\+ Add Formula{{< /ui >}} ボタンを使用して、テーブルに列を追加します。

### オプション {#options}

* エイリアスを設定することで、列ヘッダーの名前を変更します。{{< ui >}}as...{{< /ui >}} ボタンをクリックします。
* 検索バーを表示するかどうかを構成します。デフォルトは {{< ui >}}Auto{{< /ui >}} で、ウィジェットの大きさに応じて検索バーを表示します。つまり、画面が小さい場合はウィジェット上のデータの表示を優先し、検索バーは非表示になります (全画面モードになると表示されます)。

#### 列のフォーマット {#column-formatting}

列のフォーマットルールで、各列のセルの値の表示方法をカスタマイズします。トレンドや変化を視覚化するために、データにカラーコードを作成します。
* しきい値フォーマット: 特定の値範囲を満たすとセルを色でハイライトします。
* 範囲フォーマット: 値の範囲を持つセルを色分けします。
* テキストフォーマット: 読みやすさを向上させるために、セルをエイリアステキスト値に置き換えます。
* トレンド情報: メトリクスおよびイベントクエリを視覚化します。

{{< img src="/dashboards/widgets/table/conditional_formatting_trends.png" alt="トレンドインジケーター付きの条件付きフォーマットが表示されたテーブルウィジェット" style="width:100%;" >}}

#### コンテキストリンク {#context-links}

[コンテキストリンク][10] はデフォルトで有効になっており、オン/オフを切り替えることができます。コンテキストリンクは、ダッシュボードウィジェットと Datadog 内のその他のページまたはサードパーティアプリケーションを結び付けます。

## N/A 値 {#na-values}

テーブルウィジェットの列は、それぞれ独立してクエリが実行されます。名前が同じで重複するグループはリアルタイムで結合されて、テーブルの行が作成されます。このプロセスの結果、重複するグループがなく、セルに N/A が表示される状況が発生する可能性があります。これを回避するには、次の対策を講じます。
  * クエリ数の上限を大きくして、できる限り多くの列が組み合わさるようにする
  * インサイトを「生み出している」と思われる列でテーブルをソートする

## API {#api}

このウィジェットは、**ダッシュボード API** で使用できます。詳細については、[ダッシュボード API に関するドキュメント][8] を参照してください。

テーブルウィジェットの [ウィジェット JSON スキーマ定義][9] は次のとおりです。

{{< dashboards-widgets-api >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/querying/#configuring-a-graph
[2]: /ja/logs/search_syntax/
[3]: /ja/tracing/trace_explorer/query_syntax/
[4]: /ja/real_user_monitoring/explorer/search_syntax
[5]: /ja/profiler/profile_visualizations
[6]: /ja/security_monitoring/explorer/
[7]: /ja/dashboards/guide/apm-stats-graph
[8]: /ja/api/latest/dashboards/
[9]: /ja/dashboards/graphing_json/widget_json/
[10]: /ja/dashboards/guide/context-links/
[11]: /ja/dashboards/querying/#advanced-graphing