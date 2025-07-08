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

There are two ways to use Experiments:
- [Python SDK](#usage-python-sdk) (Recommended)
- [LLM Observability API](#usage-llm-observability-api)

### Explore Experiments with Jupyter notebooks

You can use the Jupyter notebooks in the [LLM Observability Experiments][1] repository to learn more about Experiments.

## Usage: Python SDK

### Installation

Install Datadog's LLM Observability Python SDK:

```shell
export DD_FAST_BUILD=1
pip install git+https://github.com/DataDog/dd-trace-py.git@llm-experiments
```

If you see errors regarding the Rust toolchain, ensure that Rust is installed. Instructions are provided in the error message.

### Setup

#### Environment variables

Specify the following environment variables in your application startup command:

| Variable | Description |
| -------- | ----------- |
| `DD_API_KEY` | Your [Datadog API key][2] |
| `DD_APP_KEY` | Your [Datadog application key][3] |
| `DD_SITE` | Your [Datadog site][4]. Defaults to `datadoghq.com`. |

#### Project initialization

Call `init()` to define the project where you want to write your experiments.

```python
import ddsource.llmobs.experimentation as dne

dne.init(project_name="example")
```


### Dataset class

A _dataset_ is a collection of _inputs_ and _expected outputs_. You can construct datasets from production data, from staging data, or manually. You can also push and retrieve datasets from Datadog.

{{% collapse-content title="Constructor" level="h4" expanded=false id="dataset-constructor" %}}

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `name` (_required_) | string | Name of the dataset |
| `data` (_required_) | List[Dict[str, Union[str, Dict[str, Any]]]] | List of dictionaries. The key is a string. The value can be a string or a dictionary.<br/><br/>The dictionaries should all have the same schema and contain the following keys:<br/><br/>`input`: String or dictionary of input data<br/>`expected_output` (_optional_): String or dictionary of expected output data |
| `description` | string | Description of the dataset |

**Returns**

Instance of `Dataset`

**Example**

```python
import ddtrace.llmobs.experimentation as dne

dne.init(project_name="example")

dataset = dne.Dataset(
    name="capitals-of-the-world",
    data=[
        {"input": "What is the capital of China?", "expected_output": "Beijing"},
        {
            "input": "Which city serves as the capital of South Africa?",
            "expected_output": "Pretoria",
        },
        {
            "input": "What is the capital of Switzerland?",
            "expected_output": "Bern",
        },
        {
            "input": "Name the capital city of a country that starts with 'Z'."  # Open-ended question
        }
    ],
)
```
{{% /collapse-content %}} 

{{% collapse-content title="Pull a dataset from Datadog" level="h4" expanded=false id="dataset-pull" %}}

```python
Dataset.pull(name: str) -> Dataset
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `name` (_required_) | string | Name of the dataset to retrieve from Datadog |

**Returns**

Instance of `Dataset`

**Example**

```python
import ddtrace.llmobs.experimentation as dne

dne.init(project_name="example")

dataset = dne.Dataset.pull("capitals-of-the-world")
```

{{% /collapse-content %}} 

{{% collapse-content title="Create a dataset from a CSV file" level="h4" expanded=false id="dataset-from-csv" %}}

```python
Dataset.from_csv(
        cls,
        filepath: str,
        name: str,
        description: str = "",
        delimiter: str = ",",
        input_columns: List[str] = None,
        expected_output_columns: List[str] = None,
    ) -> Dataset:
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `path` (_required_) | string | Local path to the CSV file |
| `name` (_required_) | string | Name of the dataset |
| `description` | string | Description of the dataset |
| `input_columns` (_required_) | List[str] | List of column names to use as input data |
| `expected_output_columns` (_required_) | List[str] | List of column names to use as output data |
| `metadata_columns` | string | List of column names to include as metadata |
| `delimiter` | string | Delimiter character for CSV files. Defaults to `,`. |

The CSV file must have a header row so that input and expected output columns can be mapped.

**Returns**

Instance of `Dataset`

**Example**

{{< code-block lang="csv" filename="data.csv" disable_copy="true" collapsible="false" >}}
question,answer,difficulty,category
What is 2+2?,4,easy,math
What is the capital of France?,Paris,medium,geography
{{< /code-block >}}

```python
import ddtrace.llmobs.experimentation as dne

dne.init(project_name="example")


dataset = dne.Dataset.from_csv(
path="data.csv", 
name="my_dataset", 
input_columns=["question", "category", "difficulty"], 
expected_output_columns=["answer"]
)
```

{{% /collapse-content %}} 

{{% collapse-content title="Push a dataset to Datadog" level="h4" expanded=false id="dataset-push" %}}

```python
Dataset.push(new_version: boolean = None)
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `new_version` | Boolean | If `True`, creates a new version of the dataset in Datadog, otherwise it modifies it in place. Defaults to `True`.|

**Example**

```python
import ddtrace.llmobs.experimentation as dne

dne.init(project_name="example")

dataset = dne.Dataset(...)

dataset.push()
```

{{% /collapse-content %}} 

{{% collapse-content title="Convert a dataset to a pandas DataFrame" level="h4" expanded=false id="dataset-as-dataframe" %}}

```python
Dataset.as_dataframe(multiindex: bool = True) -> pd.DataFrame
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `multiindex` | Boolean | If `True`, expands nested dictionaries into [MultiIndex][6] columns. Defaults to `True`. |

**Returns**

Instance of pandas [DataFrame][5]

{{% /collapse-content %}} 

### Experiment class

An _experiment_ is a collection of traces that tests the behavior of an LLM feature or LLM application against a dataset. The input data comes from the dataset, and the outputs are the final generations of the feature or application that is being tested. The `Experiment` class manages the execution and evaluation of LLM tasks on datasets.

{{% collapse-content title="Constructor" level="h4" expanded=false id="experiment-constructor" %}}

```python
Experiment(
    name: str,
    task: Callable,
    dataset: Dataset,
    evaluators: List[Callable],
    tags: List[str] = [],
    description: str = "",
    metadata: Dict[str, Any] = {},
    config: Optional[Dict[str, Any]] = None
)
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `name` (_required_) | string | Name of the experiment |
| `task` (_required_) | function | Function decorated with `@task` that processes each dataset record |
| `dataset` (_required_) | Dataset | Dataset to run the experiment against |
| `evaluators` | function[] | List of functions decorated with `@evaluator` that run against all outputs in the results |
| `tags` | string[] | Optional list of tags for organizing experiments|
| `description` | string | Description of the experiment |
| `metadata` | Dict[str, Any] | Additional metadata about the experiment |
| `config` | Dict[str, Any] | A key-value pair collection used inside a task to determine its behavior |

**Returns**

Instance of `Experiment`

{{% /collapse-content %}} 

{{% collapse-content title="Execute task and evaluations, push results" level="h4" expanded=false id="experiment-run" %}}

```python
Experiment.run(jobs: int = 10, raise_errors: bool = False, sample_size: int = None) -> ExperimentResults
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `jobs` | int | Number of worker threads used to run the task concurrently. Defaults to 10. |
| `raise_errors` | Boolean | If `True`, stops execution as soon as the first exception from the task is raised.<br/><br/>If `False`, every exception is handled, and the experiment runs continually until finished. |
| `sample_size` | int | Number of rows used for the experiment. You can use `sample_size` with `raise_errors` to test before you run a long experiment. |

**Returns**

Instance of `ExperimentResults`

**Example**

```python
# To test, run top 10 rows and see if it throws errors
results = experiment.run(raise_errors=True, sample_size=10)

# If it's acceptable after that, run the whole thing
results = experiment.run()
```

{{% /collapse-content %}} 

{{% collapse-content title="Run evaluators on outputs, push results" level="h4" expanded=false id="experiment-run-evaluations" %}}

```python
Experiment.run_evaluations(evaluators: Optional[List[Callable]] = None, raise_errors: bool = False) -> ExperimentResults
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `evaluators` | function[] | List of functions decorated with `@evaluator` that run against all outputs in the results. |
| `raise_errors` | Boolean | If `True`, stops execution as soon as the first exception from the task is raised.<br/><br/>If `False`, every exception is handled, and the experiment runs continually until finished. |

**Returns**

Instance of `ExperimentResults`

{{% /collapse-content %}} 

### ExperimentResults class

Contains and manages the results of an experiment run.

{{% collapse-content title="Convert experiment results to a pandas DataFrame" level="h4" expanded=false id="experiment-results-convert-pandas" %}}

```python
ExperimentResults.as_dataframe(multiindex: bool = True) -> pd.DataFrame
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `multiindex` | Boolean | If `True`, expands nested dictionaries into [MultiIndex][6] columns. Defaults to `True`.  |

**Returns**

Instance of pandas [`DataFrame`][5]

{{% /collapse-content %}} 

### Decorators

Decorators are required to define the task functions and evaluator functions that an experiment uses.

{{% collapse-content title="@task: Mark a function as a task" level="h4" expanded=false id="experiment-results-convert-pandas" %}}

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `input` (_required_) | Dict[str, Any] | Dataset input field used for your business logic |
| `config` | Dict[str, Any] | Modifies the behavior of the task (prompts, models, etc). |

```python
import ddtrace.llmobs.experimentation as dne

dne.init(project_name="example")

@dne.task
def process(input: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> Any:
    # Your business logic
```

{{% /collapse-content %}} 

{{% collapse-content title="@evaluator: Mark a function as an evaluator" level="h4" expanded=false id="experiment-results-convert-pandas" %}}

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `input` (_required_) | Any | Dataset input field used for your business logic |
| `output` (_required_) | Any | Task output field used for your business logic |
| `expected_output` (_required_) | Any | Dataset expected_output field used for your business logic |

```python
import ddtrace.llmobs.experimentation as dne

dne.init(project_name="example")

@dne.evaluator
def evaluate(input: Any, output: Any, expected_output: Any) -> Any:
    # Your evaluation logic
```

{{% /collapse-content %}} 

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
| `metadata` | json | Arbitrary user-defined metadata |
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
| `metadata` | json | Arbitrary user-defined metadata. |

**Response**

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique ID for the dataset. Set at the top level `id` field within the [Data](#object-data) object. |
| `name` | string | Unique dataset name. |
| `description` | string | Dataset description. |
| `metadata` | json | Arbitrary user-defined metadata. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}} 

{{% collapse-content title="PATCH /api/unstable/llm-obs/v1/datasets/{dataset_id}" level="h4" expanded=false id="api-datasets-patch" %}}

Partially update a dataset object. Specify the fields to update in the payload.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `name` | string | Unique dataset name. |
| `description` | string | Dataset description. |
| `metadata` | json | Arbitrary user-defined metadata. |

**Response**

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique ID for the dataset. Set at the top level `id` field within the [Data](#object-data) object. |
| `name` | string | Unique dataset name. |
| `description` | string | Dataset description. |
| `metadata` | json | Arbitrary user-defined metadata. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}} 

