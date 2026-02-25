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

## End-to-end example

The following bash script sends a complete pipeline run to Datadog. It demonstrates:

- **Parent-child hierarchy**: A pipeline job with two child tasks linked by the `parent` run facet
- **Multiple input and output datasets**: Task 1 reads from two PostgreSQL tables and writes to Snowflake
- **Cross-task lineage**: Task 2 reads from the same Snowflake table that task 1 writes, creating a lineage edge between the two tasks
- **Column-level lineage**: Tracks how source columns map to output columns, including `AGGREGATION` transforms
- **Success and failure**: Task 1 completes successfully; task 2 fails with an error and stack trace
- **Rich facets**: `schema`, `columnLineage`, `sql`, `inputStatistics`, `outputStatistics`, and `errorMessage`

### Scenario

**Pipeline**: `nightly_etl_pipeline` (orchestrator)

| Task | Reads from | Writes to | Outcome |
|---|---|---|---|
| `extract_and_transform_orders` | `source_db.public.orders`, `source_db.public.customers` (PostgreSQL) | `ANALYTICS_DB.PUBLIC.ORDER_SUMMARY` (Snowflake) | Success |
| `generate_revenue_report` | `ANALYTICS_DB.PUBLIC.ORDER_SUMMARY` (Snowflake) | `ANALYTICS_DB.PUBLIC.REVENUE_REPORT` (Snowflake) | Fails with permission error |

### Run the script

1. Save the script below as `send_pipeline.sh`.
2. Export your Datadog API key: `export DD_API_KEY=<your-api-key>`
3. Optionally set your Datadog site (defaults to `datadoghq.com`): `export DD_SITE=us5.datadoghq.com`
4. Run the script: `bash send_pipeline.sh`

The script requires `bash`, `curl`, and `uuidgen` (available on macOS and most Linux distributions).

{{< code-block lang="bash" filename="send_pipeline.sh" >}}
#!/usr/bin/env bash
# send_pipeline.sh — Send a complete OpenLineage pipeline to Datadog.
#
# Demonstrates: parent-child jobs, multiple datasets with schemas,
# column-level lineage, cross-task lineage, success/failure, and error tracking.
#
# Requirements: bash, curl, uuidgen
# Usage:
#   export DD_API_KEY=<your-api-key>
#   bash send_pipeline.sh

set -euo pipefail

# ── Configuration ──────────────────────────────────────────────────────────────
: "${DD_API_KEY:?Set DD_API_KEY before running this script}"
DD_SITE="${DD_SITE:-datadoghq.com}"
API_URL="https://api.${DD_SITE}/api/intake/openlineage/api/v1/lineage"
PRODUCER="https://github.com/my-org/nightly-etl"

# ── OpenLineage schema URLs (single-quoted to keep $defs literal) ──────────────
OL_RUN_EVENT='https://openlineage.io/spec/2-0-2/OpenLineage.json#/$defs/RunEvent'
OL_JOB_TYPE='https://openlineage.io/spec/facets/2-0-2/JobTypeJobFacet.json#/$defs/JobTypeJobFacet'
OL_PARENT='https://openlineage.io/spec/facets/1-0-1/ParentRunFacet.json#/$defs/ParentRunFacet'
OL_SQL='https://openlineage.io/spec/facets/1-0-1/SQLJobFacet.json#/$defs/SQLJobFacet'
OL_SCHEMA='https://openlineage.io/spec/facets/1-1-1/SchemaDatasetFacet.json#/$defs/SchemaDatasetFacet'
OL_COL_LINEAGE='https://openlineage.io/spec/facets/1-1-0/ColumnLineageDatasetFacet.json#/$defs/ColumnLineageDatasetFacet'
OL_INPUT_STATS='https://openlineage.io/spec/facets/1-0-2/InputStatisticsInputDatasetFacet.json#/$defs/InputStatisticsInputDatasetFacet'
OL_OUTPUT_STATS='https://openlineage.io/spec/facets/1-0-2/OutputStatisticsOutputDatasetFacet.json#/$defs/OutputStatisticsOutputDatasetFacet'
OL_ERROR='https://openlineage.io/spec/facets/1-0-0/ErrorMessageRunFacet.json#/$defs/ErrorMessageRunFacet'

# ── Unique run IDs (generated fresh each execution) ───────────────────────────
PIPELINE_RUN_ID="$(uuidgen | tr '[:upper:]' '[:lower:]')"
TASK1_RUN_ID="$(uuidgen | tr '[:upper:]' '[:lower:]')"
TASK2_RUN_ID="$(uuidgen | tr '[:upper:]' '[:lower:]')"

