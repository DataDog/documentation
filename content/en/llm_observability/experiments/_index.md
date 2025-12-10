---
title: Experiments
description: Using LLM Observability Experiments feature
private: true
aliases:
  - /llm_observability/experiments_preview
further_reading:
  - link: "https://www.datadoghq.com/blog/llm-experiments/"
    tag: "Blog"
    text: "Create and monitor LLM experiments with Datadog"
  - link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
    tag: Blog
    text: Datadog LLM Observability natively supports OpenTelemetry GenAI Semantic Conventions
---

{{< img src="llm_observability/experiments/filtered_experiments.png" alt="LLM Observability, Experiment view. Heading: 'Comparing 12 experiments across 9 fields'. Line graph visualization charting the accuracy, correctness, duration, estimated cost, and other metrics of various experiments." style="width:100%;" >}}

LLM Observability [Experiments][9] supports the entire lifecycle of building LLM applications and agents. It helps you understand how changes to prompts, models, providers, or system architecture affect performance. With this feature, you can:

- Create and version datasets
- Run and manage experiments
- Compare results to evaluate impact

## Setup

1. Install Datadog's LLM Observability Python SDK:

   ```shell
   pip install ddtrace>=3.18.0
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

## Projects
_Projects_ are the core organizational layer for LLM Experiments. All datasets and experiments live in a project.
You can create a project manually in the Datadog console, API, or SDK by specifying a project name that does not already exist in `LLMObs.enable`.

```python
LLMObs.enable(
    ...
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)
```

## Datasets

A _dataset_ is a collection of _inputs_, and _expected outputs_ and _metadata_ that represent scenarios you want to tests your agent on. Each dataset is associated with a _project_.  

- **input** (required): Represents all the information that the agent can access in a [task](#task).
- **expected output** (optional): Also called _ground truth_, represents the ideal answer that the agent should output. You can use _expected output_ to store the actual output of the app, as well as any intermediary results you want to assesss. 
- **metadata** (optional): Contains any useful information to categorize the record and use for further analysis. For example: topics, tags, descriptions, notes.

### Creating a dataset

You can construct datasets from production data in the Datadog UI by selecting **Add to Dataset** in any span page, or programmatically by using the SDK:

{{< tabs >}}

{{% tab "CSV" %}}

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

**Notes**:
- CSV files must have a header row
- Maximum field size is 10MB
- All columns not specified in `input_data_columns` or `expected_output_columns` are automatically treated as metadata
- The dataset is automatically pushed to Datadog after creation

{{% /tab %}}

{{% tab "Manual" %}}

To manually create a dataset, use `LLMObs.create_dataset()`:

```python
from ddtrace.llmobs import LLMObs

dataset = LLMObs.create_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project", # optional, defaults to project_name used in LLMObs.enable
    description="Questions about world capitals",
    records=[
        {
            "input_data": {"question": "What is the capital of China?"},       # required, JSON or string
            "expected_output": "Beijing",                                      # optional, JSON or string
            "metadata": {"difficulty": "easy"}                                 # optional, JSON
        },
        {
            "input_data": {"question": "Which city serves as the capital of South Africa?"},
            "expected_output": "Pretoria",
            "metadata": {"difficulty": "medium"}
        }
    ]
)

# View dataset in Datadog UI
print(f"View dataset: {dataset.url}")
```
{{% /tab %}}
{{< /tabs >}}

### Retrieving a dataset

To retrieve a project's existing dataset from Datadog:

```python
dataset = LLMObs.pull_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project", # optional, defaults to the project name from LLMObs.enable
    version=1 # optional, defaults to the latest version
)

# Get dataset length
print(len(dataset))
```

#### Exporting a dataset to pandas

The Dataset class also provides the method `as_dataframe()`, which allows you to transform a dataset as a [pandas DataFrame][11].

<div class="alert alert-info"><a href="https://pandas.pydata.org/docs/index.html">Pandas</a> is required for this operation. To install pandas, <code>pip install pandas</code>.</div>

```python
# Convert dataset to pandas DataFrame
df = dataset.as_dataframe()
print(df.head())

