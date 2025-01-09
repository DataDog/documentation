---
aliases:
- /ja/logs/explorer/group
- /ja/logs/group
description: クエリされたログをフィールド、パターン、トランザクションにグループ化し、複数の検索クエリ、計算式、関数を作成して詳細な分析が可能です。
further_reading:
- link: logs/explorer/search
  tag: Documentation
  text: ログの絞り込み
- link: logs/explorer/visualize
  tag: Documentation
  text: ログから視覚化を作成する
- link: /logs/explorer/export
  tag: Documentation
  text: ログエクスプローラーのビューをエクスポート
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables/
  tag: ブログ
  text: リファレンステーブルでログにさらなるコンテキストを追加
title: ログ分析
---

## 概要

ログは個々のイベントとして価値がある場合がありますが、価値のある情報がイベントのサブセットに存在する場合もあります。

{{< whatsnext desc="この情報を公開するために、ログを以下のようにグループ化できます。" >}}
    {{< nextlink href="logs/explorer/analytics/#group-logs-by-fields" >}}フィールド{{< /nextlink >}}
    {{< nextlink href="logs/explorer/analytics/patterns" >}}パターン{{< /nextlink >}}
    {{< nextlink href="logs/explorer/analytics/transactions" >}}トランザクション{{< /nextlink >}}
{{< /whatsnext >}}

ログクエリエディターで、クエリしたログの集計を切り替えることができます。ログのグループ化、集計、測定のために選択したフィールドは、異なる表示や集計の種類を切り替えても保存されます。

{{< img src="logs/explorer/aggregations.jpg" alt="ログを棒グラフで表示し、フィールド、パターン、トランザクションにグループ化するオプションを提供" style="width:100%;" >}}

