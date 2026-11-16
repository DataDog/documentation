---
description: ファセットの内訳を追加して、Product Analytics クエリを複数の値に分割します。
title: Product Analytics イベントをグループ化します。
---
ファセットのないクエリは、ビューの合計数などの単一の値を返します。*ファセットの内訳*を追加して、その値をカテゴリに分割します。たとえば、合計ビューのクエリがある場合、国別のファセットの内訳を追加することで、どこからビューが発生しているかを確認できます。

## ファセットの内訳を追加します{#add-a-breakdown}

{{< ui >}}Add breakdown{{< /ui >}}をクリックして、1つのクエリに最大4つのファセットの内訳を追加します。各ファセットの内訳は、クエリビルダーの{{< ui >}}compared by{{< /ui >}}の下に行として表示されます。

ファセットの内訳を追加するたびに、結果はより小さな値に分割されます。たとえば、ブラウザと国の両方でファセットの内訳を表示するクエリでは、データ内のブラウザと国の組み合わせごとに1つのバケットが返されます（Chrome/米国、Chrome/ドイツなど）。

{{< img src="product_analytics/analytics/group/analytics-breakdown-1.png" alt="Product Analytics チャートビルダーでブラウザと国別にファセットの内訳を表示したクエリ。" style="width:90%;" >}}

## 指標を選択してください{#choose-a-measure}

デフォルトでは、クエリは{{< ui >}}All events{{< /ui >}}の数を測定します。

{{< img src="product_analytics/analytics/group/analytics-measure-count-1.png" alt="Product Analytics チャートビルダーにおける全イベントのデフォルトのカウント。" style="width:90%;" >}}

{{< ui >}}All events{{< /ui >}}を別の値に変更して、指定した値のユニークカウントを確認します。たとえば、{{< ui >}}Browser Name{{< /ui >}}を選択すると、ページを閲覧したブラウザのユニークカウントが返されます。

{{< img src="product_analytics/analytics/group/analytics-measure-count-unique-1.png" alt="Product Analytics チャートビルダーでのブラウザ別のユニークカウント。" style="width:90%;" >}}

指標を、読み込み時間などの数値ファセットの統計的集計に変更します。平均、最小、最大、中央値、合計、またはパーセンタイル（75、90、95、98、または99）から選択します。

{{< img src="product_analytics/analytics/group/analytics-measure-statistical-1.png" alt="Product Analytics チャートビルダーにおける読み込み時間の統計的集計オプション。" style="width:90%;" >}}