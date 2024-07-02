---
title: Query Value Widget
widget_type: query_value
description: "Display an aggregated value for a given metric query"
aliases:
- /graphing/widgets/query_value/
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
---

クエリ値は、1 つのメトリクス、APM、またはログクエリの現在の値を表示します。値は条件付き書式 (緑/黄/赤色の背景など) を使用して表示され、値が期待される範囲内にあるかどうかを示します。これに、オプションで時系列データの背景を追加することができます。クエリ値によって表示される値は、必ずしもある瞬間の測定値を必要としません。

このウィジェットは、最新の報告値を表示することも、タイムウィンドウ全体のすべてのクエリ値から計算された集計値を表示することもできます。この可視化機能は、小さくてもはっきりとしたインフラストラクチャークエリへのウィンドウを提供します。

{{< img src="dashboards/widgets/query_value/query_value1.png" alt="クエリ値ウィジェット" style="width:80%;" >}}

## セットアップ

{{< img src="dashboards/widgets/query_value/query-value-widget-setup1.png" alt="クエリ値ウィジェットのセットアップ" style="width:80%;">}}

### 構成

1. グラフ化するデータを選択します。
    * メトリクス: メトリクスクエリの構成については、[クエリ作成のドキュメント][1]を参照してください。
    * Indexed Span: Indexed Span クエリの構成については、[トレース検索に関するドキュメント][2]を参照してください。
    * ログイベント: ログイベントクエリの構成については、[ログ検索に関するドキュメント][3]を参照してください。
2. 指定した時間枠内のすべてのデータポイントの `avg`、`min`、`sum`、`max`、`last` の値として計算される、クエリ値を単一の値に削減します。
3. 単位とフォーマットを選択します。自動フォーマットは、単位に基づいてダッシュボードをスケーリングします。
4. Optionally, configure a conditional format depending on the value displayed. See [Visual Formatting Rules](#visual-formatting-rules) for more examples.
5. オプションで、時系列の背景をオーバーレイ表示します。
    * Min to Max: 最小から最大までのスケールグラフ。
    * Line: ゼロ (0) を含むためのスケールグラフ。
    * Bars: 離散的、周期的な測定値を表示します。

### オプション

#### Visual formatting rules

<div class="alert alert-info">Visual formatting rules should be based on the metric's raw value. If the metric base unit is in nanoseconds, but the Query Value autoformats to seconds, your conditional rules should be based on nanoseconds.</div>

Customize the background of your Query Value widget with conditional rules. You have the option of adding a background color, font color, or a custom image. With custom images, internal servers must be updated to support cross origin requests to reference internal images.

{{< img src="dashboards/widgets/query_value/visual_formatting_rules_custom_img.png" alt="Query value widget visual formatting rules with custom image background" style="width:90%;" >}}

#### コンテキストリンク

[コンテキストリンク][1]は、デフォルトで有効になっており、オンまたはオフに切り替えることができます。コンテキストリンクは、ダッシュボードウィジェットと Datadog の他のページまたはサードパーティアプリケーションの橋渡しをします。

#### グローバルタイム

ウィジェットにカスタムタイムフレームがあるか、ダッシュボードのグローバルタイムフレームがあるかを選択します。

## API

このウィジェットは **[Dashboards API][5]** で使用できます。[ウィジェット JSON スキーマ定義][6]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/querying/#overview
[2]: /tracing/trace_explorer/query_syntax/#search-bar
[3]: /logs/search_syntax/
[4]: /dashboards/guide/context-links/
[5]: /api/latest/dashboards/
[6]: /dashboards/graphing_json/widget_json/
