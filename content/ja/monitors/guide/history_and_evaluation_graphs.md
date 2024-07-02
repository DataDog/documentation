---
title: Monitor History and Evaluation Graphs
disable_toc: false
further_reading:
- link: monitors/manage/status/
  tag: Documentation
  text: Learn more about the Monitor Status page
- link: monitors/guide/monitor_aggregators/
  tag: Documentation
  text: Learn more about Monitor aggregators
---

## 概要

[Monitor Status ページ][1]には、モニター評価に関する情報を提供する 2 つのグラフ、「履歴グラフ」と「評価グラフ」があります。このガイドでは以下を説明します。
- [履歴グラフと評価グラフの定義](#evaluation-vs-history-graph)
- [2 つのグラフが表示する値](#why-are-the-graphs-different)
- [評価グラフの結果をモニター外で再現する方法](#troubleshooting-evaluation-graph-values)


## 評価グラフと履歴グラフ

履歴グラフ
: モニタークエリに送信された生データポイントを表示します。モニターステータスページでは、ノートブックやダッシュボードで同じグラフウィジェットが使用されます。

評価グラフ
: ユーザー定義のアラート条件に基づいて適用されたメトリクスの生データポイントからの結果を表示します。このグラフのデータは評価ウィンドウにより集計・縮小されているため、クエリ結果は各データポイントのクエリ値ウィジェットに似ています。

Datadog に生データポイントを送信してモニタリングすると、この情報は履歴グラフで可視化されます。例えば、過去 5 分間にデータポイント [10, 15, 12, 8, 11] があったとします。履歴グラフにはそれぞれの値が表示されます。

{{< img src="monitors/guide/history_and_evaluation_graphs/history_graph_query_config.png" alt="履歴グラフが表示されるセクションをハイライトするモニターのメトリクスクエリ構成" style="width:100%;" >}}

クエリの評価を構成すると、モニターがアラートするメトリクス値に別の集計が追加されます。例えば、過去 5 分間の平均を評価するようにモニターを構成すると、評価グラフには 11.2 という値が 1 つのデータポイントとして表示されます。

`(10+15+12+8+11)/5 = 11.2`

{{< img src="monitors/guide/history_and_evaluation_graphs/eval_graph_evaluation_config.png" alt="評価グラフが表示されるセクションをハイライトするメトリクスモニターの評価構成" style="width:100%;" >}}


## グラフが異なる理由

通常、2 つのグラフは同じデータポイント値を可視化しているわけではありません。さらに、複数の他の要因が可視化グラフの違いを引き起こします。

### as_count() メトリクス

数式内に `as_count` メトリクスを含むクエリは、異なる評価パスを使用します。この評価では、式の前に集計が適用されます。例えば `A / B` を使用しており、どちらも `as_count` 評価パスを使用している場合、次のように評価されます。
```
(1+2+3+4+5) / (10+10+10+10+10)
```

詳細については、[モニター評価の as_count()][2] ガイドを参照してください。

### 数式の使用

数式を使用する場合、モニターは個々のクエリではなく、数式に対してモニター評価の集計関数を適用します。例えば、クエリで AVG (`avg by`) 集計関数を使用していても、評価構成で過去 X 分間の SUM (`sum by`) を使用している場合、編集ページや履歴グラフの値は評価グラフの値と一致しません。具体例については、[トラブルシューティング](#troubleshooting-different-graph-values)セクションを参照してください。

### Evaluation Delay

評価遅延を使用している場合、評価グラフと履歴グラフのタイミングが一致しません。例えば、5 分の評価遅延を追加した場合、履歴グラフの 5 分前のデータポイントを見て評価グラフと相関付ける必要があります。

### メトリクス集計方法

クエリで使用する集計方法や評価の集計方法によって、異なる結果が表示されることがあります。履歴ページと編集ページはクエリの集計方法を使用しますが、評価グラフは **Evaluate the** オプションで決定された集計方法を使用します。

モニターのセットアップで選択する集計方法によっては、編集ページで表示される値とは異なる値が表示されることがあります。例えば、モニターのクエリで AVG を使用しているが、過去 X 分/時間の MINIMUM 値でアラートを設定している場合、評価グラフには MIN 値が表示され、一方で履歴グラフや編集ページのグラフには AVG 値が表示されます。これは、モニターがメトリクスクエリで設定された集計方法ではなく、モニター評価で設定された集計方法でアラートを出しているためです。

## 評価グラフ値のトラブルシューティング

特定の時点でモニターが評価している内容を可視化するには、ノートブック[クエリ値ウィジェット][3]を使用します。モニターのクエリ (数式や関数を含む) を取得し、評価ウィンドウにグラフの時間枠を設定します。これにより、1 つのポイントに集計されたデータが表示されます。

次の例では、調査したい評価グラフの時間枠を選択します。評価グラフのデータポイントにカーソルを合わせると、その値と時刻が表示されます。例えば、評価グラフで 10:50:35 に `0.38` のデータポイントが表示されているのに対し、履歴グラフでは同じ時刻に `0.26` が表示されている理由を調査したい場合です。

この値のトラブルシューティングを行うには、モニター編集ページを開き、モニター構成を Notebook Query Value ウィジェットに転送します。

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshoot_monitor_eval_config.png" alt="過去 5 分間の p95 のクエリ集計と p95 のモニター評価集計を持つメトリクスを示す構成例" style="width:90%;" >}}

モニター編集ページの構成フィールド:
- メトリクスクエリ **a**: `proc.test_process.cpu.total_pct` p95 by (everything)
- モニター評価集計: クエリの `percentile (p95)` を評価
- モニター評価ウィンドウ: `last 5 minutes`

同じ構成を Notebook Query Value ウィジェットに転送します。
1. ウィジェットのドロップダウンには **Query Value** が表示されます。
1. トラブルシューティングするデータポイントに対応する時間枠を選択します。
1. モニター構成からメトリクスクエリを入力します: `proc.test_process.cpu.total_pct`。メトリクス集計 `p95 by` を追加します。
1. 評価がモニター評価 `percentile (p95)` と一致することを確認します。
1. クエリ値がモニターの評価データポイントと一致することを確認します。

| 構成                 | モニター     | Query Value ウィジェット |
| -------------                 | ----------- | ------------------ |
| メトリクスクエリ                  |{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_monitor_query.png" alt="過去 5 分間の p95 のクエリ集計と p95 のモニター評価集計を持つメトリクスを示す構成例" style="width:100%;" >}}|{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_widget_query.png" alt="メトリクスクエリに一致するフィールドをハイライトする Query Value ウィジェットの構成" style="width:100%;" >}}|
| モニター集計            |{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_monitor_aggregation.png" alt="p95 のクエリ集計を持つメトリクスが、p95 のモニター評価集計をハイライトする構成例" style="width:100%;" >}}|{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_widget_aggregation.png" alt="モニター集計に一致するフィールドをハイライトする Query Value ウィジェットの構成" style="width:100%;" >}}|
| 評価ウィンドウ            |{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_monitor_eval_window.png" alt="過去 5 分間のモニター評価ウィンドウをハイライトする p95 のクエリ集計を持つメトリクスを示す構成例" style="width:100%;" >}}|{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_widget_eval_window.png" alt="モニター評価ウィンドウに一致するフィールドをハイライトする Query Value ウィジェットの構成" style="width:100%;" >}}|

### 数式による評価グラフのトラブルシューティング

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formula_eval_graph.png" alt="カーソルを合わせたときに 13:55:29 に 9.17 のデータポイントを示す評価グラフ" style="width:100%;" >}}

この例では、Notebook Query Value ウィジェットを使用して、複数のクエリと数式を含むモニター評価グラフの値をトラブルシューティングします。評価グラフで調査したいデータポイントにカーソルを合わせます。この例では、13:55:29 に表示されている `9.17` の評価グラフの値をトラブルシューティングします。

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formula_monitor_config.png" alt="2 つのメトリクスクエリと、過去 5 分間のクエリの最小値を評価する数式「a+b」を表示するモニター構成" style="width:80%;" >}}

モニター編集ページの構成フィールド:
- メトリクスクエリ **a**: `proc.test_process.cpu.total_pct` avg by (everything)
- メトリクスクエリ **b**: `system.cpu.user` avg by (everything)
- モニター評価集計: クエリの `min` を評価
- モニター評価ウィンドウ: `last 5 minutes`

Notebook Query Value ウィジェットに同じ構成を 1 メトリクスずつ転送します。

**メトリクス a**
1. ウィジェットのドロップダウンには **Query Value** が表示されます。
1. 13:55:29 付近の 5 分間に対応する時間枠を選択します。この場合、13:50～13:55 (1:50〜1:55) です。
1. モニター構成からメトリクスクエリを入力します: `proc.test_process.cpu.total_pct`。メトリクス集計 `avg` を追加します。

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formulas_query_a.png" alt="avg 集計でメトリクスを表示する Query Value ウィジェット" style="width:80%;" >}}

**メトリクス b**
1. ウィジェットのドロップダウンには **Query Value** が表示されます。
1. 13:55:29 付近の 5 分間に対応する時間枠を選択します。この場合、13:50～13:55 (1:50〜1:55) です。
1. モニター構成からメトリクスクエリを入力します: `system.cpu.user`。メトリクス集計 `avg` を追加します。

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formulas_query_b.png" alt="avg 集計でメトリクスを表示する Query Value ウィジェット" style="width:80%;" >}}

モニター評価 `Min` は、過去 5 分間のクエリの最小値を取ります。

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshoot_formulas_multi_query.png" alt="avg メトリクス集計と min 評価集計でそれぞれ 2 つのクエリを表示する Query Value ウィジェット" style="width:80%;" >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/manage/status
[2]: /monitors/guide/as-count-in-monitor-evaluations/
[3]: /dashboards/widgets/query_value/
