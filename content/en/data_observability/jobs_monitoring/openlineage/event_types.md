---
title: Event Types and Lifecycle
description: "Learn about OpenLineage RunEvents, DatasetEvents, and JobEvents, including lifecycle, parent-child relationships, and APM span generation."
further_reading:
  - link: "/data_observability/jobs_monitoring/openlineage/"
    tag: "Documentation"
    text: "Custom Jobs using OpenLineage"
  - link: "/data_observability/jobs_monitoring/openlineage/facets/"
    tag: "Documentation"
    text: "Supported Facets"
  - link: "/data_observability/jobs_monitoring/openlineage/integrations_and_naming/"
    tag: "Documentation"
    text: "Integrations and Dataset Naming"
  - link: "/data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage/"
    tag: "Documentation"
    text: "Set up Datadog Agent for OpenLineage Proxy"
---

## Overview

Datadog processes three OpenLineage event types: **RunEvent** for tracking job execution, **DatasetEvent** for describing dataset metadata, and **JobEvent** for declaring static job lineage. Each event type has required fields and optional facets that control what Datadog produces.

{{< img src="data_observability/openlineage/02_event_model.png" alt="OpenLineage event model showing the structure of RunEvent, DatasetEvent, and JobEvent with their relationships to Run, Job, Dataset, InputDataset, and OutputDataset." style="width:100%;" >}}

## RunEvent

A RunEvent describes an observed state of a job run. It is the primary event type for tracking job execution and data lineage at runtime.

### Required fields

| Field | Type | Description |
|---|---|---|
| `eventTime` | string (date-time) | ISO 8601 timestamp of the event |
| `eventType` | string (enum) | One of: `START`, `RUNNING`, `COMPLETE`, `FAIL`, `ABORT`, `OTHER` |
| `producer` | string (URI) | Identifies the system that produced the event |
| `schemaURL` | string (URI) | OpenLineage schema version reference |
| `run.runId` | string (UUID) | Unique identifier for this run instance (UUIDv7 preferred) |
| `job.namespace` | string | Namespace for the job (for example, environment or cluster) |
| `job.name` | string | Name of the job |

### Optional fields

| Field | Type | Description |
|---|---|---|
| `inputs` | array of InputDataset | Datasets consumed by this run |
| `outputs` | array of OutputDataset | Datasets produced by this run |
| `run.facets` | object | Run metadata facets |
| `job.facets` | object | Job metadata facets |

### What Datadog produces from RunEvents

| Facet / Field | Datadog Telemetry | Product Surface |
|---|---|---|
| `eventType` (START/COMPLETE/FAIL) | Run state tracking; execution spans on COMPLETE/FAIL only | Job run monitoring, run history |
| `job.name` + `job.namespace` | Job entity in lineage graph | Lineage graph nodes |
| `inputs` / `outputs` | Dataset-to-job edges | Lineage graph edges (data flow) |
| `sql` facet | Masked query, query signature | Query events in logs |
| `columnLineage` facet | Column-level dependency edges | Column-level lineage in graph |
| `schema` facet | Dataset field metadata | Dataset schema in catalog |
| `errorMessage` facet (on FAIL) | Error spans with message and stack trace | Error tracking |
| `outputStatistics` facet | `row_count`, `bytes` metrics | Data quality metrics |
| `inputStatistics` facet | `read_row_count`, `read_bytes` metrics | Data quality metrics |
| `jobType` facet | Node type classification | Correct icon/type in lineage graph |
| `parent` facet | Parent-child job relationship | Job hierarchy in lineage |
| `tags` facet (run) | Span tags | Filtering, grouping in UI |

### Example: RunEvent with datasets and facets

