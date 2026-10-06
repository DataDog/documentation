---
description: カスタム LLM-as-a-judge 評価を作成する方法と、その評価結果を Agent Observability 全体で活用する方法。
further_reading:
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: ブログ
  text: 'AI ROI の促進: Datadog がコスト、パフォーマンス、インフラストラクチャーを接続し、責任を持ってスケールできるようにする方法'
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: ブログ
  text: Datadog LLM Observability で Strands Agents ワークフローを可視化する
- link: https://www.datadoghq.com/blog/llm-evaluation-framework-best-practices/
  tag: ブログ
  text: 'LLM 評価フレームワークの構築: ベストプラクティス'
- link: /llm_observability/terms/
  tag: ドキュメント
  text: Agent Observability の用語と概念について学ぶ
- link: /llm_observability/setup
  tag: ドキュメント
  text: Agent Observability の設定方法を学ぶ
- link: /llm_observability/evaluations/managed_evaluations
  tag: ドキュメント
  text: マネージド評価について学ぶ
- link: https://huggingface.co/learn/cookbook/llm_judge
  tag: Hugging Face
  text: 自動化された汎用的な評価のための LLM-as-a-judge の利用
title: カスタム LLM-as-a-Judge 評価
---
カスタム LLM-as-a-judge 評価では、LLM を使用して別の LLM のパフォーマンスを評価します。自然言語プロンプトで評価ロジックを定義し、主観的または客観的な基準 (トーン、有用性、事実性など) をキャプチャして、以下のスコープで大規模に評価を実行します。

- **スパンスコープ**—1 つの LLM 呼び出し、Agent step、またはツール呼び出しの入力と出力を個別にスコアリングします。
- **トレーススコープ**—トレースのすべてのスパンを単一のプロンプトで LLM judge に供給し、ステップ全体で評価を推論できるようにします。詳細な手順、ユースケース、プロンプトの例については、[トレースレベルの評価][16] を参照してください。
- **セッションスコープ**—ユーザーセッション内のすべてのトレース (およびそれらのトレース内のすべてのスパン) を単一のプロンプトで LLM judge に供給し、マルチターン対話全体で評価を推論できるようにします。詳細な手順、ユースケース、プロンプトの例については、[セッションレベルの評価][17] を参照してください。

## カスタム LLM-as-a-judge 評価を作成する {#create-a-custom-llm-as-a-judge-evaluation}

Agent Observability の [評価ページ][1] から、カスタム評価を作成および管理できます。評価の説明を提供して評価を生成したり、当社が提供する既存の[テンプレート LLM-as-a-judge 評価][7] を使用して構築したり、ゼロから作成したりできます。トレースを有効にすると、評価からのトレースを確認できます。

<div class="alert alert-info">すでに SDK に定義済みのものがある場合は、 <code>LLMJudge</code> UI で構成を再構築することなく、Datadog に直接公開できます。<a href="/llm_observability/guide/evaluation_developer_guide/#publishing-an-llmjudge-as-a-datadog-managed-evaluation">LLMJudge を Datadog 管理の評価として公開する</a>を参照してください。</div>

[互換性要件][6] の詳細をご覧ください。

### プロンプトを構成する {#configure-the-prompt}

1. Datadog で、Agent Observability の [評価ページ][1] に移動します。{{< ui >}}Create Evaluation{{< /ui >}} を選択し、次に {{< ui >}}Create your own{{< /ui >}} を選択します。
   {{< img src="llm_observability/evaluations/EvalConfig_LLMO_1.png" alt="Create Evaluation を選択した後の Agent Observability Evaluations ページ。" style="width:100%;" >}}
