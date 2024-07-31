---
description: スパンを一覧で表示したり、スパンを集計して時系列やトップリストなどにすることができます。
further_reading:
- link: tracing/trace_explorer/
  tag: ドキュメント
  text: トレースエクスプローラー
title: スパンの視覚化
---

## 概要

視覚化は、クエリされたスパンデータをどのように表示するかを定義します。個々のイベントの場合は**リスト**として、集計の場合は**時系列**または**トップリスト**として、価値ある情報を表示するために関連する視覚化を選択します。

## リストビュー

リストビューには、[検索バーのクエリ][1]フィルターと[時間範囲][2]で定義した、選択したコンテキストに合致するスパンのリストが表示されます。

テーブルで、どの情報を列として表示するかを選択します。列の管理は、以下のいずれかの方法で行います。

- テーブルのヘッダー行を操作して、列の**ソート**、*並べ替え**、*削除**を行う。
- 左側のファセットパネルからファセットを選択するか、特定のスパンをクリックした後にトレースサイドパネルから、フィールドの列を**追加**する。また、**Options** ボタンから列を追加することもできます。

{{< img src="tracing/trace_explorer/visualize/list_view_table_controls.mp4" alt="表示テーブルを構成する" video=true style="width:80%;">}}

リスト視覚化におけるスパンの既定の並べ替えは、タイムスタンプによるもので、最新のスパンが上に表示されます。メジャーの値が最小または最大のスパンを最初に表示したり、タグの値でスパンを辞書順にソートしたりするには、その列を **by** 列として指定します。


列のコンフィギュレーションは、トラブルシューティングコンテキストの他の要素と一緒に保存ビューに保存されます。

トレースが不正または不完全な場合、トレースの `Latency Breakdown` はいくつかのスパンについて欠落している可能性があります。例えば、エラーや稀なサンプラーは、完全なトレースをキャプチャする保証はありませんが、トレースの断片をキャプチャします。この場合、トレースが完全である場合にのみ意味をなす、一貫性のない誤解を招くレイテンシー情報の表示を避けるために、データが省略されます。

## Timeseries

時系列を使用して、選択した時間枠における[メジャー][3] (またはユニークなタグ値のカウント) の進化を視覚化し、オプションで最大 3 つのタグでデータを分割 (グループ化) することができます。

**注**: [ライブエクスプローラー][4] (15 分) では、1 つのディメンションのみでのグループ化が可能です。

集計ビューでは、追加のクエリオプションを使用して、**測定されたタグのディメンション**、クエリを**グループ化**するディメンション、および**集計期間**を定義します。例:

1. `Duration` メジャーを表示するように選択します。

   {{< img src="tracing/trace_explorer/visualize/group_by_measured_dimension.png" alt="測定されたディメンション" style="width:100%;">}}

2. `Duration` メジャーの集計関数を選択します。メジャーを選択すると集計関数が選択され、定性属性を選択すると一意のカウントが表示されます。

   {{< img src="tracing/trace_explorer/visualize/group_by_aggregation_function.png" alt="集計関数" style="width:100%;">}}

3. `Resource` などのディメンションでクエリをグループ化します。

   {{< img src="tracing/trace_explorer/visualize/group_by_dimension.png" alt="スプリットディメンション" style="width:100%;">}}

4. 選択されたタグに従って、トップまたはボトムのいずれかの数値を表示するかどうかを選択します。

    {{< img src="tracing/trace_explorer/visualize/group_by_top_bottom.png" alt="トップボトム X 値" style="width:100%;">}}

5. ロールアップ期間を、例えば `10min` のように選択します。

    {{< img src="tracing/trace_explorer/visualize/group_by_rollup_period.png" alt="ロールアップ期間" style="width:100%;">}}

次のトレースエクスプローラーの時系列ビューは、過去 4 時間における、サービス `shopist-web-ui` の上位 10 リソース名の、`Duration` の 95 パーセンタイルによる推移を表しています。

{{< img src="tracing/trace_explorer/visualize/timeseries_view.png" alt="時系列表示" style="width:100%;">}}

Choose additional display options for timeseries: the **roll-up interval**, whether you **display** results as **bars** (recommended for counts and unique counts), **lines** (recommended for statistical aggregations) or **areas**, and the **colorset**.

## Toplist

トップリストを使用して、スパンカウント、ユニークなタグ値のカウント、または 1 つのタグディメンションで分割されたメジャーを視覚化することができます。

例えば、次のトップリストは、過去 1 日間にチェックアウト時にエラーが発生した Web サイト顧客のうち、スパンカウントに基づく上位 10 名を示しています。

{{< img src="tracing/trace_explorer/visualize/top_list_view.png" alt="トップリストビュー" style="width:100%;">}}

## 表

選択したメジャーやスパン数に応じて、最大 3 つのディメンションの組み合わせから上位の値を視覚化するためのテーブルを使用します。

**注**: 1 つのディメンションでグループ化されたテーブルの視覚化は、表示が異なるだけで、トップリストと同じです。

以下のテーブルは、`Env`、`Service`、`Error type` ごとのエラースパンカウントを表しています。

{{< img src="tracing/trace_explorer/visualize/table_view.png" alt="テーブルビュー" style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_explorer/query_syntax/#search-syntax
[2]: /ja/tracing/trace_explorer/query_syntax/#time-range
[3]: /ja/tracing/trace_explorer/facets/#quantitative-facets-measures
[4]: /ja/tracing/trace_explorer/?tab=timeseriesview#live-search-for-15-minutes