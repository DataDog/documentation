---
title: RUM イベントのグループ化
kind: documentation
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: イベント検索
---

## 概要

Product Analytics events are valuable both individually and collectively. The search query contains information to aggregate a subset of events.

{{< img src="product_analytics/analytics/group/group-overview.png" alt="Group into fields section of the Search query" style="width:100%;" >}}

視覚化タイプを切り替えても、イベントのグループ化、集計、測定に使用するフィールドの選択は保持されます。

## フィールド別集計

All Product Analytics events that match your filter query are aggregated into groups based on the value of one or several event facets. You can extract the following measures in addition to the aggregates:

- グループごとのイベント数

  {{< img src="product_analytics/analytics/group/group_count_of_events.png" alt="Group by count of events" style="width:90%;" >}}

- グループごとのファセットのコード化された値の一意の数

  {{< img src="product_analytics/analytics/group/count-of-coded-values.png" alt="Group by unique count of coded values" style="width:90%;" >}}

- グループごとのファセットの数値に対する統計演算 (最小値、最大値、平均値、パーセンタイルなど)

  {{< img src="product_analytics/analytics/group/group-statistical-operations.png" alt="Group into fields using statistical operations" style="width:90%;" >}}

Individual events with multiple values for a single facet belong to that number of aggregates. For example, an event with the `country:france` and `browser:chrome` attributes are counted once in the `country:france` aggregate and once in the `browser:chrome` aggregate.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
