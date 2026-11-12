---
aliases:
- /ja/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/trace_level_evaluations/
- /ja/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations/
description: カスタム LLM-as-a-judge をトレース全体にわたって実行します。スパンスコープではなくトレーススコープを使用する状況の例も紹介します。
further_reading:
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
  tag: ドキュメント
  text: カスタム LLM-as-a-Judge 評価器
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating
  tag: ドキュメント
  text: プロンプトテンプレート
- link: /llm_observability/quickstart/terms/
  tag: ドキュメント
  text: Agent Observability の用語と概念
title: トレースレベルの評価器
---
トレースレベルの評価器はトレースごとに 1 回実行され、トレース内のすべてのスパンが 1 つのプロンプトで LLM ジャッジに与えられます。これは、質問の回答がスパン間の相互作用に応じて決まる場合 (エージェントが目標に到達したか、ツールが正しい順序で呼び出されたか、マルチターン会話がトピックから逸脱していないかなど) に最適な選択肢です。

対照的に、スパンレベルの評価器は一致するスパンごとに 1 回実行され、そのスパンの入力と出力のみを参照します。

## スパンスコープではなくトレーススコープを使用する場合 {#when-to-use-trace-scope-over-span-scope}

評価に複数のスパンからのコンテキストが必要な場合は {{< ui >}}Trace{{< /ui >}} スコープを使用します。

- 回答は、ツール呼び出しに続いて LLM の応答がそのツールの出力を使用するという一連のステップに依存します。
- ジャッジは、中間推論のコンテキストで最終的な回答を確認する必要があります。
- 「合格」は、トレース内で以前に発生した事象 (検索、ガードレール、拒否など) に応じて決まります。

評価が隔離されている 1 つのスパンから回答できる場合 (1 つの LLM 応答の品質のスコアリング、ルートスパンでのユーザーの意図の分類、またはツールが適切な形式の引数を受け取ったことの確認など) は、{{< ui >}}Span{{< /ui >}} スコープを使用します。

## ユースケースと例 {#use-cases-and-examples}

### 1. マルチステップエージェントの目標達成 {#1-goal-completion-for-a-multi-step-agent}

ツール呼び出しと推論ステップのシーケンス全体に基づいて、エージェントがユーザーの要求を完了したかどうかをスコアリングします。

**システムプロンプト**

```
You are evaluating an AI agent that helps users complete tasks. You will see the full trace of an agent run, including every LLM call, tool invocation, and intermediate response.

Your job is to decide whether the agent achieved the user's goal. Consider:
- Did the agent understand the user's request?
- Did the tool calls and reasoning steps actually progress toward the goal?
- Is the final response a complete answer, or does it leave the request unfinished?

Respond with one of: completed, partially_completed, failed.
```

**ユーザー**

```
// {{spans[0].meta.input.value}} → input of the trace's first span (the user goal).
User goal: {{spans[0].meta.input.value}}

// {{spans}} → JSON of every span in the trace, in order.
Agent steps:
{{spans}}
```

### 2. ツール使用の正確性 {#2-tool-use-correctness}

エージェントがユーザーの質問に対して適切な引数で正しいツールを呼び出したかどうかを確認します。

**システムプロンプト**

```
You will see a trace where an LLM agent decides which tool to call and with what arguments. Decide whether the chosen tool and its arguments were appropriate for the user's request.

Score from 1 (clearly wrong tool or arguments) to 5 (perfect tool choice and arguments).
```

**ユーザー**

```
// First span's input—the user's original question.
User question: {{spans[0].meta.input.value}}

// `[meta.span.kind:tool]` filter → keeps only spans whose kind is "tool".
// `.meta.input.parameters` → the arguments passed to each matching tool call.
Tool calls made during this trace:
{{spans[meta.span.kind:tool].meta.input.parameters}}

// `[*]` wildcard → fan out across every span; outputs are joined with newlines.
Final response:
{{spans[*].meta.output.value}}
```

### 3. RAG ワークフローにおける忠実性 {#3-faithfulness-in-a-rag-workflow}

最終的な回答が、トレース内で以前に取得されたドキュメントに基づいているかどうかを確認します。

**システムプロンプト**

```
You will see a trace from a retrieval-augmented generation pipeline. The retrieval step provides context documents, and a downstream LLM step produces an answer.

Decide whether the final answer is supported by the retrieved documents. Mark `true` only if every factual claim in the answer can be traced back to one of the documents.
```

**ユーザー**

```
// `[meta.span.kind:retrieval]` filter → only retrieval spans (the documents fetched).
// `.meta.output.documents[*].text` → the text of every document the retrieval returned,
//                                     joined with newlines.
Retrieved context:
{{spans[meta.span.kind:retrieval].meta.output.documents[*].text}}

// `[meta.span.kind:llm]` filter → outputs of the LLM call(s) that produced the answer.
Final answer:
{{spans[meta.span.kind:llm].meta.output.value}}
```