1. 評価のトレースを有効にするには、{{< ui >}}Tracing Disabled{{< /ui >}} ボタンをクリックし、{{< ui >}}Trace Evaluations{{< /ui >}} トグルを選択してトレースを有効にします。この評価が実行されると、そのトレースが `datadog-evaluations` の下に表示され、評価の可視性が向上します。**注**: トレースを有効にすると、Datadog に送信される課金対象スパンの数が増加します。
    {{< img src="llm_observability/evaluations/evaluation_tracing_enabled.png" alt="評価トレースを有効にするトグルを選択した後の有効化されたトレース評価。" >}}
1. 明確でわかりやすい {{< ui >}}evaluation name{{< /ui >}} を指定します (例: `factuality-check` または `tone-eval`)。この名前は、評価結果をクエリする際に使用できます。名前はアプリケーション内で一意でなければなりません。
1. モデルを構成します。
    1. {{< ui >}}Account{{< /ui >}} ドロップダウンメニューを選択して、LLM 評価に使用する LLM プロバイダーと対応するアカウントを選択します。新しいアカウントを接続するには、[LLM プロバイダーを接続する][2] を参照してください。
        - {{< ui >}}Amazon Bedrock{{< /ui >}} アカウントを選択する場合は、そのアカウントが構成されているリージョンを選択します。その後、モデル名を選択するか、推論プロファイル ARN を指定できます。
        - {{< ui >}}Vertex{{< /ui >}} アカウントを選択する場合は、プロジェクトと場所を選択します。{{< ui >}}Location{{< /ui >}} ドロップダウンには、単一リージョン、マルチリージョン、およびグローバルオプションが含まれています。各オプションの詳細については、[Google の Vertex AI ロケーションドキュメント][18] を参照してください。
    1. {{< ui >}}Model{{< /ui >}} ドロップダウンメニューを使用してモデルを選択します。
1. {{< ui >}}Runs On{{< /ui >}} で、評価するアプリケーション、評価対象 (スパン、トレース、またはセッション)、およびサンプリングレートを選択します。サンプリングレートの右側にあるボタンを選択することで、フィルタリング条件を追加できます。
1. {{< ui >}}Template{{< /ui >}} セクションで、ドロップダウンメニューを使用します。
   - {{< ui >}}Create from scratch{{< /ui >}}: 独自のカスタムプロンプトを使用します (次のステップで定義)。
   - {{< ui >}}Failure to Answer{{< /ui >}}、{{< ui >}}Prompt Injection{{< /ui >}}、{{< ui >}}Sentiment{{< /ui >}} など: 既存のプロンプトテンプレートに入力します。これらのテンプレートは、そのまま使用することも、特定の評価ロジックに合わせて変更することもできます。
1.  {{< ui >}}System Prompt{{< /ui >}} フィールドにカスタムプロンプトを入力するか、プロンプトテンプレートを修正します。
   カスタムプロンプトの場合は、評価者が何を評価すべきかを説明する明確な指示を提供します。
   - 単一の評価目標に焦点を当てる
   - 入力/出力ペア、期待される結果、および推論を示すフューショットの例を 2〜3 個含めます。

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

8. {{< ui >}}User Prompt{{< /ui >}} フィールドで、変数を追加することにより、スパン、トレース、またはセッションのどの部分を評価するかを指定します。任意のスパンの属性を追加できます。例えば、スパン入力 (`{{span_input}}`), Output (`{{span_output}}`), or any other span field. For trace-scoped evaluations, use `{{spans...}}` paths to read across spans; for session-scoped evaluations, use `{{traces...}}` パスを追加して、トレース全体を読み取ります。完全なリファレンスについては、[プロンプトテンプレート][15] を参照してください。ユーザープロンプトを直接編集するには、それを選択してテキストを編集します。

   右側のパネル (スパンスコープでは {{< ui >}}Filtered Spans{{< /ui >}}、トレーススコープでは {{< ui >}}Filtered Traces{{< /ui >}}、セッションスコープでは {{< ui >}}Filtered Sessions{{< /ui >}}) を使用して、スパンデータを変数として追加することもできます。
   1. アカウントとアプリケーションを選択して、スパン、トレース、またはセッションが右側に表示されるようにします。
   2. 右側のスパンのいずれかを選択して、その JSON を表示します。
   3. {{< ui >}}+{{< /ui >}}を選択して、JSON をユーザープロンプトに追加します。