# DataFrame output with MultiIndex columns:
#                                   input_data     expected_output  metadata
#    question                       category       answer           difficulty
# 0  What is the capital of Japan?  geography      Tokyo            medium
# 1  What is the capital of Brazil? geography      Brasília         medium
```

The DataFrame has a MultiIndex structure with the following columns:
- `input_data`: Contains all input fields from `input_data_columns`
- `expected_output`: Contains all output fields from `expected_output_columns`
- `metadata`: Contains any additional fields from `metadata_columns`


### Dataset versioning

Datasets are automatically versioned to track changes over time. Versioning information enables reproducibility and allows experiments to reference specific dataset versions. 

The `Dataset` object has a field, `current_version`, which corresponds to the latest version; previous versions are subject to a 90-day retention window. 

Dataset versions start at `0`, and each new version increments the version by 1.

#### When new dataset versions are created

A new dataset version is created when:
- Adding records
- Updating records (changes to `input` or `expected_output` fields)
- Deleting records

Dataset versions are **NOT** created for changes to `metadata` fields, or when updating the dataset name or description.

#### Version retention

- The active version of a Dataset is retained for 3 years.
- Previous versions (**NOT** the content of `current_version`) are retained for 90 days. 
- The 90-day retention period resets when a previous version is used — for example, when an experiment reads a version.
- After 90 consecutive days without use, a previous version is eligible for permanent deletion and may no longer be accessible.

**Example of version retention behavior**

After you publish `12`, `11` becomes a previous version with a 90-day window. After 25 days, you run an experiment with version `11`, which causes the 90-day window to **restart**. After another 90 days, during which you have not used version `11`, version `11` may be deleted.

### Accessing and managing dataset records

You can access dataset records using standard Python indexing:

```python
# Get a single record
record = dataset[0]

# Get multiple records
records = dataset[1:3]

# Iterate through records
for record in dataset:
    print(record["input_data"])
