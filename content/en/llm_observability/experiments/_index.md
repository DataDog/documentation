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

#### Project initialization

Enable LLM Observability and configure your project:

```python
from ddtrace.llmobs import LLMObs

LLMObs.enable(
    ml_app="my-app",
    project_name="my-project",
    api_key="<YOUR_API_KEY>",
    app_key="<YOUR_APP_KEY>",
    site="datadoghq.com"
)
```

### Dataset class

A _dataset_ is a collection of _inputs_ and _expected outputs_. You can construct datasets from production data, from staging data, or manually. You can also push and retrieve datasets from Datadog.

#### Creating a Dataset

You can create a new dataset using `LLMObs.create_dataset()`:

```python
from ddtrace.llmobs import LLMObs
from typing import Dict, Any, Optional, List

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


#### Retrieving a Dataset

To retrieve an existing dataset from Datadog:

```python
dataset = LLMObs.pull_dataset("capitals-of-the-world")
```


#### Working with CSV Files

You can create datasets from CSV files and export datasets to pandas DataFrames. Note that pandas is required for these operations - install it via `pip install pandas`.

```python
# Create dataset from CSV
dataset = LLMObs.create_dataset_from_csv(
    csv_path="questions.csv",
    dataset_name="geography-quiz",
    input_data_columns=["question", "category"],  # Columns to use as input
    expected_output_columns=["answer"],           # Columns to use as expected output
    metadata_columns=["difficulty"],              # Optional: Additional columns as metadata
    csv_delimiter=",",                           # Optional: Defaults to comma
    description="Geography quiz dataset"          # Optional: Dataset description
)

# Example CSV format:
# question,category,answer,difficulty
# What is the capital of Japan?,geography,Tokyo,medium
# What is the capital of Brazil?,geography,Brasília,medium

# Convert dataset to pandas DataFrame
df = dataset.as_dataframe()
print(df.head())

# DataFrame output:
#                                    input_data          expected_output  metadata
#                                    question category         answer    difficulty
# 0  What is the capital of Japan?  geography         Tokyo      medium
# 1  What is the capital of Brazil? geography      Brasília      medium
```

The DataFrame will have a MultiIndex structure with the following columns:
- `input_data`: Contains all input fields from `input_data_columns`
- `expected_output`: Contains all output fields from `expected_output_columns`
- `metadata`: Contains any additional fields from `metadata_columns`

Notes:
- CSV files must have a header row
- Maximum field size is 10MB
- All columns not specified in `input_data_columns` or `expected_output_columns` are automatically treated as metadata
- The dataset is automatically pushed to Datadog after creation

### Experiment class

An _experiment_ is a collection of traces that tests the behavior of an LLM feature or LLM application against a dataset. The input data comes from the dataset, and the outputs are the final generations of the feature or application that is being tested.

#### Creating an Experiment

Create an experiment using `LLMObs.experiment()`:

```python
from ddtrace.llmobs import LLMObs

def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> str:
    """Process a single dataset record."""
    question = input_data["question"]
    # Your LLM or processing logic here
    return "Beijing" if "China" in question else "Unknown"

def evaluator(input_data: Dict[str, Any], output: str, expected_output: str) -> float:
    """Return a score between 0 and 1."""
    return 1.0 if output == expected_output else 0.0

# Create the experiment
experiment = LLMObs.experiment(
    name="capital-cities-test",
    task=task,
    dataset=dataset,
    evaluators=[evaluator],
    description="Testing capital cities knowledge",
    tags=["model:gpt-4", "version:1.0"],
    project_name="my-project",
)
```

#### Running an Experiment

Run the experiment and get results:

```python
# Run the experiment
results = experiment.run()  # Run on all dataset records
results = experiment.run(jobs=4)  # Run with parallel processing
results = experiment.run(sample_size=10, raise_errors=True)  # Test on subset

# Process results
for result in results:
    print(f"Record {result['idx']}")
    print(f"Input: {result['input']}")
    print(f"Output: {result['output']}")
    print(f"Score: {result['evaluations']['evaluator']['value']}")
    if result['error']['message']:
        print(f"Error: {result['error']['message']}")

