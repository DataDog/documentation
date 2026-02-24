---
title: Integrations and Dataset Naming
description: "Supported OpenLineage integrations, dataset naming conventions for lineage correlation, and how to build custom OpenLineage events."
further_reading:
  - link: "/data_observability/jobs_monitoring/openlineage/"
    tag: "Documentation"
    text: "Custom Jobs using OpenLineage"
  - link: "/data_observability/jobs_monitoring/openlineage/event_types/"
    tag: "Documentation"
    text: "Event Types and Lifecycle"
  - link: "/data_observability/jobs_monitoring/openlineage/facets/"
    tag: "Documentation"
    text: "Supported Facets"
---

## Overview

Datadog processes OpenLineage events from several supported integrations. Consistent dataset naming across integrations is what enables Datadog to connect outputs from one job to inputs of another, forming the lineage graph.

## Supported integrations

{{< tabs >}}
{{% tab "Apache Spark" %}}

- **jobType facet**: `integration: "SPARK"`, `jobType: "APPLICATION"` or `"JOB"` or `"TASK"`
- **Emitted facets**: `spark_properties`, `sql`, `columnLineage`, `schema`, `inputStatistics`, `outputStatistics`
- **Product**: Spark jobs appear as nodes in the lineage graph with input/output dataset connections
- **Parent relationships**: Spark tasks link to parent Airflow DAGs when applicable

{{% /tab %}}
{{% tab "Apache Airflow" %}}

- **jobType facet**: `integration: "AIRFLOW"`, `jobType: "DAG"` or `"TASK"`
- **Emitted facets**: `airflow`, `airflowDagRun`, `airflowState`, `parent`
- **Product**: Airflow DAGs and tasks appear as hierarchical nodes in the lineage graph
- **Parent relationships**: Tasks reference their parent DAG through the `parent` run facet

{{% /tab %}}
{{% tab "dbt" %}}

- **jobType facet**: `integration: "DBT"`, `jobType: "JOB"` or `"MODEL"`
- **Emitted facets**: `dbt_run`, `dbt_node`, `sql`, `columnLineage`, `schema`
- **Product**: dbt models, projects, and jobs appear in the lineage graph with SQL-derived column lineage
- **Hierarchy**: dbt jobs create `dbt.project` and `dbt.account` parent nodes automatically

{{% /tab %}}
{{% tab "BigQuery" %}}

- **Emitted facets**: `bigqueryJob` (run), `bigqueryTable` (dataset), `sql`, `externalQuery`
- **Product**: BigQuery tables appear as dataset nodes; BigQuery jobs appear with query details

{{% /tab %}}
{{< /tabs >}}

### Additional integrations

| Integration | Emitted Facets | What Shows in Datadog |
|---|---|---|
| **Snowflake** | `snowflakeQuery` (run), `snowflakeTable` (dataset), `snowflakeColumnMetrics` (dataset) | Snowflake tables with ownership, description, tags, and column-level metrics |
| **Trino** | `trino_query_context`, `sql` | Trino query execution tracking with freshness metrics |
| **Tableau** | `tableauDashboard` (dataset) | Tableau dashboards connected to upstream data sources in the lineage graph |
| **Apache Iceberg** | `icebergTable`, `icebergTableMetadata`, `icebergScanReport` (input), `icebergCommitReport` (output) | Iceberg table metadata and read/write statistics |

## Dataset naming conventions

Datadog uses the [OpenLineage naming conventions][1] to correlate datasets across jobs and integrations.

### How correlation works

Lineage edges between jobs are created when the **namespace + name** of an output dataset from one job matches the **namespace + name** of an input dataset from another job. This is an **exact string match**. If two jobs reference the same dataset, they must use identical namespace and name values.

{{< img src="data_observability/openlineage/11_dataset_correlation.png" alt="Diagram showing how dataset naming enables lineage correlation: Job A outputs to a Snowflake dataset with a specific namespace and name, and Job B reads from the same namespace and name, creating a lineage connection." style="width:60%;" >}}

### Dataset naming format

Every dataset is identified by two fields:

| Field | Format | Description |
|---|---|---|
| `namespace` | `scheme://authority` | Identifies the data source type and instance |
| `name` | Hierarchical identifier | Identifies the specific resource within that source |

### Platform-specific naming conventions

