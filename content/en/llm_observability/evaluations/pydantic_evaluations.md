---
title: Pydantic Evaluations
description: Use Pydantic evaluations with LLM Observability Experiments.
further_reading:
- link: "/llm_observability/evaluations/external_evaluations"
  tag: "Documentation"
  text: "Submit Evaluations"
---

## Overview

Pydantic is an open source framework that provides ready-to-use evaluations and allows for customizable LLM evaluations. For more information, see [Pydantic's documentation][3].

You can use LLM Observability to run Pydantic evaluations and scalar Pydantic report evaluations in [Experiments][1]. Pydantic evaluation results appear as evaluator results tied to each instance in an [LLM Observability dataset][5]. Pydantic report evaluations appear as a scalar result tied to an LLM Observability dataset.

## Setup

1. Set up an [LLM Observability Experiment][2] and an [LLM Observability Dataset][4].
2. Provide a Pydantic evaluator to the `evaluators` parameter in an LLMObs `Experiment` as demonstrated in the following code sample. (Optional) Provide a Pydantic report evaluator to the `summary_evaluators` parameter in an LLMObs `Experiment`. **Note**: Only Pydantic report evaluators that return a `ScalarResult` are supported.
    a. For a working example, see [Datadog's Pydantic demo in GitHub][6].

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

### Usage
After you run an experiment with a Pydantic evaluation, you can view the Pydantic evaluation results per instance in the corresponding experiment run in Datadog. In the experiment below, two Pydantic evaluations (a custom Pydantic evaluator with the name "ComprehensiveCheck" and a built-in evaluator with the name "EqualsExpected") and one Pydantic report evaluator (a custom Pydantic report evaluator with the name "TotalCasesEvaluator") were run:

{{< img src="llm_observability/pydantic-experiment-result.png" alt="An LLM Observability experiment with a Pydantic evaluator." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/experiments
[2]: /llm_observability/experiments/setup#create-an-experiment
[3]: https://ai.pydantic.dev/evals/
[4]: /llm_observability/experiments/setup#create-a-dataset
[5]: /llm_observability/experiments/datasets
[6]: https://github.com/DataDog/llm-observability/blob/main/experiments/eval-integrations/2-pydantic-demo.py