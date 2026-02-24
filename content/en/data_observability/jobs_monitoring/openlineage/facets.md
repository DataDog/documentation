---
title: Supported Facets
description: "Reference for all OpenLineage facets that Datadog processes, including run, job, dataset, and integration-specific facets."
further_reading:
  - link: "/data_observability/jobs_monitoring/openlineage/"
    tag: "Documentation"
    text: "Custom Jobs using OpenLineage"
  - link: "/data_observability/jobs_monitoring/openlineage/event_types/"
    tag: "Documentation"
    text: "Event Types and Lifecycle"
  - link: "/data_observability/jobs_monitoring/openlineage/integrations_and_naming/"
    tag: "Documentation"
    text: "Integrations and Dataset Naming"
---

## Overview

Facets are structured metadata attached to OpenLineage events. Every facet must include two metadata fields:

| Field | Type | Description |
|---|---|---|
| `_producer` | string (URI) | Identifies the system that produced this facet |
| `_schemaURL` | string (URI) | Reference to the facet's JSON schema |

Facets are attached at different points depending on the event type:

- **RunEvent**: `run.facets` (run facets), `job.facets` (job facets), `inputs[].facets` and `outputs[].facets` (dataset facets), `inputs[].inputFacets` (input dataset facets), `outputs[].outputFacets` (output dataset facets)
- **DatasetEvent**: `dataset.facets` (dataset facets)
- **JobEvent**: `job.facets` (job facets), `inputs[].facets` and `outputs[].facets` (dataset facets)

{{< img src="data_observability/openlineage/10_facet_attachment.png" alt="Diagram showing where facets attach on each event type: RunEvent has run facets, job facets, dataset facets, input facets, and output facets. DatasetEvent has dataset facets. JobEvent has job facets and dataset facets." style="width:100%;" >}}

## Run facets

Attached to `run.facets` in RunEvents.

| Facet | Description | What Datadog Does |
|---|---|---|
| **nominalTime** | Scheduled start/end time of the run | Used for run scheduling metadata |
| **parent** | Parent job/run reference (for example, Airflow DAG for a task) | Creates parent-child job hierarchy in lineage graph |
| **errorMessage** | Error details on FAIL events (`message`, `stackTrace`, `programmingLanguage`) | Generates error spans with `error.message` and `error.stack` tags for error tracking |
| **processingEngine** | Runtime engine info (name, version) | Run metadata enrichment |
| **externalQuery** | External query identifier (for example, BigQuery job ID) | Links to external query systems |
| **environmentVariables** | Environment variables during run | Run context metadata |
| **extractionError** | Errors during metadata extraction | Metadata quality tracking |
| **tags** | Key-value tags for the run | Span tags for filtering; special tag `_dd.ol_service` maps to service name |

### Integration-specific run facets

| Facet | Integration | Description |
|---|---|---|
| **airflow** | Apache Airflow | Airflow task instance metadata |
| **airflowDagRun** | Apache Airflow | DAG run metadata |
| **airflowState** | Apache Airflow | Airflow task state |
| **spark_properties** | Apache Spark | Spark configuration properties |
| **bigqueryJob** | Google BigQuery | BigQuery job metadata |
| **snowflakeQuery** | Snowflake | Snowflake query execution details |
| **dbt_run** | dbt | dbt run metadata |
| **trino_query_context** | Trino | Trino query context |
| **executionTime** | General | Explicit execution duration |

## Job facets

Attached to `job.facets` in RunEvents or JobEvents.

| Facet | Description | What Datadog Does |
|---|---|---|
| **jobType** | Job classification (`integration`, `jobType`, `processingType`) | Determines node type in lineage graph (for example, `SPARK.APPLICATION`, `AIRFLOW.DAG`, `DBT.JOB`) |
| **sql** | SQL query executed by the job | Parses and masks query; generates query events with signature and normalized SQL |
| **documentation** | Human-readable job description | Displayed as job description in lineage UI |
| **ownership** | Job ownership (teams, individuals) | Governance and ownership attribution |
| **sourceCode** | Inline source code | Job detail enrichment |
| **sourceCodeLocation** | Source code repository link | Link to source in job details panel |
| **tags** | Key-value tags for the job | Job-level tagging and filtering |

### Integration-specific job facets

| Facet | Integration | Description |
|---|---|---|
| **dbt_node** | dbt | dbt model/node metadata |
| **airflow** | Apache Airflow | Airflow DAG-level metadata |

## Dataset facets

Attached to `dataset.facets` on datasets in any event type.