| Platform | Namespace Format | Name Format | Example Namespace | Example Name |
|---|---|---|---|---|
| **BigQuery** | `bigquery` | `{project}.{dataset}.{table}` | `bigquery` | `my-project.raw.orders` |
| **Snowflake** | `snowflake://{org-account}` | `{database}.{schema}.{table}` | `snowflake://my-account.snowflakecomputing.com` | `MY_DB.PUBLIC.USERS` |
| **Redshift** | `redshift://{cluster}.{region}:{port}` | `{database}.{schema}.{table}` | `redshift://my-cluster.us-east-1:5439` | `analytics.public.orders` |
| **PostgreSQL** | `postgres://{host}:{port}` | `{database}.{schema}.{table}` | `postgres://db.example.com:5432` | `mydb.public.users` |
| **MySQL** | `mysql://{host}:{port}` | `{database}.{table}` | `mysql://db.example.com:3306` | `mydb.users` |
| **MSSQL** | `mssql://{host}:{port}` | `{database}.{schema}.{table}` | `mssql://sql.example.com:1433` | `mydb.dbo.users` |
| **Amazon S3** | `s3://{bucket}` | `{object_key}` | `s3://my-data-lake` | `raw/orders/2025/01/15` |
| **Google Cloud Storage** | `gs://{bucket}` | `{object_key}` | `gs://my-bucket` | `data/users.parquet` |
| **Azure Blob (ABFSS)** | `abfss://{container}@{account}.dfs.core.windows.net` | `{path}` | `abfss://data@myaccount.dfs.core.windows.net` | `raw/orders` |
| **Apache Kafka** | `kafka://{bootstrap_server}:{port}` | `{topic}` | `kafka://broker.example.com:9092` | `order-events` |
| **Trino** | `trino://{host}:{port}` | `{catalog}.{schema}.{table}` | `trino://trino.example.com:8080` | `hive.default.orders` |
| **AWS Athena** | `awsathena://athena.{region}.amazonaws.com` | `{catalog}.{database}.{table}` | `awsathena://athena.us-east-1.amazonaws.com` | `awsdatacatalog.mydb.orders` |

For platforms not listed here, see the [OpenLineage naming conventions][1] documentation.

### Custom platforms

You can use **custom namespace schemes** that are not in the supported platforms list. Datadog still creates dataset nodes and lineage edges for unknown platforms. They fall back to a **generic dataset** node type.

The key requirement is **naming consistency**: as long as the exact same `namespace` + `name` combination is used when a dataset appears as both an output of one job and an input of another, Datadog correlates them and draws lineage edges.

{{< code-block lang="json" >}}
{
  "outputs": [
    {
      "namespace": "myplatform://my-instance.example.com",
      "name": "my_database.my_schema.my_table"
    }
  ]
}
{{< /code-block >}}

If another job later references this same dataset as an input with the same namespace and name, Datadog connects them in the lineage graph, even though `myplatform://` is not a recognized platform. The dataset appears as a generic node without a platform-specific icon.

<div class="alert alert-info">Follow the <code>scheme://authority</code> pattern for namespaces (for example, <code>myplatform://host:port</code>) and use dot-separated hierarchical names (for example, <code>database.schema.table</code>). This is consistent with how all standard OpenLineage platforms name datasets.</div>

### Symlinks

Some datasets are accessible through multiple paths (for example, an Iceberg table accessible through both S3 and a catalog). The `symlinks` dataset facet declares alternative identifiers for the same dataset:

{{< code-block lang="json" >}}
{
  "namespace": "s3://my-data-lake",
  "name": "warehouse/orders",
  "facets": {
    "symlinks": {
      "_producer": "...",
      "_schemaURL": "...",
      "identifiers": [
        {
          "namespace": "snowflake://my-account.snowflakecomputing.com",
          "name": "MY_DB.PUBLIC.ORDERS",
          "type": "TABLE"
        }
      ]
    }
  }
}
{{< /code-block >}}

When symlinks are present, Datadog selects the **best identifier** using a priority ranking:
1. Identifiers with type `"TABLE"` are preferred (highest priority).
2. Data warehouse namespaces (BigQuery, Snowflake, Redshift) rank highest among platforms.
3. Object storage namespaces (S3, GCS, HDFS) rank lowest.

### Object storage path normalization

For object storage platforms (S3, GCS, local file), Datadog normalizes dataset names by **truncating paths to 3 levels of depth**. For example:

- `raw/orders/2025/01/15/data.parquet` becomes `raw/orders/2025`
- `warehouse/analytics/users` stays as `warehouse/analytics/users` (already 3 levels)

This prevents over-fragmentation of lineage when jobs write to date-partitioned paths but logically represent the same dataset.

## Supported platforms