{{< code-block lang="json" >}}
{
  "eventTime": "2025-01-15T10:35:00.000Z",
  "eventType": "COMPLETE",
  "producer": "https://github.com/OpenLineage/OpenLineage/tree/1.0.0/integration/spark",
  "schemaURL": "https://openlineage.io/spec/2-0-2/OpenLineage.json#/$defs/RunEvent",
  "run": {
    "runId": "01941d3e-7a1b-7000-8000-000000000001",
    "facets": {
      "nominalTime": {
        "_producer": "https://github.com/OpenLineage/OpenLineage/tree/1.0.0/integration/spark",
        "_schemaURL": "https://openlineage.io/spec/facets/1-0-1/NominalTimeRunFacet.json#/$defs/NominalTimeRunFacet",
        "nominalStartTime": "2025-01-15T10:00:00.000Z",
        "nominalEndTime": "2025-01-15T11:00:00.000Z"
      }
    }
  },
  "job": {
    "namespace": "my-spark-cluster",
    "name": "etl_daily_users",
    "facets": {
      "jobType": {
        "_producer": "https://github.com/OpenLineage/OpenLineage/tree/1.0.0/integration/spark",
        "_schemaURL": "https://openlineage.io/spec/facets/2-0-2/JobTypeJobFacet.json#/$defs/JobTypeJobFacet",
        "processingType": "BATCH",
        "integration": "SPARK",
        "jobType": "APPLICATION"
      },
      "sql": {
        "_producer": "https://github.com/OpenLineage/OpenLineage/tree/1.0.0/integration/spark",
        "_schemaURL": "https://openlineage.io/spec/facets/1-0-1/SQLJobFacet.json#/$defs/SQLJobFacet",
        "query": "INSERT INTO analytics.user_summary SELECT user_id, COUNT(*) as order_count FROM raw.orders GROUP BY user_id"
      }
    }
  },
  "inputs": [
    {
      "namespace": "bigquery",
      "name": "my-project.raw.orders",
      "facets": {
        "schema": {
          "_producer": "https://github.com/OpenLineage/OpenLineage/tree/1.0.0/integration/spark",
          "_schemaURL": "https://openlineage.io/spec/facets/1-1-1/SchemaDatasetFacet.json#/$defs/SchemaDatasetFacet",
          "fields": [
            {"name": "order_id", "type": "STRING"},
            {"name": "user_id", "type": "STRING"},
            {"name": "amount", "type": "FLOAT64"},
            {"name": "created_at", "type": "TIMESTAMP"}
          ]
        }
      },
      "inputFacets": {
        "inputStatistics": {
          "_producer": "https://github.com/OpenLineage/OpenLineage/tree/1.0.0/integration/spark",
          "_schemaURL": "https://openlineage.io/spec/facets/1-0-2/InputStatisticsInputDatasetFacet.json#/$defs/InputStatisticsInputDatasetFacet",
          "rowCount": 1500000,
          "size": 524288000
        }
      }
    }
  ],
  "outputs": [
    {
      "namespace": "bigquery",
      "name": "my-project.analytics.user_summary",
      "facets": {
        "schema": {
          "_producer": "https://github.com/OpenLineage/OpenLineage/tree/1.0.0/integration/spark",
          "_schemaURL": "https://openlineage.io/spec/facets/1-1-1/SchemaDatasetFacet.json#/$defs/SchemaDatasetFacet",
          "fields": [
            {"name": "user_id", "type": "STRING"},
            {"name": "order_count", "type": "INT64"}
          ]
        },
        "columnLineage": {
          "_producer": "https://github.com/OpenLineage/OpenLineage/tree/1.0.0/integration/spark",
          "_schemaURL": "https://openlineage.io/spec/facets/1-1-0/ColumnLineageDatasetFacet.json#/$defs/ColumnLineageDatasetFacet",
          "fields": {
            "user_id": {
              "inputFields": [
                {
                  "namespace": "bigquery",
                  "name": "my-project.raw.orders",
                  "field": "user_id"
                }
              ]
            },
            "order_count": {
              "inputFields": [
                {
                  "namespace": "bigquery",
                  "name": "my-project.raw.orders",
                  "field": "order_id",
                  "transformations": [
                    {
                      "type": "INDIRECT",
                      "subtype": "AGGREGATION",
                      "description": "COUNT aggregation"
                    }
                  ]
                }
              ]
            }
          }
        }
      },
      "outputFacets": {
        "outputStatistics": {
          "_producer": "https://github.com/OpenLineage/OpenLineage/tree/1.0.0/integration/spark",
          "_schemaURL": "https://openlineage.io/spec/facets/1-0-2/OutputStatisticsOutputDatasetFacet.json#/$defs/OutputStatisticsOutputDatasetFacet",
          "rowCount": 250000,
          "size": 10485760
        }
      }
    }
  ]
}
{{< /code-block >}}

## DatasetEvent

A DatasetEvent describes metadata changes to a dataset, emitted independently of any job run. Use this for static metadata updates like schema changes, ownership updates, or data quality metrics from external monitors.

