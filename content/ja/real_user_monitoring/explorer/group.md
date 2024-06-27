---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: イベント検索
title: RUM イベントのグループ化
---

## 概要

Real User Monitoring (RUM) のイベントは、個々でも集合体でも価値があります。検索クエリには、イベントのサブセットを集計するための情報が含まれています。

{{< img src="real_user_monitoring/explorer/group_into_fields-2.png" alt="検索クエリのフィールドセクションにグループ化する" style="width:100%;" >}}

視覚化タイプを切り替えても、イベントのグループ化、集計、測定に使用するフィールドの選択は保持されます。

## フィールド別集計

フィルタークエリに一致するすべての RUM イベントは、1 つまたは複数のイベントファセットの値に基づいてグループに集計されます。集計に加えて、以下のメジャーを抽出できます。

- グループごとのイベント数

  {{< img src="real_user_monitoring/explorer/group-count-of-events.png" alt="イベント数でグループ化" style="width:90%;" >}}

- グループごとのファセットのコード化された値の一意の数

  {{< img src="real_user_monitoring/explorer/group-unique-count-coded-values-2.png" alt="コード化された値のユニークカウントでグループ化" style="width:90%;" >}}

- グループごとのファセットの数値に対する統計演算 (最小値、最大値、平均値、パーセンタイルなど)

  {{< img src="real_user_monitoring/explorer/group-statistical-operations-2.png" alt="統計演算を利用してフィールドにグループ化" style="width:90%;" >}}

1 つのファセットに対して複数の値を持つ個々のイベントは、その数だけ集計に属します。例えば、`country:france` と `browser:chrome` の属性を持つ RUM イベントは、`country:france` 集計と `browser:chrome` 集計に一度ずつカウントされます。

**Group into fields** 集計は、[トップリスト][1]の視覚化では 1 次元、[時系列][2]、[リスト][3]および[テーブル][4]の視覚化では最大 3 次元までサポートします。複数の次元がある場合は、1 次元目の値を基準に上位の値を決定し、次に 1 次元目の上位の値の範囲内で 2 次元目を決定し、さらに 2 次元目の上位の値の範囲内で 3 次元目を決定する、といった具合になります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/explorer/visualize#top-list
[2]: /ja/real_user_monitoring/explorer/visualize#timeseries
[3]: /ja/real_user_monitoring/explorer/visualize#lists
[4]: /ja/real_user_monitoring/explorer/visualize#nested-tables