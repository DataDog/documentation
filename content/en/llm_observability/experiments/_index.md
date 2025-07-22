---
title: Experiments
description: Using LLM Observability Experiments feature
private: true
further_reading:
  - link: "https://www.datadoghq.com/blog/llm-experiments/"
    tag: "Blog"
    text: "Create and monitor LLM experiments with Datadog"
---

{{< callout >}}
LLM Observability Experiments is in Preview.
{{< /callout >}}

{{< img src="llm_observability/experiments/filtered_experiments.png" alt="LLM Observability, Experiment view. Heading: 'Comparing 12 experiments across 9 fields'. Line graph visualization charting the accuracy, correctness, duration, estimated cost, and other metrics of various experiments." style="width:100%;" >}}

LLM Observability [Experiments][9] supports the entire lifecycle of building LLM applications and agents. It helps you understand how changes to prompts, models, providers, or system architecture affect performance. With this feature, you can:

- Create and version datasets
- Run and manage experiments
- Compare results to evaluate impact

### Installation

Install Datadog's LLM Observability Python SDK:

```shell
pip install ddtrace>=3.11
```

### Setup

#### Environment variables

Specify the following environment variables in your application startup command:

| Variable | Description |
| -------- | ----------- |
| `DD_API_KEY` | Your [Datadog API key][2] |
| `DD_APP_KEY` | Your [Datadog application key][3] |
| `DD_SITE` | Your [Datadog site][4]. Defaults to `datadoghq.com`. |
| `DD_LLMOBS_PROJECT_NAME` | The name of your project for experiments |

#### Project initialization

Enable LLM Observability and configure your project:

```python
from ddtrace.llmobs import LLMObs

LLMObs.enable(
    ml_app="my-app",  # Required: Name of your ML application
    project_name="my-project",  # Optional: Override DD_LLMOBS_PROJECT_NAME
    app_key="<YOUR_APP_KEY>",  # Optional: Override DD_APP_KEY
    site="datadoghq.com"  # Optional: Override DD_SITE
)
```

### Dataset class

A _dataset_ is a collection of _inputs_ and _expected outputs_. You can construct datasets from production data, from staging data, or manually. You can also push and retrieve datasets from Datadog.

#### Creating a Dataset

You can create a new dataset using `LLMObs.create_dataset()`:

```python
from ddtrace.llmobs import LLMObs

dataset = LLMObs.create_dataset(
    name="capitals-of-the-world",
    description="Questions about world capitals",
    records=[
        {
            "input_data": {"question": "What is the capital of China?"},
            "expected_output": "Beijing",
            "metadata": {"difficulty": "easy"}
        },
        {
            "input_data": {"question": "Which city serves as the capital of South Africa?"},
            "expected_output": "Pretoria",
            "metadata": {"difficulty": "medium"}
        }
    ]
)
```

#### Retrieving a Dataset

To retrieve an existing dataset from Datadog:

```python
dataset = LLMObs.pull_dataset("capitals-of-the-world")
```

#### Managing Dataset Records

The Dataset class provides methods to manage records:

```python
# Add a new record
dataset.append({
    "input_data": {"question": "What is the capital of Switzerland?"},
    "expected_output": "Bern",
    "metadata": {"difficulty": "easy"}
})

# Update an existing record
dataset.update(0, {
    "input_data": {"question": "What is the capital of China?"},
    "expected_output": "Beijing",
    "metadata": {"difficulty": "medium"}
})

# Delete a record
dataset.delete(1)  # Deletes the second record

# Save changes to Datadog
dataset.push()
```

#### Accessing Dataset Records

You can access dataset records using standard Python indexing:

```python
# Get a single record
record = dataset[0]

# Get multiple records
records = dataset[1:3]

# Iterate through records
for record in dataset:
    print(record["input_data"])

# Get dataset length
print(len(dataset))
```

### Experiment class

An _experiment_ is a collection of traces that tests the behavior of an LLM feature or LLM application against a dataset. The input data comes from the dataset, and the outputs are the final generations of the feature or application that is being tested.

#### Creating an Experiment

Create an experiment using `LLMObs.experiment()`:

```python
from ddtrace.llmobs import LLMObs

def task(input_data, config=None):
    """Process a single dataset record.

    Args:
        input_data (dict): The input data from the dataset record
        config (dict, optional): Configuration for the task

    Returns:
        Any: The output that will be compared with expected_output
    """
    question = input_data["question"]
    # Your LLM or processing logic here
    return "Beijing" if "China" in question else "Unknown"

def evaluator(input_data, output_data, expected_output):
    """Evaluate the output against expected output.

    Args:
        input_data (dict): The input data from the dataset record
        output_data (Any): The output from the task function
        expected_output (Any): The expected output from the dataset

    Returns:
        float: Score between 0 and 1, or any other metric
    """
    return 1.0 if output_data == expected_output else 0.0

# Create the experiment
experiment = LLMObs.experiment(
    name="capital-cities-test",
    task=task,
    dataset=dataset,
    evaluators=[evaluator],
    description="Testing capital cities knowledge",
    tags=["model:gpt-4", "version:1.0"],
    project_name="my-project"  # Optional: Override DD_LLMOBS_PROJECT_NAME
)
```

#### Running an Experiment

Run the experiment and get results:

```python
# Run on all dataset records
results = experiment.run()

# Run with parallel processing
results = experiment.run(jobs=4)

# Run on a subset of records for testing
results = experiment.run(sample_size=10, raise_errors=True)
```

#### Experiment Results

The experiment results contain detailed information about each record's execution:

```python
for result in results:
    print(f"Record {result['idx']}:")
    print(f"Input: {result['input']}")
    print(f"Output: {result['output']}")
    print(f"Expected: {result['expected_output']}")
    print(f"Evaluations: {result['evaluations']}")
    if result['error']['message']:
        print(f"Error: {result['error']['message']}")
    print("---")
```

Each result contains:
- `idx`: Index of the record in the dataset
- `record_id`: ID of the dataset record
- `span_id` and `trace_id`: For tracing in Datadog
- `timestamp`: When the record was processed
- `input`: Input data from the dataset
- `output`: Output from your task function
- `expected_output`: Expected output from the dataset
- `evaluations`: Results from your evaluator functions
- `metadata`: Additional information about the experiment
- `error`: Any errors that occurred during processing

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/llm-observability/tree/main/preview/experiments/notebooks
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /getting_started/site/
[9]: https://app.datadoghq.com/llm/testing/experiments