### 4. ターン間の会話の品質 {#4-conversation-quality-across-turns}

1 つの応答の品質ではなく、ターン間の整合性を考慮して、マルチターン会話の全体的な品質をスコアリングします。

**システムプロンプト**

```
You will see a multi-turn conversation between a user and an assistant. Evaluate the conversation as a whole on:
- Coherence across turns
- Whether the assistant remembered relevant context from earlier turns
- Whether the assistant's tone stayed consistent

Output one of: excellent, good, mixed, poor.
```

**ユーザー**

```
// `meta.input.messages[*].content` → fans out over each LLM span's input messages
//                                     and joins their content with newlines.
Conversation:
{{spans[meta.span.kind:llm].meta.input.messages[*].content}}

// Same pattern, but on the LLM output messages—the assistant's replies.
Assistant responses:
{{spans[meta.span.kind:llm].meta.output.messages[*].content}}
```

## トレース完了の仕組み {#how-trace-completion-works}

トレースレベルの評価は、Datadog がトレースを完了と見なした後にトリガーされます。トレースは **3 分間**の非アクティブ状態 (そのトレースに対して新しいスパンが到着せずに 3 分が経過した状態) が続くと**完了**と見なされます。

トレースの前のスパンから 3 分以上経過して到着したスパンは、トレースレベルの評価には含まれません。アプリケーションが、3 分以上の間隔でステップを実行する長時間実行エージェントを出力する場合は、それらの遅延スパンが除外されることを想定してください。

## トレースレベルの評価器の構成 {#configure-a-trace-level-evaluator}

以下のウォークスルーでは、トレーススコープに固有の構成部分が強調されています。構成のその他の部分 (アカウント、モデル、出力タイプ、評価基準) は、スパンスコープの評価器と同じです。

1. Agent Observability の [[Evaluators] (評価器) ページ][1]に移動し、[{{< ui >}}Create Evaluator{{< /ui >}}] (評価器を作成) を選択してから [`Evaluate On`] (評価対象) で [{{< ui >}}Trace{{< /ui >}}] (トレース) を選択します。([評価器テンプレート][2]から開始することもできます。)
1. カスタム LLM-as-a-judge 評価器の場合と同様に、{{< ui >}}evaluator name{{< /ui >}} (評価器名)、{{< ui >}}account{{< /ui >}} (アカウント)、および {{< ui >}}model{{< /ui >}} (モデル) を入力します。
1. [{{< ui >}}Evaluation Type{{< /ui >}}] (評価タイプ) で [{{< ui >}}Trace{{< /ui >}}] (トレース) を選択します。

   {{< img src="llm_observability/evaluations/trace_level_evaluation_scope.png" alt="[Evaluate On] (評価対象) スコープピッカーで [Trace] (トレース) が選択され、代替として [Span] (スパン) が選択されています。" style="width:100%;" >}}

   <div class="alert alert-info">トレースは <strong>3 分間</strong> の非アクティブ状態 (そのトレースに対する新しいスパンがない状態) が続くと完了と見なされ、その時点で評価が実行されます。前のスパンから 3 分以上経過して到着したスパンは、評価には含まれません。</div>

1. 評価するトレースを制御するため、{{< ui >}}Query{{< /ui >}} (クエリ) と {{< ui >}}Sampling Rate{{< /ui >}} (サンプリングレート) を追加します。クエリはトレースのルートスパンと照合されます。たとえば `@name:agent.workflow` は、ルートスパンの名前が `agent.workflow` であるトレースのみを評価します。
1. [{{< ui >}}System Prompt{{< /ui >}}] (システムプロンプト) フィールドに、LLM ジャッジへの静的な指示 (ジャッジが使用すべき基準や生成すべき出力など) を入力します。システムプロンプトは `{{ ... }}` プレースホルダーを解決しません。
1. [{{< ui >}}User{{< /ui >}}] (ユーザー) メッセージで、`{{spans...}} パスを使用してトレースデータを注入するプロンプトを作成します。オートコンプリートドロップダウンの内容がトレーススコープに合わせて調整され、選択されているサンプルトレースで使用可能なすべてのフィールドが表示されます。`` paths. The autocomplete dropdown adapts to trace scope and lists every field available on the selected sample trace. The `{{span_input}}` エイリアスと `` and `{{span_output}}` aliases are not available in trace scope—reference span data through the `` エイリアスはトレーススコープでは使用できません。代わりに、スパンの配列でスパンデータを参照します。一般的なパターン:

   ```
   {{spans}}                                         # トレース内のすべてのスパンの JSON
   {{spans[0].meta.input.value}}                     # 最初のスパンのみ
   {{spans[*].name}}                                 # すべてのスパン名 (改行で結合)
   {{spans[name:my-span].meta.input.value}}          # 属性別のフィルタースパン
   {{spans[meta.span.kind:llm].meta.output.value}}   # すべての LLM-kind スパンの出力
   {{*}}                                             # JSON としてのトレースペイロード全体
   ```

   See [Prompt Templating][3] for the full reference.

   {{< img src="llm_observability/evaluations/trace_level_prompt_editor.png" alt="トレースレベルの評価器のユーザープロンプトエディター。2 つの開き中括弧を入力すると、スパンがプレフィックスとして付いたフィールドがオートコンプリートのドロップダウンに表示されます。" style="width:100%;" >}}

1. 右側のパネルからサンプルトレースを選択します。ペインのタイトルが {{< ui >}}Spans in Selected Trace{{< /ui >}} (選択されたトレースのスパン) になり、そのトレースのスパンがレンダリングされ、プロンプトで参照されているフィールドが強調表示されます。

   {{< img src="llm_observability/evaluations/trace_level_filtered_traces.png" alt="トレーススコープの構成ページ。右側の [Spans in Selected Trace] (選択されたトレースのスパン) ペインで、1 つのスパンの入力値と出力値が強調表示されています。" style="width:100%;" >}}

1. [{{< ui >}}Test Evaluator{{< /ui >}}] (評価器をテスト) をクリックして、選択したトレースに対してプロンプトを実行し、保存前に LLM ジャッジの出力をプレビューします。
1. [評価器の構成][5]の残りの部分 (出力タイプ、評価基準) を設定し、[{{< ui >}}Save and Publish{{< /ui >}}] (保存して公開) をクリックして、新しいトレースに対して評価器の実行を開始します。

## 結果の確認 {#viewing-results}

トレースが完了すると、その評価結果がトレース自体に添付され、Agent Observability 全体でほぼリアルタイムに利用可能になります。トレースが 3 分間の非アクティブ期間内にある間、結果はサイドパネルに [{{< ui >}}Pending{{< /ui >}}] (保留中) として表示されます。トレースが完了すると、保留中の行は最終結果に置き換わります。

### クエリ結果{#query-results}

トレースレベルの評価結果では、スパンレベルの評価と同じクエリ構文が使用されます。これらのパターンは、Agent Observability Traces エクスプローラー、ダッシュボード、およびモニタークエリで使用します。

| クエリ| 目的|
|---|---|
| `@evaluation.<evaluation_name>.value:complete` | 特定の評価値を持つトレースに絞り込む|
| `@evaluation.<evaluation_name>.assessment:fail` | 評価器の合格基準を満たさなかったトレースに絞り込む|
| `@evaluation.<evaluation_name>.value:*` | この評価器の結果を持つすべてのトレース (保留中を除く)|

`<evaluation_name>` を、評価器を作成したときに設定した名前に置き換えてください。評価値は、ダッシュボードやモニターでのグループ化のための[ファセット][6]としても使用できます。

### デバッグ結果{#debug-results}

トレースの [{{< ui >}}Evaluations{{< /ui >}}] (評価) タブを開くと、そのトレースに対して実行されたすべての評価と、設定時に [{{< ui >}}Enable Reasoning{{< /ui >}}] (推論を有効にする) がオンであった場合には LLM ジャッジの推論を確認できます。推論は、ジャッジがその値を生成した*理由*を説明し、判断の根拠となった特定のスパンのフィールドを参照します。これを使用して個々の失敗をトリアージし、プロンプトを改善するか、判定を受け入れるかを決定します。

{{< img src="llm_observability/evaluations/trace_level_results_sidepanel.png" alt="完了したトレースの [Evaluations] (評価) タブ。トレースレベルの評価結果と、展開された LLM ジャッジの推論が表示されています。" style="width:100%;" >}}

### 結果の監視{#monitor-results}

リグレッション時にアラートを送信し、失敗を人間によるレビューのためにルーティングするため、トレースレベルの評価結果を[モニター][7]および[アノテーションキュー][8]に組み込みます。

- **合格率低下を監視する。**ローリング合格率が低下した際にアラートを送信するには、以下のようなクエリを使用してモニターを作成します。

  ```
  formula(100 * a / b) < 80
    where a = count(@evaluation.<evaluation_name>.assessment:pass) by {ml_app}
          b = count(@evaluation.<evaluation_name>.value:*) by {ml_app}
  over last_15m
  ```

- **失敗をアノテーションキューにルーティングする。**`@evaluation.<evaluation_name>.assessment:fail` に一致し、人間によるレビューのためにトレースをアノテーションキューに追加する[自動化ルール][8]を構成します。これにより、ジャッジのミスに関する処理が完了します。つまり失敗したトレースがレビューされ、誤ったラベルが修正されます。その修正内容は、評価器のプロンプトを改善するために使用するデータセットとなります。

## 権限 {#permissions}

評価器を構成するには、`Agent Observability Write` [権限][4]が必要です。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations
[3]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating
[4]: /ja/account_management/rbac/permissions/#llm-observability
[5]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#define-the-evaluation-output
[6]: /ja/events/explorer/facets/
[7]: /ja/monitors/
[8]: /ja/llm_observability/investigate/annotation_queues