### Required fields

| Field | Type | Description |
|---|---|---|
| `eventTime` | string (date-time) | ISO 8601 timestamp |
| `producer` | string (URI) | System that produced the event |
| `schemaURL` | string (URI) | OpenLineage schema version reference |
| `dataset.namespace` | string | Dataset namespace (for example, database or warehouse) |
| `dataset.name` | string | Dataset name (for example, schema.table) |

### Optional fields

| Field | Type | Description |
|---|---|---|
| `dataset.facets` | object | Dataset metadata facets |

<div class="alert alert-info">DatasetEvents cannot contain <code>job</code> or <code>run</code> properties.</div>

### What Datadog produces from DatasetEvents

| Facet | Datadog Telemetry | Product Surface |
|---|---|---|
| `schema` facet | Dataset field metadata | Dataset schema in data catalog |
| `dataQualityMetrics` facet | `row_count`, `bytes`, `freshness` metrics | Data quality time-series metrics and monitors |
| `dataQualityMetrics.columnMetrics` | `nullness`, `uniqueness` per column | Column-level quality metrics |
| `ownership` facet | Owner metadata on dataset node | Data governance, ownership attribution |
| `documentation` facet | Description attribute on dataset | Table description in data catalog |
| `tags` facet | Specific tag keys extracted for dataset processing | Dataset metadata enrichment |

<div class="alert alert-info">The <code>ownership</code> and <code>documentation</code> facets are currently processed for warehouse tables such as Snowflake.</div>

### Example: DatasetEvent with schema and quality metrics

{{< code-block lang="json" >}}
{
  "eventTime": "2025-01-15T12:00:00.000Z",
  "producer": "https://my-data-catalog.example.com",
  "schemaURL": "https://openlineage.io/spec/2-0-2/OpenLineage.json#/$defs/DatasetEvent",
  "dataset": {
    "namespace": "snowflake://my-account.snowflakecomputing.com",
    "name": "ANALYTICS_DB.PUBLIC.USER_SUMMARY",
    "facets": {
      "schema": {
        "_producer": "https://my-data-catalog.example.com",
        "_schemaURL": "https://openlineage.io/spec/facets/1-1-1/SchemaDatasetFacet.json#/$defs/SchemaDatasetFacet",
        "fields": [
          {"name": "user_id", "type": "VARCHAR", "description": "Unique user identifier"},
          {"name": "order_count", "type": "NUMBER", "description": "Total number of orders"},
          {"name": "last_order_date", "type": "TIMESTAMP_NTZ", "description": "Date of most recent order"}
        ]
      },
      "dataQualityMetrics": {
        "_producer": "https://my-data-catalog.example.com",
        "_schemaURL": "https://openlineage.io/spec/facets/1-0-2/DataQualityMetricsInputDatasetFacet.json#/$defs/DataQualityMetricsInputDatasetFacet",
        "rowCount": 250000,
        "bytes": 10485760,
        "columnMetrics": {
          "user_id": {
            "nullCount": 0,
            "distinctCount": 250000
          },
          "order_count": {
            "nullCount": 0,
            "min": 1,
            "max": 9823,
            "sum": 4500000
          }
        }
      }
    }
  }
}
{{< /code-block >}}

## JobEvent

A JobEvent describes metadata about a job (static lineage), emitted independently of any run. Use this to declare job metadata, source code locations, or input/output declarations at design-time.

### Required fields

| Field | Type | Description |
|---|---|---|
| `eventTime` | string (date-time) | ISO 8601 timestamp |
| `producer` | string (URI) | System that produced the event |
| `schemaURL` | string (URI) | OpenLineage schema version reference |
| `job.namespace` | string | Job namespace |
| `job.name` | string | Job name |

### Optional fields

| Field | Type | Description |
|---|---|---|
| `inputs` | array of InputDataset | Declared input datasets |
| `outputs` | array of OutputDataset | Declared output datasets |
| `job.facets` | object | Job metadata facets |

<div class="alert alert-info">JobEvents cannot contain a <code>run</code> property.</div>

### What Datadog produces from JobEvents

| Facet | Datadog Telemetry | Product Surface |
|---|---|---|
| `jobType` facet | Job node type classification | Correct node type/icon in lineage graph |
| `documentation` facet | Job description | Job metadata in catalog |
| `ownership` facet | Owner metadata on job node | Governance, ownership attribution |
| `sourceCodeLocation` facet | Source code link | Link to source in job details |
| `inputs` / `outputs` | Dataset-to-job edges | Static lineage graph (declared dependencies) |

