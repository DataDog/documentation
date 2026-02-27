---
title: DeepEval Evaluations
aliases:
 - /llm_observability/evaluations/deepeval_evaluations/
further_reading:
- link: "/llm_observability/guide/evaluation_developer_guide/deepeval"
  tag: "Documentation"
  text: "Submit DeepEval Evaluations"
---

## Overview

DeepEval is an opensource LLM Evaluation framework that provides ready-to-use LLM Metrics and allows for customizable LLM Evaluations. For more information, see [DeepEval's documentation][3].

You can use LLM Observability to run DeepEval evaluations in [Experiments][1]. DeepEval evaluation results appear as evaluator results tied to each instance in an [LLM Obs Dataset][5].

## Setup

Follow the steps here to set up an LLMObs [Experiment][2] and [Dataset][4]. Provide a DeepEval evaluator to the `evaluators` parameter in an LLMObs `Experiment` as demonstrated below. A working example is available [here][6].

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

def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> str:
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

### Usage
After you run an experiment with a DeepEval evaluation, you can view the DeepEval evaluation results per instance in the corresponding experiment run in Datadog:

{{< img src="llm_observability/deepeval-experiment-result.png" alt="An LLM Observability experiment with a DeepEval evaluator." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/experiments
[2]: /llm_observability/experiments/setup#create-an-experiment
[3]: https://deepeval.com/docs/metrics-introduction
[4]: /llm_observability/experiments/setup#create-a-dataset
[5]: /llm_observability/experiments/datasets
[6]: https://github.com/DataDog/llm-observability/blob/0b832ac332cb262c208804fce6fbff7676834452/experiments/eval-integrations/1-deepeval-demo.py