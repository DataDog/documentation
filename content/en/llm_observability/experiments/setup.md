---
title: Setup and Usage
description: How to set up LLM Observability Experiments and start running experiments.
---

This page describes how to set up and use LLM Observability Experiments with the Python SDK.

## Set up LLM Observability

If you have not already set up LLM Observability:

1. Install Datadog's LLM Observability Python SDK:

   ```shell
   pip install ddtrace>=4.1.0
   ```

2. Enable LLM Observability:

   ```python
   from ddtrace.llmobs import LLMObs

   LLMObs.enable(
       api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
       app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
       site="datadoghq.com",      # defaults to DD_SITE environment variable
       project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
   )
   ```

   <div class="alert alert-warning">You must supply both an <code>api_key</code> and <code>app_key</code>.</div>

## Create a project
_Projects_ are the core organizational layer for LLM Experiments. All datasets and experiments live in a project.
You can create a project manually in the Datadog console, API, or SDK by specifying a project name that does not already exist in `LLMObs.enable`.

```python
LLMObs.enable(
    ...
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)
```

## Create a dataset

A _dataset_ is a collection of _inputs_, and _expected outputs_ and _metadata_ that represent scenarios you want to tests your agent on. Each dataset is associated with a _project_.  

- **input** (required): Represents all the information that the agent can access in a task.
- **expected output** (optional): Also called _ground truth_, represents the ideal answer that the agent should output. You can use _expected output_ to store the actual output of the app, as well as any intermediary results you want to assesss. 
- **metadata** (optional): Contains any useful information to categorize the record and use for further analysis. For example: topics, tags, descriptions, notes.

To create a dataset from a CSV file, use `LLMObs.create_dataset_from_csv()`:

```python
# Create dataset from CSV
dataset = LLMObs.create_dataset_from_csv(
    csv_path="questions.csv",
    dataset_name="capitals-of-the-world",
    project_name="capitals-project",              # Optional: defaults to the project name from LLMObs.enable
    description="Geography quiz dataset",         # Optional: Dataset description
    input_data_columns=["question", "category"],  # Columns to use as input
    expected_output_columns=["answer"],           # Optional: Columns to use as expected output
    metadata_columns=["difficulty"],              # Optional: Additional columns as metadata
    csv_delimiter=","                             # Optional: Defaults to comma
)

# Example "questions.csv":
# question,category,answer,difficulty
# What is the capital of Japan?,geography,Tokyo,medium
# What is the capital of Brazil?,geography,Brasília,medium

```

See [Datasets][1] for more information about datasets, including: how to manually create datasets, how to retrieve and manage datasets, and how Datadog retains dataset versions.

## Create an experiment
An _experiment_ lets you systematically test your LLM application by running your agent across a set of scenarios from your dataset and measuring performance against the expected outputs using evaluators. You can then compare how different app configurations perform, side by side.

- **task**: Defines the core workflow you want to evaluate. It can range from a single LLM call to a more complex flow involving multiple LLM calls and RAG steps. The task is executed sequentially across all records in the dataset.
- **evaluator**: A function, executed on each record, that measures how well the model or agent performs. Evaluators allow you to compare the output to either the expected output or the original input.  

   Datadog supports the following evaluator types:  
   - **Boolean**: returns true or false
   - **score**: returns a numeric value (float)
   - **categorical**: returns a labeled category (string)

   Additionally, you can also return an `EvaluatorResult` to capture more aspects of the evaluation, such as `reasoning` (`str`), `assessment` (`"pass"` or `"fail"`)
   and `tags` (`Dict[str, str]`). The `value` field of the EvaluatorResult captures the final evaluation result, and works the same way as the simple use case specified above.