# ── Dataset namespaces and names ──────────────────────────────────────────────
PG_NS="postgres://source-db.example.com:5432"
SF_NS="snowflake://my-account.snowflakecomputing.com"
ORDERS="source_db.public.orders"
CUSTOMERS="source_db.public.customers"
ORDER_SUMMARY="ANALYTICS_DB.PUBLIC.ORDER_SUMMARY"
REVENUE_REPORT="ANALYTICS_DB.PUBLIC.REVENUE_REPORT"

# ── Job identifiers ──────────────────────────────────────────────────────────
JOB_NS="my-etl-scheduler"
PIPELINE_NAME="nightly_etl_pipeline"
TASK1_NAME="extract_and_transform_orders"
TASK2_NAME="generate_revenue_report"

# ── Helpers ──────────────────────────────────────────────────────────────────
timestamp() { date -u +"%Y-%m-%dT%H:%M:%S.000Z"; }

send_event() {
  local label="$1" payload="$2"
  local http_code
  http_code=$(curl -s -o /dev/null -w "%{http_code}" \
    -X POST "$API_URL" \
    -H "DD-API-KEY: $DD_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$payload")
  printf "  [%s] %s\n" "$http_code" "$label"
  if [[ "$http_code" -lt 200 || "$http_code" -ge 300 ]]; then
    echo "  ERROR: unexpected HTTP $http_code" >&2
    return 1
  fi
}

echo "Sending pipeline events to $DD_SITE ..."

# ── 1. Pipeline START ────────────────────────────────────────────────────────
send_event "Pipeline START" "$(cat <<EOF
{
  "eventTime": "$(timestamp)",
  "eventType": "START",
  "producer": "$PRODUCER",
  "schemaURL": "$OL_RUN_EVENT",
  "run": { "runId": "$PIPELINE_RUN_ID" },
  "job": {
    "namespace": "$JOB_NS",
    "name": "$PIPELINE_NAME",
    "facets": {
      "jobType": {
        "_producer": "$PRODUCER",
        "_schemaURL": "$OL_JOB_TYPE",
        "processingType": "BATCH",
        "integration": "CUSTOM",
        "jobType": "PIPELINE"
      }
    }
  },
  "inputs": [],
  "outputs": []
}
EOF
)"

sleep 1

# ── 2. Task 1 START ─────────────────────────────────────────────────────────
send_event "Task 1 START  (extract_and_transform_orders)" "$(cat <<EOF
{
  "eventTime": "$(timestamp)",
  "eventType": "START",
  "producer": "$PRODUCER",
  "schemaURL": "$OL_RUN_EVENT",
  "run": {
    "runId": "$TASK1_RUN_ID",
    "facets": {
      "parent": {
        "_producer": "$PRODUCER",
        "_schemaURL": "$OL_PARENT",
        "run": { "runId": "$PIPELINE_RUN_ID" },
        "job": { "namespace": "$JOB_NS", "name": "$PIPELINE_NAME" }
      }
    }
  },
  "job": {
    "namespace": "$JOB_NS",
    "name": "$TASK1_NAME",
    "facets": {
      "jobType": {
        "_producer": "$PRODUCER",
        "_schemaURL": "$OL_JOB_TYPE",
        "processingType": "BATCH",
        "integration": "CUSTOM",
        "jobType": "TASK"
      }
    }
  },
  "inputs": [
    { "namespace": "$PG_NS", "name": "$ORDERS" },
    { "namespace": "$PG_NS", "name": "$CUSTOMERS" }
  ],
  "outputs": []
}
EOF
)"

sleep 1

# ── 3. Task 2 START ─────────────────────────────────────────────────────────
send_event "Task 2 START  (generate_revenue_report)" "$(cat <<EOF
{
  "eventTime": "$(timestamp)",
  "eventType": "START",
  "producer": "$PRODUCER",
  "schemaURL": "$OL_RUN_EVENT",
  "run": {
    "runId": "$TASK2_RUN_ID",
    "facets": {
      "parent": {
        "_producer": "$PRODUCER",
        "_schemaURL": "$OL_PARENT",
        "run": { "runId": "$PIPELINE_RUN_ID" },
        "job": { "namespace": "$JOB_NS", "name": "$PIPELINE_NAME" }
      }
    }
  },
  "job": {
    "namespace": "$JOB_NS",
    "name": "$TASK2_NAME",
    "facets": {
      "jobType": {
        "_producer": "$PRODUCER",
        "_schemaURL": "$OL_JOB_TYPE",
        "processingType": "BATCH",
        "integration": "CUSTOM",
        "jobType": "TASK"
      }
    }
  },
  "inputs": [
    { "namespace": "$SF_NS", "name": "$ORDER_SUMMARY" }
  ],
  "outputs": []
}
EOF
)"

sleep 3

