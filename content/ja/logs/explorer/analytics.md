---
aliases:
- /ja/logs/explorer/group
- /ja/logs/group
description: 情報を取得または統合するために、クエリされたログを上位レベルのエンティティにグループ化します。
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
kind: documentation
title: ログ分析
---

## 概要

ログは個々のイベントとしても価値がありますが、イベントのサブセットに価値ある情報が存在する場合もあります。この情報を公開するには、ログを[フィールド](#fields)でグループ化したり、[パターン](#patterns)を特定したり、ログを[トランザクション](#transactions)に集計したりします。

ログクエリエディターで、クエリしたログの集計を切り替えることができます。ログのグループ化、集計、測定のために選択したフィールドは、異なる表示や集計の種類を切り替えても保存されます。

{{< img src="logs/explorer/aggregations.jpg" alt="ログを棒グラフで表示し、フィールド、パターン、トランザクションにグループ化するオプションを提供" style="width:100%;" >}}

[複数のクエリ](#multiple-queries)を追加して異なるログを同時に分析したり、クエリに[数式](#formulas)や[関数](#functions)を適用して詳細な分析が可能です。

**注**: 集計は**インデックス化されたログのみ**でサポートされます。インデックス化されていないログで集計を実行する必要がある場合は、[ログからメトリクス][2]を使用するか、アーカイブで[リハイドレート][3]を実行して、[除外フィルターを一時的に無効にする][1]ことを検討してください。

## フィールド

フィールドで集計する場合、クエリフィルターに一致するすべてのログが、1 つまたは複数のログファセットの値に基づいてグループに集計されます。この集計に加えて、次のメジャーを抽出できます。

- グループごとの**ログの数**
- グループごとのファセットのコード化された値の**一意の数**
- グループごとのファセットの数値に対する**統計演算** (`min`、`max`、`avg`、`percentiles`)

**注**: 単一のファセットに対して複数の値を持つ個々のログは、その数の集計に属します。たとえば、`team:sre` タグと `team:marketplace` タグを持つログは、`team:sre` 集計で 1 回、`team:marketplace` 集計で 1 回カウントされます。

フィールド集計は、[上位リスト][4]の視覚化の 1 つのディメンションをサポートし、[時系列][5]、[テーブル][6]の視覚化の最大 4 ディメンションをサポートします。複数のディメンションがある場合、上位の値は最初のディメンションに基づき決定されます。その後最初のディメンション内の上位値内の 2 番めのディメンション、次に 2 番目のディメンション内の上位値内の 3 番めのディメンションに基づき決定されます。

### 複数のクエリ

[時系列][5]、[上位リスト][4]の視覚化で、複数のクエリに対応しました。クエリエディタの横にある `+ Add` ボタンをクリックすることで、複数のクエリを追加できます。新しいクエリを追加すると、直前のクエリとそのグループ化オプションがコピーされます。

{{< img src="logs/explorer/group/add_multiple_queries.mp4" alt="クエリエディターで複数のクエリを追加する方法を説明するユーザー" video=true style="width:100%;" >}}

クエリエディター内の文字をクリックして、現在の視覚化に表示するクエリを選択または選択解除することができます。

{{< img src="logs/explorer/group/select_multiple_queries.jpg" alt="クエリエディターには 2 つのクエリがあり、1 つは A、もう 1 つは B とラベル付けされています" style="width:100%;" >}}

デフォルトでは、新しいクエリが追加されると、選択した視覚化で表示するように自動的に選択されます。

タイムラインを表示するには、`Timeline for` ドロップダウンでそのクエリを選択します。`Use facets with` ドロップダウンでクエリを選択し、[ファセットパネル][7]で値をクリックすると、検索クエリの 1 つをスコープすることができます。選択されたクエリのみが、選択されたファセットで更新されます。

{{< img src="logs/explorer/group/query_selector.jpg" alt="クエリエディターがセレクタのタイムラインを表示し、クエリ A とクエリ B のドロップダウンオプションがあります" style="width:100%;" >}}

### 関数

**注**: 関数は、[時系列][5]と[上位リスト][4]の視覚化のみサポートされています。

クエリエディターで `Fields` 集計をクリックして、ログに関数を適用します。オプションで関数を適用するファセットフィールドを選択し、そのメジャーの横にある `Σ` アイコンをクリックします。選択したログフィールドに適用する関数を選択または検索します。

{{< img src="logs/explorer/group/add_function.mp4" alt="クエリエディターを使った関数のカスタマイズを実演するユーザー" video=true style="width:100%;" >}}

ダッシュボードのグラフエディターでログに使用できるすべての関数は、ログエクスプローラーでログに適用することができます。

- [算術演算][8]
- [補間][9]
- [タイムシフト][10]
- [レート][11]
- [スムーシング][12]
- [ロールアップ][13]
- [除外][14]

これは、[除外関数][14]を適用してログの特定の値を除外する方法の例です。

{{< img src="logs/explorer/group/exclusion_function_logs.jpg" alt="カットオフの分除外フィルターを 100 に設定したクエリ" style="width:100%;" >}}

### 数式

クエリエディターの横にある `+ Add` ボタンをクリックして、1 つまたは複数のクエリに数式を適用します。次の例では、式を使用して、`Merchant Tier: Enterprise` / `Merchant Tier: Premium` の顧客のログにある `Cart Id` の一意の数の比率を計算します。

{{< img src="logs/explorer/group/multiple_query_formula.jpg" alt="クエリ A をクエリ B で割る計算式のあるクエリエディター" style="width:100%;" >}}

**注**: 複数のクエリで数式を適用するには、すべてのクエリが同じファセットでグループ化されている必要があります。上記の例では、両方のクエリが `Webstore Store Name` によってグループ化されています。

関数を数式に適用するには、`Σ` アイコンをクリックします。ここでは、全ログに占めるエラーログの割合に[タイムシフト関数][10]を適用し、現在のデータと 1 週間前のデータを比較する例を示します。

{{< img src="logs/explorer/group/timeshift_function_logs.jpg" alt="前週のタイムシフト関数を適用した数式を表示したクエリエディター" style="width:100%;" >}}

## パターン

パターン集計では、類似した構造を持つ `message` を持つログは、まとめてグループ化されます。オプションで 1～3 つのファセットフィールドを選択すると、ログをグループに事前集計してから、そのグループ内でパターンを検出することができます。

パターンビューは、他の問題を見過ごす原因となるノイズの多いエラーパターンを検出し、フィルタリングするのに役立ちます。

{{< img src="logs/explorer/aggregations_patterns.png" alt="ログをパターン別に分類して表示するログエクスプローラー" style="width:80%;" >}}

**注**: パターンは、10,000 個のログサンプルに基づいて検出されます。ログを一部分に制限してパターンを表示するには、検索を絞り込みます。

パターンは、[リスト集計][15]の視覚化をサポートします。リスト内のパターンをクリックすると、パターンのサイドパネルが開き、次のことができます。

- そのパターンからログのサンプルにアクセスする
- 検索フィルターを追加して、このパターンからのログのみにスコープを絞る
- [grok パースルール][3]のキックスタートを取得して、そのパターンの構造化された情報ログを抽出する

{{< img src="logs/explorer/patterns_side_panel.jpg" alt="すべて表示ボタンとパースルールがハイライトされた状態のログサイドパネル" style="width:80%;" >}}

### Pattern Inspector

Pattern Inspector を使用すると、検索クエリに基づいて、ログパターンの集計の基礎となる値の視覚化された内訳を得ることができます。たとえば、問題を調査している場合、何台のホストが関係しているか、どのリージョンまたはデータセンターが影響を受けているかを確認することができます。

{{< img src="logs/explorer/group/inspect_values.png" alt="数値の分布を棒グラフで示したグラフ" style="width:70%;" >}}

Pattern Inspector を使うには

1. [ログエクスプローラー][16]に移動します。
2. **Group into** セクションの **Patterns** をクリックします。パターンのリストでは、メッセージセクションの集計値が黄色でハイライトされています。集計値の上にカーソルを置くと、その値の視覚的な分布のプレビューが表示されます。
3. 集計値をクリックすると、ログパターンのサイドパネルが開き、**Pattern Inspector** タブで詳細を見ることができます。

{{< img src="logs/explorer/group/pattern_inspector_panel.png" alt="Pattern Inspector タブを表示したパターンパネル" style="width:50%;" >}}

## トランザクション

トランザクションは、ユーザーセッションや複数のマイクロサービスで処理されたリクエストなど、イベントの**シーケンス**のインスタンスに従ってインデックス化されたログを集計します。たとえば、e コマース Web サイトは、カタログ検索、カートへの追加、チェックアウトなどのさまざまなユーザーアクションにわたってログをグループ化し、`requestId` や `orderId` などの共通属性を使用してトランザクションビューを構築します。

{{< img src="logs/explorer/aggregations_transactions.jpg" alt="ログをトランザクション別に分類して表示するログエクスプローラー" style="width:80%;" >}}

**注**: トランザクションの集計は、クエリに一致するログだけでなく、関連するトランザクションに属するすべてのログも含まれるという意味で、自然なグループの集計とは異なります。

- **Duration**: トランザクションの最後のログと最初のログのタイムスタンプの差。_このメジャーは自動的に追加されます_。
- トランザクションのログで見つかった**最大重大度**。_このメジャーは自動的に追加されます_。
- **重要な項目の検索:** 文字列値を持つ任意の `facet` について、`count unique`、`latest`、`earliest`、`most frequent` の操作を使用して、特定のログ情報を計算します。
- **統計の取得:** 任意の `measure` について、`min`、`max`、`avg`、`sum`、`median`、`pc75`、`pc90`、`pc95`、`pc99` の操作を使用して統計情報を計算します。
- **Set Start and End Conditions:** トランザクションの開始と終了を個別のクエリで指定し、トランザクションの境界をカスタマイズできます。

トランザクションは、[リスト集計][15]の視覚化をサポートします。リスト内のトランザクションをクリックすると、トランザクションのサイドパネルが開き、次のことができます。

- そのトランザクション内のすべてのログにアクセスする
- そのトランザクション内の特定のログを検索する

{{< img src="logs/explorer/transactions_side_panel.png" alt="選択したトランザクション内のログを表示するトランザクションログパネル" style="width:80%;" >}}

開始条件または終了条件を使用してトランザクションを定義する場合、リスト内のトランザクショングループをクリックすると、トランザクショングループのサイドパネルが表示され、以下の操作が可能です。

- そのトランザクショングループ内のトランザクションに順番にアクセスする
- 各トランザクション内のすべてのログにアクセスする
- 各トランザクションの統計情報とトランザクショングループ全体の統計情報のサマリーを表示する

{{< img src="logs/explorer/transaction_group_side_panel.png" alt="選択されたグループ内のトランザクションを順番に表示するトランザクショングループパネル" style="width:50%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/guide/custom_time_frames
[2]: /ja/logs/logs_to_metrics
[3]: /ja/logs/log_configuration/processors/#grok-parser
[4]: /ja/logs/explorer/visualize/#top-list
[5]: /ja/logs/explorer/visualize/#timeseries
[6]: /ja/logs/explorer/visualize/#nested-tables
[7]: /ja/logs/explorer/facets/#facet-panel
[8]: /ja/dashboards/functions/arithmetic
[9]: /ja/dashboards/functions/interpolation
[10]: /ja/dashboards/functions/timeshift
[11]: /ja/dashboards/functions/rate
[12]: /ja/dashboards/functions/smoothing
[13]: /ja/dashboards/functions/rollup
[14]: /ja/dashboards/functions/exclusion
[15]: /ja/logs/explorer/visualize/#list-aggregates-of-logs
[16]: https://app.datadoghq.com/logs