- **summary evaluators**: Optional functions executed against all the data of the Experiment (input, output, expected, evaluators' results). Summary evaluators allow you to compute more advanced metrics like precision, recall, and accuracy across your dataset. 

   Datadog supports the following Summary Evaluator types:
   - **Boolean**: returns true or false
   - **score**: returns a numeric value (float)
   - **categorical**: returns a labeled category (string)


To create an experiment:


1. Load a dataset
   ```python
   from ddtrace.llmobs import LLMObs
   from typing import Dict, Any, Optional, List

   dataset = LLMObs.pull_dataset("capitals-of-the-world")
   ```

2. Define a task function that processes a single dataset record

   ```python
   def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> str:
       question = input_data["question"]
       # Your LLM or processing logic here
       return "Beijing" if "China" in question else "Unknown"
   ```
   A task can take any non-null type as `input_data` (string, number, Boolean, object, array). The output that will be used in the Evaluators can be of any type.
   This example generates a string, but a dict can be generated as output to store any intermediary information and compare in the Evaluators.

   You can trace the different parts of your Experiment task (workflow, tool calls, etc.) using the [same tracing decorators][2] you use in production.
   If you use a [supported framework][3] (OpenAI, Amazon Bedrock, etc.), LLM Observability automatically traces and annotates calls to LLM frameworks and libraries, giving you out-of-the-box observability for calls that your LLM application makes.


4. Define evaluator functions.

   ```python
   def exact_match(input_data: Dict[str, Any], output_data: str, expected_output: str) -> bool:
       return output_data == expected_output

   def overlap(input_data: Dict[str, Any], output_data: str, expected_output: str) -> float:
       expected_output_set = set(expected_output)
       output_set = set(output_data)

       intersection = len(output_set.intersection(expected_output_set))
       union = len(output_set.union(expected_output_set))

       return intersection / union

   def fake_llm_as_a_judge(input_data: Dict[str, Any], output_data: str, expected_output: str) -> str:
       fake_llm_call = "excellent"
       return fake_llm_call

   def detailed_fake_llm_as_a_judge(input_data: Dict[str, Any], output_data: str, expected_output: str) -> EvaluatorResult:
       fake_llm_call = "excellent"
       fake_llm_reasoning = "the model explains itself"
       return EvaluatorResult(
           value=fake_llm_call,
           reasoning=fake_llm_reasoning,
           assessment="pass", # or fail
           tags={"task": "judge_llm_call"},
       )
   ```
   Evaluator functions can take any non-null type as `input_data` (string, number, Boolean, object, array); `output_data` and `expected_output` can be any type.
   Evaluators can only return a string, a number, or a Boolean.

5. (Optional) Define summary evaluator function(s).

   ```python
    def num_exact_matches(inputs, outputs, expected_outputs, evaluators_results):
        return evaluators_results["exact_match"].count(True)

   ```
   If defined and provided to the experiment, summary evaluator functions are executed after evaluators have finished running. Summary evaluator functions can take a list of any non-null type as `inputs` (string, number, Boolean, object, array); `outputs` and `expected_outputs` can be lists of any type. `evaluators_results` is a dictionary of list of results from evaluators, keyed by the name of the evaluator function. For example, in the above code snippet the summary evaluator `num_exact_matches` uses the results (a list of Booleans) from the `exact_match` evaluator to provide a count of number of exact matches.
   Summary evaluators can only return a string, a number, or a Boolean.

6. Create and run the experiment.
   ```python
   experiment = LLMObs.experiment(
       name="capital-cities-test",
       task=task,
       dataset=dataset,
       evaluators=[exact_match, overlap, fake_llm_as_a_judge, detailed_fake_llm_as_a_judge],
       summary_evaluators=[num_exact_matches], # optional
       description="Testing capital cities knowledge",
       config={
           "model_name": "gpt-4",
           "version": "1.0"
       },
   )

   # Run the experiment
   results = experiment.run()  # Run on all dataset records

   # Process results
   for result in results.get("rows", []):
       print(f"Record {result['idx']}")
       print(f"Input: {result['input']}")
       print(f"Output: {result['output']}")
       print(f"Score: {result['evaluations']['evaluator']['value']}")
       if result['error']['message']:
           print(f"Error: {result['error']['message']}")
   ```

   To increase the execution speed of the experiment, you can enable parallel processing:
   ```
   results = experiment.run(jobs=4)
   ```

   To test your pipeline on a subset of the data, use:
   ```
   results = experiment.run(sample_size=10)
   ```

   To stop the execution of the Experiment if an error occurs, use:
   ```
   results = experiment.run(raise_errors=True)
   ```

7. View your experiment results in Datadog.
   ```
   print(f"View experiment: {experiment.url}")
   ```

### Setting up an automated experiment in CI/CD
You can run an `experiment` manually or configure it to run automatically in your CI/CD pipelines. For example, run it against your dataset on every change to compare results with your baseline and catch potential regressions.

#### GitHub Actions
This section assumes you have completed the [setup](#setup), [projects](#create-a-project), [datasets](#create-a-dataset), and [experiments](#create-an-experiment) sections successfully. You can use the following Python script and GitHub Actions workflow as templates to run an experiment automatically whenever code is pushed to your repository.

**Note**: Workflow files live in the `.github/workflows` directory and must use YAML syntax with the `.yml` extension.

```python
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs._experiment import EvaluatorResult
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


def fake_llm_as_a_judge(
    input_data: Dict[str, Any], output_data: str, expected_output: str
) -> str:
    fake_llm_call = "excellent"
    return fake_llm_call


def detailed_fake_llm_as_a_judge(input_data: Dict[str, Any], output_data: str, expected_output: str) -> EvaluatorResult:
       fake_llm_call = "excellent"
       fake_llm_reasoning = "the model explains itself"
       return EvaluatorResult(
           value=fake_llm_call,
           reasoning=fake_llm_reasoning,
           assessment="pass", # or fail
           tags={"task": "judge_llm_call"},
       )


def num_exact_matches(inputs, outputs, expected_outputs, evaluators_results):
    return evaluators_results["exact_match"].count(True)


experiment = LLMObs.experiment(
    name="capital-cities-test",
    task=task,
    dataset=dataset,
    evaluators=[exact_match, overlap, fake_llm_as_a_judge, detailed_fake_llm_as_a_judge],
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

[1]: /llm_observability/experiments/datasets
[2]: /llm_observability/instrumentation/custom_instrumentation?tab=decorators#trace-an-llm-application
[3]: /llm_observability/instrumentation/auto_instrumentation?tab=python