```
  
The Dataset class provides methods to manage records: `append()`, `update()`, `delete()`. You need to `push()` changes to save the changes in Datadog.

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

## Experiments
Experiments let you systematically test your LLM application by running your agent across a set of scenarios from your dataset and measuring performance against the expected outputs using evaluators. You can then compare how different app configurations perform, side by side.

### Task
The task defines the core workflow you want to evaluate. It can range from a single LLM call to a more complex flow involving multiple LLM calls and RAG steps. The task is executed sequentially across all records in the dataset.

### Evaluators
Evaluators are functions executed on each record that measure how well the model or agent performs. It allows you to compare the output to either the expected_output or the original input.  

Datadog supports the following evaluator types:  
- **Boolean**: returns true or false
- **score**: returns a numeric value (float)
- **categorical**: returns a labeled category (string)

### Summary Evaluators
Summary Evaluators are optional functions executed against all the data of the Experiment (input, output, expected, evaluators' results). Summary Evaluators allow you to compute more advanced metrics like precision, recall, and accuracy across your dataset. 

Datadog supports the following Summary Evaluator types:
- **Boolean**: returns true or false
- **score**: returns a numeric value (float)
- **categorical**: returns a labeled category (string)

### Creating an experiment

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

   You can trace the different parts of your Experiment task (workflow, tool calls, etc.) using the [same tracing decorators][12] you use in production.
   If you use a [supported framework][13] (OpenAI, Amazon Bedrock, etc.), LLM Observability automatically traces and annotates calls to LLM frameworks and libraries, giving you out-of-the-box observability for calls that your LLM application makes.


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
       evaluators=[exact_match, overlap, fake_llm_as_a_judge],
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
This section assumes you have completed the [setup][14], [projects][15], [datasets][16], and [experiments][17] sections successfully. You can use the following Python script and GitHub Actions workflow as templates to run an experiment automatically whenever code is pushed to your repository.

**Note**: Workflow files live in the `.github/workflows` directory and must use YAML syntax with the `.yml` extension.

```python
from ddtrace.llmobs import LLMObs
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
        run: pip install ddtrace>=3.15.0 dotenv
      - name: Run Script
        run: python ./experiment_sdk_demo/main.py
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
```

## Cookbooks

For in-depth examples of what you can do with LLM Experiments, see Datadog's provided [Jupyter notebooks][10].

## HTTP API

### Postman quickstart

Datadog highly recommends importing the [Experiments Postman collection][7] into [Postman][8]. Postman's _View documentation_ feature can help you better understand this API.

### Request format

| Field | Type | Description |
| --------- | ---- | ----------- |
| `data`    | [Object: Data](#object-data) | The request body is nested within a top level `data` field.|

**Example**: Creating a dataset

```json
{
  "data": {
    "type": "datasets",  # request type
    "attributes": {
        "name": "Dataset example",
        "description": "Description example"
    }
  }
}
```

### Response format

| Field | Type | Description |
| --------- | ---- | ----------- |
| `data`    | [Object: Data](#object-data) | The request body of an experimentation API is nested within a top level `data` field.|
| `meta`    | [Object: Page](#object-page) | Pagination attributes. |

**Example**: Retrieving datasets

```json
{
    "data": [
        {
            "id": "4ac5b6b2-dcdb-40a9-ab29-f98463f73b4z",
            "type": "datasets",
            "attributes": {
                "created_at": "2025-02-19T18:53:03.157337Z",
                "description": "Description example",
                "name": "Dataset example",
                "updated_at": "2025-02-19T18:53:03.157337Z"
            }
        }
    ],
    "meta": {
        "after": ""
    }
}
```

#### Object: Data

| Field | Type | Description |
| --------- | ---- | ----------- |
| `id`    | string | The ID of an experimentation entity. <br/>**Note**: Set your ID field reference at this level. |
| `type`    | string | Identifies the kind of resource an object represents. For example: `experiments`, `datasets`, etc. |
| `attributes` | json | Contains all the resource's data except for the ID. |

#### Object: Page

| Field | Type | Description |
| ----- | ---- | ----------- |
| `after` | string | The cursor to use to get the next results, if any. Provide the `page[cursor]` query parameter in your request to get the next results. |


### Projects API

**Request type**: `projects`

{{% collapse-content title="GET /api/v2/llm-obs/v1/projects" level="h4" expanded=false id="api-projects-get" %}}

List all projects, sorted by creation date. The most recently created projects are first.

**Query parameters**

| Parameter | Type | Description |
| ---- | ---- | --- |
| `filter[id]` | string | The ID of a project to search for. |
| `filter[name]` | string | The name of a project to search for. |
| `page[cursor]` | string | List results with a cursor provided in the previous query. |
| `page[limit]` | int | Limits the number of results. |

**Response**

| Field | Type | Description |
| ---- | ---- | --- |
| _within [Data](#object-data)_ | [][Project](#object-project) | List of projects. |

#### Object: Project

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique project ID. Set at the top level `id` field within the [Data](#object-data) object. |
| `name` | string | Unique project name. |
| `description` | string | Project description. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/projects" level="h4" expanded=false id="api-projects-post" %}}

Create a project. If there is an existing project with the same name, the API returns the existing project unmodified.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `name` (_required_) | string | Unique project name. |
| `description` | string | Project description. |

**Response**

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique project ID. Set at the top level `id` field within the [Data](#object-data) object. |
| `name` | string | Unique project name. |
| `description` | string | Project description. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="PATCH /api/v2/llm-obs/v1/projects/{project_id}" level="h4" expanded=false id="api-projects-patch" %}}

Partially update a project object. Specify the fields to update in the payload.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `name` | string | Unique project name. |
| `description` | string | Project description. |

**Response**

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique project ID. Set at the top level `id` field within the [Data](#object-data) object. |
| `name` | string | Unique project name. |
| `description` | string | Project description. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/projects/delete" level="h4" expanded=false id="api-projects-delete" %}}

Delete one or more projects.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `project_ids` (_required_) | []UUID | List of project IDs to delete. |

**Response**

Empty body on success.

{{% /collapse-content %}}

### Datasets API

**Request type**: `datasets`

{{% collapse-content title="GET /api/v2/llm-obs/v1/{project_id}/datasets" level="h4" expanded=false id="api-datasets-get" %}}

List all datasets, sorted by creation date. The most recently-created datasets are first.

**Query parameters**

| Parameter | Type | Description |
| ---- | ---- | --- |
| `filter[name]` | string | The name of a dataset to search for. |
| `filter[id]` | string | The ID of a dataset to search for. |
| `page[cursor]` | string | List results with a cursor provided in the previous query. |
| `page[limit]` | int | Limits the number of results. |

**Response**

| Field | Type | Description |
| ---- | ---- | --- |
| _within [Data](#object-data)_ | [][Dataset](#object-dataset) | List of datasets. |

#### Object: Dataset

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | string | Unique dataset ID. Set at the top level `id` field within the [Data](#object-data) object. |
| `name` | string | Unique dataset name. |
| `description` | string | Dataset description. |
| `metadata` | json | Arbitrary key-value metadata associated with the dataset. |
| `current_version` | int | The current version number of the dataset. Versions start at 0 and increment when records are added or modified. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/{project_id}/datasets" level="h4" expanded=false id="api-datasets-post" %}}

Create a dataset. If there is an existing dataset with the same name, the API returns the existing dataset unmodified.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `name` (_required_) | string | Unique dataset name. |
| `description` | string | Dataset description. |
| `metadata` | json | Arbitrary key-value metadata associated with the dataset. |

**Response**

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique ID for the dataset. Set at the top level `id` field within the [Data](#object-data) object. |
| `name` | string | Unique dataset name. |
| `description` | string | Dataset description. |
| `metadata` | json | Arbitrary key-value metadata associated with the dataset. |
| `current_version` | int | The current version number of the dataset. Starts at 0 for new datasets. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="GET /api/v2/llm-obs/v1/{project_id}/datasets/{dataset_id}/records" level="h4" expanded=false id="api-datasets-list-records" %}}

List all dataset records, sorted by creation date. The most recently-created records are first.

**Query parameters**

| Parameter | Type | Description |
| ---- | ---- | --- |
| `filter[version]` | int | List results for a given dataset version. If not specified, defaults to the dataset's current version. Version numbers start at 0. |
| `page[cursor]` | string | List results with a cursor provided in the previous query. |
| `page[limit]` | int | Limits the number of results. |

**Notes**:
- Without `filter[version]`, you get records from the **current version only**, not all versions.
- To retrieve records from a specific historical version, use `filter[version]=N` where N is the version number.
- Version numbers start at 0 when a dataset is created.

**Response**

| Field | Type | Description |
| ---- | ---- | --- |
| _within [Data](#object-data)_ | [][Record](#object-record) | List of dataset records. |

#### Object: Record

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | string | Unique record ID. |
| `dataset_id` | string | Unique dataset ID. |
| `input` | any (string, number, Boolean, object, array) | Data that serves as the starting point for an experiment. |
| `expected_output` | any (string, number, Boolean, object, array) | Expected output. |
| `metadata` | json | Arbitrary key-value metadata associated with the record. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/{project_id}/datasets/{dataset_id}/records" level="h4" expanded=false id="api-datasets-append-records" %}}

Appends records for a given dataset.

**Request**

| Field | Type | Description |
| ---- | ---- | --- |
| `deduplicate` | bool | If `true`, deduplicates appended records. Defaults to `true`. |
| `records` (_required_) | [][RecordReq](#object-recordreq) | List of records to create. |

#### Object: RecordReq

| Field | Type | Description |
| ---- | ---- | ---- |
| `input` (_required_) | any (string, number, Boolean, object, array) | Data that serves as the starting point for an experiment. |
| `expected_output` | any (string, number, Boolean, object, array) | Expected output. |
| `metadata` | json | Arbitrary key-value metadata associated with the record. |

**Response**

| Field | Type | Description |
| ---- | ---- | --- |
| `records` | [][Record](#object-record) | List of created records. |

{{% /collapse-content %}}

{{% collapse-content title="PATCH /api/v2/llm-obs/v1/{project_id}/datasets/{dataset_id}" level="h4" expanded=false id="api-datasets-patch" %}}

Partially update a dataset object. Specify the fields to update in the payload.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `name` | string | Unique dataset name. |
| `description` | string | Dataset description. |
| `metadata` | json | Arbitrary key-value metadata associated with the dataset. |

**Response**

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique ID for the dataset. Set at the top level `id` field within the [Data](#object-data) object. |
| `name` | string | Unique dataset name. |
| `description` | string | Dataset description. |
| `metadata` | json | Arbitrary key-value metadata associated with the dataset. |
| `current_version` | int | The current version number of the dataset. Metadata-only updates do not increment the version. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="PATCH /api/v2/llm-obs/v1/{project_id}/datasets/{dataset_id}/records" level="h4" expanded=false id="api-datasets-update-records" %}}

Partially update a one or more dataset record objects. Specify the fields to update in the payload.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `records` (_required_) | [][RecordUpdate](#object-recordupdate) | List of records to update. |

#### Object: RecordUpdate

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` (_required_) | string | Unique record ID. |
| `input` | any (string, number, Boolean, object, array) | Updated input. |
| `expected_output` | any (string, number, Boolean, object, array) | Updated expected output. |
| `metadata` | json | Updated metadata. |