Datadog recognizes datasets from the following platforms based on the dataset `namespace`:

| Category | Platforms |
|---|---|
| **Cloud Data Warehouses** | BigQuery, Snowflake, Redshift, Azure Synapse |
| **SQL Databases** | PostgreSQL, MySQL, MSSQL, Oracle, DB2, Teradata, Crate DB, Ocean Base |
| **Data Lakes / Table Formats** | Apache Iceberg, Apache Hive, Databricks (DBFS) |
| **Cloud Storage** | Amazon S3, Google Cloud Storage (GCS), Azure Blob Storage (ABFSS, WASBS), HDFS |
| **Streaming** | Apache Kafka, Google Pub/Sub |
| **Query Engines** | Trino, Amazon Athena |
| **Cloud Services** | AWS Glue, Azure Cosmos DB, Azure Data Explorer, Cassandra |
| **BI / Analytics** | Tableau, Looker, PowerBI, Metabase, Sigma, Hex |
| **ETL / Integration** | Fivetran |
| **File Systems** | Local filesystem, Remote filesystem |

## Building custom OpenLineage events

If your job platform or data store isn't natively supported by an OpenLineage integration, you can build and send your own OpenLineage events. Datadog processes them and creates lineage, metrics, and spans just like events from supported integrations.

### Checklist

Before building custom events, ensure:

- **Consistent naming**: Use the same `namespace` + `name` across all events referencing the same dataset.
- **Namespace format**: Follow `scheme://authority` (for example, `myplatform://host:port`).
- **Include `jobType` facet**: So Datadog can classify the job node in the lineage graph.
- **Send START and COMPLETE/FAIL**: For full run monitoring and APM span generation.
- **Same `run.runId`**: Use the same UUID across all events for one run.
- **Set `producer`**: A URI identifying your system (for example, `https://github.com/my-org/my-scheduler`).
- **Include facets on COMPLETE**: `schema`, `outputStatistics`, and `columnLineage` maximize product value.

### Example: Custom job platform

{{< tabs >}}
{{% tab "START event" %}}

{{< code-block lang="json" >}}
{
  "eventTime": "2025-01-15T10:00:00.000Z",
  "eventType": "START",
  "producer": "https://github.com/my-org/my-custom-scheduler",
  "schemaURL": "https://openlineage.io/spec/2-0-2/OpenLineage.json#/$defs/RunEvent",
  "run": {
    "runId": "550e8400-e29b-41d4-a716-446655440000"
  },
  "job": {
    "namespace": "my-custom-scheduler",
    "name": "daily_data_sync",
    "facets": {
      "jobType": {
        "_producer": "https://github.com/my-org/my-custom-scheduler",
        "_schemaURL": "https://openlineage.io/spec/facets/2-0-2/JobTypeJobFacet.json#/$defs/JobTypeJobFacet",
        "processingType": "BATCH",
        "integration": "CUSTOM",
        "jobType": "JOB"
      }
    }
  },
  "inputs": [
    {
      "namespace": "myplatform://internal-db.corp.example.com:5432",
      "name": "source_db.public.customers"
    }
  ],
  "outputs": []
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "COMPLETE event" %}}

