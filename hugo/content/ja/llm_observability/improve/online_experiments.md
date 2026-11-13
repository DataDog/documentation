---
aliases:
- /ja/experiments/guide/run_online_experiment_on_llm_application/
description: ライブトラフィックで LLM アプリケーションのバリアントを比較し、Agent Observability の評価でその効果を測定します。
further_reading:
- link: /llm_observability/improve/offline_experiments
  tag: ドキュメント
  text: Agent Observability オフライン実験
- link: /llm_observability/investigate/evaluations/
  tag: ドキュメント
  text: Agent Observability 評価
- link: /getting_started/feature_flags/
  tag: ドキュメント
  text: Feature Flags の概要
- link: /experiments/reading_results/
  tag: ドキュメント
  text: 実験結果の読み取り
title: オンライン実験
---
## 概要{#overview}

オンライン実験では、ライブの本番環境トラフィック上で LLM アプリケーションや Agent の複数のバージョンを比較します。Datadog Feature Flags は、ユーザーや自律的なワークフロー実行などの各 [実験対象][2] を、コントロールまたはトリートメントのバリアントに割り当てます。Agent Observability の評価は各対象の結果を測定し、[Datadog Experiments][1] はバリアント間の差が統計的に有意かどうかを判断します。

オンライン実験を使用すると、新しいモデル、プロンプト、ツールなどの変更を、オフラインでテストした後に実際のユーザーに対して検証することができます。

オンライン実験のセットアップには、以下のステップが含まれます。

1. [Datadog の機能フラグ][14]を作成します。
1. アプリケーションでフラグを評価し、割り当てられたバリアントを実行します。
1. Agent Observability の評価をレポートします。
1. 機能フラグと評価を Datadog 実験にリンクします。
1. 実験を実行し、結果を確認します。

{{< skill-callout
    title="エージェントによるオンライン実験の開始"
    text="Copy this prompt into your AI coding agent to use the `agent-observability-online-experiment` skill for guided setup."
    action_name="copy_agent_observability_online_experiment_prompt"
    lang="text" >}}
https://github.com/datadog-labs/agent-skills/blob/main/agent-observability/agent-observability-online-experiment/SKILL.md にあるスキルを使用して、現在の Git ブランチのコードをトランクと比較するオンライン実験を開始します。トラフィックの 10% で、自身のブランチのコードを使用するようにします。
{{< /skill-callout >}}

## 前提条件{#prerequisites}

開始する前に

- [LLM アプリケーションを Agent Observability にインスツルメントします][3]。
- アプリケーションに [Datadog Feature Flags SDK][4] をインストールして初期化します。
- 比較したいアプリケーションの動作と、結果を測定する評価を選択します。評価は、数値スコア、または合格/不合格の評価を返す必要があります。
- 「[実験の計画と開始][5]」に記載されている権限があることを確認します。

<div class="alert alert-info"><strong>AI コーディングエージェントを使用している場合: </strong>Datadog 組織では、デフォルトで読み取り専用の <a href="/llm_observability/build_with_ai/mcp_server/">MCP ツール</a>が許可されています。エージェントが機能フラグや実験を作成できるようにするには、組織管理者が MCP 書き込みアクセスを有効にする必要があり、また、ロールに <code>mcp_write</code> 権限が含まれている必要があります。Datadog MCP Server の「<a href="/mcp_server/setup/#required-permissions">必要な権限</a>」を参照してください。</div>

