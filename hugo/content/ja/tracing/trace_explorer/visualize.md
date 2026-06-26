---
aliases:
- /ja/tracing/trace_search_and_analytics/request_flow_map
- /ja/tracing/trace_explorer/request_flow_map/
description: スパンを一覧で表示したり、スパンを集計して時系列やトップリストなどにすることができます。
further_reading:
- link: tracing/trace_explorer/
  tag: ドキュメント
  text: トレースエクスプローラー
- link: https://www.datadoghq.com/blog/apm-request-flow-map-datadog
  tag: ブログ
  text: リクエストフローマップについて
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

トレースが不正または不完全な場合、トレースの `Latency Breakdown` はいくつかのスパンで欠落している可能性があります。例えば、エラーサンプラーやレアサンプラーは、完全なトレースをキャプチャする保証なく、トレースの断片をキャプチャします。この場合、トレースが完全である場合にのみ意味をなす、一貫性のないまたは誤解を招くレイテンシー情報を表示するのを避けるために、データが省略されます。

クエリがエラー スパンでフィルタリングされている場合、個々のエラー スパンの代わりに [Error Tracking][5] の issue リストを表示するには、**Group into Issues** オプションを選択します。issue リスト内の任意の issue をクリックすると、issue パネルが開き、このエラー グループに関する追加情報にアクセスできます。

{{< img src="tracing/trace_explorer/visualize/trace_explorer_issue_grouping.png" alt="Error Tracking の issue のグループ化" style="width:100%;">}}

issue の詳細から `See all errors` をクリックすると、この issue の下にグループ化された個々のエラー スパンが表示されます。

**注**: フィンガー プリントのないエラー、すなわち関連する issue のないエラーを含め、個々のエラーを表示するには、グループ化の基準を `Errors` に戻します。

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

## リクエストフローマップ

[リクエスト フロー マップ][6]は、APM の [サービス マップ][7] と [ライブ探索][8] の機能を組み合わせて、スタック内のリクエスト パスを図示します。任意のタグの組み合わせでトレースの範囲を設定し、各サービス間のリクエストの流れを表す動的なマップを生成します。

{{< img src="tracing/live_search_and_analytics/request_flow_map/Overview.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="サービス間のリクエストの流れ、リクエスト時間、エラー レートを示すリクエスト フロー マップ" >}}

たとえば、リクエスト フロー マップを使用して、トラフィックの多いサービスを特定したり、特定のエンド ポイントに対するリクエストによって生成されたデータベース呼び出しの回数を追跡したりできます。[シャドウ デプロイ][9]やカスタム スパン タグとして設定された機能フラグを使用している場合、リクエスト フロー マップを使用して、リクエスト間のレイテンシーを比較し、コードの変更がパフォーマンスにどのような影響を与えるかを予測できます。

### リクエストフローマップの操作

- 2 つのサービスを接続するエッジにカーソルを合わせると、それらのサービス間のリクエスト、エラー、レイテンシーに関するメトリクスを見ることができます。**注**: ハイライト表示されたエッジは、最もスループットの高い接続、または最も一般的なパスを表します。

- **Export** をクリックすると、現在のリクエスト フロー マップの PNG 画像を保存できます。リアル タイムのアーキテクチャー ダイアグラムや、特定のユーザー フローに特化した図の作成に利用できます。

- マップ上の任意のサービスをクリックすると、そのサービスの健全性、パフォーマンス、インフラストラクチャー、およびランタイム メトリクスが表示されます。

{{< img src="tracing/live_search_and_analytics/request_flow_map/ServicePanel.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="選択したサービスのメトリクスとメタ データが表示された、リクエスト フロー マップのサイド パネル" >}}

- マップは表示されるサービスの数に基づいて適切なレイアウトを自動で選択します。レイアウトを切り替えるには、**Cluster** または **Flow** をクリックします。

- [RUM とトレースの接続][10]を行っている場合、RUM アプリケーションがリクエスト フロー マップに表示されます。

{{< img src="tracing/live_search_and_analytics/request_flow_map/RUMService.mp4" alt="リクエスト フロー マップで RUM アプリケーションのサービス詳細を確認する方法を示した動画" video=true style="width:100%;">}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_explorer/query_syntax/#search-syntax
[2]: /ja/tracing/trace_explorer/query_syntax/#time-range
[3]: /ja/tracing/trace_explorer/facets/#quantitative-facets-measures
[4]: /ja/tracing/trace_explorer/?tab=timeseriesview#live-search-for-15-minutes
[5]: /ja/tracing/error_tracking/
[6]: https://app.datadoghq.com/apm/flow-map
[7]: /ja/tracing/services/services_map/
[8]: /ja/tracing/trace_explorer/
[9]: /ja/tracing/services/deployment_tracking/#shadow-deploys
[10]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum