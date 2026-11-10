---
aliases:
- /ja/llm_observability/improve/experiments/analyzing_results/
- /ja/llm_observability/experiments/analyzing_results/
description: Agent Observability のオフライン実験結果を分析する方法
title: オフライン実験結果を分析する
---
このページでは、Datadog のオフライン実験 UI およびウィジェットで Agent Observability のオフライン実験結果を分析する方法を説明します。

実験を実行した後、結果を分析してパフォーマンスの傾向を把握し、問題のあるレコードを調査できます。

## Datadog における実験ページの使用 {#using-the-experiment-page-in-datadog}

オフライン実験ページで実験をクリックすると、詳細が表示されます。

{{< ui >}}Summary{{< /ui >}} セクションには、実験の実行中に記録された評価、概要評価、メトリクスが含まれます。

各値はそのタイプに基づいて集計されます。
- **ブール値**: 記録されたすべての値に対する `True` の割合として集計されます。
- **スコア**: 記録されたすべての値の平均として集計されます。
- **カテゴリー別**: 最頻値 (分布内で最も頻繁に出現する値) として集計されます。

{{< ui >}}Records{{< /ui >}} セクションには、データセット入力に対するタスクの実行に関連するトレースが含まれます。各トレースには、エージェントからの情報のフローを示すスパンのリストが含まれます。

(左側の) ファセットを使用して、評価結果に基づいてレコードをフィルタリングし、パターンを明らかにすることができます。

### 結果テーブルのカスタマイズ {#customizing-the-results-table}

各トレースを個別に開かなくても、実験結果テーブルをカスタマイズして最も重要なフィールドを表示できます。

#### 列ピッカー {#column-picker}

列ピッカーを使用して、列の表示/非表示を切り替えたり、ドラッグして並べ替えたりできます。デフォルトでは、テーブルを見やすくするために、生の JSON ブロブの列 (入力、出力、想定される出力) は非表示になっています。いつでも切り替えて戻すことができます。

このテーブルには、各実験の実行対象となったデータセットレコードを示す {{< ui >}}Record ID{{< /ui >}} 列が含まれます。レコードごとに複数回実行されるオフライン実験では、レコードを展開して、その下にあるすべての実行結果を表示します。

#### カスタム列 {#custom-columns}

入力キー、出力キー、メタデータキーなどの特定のフィールドをトップレベルの実験スパンから抽出し、専用のテーブル列として表示します。これにより、レコード間の主要なプロパティを一目で比較できます。

カスタム列を追加するには、テーブル上部の {{< ui >}}Add Column{{< /ui >}} 入力欄にフィールドパスを入力します。

| ソース          | パス形式                    | 例                          |
| --------------- | ------------------------------ | -------------------------------- |
| 入力           | `@meta.input.<key>`           | `@meta.input.user_query`        |
| 出力          | `@meta.output.<key>`          | `@meta.output.result.status`    |
| 想定される出力 | `@meta.expected_output.<key>` | `@meta.expected_output.answer`  |
| メタデータ        | `@meta.metadata.<key>`        | `@meta.metadata.scenario_type`  |
| タグ             | `<tag_key>`                    | `env`                            |

複数のカスタム列を追加し、ドラッグアンドドロップで並べ替えることができます。列の構成は、プロジェクトごとにブラウザのローカルストレージに保存されます。

#### スパン詳細からのクイックアクション {#quick-actions-from-the-span-detail}

スパン詳細サイドパネルでルートスパンを表示しているときは、パスを手動で入力する代わりに、コンテキストメニューから直接フィールドに対して操作を実行できます。

JSON フィールド (入力、出力、想定される出力、メタデータ) では以下のオプションを使用できます。

- {{< ui >}}Copy key path{{< /ui >}}: フィールドのパス全体 (例: `@meta.input.user_query`) をコピーします。これにより、カスタム列の入力欄、検索バー、またはダッシュボードウィジェットのクエリに貼り付けることができます。
- {{< ui >}}Add column{{< /ui >}}: ワンクリックで結果テーブルのカスタム列としてフィールドを追加します。
- {{< ui >}}Filter by / Exclude{{< /ui >}}: フィールドのキーと値のペアを検索クエリに追加し、一致するレコードを絞り込んだり除外したりします。リーフ値 (文字列、数値、ブール値) でのみ利用可能です。

タグで利用可能なオプションは次のとおりです。

- {{< ui >}}Copy key{{< /ui >}}: タグキーをコピーします (例: `env`)。
- {{< ui >}}Copy to clipboard{{< /ui >}}: 値を含むタグ全体をコピーします (例: `env:prod`)。
- {{< ui >}}Add column{{< /ui >}}: 結果テーブルにカスタム列としてタグキーを追加します。
- {{< ui >}}Filter by / Exclude{{< /ui >}}: 検索クエリにタグのキーと値のペアを追加します。

<div class="alert alert-info">これらのアクションはトレースのルートスパンで利用可能です。</div>

### 特定のレコードの検索 {#searching-for-specific-records}

検索バーを使用して、プロパティ (データセットレコードデータ) または実験の結果 (出力および評価) に基づいて特定のレコードを検索できます。検索はトレースレベルで実行されます。

{{< img src="llm_observability/experiments/exp_details_search.png" alt="Agent Observability、実験の詳細のフォーカス。見出し: 「検索バーの強調表示」。" style="width:100%;" >}}

<div class="alert alert-info">より多くのデータにアクセスするには、 <code>ddtrace-py >= 4.1.0</code>にアップデートしてください。このバージョンには以下の変更が含まれるためです。

<ul>
<li>オフライン実験のスパンには、データセットレコードのメタデータが含まれます。</li>
<li>オフライン実験のスパンの <code>input</code>、<code>output</code>、および <code>expected_output</code> フィールドはそのまま保存されます (つまり、JSON として出力された場合はクエリ可能な JSON として保存されます) </li>
<li>オフライン実験のスパンと子スパンは、 <code>dataset_name</code>、<code>project_name</code>、<code>project_id</code>、<code>experiment_name</code> でタグ付けされ、検索しやすくなります。</li>
</ul></div>

#### キーワードでトレースを検索する {#find-traces-by-keyword}
キーワードによる検索では、利用可能なすべての情報 (入力、出力、想定される出力、メタデータ、タグ) を対象に検索が実行されます。

#### 評価でトレースを検索する {#find-traces-by-evaluation}

評価でトレースを検索するには、以下を検索します。`@evaluation.<name>.value:<criteria>`

| 評価タイプ | 検索語の例 |
| --------------- | ----------- |
| ブール値         | `@evaluation.has_risk_pred.value:true` |
| スコア           | `@evaluation.correctness.value:>=0.35` |
| カテゴリー別     | `@evaluation.violation.value:(not_fun OR not_nice)` |

#### 実験ステータスでトレースを検索する {#find-traces-by-experiment-status}

実験ステータスでトレースを検索するには、以下を検索します。`@experiment.status:<status>`

| ステータス | 検索語の例 |
| ------ | ------------------- |
| 実行中 | `@experiment.status:running` |
| 完了 | `@experiment.status:completed` |

#### メトリクスでトレースを検索する {#find-traces-by-metric}

オフライン実験では、所要時間、トークン数、コストメトリクスが自動的に収集されます。

| メトリクス               | 検索語の例 |
| -------------------- | ------------------- |
| 所要時間 | `@duration:>=9.5s ` |
| トークン数          | `@trace.total_tokens:>10000` |
| 推定合計コスト<br/> (ナノドル単位。1 ナノドル = 10<sup>-9</sup> ドル) | `@trace.estimated_total_cost:>10000000` |


#### タグでトレースを検索する {#find-traces-by-tag}

タグを使用してトレースを検索するには、`<tag>:<value>` を検索します。例: `dataset_record_id:84dfd2af88c6441a856031fc2e43cb65 `。

利用可能なタグを確認するには、トレースを開いてタグを見つけます。

{{< img src="llm_observability/experiments/side-panel-tag.png" alt="Agent Observability、実験トレースサイドパネル。トレースタグの場所を強調表示しています。" style="width:100%;" >}}


#### 入力、出力、想定される出力、またはメタデータでトレースを検索する {#find-traces-by-input-output-expected-output-or-metadata}

入力、出力、想定される出力、またはメタデータ内の特定のキーをクエリするには、そのプロパティを JSON として出力する必要があります。

| プロパティ | 形式 | 検索語の例 |
| -------- | ------ | ------------------- |
| 入力 | `@meta.input.<key1>.<subkey1>:<value>` | `@meta.input.origin.country:"France"` |
| 出力 | `@meta.output.<key1>.<subkey1>:<value>` | `@meta.output.result.status:"success"` |
| 想定される出力 | `@meta.expected_output.<key1>.<subkey1>:<value>` | `@meta.expected_output.answer:"correct"`|
| メタデータ | `@meta.metadata.<key1>.<subkey1>:<value>` | `@meta.metadata.source:generated` |


##### JSON 配列のクエリ {#querying-json-arrays}
単純な配列は文字列としてフラット化されるため、クエリを実行できます。

**例 1**: クエリが可能な JSON 配列

```
"output": {
  "action_matches": [
        "^/cases/settings$",
        "^Create Case Type$",
        "^/cases$"
    ],
}
```

この配列の例では、`@meta.output.action_matches:"^/cases/settings$"` を検索することでクエリできます。

**例 2**: クエリが不可能な JSON 配列

```
"output": {
  "expected_actions": [
    [
      "bonjour",
      "a_bientot"
    ],
    [
      "todobem",
      "click here"
    ]
  ],
}
```

この例では配列がネストされているため、クエリを実行できません。

## オフライン実験データでのウィジェットの使用 {#using-widgets-with-offline-experiments-data}

オフライン実験データを使用して、ダッシュボードやノートブックでウィジェットを作成できます。
Datadog では、以下を推奨しています。
- データセットレコードのメタデータに、データのスライスに役立つ可能性のあるすべての追加情報 (例: 難易度、言語など) を入力する
- タスクが JSON オブジェクトを出力するように設定する
- `ddtrace-py` をバージョン 4.1.0 以上に更新する


オフライン実験 データを使用してウィジェットを構築するには、データソースとして {{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Offline Experiments{{< /ui >}} を使用します。その後、[このページの検索構文](#searching-for-specific-records)を使用して、プロットするイベントを絞り込みます。

レコードレベルのデータ集計には {{< ui >}}Traces{{< /ui >}} を使用し、それ以外の場合は {{< ui >}}All Spans{{< /ui >}} を使用します。

実行中または完了したオフライン実験間でメトリクスを比較するには、`@experiment.status` でグループ化またはフィルタリングします。

### ウィジェットの例 {#widget-examples}
#### メタデータフィールドごとに分類された経時的なパフォーマンスのプロット {#plotting-performance-over-time-broken-down-by-a-metadata-field}
{{< img src="llm_observability/experiments/widget-metadata.png" alt="オフライン実験データを使用したウィジェット。メタデータフィールドごとに分類された経時的なパフォーマンスを示すグラフ。" style="width:100%;" >}}

<div class="alert alert-info">ブール値評価の平均を計算する場合は、すべてのトレースで <code>True</code> に占める割合を手動で計算する必要があります。</div>

#### ツールの使用統計の表示 {#displaying-tool-usage-stats}
エージェントが特定のツールを呼び出すことが想定され、そのツールの呼び出し頻度や関連する統計を確認する必要がある場合:

{{< img src="llm_observability/experiments/widget-tool.png" alt="オフライン実験データを使用したウィジェット。複数のオフライン実験におけるツールの使用統計を示すグラフ。" style="width:100%;" >}}