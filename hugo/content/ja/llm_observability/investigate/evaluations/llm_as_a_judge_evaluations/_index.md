---
aliases:
- /ja/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/
- /ja/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/
description: カスタム LLM-as-a-judge 評価を作成する方法と、その評価結果を Agent Observability 全体で活用する方法について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: ブログ
  text: 'AI ROI の推進: 責任を持ってスケールできるように、Datadog がコスト、パフォーマンス、インフラストラクチャーを結び付ける方法'
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: ブログ
  text: Datadog LLM Observability を使用して Strands Agents のワークフローを可視化する
- link: https://www.datadoghq.com/blog/llm-evaluation-framework-best-practices/
  tag: ブログ
  text: 'LLM 評価フレームワークの構築: ベストプラクティス'
- link: /llm_observability/quickstart/terms/
  tag: ドキュメント
  text: Agent Observability の用語と概念について学ぶ
- link: /llm_observability/setup
  tag: ドキュメント
  text: Agent Observability のセットアップ方法を学ぶ
- link: /llm_observability/investigate/evaluations/managed_evaluations
  tag: ドキュメント
  text: マネージド評価について学ぶ
- link: https://huggingface.co/learn/cookbook/llm_judge
  tag: Hugging Face
  text: 自動および汎用評価での LLM-as-a-judge の使用
title: カスタム LLM-as-a-Judge 評価
---
カスタム LLM-as-a-judge 評価では、LLM を使用して別の LLM のパフォーマンスを評価します。自然言語プロンプトで評価ロジックを定義し、主観的または客観的な基準 (トーン、有用性、事実性など) をキャプチャして、以下の範囲に対する評価を大規模に実行します。

- **スパンスコープ**—1 回の LLM 呼び出し、エージェント ステップ、またはツール呼び出しの入出力を個別に評価します。
- **トレーススコープ**—トレースのすべてのスパンを 1 つのプロンプトで LLM ジャッジに提供し、評価ですべてのステップを基にリーズニングを行えるようにします。詳細な手順、ユースケース、プロンプトの例については、「[トレースレベルの評価][16]」を参照してください。
- **セッションスコープ**— 1 回のユーザーセッション内のすべてのトレース (およびそれらのトレース内のすべてのスパン) を 1 つのプロンプトで LLM ジャッジに提供し、評価でマルチターンのやり取り全体を基にリーズニングを行えるようにします。詳細な手順、ユースケース、プロンプトの例については、「[セッションレベルの評価][17]」を参照してください。

## カスタム LLM-as-a-judge 評価を作成する {#create-a-custom-llm-as-a-judge-evaluation}

カスタム評価は、Agent Observability の[評価ページ][1]から作成および管理できます。評価の説明を提供して評価を生成したり、提供されている既存の[テンプレート LLM-as-a-judge 評価][7]を使用して評価を作成したり、ゼロから評価を作成することができます。トレーシングを有効にすると、評価のトレースを確認できます。

<div class="alert alert-info">すでに <code>LLMJudge</code> SDK を定義している場合は、UI で構成を再構築することなく、Datadog に直接 SDK を公開できます。「<a href="/llm_observability/investigate/evaluations/evaluation_developer_guide/#publishing-an-llmjudge-as-a-datadog-managed-evaluation">Datadog 管理の評価として LLMJudge を公開する</a>」を参照してください。</div>

[互換性要件][6]の詳細をご確認ください。

### プロンプトを構成する {#configure-the-prompt}

1. Datadog で、Agent Observability の[評価ページ][1]に移動します。[{{< ui >}}Create Evaluation{{< /ui >}}] (評価を作成) を選択し、[{{< ui >}}Create your own{{< /ui >}}] (独自の評価を作成) を選択します。
   {{< img src="llm_observability/evaluations/EvalConfig_LLMO_1.png" alt="[Create Evaluation] を選択した後の Agent Observability の評価ページ。" style="width:100%;" >}}
1. 評価のトレースを有効にするには、[{{< ui >}}Tracing Disabled{{< /ui >}}] (トレース無効) ボタンをクリックし、[{{< ui >}}Trace Evaluations{{< /ui >}}] (トレース評価) トグルを選択してトレースを有効にします。この評価が実行されると、そのトレースが `datadog-evaluations` の下に表示され、評価を詳しく確認できます。**注**: トレースを有効にすると、Datadog に送信される課金対象スパンの数が増加します。
    {{< img src="llm_observability/evaluations/evaluation_tracing_enabled.png" alt="評価トレースを有効にするトグルを選択した後の、[Trace Evaluations] が有効な状態。" >}}
