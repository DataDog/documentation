---
aliases:
- /ko/llm_observability/evaluations/deepeval_evaluations/
- /ko/llm_observability/configure/evaluations/external_evaluations/deepeval/
description: Agent Observability 실험에서 DeepEval 평가를 사용하세요.
further_reading:
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: 설명서
  text: 평가 제출
- link: https://www.datadoghq.com/blog/using-evaluation-frameworks-with-agent-observability/
  tag: 블로그
  text: Agent Observability을 활용한 평가 프레임워크 사용
title: DeepEval 평가
---
## 개요 {#overview}

DeepEval은 즉시 사용 가능한 LLM 메트릭을 제공하고, 사용자 지정 가능한 LLM 평가를 허용하는 오픈 소스 프레임워크입니다. 자세한 내용은 [DeepEval 설명서][3]를 참조하세요.

Agent Observability를 사용하여 [실험][1]에서 DeepEval 평가를 실행할 수 있습니다. DeepEval 평가 결과는 [Agent Observability 데이터세트][5]의 각 인스턴스에 연결된 평가자 결과로 나타납니다.

## 설정 {#setup}

1. [Agent Observability 실험][2]과 [Agent Observability 데이터세트][4]를 설정합니다.
2. 다음 코드 샘플과 같이 LLMObs `Experiment`의 `evaluators` 파라미터에 DeepEval 평가자를 제공하세요. 작동하는 예시는 [GitHub의 Datadog DeepEval 데모][6]를 참조하세요.

```python 

from deepeval.metrics import GEval
from deepeval.test_case import LLMTestCaseParams

from ddtrace.llmobs import LLMObs


LLMObs.enable(
    api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
    app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
    site="datadoghq.com",      # defaults to DD_SITE environment variable
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)


# this can be any DeepEval evaluator
deepeval_evaluator = GEval(
    name="<EVAL_NAME>",
    criteria="<CRITERIA>",
    evaluation_steps=[
        "<EVALUATION STEP 1",
        "...",
        "<EVALUATION STEP2>"
    ],
    evaluation_params=[LLMTestCaseParams.INPUT, LLMTestCaseParams.ACTUAL_OUTPUT, LLMTestCaseParams.EXPECTED_OUTPUT],
    async_mode=True,
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

def num_exact_matches(inputs, outputs, expected_outputs, evaluators_results):
    return evaluators_results["<EVAL_NAME>"].count(True)

experiment = LLMObs.experiment(
    name="<EXPERIMENT_NAME>",
    task=my_task, 
    dataset=dataset,
    evaluators=[deepeval_evaluator],
    summary_evaluators=[num_exact_matches], # optional
    description="<EXPERIMENT_DESCRIPTION>",
)



results = experiment.run(jobs=4, raise_errors=True)

print(f"View experiment: {experiment.url}")
```

### 사용량 {#usage}
DeepEval 평가를 활용하여 실험을 실행한 후, Datadog의 해당 실험 실행에서 인스턴스별 DeepEval 평가 결과를 확인할 수 있습니다. 아래 실험에서는 'Correctness'라는 이름의 DeepEval 평가자가 실행되었습니다.

{{< img src="llm_observability/deepeval-experiment-result.png" alt="DeepEval 평가자를 활용한 Agent Observability 실험." style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/improve/experiments
[2]: /ko/llm_observability/improve/experiments/setup#create-an-experiment
[3]: https://deepeval.com/docs/metrics-introduction
[4]: /ko/llm_observability/improve/experiments/setup#create-a-dataset
[5]: /ko/llm_observability/improve/datasets
[6]: https://github.com/DataDog/llm-observability/blob/main/experiments/eval-integrations/1-deepeval-demo.py