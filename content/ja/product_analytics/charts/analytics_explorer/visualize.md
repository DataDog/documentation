---
aliases:
- /ja/product_analytics/analytics_explorer/visualize
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: イベント検索
title: 可視化
---

## 概要

視覚化は、[Analytics Explorer][1] に表示されるフィルターと集計の結果を定義します。検索クエリで必要な情報を表示するために、適切な視覚化の種類を選択します。

## Timeseries

選択した時間枠において、単一のメジャー (Product Analytics イベントに含まれる数値属性) またはファセット (値のユニークカウント) の推移を視覚化します。 

{{< img src="product_analytics/analytics/visualize/analytics-timeseries-1.png" alt="Analytics Explorer の時系列グラフ" style="width:90%;" >}}

時系列グラフは、サンプル Web アプリケーションの各ビューパスごとに、過去 1 日間のページビュー数の推移を示しています。

以下などの追加表示オプションを選択することができます。

- Display: 結果は、棒グラフ (カウントやユニークカウントに推奨)、線グラフ (統計的集計に推奨)、面グラフで表示され、いくつかのカラーセットが利用可能です。
- The roll-up interval: 棒グラフのバケット幅を指定します。

## Toplist

選択したメジャーに基づくファセットから上位の値を視覚化します。

{{< img src="product_analytics/analytics/visualize/analytics-top-list-1.png" alt="Analytics Explorer の上位リストの棒グラフ" style="width:90%;" >}}

上位リストには、直近 1 日間に Shopist のウェブサイトを訪問した際に使用された上位のブラウザが含まれます。

## ネストされたテーブル

選択したメジャー (リストで選択した最初のメジャー) に基づいて最大 3 つのファセットから上位の値を可視化し、ネストされたテーブルに現れる要素に対して他のメジャーの値を表示します。検索クエリを更新したり、いずれかのディメンションに対応するイベントを調べたりすることができます。

* メジャーが複数ある場合、最初のメジャーに基づいて上位または下位リストが決定されます。 
* サブセット (上位または下位) のみが表示されるため、小計がグループ内の実際の合計値とは異なる場合があります。このディメンションに対する、値が null または空欄のイベントは、サブグループとして表示されません。

 **注**: 単一のメジャーと単一のディメンジョンで使用されるテーブルの可視化は、表示が異なりますが、[上位リスト](#top-list)と同じです。

 次の Analytics テーブルは、過去 1 日間における日米 **2 つの国**の**上位 5 つの URL パス**を、ブラウザ別にグループ化したものです。

{{< img src="product_analytics/analytics/visualize/analytics-nested-table-1.png" alt="Analytics Explorer のネストされたテーブル" style="width:90%;">}}

## 分布

選択した時間枠でのメジャー属性の分布を表示し、値の変動を確認することができます。 

{{< img src="product_analytics/analytics/visualize/analytics-distribution.png" alt="Analytics Explorer の分布グラフ" style="width:90%;">}}

分布グラフは、Shopist ランディングページのユーザー体験を測定する Largest Contentful Paint の分布を表示します。

## ツリーマップ
ツリーマップは、データを整理して、全体に対する割合として視覚的にわかりやすく表示するのに役立ちます。ツリーマップは、ネストされた長方形でデータを表示します。長方形のサイズと色の両方を使用して、異なる次元を比較します。また、複数の属性を選択して、長方形の階層を表示することもできます。

以下のツリーマップは、**View Name** 別の構成比を表しています。

{{< img src="product_analytics/analytics/visualize/analytics-tree-maps.png" alt="Analytics Explorer のツリーマップ" style="width:90%;">}}

## 円グラフ
円グラフは、データを整理し、全体に対する割合として表示するのに役立ちます。ログデータ内のサービス、ユーザー、ホスト、国など、異なる次元間の関係を比較する際に便利です。 

以下の円グラフは、**View Path** 別の構成比を表しています。

{{< img src="product_analytics/analytics/visualize/analytics-pie-chart.png" alt="Analytics Explorer の円グラフ" style="width:90%;">}}

## ジオマップ

世界地図上において、単一のメジャー (Product Analytics イベントに含まれる数値属性) またはファセット (値のユニークカウント) を視覚化します。 

{{< img src="product_analytics/analytics/visualize/analytics-geomaps.png" alt="Analytics Explorer の地形図" style="width:90%;">}}

Analytics ジオマップは、過去 1 日間の **Largest Contentful Paint** の 75 パーセンタイルを示しています。

## リスト

リストは、イベントの結果をページ分割したもので、個々の結果が重要な場合に最適です。リストを使うのに、一致する結果を定義するための予備知識は必要ありません。

{{< img src="product_analytics/analytics/visualize/analytics-lists.mp4" alt="Analytics Explorer 内のリスト" video="true" style="width:70%;" >}}

検索した情報は列で表示されます。次の操作が可能です。

- 1 行目に利用可能なインタラクションを表示した表。列のソート、並べ替え、削除が可能です。
- 各列の上部にあるファセットドロップダウン。

デフォルトでは、リスト視覚化のイベントはタイムスタンプ順に整理され、最新のイベントが最初に表示されます。イベントは、ファセットなど、任意の方法で並べ替えることができます。まず、メジャーの最小値または最大値を持つイベントを表示し、次にファセットの一意の値に基づいてイベントを辞書順に並べ替えます。これにより、ファセットに従って列が並べ替えられます。

## 関連イベント

For all visualizations besides the [funnel][2], select a section of the graph or click on the graph to either zoom in or see a list of events that correspond to your selection.

{{< img src="product_analytics/analytics/visualize/analytics-related-events.png" alt="グラフをクリックすると、関連イベントリンクが表示されます" width="90%" >}}

ファネルグラフの場合、グラフをクリックすると、クエリに対応するコンバージョンされたセッションとドロップオフされたセッションのリストが表示されます。

残りの視覚化オプションについては、グラフをクリックし、**View events** をクリックすると、選択した項目に対応するイベントのリストが表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/explorer
[2]: /ja/product_analytics/charts/funnel_analysis