1. 明確で、内容がわかるような [{{< ui >}}evaluation name{{< /ui >}}] (評価名) を指定します (例: `factuality-check` や `tone-eval`)。この名前は、評価結果をクエリする際に使用できます。名前はアプリケーション内で一意である必要があります。
1. モデルを構成します。
    1. [{{< ui >}}Account{{< /ui >}}] (アカウント) ドロップダウンメニューを選択して、LLM ジャッジに使用する LLM プロバイダーと対応するアカウントを選択します。新しいアカウントを接続するには、「[LLM プロバイダーを接続する][2]」を参照してください。
        - {{< ui >}}Amazon Bedrock{{< /ui >}} アカウントを選択した場合は、そのアカウントが構成されているリージョンを選択します。次に、モデル名を選択するか、推論プロファイル ARN を指定します。
        - {{< ui >}}Vertex{{< /ui >}} アカウントを選択した場合は、プロジェクトと場所を選択します。[{{< ui >}}Location{{< /ui >}}] (場所) ドロップダウンには、[single-region] (単一リージョン)、[multi-region] (マルチリージョン)、および [global] (グローバル) のオプションが示されます。各オプションの詳細については、[Google Vertex AI のロケーションに関するドキュメント][18]を参照してください。
    1. [{{< ui >}}Model{{< /ui >}}] (モデル) ドロップダウンメニューを使用して、モデルを選択します。
1. [{{< ui >}}Runs On{{< /ui >}}] (評価対象) で、評価するアプリケーション、評価対象 (スパン、トレース、またはセッション)、およびサンプリングレートを選択します。サンプリングレートの右側にあるボタンを選択して、フィルタリング条件を追加できます。
1. [{{< ui >}}Template{{< /ui >}}] (テンプレート) セクションで、ドロップダウンメニューを使用します。
   - [{{< ui >}}Create from scratch{{< /ui >}}] (最初から作成): 独自のカスタムプロンプト (次のステップで定義します) を使用します。
   - [{{< ui >}}Failure to Answer{{< /ui >}}] (回答の失敗)、[{{< ui >}}Prompt Injection{{< /ui >}}] (プロンプト注入)、[{{< ui >}}Sentiment{{< /ui >}}] (感情) など: 既存のプロンプトテンプレートに値を入力します。これらのテンプレートをそのまま使用することも、特定の評価ロジックに合わせて変更することもできます。
1. [{{< ui >}}System Prompt{{< /ui >}}] (システムプロンプト) フィールドで、カスタムプロンプトを入力するか、プロンプトテンプレートを変更します。
   カスタムプロンプトの場合は、評価者が何を評価すべきかを説明する明確な指示を提供してください。
   - 単一の評価目標のみに絞る
   - 入力/出力ペア、期待される結果、およびリーズニングを示す 2 ～ 3 個の few-shot の例を含める。

{{% collapse-content title="カスタムプロンプトの例" level="h4" expanded=false id="custom-prompt-example" %}}
**システムプロンプト**

```
You will be looking at interactions between a user and a budgeting AI agent. Your job is to classify the user's intent when it comes to using the budgeting AI agent.

You will be given a Span Input, which represents the user's message to the agent, which you will then classify. Here are some examples.

Span Input: What are the core things I should know about budgeting?
Classification: general_financial_advice

Span Input: Did I go over budget with my grocery bills last month?
Classification: budgeting_question

Span Input: What is the category for which I have the highest budget?
Classification: budgeting_question

Span Input: Based on my past months, what is my ideal budget for subscriptions?
Classification: budgeting_advice

Span Input: Raise my restaurant budget by $50
Classification: budgeting_request

Span Input: Help me plan a trip to the Maldives
Classification: unrelated
```

**ユーザー**

```
Span Input: {{span_input}}
```
{{% /collapse-content %}}