{{% collapse-content title="POST /api/unstable/llm-obs/v1/datasets/delete" level="h4" expanded=false id="api-datasets-batch-delete" %}}

Batch delete operation.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `dataset_ids` (_required_) | []string | List of dataset IDs to delete. |

**Response**

200 - OK

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
| `input` | any (string, number, Boolean, object, array) | Data that serves as the starting point for an experiment. |
| `expected_output` | any (string, number, Boolean, object, array) | Expected output |
| `metadata` | json | Arbitrary user-defined metadata. |
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
| `input` (_required_) | any (string, number, Boolean, object, array) | Data that serves as the starting point for an experiment. |
| `expected_output` | any (string, number, Boolean, object, array) | Expected output |
| `metadata` | json | Arbitrary user-defined metadata. |

**Response**

| Field | Type | Description |
| ---- | ---- | --- | 
| `records` | [][Record](#object-record) | List of created records. |

{{% /collapse-content %}}

{{% collapse-content title="PATCH /api/unstable/llm-obs/v1/datasets/{dataset_id}/records/{record_id}" level="h4" expanded=false id="api-datasets-patch-records" %}}

Partially update a dataset record object. Specify the fields to update in the payload.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `input` | any (string, number, Boolean, object, array) | Data that serves as the starting point for an experiment. |
| `expected_output` | any (string, number, Boolean, object, array) | Expected output |
| `metadata` | json | Arbitrary user-defined metadata. |

**Response**

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | string | Unique record ID. |
| `dataset_id` | string | Unique dataset ID. |
| `input` | any (string, number, Boolean, object, array) | Data that serves as the starting point for an experiment. |
| `expected_output` | any (string, number, Boolean, object, array) | Expected output |
| `metadata` | json | Arbitrary user-defined metadata. |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="POST  /api/unstable/llm-obs/v1/datasets/{dataset_id}/records/delete" level="h4" expanded=false id="api-datasets-batch-delete-records" %}}