{{< code-block lang="json" >}}
{
  "eventTime": "2025-01-15T10:05:00.000Z",
  "eventType": "COMPLETE",
  "producer": "https://github.com/my-org/my-custom-scheduler",
  "schemaURL": "https://openlineage.io/spec/2-0-2/OpenLineage.json#/$defs/RunEvent",
  "run": {
    "runId": "550e8400-e29b-41d4-a716-446655440000"
  },
  "job": {
    "namespace": "my-custom-scheduler",
    "name": "daily_data_sync",
    "facets": {
      "jobType": {
        "_producer": "https://github.com/my-org/my-custom-scheduler",
        "_schemaURL": "https://openlineage.io/spec/facets/2-0-2/JobTypeJobFacet.json#/$defs/JobTypeJobFacet",
        "processingType": "BATCH",
        "integration": "CUSTOM",
        "jobType": "JOB"
      },
      "sql": {
        "_producer": "https://github.com/my-org/my-custom-scheduler",
        "_schemaURL": "https://openlineage.io/spec/facets/1-0-1/SQLJobFacet.json#/$defs/SQLJobFacet",
        "query": "INSERT INTO target_db.public.customers_snapshot SELECT * FROM source_db.public.customers"
      }
    }
  },
  "inputs": [
    {
      "namespace": "myplatform://internal-db.corp.example.com:5432",
      "name": "source_db.public.customers",
      "facets": {
        "schema": {
          "_producer": "https://github.com/my-org/my-custom-scheduler",
          "_schemaURL": "https://openlineage.io/spec/facets/1-1-1/SchemaDatasetFacet.json#/$defs/SchemaDatasetFacet",
          "fields": [
            {"name": "customer_id", "type": "INT"},
            {"name": "name", "type": "VARCHAR"},
            {"name": "email", "type": "VARCHAR"}
          ]
        }
      },
      "inputFacets": {
        "inputStatistics": {
          "_producer": "https://github.com/my-org/my-custom-scheduler",
          "_schemaURL": "https://openlineage.io/spec/facets/1-0-2/InputStatisticsInputDatasetFacet.json#/$defs/InputStatisticsInputDatasetFacet",
          "rowCount": 100000,
          "size": 52428800
        }
      }
    }
  ],
  "outputs": [
    {
      "namespace": "myplatform://target-db.corp.example.com:5432",
      "name": "target_db.public.customers_snapshot",
      "facets": {
        "schema": {
          "_producer": "https://github.com/my-org/my-custom-scheduler",
          "_schemaURL": "https://openlineage.io/spec/facets/1-1-1/SchemaDatasetFacet.json#/$defs/SchemaDatasetFacet",
          "fields": [
            {"name": "customer_id", "type": "INT"},
            {"name": "name", "type": "VARCHAR"},
            {"name": "email", "type": "VARCHAR"}
          ]
        },
        "columnLineage": {
          "_producer": "https://github.com/my-org/my-custom-scheduler",
          "_schemaURL": "https://openlineage.io/spec/facets/1-1-0/ColumnLineageDatasetFacet.json#/$defs/ColumnLineageDatasetFacet",
          "fields": {
            "customer_id": {
              "inputFields": [{"namespace": "myplatform://internal-db.corp.example.com:5432", "name": "source_db.public.customers", "field": "customer_id"}]
            },
            "name": {
              "inputFields": [{"namespace": "myplatform://internal-db.corp.example.com:5432", "name": "source_db.public.customers", "field": "name"}]
            },
            "email": {
              "inputFields": [{"namespace": "myplatform://internal-db.corp.example.com:5432", "name": "source_db.public.customers", "field": "email"}]
            }
          }
        }
      },
      "outputFacets": {
        "outputStatistics": {
          "_producer": "https://github.com/my-org/my-custom-scheduler",
          "_schemaURL": "https://openlineage.io/spec/facets/1-0-2/OutputStatisticsOutputDatasetFacet.json#/$defs/OutputStatisticsOutputDatasetFacet",
          "rowCount": 100000,
          "size": 52428800
        }
      }
    }
  ]
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### What Datadog creates from custom events

Even with an unknown platform or integration, Datadog creates:

| Feature | What You Get | Required Facets |
|---|---|---|
| **Lineage graph nodes** | Job and dataset nodes (generic icons) | `jobType`, inputs/outputs |
| **Lineage edges** | Connections between jobs and datasets | Consistent `namespace` + `name` |
| **Column-level lineage** | Field-level data flow tracking | `columnLineage` on outputs |
| **APM spans** | Job execution spans with duration and error status | START + COMPLETE/FAIL events |
| **Data quality metrics** | `row_count`, `bytes`, `freshness` time-series | `dataQualityMetrics`, `outputStatistics` |
| **Column metrics** | `nullness`, `uniqueness` per column | `dataQualityMetrics.columnMetrics` |
| **Query logs** | Masked SQL with query signatures | `sql` facet (on COMPLETE) |
| **Schema in catalog** | Dataset field definitions | `schema` facet |
| **Ownership** | Team/person attribution | `ownership` facet |
| **Error tracking** | Error spans with stack traces | `errorMessage` facet (on FAIL) |

### Connecting custom platforms to supported platforms

A common pattern is a custom job platform that reads from or writes to supported data stores. For example, a custom scheduler that reads from PostgreSQL and writes to Snowflake:

{{< img src="data_observability/openlineage/12_custom_platform.png" alt="Diagram showing a custom scheduler job reading from PostgreSQL and writing to Snowflake, with standard naming conventions for the supported platforms." style="width:50%;" >}}

In this case, use the **standard naming conventions** for the supported platforms (PostgreSQL, Snowflake) and your own namespace for any custom datasets. The supported-platform datasets receive full platform-specific features (icons, hierarchy, native metrics), while the custom job still gets lineage, spans, and metrics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openlineage.io/docs/spec/naming