**Response**

| Field | Type | Description |
| ---- | ---- | --- |
| `records` | [][Record](#object-record) | List of updated records. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/{project_id}/datasets/delete" level="h4" expanded=false id="api-datasets-delete" %}}

Delete one or more datasets.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `dataset_ids` (_required_) | []UUID | List of dataset IDs to delete. |

**Response**

Empty body on success.

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/{project_id}/datasets/{dataset_id}/records/delete" level="h4" expanded=false id="api-datasets-delete-records" %}}

Delete one or more dataset records.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `record_ids` (_required_) | []string | List of record IDs to delete. |

**Response**

Empty body on success.

{{% /collapse-content %}}

### Experiments API

**Request type**: `experiments`

{{% collapse-content title="GET /api/v2/llm-obs/v1/experiments" level="h4" expanded=false id="api-experiments-get" %}}

List all experiments, sorted by creation date. The most recently-created experiments are first.

**Query parameters**

| Parameter | Type | Description |
| ---- | ---- | --- |
| `filter[project_id]` (_required_ if dataset not provided) | string | The ID of a project to retrieve experiments for. |
| `filter[dataset_id]` | string | The ID of a dataset to retrieve experiments for. |
| `filter[id]` | string | The ID(s) of an experiment to search for. To query for multiple experiments, use `?filter[id]=<>&filter[id]=<>`. |
| `page[cursor]` | string | List results with a cursor provided in the previous query. |
| `page[limit]` | int | Limits the number of results. |

**Response**

| Field | Type | Description |
| ---- | ---- | --- |
| _within [Data](#object-data)_ | [][Experiment](#object-experiment) | List of experiments. |

#### Object: Experiment

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique experiment ID. Set at the top level `id` field within the [Data](#object-data) object. |
| `project_id` | string | Unique project ID. |
| `dataset_id` | string | Unique dataset ID. |
| `name` | string | Unique experiment name. |
| `description` | string | Experiment description. |
| `metadata` | json | Arbitrary key-value metadata associated with the experiment. |
| `config` | json | Configuration used when creating the experiment. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/experiments" level="h4" expanded=false id="api-experiments-post" %}}

Create an experiment. If there is an existing experiment with the same name, the API returns the existing experiment unmodified.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `project_id` (_required_) | string | Unique project ID. |
| `dataset_id` (_required_) | string | Unique dataset ID. |
| `dataset_version` | int | Dataset version. |
| `name` (_required_) | string | Unique experiment name. |
| `description` | string | Experiment description. |
| `ensure_unique` | bool | If `true`, Datadog generates a new experiment with a unique name in the case of a conflict. Default is `true`. |
| `metadata` | json | Arbitrary key-value metadata associated with the experiment. |
| `config` | json | Configuration used when creating the experiment. |

**Response**

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique experiment ID. Set at the top level `id` field within the [Data](#object-data) object. |
| `project_id` | string | Unique project ID. |
| `dataset_id` | string | Unique dataset ID. |
| `name` | string | Unique experiment name. |
| `description` | string | Experiment description. |
| `metadata` | json | Arbitrary key-value metadata associated with the experiment. |
| `config` | json | Configuration used when creating the experiment. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="PATCH /api/v2/llm-obs/v1/experiments/{experiment_id}" level="h4" expanded=false id="api-experiments-patch" %}}

Partially update an experiment object. Specify the fields to update in the payload.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `name` | string | Unique experiment name. |
| `description` | string | Experiment description. |

**Response**

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique experiment ID. Set at the top level `id` field within the [Data](#object-data) object. |
| `project_id` | string | Unique project ID. |
| `dataset_id` | string | Unique dataset ID. |
| `name` | string | Unique experiment name. |
| `description` | string | Experiment description. |
| `metadata` | json | Arbitrary key-value metadata associated with the experiment. |
| `config` | json | Configuration used when creating the experiment. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/experiments/delete" level="h4" expanded=false id="api-experiments-delete" %}}

Delete one or more experiments.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `experiment_ids` (_required_) | []UUID | List of experiment IDs to delete. |

**Response**

Empty body on success.

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/experiments/{experiment_id}/events" level="h4" expanded=false id="api-experiments-events" %}}

Push events (spans and metrics) for an experiment.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `spans` | [][Span](#object-span) | List of spans capturing experiment task execution. |
| `metrics` | [][Metric](#object-metric) | List of evaluator metrics associated with spans. |

#### Object: Span

| Field | Type | Description |
| ---- | ---- | ---- |
| `trace_id` | string | Trace ID. |
| `span_id` | string | Span ID. |
| `project_id` | string | Project ID. |
| `dataset_id` | string | Dataset ID. |
| `name` | string | Span name (for example, task name). |
| `start_ns` | number | Span start time in nanoseconds. |
| `duration` | number | Span duration in nanoseconds. |
| `tags` | []string | Tags to associate with the span (for example, model). |
| `status` | string | Span status (for example, `ok`). |
| `meta.input` | json | Input payload associated with the span. |
| `meta.output` | json | Output payload associated with the span. |
| `meta.expected_output` | json | Expected output for the span. |
| `meta.error` | object | Error details: `message`, `stack`, `type`. |

#### Object: Metric

| Field | Type | Description |
| ---- | ---- | ---- |
| `span_id` | string | Associated span ID. |
| `metric_type` | string | Metric type. One of: `score`, `categorical`. |
| `timestamp_ms` | number | UNIX timestamp in milliseconds. |
| `label` | string | Metric label (evaluator name). |
| `score_value` | number | Score value (when `metric_type` is `score`). |
| `categorical_value` | string | Categorical value (when `metric_type` is `categorical`). |
| `metadata` | json | Arbitrary key-value metadata associated with the metric. |
| `error.message` | string | Optional error message for the metric. |

**Response**

Empty body on success.

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /getting_started/site/
[7]: https://github.com/DataDog/llm-observability/tree/main/experiments
[8]: https://www.postman.com/
[9]: https://app.datadoghq.com/llm/testing/experiments
[10]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks
[11]: https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html
[12]: /llm_observability/instrumentation/custom_instrumentation?tab=decorators#trace-an-llm-application
[13]: /llm_observability/instrumentation/auto_instrumentation?tab=python
[14]: /llm_observability/experiments/?tab=manual#setup
[15]: /llm_observability/experiments/?tab=manual#projects
[16]: /llm_observability/experiments/?tab=manual#datasets
[17]: /llm_observability/experiments/?tab=manual#experiments
