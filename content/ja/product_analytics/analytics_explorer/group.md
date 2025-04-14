---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: イベント検索
title: RUM イベントのグループ化
---

## 概要

Product Analytics のイベントは、個々でも集合全体でも価値があります。検索クエリには、イベントの一部を集計するための情報が含まれています。

{{< img src="product_analytics/analytics/group/group-overview.png" alt="検索クエリのフィールドセクションにグループ化する" style="width:100%;" >}}

視覚化タイプを切り替えても、イベントのグループ化、集計、測定に使用するフィールドの選択は保持されます。

## フィールド別集計

フィルタークエリに一致するすべての Product Analytics イベントは、1 つまたは複数のイベントファセットの値に基づいてグループに集計されます。集計に加えて、以下のメジャーを抽出できます。

- グループごとのイベント数

  {{< img src="product_analytics/analytics/group/group_count_of_events.png" alt="イベント数でグループ化" style="width:90%;" >}}

- グループごとのファセットのコード化された値の一意の数

  {{< img src="product_analytics/analytics/group/count-of-coded-values.png" alt="コード化された値のユニークカウントでグループ化" style="width:90%;" >}}

- グループごとのファセットの数値に対する統計演算 (最小値、最大値、平均値、パーセンタイルなど)

  {{< img src="product_analytics/analytics/group/group-statistical-operations.png" alt="統計演算を利用してフィールドにグループ化" style="width:90%;" >}}

1 つのファセットに複数の値を持つ個々のイベントは、その値の数だけ集計に含まれます。例えば、`country:france` と `browser:chrome` の属性を持つイベントは、`country:france` 集計と `browser:chrome` 集計にそれぞれ一度ずつカウントされます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}