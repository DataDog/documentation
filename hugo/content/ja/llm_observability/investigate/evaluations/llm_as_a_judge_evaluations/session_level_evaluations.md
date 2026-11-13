---
aliases:
- /ja/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/session_level_evaluations/
- /ja/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/session_level_evaluations/
description: カスタムLLM-as-a-judgeをユーザーセッション全体で実行し、セッションスコープをトレーススコープやスパンスコープよりも使用すべき場合の例を示します。
further_reading:
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
  tag: ドキュメント
  text: カスタム LLM-as-a-Judge 評価
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations
  tag: ドキュメント
  text: トレースレベルの評価
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating
  tag: ドキュメント
  text: プロンプトテンプレート
- link: /llm_observability/instrument/sdk/#tracking-user-sessions
  tag: ドキュメント
  text: ユーザーセッションの追跡
title: セッションレベルの評価
---
セッションレベルの評価は[ユーザーセッション][9]ごとに1回実行され、すべてのトレース（およびそれらのトレース内のすべてのスパン）が単一のプロンプトでLLMジャッジに提供されます。セッションは、関連するインタラクションを共有の`session_id`（例：チャット会話）の下にグループ化し、長期間のインタラクションにわたる複数のトレースを含めることができます。

セッションスコープは、インタラクション全体を通じたエージェントのパフォーマンスやユーザーの行動に関する疑問に答えます。これは、トレースレベルやスパンレベルのジャッジでは単一のリクエストやスパンからでは答えられない疑問です。

<div class="alert alert-info">セッションレベルの評価では、スパンにタグ付けが必要です。 <code>session_id</code>。アプリケーションを計測するには、<a href="/llm_observability/instrument/sdk/#tracking-user-sessions">ユーザーセッションの追跡</a>を参照してください。</div>

## セッションレベルの評価を設定する{#configure-a-session-level-evaluation}

以下のウォークスルーでは、セッションスコープに固有の設定箇所を強調しています。設定のその他の部分（アカウント、モデル、出力タイプ、評価基準）は、スパンスコープまたはトレーススコープの評価と同じです。

1. Agent Observabilityの[評価ページ][1]に移動して{{< ui >}}Create Evaluation{{< /ui >}}を選択し、`Evaluate On`で{{< ui >}}Session{{< /ui >}}を選択します。（[テンプレート評価][2]から開始することもできます。）
1. 他のカスタムLLM-as-a-judge評価と同様に、{{< ui >}}evaluation name{{< /ui >}}、{{< ui >}}account{{< /ui >}}、{{< ui >}}model{{< /ui >}}を入力します。

   {{< img src="llm_observability/evaluations/session_level_evaluation_scope.png" alt="「Evaluate On」スコープピッカーで「Session」が選択されている状態。" style="width:100%;" >}}

   <div class="alert alert-info">セッションは30分間アクティビティがない（そのセッションに対する新しいスパンがなく、直近のスパンから計測）と完了とみなされ、その時点で評価が実行されます。前のスパンから30分以上経過して到着したスパンは、評価に含まれません。</div>

1. 評価するセッションを制御するために、{{< ui >}}Query{{< /ui >}}と{{< ui >}}Sampling Rate{{< /ui >}}を追加します。
1. {{< ui >}}System Prompt{{< /ui >}}フィールドに、LLMジャッジへの静的な指示（例：ジャッジが使用すべき基準や生成すべき出力など）を入力します。システムプロンプトは`を解決しません。{{ ... }}` プレースホルダー。
1. メッセージに、{{< ui >}}User{{< /ui >}}を使用してセッションデータを注入するプロンプトを記述します。{{traces...}}` paths. The autocomplete dropdown adapts to session scope and lists fields available on the selected sample session. The `{{span_input}}` and `代わりに {{span_output}}` aliases are not available in session scope—reference span data through the ``traces` 配列を使用します。一般的なパターン：

   ```
   {{traces}}                                              # セッション内のすべてのトレースのJSON
   {{traces[0].spans[0].meta.input.value}}                 # 最初のトレースの最初のスパン
   {{traces[*].spans[*].name}}                             # すべてのスパン名（改行で結合）
   {{traces[*].spans[meta.span.kind:llm].meta.output.value}}  # LLM outputs across the session
   {{*}}                                                   # JSONとしてのセッションペイロード全体
   ```

   See [Prompt Templating][3] for the full reference.

   {{< img src="llm_observability/evaluations/session_level_prompt_editor.png" alt="セッションレベルの評価用ユーザープロンプトエディタでは、2つの開き中括弧（{{）を入力すると、tracesで始まるフィールドがオートコンプリートのドロップダウンに表示されます。" style="width:100%;" >}}

1. 右側のパネルからサンプルセッションを選択します。このペインにはそのセッション内のトレースが一覧表示され、プロンプトで参照されているフィールドが強調表示されます。

   {{< img src="llm_observability/evaluations/session_level_sample_session_trace_view.png" alt="セッションスコープの設定ページ。右側のサンプルセッションペインには、トレースと強調表示されたスパンフィールドが表示されています。" style="width:100%;" >}}


1. をクリックして{{< ui >}}Test Evaluation{{< /ui >}}、選択したセッションに対してプロンプトを実行し、保存前にLLMジャッジの出力をプレビューします。
1. 残りの[評価設定][5]（出力タイプ、評価基準）を続行し、{{< ui >}}Save and Publish{{< /ui >}}をクリックして新しいセッションに対する評価の実行を開始します。

## セッション完了 {#session-completion}

セッションレベルの評価は、Datadogがセッションを完了とみなした後にトリガーされます。セッションは30分間アクティビティがないと完了とみなされます。つまり、そのセッションに新しいスパンが到着しないまま30分が経過した状態（最新のスパンから計測）を指します。

セッションが完了すると、そのセッション内のすべてのトレースとそれらのトレースに含まれるすべてのスパンをジャッジプロンプトで使用して、評価が1回実行されます。セッション内の前のスパンから30分以上経過して到着したスパンは、セッションレベルの評価には含まれません。

## 結果を表示する {#view-results}

セッションが完了すると、その評価結果がセッションに添付され、Agent Observability全体でほぼリアルタイムに利用可能になります。セッションが30分間の非アクティブウィンドウ内にある間、結果はサイドパネルに {{< ui >}}Pending{{< /ui >}} として表示されます。セッションが完了すると、保留中の行は最終結果に置き換わります。

セッションの {{< ui >}}Session evaluations{{< /ui >}} を展開すると、そのセッションに対して実行されたすべての評価と、設定時に {{< ui >}}Enable Reasoning{{< /ui >}} が有効になっていた場合のLLMジャッジの推論を確認できます。推論は、ジャッジが *なぜ* その値を生成したのかを説明し、依存した特定のトレースまたはスパンのフィールドを参照します。これを使用して個々の失敗をトリアージし、プロンプトを改善するか、判定を受け入れるかを決定します。

{{< img src="llm_observability/evaluations/session_level_eval_results.png" alt="「セッション評価」セクションが展開されたセッション詳細パネル。このテーブルには、目標達成度、有害性、トピックの関連性、ツール選択、感情、プロンプトインジェクションなど、8つの評価がリストされています。それぞれに、色付きのバッジ（True、Not Toxic、On Topicなど）として表示される結果値と、LLMジャッジの推論のプレビューが含まれています。" style="width:100%;" >}}

## プロンプトの例 {#example-prompts}

### セッションの目標達成度 {#session-goal-completeness}

個別のトレースにおけるフォローアップのやり取りを含め、セッション全体を通じてユーザーが目的を達成できたかどうかを評価します。

**システムプロンプト**

```
You are evaluating an LLM chatbot session. You will see every trace in the session, including all user messages and assistant responses across turns.

Decide whether the user's goals were fully met by the end of the session. Consider:
- All distinct intents the user expressed during the session
- Whether follow-up questions indicate unresolved needs
- Whether the final state of the conversation leaves the user satisfied

Respond with one of: completed, partially_completed, failed.
```

**ユーザー**

```
Session traces:
{{traces}}
```

管理対象の [Goal Completeness][11] テンプレート評価は、このパターンを実装しています。

### マルチターン会話の品質 {#multi-turn-conversation-quality}

単一のやり取りではなく、セッション全体を通じて、一貫性、コンテキストの保持、およびトーンを評価します。

**システムプロンプト**

```
You will see a multi-turn chat session between a user and an assistant across multiple traces.

Evaluate the session as a whole on:
- Coherence across turns
- Whether the assistant remembered relevant context from earlier turns
- Whether tone and helpfulness stayed consistent

Output one of: excellent, good, mixed, poor.
```

**ユーザー**

```
User and assistant messages across the session:
{{traces[*].spans[meta.span.kind:llm].meta.input.messages[*].content}}
{{traces[*].spans[meta.span.kind:llm].meta.output.messages[*].content}}
```

### ユーザーの行動とフラストレーションのシグナル {#user-behavior-and-frustration-signals}

セッション全体を表示することでのみ現れる行動パターンを検出します。

**システムプロンプト**

```
Analyze this user session for signs of frustration, confusion, or abandonment.

Look for:
- Repeated or rephrased questions on the same topic
- Explicit expressions of dissatisfaction
- The user stopping after an incomplete or unhelpful answer

Output one of: no_issues, mild_frustration, high_frustration, abandoned.
```

**ユーザー**

```
Full session:
{{traces}}
```

### セッション全体におけるAgentの一貫性 {#agent-consistency-across-a-session}

セッション内のすべてのターンを通じて、Agentが品質とポリシーのコンプライアンスを維持していたかどうかをチェックします。

**システムプロンプト**

```
You will see all traces from one agent session. Assess whether the agent performed consistently:

- Did later turns contradict earlier correct answers?
- Did the agent recover from errors, or repeat the same mistake?
- Were safety and policy guidelines followed on every turn?

Respond with: consistent, mixed, inconsistent.
```

**ユーザー**

```
Session traces (chronological):
{{traces}}
```

## 適切なスコープの選択 {#choosing-the-right-scope}

| スコープ | ジャッジが確認する内容 | 典型的な死角 |
|---|---|---|
| スパン | 1つのスパンの入力と出力 | スパン間やトレース間のコンテキストなし |
| トレース | 1つのトレース内のすべてのスパン | 同じチャットセッション内の前後するターンなし |
| セッション | セッション内のすべてのトレース（およびスパン） | — |

評価に同じユーザーセッション内の複数のトレースからのコンテキストが必要な場合は、{{< ui >}}Session{{< /ui >}}スコープを使用してください：

- ユーザー満足度 — 最後の返信だけでなく、セッション全体がユーザーの意図を満たしたかどうか。
- マルチターンの一貫性 — アシスタントがトピックを維持し、トーンを保ち、異なるトレースに存在するターン間で関連するコンテキストを引き継いだかどうか。
- 長期的なユーザー行動 — 不満、混乱、トピックの切り替え、またはAgentが支援を完了する前に諦めるなどのパターン。
- セッション全体を通じたAgentのパフォーマンス — 一貫性、ツール障害後の回帰、またはAgentが後のターンでミスから回復したかどうか。

回答が単一のリクエスト内のステップに依存する場合（例：ツール呼び出しの順序、1つのワークフロー実行内でのRAGの忠実度、または1回のAgent呼び出しでの目標達成など）は、{{< ui >}}Trace{{< /ui >}}スコープを使用してください。[トレースレベルの評価][10]を参照してください。

評価が1つのスパンのみで完結する場合（例：単一のLLM応答のスコアリング、1つのメッセージの意図分類、1回の呼び出しにおけるツール引数の検証など）は、{{< ui >}}Span{{< /ui >}}スコープを使用してください。

## 権限{#permissions}

評価を設定するには、`Agent Observability Write` [権限][4]が必要です。

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
[9]: /ja/llm_observability/instrument/sdk/#tracking-user-sessions
[10]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations
[11]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations/#goal-completeness