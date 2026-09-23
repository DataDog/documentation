---
aliases:
- /ja/product_analytics/analytics_explorer/
- /ja/product_analytics/journeys
description: ''
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: Datadog でビューを検索する
- link: /dashboards/functions/
  tag: ドキュメント
  text: クエリに関数を追加する
- link: https://www.datadoghq.com/blog/product-analytics-faster-decisions
  tag: ブログ
  text: Datadog Product Analytics を使用して迅速かつ効果的に製品の決定を行う
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: ブログ
  text: ジオマップを使用して、場所ごとにアプリデータを視覚化する
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: ブログ
  text: ファネル分析により、主要なユーザーフローを理解し、最適化する
title: Analytics
---
## 概要 {#overview}

[Analytics Explorer][1] ページには、製品がどのように使用されているかを理解できるようにビューのデータが集約されます。次のものを制御できます。

* ビューを表示するイベントタイプ (セッション、ビュー、またはアクション)。
* 分析するビューのセットをフィルタリングするクエリ。
* データを分割するディメンション。
* 集計と分割の視覚化方法。

Analytics の視覚化を使用して、次のことができます。

* ダッシュボードのウィジェットをその視覚化から作成する。
* 視覚化で有効になるインタラクションに応じて、イベントリストのサブセットを詳しく調べる。

## 分析チャートの使用 {#using-the-analytics-chart}
{{< whatsnext desc="Analytics の検索構文の使用方法、イベントを表示する方法、ビューを視覚化、グループ化、エクスポートする方法については、下記のリンクを参照してください。" >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/search_syntax" >}}検索構文{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/events" >}} イベント {{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/visualize" >}}視覚化{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/group" >}}グループ{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/export" >}}エクスポート{{< /nextlink >}}
{{< /whatsnext >}}

## クエリを作成する {#build-a-query}

[Analytics][1] では、検索クエリにファセットとメジャーを追加して表示をカスタマイズできます。

1. [ビューのイベントタイプ][2]を選択します。

   {{< img src="product_analytics/analytics/view_type_selection1.png" alt="ビューのタイプの選択にスコープされた Product Analytics のドロップダウンメニュー" style="width:70%;">}}

1. 一意のカウントをグラフ化するメジャーを選択します。

   {{< img src="product_analytics/analytics/measure_selection1.png" alt="一意のカウントをグラフ化するメジャーを選択するための Product Analytics のドロップダウンメニュー" style="width:70%;">}}

1. イベント属性または[サードパーティインテグレーション][6]の属性でフィルタリングします。

   {{< img src="product_analytics/analytics/pana_analytics_filter_by.png" alt="イベントを独自の属性かサードパーティインテグレーションから取得した属性でフィルタリングするための Product Analytics のドロップダウンメニュー" style="width:70%;">}}

1. 結果を分類するイベント属性を選択します。

   {{< img src="product_analytics/analytics/pana_analytics_breakdown_by1.png" alt="イベントを独自の属性かサードパーティインテグレーションから取得した属性で分類するための Product Analytics のドロップダウンメニュー" style="width:70%;">}}

1. [関数][4]を適用して、クエリの結果を視覚化のためにどのように返すかを変更します。

   {{< img src="product_analytics/analytics/pana_analytics_functions.png" alt="メトリッククエリの結果を視覚化のためにどのように返すかを変更する関数を追加するための Product Analytics のボタン" style="width:70%;">}}

1. [グラフタイプ][5]とグラフの時間間隔を選択します。グローバルなタイムフレームを変更すると、利用可能なタイムステップの値のリストが変更されます。

   {{< img src="product_analytics/analytics/pana_analytics_time_interval2.png" alt="グラフタイプと時間間隔を選択" style="width:50%;">}}



## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/explorer
[2]: /ja/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/
[3]: /ja/product_analytics/charts/analytics_explorer/group
[4]: /ja/dashboards/functions/#overview
[5]: /ja/product_analytics/charts/analytics_explorer/visualize/
[6]: https://app.datadoghq.com/product-analytics/integrations/custom-attributes