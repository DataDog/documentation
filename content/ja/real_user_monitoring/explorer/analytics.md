---
title: RUM Analytics
description: ""
aliases:
  - /real_user_monitoring/rum_analytics
  - /real_user_monitoring/analytics
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Explore your views within Datadog
- link: "https://www.datadoghq.com/blog/datadog-geomaps/"
  tag: Blog
  text: Use geomaps to visualize your app data by location
- link: "https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/"
  tag: Blog
  text: Use funnel analysis to understand and optimize key user flows
---

## 概要

リアルユーザーモニタリング（RUM）分析は、RUM エクスプローラーページを、データの集計や分割の機能を備えたビューで拡張するため、トラブルシューティングや監視に使うことができます。以下を制御することが可能です。

* 分析するビューセットをフィルタリングするクエリ
* データの分割に使用するディメンション
* 集計や分割を可視化する方法

RUM Analytics の視覚化でできること

* 可視化からダッシュボードでウィジェットを作成する。
* 可視化によって可能になる操作に応じて、イベントリストの各部を詳細に調べる。

## クエリの構築

[RUM Analytics][1] では、検索クエリにファセットやメジャーを追加して、表示をカスタマイズします。

1. グラフ化するメジャーまたはファセットを選択します。メジャーを選ぶと、集計関数を選択できます。ファセットを選ぶと、ユニーク数が表示されます。

    {{< img src="real_user_monitoring/explorer/analytics/measure_selection.png" alt="メジャーを選択" style="width:50%;">}}
2. グラフ化するメジャーの集計関数を選択します。

    {{< img src="real_user_monitoring/explorer/analytics/aggregation.png" alt="RUM 分析の集計関数" style="width:50%;">}}

3. ファセットを使用して、グラフを分割します。

    {{< img src="real_user_monitoring/explorer/analytics/break_down.png" alt="ファセットで分割された RUM 分析" style="width:50%;">}}

4. グラフの時間間隔を選択します。グローバルタイムフレームを変更すると、使用可能なタイムステップ値のリストが変わります。

    {{< img src="real_user_monitoring/explorer/analytics/roll_up.png" alt="rollup" style="width:50%;">}}

5. 選択したメジャーに応じて、**上位**と**下位**のどちらの値を表示するかを選択します。

    {{< img src="real_user_monitoring/explorer/analytics/top_bottom.png" alt="上位下位ボタン" style="width:50%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/analytics