Batch delete operation.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `record_ids` (_required_) | []string | List of dataset record IDs to delete. |

**Response**

200 - OK

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
| `metadata` | json | Arbitrary user-defined metadata |
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
| `metadata` | json | Arbitrary user-defined metadata |
| `ensure_unique` | bool | If `true`, Datadog generates a new experiment with a unique name in the case of a conflict. Datadog recommends you set this field to `true`. |

**Response**

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique experiment ID. Set at the top level `id` field within the [Data](#object-data) object. |
| `project_id` | string | Unique project ID. |
| `dataset_id` | string | Unique dataset ID. |
| `name` | string | Unique experiment name. |
| `description` | string | Experiment description. |
| `metadata` | json | Arbitrary user-defined metadata |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="PATCH /api/unstable/llm-obs/v1/experiments/{experiment_id}" level="h4" expanded=false id="api-experiments-patch" %}}

Partially update an experiment object. Specify the fields to update in the payload.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `dataset_id` | string | Unique dataset ID. |
| `name` | string | Unique experiment name. |
| `description` | string | Experiment description. |
| `metadata` | json | Arbitrary user-defined metadata |

**Response**

| Field | Type | Description |
| ---- | ---- | ---- |
| `id` | UUID | Unique experiment ID. Set at the top level `id` field within the [Data](#object-data) object. |
| `project_id` | string | Unique project ID. |
| `dataset_id` | string | Unique dataset ID. |
| `name` | string | Unique experiment name. |
| `description` | string | Experiment description. |
| `metadata` | json | Arbitrary user-defined metadata |
| `created_at` | timestamp | Timestamp representing when the resource was created. |
| `updated_at` | timestamp | Timestamp representing when the resource was last updated. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/unstable/llm-obs/v1/experiments/delete" level="h4" expanded=false id="api-experiments-batch-delete" %}}

Batch delete operation.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `experiment_ids` (_required_) | []string | List of experiment IDs to delete. |

**Response**

200 - OK

{{% /collapse-content %}}

{{% collapse-content title="POST /api/unstable/llm-obs/v1/experiments/{experiment_id}/events" level="h4" expanded=false id="api-experiments-batch-delete" %}}

Handle the ingestion of experiment spans or respective evaluation metrics.

**Request**

| Field | Type | Description |
| ---- | ---- | ---- |
| `tags` | []string | Key-value pair of strings. |
| `spans` (_required_) | [][Span](#object-span) | Spans that represent an evaluation. |
| `metrics` | [][EvalMetric](#object-evalmetric) | Generated evaluation metrics. |

**Response**

202 - Accepted

#### Object: Span

| Field | Type | Description |
| ---- | ---- | ---- |
| `span_id` (_required_) | string | Unique span ID. |
| `trace_id` | string | Trace ID. Only needed if tracing. |
| `start_ns` (_required_) | uint64 | The span's start time in nanoseconds. |
| `duration` (_required_) | uint64 | The span's duration in nanoseconds. |
| `dataset_record_id` | string | The dataset record referenced. |
| `meta` (_required_) | [Meta](#object-meta) | The core content of the span. |

#### Object: Meta

| Field | Type | Description |
| ---- | ---- | ---- |
| `error` | [Error](#object-error) | Captures errors. |
| `input` (_required_) | any (string, number, Boolean, object, array) | Input value to an operation. |
| `output` (_required_) | any (string, number, Boolean, object, array) | Output value to an operation. |
| `expected_output` | any (string, number, Boolean, object, array) | Expected output value. |
| `metadata` | json | Arbitrary user-defined metadata. |

#### Object: EvalMetric

| Field | Type | Description |
| ---- | ---- | ---- |
| `span_id` (_required_) | string | Unique span ID to join on. |
| `trace_id` | string | Trace ID. Only needed if tracing. |
| `error` | [Error](#object-error) | Captures errors. |
| `metric_type` (_required_) | enum | Defines the metric type. Accepted values: `categorical`, `score`.|
| `timestamp_ms` (_required_) | uint64 | Timestamp in which the evaluation occurred. |
| `label` (_required_) | string | Label for the metric. |
| `categorical_value` (_required_, if `type` is `categorical`) | string | Category value of the metric. |
| `score_value` (_required_, if `type` is `score`) | float64 | Score value of the metric. |

#### Object: Error

| Field | Type | Description |
| ---- | ---- | ---- |
| `Message` | string | Error message. |
| `Stack` | string | Error stack. |
| `Type` | string | Error type. For example, `http`. |

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/llm-observability/tree/main/preview/experiments/notebooks
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /getting_started/site/
[5]: https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html
[6]: https://pandas.pydata.org/docs/user_guide/advanced.html#multiindex-advanced-indexing
[7]: https://github.com/DataDog/llm-observability/tree/main/preview/experiments
[8]: https://www.postman.com/
[9]: https://app.datadoghq.com/llm/testing/experiments