# Result fields:
# - idx: Record number
# - record_id: Dataset record ID
# - span_id, trace_id: For tracing
# - timestamp: Processing time
# - input: Dict with input data
# - output: Model output
# - expected_output: Expected output
# - evaluations: Dict with scores
# - metadata: Extra information
# - error: Any errors
```

## Usage: LLM Observability Experiments API

### Postman quickstart

Datadog highly recommends importing the [Experiments Postman collection][7] into [Postman][8]. Postman's _View documentation_ feature can help you better understand this API.

### Request format

| Field | Type | Description |
| --------- | ---- | ----------- |
| `data`    | [Object: Data](#object-data) | The request body is nested within a top level `data` field.|

**Example**: Creating a project

```json
{
  "data": {
    "type": "projects",  # request type
    "attributes": {
        "name": "Project example",
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

**Example**: Retrieving projects

```json
{
    "data": [
        {
            "id": "4ac5b6b2-dcdb-40a9-ab29-f98463f73b4z",
            "type": "projects",
            "attributes": {
                "created_at": "2025-02-19T18:53:03.157337Z",
                "description": "Description example",
                "name": "Project example",
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
| `type`    | string | Identifies the kind of resource an object represents. For example: `projects`, `experiments`, `datasets`, etc. |
| `attributes` | json | Contains all the resource's data except for the ID. |

#### Object: Page

| Field | Type | Description |
| ----- | ---- | ----------- |
| `after` | string | The cursor to use to get the next results, if any. Provide the `page[cursor]` query parameter in your request to get the next results. |

### Projects API

**Request type**: `projects`

{{% collapse-content title="GET /api/unstable/llm-obs/v1/projects" level="h4" expanded=false id="api-projects-get" %}}

List all projects, sorted by creation date. The most recently-created projects are first.

**Query parameters**

| Parameter | Type | Description |
| ---- | ---- | --- |
| `filter[name]` | string | The name of a project to search for. |
| `filter[id]` | string | The ID of a project to search for. |
| `page[cursor]` | string | List results with a cursor provided in the previous query. |
| `page[limit]` | int | Limits the number of results. |

**Response**

| Field | Type | Description |
| ---- | ---- | --- |
| _within [Data](#object-data)_ | [][Project](#object-project) | List of projects. |

#### Object: Project

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | string | Unique project ID. Set at the top level `id` field within the [Data](#object-data) object. |
| `ml_app` | string | ML app name. |
| `name` | string | Unique project name. |
| `description` | string | Project description. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/unstable/llm-obs/v1/projects" level="h4" expanded=false id="api-projects-post" %}}

Create a project. If there is an existing project with the same name, the API returns the existing project unmodified.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `name` (_required_) | string | Unique project name. |
| `ml_app` | string | ML app name. |
| `description` | string | Project description. |

**Response**

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique ID for the project. Set at the top level `id` field within the [Data](#object-data) object. |
| `ml_app` | string | ML app name. |
| `name` | string | Unique project name. |
| `description` | string | Project description. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="PATCH /api/unstable/llm-obs/v1/projects/{project_id}" level="h4" expanded=false id="api-projects-patch" %}}

Partially update a project object. Specify the fields to update in the payload.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `name` | string | Unique project name. |
| `ml_app` | string | ML app name. |
| `description` | string | Project description. |

**Response**

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique ID for the project. Set at the top level `id` field within the [Data](#object-data) object. |
| `ml_app` | string | ML app name. |
| `name` | string | Unique project name. |
| `description` | string | Project description. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/unstable/llm-obs/v1/projects/delete" level="h4" expanded=false id="api-projects-batch-delete" %}}

Batch delete operation.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `project_ids` (_required_) | []string | List of project IDs to delete. |

**Response**

200 - OK

{{% /collapse-content %}}

### Datasets API

**Request type**: `datasets`

{{% collapse-content title="GET /api/unstable/llm-obs/v1/datasets" level="h4" expanded=false id="api-datasets-get" %}}

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
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/unstable/llm-obs/v1/datasets" level="h4" expanded=false id="api-datasets-post" %}}

Create a dataset. If there is an existing dataset with the same name, the API returns the existing dataset unmodified.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `name` (_required_) | string | Unique dataset name. |
| `description` | string | Dataset description. |

**Response**

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique ID for the dataset. Set at the top level `id` field within the [Data](#object-data) object. |
| `name` | string | Unique dataset name. |
| `description` | string | Dataset description. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="GET /api/unstable/llm-obs/v1/datasets/{dataset_id}/records" level="h4" expanded=false id="api-datasets-list-records" %}}

List all dataset records, sorted by creation date. The most recently-created records are first.

**Query parameters**

| Parameter | Type | Description |
| ---- | ---- | --- |
| `filter[version]` | string | List results for a given dataset version. |
| `page[cursor]` | string | List results with a cursor provided in the previous query. |
| `page[limit]` | int | Limits the number of results. |

**Response**

| Field | Type | Description |
| ---- | ---- | --- |
| _within [Data](#object-data)_ | [][Record](#object-record) | List of dataset records. |

#### Object: Record

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | string | Unique record ID. |
| `dataset_id` | string | Unique dataset ID. |
| `input_data` | any (string, number, Boolean, object, array) | Data that serves as the starting point for an experiment. |
| `expected_output` | any (string, number, Boolean, object, array) | Expected output |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/unstable/llm-obs/v1/datasets/{dataset_id}/records" level="h4" expanded=false id="api-datasets-append-records" %}}

Appends records for a given dataset.

**Request**

| Field | Type | Description |
| ---- | ---- | --- |
| `records` (_required_) | [][RecordReq](#object-recordreq) | List of records to create. |

#### Object: RecordReq

| Field | Type | Description |
| ---- | ---- | ---- |
| `input_data` (_required_) | any (string, number, Boolean, object, array) | Data that serves as the starting point for an experiment. |
| `expected_output` | any (string, number, Boolean, object, array) | Expected output |

**Response**

| Field | Type | Description |
| ---- | ---- | --- |
| `records` | [][Record](#object-record) | List of created records. |

{{% /collapse-content %}}

### Experiments API

**Request type**: `experiments`

{{% collapse-content title="GET /api/unstable/llm-obs/v1/experiments" level="h4" expanded=false id="api-experiments-get" %}}

List all experiments, sorted by creation date. The most recently-created experiments are first.

**Query parameters**

| Parameter | Type | Description |
| ---- | ---- | --- |
| `filter[project_id]` (_required_ if dataset not provided) | string | The ID of a project to retrieve experiments for. |
| `filter[dataset_id]` | string | The ID of a dataset to retrieve experiments for. |
| `filter[id]` | string | The ID(s) of an experiment to search for. To query for multiple experiments, use `?filter[id]=<>&filter[id]=<>`. |
| `filter[name]` | string | The name of an experiment to search for. |
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
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/unstable/llm-obs/v1/experiments" level="h4" expanded=false id="api-experiments-post" %}}

Create an experiment. If there is an existing experiment with the same name, the API returns the existing experiment unmodified.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `project_id` (_required_) | string | Unique project ID. |
| `dataset_id` (_required_) | string | Unique dataset ID. |
| `dataset_version` | int | Dataset version. |
| `name` (_required_) | string | Unique experiment name. |
| `description` | string | Experiment description. |
| `ensure_unique` | bool | If `true`, Datadog generates a new experiment with a unique name in the case of a conflict. Datadog recommends you set this field to `true`. |

**Response**

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique experiment ID. Set at the top level `id` field within the [Data](#object-data) object. |
| `project_id` | string | Unique project ID. |
| `dataset_id` | string | Unique dataset ID. |
| `name` | string | Unique experiment name. |
| `description` | string | Experiment description. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/llm-observability/tree/main/preview/experiments/notebooks
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /getting_started/site/
[7]: https://github.com/DataDog/llm-observability/tree/main/preview/experiments
[8]: https://www.postman.com/
[9]: https://app.datadoghq.com/llm/testing/experiments