{{< agent-only >}}
**AI エージェントのための指示**: Datadog リソースを作成または変更する MCP ツールを呼び出す前に、必要な書き込みツールが利用可能であることを確認してください。書き込みアクセスが利用できない場合は、ユーザーに「[必要な権限 ](/mcp_server/setup/#required-permissions)」を案内し、アクセスが有効になるまで待機してください。
{{< /agent-only >}}

## ステップ 1: 機能フラグの作成{#step-1-create-a-feature-flag}

「[最初の機能フラグを作成][6]」の手順に従って、テスト対象のアプリケーションの動作に対する Boolean フラグを作成します。一方の値をコントロールの動作、もう一方の値をトリートメントの動作に使用します。

実験を実行する予定の環境ごとにフラグを利用できるようにします。フラグにターゲティングルールを追加したり、パーセンテージロールアウトを構成したりしないでください。実験を開始すると、Datadog がトラフィックの分割を制御する実験ターゲティングルールを追加します。

{{< img src="/product_analytics/experiment/guide/llm_experiment_create_feature_flag.png" alt="use-latest-frontier-model というフラグ名、Boolean バリアントタイプ、false および true バリアント、[Create Flag] ボタンが表示された [Create Flag] ページ。" style="width:90%;" >}}

## ステップ 2: アプリケーションでのフラグの評価 {#step-2-evaluate-the-flag-in-your-application}

「[フラグを評価し、機能フラグのコードを記述する][7]」の手順に従ってフラグを評価し、その値に基づいてコントロールまたはトリートメントの動作を実行します。

Feature Flags の評価コンテキスト `targetingKey` を、実験対象の安定した識別子に設定します。

- 人間のユーザーが存在するアプリケーションの場合は、安定したユーザー識別子を使用します。
- 人間のユーザーが存在しない自律的なワークフローの場合は、実行の開始時に UUID を生成し、実行全体を通してそれを保持します。

[ステップ 3](#step-3-report-an-evaluation) で評価をレポートする際にも、`subject_identifier` にこれと同じ値を使用します。値が一致しない場合、Datadog は評価を対象の実験エクスポージャーに関連付けることができません。詳細については、「[ターゲティングキー][8]」を参照してください。

## ステップ 3: 評価のレポート{#step-3-report-an-evaluation}

<div class="alert alert-warning"><strong>サポートされている評価タイプ</strong>: 実験メトリクスでは、 <code>score</code> 評価の平均値、または合否判定を返す評価の<strong>合格率</strong>を使用できます。合格率では、 <code>pass</code> を 1、 <code>fail</code> を 0 としてカウントし、判定のない評価は除外します。生のブール値およびカテゴリー値は、実験メトリクスとして直接使用することはできません。</div>

以下のいずれかの方法を選択します。

### 外部評価の送信{#submit-an-external-evaluation}

「[外部評価][9]」の手順に従って、アプリケーションコードから評価を送信します。機能フラグの評価に使用された `targetingKey` と正確に一致する値を持つ `subject_identifier` タグを追加します。

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

score = 0.42
subject_key = "82a4e675-9cb4-4da6-a91a-819574152a63"
span_context = LLMObs.export_span(span=None)

LLMObs.submit_evaluation(
    span=span_context,
    ml_app="<ML_APP>",
    label="<EVALUATION_NAME>",
    metric_type="score",
    value=score,
    tags={
        "subject_identifier": subject_key,
    },
    assessment="pass" if score > 0.5 else "fail",
)
{{< /code-block >}}

### マネージド評価の使用{#use-a-managed-evaluation}

「[マネージド評価][10]」の手順に従って、評価を作成および公開します。マネージド評価によって評価されるスパンに、機能フラグの評価に使用された `targetingKey` と正確に一致する値を持つ `subject_identifier` タグを追加します。

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

subject_key = "82a4e675-9cb4-4da6-a91a-819574152a63"

with LLMObs.workflow(name="my_workflow") as span:
    LLMObs.annotate(
        span=span,
        tags={"subject_identifier": subject_key},
    )
    # Run the rest of the instrumented workflow.
{{< /code-block >}}

トレースレベルの評価の場合は、タグをトレースのルートスパンに追加します。セッションレベルの評価は、実験メトリクスをサポートしていません。

## ステップ 4: 実験の作成と開始{#step-4-create-and-launch-the-experiment}

「[実験の計画と開始][5]」の手順に従って、実験を作成して開始します:

1. プライマリメトリクスとして、[ステップ 3](#step-3-report-an-evaluation) の Agent Observability 評価に基づいてメトリクスを選択します。実験のメトリクスを作成していない場合は、「[Agent Observability データからメトリクスを作成する][13]」の手順に従ってください。
1. [ステップ 1](#step-1-create-a-feature-flag) の機能フラグを追加します。
1. コントロールバリアントとトリートメントバリアントの間でのトラフィックの分割方法を構成します。
1. 実験を開始します。

{{< agent-only >}}
**AI エージェントへの指示**: 下書きの実験を作成した後、Datadog から返された完全な実験 URL を最終回答に含めます。エージェントを実行する人間のユーザーは、実験を開き、その構成を確認し、Datadog UI でトラフィックの分割を構成するために、このリンクが必要です。
{{< /agent-only >}}

実験を開始すると、選択したフラグに実験ターゲティングルールが追加され、エクスポージャーの記録が開始されます。機能フラグの割り当てがどのように実験エクスポージャーになるかの詳細については、[Feature Flags と実験][11]を参照してください。

{{< img src="/product_analytics/experiment/guide/llm_experiment_create_experiment.png" alt="latest-frontier-model-experiment という名前、[Start from scratch] プロトコル、および [Create Draft Experiment] ボタンが表示された [Create new draft experiment] ダイアログ。" style="width:90%;" >}}

## ステップ 5: 実験の実行と結果の確認{#step-5-run-the-experiment-and-review-results}

アプリケーションを通じてトラフィックを送信します。各対象について、アプリケーションは機能フラグを評価し、同じ対象識別子を使用して評価をレポートする必要があります。

エクスポージャーと評価が届くと、Datadog の実験結果にデータが反映されます。「[実験結果の読み取り][12]」の手順に従って、メトリクススコアカードを解釈し、バリアントを比較します。

{{< img src="/product_analytics/experiment/guide/llm_experiment_results.png" alt="コントロールバリアントとトリートメントバリアント全体におけるロールアウト決定、および品質、トークン使用量、推定コストメトリクスに関する相対リフトを示す、完了した LLM アプリケーション実験。" style="width:90%;" >}}

## トラブルシューティング{#troubleshooting}

実験でメトリクスデータが欠落しているとレポートされた場合は、以下を確認してください。

- アプリケーションが対象の実験機能フラグを評価した。
- 評価の値は、数値の `score` 値、または `pass` か `fail` の判定である。
- 評価の `subject_identifier` が、機能フラグ評価の `targetingKey` と正確に一致している。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/experiments/
[2]: /ja/experiments/concepts/subject_types/
[3]: /ja/llm_observability/instrument/
[4]: /ja/getting_started/feature_flags/#feature-flags-sdks
[5]: /ja/experiments/plan_and_launch_experiments/
[6]: /ja/getting_started/feature_flags/#step-2-create-a-feature-flag
[7]: /ja/getting_started/feature_flags/#step-3-evaluate-the-flag-and-write-feature-code
[8]: /ja/feature_flags/concepts/evaluation_context/#the-targeting-key
[9]: /ja/llm_observability/investigate/evaluations/external_evaluations/
[10]: /ja/llm_observability/investigate/evaluations/managed_evaluations/
[11]: /ja/feature_flags/concepts/experiments/
[12]: /ja/experiments/reading_results/
[13]: /ja/experiments/defining_metrics/?tab=agentobservability#create-a-metric-from-agent-observability-data
[14]: /ja/feature_flags/