8. [{{< ui >}}User Prompt{{< /ui >}}] (ユーザープロンプト) フィールドで、変数を追加して、スパン、トレース、またはセッションのどの部分を評価するかを指定します。任意のスパン属性を追加できます。たとえば、スパン入力 (`{{span_input}}`), Output (`{{span_output}}`), or any other span field. For trace-scoped evaluations, use `{{spans...}}` paths to read across spans; for session-scoped evaluations, use `{{traces...}}` トレース全体を読み取るパスなどです。詳細なリファレンスについては、「[プロンプトテンプレート][15]」を参照してください。ユーザープロンプトを直接編集するには、プロンプトを選択してテキストを編集します。

   右側のパネル (スパンスコープでは [{{< ui >}}Filtered Spans{{< /ui >}}] (フィルターされたスパン)、トレーススコープでは [{{< ui >}}Filtered Traces{{< /ui >}}] (フィルターされたトレース)、セッションスコープでは [{{< ui >}}Filtered Sessions{{< /ui >}}] (フィルターされたセッション) を使用して、スパンデータを変数として追加することもできます。
   1. アカウントとアプリケーションを選択して、スパン、トレース、またはセッションを右側に表示します。
   2. 右側のスパンのいずれかを選択して、その JSON を表示します。
   3. [{{< ui >}}+{{< /ui >}}] を選択して、JSON をユーザープロンプトに追加します。

{{< img src="llm_observability/evaluations/custom_llm_judge_2-5.png" alt="カスタム評価設定の右ペインにある JSON ビューのメニューの内容。メッセージに変数を追加するオプションが表示されています。" style="width:40%;" >}}

### 評価出力を定義する {#define-the-evaluation-output}

OpenAI、Azure OpenAI、Vertex AI、Anthropic、または Amazon Bedrock モデルの場合は、[構造化出力](#structured-output)を設定します。

Anthropic または Amazon Bedrock モデルの場合は、代わりに[キーワード検索出力](#keyword-search-output)を設定できます。

AI Gateway では、[構造化出力](#structured-output)と[キーワード検索出力](#keyword-search-output)の両方がサポートされています。Datadog では、モデルでサポートされる場合は構造化出力を使用し、そうでない場合は代わりにキーワード検索出力を使用することを推奨しています。

{{% collapse-content title="構造化出力 (OpenAI、Azure OpenAI、Anthropic、Amazon Bedrock、AI Gateway、Vertex AI)" level="h4" expanded="true" id="structured-output" %}}
1. 評価出力タイプを選択します。

   - [{{< ui >}}Boolean{{< /ui >}}]: true または false の結果 (例: 「モデルは指示に従いましたか?」)
   - [{{< ui >}}Score{{< /ui >}}] (スコア): 数値評価 (例: 有用性の 1 ～ 5 のスコア)
   - [{{< ui >}}Categorical{{< /ui >}}] (カテゴリ): 離散ラベル (例: 「良い」、「悪い」、「どちらでもない」)
   - [{{< ui >}}JSON{{< /ui >}}]: JSON では、自由形式のスキーマを使用できます。

2. オプションで、[{{< ui >}}Enable Reasoning{{< /ui >}}] (リーズニングを有効化) を選択します。これを選択すると、LLM ジャッジがその決定に関する短い正当化 (例: スコア 8 を付けた理由) を提供するように設定されます。リーズニングは、評価がなぜ、どのように行われたのかを理解するのに役立ちます。特に、トーン、共感、有用性といった主観的なメトリクスを監査する場合に有用です。リーズニングを追加すると、[LLM による判定の精度を向上させる](https://arxiv.org/abs/2504.00050)こともできます。

3. 評価の出力タイプを定義する JSON スキーマを編集します。

{{< tabs >}}
{{% tab "Boolean" %}}
**Boolean** 出力タイプの場合は、`description` フィールドを編集して、ユースケースにおいて true と false が何を意味するのかを詳しく説明します。
{{% /tab %}}

{{% tab "Score" %}}
**Score** 出力タイプの場合は、次のようにします。
- 評価の `min` スコアと `max` スコアを設定します。
- `description` フィールドを編集して、評価のスケールを詳しく説明します。
{{% /tab %}}
{{% tab "Categorical" %}}
**Categorical** 出力タイプの場合は、次のようにします。
- JSON スキーマを編集して、カテゴリを追加または削除します。
- カテゴリ名を編集します。
- カテゴリの `description` フィールドを編集して、評価のコンテキストにおけるカテゴリの意味を詳しく説明します。


カテゴリ評価のスキーマの例:

```
{
    "name": "categorical_eval",
    "schema": {
        "type": "object",
        "required": [
            "categorical_eval",
            "reasoning"
        ],
        "properties": {
            "categorical_eval": {
                "type": "string",
                "anyOf": [
                    {
                        "const": "budgeting_question",
                        "description": "The user is asking a question about their budget. The answer can be directly determined by looking at their budget and spending."
                    },
                    {
                        "const": "budgeting_request",
                        "description": "The user is asking to change something about their budget. This should involve an action that changes their budget."
                    },
                    {
                        "const": "budgeting_advice",
                        "description": "The user is asking for advice on their budget. This should not require a change to their budget, but it should require an analysis of their budget and spending."
                    },
                    {
                        "const": "general_financial_advice",
                        "description": "The user is asking for general financial advice which is not directly related to their specific budget. However, this can include advice about budgeting in general."
                    },
                    {
                        "const": "unrelated",
                        "description": "This is a catch-all category for things not related to budgeting or financial advice."
                    }
                ]
            },
            "reasoning": {
                "type": "string",
                "description": "Describe how you decided the category"
            }
        },
        "additionalProperties": false
    },
    "strict": true
}
```
{{% /tab %}}
{{% tab "JSON" %}}
**JSON** 出力タイプの場合は、自由形式の JSON スキーマを定義して、構造化された複雑な評価出力を取得します。

JSON 評価のスキーマの例:

```
{
    "name": "json_eval",
    "schema": {
        "type": "object",
        "required": [
            "result",
            "reasoning"
        ],
        "properties": {
            "result": {
                "type": "object",
                "description": "The structured evaluation result",
                "properties": {
                    "is_compliant": {
                        "type": "boolean",
                        "description": "Whether the response meets compliance requirements"
                    },
                    "confidence_score": {
                        "type": "number",
                        "description": "Confidence level of the evaluation from 0 to 1"
                    },
                    "issue_count": {
                        "type": "integer",
                        "description": "Number of issues identified in the response"
                    }
                },
                "required": ["is_compliant", "confidence_score", "issue_count"],
                "additionalProperties": false
            },
            "reasoning": {
                "type": "string",
                "description": "Describe the reasoning behind your evaluation"
            }
        },
        "additionalProperties": false
    },
    "strict": true
}
```
{{% /tab %}}
{{< /tabs >}}


4. [{{< ui >}}Assessment Criteria{{< /ui >}}] (評価基準) を設定します。
   この柔軟性により、評価結果をチームの品質基準に合わせて設定できます。合格/不合格をマッピングすると、Datadog Agent Observability 全体での自動化も可能になり、モニターやダッシュボードでリグレッションにフラグを設定したり、全体的な健全性を追跡したりできるようになります。

{{< tabs >}}
{{% tab "Boolean" %}}
[{{< ui >}}True{{< /ui >}}] を選択して結果を「合格」とマークするか、[{{< ui >}}False{{< /ui >}}] を選択して結果を「不合格」とマークします。
{{% /tab %}}

{{% tab "Score" %}}
合格となるパフォーマンスを決定するための数値しきい値を定義します。
{{% /tab %}}
{{% tab "Categorical" %}}
合格状態に関連付けるカテゴリを選択します。たとえば、`Excellent`、`Good`、`Poor` というカテゴリがあり、そのうち `Poor` のみを失敗状態に関連付ける場合は、`Excellent` と `Good` を選択します。
{{% /tab %}}
{{% tab "JSON" %}}
LLM-as-a-Judge 評価器からの出力に基づいて評価を割り当てる JavaScript 関数を指定します。関数は、以下の形式の json オブジェクトを返す必要があります。

```
{
    assessment: "pass", // "pass" | "fail" [REQUIRED],
    value: "evaluation_label" // string [OPTIONAL],
    reasoning: "explanation behind the assessment" // string [OPTIONAL]

}
```
また、関数シグニチャは `function __evalPostProcessing(input)` である必要があります。`input` は評価器からの json です。以下の関数は、後処理関数の例です。

```
function __evalPostProcessing(input) {
    /*
     * Expected input shape (from LLM evaluator [this depends on the JSON Structured Output]):
     * {
     *   criteria: {
     *     quality_score: { score: number (0–1), category: "excellent"|"good"|"poor", reasoning: string },
     *     toxicity:      { score: number (0–1), category: "safe"|"unsafe",           reasoning: string },
     *     completeness:  { score: number (0–1), category: "complete"|"incomplete",   reasoning: string },
     *     relevance:     { score: number (0–1), category: "relevant"|"irrelevant",   reasoning: string },
     *   },
     *   overall_reasoning: string  // (optional) top-level summary from LLM evaluator
     * }
     */

    const SCORE_THRESHOLD = 0.7;

    // Category → pass/fail mappings per criterion
    const CATEGORY_PASS_MAP = {
        quality_score: ["excellent", "good"],
        toxicity:      ["safe"],
        completeness:  ["complete"],
        relevance:     ["relevant"],
    };

    const criteriaResults = {};
    const failures = [];
    const passes = [];

    for (const [criterionName, passCategories] of Object.entries(CATEGORY_PASS_MAP)) {
        const criterion = input?.criteria?.[criterionName];

        if (!criterion) {
            failures.push(`[${criterionName}] Missing from evaluator output.`);
            criteriaResults[criterionName] = false;
            continue;
        }

        const { score, category, reasoning } = criterion;

        const scorePass    = typeof score === "number" && score >= SCORE_THRESHOLD;
        const categoryPass = typeof category === "string" && passCategories.includes(category.toLowerCase());

        // Both score AND category must pass
        const criterionPass = scorePass && categoryPass;
        criteriaResults[criterionName] = criterionPass;

        if (criterionPass) {
            passes.push(`[${criterionName}] PASS — score: ${score.toFixed(2)}, category: "${category}". ${reasoning ?? ""}`);
        } else {
            const reasons = [];
            if (!scorePass)    reasons.push(`score ${score?.toFixed(2) ?? "N/A"} below threshold (≥${SCORE_THRESHOLD})`);
            if (!categoryPass) reasons.push(`category "${category}" not in acceptable set [${passCategories.join(", ")}]`);
            failures.push(`[${criterionName}] FAIL — ${reasons.join("; ")}. ${reasoning ?? ""}`);
        }
    }

    // Determine overall assessment
    const passed = Object.values(criteriaResults).every(Boolean);
    const failCount = failures.length;

    const assessment = passed ? "pass" : "fail";

    const label = passed
        ? "high_quality_response"
        : failCount === 1
            ? "minor_quality_issue"
            : failCount === 2
                ? "moderate_quality_issue"
                : "low_quality_response";

    const reasoningParts = [
        passed
            ? "All criteria passed."
            : `${failCount} criterion/criteria failed.`,
        ...failures,
        ...passes,
        input?.overall_reasoning ? `Evaluator summary: ${input.overall_reasoning}` : ""
    ].filter(Boolean);

    return {
        assessment: assessment,
        value: label,
        reasoning: reasoningParts.join(" | ")
    };
}
```
{{% /tab %}}
{{< /tabs >}}


{{% /collapse-content %}}

{{% collapse-content title="後処理 (OpenAI、Azure OpenAI、Anthropic、Amazon Bedrock、AI Gateway、Vertex AI)" level="h4" expanded="true" id="post-processing" %}}
1. {{< ui >}}JSON{{< /ui >}} 出力タイプを選択します。

2. 評価器の評価、値、およびリーズニングを指定するための JavaScript 関数を指定します。後処理を行うと、Boolean、Score、または Categorical 構造化出力のみを使用した場合よりも複雑な評価を実施できます。

    後処理関数は、値が「pass」または「fail」である **assessment** と、オプションで値またはリーズニングの文字列を含むオブジェクトを返す必要があります。関数は、以下の形式の json オブジェクトを返す必要があります。
    ```
    {
        assessment: "pass", // "pass" | "fail" [REQUIRED],
        value: "evaluation_label" // string [OPTIONAL],
        reasoning: "explanation behind the assessment" // string [OPTIONAL]

    }
    ```
    and the function signature must be `function __evalPostProcessing(input)` and the `input` is the json from the evaluator. The function below is an example of a post processing function:
    ```
    function __evalPostProcessing(input) {
        /*
        * Expected input shape (from LLM evaluator [this depends on the JSON Structured Output]):
        * {
        *   criteria: {
        *     quality_score: { score: number (0–1), category: "excellent"|"good"|"poor", reasoning: string },
        *     toxicity:      { score: number (0–1), category: "safe"|"unsafe",           reasoning: string },
        *     completeness:  { score: number (0–1), category: "complete"|"incomplete",   reasoning: string },
        *     relevance:     { score: number (0–1), category: "relevant"|"irrelevant",   reasoning: string },
        *   },
        *   overall_reasoning: string  // (optional) top-level summary from LLM evaluator
        * }
        */

        const SCORE_THRESHOLD = 0.7;

        // Category → pass/fail mappings per criterion
        const CATEGORY_PASS_MAP = {
            quality_score: ["excellent", "good"],
            toxicity:      ["safe"],
            completeness:  ["complete"],
            relevance:     ["relevant"],
        };

        const criteriaResults = {};
        const failures = [];
        const passes = [];

        for (const [criterionName, passCategories] of Object.entries(CATEGORY_PASS_MAP)) {
            const criterion = input?.criteria?.[criterionName];

            if (!criterion) {
                failures.push(`[${criterionName}] Missing from evaluator output.`);
                criteriaResults[criterionName] = false;
                continue;
            }

            const { score, category, reasoning } = criterion;

            const scorePass    = typeof score === "number" && score >= SCORE_THRESHOLD;
            const categoryPass = typeof category === "string" && passCategories.includes(category.toLowerCase());

            // Both score AND category must pass
            const criterionPass = scorePass && categoryPass;
            criteriaResults[criterionName] = criterionPass;

            if (criterionPass) {
                passes.push(`[${criterionName}] PASS — score: ${score.toFixed(2)}, category: "${category}". ${reasoning ?? ""}`);
            } else {
                const reasons = [];
                if (!scorePass)    reasons.push(`score ${score?.toFixed(2) ?? "N/A"} below threshold (≥${SCORE_THRESHOLD})`);
                if (!categoryPass) reasons.push(`category "${category}" not in acceptable set [${passCategories.join(", ")}]`);
                failures.push(`[${criterionName}] FAIL — ${reasons.join("; ")}. ${reasoning ?? ""}`);
            }
        }

        // Determine overall assessment
        const passed = Object.values(criteriaResults).every(Boolean);
        const failCount = failures.length;

        const assessment = passed ? "pass" : "fail";

        const label = passed
            ? "high_quality_response"
            : failCount === 1
                ? "minor_quality_issue"
                : failCount === 2
                    ? "moderate_quality_issue"
                    : "low_quality_response";

        const reasoningParts = [
            passed
                ? "All criteria passed."
                : `${failCount} criterion/criteria failed.`,
            ...failures,
            ...passes,
            input?.overall_reasoning ? `Evaluator summary: ${input.overall_reasoning}` : ""
        ].filter(Boolean);

        return {
            assessment: assessment,
            value: label,
            reasoning: reasoningParts.join(" | ")
        };
    }
    ```
{{% /collapse-content %}}


{{% collapse-content title="キーワード検索出力 (Anthropic、Amazon Bedrock、AI Gateway)" level="h4" expanded="true" id="keyword-search-output" %}}
1. {{< ui >}}Boolean{{< /ui >}} 出力タイプを選択します。
   <div class="alert alert-info">キーワード検索出力では、<strong>Boolean</strong> 出力タイプのみが使用可能です。</div>

2. 評価結果が true となる条件を定義する [{{< ui >}}True keywords{{< /ui >}}] (True キーワード) と、false となる条件を定義する [{{< ui >}}False keywords{{< /ui >}}] (False キーワード) を指定します。

   Datadog は、定義されたキーワードを LLM-as-a-judge の応答テキストで検索し、評価のための適切な結果を提供します。このため、選択したキーワードを使用して応答するように LLM に指示する必要があります。

   たとえば、次のように設定したとします。

   - {{< ui >}}True keywords{{< /ui >}}: Yes、yes
   - {{< ui >}}False keywords{{< /ui >}}: No、no

   この場合、システムプロンプトでは `Respond with "yes" or "no"` のように指定する必要があります。

3. [{{< ui >}}Assessment Criteria{{< /ui >}}] で、次のようにします。
   - [{{< ui >}}True{{< /ui >}}] を選択して、結果を「合格」とマークします。
   - [{{< ui >}}False{{< /ui >}}] を選択して、結果を「不合格」とマークします。

   この柔軟性により、評価結果をチームの品質基準に合わせて設定できます。合格/不合格をマッピングすると、Datadog Agent Observability 全体での自動化も可能になり、モニターやダッシュボードでリグレッションにフラグを設定したり、全体的な健全性を追跡したりできるようになります。
{{% /collapse-content %}}

{{< img src="llm_observability/evaluations/custom_llm_judge_5-2.png" alt="リーズニングや評価基準を含む、構造化出力でのカスタム評価出力の構成。" style="width:100%;" >}}

### 評価スコープの定義: フィルタリングとサンプリング{#define-the-evaluation-scope-filtering-and-sampling}

<div class="alert alert-info">評価で使用されるスパンフィールドは、それぞれ 250 KB に制限されています。このサイズを超えるフィールドは、LLM ジャッジに送信される前に切り捨てられます。</div>

[{{< ui >}}Evaluation Scope{{< /ui >}}] (評価スコープ) で、評価の実行場所と実行方法を定義します。これにより、カバレッジ (含めるスパンやトレース) とコスト (サンプリング数) を制御できます。
   - [{{< ui >}}Application{{< /ui >}}] (アプリケーション): 評価対象のアプリケーションを選択します。
   - [{{< ui >}}Evaluate On{{< /ui >}}] (評価対象): 次のいずれかを選択します。
      - [{{< ui >}}Trace{{< /ui >}}] (トレース): すべてのスパンを含むトレース全体を単一のユニットとして評価します。複数のスパンに関するコンテキスト (エージェントの目標達成、ツール使用チェーン、RAG の忠実性など) によって回答が変わる場合にこれを使用します。トレース完了の判断方法に関する例と詳細については、「[トレースレベルの評価][16]」を参照してください。
      - [{{< ui >}}Span{{< /ui >}}] (スパン): 一致するスパンを個別に評価します。[{{< ui >}}Query{{< /ui >}}] (クエリ) フィールドを使用して、特定のスパン (ルートスパンのみ、`llm` スパンのみ、または特定のタグを持つスパンなど) にスコープを設定します。
      - [{{< ui >}}Session{{< /ui >}}] (セッション): すべてのトレースとそのスパンを含むユーザーセッション全体を単一のユニットとして評価します。同じセッション内の複数のトレースに関するコンテキスト (ユーザー満足度、マルチターンの一貫性、または時間経過に伴うユーザー行動の変化など) によって回答が変化する場合にこれを使用します。`session_id` のタグが付けられたスパンが必要です。セッション完了の判断方法に関する例と詳細については、「[セッションレベルの評価][17]」を参照してください。
   - [{{< ui >}}Query{{< /ui >}}]: (オプション) Datadog クエリ構文を使用してクエリを入力し、評価対象のスパンまたはトレースをフィルタリングします。たとえば、次のようにします。
      - `@name:agent.workflow`: スパン名でフィルタリングする
      - `env:prod`: タグでフィルタリングする
      - `@parent_id:undefined`: ルートスパンのみを評価する ([{{< ui >}}Evaluate On{{< /ui >}}] が [{{< ui >}}Span{{< /ui >}}] に設定されている場合)
      - `@name:agent.workflow AND env:prod`: スパン名とタグでフィルタリングする
   - [{{< ui >}}Sampling Rate{{< /ui >}}] (サンプリングレート): (オプション) サンプリング (例: 10%) を適用して、評価コストを制御します。

{{< img src="llm_observability/evaluations/evaluation_scope_1.png" alt="評価スコープの構成。" style="width:100%;" >}}

### テストとプレビュー {#test-and-preview}

右側のペインには、構成された評価スコープに対応する [{{< ui >}}Filtered Spans{{< /ui >}}] (またはトレース) が表示されます。

スパンを選択して、評価に使用可能な JSON データを表示します。次に、[{{< ui >}}Test Evaluation{{< /ui >}}] (評価のテスト) をクリックしてスパンのデータを評価に事前入力し、[{{< ui >}}Run{{< /ui >}}] (実行) をクリックしてテストします。

## 結果の表示と使用 {#viewing-and-using-results}

評価を [{{< ui >}}Save and Publish{{< /ui >}}] (保存および公開) すると、Datadog によって自動的に対象のスパンに対する評価が実行されます。または、[{{< ui >}}Save as Draft{{< /ui >}}] (ドラフトとして保存) して、後で評価を編集または有効にすることもできます。

公開された評価の結果は、Agent Observability 全体でほぼリアルタイムで利用できます。特定のスパンに対するカスタム LLM-as-a-judge の結果は、[{{< ui >}}Evaluations{{< /ui >}}] (評価) タブでほかの評価とともに確認できます。

{{< img src="llm_observability/evaluations/custom_llm_judge_3-2.png" alt="トレースの [Evaluations] タブ。カスタム評価結果が管理された評価とともに表示されています。" style="width:100%;" >}}

各評価結果には以下が含まれます。

- 評価された値 (例: `True`、`9`、または `Neutral`)
- リーズニング (有効な場合)
- 合格/不合格インジケーター (評価基準に基づく)

`@evaluation.<evaluation_name>.value` という構文を使用して、結果をクエリまたは視覚化します。

たとえば、次のようにします。

```
@evaluation.helpfulness-check.value
```

{{< img src="llm_observability/evaluations/custom_llm_judge_4.png" alt="Agent Observability のトレースビュー。ユーザーが検索ボックスに「@evaluation.budget-guru-intent-classifier.value:budgeting_question」と入力すると、下に結果が表示されます。" style="width:100%;" >}}


以下が可能です。
- 評価結果でトレースをフィルタリングする (例: `@evaluation.helpfulness-check.value`)
- 合格/不合格の評価ステータスでフィルタリングする (例: `@evaluation.helpfulness-check.assessment:fail`)
- 評価結果を[ファセット][3]として使用する
- Agent Observability の [Overview] (概要) ページの [Evaluation] セクションで集計結果を表示する
- [モニター][4]を作成して、パフォーマンスの変化やリグレッションについてアラートを送信する

## 実験での使用 {#using-in-experiments}

ローカルの [LLM 実験][8]でカスタム LLM-as-a-judge 評価を再利用するには、SDKから `RemoteEvaluator` を使用して名前で参照します。

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, RemoteEvaluator

evaluator = RemoteEvaluator(eval_name="quality-assessment")

experiment = LLMObs.experiment(
    name="my-experiment",
    task=my_task,
    dataset=dataset,
    evaluators=[evaluator],
)
experiment.run()
{{< /code-block >}}

`RemoteEvaluator` は、同じ実験内のほかのローカル評価器と合わせて使用できます。カスタム入力マッピング、エラー処理、その他のオプションについては、評価開発者ガイドの「[RemoteEvaluator][9]」を参照してください。

## 信頼性の高いカスタム評価のためのベストプラクティス {#best-practices-for-reliable-custom-evaluations}

- **小さく始める**: 拡張する前に、明確に定義された 1 つの失敗モードを対象にします。
- **リーズニングを有効にする**: 説明可能な決定が必要な場合や、複雑なリーズニング タスクの精度を向上させる必要がある場合に有効にします。
- **反復する**: 実行し、出力を検査し、プロンプトを改善します。
- **検証する**: サンプリングされたトレースを使用して、定期的に評価器の精度をチェックします。
- **ルーブリックを文書化する**: 時間の経過に伴うドリフトを防止するために、「合格」と「不合格」の意味を明確に定義します。
- **評価器を再調整する**: 基になる LLM が更新されたら、プロンプトと few-shot の例を再評価します。

## 推定トークン使用量 {#estimated-token-usage}

[LLM 評価トークン使用量ダッシュボード][10]を使用して、LLM 評価のトークン使用量を監視することができます。

詳細が必要な場合は、以下のメトリクスを使用して、評価を実施するために消費された LLM リソースを追跡できます。

- `ml_obs.estimated_usage.llm.input.tokens`
- `ml_obs.estimated_usage.llm.output.tokens`
- `ml_obs.estimated_usage.llm.total.tokens`

これらの各メトリクスには、`ml_app`、`model_server`、`model_provider`、`model_name`、および `evaluation_name` タグがあり、使用量増加の原因となっている特定のアプリケーション、モデル、評価を特定できます。

## API から LLM-as-a-judge 評価を構成する {#configure-llm-as-a-judge-evaluations-from-the-api}

ご使用の環境で `DD_API_KEY` [API キー][14]を指定したら、基本的な CRUD 操作を使用してマネージド評価設定を操作できます。

 - [GET][11] 既存の評価設定の取得
 - [PUT][12] 既存の評価設定の作成または更新
 - [DELETE][13] 既存の評価設定の削除

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/connect_to_account
[3]: /ja/events/explorer/facets/
[4]: /ja/monitors/
[5]: https://arxiv.org/abs/2504.00050
[6]: /ja/llm_observability/investigate/evaluations/compatibility
[7]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations/
[8]: /ja/llm_observability/improve/experiments
[9]: /ja/llm_observability/investigate/evaluations/evaluation_developer_guide/#using-managed-evaluators
[10]: https://app.datadoghq.com/dash/integration/llm_evaluations_token_usage
[11]: /ja/api/latest/agent-observability/#get-a-custom-evaluator-configuration
[12]: /ja/api/latest/agent-observability/#create-or-update-a-custom-evaluator-configuration
[13]: /ja/api/latest/agent-observability/#delete-a-custom-evaluator-configuration
[14]: /ja/account_management/api-app-keys
[15]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating
[16]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations
[17]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/session_level_evaluations
[18]: https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations