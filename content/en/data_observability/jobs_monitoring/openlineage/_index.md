---
title: Custom Jobs using OpenLineage
description: "Monitor jobs from in-house tools, custom pipelines, and orchestrators that don't have native Datadog integrations."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage/'
    tag: 'Documentation'
    text: 'Set up Datadog Agent for OpenLineage Proxy'
---

<div class="alert alert-info"> Custom jobs using OpenLineage is in Preview.</div>

## Overview

Custom jobs use the [OpenLineage][1] standard to send job and lineage events to Datadog. Use custom jobs when you need to:

- Capture lineage from systems Datadog doesn't integrate with natively, such as in-house tools or custom ETL scripts
- Emit lineage events for jobs or orchestrators where a native Datadog integration isn't available

**Note**: To centralize configuration and avoid distributing API keys to every application, you can [set up the Datadog Agent as an OpenLineage proxy][4].

## Prerequisites

- A Datadog API key. See [API and Application Keys][6].
- Your Datadog [site URL][3]. The examples on this page use `datadoghq.com`.

## Step 1: Send a `START` event

Choose a method to send OpenLineage events to Datadog. All examples use the same `runId` UUID throughout the run—generate one and keep it.

**Note**: Datadog requires the `jobType` [Job Facet][5] to process run events.

