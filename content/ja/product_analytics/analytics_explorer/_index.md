---
title: Analytics Explorer
kind: documentation
description: ""
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: Datadog でビューを検索する
- link: /dashboards/functions/
  tag: ドキュメント
  text: Add a function to your query
- link: "https://www.datadoghq.com/blog/datadog-geomaps/"
  tag: ブログ
  text: ジオマップを使用して、場所ごとにアプリデータを視覚化する
- link: "https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/"
  tag: ブログ
  text: ファネル分析により、主要なユーザーフローを理解し、最適化する
---

{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
All features in Product Analytics are in limited availability. To request access, complete the form.
{{< /callout >}}

## 概要

The Analytics Explorer contains views data aggregation for understanding how your product is being used. You can control:

* The event type (Sessions, Views, or Actions) to see views by.
* 分析するビューセットをフィルタリングするクエリ
* データの分割に使用するディメンション
* 集計や分割を可視化する方法

With Analytics visualizations, you can:

* 可視化からダッシュボードでウィジェットを作成する。
* 可視化によって可能になる操作に応じて、イベントリストの各部を詳細に調べる。

## クエリの構築

In [Analytics][1], customize your display by adding facets and measures to your search query. 

1. Select a [view event type][2].

   {{< img src="product_analytics/analytics/view_type_selection.png" alt="View type selection." style="width:50%;">}}

2. Choose a measure to graph the unique count.

   {{< img src="product_analytics/analytics/measure_selection.png" alt="Choose a measure to graph the unique count." style="width:50%;">}}

4. Choose a field to [group][3] the measure by.

   {{< img src="product_analytics/analytics/group_breakdown.png" alt="Group the measure by specific fields." style="width:50%;">}}

5. グラフの時間間隔を選択します。グローバルタイムフレームを変更すると、使用可能なタイムステップ値のリストが変わります。

   {{< img src="product_analytics/analytics/time_interval.png" alt="Choose a time interval for your graph." style="width:50%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/analytics
[2]: /real_user_monitoring/guide/understanding-the-rum-event-hierarchy/
[3]: /product_analytics/analytics_explorer/group/