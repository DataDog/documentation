---
title: Experiments API
description: Reference the LLM Observability Experiments HTTP API.
---

As an alternative to [using LLM Observability Experiments with the Python SDK][1], you can use the Experiments HTTP API to create and run experiments.

### Postman quickstart

Datadog highly recommends importing the [Experiments Postman collection][2] into [Postman][3]. Postman's _View documentation_ feature can help you better understand this API.

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

[1]: /llm_observability/experiments/setup
[2]: https://github.com/DataDog/llm-observability/tree/main/experiments
[3]: https://www.postman.com/