To also see lineage edges between your job and its datasets, include `inputs` and `outputs` in your event. Dataset namespaces must match the format Datadog expects for each platform. See [Dataset naming conventions](#dataset-naming-conventions).

{{< tabs >}}
{{% tab "Direct HTTP with curl" %}}

Send a raw [OpenLineage RunEvent][1] as JSON to Datadog's intake endpoint.

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:00:00Z",
        "eventType": "START",
        "run": { "runId": "<RUN_UUID>" },
        "job": {
          "namespace": "<YOUR_PIPELINE_NAME>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PIPELINE_NAME>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "producer": "<YOUR_PIPELINE_NAME>"
      }'
```

[1]: https://openlineage.io/docs/spec/run-cycle/

{{% /tab %}}

{{% tab "OpenLineage Python client (HTTP transport)" %}}

Use the [OpenLineage Python client][1] with a manually specified HTTP transport.

```python
from datetime import datetime
import uuid
from openlineage.client import OpenLineageClient, OpenLineageClientOptions
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job

client = OpenLineageClient(
    url="https://data-obs-intake.datadoghq.com",
    options=OpenLineageClientOptions(api_key="<DD_API_KEY>")
)

run_id = str(uuid.uuid4())

client.emit(RunEvent(
    eventType=RunState.START,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId=run_id),
    job=Job(
        namespace="<YOUR_PIPELINE_NAME>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PIPELINE_NAME>"
))
```

[1]: https://openlineage.io/docs/client/python

{{% /tab %}}

{{% tab "OpenLineage Python client (Datadog transport)" %}}

In OpenLineage 1.37.0+, use the [Datadog transport][1] for automatic configuration and optimized event delivery.

```python
from datetime import datetime
import uuid
from openlineage.client import OpenLineageClient
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job
from openlineage.client.transport.datadog import DatadogConfig, DatadogTransport

client = OpenLineageClient(transport=DatadogTransport(DatadogConfig(
    apiKey="<DD_API_KEY>",
    site="datadoghq.com"
)))

run_id = str(uuid.uuid4())

client.emit(RunEvent(
    eventType=RunState.START,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId=run_id),
    job=Job(
        namespace="<YOUR_PIPELINE_NAME>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PIPELINE_NAME>"
))
```

You can also configure the Datadog transport with environment variables instead of `DatadogConfig`:

```shell
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE=datadoghq.com
export OPENLINEAGE__TRANSPORT__TYPE=datadog
```

```python
client = OpenLineageClient.from_environment()
```

[1]: https://openlineage.io/docs/client/python#datadog-transport

{{% /tab %}}
{{< /tabs >}}

## Step 2: Verify in Datadog

After sending your events, check the following:

- [**Jobs Monitoring**][7]: Your job run appears with start time, duration, and status.
- [**Lineage graph**][9]: Your job appears as a node connected to the input and output dataset nodes.

## Dataset naming conventions

To connect your custom job's lineage to datasets already tracked by Datadog's native integrations, include `inputs` and `outputs` in your event using the exact `namespace` and `name` that Datadog expects for that platform. For example, referencing a Snowflake table in your custom job's `outputs` with the correct namespace and name links it to the existing dataset node in the lineage graph.

Datadog resolves datasets into a hierarchy of account, database, schema, and table. If a name has fewer parts than expected (for example, `database.table` instead of `database.schema.table`), Datadog falls back to the nearest higher-order node in the lineage graph.

| Platform | Namespace | Name |
|---|---|---|
| BigQuery | `bigquery` | `{project}.{dataset}.{table}` |
| Snowflake | `snowflake://{org}-{account}` | `{database}.{schema}.{table}` |
| Redshift | `redshift://{aws_account_id}:{region}:{cluster}` | `{database}.{schema}.{table}` |
| PostgreSQL | `postgres://{host}:{port}` | `{database}.{schema}.{table}` |
| Databricks | `databricks://{workspace-url}` | `{database}.{schema}.{table}` |
| Trino | `trino://{host}:{port}` | `{catalog}.{schema}.{table}` |
| AWS Glue | `arn:aws:glue:{region}:{accountId}` | `{database}.{table}` |
| S3 | `s3://{bucket}` | `{path}` |

For platforms not listed here, follow the [OpenLineage naming conventions][8].

**Note**: If a dataset namespace is not recognized, Datadog still creates a lineage node for it but does not surface it in the Data Observability product. Use a recognized namespace format to have datasets appear in the catalog and lineage graph.

## Supported facets

Facets are structured metadata attached to OpenLineage events. Each facet requires `_producer` (a URI identifying the system that produced it) and `_schemaURL` (a URI referencing its JSON schema).

### `JobTypeJobFacet`

The `jobType` job facet is **required**. It determines how Datadog classifies and displays the job.

#### `integration` values

Use `custom` for custom jobs. The values below are used by Datadog's native integrations—using them for custom jobs may produce unexpected behavior. In particular, `SPARK` prevents span generation.

| Value | Platform |
|---|---|
| `custom` | Custom or unsupported platforms |
| `SPARK` | Apache Spark (native integration only—do not use for custom jobs) |
| `AIRFLOW` | Apache Airflow |
| `DBT` | dbt |
| `BIGQUERY` | Google BigQuery |
| `SNOWFLAKE` | Snowflake |
| `TRINO` | Trino |
| `ICEBERG` | Apache Iceberg |
| `TABLEAU` | Tableau |

#### `processingType` values

`BATCH` or `STREAMING`.

#### `jobType` values

`JOB`, `TASK`, `DAG`, `MODEL`, `COMMAND`, or `QUERY`.

**Note**: If `jobType` is set to `QUERY`, Datadog does not generate lineage nodes for the job.

### Other supported facets

| Facet | What Datadog does |
|---|---|
| parent | Creates parent-child job hierarchy in the lineage graph |
| errorMessage | Generates error spans with `error.message` and `error.stack` tags |
| tags | Adds span tags to the run; `_dd.ol_service` value maps to the Datadog service name |
| sql | Parses and masks the SQL query; generates query events |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openlineage.io/
[3]: /getting_started/site/#access-the-datadog-site
[4]: /data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage/
[5]: https://openlineage.io/docs/spec/facets/job-facets/job-type/
[6]: /account_management/api-app-keys/
[7]: https://app.datadoghq.com/data-jobs
[8]: https://openlineage.io/docs/spec/naming/
[9]: https://app.datadoghq.com/data-obs/lineage
