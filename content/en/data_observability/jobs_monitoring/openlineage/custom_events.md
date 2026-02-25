---
title: Building Custom OpenLineage Events
description: "Build and send custom OpenLineage events from unsupported job platforms or data stores to create lineage, metrics, and spans in Datadog."
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
  - link: "/data_observability/jobs_monitoring/openlineage/integrations_and_naming/"
    tag: "Documentation"
    text: "Integrations and Dataset Naming"
---

## Overview

If your job platform or data store isn't natively supported by an OpenLineage integration, you can build and send your own OpenLineage events. Datadog processes them and creates lineage, metrics, and spans just like events from supported integrations.

## Checklist

Before building custom events, ensure:

- **Consistent naming**: Use the same `namespace` + `name` across all events referencing the same dataset.
- **Namespace format**: Follow `scheme://authority` (for example, `myplatform://host:port`).
- **Include `jobType` facet**: So Datadog can classify the job node in the lineage graph.
- **Send START and COMPLETE/FAIL**: For full run monitoring and APM span generation.
- **Same `run.runId`**: Use the same UUID across all events for one run.
- **Set `producer`**: A URI identifying your system (for example, `https://github.com/my-org/my-scheduler`).
- **Include facets on COMPLETE**: `schema`, `outputStatistics`, and `columnLineage` maximize product value.

## Example: Custom job platform

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

## What Datadog creates from custom events

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

## Connecting custom platforms to supported platforms

A common pattern is a custom job platform that reads from or writes to supported data stores. For example, a custom scheduler that reads from PostgreSQL and writes to Snowflake:

{{< img src="data_observability/openlineage/12_custom_platform.png" alt="Diagram showing a custom scheduler job reading from PostgreSQL and writing to Snowflake, with standard naming conventions for the supported platforms." style="width:50%;" >}}

In this case, use the **standard naming conventions** for the supported platforms (PostgreSQL, Snowflake) and your own namespace for any custom datasets. The supported-platform datasets receive full platform-specific features (icons, hierarchy, native metrics), while the custom job still gets lineage, spans, and metrics.

For the full list of dataset naming conventions by platform, see [Integrations and Dataset Naming][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/jobs_monitoring/openlineage/integrations_and_naming/