# ── 4. Task 1 COMPLETE (schemas, column lineage, statistics, SQL) ────────────
send_event "Task 1 COMPLETE (extract_and_transform_orders)" "$(cat <<EOF
{
  "eventTime": "$(timestamp)",
  "eventType": "COMPLETE",
  "producer": "$PRODUCER",
  "schemaURL": "$OL_RUN_EVENT",
  "run": {
    "runId": "$TASK1_RUN_ID",
    "facets": {
      "parent": {
        "_producer": "$PRODUCER",
        "_schemaURL": "$OL_PARENT",
        "run": { "runId": "$PIPELINE_RUN_ID" },
        "job": { "namespace": "$JOB_NS", "name": "$PIPELINE_NAME" }
      }
    }
  },
  "job": {
    "namespace": "$JOB_NS",
    "name": "$TASK1_NAME",
    "facets": {
      "jobType": {
        "_producer": "$PRODUCER",
        "_schemaURL": "$OL_JOB_TYPE",
        "processingType": "BATCH",
        "integration": "CUSTOM",
        "jobType": "TASK"
      },
      "sql": {
        "_producer": "$PRODUCER",
        "_schemaURL": "$OL_SQL",
        "query": "INSERT INTO ANALYTICS_DB.PUBLIC.ORDER_SUMMARY SELECT c.customer_id, c.name AS customer_name, c.region, COUNT(o.order_id) AS total_orders, SUM(o.amount) AS total_revenue FROM source_db.public.orders o JOIN source_db.public.customers c ON o.customer_id = c.customer_id GROUP BY c.customer_id, c.name, c.region"
      }
    }
  },
  "inputs": [
    {
      "namespace": "$PG_NS",
      "name": "$ORDERS",
      "facets": {
        "schema": {
          "_producer": "$PRODUCER",
          "_schemaURL": "$OL_SCHEMA",
          "fields": [
            { "name": "order_id", "type": "INTEGER" },
            { "name": "customer_id", "type": "INTEGER" },
            { "name": "amount", "type": "DECIMAL(10,2)" },
            { "name": "created_at", "type": "TIMESTAMP" }
          ]
        }
      },
      "inputFacets": {
        "inputStatistics": {
          "_producer": "$PRODUCER",
          "_schemaURL": "$OL_INPUT_STATS",
          "rowCount": 500000,
          "size": 104857600
        }
      }
    },
    {
      "namespace": "$PG_NS",
      "name": "$CUSTOMERS",
      "facets": {
        "schema": {
          "_producer": "$PRODUCER",
          "_schemaURL": "$OL_SCHEMA",
          "fields": [
            { "name": "customer_id", "type": "INTEGER" },
            { "name": "name", "type": "VARCHAR" },
            { "name": "email", "type": "VARCHAR" },
            { "name": "region", "type": "VARCHAR" }
          ]
        }
      },
      "inputFacets": {
        "inputStatistics": {
          "_producer": "$PRODUCER",
          "_schemaURL": "$OL_INPUT_STATS",
          "rowCount": 10000,
          "size": 2097152
        }
      }
    }
  ],
  "outputs": [
    {
      "namespace": "$SF_NS",
      "name": "$ORDER_SUMMARY",
      "facets": {
        "schema": {
          "_producer": "$PRODUCER",
          "_schemaURL": "$OL_SCHEMA",
          "fields": [
            { "name": "customer_id", "type": "INTEGER" },
            { "name": "customer_name", "type": "VARCHAR" },
            { "name": "region", "type": "VARCHAR" },
            { "name": "total_orders", "type": "INTEGER" },
            { "name": "total_revenue", "type": "DECIMAL(10,2)" }
          ]
        },
        "columnLineage": {
          "_producer": "$PRODUCER",
          "_schemaURL": "$OL_COL_LINEAGE",
          "fields": {
            "customer_id": {
              "inputFields": [
                { "namespace": "$PG_NS", "name": "$CUSTOMERS", "field": "customer_id" }
              ]
            },
            "customer_name": {
              "inputFields": [
                { "namespace": "$PG_NS", "name": "$CUSTOMERS", "field": "name" }
              ]
            },
            "region": {
              "inputFields": [
                { "namespace": "$PG_NS", "name": "$CUSTOMERS", "field": "region" }
              ]
            },
            "total_orders": {
              "inputFields": [
                {
                  "namespace": "$PG_NS", "name": "$ORDERS", "field": "order_id",
                  "transformations": [
                    { "type": "INDIRECT", "subtype": "AGGREGATION", "description": "COUNT(order_id)" }
                  ]
                }
              ]
            },
            "total_revenue": {
              "inputFields": [
                {
                  "namespace": "$PG_NS", "name": "$ORDERS", "field": "amount",
                  "transformations": [
                    { "type": "INDIRECT", "subtype": "AGGREGATION", "description": "SUM(amount)" }
                  ]
                }
              ]
            }
          }
        }
      },
      "outputFacets": {
        "outputStatistics": {
          "_producer": "$PRODUCER",
          "_schemaURL": "$OL_OUTPUT_STATS",
          "rowCount": 10000,
          "size": 1048576
        }
      }
    }
  ]
}
EOF
)"