[複数のクエリ](#multiple-queries)を追加して異なるログを同時に分析したり、クエリに[数式](#formulas)や[関数](#functions)を適用して詳細な分析が可能です。

集計は**インデックス化されたログのみ**でサポートされます。インデックス化されていないログで集計を実行する必要がある場合は、[ログベースのメトリクス][2]を生成するか、アーカイブで[リハイドレート][3]を実行して、[除外フィルターを一時的に無効にする][1]ことを検討してください。

## フィールドによるログのグループ化

インデックス化されたログを**フィールド**で集計する場合、クエリフィルターに一致するすべてのログは、クエリ検索値に基づいてグループに集計されます。

これらの集計の上で、次のメジャーを抽出することができます。

- グループごとの**ログの数**
- グループごとのクエリ検索値に対する**一意のコード化された値の数** (UI では`count unique of` として表示されます)
- グループごとのクエリ検索値の数値に対する**統計演算** (`min`、`max`、`avg`、`percentiles`)

複数のクエリ検索値を持つ個々のログは、その数の集計に属します。たとえば、`team:sre` タグと `team:marketplace` タグを持つログは、`team:sre` 集計で 1 回、`team:marketplace` 集計で 1 回カウントされます。

### ロググループを視覚化する

**フィールド**集計は、[上位リスト][4]の視覚化では 1 次元、[時系列][5]、[テーブル][6]、[ツリーマップ][7]、[パイチャート][8]の視覚化では最大 4 次元までサポートしています。

複数のディメンションがある場合、上位の値は最初のディメンションに基づき決定されます。その後最初のディメンション内の上位値内の 2 番めのディメンション、次に 2 番目のディメンション内の上位値内の 3 番めのディメンションに基づき決定されます。

### 複数のクエリ

[時系列][5]、[テーブル][6]の視覚化で、複数のクエリに対応しました。クエリエディタの横にある `+ Add` ボタンをクリックすることで、複数のクエリを追加できます。新しいクエリを追加すると、直前のクエリとそのグループ化オプションがコピーされます。

{{< img src="logs/explorer/group/add_multiple_queries.mp4" alt="クエリエディターで複数のクエリを追加する方法を説明するユーザー" video=true style="width:100%;" >}}

クエリエディター内の文字をクリックして、現在の視覚化に表示するクエリを選択または選択解除することができます。

{{< img src="logs/explorer/group/select_multiple_queries.jpg" alt="クエリエディターには 2 つのクエリがあり、1 つは A、もう 1 つは B とラベル付けされています" style="width:100%;" >}}

デフォルトでは、新しいクエリが追加されると、選択した視覚化で表示するように自動的に選択されます。

タイムラインを表示するには、`Timeline for` ドロップダウンでそのクエリを選択します。`Use facets with` ドロップダウンでクエリを選択し、[ファセットパネル][9]で値をクリックすると、検索クエリの 1 つをスコープすることができます。選択されたクエリのみが、選択されたファセットで更新されます。

{{< img src="logs/explorer/group/query_selector.jpg" alt="クエリエディターがセレクタのタイムラインを表示し、クエリ A とクエリ B のドロップダウンオプションがあります" style="width:100%;" >}}

### 関数

関数はすべての視覚化でサポートされています。

クエリエディターで `Fields` 集計をクリックして、ログに関数を適用します。オプションで関数を適用するファセットフィールドを選択し、そのメジャーの横にある `Σ` アイコンをクリックします。選択したログフィールドに適用する関数を選択または検索します。

{{< img src="logs/explorer/group/add_function.mp4" alt="クエリエディターを使った関数のカスタマイズを実演するユーザー" video=true style="width:100%;" >}}

ダッシュボードのグラフエディターでログに使用できるすべての関数は、ログエクスプローラーでログに適用することができます。

- [算術演算][10]
- [補間][11]
- [タイムシフト][12]
- [レート][13]
- [スムーシング][14]
- [ロールアップ][15]
- [除外][16]

これは、[除外関数][16]を適用してログの特定の値を除外する方法の例です。

{{< img src="logs/explorer/group/exclusion_function_logs.jpg" alt="カットオフの分除外フィルターを 100 に設定したクエリ" style="width:100%;" >}}

### 数式

クエリエディターの横にある `+ Add` ボタンをクリックして、1 つまたは複数のクエリに数式を適用します。次の例では、式を使用して、`Merchant Tier: Enterprise` / `Merchant Tier: Premium` の顧客のログにある `Cart Id` の一意の数の比率を計算します。

{{< img src="logs/explorer/group/multiple_query_formula.jpg" alt="クエリ A をクエリ B で割る計算式のあるクエリエディター" style="width:100%;" >}}

複数のクエリで数式を適用するには、すべてのクエリが同じクエリ検索値でグループ化されている必要があります。上記の例では、両方のクエリが `Webstore Store Name` によってグループ化されています。

関数を数式に適用するには、`Σ` アイコンをクリックします。ここでは、全ログに占めるエラーログの割合に[タイムシフト関数][12]を適用し、現在のデータと 1 週間前のデータを比較する例を示します。

{{< img src="logs/explorer/group/timeshift_function_logs.jpg" alt="前週のタイムシフト関数を適用した数式を表示したクエリエディター" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/indexes/#switch-off-switch-on
[2]: /ja/logs/logs_to_metrics
[3]: /ja/logs/log_configuration/rehydrating/
[4]: /ja/logs/explorer/visualize/#top-list
[5]: /ja/logs/explorer/visualize/#timeseries
[6]: /ja/logs/explorer/visualize/#nested-tables
[7]: /ja/dashboards/widgets/treemap
[8]: /ja/dashboards/widgets/pie_chart
[9]: /ja/logs/explorer/facets/#facet-panel
[10]: /ja/dashboards/functions/arithmetic
[11]: /ja/dashboards/functions/interpolation
[12]: /ja/dashboards/functions/timeshift
[13]: /ja/dashboards/functions/rate
[14]: /ja/dashboards/functions/smoothing
[15]: /ja/dashboards/functions/rollup
[16]: /ja/dashboards/functions/exclusion
