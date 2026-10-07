---
aliases:
- /ja/llm_observability/evaluations/pydantic_evaluations/
- /ja/llm_observability/configure/evaluations/external_evaluations/pydantic/
description: Agent Observability ExperimentsでPydantic評価を使用します。
further_reading:
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: ドキュメント
  text: 評価の送信
title: Pydantic 評価
---
## 概要 {#overview}

Pydanticは、すぐに使用できる評価を提供し、カスタマイズ可能なLLM評価を可能にするオープンソースフレームワークです。詳細については、[Pydanticのドキュメント][3]を参照してください。

Agent Observabilityを使用して、[Experiments][1]でPydantic評価およびスカラーPydanticレポート評価を実行できます。Pydantic評価結果は、[Agent Observabilityデータセット][5]内の各インスタンスに関連付けられた評価者結果として表示されます。Pydanticレポート評価は、Agent Observabilityデータセット全体で実行され、データセットに対して1つのスカラー結果を報告します。

## セットアップ {#setup}

1. [Agent Observability Experiment][2]と[Agent Observability Dataset][4]をセットアップしてください。
2. 次のコードサンプルのように、LLMObs `evaluators`の`Experiment`パラメータにPydantic評価者を指定してください。（オプション）LLMObs `summary_evaluators`の`Experiment`パラメータにPydanticレポート評価者を指定してください。**注**：`ScalarResult`を返すPydanticレポート評価のみがサポートされています。

```python 

from pydantic_evals.evaluators import (
    EqualsExpected,
    EvaluationReason,
    Evaluator,
    EvaluatorContext,
    EvaluatorOutput,
    LLMJudge,
    ReportEvaluator,
    ReportEvaluatorContext,
)
from pydantic_evals.reporting.analyses import ScalarResult

from ddtrace.llmobs import LLMObs


LLMObs.enable(
    api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
    app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
    site="datadoghq.com",      # defaults to DD_SITE environment variable
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)


# this can be any Pydantic evaluator
@dataclass
class ComprehensiveCheck(Evaluator): 
    def evaluate(self, ctx: EvaluatorContext) -> EvaluatorOutput:
        format_valid = self._check_format(ctx.output)

        to_return = {
            'valid_format': EvaluationReason(
                value=format_valid,
                reason='Valid JSON format' if format_valid else 'Invalid JSON format',
            ),
            'quality_score': self._score_quality(ctx.output),  
            'category': self._classify(ctx.output),  
        }
        return to_return

    def _check_format(self, output: str) -> bool:
        return output.startswith('{') and output.endswith('}')

    def _score_quality(self, output: str) -> float:
        return len(output) / 100.0

    def _classify(self, output: str) -> str:
        return 'short' if len(output) < 50 else 'long'

# This can be any Pydantic ReportEvaluator that returns ScalarResult
class TotalCasesEvaluator(ReportEvaluator):
    def evaluate(self, ctx: ReportEvaluatorContext) -> ScalarResult:
        return ScalarResult(
            title='Total',
            value=len(ctx.report.cases),
            unit='cases',
        )

dataset = LLMObs.create_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project",  # optional, defaults to project_name used in LLMObs.enable
    description="Questions about world capitals",
    records=[
        {
            "input_data": {
                "question": "What is the capital of China?"
            },  # required, JSON or string
            "expected_output": "Beijing",  # optional, JSON or string
            "metadata": {"difficulty": "easy"},  # optional, JSON
        },
        {
            "input_data": {
                "question": "Which city serves as the capital of South Africa?"
            },
            "expected_output": "Pretoria",
            "metadata": {"difficulty": "medium"},
        },
    ],
)

def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None, metadata: Optional[Dict[str, Any]] = None) -> str:
    question = input_data['question']
    # Your LLM or processing logic here
    return "Beijing" if "China" in question else "Unknown"


llm_judge = LLMJudge(
    rubric='Response provides the same answer as expected, possibly with explanation',
    include_input=True,
    include_expected_output=True,
)

experiment = LLMObs.experiment(
    name="<EXPERIMENT_NAME>",
    task=my_task, 
    dataset=dataset,
    evaluators=[EqualsExpected(), ComprehensiveCheck(), llm_judge],
    summary_evaluators=[TotalCasesEvaluator()],
    description="<EXPERIMENT_DESCRIPTION>",
)


results = experiment.run(jobs=4, raise_errors=True)

print(f"View experiment: {experiment.url}")
```

動作例については、[DatadogのGitHubにあるPydanticデモ][6]を参照してください。

### 使用方法 {#usage}
Pydantic評価を含む実験を実行した後、Datadogの対応する実験実行において、インスタンスごとのPydantic評価結果を表示することができます。以下の実験では、2つのPydantic評価（「ComprehensiveCheck」という名前のカスタムPydantic評価と、「EqualsExpected」という名前の組み込み評価）と、1つのPydanticレポート評価（「TotalCasesEvaluator」という名前のカスタムPydanticレポート評価）が実行されました。

{{< img src="llm_observability/pydantic-experiment-result.png" alt="Pydantic評価を使用したAgent Observability実験です。" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/improve/experiments
[2]: /ja/llm_observability/improve/experiments/setup#create-an-experiment
[3]: https://ai.pydantic.dev/evals/
[4]: /ja/llm_observability/improve/experiments/setup#create-a-dataset
[5]: /ja/llm_observability/improve/datasets
[6]: https://github.com/DataDog/llm-observability/blob/main/experiments/eval-integrations/2-pydantic-demo.py