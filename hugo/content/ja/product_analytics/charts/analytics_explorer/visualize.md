---
aliases:
- /ja/product_analytics/analytics_explorer/visualize
description: 時系列、テーブル、ツリーマップなどのグラフタイプを選択して、Product Analytics のクエリ結果を表示します。
title: 視覚化
---
分析クエリを作成した後、グラフタイプセレクターを使用して結果の表示方法を制御します。

ほとんどのグラフタイプは、メジャー、ファセット、またはその両方を視覚化します。

メジャー
: 読み込み時間など、Product Analytics イベントに含まれる数値を持つ属性。

ファセット
: 国やブラウザなど、一意の値をグループ化または比較する属性。

ほとんどのグラフコンポーネントをクリックすると、データポイントの基になるイベントや、より絞り込んだ時間枠など、詳細を確認できます。利用可能なオプションはグラフタイプによって異なります。

<div class="alert alert-tip">集計グラフではなく、ページ分けされたイベントレベルの結果を表示するには、{{< ui >}}Events{{< /ui >}} ページを使用します。イベントは、個々の結果が重要であり、どのような結果が一致条件に該当するかをあらかじめ知っておく必要がない場合に最適です。</div>

## 時系列 {#timeseries}

選択した時間枠における単一のメジャーまたはファセットの推移を視覚化します。

以下のような追加の表示オプションを選択できます。

- Display: 結果を棒グラフ (カウントやユニークカウントに推奨)、折れ線グラフ (統計的集計に推奨)、またはエリアグラフとして表示します。いくつかのカラーセットを利用できます。
- Rollup interval: 棒グラフにおけるバケットの幅を決定します。

{{< img src="product_analytics/analytics/visualize/analytics-timeseries-3.png" alt="Analytics チャートビルダーにおける時系列チャートの表示。" style="width:90%;" >}}

## クエリ値 {#query-value}

選択した時間枠におけるメジャーまたはファセットの単一の集計値を表示します。クエリ値チャートはブレイクダウンをサポートしていません。

必要に応じて {{< ui >}}Change{{< /ui >}} を有効にすると、前時間、前日、前週などの比較期間に対して値がどのように増減したかを表示できます。

{{< img src="product_analytics/analytics/visualize/analytics-query-value-1.png" alt="Analytics チャートビルダーにおけるクエリ値チャートの表示。" style="width:90%;" >}}

## トップリスト {#top-list}

選択したメジャーに基づいて、ファセットの上位または下位の値の順位を視覚化します。

{{< img src="product_analytics/analytics/visualize/analytics-top-list-3.png" alt="Analytics チャートビルダーにおけるトップリストチャートの表示。" style="width:90%;" >}}

## 棒グラフ {#bar-chart}

垂直の列を使用して、ファセットの値全体でメジャーを比較します。

{{< img src="product_analytics/analytics/visualize/analytics-bar-chart-1.png" alt="Analytics チャートビルダーにおける棒グラフの表示。" style="width:90%;" >}}

## テーブル {#table}

選択したメジャー (リスト内で最初に選択したメジャー) に従って、最大 4 つのファセットの上位または下位の値を視覚化します。追加のメジャーには、テーブルに表示される要素の値が表示されます。検索クエリを更新するか、ディメンションに対応するイベントを調査します。

- テーブルに複数のメジャーが含まれている場合、上位または下位の順位は最初のメジャーによって決まります。
- サブセット (上位または下位) のみが表示されるため、小計はグループ内の実際の合計値と異なる場合があります。ディメンションの値が null または空のイベントは、サブグループとして表示されません。

<div class="alert alert-info">単一のメジャーと単一のブレイクダウンを持つテーブルは、表示形式が異なるだけで<a href="#top-list">トップリスト</a>と同等です。</div>

{{< img src="product_analytics/analytics/visualize/analytics-table-1.png" alt="Analytics チャートビルダーにおけるテーブルチャートの表示。" style="width:90%;">}}

## 変化 {#change}

選択した期間と、前時間、前日、前週などの比較期間との間で、メジャーがどのように増減したかを表示します。オプションでファセットを追加し、その値ごとの変化のブレイクダウンを確認できます。

{{< img src="product_analytics/analytics/visualize/analytics-change-1.png" alt="Analytics チャートビルダーにおける変化チャートの表示。" style="width:90%;" >}}

## ツリーマップ{#treemap}

ツリーマップは、全体に対する割合としてデータを整理し、視覚的に見やすい形式で表示するのに役立ちます。ツリーマップは、データを入れ子状の長方形で表示します。長方形のサイズと色の両方を使用して、異なるファセットを比較します。

{{< img src="product_analytics/analytics/visualize/analytics-treemap-1.png" alt="Analytics チャートビルダーにおけるツリーマップチャートの表示。" style="width:90%;">}}

## 円グラフ {#pie-chart}

円グラフは、全体に対する割合としてデータを整理して表示するのに役立ちます。国、ブラウザ、ビュー名など、異なるファセット間の関係を比較する場合に便利です。

{{< img src="product_analytics/analytics/visualize/analytics-pie-chart-2.png" alt="Analytics チャートビルダーにおける円グラフの表示。" style="width:90%;">}}

## ジオマップ {#geomap}

世界地図上で単一のメジャーまたはファセットを視覚化します。

{{< img src="product_analytics/analytics/visualize/analytics-geomap-1.png" alt="Analytics チャートビルダーにおけるジオマップチャートの表示。" style="width:90%;">}}