### Example: Static lineage declaration

{{< code-block lang="json" >}}
{
  "eventTime": "2025-01-15T08:00:00.000Z",
  "producer": "https://github.com/my-org/my-data-pipelines",
  "schemaURL": "https://openlineage.io/spec/2-0-2/OpenLineage.json#/$defs/JobEvent",
  "job": {
    "namespace": "my-airflow-instance",
    "name": "etl_daily_users",
    "facets": {
      "jobType": {
        "_producer": "https://github.com/my-org/my-data-pipelines",
        "_schemaURL": "https://openlineage.io/spec/facets/2-0-2/JobTypeJobFacet.json#/$defs/JobTypeJobFacet",
        "processingType": "BATCH",
        "integration": "AIRFLOW",
        "jobType": "DAG"
      },
      "sourceCodeLocation": {
        "_producer": "https://github.com/my-org/my-data-pipelines",
        "_schemaURL": "https://openlineage.io/spec/facets/1-0-1/SourceCodeLocationJobFacet.json#/$defs/SourceCodeLocationJobFacet",
        "type": "git",
        "url": "https://github.com/my-org/my-data-pipelines",
        "repoUrl": "https://github.com/my-org/my-data-pipelines.git",
        "path": "dags/etl_daily_users.py",
        "version": "abc123",
        "branch": "main"
      }
    }
  },
  "inputs": [
    {
      "namespace": "bigquery",
      "name": "my-project.raw.orders"
    }
  ],
  "outputs": [
    {
      "namespace": "bigquery",
      "name": "my-project.analytics.user_summary"
    }
  ]
}
{{< /code-block >}}

## Event lifecycle

For RunEvents, Datadog expects the following lifecycle for a job run. At minimum, send a **START** event and a terminal event (**COMPLETE**, **FAIL**, or **ABORT**).

| Event Type | Description | When to Send |
|---|---|---|
| **START** | Run has begun execution | When the job starts |
| **RUNNING** | Run is still in progress | Periodically during long-running jobs (optional) |
| **COMPLETE** | Run finished successfully | On successful completion |
| **FAIL** | Run failed with an error | On failure (include `errorMessage` facet) |
| **ABORT** | Run was cancelled/aborted | When externally terminated |
| **OTHER** | Additional metadata update | Post-completion metadata enrichment |

{{< img src="data_observability/openlineage/03_event_lifecycle.png" alt="State diagram showing RunEvent lifecycle: START transitions to RUNNING, COMPLETE, FAIL, or ABORT. RUNNING can repeat and transitions to COMPLETE, FAIL, or ABORT. Terminal states can transition to OTHER for post-completion metadata." style="width:80%;" >}}

### Important notes

- All events for the same run must share the same `run.runId` (UUID).
- The `job.namespace` and `job.name` must be consistent across all events for the same job.
- **RUNNING** events can include updated `inputs`/`outputs` as they are discovered during execution.
- **COMPLETE** events should include final `outputStatistics` and `columnLineage` when available.
- **FAIL** events should include the `errorMessage` run facet.
- **OTHER** events can be sent after terminal events to add additional metadata.
- SQL queries in the `sql` facet are only processed on **COMPLETE** events.

### Example: Failed run with error details

{{< code-block lang="json" >}}
{
  "eventTime": "2025-01-15T10:32:00.000Z",
  "eventType": "FAIL",
  "producer": "https://github.com/OpenLineage/OpenLineage/tree/1.0.0/integration/spark",
  "schemaURL": "https://openlineage.io/spec/2-0-2/OpenLineage.json#/$defs/RunEvent",
  "run": {
    "runId": "01941d3e-7a1b-7000-8000-000000000003",
    "facets": {
      "errorMessage": {
        "_producer": "https://github.com/OpenLineage/OpenLineage/tree/1.0.0/integration/spark",
        "_schemaURL": "https://openlineage.io/spec/facets/1-0-1/ErrorMessageRunFacet.json#/$defs/ErrorMessageRunFacet",
        "message": "Table not found: raw.orders",
        "programmingLanguage": "JAVA",
        "stackTrace": "org.apache.spark.sql.AnalysisException: Table not found: raw.orders\n\tat org.apache.spark.sql.catalyst.analysis.package$AnalysisErrorAt.failAnalysis(package.scala:42)"
      }
    }
  },
  "job": {
    "namespace": "my-spark-cluster",
    "name": "etl_daily_users",
    "facets": {
      "jobType": {
        "_producer": "https://github.com/OpenLineage/OpenLineage/tree/1.0.0/integration/spark",
        "_schemaURL": "https://openlineage.io/spec/facets/2-0-2/JobTypeJobFacet.json#/$defs/JobTypeJobFacet",
        "processingType": "BATCH",
        "integration": "SPARK",
        "jobType": "APPLICATION"
      }
    }
  },
  "inputs": [],
  "outputs": []
}
{{< /code-block >}}

