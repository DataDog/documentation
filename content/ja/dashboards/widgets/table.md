---
aliases:
- /ja/graphing/widgets/table/
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
- link: /dashboards/querying/
  tag: Documentation
  text: Learn how to build a graphing query
title: Table Widget
widget_type: query_table
---

## 概要

テーブルの視覚化では、タグキーでグループ化された集計データの列が表示されます。テーブルを使用して、多数のデータグループの値を比較し、傾向、変化、外れ値を確認できます。

{{< img src="/dashboards/widgets/table/table_conditional_formatting.png" alt="条件付きフォーマットがあるテーブルウィジェット" style="width:100%;">}}

## セットアップ

### 構成

1. グラフ化するデータを選択します。
    * メトリクス: メトリクスクエリの構成については、[グラフ作成方法に関するドキュメント][1]を参照してください。
    * メトリクス以外のデータソース: イベントクエリを構成するには、[ログ検索ドキュメント][2]を参照してください。

2. **+ Add Query** と **+ Add Formula** のボタンを使用して、テーブルに列を追加します。

### オプション

* エイリアスを設定することで、列ヘッダーの名前を変更できます。**as...** ボタンをクリックします。
* 検索バーを表示するかどうかを構成します。デフォルトは **Auto** で、ウィジェットの大きさに応じて検索バーを表示します。つまり、画面が小さい場合はウィジェット上のデータの表示を優先し、検索バーは非表示になります（全画面モードになると表示されます）。

#### 列のフォーマット
列のフォーマットルールを使用して、各列のセル値の視覚化をカスタマイズします。トレンドや変化を視覚化するために、データにカラーコードを作成します。
* しきい値フォーマット: 特定の値範囲を満たすとセルを色でハイライトします。
* 範囲フォーマット: 値の範囲を持つセルを色分けします。
* テキストフォーマット: 読みやすさを向上させるために、セルをエイリアステキスト値に置き換えます。

{{< img src="/dashboards/widgets/table/range_conditional_formatting.png" alt="列フォーマットオプションを表示するウィジェット構成" style="width:90%;" >}}

#### コンテキストリンク

[コンテキストリンク][10]は、デフォルトで有効になっており、オンまたはオフに切り替えることができます。コンテキストリンクは、ダッシュボードウィジェットと Datadog またはサードパーティアプリケーションの他のページの橋渡しをします。


## N/A 値

テーブルウィジェットの列は、それぞれ独立してクエリが実行されます。名前が同じで重複するグループはリアルタイムで結合されて、テーブルの行が作成されます。このプロセスの結果、重複するグループがなく、セルに N/A が表示される状況が発生する可能性があります。これを回避するには、次の対策を講じます。
  * クエリ数の上限を大きくして、できるだけ多くの列が組み合わさるようにします。
  * インサイトを"生み出している"と思われる列でテーブルをソートします。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][8] ドキュメントをご参照ください。

テーブルウィジェットの[ウィジェット JSON スキーマ定義][9]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

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