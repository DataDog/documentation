---
title: Visualize
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Search for your events
---

## 概要

視覚化は、[RUM エクスプローラー][1]に表示されるフィルターと集計の結果を定義するものです。検索クエリで必要な情報を表示するために、関連する視覚化の種類を選択します。

## リスト

リストは、イベントの結果をページ分割したもので、個々の結果が重要な場合に最適です。リストを使うのに、一致する結果を定義するための予備知識は必要ありません。

{{< img src="real_user_monitoring/explorer/visualize/rum_explorer_lists-1.mp4" alt="RUM エクスプローラー内のリスト" video="true" style="width:70%;" >}}

検索した情報は、列で表示されます。以下の管理が可能です。

- 1 行目に利用可能なインタラクションを表示した表。列のソート、並べ替え、削除が可能です。
- 左側のファセットパネル、または右側の RUM [イベントサイドパネル][2]。フィールドの列を追加することができます。

デフォルトでは、リスト視覚化の RUM イベントはタイムスタンプで整理され、最新のイベントが最初に表示されます。イベントは、ファセットなど、任意の方法で並べ替えることができます。メジャーの最小値または最大値を持つ RUM イベントを最初に表示し、次にファセットの一意の値でイベントを辞書順に並べ替えます。これは、ファセットに従って列を並べ替えます。

列に属性やタグを追加することはできますが、Datadog は最初に[ファセットを宣言][3]している場合、テーブルをソートすることを推奨しています。テーブル上の行項目のカスタム属性の値を見るために、列にファセットでない属性を追加することはできますが、正しくソートされない場合があります。

RUM イベントテーブルの構成は、トラブルシューティングコンテキストの追加要素とともに[保存ビュー][4]に保存されます。

### リストウィジェット

[ダッシュボード上のリストウィジェット][8]は、RUM データを含む、指定されたデータソースの個々のイベントを表示します。リストウィジェットを使用すると、例えば特定のページのすべてのエラーなど、ダッシュボード上のあらゆる RUM イベントを表示することができます。

ダッシュボードだけでなく、リストウィジェットはノートブックでも使用することができ、レポートや調査の一部として RUM イベントを追加することが可能です。

## Timeseries

選択したタイムフレーム内での 1 つのメジャー (または[ファセット][5]のユニーク値数) の動きを可視化し、オプションで、使用可能な[ファセット][5]で分割します。

{{< img src="real_user_monitoring/explorer/visualize/timeseries-2.png" alt="RUM エクスプローラーの時系列グラフ" style="width:90%;" >}}

The timeseries graph depicts the evolution of the number of pageviews on the Shopist application over the past day for every view path.

以下などの追加表示オプションを選択することができます。

- Display: 結果は、棒グラフ (カウントやユニークカウントに推奨)、線グラフ (統計的集計に推奨)、面グラフで表示され、いくつかのカラーセットが利用可能です。
- The roll-up interval: 棒グラフのバケット幅を指定します。

## Toplist

選択したメジャーに基づくファセットから上位の値を視覚化します。

{{< img src="real_user_monitoring/explorer/visualize/top-list-2.png" alt="Top list bar graph in the RUM Explorer" style="width:90%;" >}}

The top list includes the top browsers used to visit the Shopist website over the last day.

## ネストされたテーブル

選択した[メジャー][5] (リストで選択した最初のメジャー) に基づいて最大 3 つの[ファセット][5]から上位の値を可視化し、ネストしたテーブルに現れる要素に対して他のメジャーの値を表示します。検索クエリを更新したり、いずれかのディメンションに対応する RUM イベントを調べたりすることができます。

* メジャーが複数ある場合、最初のメジャーに応じて上位または下位リストが決定されます。
* サブセット（上位または下位）のみが表示されるため、小計がグループ内の実際の合計値とは異なる場合があります。このディメンジョンに対する、値が null または空欄のイベントは、サブグループとして表示されません。

 **注**: 単一のメジャーと単一のディメンジョンで使用されるテーブルの可視化は、表示が異なりますが、[上位リスト](#top-list)と同じです。

 The following RUM Analytics table shows the **top 5 URL paths** for **two countries**, US and Japan, grouped by browser, over the last day:

{{< img src="real_user_monitoring/explorer/visualize/nested-table-4.png" alt="Nested table in the RUM Explorer" style="width:90%;">}}

## ディストリビューション

選択した時間帯のメジャー属性の分布を表示し、値の変動を確認することができます。

{{< img src="real_user_monitoring/explorer/visualize/distribution-2.png" alt="Distribution graph in the RUM Explorer" style="width:90%;">}}

分布グラフは、Shopist ランディングページのユーザー体験を測定する Largest Contentful Paint の分布を表示します。

## ジオマップ

世界地図上で単一の[メジャー][5] (または[ファセット][5]の一意の値のカウント) を視覚化します。

{{< img src="real_user_monitoring/explorer/visualize/geomap-2.png" alt="Geographical map in the RUM Explorer" style="width:90%;">}}

RUM Analytics ジオマップは、過去 1 日間の **Largest Contentful Paint** の 75 パーセンタイルを示しています。

## 円グラフ
円グラフは、データを整理し、全体に対する割合で表示するのに役立ちます。ログデータ内のサービス、ユーザー、ホスト、国など、異なる次元の関係を比較するときに便利です。

以下の円グラフは、**View Path** 別の構成比を表しています。

{{< img src="real_user_monitoring/explorer/visualize/pie-chart.png" alt="RUM エクスプローラーの円グラフ" style="width:90%;">}}

## 関連イベント

For all visualizations, select a section of the graph or click on the graph to either zoom in or see a list of events that correspond to your selection.

{{< img src="real_user_monitoring/explorer/visualize/related-events-2.png" alt="Related events link available when you click on the graph" width="90%" >}}

残りの視覚化オプションについては、グラフをクリックし、**View events** をクリックすると、選択した項目に対応するイベントのリストが表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/
[2]: /real_user_monitoring/explorer/events/
[3]: /logs/explorer/facets/
[4]: /real_user_monitoring/explorer/saved_views/
[5]: /real_user_monitoring/explorer/search#setup-facets-and-measures
[6]: /notebooks
[7]: /real_user_monitoring/explorer/export/
[8]: /dashboards/widgets/list/
