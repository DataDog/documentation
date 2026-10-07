---
aliases:
- /ja/llm_observability/evaluations/deepeval_evaluations/
- /ja/llm_observability/configure/evaluations/external_evaluations/deepeval/
description: Agent Observability Experiments を使用して DeepEval 評価を実行します。
further_reading:
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: ドキュメント
  text: 評価の送信
- link: https://www.datadoghq.com/blog/using-evaluation-frameworks-with-agent-observability/
  tag: ブログ
  text: Agent Observability を使用した評価フレームワーク
title: DeepEval 評価
---
## 概要 {#overview}

DeepEval は、すぐに使用できる LLM メトリクスを提供し、カスタマイズ可能な LLM 評価を実行できるオープンソースフレームワークです。詳細については、[DeepEval のドキュメント][3]を参照してください。

Agent Observability を使用して、[Experiments][1] で DeepEval 評価を実行できます。DeepEval 評価結果は、[Agent Observability データセット][5] の各インスタンスに関連付けられた評価器結果として表示されます。

## セットアップ {#setup}

1. [Agent Observability Experiment][2] と [Agent Observability Dataset][4] をセットアップします。
2. 次のコードサンプルに示すように、LLMObs `Experiment` の `evaluators` パラメーターに DeepEval 評価器を指定します。動作する例については、[GitHub の Datadog の DeepEval デモ][6]を参照してください。

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

### 使用方法 {#usage}
DeepEval 評価を含む実験を実行した後、Datadog の対応する実験実行で、インスタンスごとの DeepEval 評価結果を表示できます。以下の実験では、「Correctness」という名前の DeepEval 評価器が実行されました。

{{< img src="llm_observability/deepeval-experiment-result.png" alt="DeepEval 評価器を使用した Agent Observability 実験。" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/improve/experiments
[2]: /ja/llm_observability/improve/experiments/setup#create-an-experiment
[3]: https://deepeval.com/docs/metrics-introduction
[4]: /ja/llm_observability/improve/experiments/setup#create-a-dataset
[5]: /ja/llm_observability/improve/datasets
[6]: https://github.com/DataDog/llm-observability/blob/main/experiments/eval-integrations/1-deepeval-demo.py