## Parent-child job relationships

The `parent` run facet is central to how Datadog builds job hierarchies in the lineage graph. When a child job references a parent, Datadog automatically creates the parent node and links them.

### How the parent facet works

The parent facet on a RunEvent identifies the parent job and run:

{{< code-block lang="json" >}}
{
  "run": {
    "facets": {
      "parent": {
        "_producer": "...",
        "_schemaURL": "...",
        "run": {
          "runId": "parent-run-uuid"
        },
        "job": {
          "namespace": "parent-namespace",
          "name": "parent-job-name"
        }
      }
    }
  }
}
{{< /code-block >}}

When Datadog receives an event with a parent facet, it:
1. Creates a **parent node** in the lineage graph (if it doesn't already exist).
2. Creates a **parent edge** from the child node to the parent node.
3. Determines the parent **node type** based on the child's integration and job type.

### Integration-specific hierarchies

Each integration produces a specific hierarchy of job nodes. Datadog infers the parent's node type based on what the child is.

{{< img src="data_observability/openlineage/07_cross_integration.png" alt="Cross-integration parent-child relationship showing Airflow DAG as parent of Airflow Task, which is parent of Spark Application, with BigQuery datasets as inputs and Snowflake dataset as output." style="width:80%;" >}}

{{< tabs >}}
{{% tab "Airflow" %}}

**Airflow: DAG to Task**

- An Airflow **Task** event with a parent facet creates the parent as an `AIRFLOW_DAG` node.
- An Airflow **DAG** is the top level (no parent above it).

{{% /tab %}}
{{% tab "dbt" %}}

**dbt: Account to Project to Job to Model**

- **dbt Cloud**: Full hierarchy from Account to Project to Job to Model/Test.
- **dbt Core**: Project to Job to Model/Test (no account node).
- The Account and Project nodes are **auto-generated** from the `dbt_run` run facet and job namespace.
- dbt Model and Test events with a parent facet create the parent as a `DBT_JOB` node.

{{% /tab %}}
{{% tab "Spark" %}}

**Spark: Application to Job**

- A Spark **Job** event with a parent facet creates the parent as a `SPARK_APPLICATION` node.

{{% /tab %}}
{{< /tabs >}}

### Node type resolution

| Child Integration | Child jobType | Parent Node Type Created | Parent Integration |
|---|---|---|---|
| Airflow | TASK | `NODE_TYPE_AIRFLOW_DAG` | Airflow |
| Spark | APPLICATION | `NODE_TYPE_AIRFLOW_JOB` | Airflow |
| Spark | JOB | `NODE_TYPE_SPARK_APPLICATION` | Spark |
| dbt | MODEL | `NODE_TYPE_DBT_JOB` | dbt |
| dbt | TEST | `NODE_TYPE_DBT_JOB` | dbt |
| dbt | JOB | `NODE_TYPE_DBT_PROJECT` | dbt |

### Cross-integration parent-child relationships

Datadog supports parent-child relationships that span integrations. The most common case is an Airflow task that triggers a Spark application. When a Spark Application has a parent facet pointing to an Airflow task:

- Datadog creates the Airflow Task node as `NODE_TYPE_AIRFLOW_JOB`.
- A **SpanLink** is also created in APM, linking the Airflow task span to the Spark application span for cross-integration trace correlation.

### Service name override

When the run `tags` facet contains a `_dd.ol_service` tag, its value overrides the parent job name for the purpose of service name resolution:

{{< code-block lang="json" >}}
{
  "run": {
    "facets": {
      "tags": {
        "_producer": "...",
        "_schemaURL": "...",
        "tags": [
          {"key": "_dd.ol_service", "value": "my-data-pipeline-service"}
        ]
      }
    }
  }
}
{{< /code-block >}}

## APM traces and spans

Datadog generates APM traces and spans from OpenLineage RunEvents, enabling job execution monitoring alongside your application traces.

### How spans are generated

Spans are generated **only on COMPLETE and FAIL events**, not on START, RUNNING, or ABORT events. The processor stores information from START events and combines it with the terminal event to produce the final span.

{{< img src="data_observability/openlineage/08_span_generation.png" alt="Sequence diagram showing how spans are generated: Producer sends START event to Datadog which stores metadata, then RUNNING events update metadata, and finally COMPLETE/FAIL events trigger span generation and emission to APM." style="width:80%;" >}}

### Span structure

Each generated span has the following fields:

| Span Field | Source | Description |
|---|---|---|
| **Service** | `_dd.service` tag, or normalized job name | Groups runs in APM under a service |
| **Name** (operation) | `jobType` facet | For example, `airflow.dag`, `dbt.model`, `spark.application` |
| **Resource** | `_dd.resource_name` tag, or job name | The specific job instance name |
| **TraceID** | FNV64a hash of root run UUID | Groups parent-child spans into one trace |
| **SpanID** | FNV64a hash of run UUID | Unique span identifier |
| **ParentID** | FNV64a hash of parent run UUID | Links to parent span (from `parent` facet) |
| **Start** | `eventTime` from START event | Nanosecond timestamp |
| **Duration** | COMPLETE `eventTime` - START `eventTime` | Span duration in nanoseconds |
| **Error** | `1` if FAIL, `0` if COMPLETE | Error flag for APM |
| **Type** | `"job"` | Span type |

### Span tags

Every span includes these tags, which are searchable in APM:

**Core tags:**

| Tag | Source | Description |
|---|---|---|
| `_dd.run_id` | `run.runId` | OpenLineage run UUID |
| `_dd.event_type` | `eventType` | Terminal event type (COMPLETE or FAIL) |
| `job` | `job.name` (normalized) | Job name |
| `env` | `job.namespace` | Environment/namespace |
| `operation_name` | `jobType` facet | For example, `airflow.dag`, `dbt.model` |
| `entity_id` | Computed hash | Links span to lineage graph node |
| `inputs` | Serialized JSON | Input dataset names |
| `outputs` | Serialized JSON | Output dataset names |
| `sql.query` | `sql` facet (obfuscated) | Masked SQL query |

**Airflow-specific tags:**

| Tag | Source | Description |
|---|---|---|
| `airflow.task.start_time` | START event timestamp | Task start time (nanoseconds) |
| `airflow.task.end_time` | COMPLETE event timestamp | Task end time (nanoseconds) |

**dbt-specific tags:**

| Tag | Source | Description |
|---|---|---|
| `dbt.project` | `dbt_run` facet or namespace | dbt project name |
| `dbt.env` | `dbt_run` facet or namespace | dbt environment |
| `dbt.test.dataset.name` | Input dataset (for tests) | Dataset being tested |
| `dbt.test.assertion` | `dataQualityAssertions` facet | Test assertion name |
| `dbt.test.success` | `dataQualityAssertions` facet | Test pass/fail result |
| `dbt.test.column` | `dataQualityAssertions` facet | Column being tested (if applicable) |

**Custom tags from run `tags` facet:**

All key-value pairs from the run `tags` facet are added as span tags. Special tags:
- `_dd.service`: Overrides the span service name.
- `_dd.resource_name`: Overrides the span resource name.
- `_dd.ol_service`: Overrides the parent job name for service resolution.

### Error spans

When a FAIL event is received, the span is marked as an error:

- `Error` field is set to `1`.
- Error details from the `errorMessage` run facet are included as span tags:
  - `error.message`: The error message
  - `error.stack`: The full stack trace
  - `error.programmingLanguage`: The language that produced the error
- The span appears in red in APM and is filterable by error status.

### Airflow DAG completion and child task spans

When an Airflow DAG completes, Datadog automatically generates spans for any child tasks that haven't yet sent terminal events. The DAG's Airflow state facet determines each task's final state:

| Airflow Task State | Generated Event Type |
|---|---|
| `SUCCESS` | COMPLETE |
| `FAILED` | FAIL |
| `SKIPPED` | ABORT |

This ensures complete trace visibility even when individual task events are missing.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