sleep 1

# ── 5. Task 2 FAIL (with error message and stack trace) ─────────────────────
send_event "Task 2 FAIL   (generate_revenue_report)" "$(cat <<EOF
{
  "eventTime": "$(timestamp)",
  "eventType": "FAIL",
  "producer": "$PRODUCER",
  "schemaURL": "$OL_RUN_EVENT",
  "run": {
    "runId": "$TASK2_RUN_ID",
    "facets": {
      "parent": {
        "_producer": "$PRODUCER",
        "_schemaURL": "$OL_PARENT",
        "run": { "runId": "$PIPELINE_RUN_ID" },
        "job": { "namespace": "$JOB_NS", "name": "$PIPELINE_NAME" }
      },
      "errorMessage": {
        "_producer": "$PRODUCER",
        "_schemaURL": "$OL_ERROR",
        "message": "Snowflake permission denied: role ANALYST_ROLE does not have SELECT privilege on table ANALYTICS_DB.PUBLIC.ORDER_SUMMARY",
        "programmingLanguage": "PYTHON",
        "stackTrace": "Traceback (most recent call last):\n  File \"/app/tasks/revenue_report.py\", line 42, in run\n    cursor.execute(query)\n  File \"/usr/local/lib/python3.11/site-packages/snowflake/connector/cursor.py\", line 123, in execute\n    raise ProgrammingError(msg)\nsnowflake.connector.errors.ProgrammingError: 003001: SQL access control error:\n  Insufficient privileges to operate on table 'ORDER_SUMMARY'"
      }
    }
  },
  "job": {
    "namespace": "$JOB_NS",
    "name": "$TASK2_NAME",
    "facets": {
      "jobType": {
        "_producer": "$PRODUCER",
        "_schemaURL": "$OL_JOB_TYPE",
        "processingType": "BATCH",
        "integration": "CUSTOM",
        "jobType": "TASK"
      }
    }
  },
  "inputs": [
    { "namespace": "$SF_NS", "name": "$ORDER_SUMMARY" }
  ],
  "outputs": []
}
EOF
)"

sleep 1

# ── 6. Pipeline COMPLETE ────────────────────────────────────────────────────
send_event "Pipeline COMPLETE (nightly_etl_pipeline)" "$(cat <<EOF
{
  "eventTime": "$(timestamp)",
  "eventType": "COMPLETE",
  "producer": "$PRODUCER",
  "schemaURL": "$OL_RUN_EVENT",
  "run": { "runId": "$PIPELINE_RUN_ID" },
  "job": {
    "namespace": "$JOB_NS",
    "name": "$PIPELINE_NAME",
    "facets": {
      "jobType": {
        "_producer": "$PRODUCER",
        "_schemaURL": "$OL_JOB_TYPE",
        "processingType": "BATCH",
        "integration": "CUSTOM",
        "jobType": "PIPELINE"
      }
    }
  },
  "inputs": [],
  "outputs": []
}
EOF
)"

echo ""
echo "Done. View your pipeline in Datadog:"
echo "  Pipeline run ID: $PIPELINE_RUN_ID"
echo "  Task 1 run ID:   $TASK1_RUN_ID"
echo "  Task 2 run ID:   $TASK2_RUN_ID"
{{< /code-block >}}

### What to expect in Datadog

After the script completes:

- **Lineage graph**: The pipeline node (`nightly_etl_pipeline`) appears with two child tasks. Dataset nodes for the PostgreSQL tables and Snowflake tables are connected to their respective tasks. The shared `ORDER_SUMMARY` table creates a lineage edge between the two tasks.
- **Column-level lineage**: Click `ORDER_SUMMARY` to see how each column maps back to source fields in `orders` and `customers`, including `COUNT` and `SUM` aggregation transforms.
- **APM traces**: Each task and the pipeline appear as spans. Task 1 shows a successful span with duration; task 2 shows an error span.
- **Error tracking**: Task 2's error span includes the Snowflake permission error message and the Python stack trace from the `errorMessage` facet.
- **Schema catalog**: The `orders`, `customers`, and `ORDER_SUMMARY` tables show their field definitions in the data catalog.
- **Statistics**: `ORDER_SUMMARY` displays row count and byte size from the `outputStatistics` facet; input tables show their `inputStatistics`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/jobs_monitoring/openlineage/integrations_and_naming/
