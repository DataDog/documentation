---
title: 視覚化
kind: documentation
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: イベント検索
---

## 概要

Visualizations define the outcomes of the filters and aggregates displayed in the [Analytics Explorer][1]. Select the relevant visualization type to surface the information you need under the search query.

## Timeseries

Visualize the evolution of a single measure (an attribute with a numerical value contained in your Product Analytics events), or a facet (unique count of values) over a selected time frame.

{{< img src="product_analytics/analytics/visualize/analytics-timeseries-1.png" alt="Timeseries graph in the Analytics Explorer" style="width:90%;" >}}

The timeseries graph depicts the evolution of the number of pageviews on an example web application over the past day for every view path.

以下などの追加表示オプションを選択することができます。

- Display: 結果は、棒グラフ (カウントやユニークカウントに推奨)、線グラフ (統計的集計に推奨)、面グラフで表示され、いくつかのカラーセットが利用可能です。
- The roll-up interval: 棒グラフのバケット幅を指定します。

## Toplist

選択したメジャーに基づくファセットから上位の値を視覚化します。

{{< img src="product_analytics/analytics/visualize/analytics-top-list-1.png" alt="Top list bar graph in the Analytics Explorer" style="width:90%;" >}}

The top list includes the top browsers used to visit the Shopist website over the last day.

## ネストされたテーブル

Visualize the top values from up to three facets according to your chosen measure (the first measure you choose in the list) and display the value of additional measures for elements that appear in the nested table. Update the search query or investigate the events corresponding to either dimension.

* メジャーが複数ある場合、最初のメジャーに応じて上位または下位リストが決定されます。
* サブセット（上位または下位）のみが表示されるため、小計がグループ内の実際の合計値とは異なる場合があります。このディメンジョンに対する、値が null または空欄のイベントは、サブグループとして表示されません。

 **注**: 単一のメジャーと単一のディメンジョンで使用されるテーブルの可視化は、表示が異なりますが、[上位リスト](#top-list)と同じです。

 The following Analytics table shows the **top 5 URL paths** for **two countries**, US and Japan, grouped by browser, over the last day:

{{< img src="product_analytics/analytics/visualize/analytics-nested-table-1.png" alt="Nested table in the Analytics Explorer" style="width:90%;">}}

## ディストリビューション

選択した時間帯のメジャー属性の分布を表示し、値の変動を確認することができます。

{{< img src="product_analytics/analytics/visualize/analytics-distribution.png" alt="Distribution graph in the Analytics Explorer" style="width:90%;">}}

分布グラフは、Shopist ランディングページのユーザー体験を測定する Largest Contentful Paint の分布を表示します。

## ツリーマップ
ツリーマップは、データを整理して、全体に対する割合として視覚的にわかりやすく表示するのに役立ちます。ツリーマップは、ネストされた長方形でデータを表示します。長方形のサイズと色の両方を使用して、異なる次元を比較します。また、複数の属性を選択して、長方形の階層を表示することもできます。

以下のツリーマップは、**View Name** 別の構成比を表しています。

{{< img src="product_analytics/analytics/visualize/analytics-tree-maps.png" alt="Tree map in the Analytics Explorer" style="width:90%;">}}

## 円グラフ
A pie chart helps you organize and show data as a percentage of a whole. It is useful when comparing the relationship between different dimensions such as services, users, hosts, and countries. within your log data.

以下の円グラフは、**View Path** 別の構成比を表しています。

{{< img src="product_analytics/analytics/visualize/analytics-pie-chart.png" alt="Pie chart in the Analytics Explorer" style="width:90%;">}}

## ジオマップ

Visualize a single measure (an attribute with a numerical value contained in your Product Analytics events), or a facet (unique count of values) on the world map.

{{< img src="product_analytics/analytics/visualize/analytics-geomaps.png" alt="Geographical map in the Analytics Explorer" style="width:90%;">}}

The Analytics geomap shows the 75th percentile of the **Largest Contentful Paint** over the past day.

## リスト

リストは、イベントの結果をページ分割したもので、個々の結果が重要な場合に最適です。リストを使うのに、一致する結果を定義するための予備知識は必要ありません。

{{< img src="product_analytics/analytics/visualize/analytics-lists.mp4" alt="Lists in the Analytics Explorer" video="true" style="width:70%;" >}}

検索した情報は、列で表示されます。以下の管理が可能です。

- 1 行目に利用可能なインタラクションを表示した表。列のソート、並べ替え、削除が可能です。
- The facet dropdown at the top of each column.

By default, events in the list visualization are organized by timestamp, with the most recent events listed first. You can sort events in any way you want, such as with facets. Surface events with the lowest or highest value for a measure first, then sort your events lexicographically for the unique value of a facet. This orders a column according to the facet.

## 関連イベント

[ファネル](#funnels)以外のすべての視覚化では、グラフのセクションを選択するか、グラフをクリックしてズームインするか、選択した項目に対応するイベントのリストを表示します。

{{< img src="product_analytics/analytics/visualize/analytics-related-events.png" alt="Related events link available when you click on the graph" width="90%" >}}

ファネルグラフの場合、グラフをクリックすると、クエリに対応するコンバージョンされたセッションとドロップオフされたセッションのリストが表示されます。

残りの視覚化オプションについては、グラフをクリックし、**View events** をクリックすると、選択した項目に対応するイベントのリストが表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /product_analytics/analytics_explorer/