| Facet | Description | What Datadog Does |
|---|---|---|
| **schema** | Dataset field definitions (name, type, description, nested fields) | Populates dataset schema in data catalog |
| **columnLineage** | Column-level data flow dependencies | Generates column-level lineage edges in the graph; refines table-level lineage accuracy |
| **dataQualityMetrics** | Row count, bytes, freshness, column-level metrics | Emits `row_count`, `bytes`, `freshness` time-series metrics; column `nullness` and `uniqueness` |
| **dataQualityAssertions** | Data quality test results | Data quality assertion tracking |
| **ownership** | Dataset ownership (teams, individuals) | Owner metadata on dataset node (currently processed for warehouse tables such as Snowflake) |
| **documentation** | Human-readable dataset description | Table description in data catalog (currently processed for Snowflake tables) |
| **tags** | Key-value tags for the dataset | Specific tag keys extracted for internal processing (for example, `_dd.catalog-suffix`) |
| **dataSource** | Data source connection details | Source system identification |
| **lifecycleStateChange** | Dataset lifecycle events (CREATE, ALTER, DROP, TRUNCATE, RENAME, OVERWRITE) | Parsed but not actively processed |
| **datasetType** | Type of the dataset (for example, TABLE, VIEW) | Dataset classification |
| **datasetVersion** | Dataset version identifier | Version tracking |
| **storage** | Storage format and location details | Storage metadata |
| **symlinks** | Alternative dataset identifiers | Cross-reference resolution |

### Integration-specific dataset facets

| Facet | Integration | Description |
|---|---|---|
| **bigqueryTable** | Google BigQuery | BigQuery table metadata |
| **snowflakeTable** | Snowflake | Snowflake table metadata (owner, description, tags) |
| **snowflakeColumnMetrics** | Snowflake | Snowflake column-level statistics |
| **icebergTable** | Apache Iceberg | Iceberg table metadata |
| **icebergTableMetadata** | Apache Iceberg | Iceberg table metadata details |
| **tableauDashboard** | Tableau | Tableau dashboard metadata |

## Input dataset facets

Attached to `inputFacets` on input datasets.

| Facet | Description | What Datadog Does |
|---|---|---|
| **inputStatistics** | Read row count and bytes | Emits `read_row_count` and `read_bytes` metrics |
| **dataQualityMetrics** | Quality metrics for input data | Column and table-level quality metrics |
| **icebergScanReport** | Iceberg scan statistics | Iceberg-specific read metrics |

<div class="alert alert-info">The <code>inputStatistics</code> metrics (<code>read_row_count</code> and <code>read_bytes</code>) require feature enablement.</div>

## Output dataset facets

Attached to `outputFacets` on output datasets.

| Facet | Description | What Datadog Does |
|---|---|---|
| **outputStatistics** | Written row count and bytes | Emits `written_row_count` and `written_bytes` metrics |
| **icebergCommitReport** | Iceberg commit statistics | Iceberg-specific write metrics |

<div class="alert alert-info">The <code>outputStatistics</code> metrics (<code>written_row_count</code> and <code>written_bytes</code>) require feature enablement.</div>

## Column lineage details

The `columnLineage` facet on output datasets is particularly valuable. When present, Datadog uses it to:

1. **Refine table-level lineage**: Only input datasets referenced by column lineage are connected to the output (rather than connecting all inputs to all outputs).
2. **Show column-level data flow**: Visualize which output columns derive from which input columns.
3. **Track transformations**: Document how data is transformed (DIRECT copy, INDIRECT through aggregation, and others).

### Example: Column lineage facet

{{< code-block lang="json" >}}
{
  "columnLineage": {
    "_producer": "...",
    "_schemaURL": "https://openlineage.io/spec/facets/1-1-0/ColumnLineageDatasetFacet.json#/$defs/ColumnLineageDatasetFacet",
    "fields": {
      "user_id": {
        "inputFields": [
          {
            "namespace": "bigquery",
            "name": "my-project.raw.users",
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
}
{{< /code-block >}}

## Service name resolution

The `_dd.ol_service` tag in the run `tags` facet maps OpenLineage events to a Datadog service name, enabling correlation with APM and other Datadog products:

{{< code-block lang="json" >}}
{
  "run": {
    "facets": {
      "tags": {
        "_producer": "...",
        "_schemaURL": "...",
        "tags": [
          {"key": "_dd.ol_service", "value": "my-data-pipeline"}
        ]
      }
    }
  }
}
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
