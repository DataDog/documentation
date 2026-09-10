---
aliases:
- /ko/llm_observability/evaluations/pydantic_evaluations/
- /ko/llm_observability/configure/evaluations/external_evaluations/pydantic/
description: Agent Observability 실험에서 Pydantic 평가를 사용하세요.
further_reading:
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: 설명서
  text: 평가 제출
title: Pydantic 평가
---
## 개요 {#overview}

Pydantic은 즉시 사용 가능한 평가를 제공하고, 사용자 지정 가능한 LLM 평가를 허용하는 오픈 소스 프레임워크입니다. 자세한 내용은 [Pydantic 설명서][3]를 참조하세요.

Agent Observability를 사용하여 [실험][1]에서 Pydantic 평가 및 스칼라 Pydantic 보고서 평가를 실행할 수 있습니다. Pydantic 평가 결과는 [Agent Observability 데이터세트][5]의 각 인스턴스에 연결된 평가자 결과로 나타납니다. Pydantic 보고서 평가는 전체 Agent Observability 데이터세트에서 실행되며 데이터세트에 대한 하나의 스칼라 결과를 보고합니다.

## 설정 {#setup}

1. [Agent Observability 실험][2]과 [Agent Observability 데이터세트][4]를 설정합니다.
2. 다음 코드 샘플과 같이 LLMObs `Experiment`의 `evaluators` 파라미터에 Pydantic 평가자를 제공하세요. (선택 사항) LLMObs `Experiment`의 `summary_evaluators` 파라미터에 Pydantic 보고서 평가자를 제공하세요. **참고**: `ScalarResult`를 반환하는 Pydantic 보고서 평가자만 지원됩니다.

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

작동하는 예시는 [GitHub의 Datadog Pydantic 데모][6]를 참조하세요.

### 사용량 {#usage}
Pydantic 평가를 활용하여 실험을 실행한 후, Datadog의 해당 실험 실행에서 인스턴스별 Pydantic 평가 결과를 확인할 수 있습니다. 다음 실험에서는 두 개의 Pydantic 평가('ComprehensiveCheck'라는 이름의 사용자 지정 Pydantic 평가자와 'EqualsExpected'라는 이름의 내장 평가자)와 하나의 Pydantic 보고서 평가자('TotalCasesEvaluator'라는 이름의 사용자 지정 Pydantic 보고서 평가자)가 실행되었습니다.

{{< img src="llm_observability/pydantic-experiment-result.png" alt="Pydantic 평가자를 활용한 Agent Observability 실험." style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/improve/experiments
[2]: /ko/llm_observability/improve/experiments/setup#create-an-experiment
[3]: https://ai.pydantic.dev/evals/
[4]: /ko/llm_observability/improve/experiments/setup#create-a-dataset
[5]: /ko/llm_observability/improve/datasets
[6]: https://github.com/DataDog/llm-observability/blob/main/experiments/eval-integrations/2-pydantic-demo.py