{{< img src="llm_observability/evaluations/custom_llm_judge_2-5.png" alt="メッセージに変数を追加するオプションが表示されている、カスタム評価設定の右ペインにある JSON ビューのメニュー内容。" style="width:40%;" >}}

### 評価出力を定義する {#define-the-evaluation-output}

OpenAI、Azure OpenAI、Vertex AI、Anthropic、または Amazon Bedrock モデルの場合は、[構造化出力](#structured-output)を構成します。

Anthropic または Amazon Bedrock モデルの場合は、代わりに[キーワード検索出力](#keyword-search-output)を設定することもできます。

AI Gateway では、[構造化出力](#structured-output)と[キーワード検索出力](#keyword-search-output)の両方がサポートされています。Datadog では、モデルがサポートしている場合は構造化出力を使用し、そうでない場合はキーワード検索出力にフォールバックすることを推奨しています。

{{% collapse-content title="構造化出力 (OpenAI、Azure OpenAI、Anthropic、Amazon Bedrock、AI Gateway、Vertex AI)" level="h4" expanded="true" id="structured-output" %}}
1. 評価出力タイプを選択します。

   - {{< ui >}}Boolean{{< /ui >}}: true/false の結果 (例: 「モデルは指示に従いましたか?」)
   - {{< ui >}}Score{{< /ui >}}: 数値評価 (例: 有用性に関する 1～5 のスケール)
   - {{< ui >}}Categorical{{< /ui >}}: 離散ラベル (例: "Good"、"Bad"、"Neutral")
   - {{< ui >}}JSON{{< /ui >}}: JSON は自由形式のスキーマを許可します

2. 必要に応じて、{{< ui >}}Enable Reasoning{{< /ui >}} を選択します。これは、LLM ジャッジがその決定に関する簡潔な理由 (例: スコア 8 が提供された理由) を提供するように構成します。推論は、評価がどのように、そしてなぜ行われたかを理解する上で役立ち、トーン、共感、有用性などの主観的な指標を監査するために特に便利です。推論を追加すると、[LLM ジャッジの精度を向上させる](https://arxiv.org/abs/2504.00050)こともできます。

3. 評価の出力タイプを定義する JSON スキーマを編集します。

{{< tabs >}}
{{% tab "ブール値" %}}
**ブール値**出力タイプの場合、`description`フィールドを編集して、使用例における true と false の意味をさらに詳しく説明します。
{{% /tab %}}

{{% tab "スコア" %}}
**スコア**出力タイプの場合:
- 評価の `min` と `max` を設定します。
- `description` フィールドを編集して、評価のスケールをさらに詳しく説明します。
{{% /tab %}}
{{% tab "カテゴリ別" %}}
**カテゴリ別**出力タイプの場合:
- JSON スキーマを編集して、カテゴリを追加または削除します。
- カテゴリ名を編集します。
- カテゴリの `description` フィールドを編集して、評価のコンテキストにおけるそれらの意味をさらに詳しく説明します。


カテゴリ別評価のスキーマ例:

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
**JSON** 出力タイプの場合、複雑で構造化された評価出力を取得するための自由形式の JSON スキーマを定義します。

JSON 評価のスキーマ例:

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


4. {{< ui >}}Assessment Criteria{{< /ui >}} を構成します。
   この柔軟性により、評価結果をチームの品質基準に合わせることができます。合格/不合格のマッピングは、Datadog Agent Observability 全体での自動化も促進し、モニターやダッシュボードで回帰にフラグを立てたり、全体的な健全性を追跡したりできるようにします。

{{< tabs >}}
{{% tab "ブール値" %}}
結果を "Pass" とマークするには {{< ui >}}True{{< /ui >}}を選択し、"Fail" とマークするには {{< ui >}}False{{< /ui >}} を選択します。
{{% /tab %}}

{{% tab "スコア" %}}
合格となるパフォーマンスを決定するための数値しきい値を定義します。
{{% /tab %}}
{{% tab "カテゴリ別" %}}
合格状態にマッピングするカテゴリを選択します。例えば、カテゴリ`Excellent`、`Good`、`Poor` があり、`Poor` のみが不合格状態に対応する必要がある場合は、`Excellent` と `Good` を選択します。
{{% /tab %}}
{{% tab "JSON" %}}
LLM-as-a-Judge 評価者からの出力に基づいて評価を割り当てる JavaScript 関数を提供します。この関数は、次の形式の json オブジェクトを返す必要があります。

```
{
    assessment: "pass", // "pass" | "fail" [REQUIRED],
    value: "evaluation_label" // string [OPTIONAL],
    reasoning: "explanation behind the assessment" // string [OPTIONAL]

}
```
また、関数シグネチャは `function __evalPostProcessing(input)` でなければならず、 `input` は評価者からの json です。以下の関数は、後処理関数の例です。

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
1.  {{< ui >}}JSON{{< /ui >}} 出力タイプを選択します。

2. 評価者の評価、値、および推論を特定するための JavaScript 関数を提供します。後処理により、Boolean、Score、または Categorical の構造化出力を使用するだけでなく、より複雑な評価を行うことができます。

    後処理関数は、値が "pass" または "fail" である**評価**を含むオブジェクトを返す必要があり、オプションで値または推論の文字列を含めることができます。この関数は、次の形式の json オブジェクトを返す必要があります。
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
   <div class="alert alert-info">キーワード検索出力の場合、<strong>Boolean</strong> 出力タイプのみ利用可能です。</div>

2. 評価結果がそれぞれ true または false となる条件を定義する {{< ui >}}True keywords{{< /ui >}} と {{< ui >}}False keywords{{< /ui >}} を指定します。

   Datadog は、LLM-as-a-judge の応答テキストから定義されたキーワードを検索し、評価のための適切な結果を提供します。このため、選択したキーワードで応答するよう LLM に指示する必要があります。

   例: 次のように設定した場合:

   - {{< ui >}}True keywords{{< /ui >}}: Yes、yes
   - {{< ui >}}False keywords{{< /ui >}}: No、no

   その場合、システムプロンプトには `Respond with "yes" or "no"` のような内容を含める必要があります。

3. {{< ui >}}Assessment Criteria{{< /ui >}} の場合:
   - "Pass" として結果をマークするには {{< ui >}}True{{< /ui >}} を選択します
   - "Fail" として結果をマークするには {{< ui >}}False{{< /ui >}} を選択します

   この柔軟性により、評価結果をチームの品質基準に合わせることができます。合格/不合格のマッピングは、Datadog Agent Observability 全体での自動化も促進し、モニターやダッシュボードで回帰にフラグを立てたり、全体的な健全性を追跡したりできるようにします。
{{% /collapse-content %}}

{{< img src="llm_observability/evaluations/custom_llm_judge_5-2.png" alt="構造化出力の下でカスタム評価出力を構成し、推論と評価基準を含めます。" style="width:100%;" >}}

### 評価スコープの定義: フィルタリングとサンプリング {#define-the-evaluation-scope-filtering-and-sampling}

<div class="alert alert-info">評価に使用されるスパンフィールドは、それぞれ 250 KB に制限されています。このサイズを超えるフィールドは、LLM 評価に送信される前に切り捨てられます。</div>

{{< ui >}}Evaluation Scope{{< /ui >}} の下で、評価の実行場所と実行方法を定義します。これは、カバレッジ (どのスパンまたはトレースが含まれるか) とコスト (どれだけサンプリングされるか) を制御する上で役立ちます。
   - {{< ui >}}Application{{< /ui >}}: 評価するアプリケーションを選択します。
   - {{< ui >}}Evaluate On{{< /ui >}}: 次の中から 1 つを選択します。
      - {{< ui >}}Trace{{< /ui >}}: すべてのスパンを含む全体のトレースを単一ユニットとして評価します。回答が複数のスパンにまたがるコンテキスト (エージェントの目標達成、ツール使用チェーン、RAG の忠実度など) に依存する場合に使用します。トレースの完了がどのように決定されるかの例と詳細については、[トレースレベル評価][16] を参照してください。
      - {{< ui >}}Span{{< /ui >}}: 一致するスパンを個別に評価します。{{< ui >}}Query{{< /ui >}} フィールドを使用して、特定のスパン (例: ルートスパンのみ、`llm` スパンのみ、または特定のタグを持つスパンのみ) にスコープを絞ります。
      - {{< ui >}}Session{{< /ui >}}: すべてのトレースとそのスパンを含むユーザーセッション全体を単一ユニットとして評価します。回答が同じセッション内の複数のトレースにわたるコンテキスト (ユーザー満足度、マルチターンの一貫性、または経時的なユーザー行動など) に依存する場合に使用します。`session_id` タグが付いたスパンが必要です。セッションの完了がどのように決定されるかの例と詳細については、[セッションレベル評価][17] を参照してください。
   - {{< ui >}}Query{{< /ui >}}: (オプション) Datadog クエリ構文を使用してクエリを入力し、評価対象のスパンまたはトレースをフィルタリングします。例:
      - `@name:agent.workflow`: スパン名でフィルタリング
      - `env:prod`: タグでフィルタリング
      - `@parent_id:undefined`: ルートスパンのみを評価 ({{< ui >}}Evaluate On{{< /ui >}} が {{< ui >}}Span{{< /ui >}} に設定されている場合)
      - `@name:agent.workflow AND env:prod`: スパン名とタグでフィルタリング
   - {{< ui >}}Sampling Rate{{< /ui >}}: (オプション) サンプリング (例: 10%) を適用して、評価コストを制御します。

{{< img src="llm_observability/evaluations/evaluation_scope_1.png" alt="評価スコープの構成。" style="width:100%;" >}}

### テストとプレビュー {#test-and-preview}

右側のペインには、設定された評価スコープに対応する {{< ui >}}Filtered Spans{{< /ui >}} (またはトレース) が表示されます。

スパンを選択すると、評価で使用可能な JSON データが表示されます。次に、{{< ui >}}Test Evaluation{{< /ui >}} をクリックしてスパンのデータで評価の入力を事前入力し、{{< ui >}}Run{{< /ui >}} をクリックしてテストします。

## 結果の表示と使用 {#viewing-and-using-results}

評価を {{< ui >}}Save and Publish{{< /ui >}} すると、Datadog は対象のスパンに対して自動的に評価を実行します。または、{{< ui >}}Save as Draft{{< /ui >}} して、後で評価を編集または有効にすることもできます。

結果は、公開された評価について Agent Observability 全体でほぼリアルタイムで利用可能です。特定のスパンに対するカスタム LLM-as-a-judge の結果は、他の評価と並んで {{< ui >}}Evaluations{{< /ui >}} タブで確認できます。

{{< img src="llm_observability/evaluations/custom_llm_judge_3-2.png" alt="カスタム評価の結果が管理された評価と並んで表示される、トレースの評価タブ。" style="width:100%;" >}}

各評価結果には以下が含まれます。

- 評価される値 (例: `True`、`9`、または `Neutral`)
- 推論 (有効な場合)
- 合格/不合格のインジケーター (評価基準に基づく)

構文 `@evaluation.<evaluation_name>.value` を使用して、結果をクエリまたは可視化します。

例:

```
@evaluation.helpfulness-check.value
```

{{< img src="llm_observability/evaluations/custom_llm_judge_4.png" alt="Agent Observability の Traces ビュー。検索ボックスでユーザーが `@evaluation.budget-guru-intent-classifier.value:budgeting_question`を入力すると、その下に結果が表示されます。" style="width:100%;" >}}


以下のことができます。
- 評価結果でトレースをフィルタリングする (例: `@evaluation.helpfulness-check.value`)
- 合格/不合格の評価ステータスでフィルタリングする (例: `@evaluation.helpfulness-check.assessment:fail`)
- 評価結果を [ファセット][3] として使用する
- Agent Observability Overview ページの Evaluation セクションで集計結果を表示する
- パフォーマンスの変化や回帰に対してアラートを送信する [モニター][4] を作成する

## 実験での使用 {#using-in-experiments}

カスタムの LLM-as-a-judge 評価をローカルの [LLM Experiment][8] で再利用するには、SDK から `RemoteEvaluator` を使用して名前で参照します。

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

`RemoteEvaluator` を同じ実験内の他のローカル評価者と組み合わせることができます。カスタム入力マッピング、エラー処理、その他のオプションについては、評価開発者ガイドの [RemoteEvaluator][9] を参照してください。

## 信頼性の高いカスタム評価のためのベストプラクティス {#best-practices-for-reliable-custom-evaluations}

- **小さく始める**: 拡張する前に、明確に定義された単一のエラーモードを対象とします。
- **推論を有効にする**: 説明可能な決定が必要な場合や、複雑な推論タスクの精度を向上させる必要がある場合に使用します。
- **反復する**: 実行し、出力を検査し、プロンプトを改善します。
- **検証する**: サンプリングされたトレースを使用して、定期的に評価器の精度をチェックします。
- **ルーブリックを文書化する**: "Pass" と "Fail" の定義を明確にし、時間の経過による乖離を防ぎます。
- **評価者を再調整する**: 基盤となる LLM が更新されたら、プロンプトと少数例を再評価します。

## 推定トークン使用量 {#estimated-token-usage}

[LLM Evaluations Token Usage ダッシュボード][10] を使用して、LLM 評価のトークン使用量を監視できます。

詳細が必要な場合は、以下のメトリクスを使用して、評価の実行に消費された LLM リソースを追跡できます。

- `ml_obs.estimated_usage.llm.input.tokens`
- `ml_obs.estimated_usage.llm.output.tokens`
- `ml_obs.estimated_usage.llm.total.tokens`

これらの各メトリクスには `ml_app`、`model_server`、`model_provider`、`model_name`、および `evaluation_name` タグがあり、使用量に寄与している特定のアプリケーション、モデル、および評価を特定できます。

## API から LLM-as-a-judge 評価を構成する {#configure-llm-as-a-judge-evaluations-from-the-api}

環境で `DD_API_KEY` [API キー][14] を指定した後、基本的な CRUD 操作を使用して管理対象の評価構成を操作できます。

 - [GET][11] 既存の評価構成
 - [PUT][12] 既存の評価構成
 - [DELETE][13] 既存の評価構成

## 詳細情報 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /ja/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/connect_to_account
[3]: /ja/events/explorer/facets/
[4]: /ja/monitors/
[5]: https://arxiv.org/abs/2504.00050
[6]: /ja/llm_observability/evaluations/evaluation_compatibility
[7]: /ja/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations/
[8]: /ja/llm_observability/experiments
[9]: /ja/llm_observability/guide/evaluation_developer_guide/#using-managed-evaluators
[10]: https://app.datadoghq.com/dash/integration/llm_evaluations_token_usage
[11]: /ja/api/latest/agent-observability/#get-a-custom-evaluator-configuration
[12]: /ja/api/latest/agent-observability/#create-or-update-a-custom-evaluator-configuration
[13]: /ja/api/latest/agent-observability/#delete-a-custom-evaluator-configuration
[14]: /ja/account_management/api-app-keys
[15]: /ja/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/prompt_templating
[16]: /ja/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/trace_level_evaluations
[17]: /ja/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/session_level_evaluations
[18]: https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations