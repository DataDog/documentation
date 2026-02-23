---
title: Advanced Experiment Runs
description: Run experiments multiple times to account for model variability and automate experiment execution in CI/CD pipelines. 
---

This page discusses advanced topics in running experiments, including [multiple experiment runs](#multiple-runs) and [setting up experiments in CI/CD](#setting-up-your-experiment-in-cicd).

## Multiple runs

You can run the same experiment multiple times to account for model non-determinism. You can use the [LLM Observability Python SDK][1] or [Experiments API][2] to specify how many iterations to run; subsequently, each dataset record is executed that many times using the same tasks and evaluators. 

### Multiple runs with the Python SDK
<div class="alert alert-info">Requires LLM Observability Python SDK v4.1+.</div>

Define an optional `runs` parameter in your experiment method, as shown in the following example:

{{< highlight py "hl_lines=7" >}}
experiment = LLMObs.experiment(
    name="example-experiment",
    dataset=dataset,
    task=topic_relevance,
    evaluators=[exact_match, false_confidence],
    config={"model": "gpt-4o-mini", "temperature": 0.3, "personality": "helpful"},
    runs=5    
)

{{< /highlight >}}

If you do not define `runs`, your experiment defaults to running 1 iteration.

### Multiple runs with the Experiments API

Include a `run_count` field in your request body, as shown in the following example:
{{< highlight json "hl_lines=9" >}}
{
  "data": {
    "type": "experiments",
    "attributes": {
        "project_id": "<project_id>",
        "dataset_id": "<dataset_id>",
        "name": "example-experiment",
        "description": "",
        "run_count": 5,
        "metadata": {
            "team": ""
        },
        "config": {"model": "gpt-4o-mini", "temperature": 0.3, "personality": "helpful"}
    }
  }
}

{{< /highlight >}}

If you do not define `run_count`, your experiment defaults to running 1 iteration.

### Analyzing multiple-run experiment results in Datadog

Navigate to [LLM Experiments][3] in Datadog and select an experiment with multiple runs.

At the **Summary** level, evaluations and metrics are computed as:
- For score-based evaluations, the average across record averages
- For categorical evaluations, the mode across record modes

At the **Record** level, evaluations and metrics are computed as:
- For score-based evaluations, the average across runs on the input
- For categorical evaluations, the mode across runs on the input

#### Searching and filtering

To filter by evaluations or metrics for multiple runs, use `@multi_run_avg` for score-based evaluations, or `@multi_run_mode` for categorical evaluations.

For example:

```
@multi_run_avg.@evaluations.custom.random_evaluator:>0.5  @multi_run_mode.@evaluations.custom.sentient_evaluator:positive
```

{{< img src="llm_observability/evaluations/multi-run-query.png" alt="The experiment records view showing a search query using multi-run filters. The search bar displays the query @multi_run_avg.@evaluations.custom.random_evaluator:>=0.5 @multi_run_mode.@evaluations.custom.sentiment_evaluator:positive. The left sidebar shows filters for Duration, Status, and Custom Evaluations with checkboxes and range sliders. The main table displays 8 of 127 filtered records with columns for input prompts, expected output, evaluation results including exact_match, false_confidence, random_evaluator scores, sentiment_evaluator values, duration, and estimated cost." style="width:100%;" >}}

Queries that mix `@multi_run_avg.` columns and plain `@trace.` columns are **not supported**.

For example:
- Supported: `@multi_run_avg.@trace.total_tokens:>1000` (All records where the average token count is over 1000 tokens)
- Supported: `run_iteration:1 @trace.total_tokens:>1000` (All records in the first run where the total tokens in the first run were over 1000)
- Unsupported: `@multi_run_avg.@trace.total_tokens:>1000 @trace.estimated_total_cost:>0.01` (All records where the average tokens across all runs were over 1000, and the cost of the first run was over 1 cent)

#### Comparing experiment runs

Similarly to how you can compare single-run experiments, you can compare multiple-run experiments by selecting particular runs. For example, you can compare Run 1 of Experiment A to Run 4 of Experiment B to analyze variability between runs.

{{< img src="llm_observability/evaluations/multi-run-compare.png" alt="The experiment comparison interface showing two multi-run experiments being compared. The top section displays a comparison table with aggregate metrics for each experiment including answer_correctness, random_evaluator, sentiment_evaluator, exact_match, false_confidence, and duration averages. Below, a detailed comparison view shows a dropdown menu expanded with Run 4 selected from a list of Runs 1 through 7, allowing comparison of specific runs from each experiment. The dataset records section displays input, expected output, and generated output columns with evaluation metrics for the selected runs side by side." style="width:100%;" >}}

## Setting up your experiment in CI/CD
You can run an experiment manually or configure it to run automatically in your CI/CD pipelines. For example, run it against your dataset on every change to compare results with your baseline and catch potential regressions.

### GitHub Actions
You can use the following Python script and GitHub Actions workflow as templates to run an experiment automatically whenever code is pushed to your repository.

**Note**: Workflow files live in the `.github/workflows` directory and must use YAML syntax with the `.yml` extension.

```python
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import EvaluatorResult
from typing import Dict, Any, Optional, List

LLMObs.enable(
    api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
    app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
    site="datadoghq.com",      # defaults to DD_SITE environment variable
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
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
    question = input_data["question"]
    # Your LLM or processing logic here
    return "Beijing" if "China" in question else "Unknown"


def exact_match(
    input_data: Dict[str, Any], output_data: str, expected_output: str
) -> bool:
    return output_data == expected_output


def overlap(
    input_data: Dict[str, Any], output_data: str, expected_output: str
) -> float:
    expected_output_set = set(expected_output)
    output_set = set(output_data)

    intersection = len(output_set.intersection(expected_output_set))
    union = len(output_set.union(expected_output_set))

    return intersection / union


def fake_llm_as_a_judge(input_data: Dict[str, Any], output_data: str, expected_output: str) -> EvaluatorResult:
    fake_llm_call = "excellent"
    return EvaluatorResult(
        value=fake_llm_call,
        reasoning="the model explains itself",
        assessment="pass", # or fail
        tags={"task": "judge_llm_call"},
    )


def num_exact_matches(inputs, outputs, expected_outputs, evaluators_results):
    return evaluators_results["exact_match"].count(True)


experiment = LLMObs.experiment(
    name="capital-cities-test",
    task=task,
    dataset=dataset,
    evaluators=[exact_match, overlap, fake_llm_as_a_judge],
    summary_evaluators=[num_exact_matches],  # optional
    description="Testing capital cities knowledge",
    config={"model_name": "gpt-4", "version": "1.0"},
)

results = experiment.run(jobs=4, raise_errors=True)

print(f"View experiment: {experiment.url}")
```

```yaml
name: Experiment SDK Test

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    environment: protected-main-env # The job uses secrets defined in this environment
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.13.0' # Or your desired Python version
      - name: Install Dependencies
        run: pip install ddtrace>=4.1.0 dotenv
      - name: Run Script
        run: python ./experiment_sdk_demo/main.py
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
```

[1]: /llm_observability/instrumentation/sdk?tab=python
[2]: /llm_observability/experiments/api
[3]: https://app.datadoghq.com/llm/experiments