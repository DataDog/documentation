---
description: ''
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: Datadog 内でビューを探索する
- link: /dashboards/functions/
  tag: ドキュメント
  text: クエリに関数を追加する
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: ブログ
  text: ジオマップを使用して、場所ごとにアプリデータを視覚化する
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: ブログ
  text: ファネル分析により、主要なユーザーフローを理解し、最適化する
title: アナリティクスエクスプローラー
---

{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
製品分析の機能はすべて、ご利用に制限があります。アクセスをリクエストするには、フォームにご記入ください。
{{< /callout >}}

## 概要

アナリティクスエクスプローラーには、製品がどのように使用されているかを理解するためのビューデータの集計が含まれています。ユーザーは、以下をコントロールすることができます。

* ビューを表示するイベントのタイプ (セッション、ビュー、アクション)。
* 分析するビューセットをフィルタリングするクエリ
* データを分割するためのディメンション
* 集計や分割を可視化する方法

アナリティクスの視覚化でできること

* その可視化をもとにダッシュボードにウィジェットを作成する。
* 可視化によって可能になる操作に応じて、イベントリストの各部を詳細に調べる。

## クエリの構築

[アナリティクス][1]では、検索クエリにファセットやメジャーを追加して、表示をカスタマイズします。

1. [ビューのイベントタイプ][2]を選択します。

   {{< img src="product_analytics/analytics/view_type_selection.png" alt="ビュータイプの選択。" style="width:50%;">}}

2. ユニークカウントをグラフ化するための測定項目を選択します。

   {{< img src="product_analytics/analytics/measure_selection.png" alt="ユニークカウントをグラフ化する測定項目を選択する。" style="width:50%;">}}

4. 測定項目の[グループ化][3]の基準となるフィールドを選択します。

   {{< img src="product_analytics/analytics/group_breakdown.png" alt="特定のフィールドを基準に測定項目をグループ化する。" style="width:50%;">}}

5. グラフの時間間隔を選択します。グローバルタイムフレームを変更すると、使用可能なタイムステップ値のリストが変わります。

   {{< img src="product_analytics/analytics/time_interval.png" alt="グラフの時間間隔を選択する。" style="width:50%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/analytics
[2]: /ja/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/
[3]: /ja/product_analytics/analytics_explorer/group/
