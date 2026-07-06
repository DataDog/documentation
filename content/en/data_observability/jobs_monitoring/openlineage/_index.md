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

Custom jobs use the [OpenLineage][1] standard to send job and lineage events to Datadog. With custom jobs, you can:

- Detect failing and long-running jobs
- Pinpoint and resolve the root cause of failed and long-running jobs
- Understand upstream dependencies and downstream data consumers with data lineage

Use custom jobs when you need to:

- Capture lineage from systems Datadog doesn't integrate with natively, such as in-house tools or custom ETL scripts
- Emit lineage events for jobs or orchestrators where a native Datadog integration isn't available

**Note**: To centralize configuration and avoid distributing API keys to every application, you can [set up the Datadog Agent as an OpenLineage proxy][4].

## Prerequisites

- A Datadog API key. See [API and Application Keys][6].
- Your Datadog [site URL][3]. The examples on this page use `datadoghq.com`; replace the hostname with the intake endpoint for your site.

## Step 1: Send a `START` event

Use one of the following options to send [OpenLineage events][1] to Datadog:

**Note**: Datadog requires the `jobType` [Job Facet][5] to process run events.

To also see lineage edges between your job and its datasets, include `inputs` and `outputs` in your event. Dataset namespaces must match the format Datadog expects for each platform. See [Dataset naming conventions](#dataset-naming-conventions).

{{< tabs >}}
{{% tab "Direct HTTP with curl" %}}

Send a raw [OpenLineage RunEvent](https://openlineage.io/docs/spec/run-cycle/) as JSON to Datadog's intake endpoint.

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:00:00Z",
        "eventType": "START",
        "run": { "runId": "<RUN_UUID>" },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "inputs": [
          {
            "namespace": "postgres://demo-db.example.com:5432",
            "name": "orders.public.orders"
          }
        ],
        "outputs": [
          {
            "namespace": "snowflake://myorg-myaccount",
            "name": "ANALYTICS.PUBLIC.ORDERS"
          }
        ],
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

{{% /tab %}}

{{% tab "OpenLineage Python client (HTTP transport)" %}}

Use the [OpenLineage Python client](https://openlineage.io/docs/client/python) with a manually specified HTTP transport.

```python
from datetime import datetime
import uuid
from openlineage.client import OpenLineageClient, OpenLineageClientOptions
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run, InputDataset, OutputDataset
from openlineage.client.facet_v2 import job_type_job

client = OpenLineageClient(
    url="https://data-obs-intake.datadoghq.com",
    options=OpenLineageClientOptions(api_key="<DD_API_KEY>")
)

event = RunEvent(
    eventType=RunState.START,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId=str(uuid.uuid4())),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    inputs=[
        InputDataset(
            namespace="postgres://demo-db.example.com:5432",
            name="orders.public.orders"
        )
    ],
    outputs=[
        OutputDataset(
            namespace="snowflake://myorg-myaccount",
            name="ANALYTICS.PUBLIC.ORDERS"
        )
    ],
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(event)
```

{{% /tab %}}

{{% tab "OpenLineage Python client (Datadog transport)" %}}

In OpenLineage 1.37.0+, use the [Datadog transport](https://openlineage.io/docs/client/python#datadog-transport) for automatic configuration and optimized event delivery.

```python
from datetime import datetime
import uuid
from openlineage.client import OpenLineageClient
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run, InputDataset, OutputDataset
from openlineage.client.facet_v2 import job_type_job
from openlineage.client.transport.datadog import DatadogConfig, DatadogTransport

config = DatadogConfig(
    apiKey="<DD_API_KEY>",
    site="datadoghq.com"  # Change if using a different Datadog site
)

client = OpenLineageClient(transport=DatadogTransport(config))

event = RunEvent(
    eventType=RunState.START,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId=str(uuid.uuid4())),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    inputs=[
        InputDataset(
            namespace="postgres://demo-db.example.com:5432",
            name="orders.public.orders"
        )
    ],
    outputs=[
        OutputDataset(
            namespace="snowflake://myorg-myaccount",
            name="ANALYTICS.PUBLIC.ORDERS"
        )
    ],
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(event)
```

You can also configure the Datadog transport with environment variables instead of `DatadogConfig`:

```shell
export DD_API_KEY=<DD_API_KEY>
export DD_SITE=datadoghq.com
export OPENLINEAGE__TRANSPORT__TYPE=datadog
```

```python
client = OpenLineageClient.from_environment()
```

{{% /tab %}}
{{< /tabs >}}

## Step 2: Send a `RUNNING` event (optional)

**Note**: This step is optional. `RUNNING` events let you see a job's status before it finishes. If you only need to capture job completion status, skip to [Step 3](#step-3-send-a-complete-or-fail-event).

While the job is in progress, send a `RUNNING` event to track it in Datadog's Jobs Monitoring. Use the same `runId` from the `START` event.

{{< tabs >}}
{{% tab "Direct HTTP with curl" %}}

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:02:00Z",
        "eventType": "RUNNING",
        "run": { "runId": "<RUN_UUID>" },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

{{% /tab %}}

{{% tab "OpenLineage Python client (HTTP transport)" %}}

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job

running_event = RunEvent(
    eventType=RunState.RUNNING,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(running_event)
```

{{% /tab %}}

{{% tab "OpenLineage Python client (Datadog transport)" %}}

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job

running_event = RunEvent(
    eventType=RunState.RUNNING,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(running_event)
```

{{% /tab %}}
{{< /tabs >}}

## Step 3: Send a `COMPLETE` or `FAIL` event

When the job finishes, send a `COMPLETE` or `FAIL` event using the same `runId` from the `START` event.

{{< tabs >}}
{{% tab "Direct HTTP with curl" %}}

**Success**

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:05:00Z",
        "eventType": "COMPLETE",
        "run": { "runId": "<RUN_UUID>" },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

**Failure**

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:05:00Z",
        "eventType": "FAIL",
        "run": {
          "runId": "<RUN_UUID>",
          "facets": {
            "errorMessage": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/1-0-1/ErrorMessageRunFacet.json",
              "message": "Job failed: division by zero",
              "programmingLanguage": "Python",
              "stackTrace": "Traceback (most recent call last):\n  File \"job.py\", line 42, in run\n    result = total / count\nZeroDivisionError: division by zero"
            }
          }
        },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

{{% /tab %}}

{{% tab "OpenLineage Python client (HTTP transport)" %}}

**Success**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run

complete_event = RunEvent(
    eventType=RunState.COMPLETE,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(complete_event)
```

**Failure**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import error_message_run

fail_event = RunEvent(
    eventType=RunState.FAIL,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(
        runId="<RUN_UUID>",  # same runId as START
        facets={
            "errorMessage": error_message_run.ErrorMessageRunFacet(
                message="Job failed: division by zero",
                programmingLanguage="Python",
                stackTrace="Traceback (most recent call last):\n  File \"job.py\", line 42, in run\n    result = total / count\nZeroDivisionError: division by zero"
            )
        }
    ),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(fail_event)
```

{{% /tab %}}

{{% tab "OpenLineage Python client (Datadog transport)" %}}

**Success**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job

complete_event = RunEvent(
    eventType=RunState.COMPLETE,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(complete_event)
```

**Failure**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job, error_message_run

fail_event = RunEvent(
    eventType=RunState.FAIL,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(
        runId="<RUN_UUID>",  # same runId as START
        facets={
            "errorMessage": error_message_run.ErrorMessageRunFacet(
                message="Job failed: division by zero",
                programmingLanguage="Python",
                stackTrace="Traceback (most recent call last):\n  File \"job.py\", line 42, in run\n    result = total / count\nZeroDivisionError: division by zero"
            )
        }
    ),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(fail_event)
```

{{% /tab %}}
{{< /tabs >}}

## Step 4: Verify in Datadog

After sending your events, check the following:

- [**Jobs Monitoring**][7]: Your job run appears with start time, duration, and status.
- [**Lineage graph**][9]: If you included `inputs` or `outputs` in your event, your job appears as a node connected to the dataset nodes.

## Dataset naming conventions

To connect your custom job's lineage to datasets already tracked by Datadog's native integrations, include `inputs` and `outputs` in your event using the exact `namespace` and `name` that Datadog expects for that platform. For example, referencing a Snowflake table in your custom job's `outputs` with the correct namespace and name links it to the existing dataset node in the lineage graph.

Datadog resolves datasets into a hierarchy of account, database, schema, and table. If a name has fewer parts than expected (for example, `database.table` instead of `database.schema.table`), Datadog falls back to the nearest higher-order node in the lineage graph.

| Platform   | Namespace                                        | Name                          |
| ---------- | ------------------------------------------------ | ----------------------------- |
| BigQuery   | `bigquery`                                       | `{project}.{dataset}.{table}` |
| Snowflake  | `snowflake://{org}-{account}`                    | `{database}.{schema}.{table}` |
| Redshift   | `redshift://{aws_account_id}:{region}:{cluster}` | `{database}.{schema}.{table}` |
| PostgreSQL | `postgres://{host}:{port}`                       | `{database}.{schema}.{table}` |
| Databricks | `databricks://{workspace-url}`                   | `{database}.{schema}.{table}` |
| Trino      | `trino://{host}:{port}`                          | `{catalog}.{schema}.{table}`  |
| AWS Glue   | `arn:aws:glue:{region}:{accountId}`              | `{database}.{table}`          |
| S3         | `s3://{bucket}`                                  | `{path}`                      |

For platforms not listed here, follow the [OpenLineage naming conventions][8].

The following example shows a job reading from a PostgreSQL table and writing to a Snowflake table:

```json
"inputs": [
  {
    "namespace": "postgres://db.example.com:5432",
    "name": "mydb.public.raw_orders"
  }
],
"outputs": [
  {
    "namespace": "snowflake://myorg-myaccount",
    "name": "ANALYTICS.PUBLIC.ORDERS"
  }
]
```

**Note**: If a dataset namespace is not recognized, Datadog still creates a lineage node for it but does not surface it in the Data Observability product. Use a recognized namespace format to have datasets appear in the catalog and lineage graph.

## Supported facets

Facets are structured metadata attached to OpenLineage events. Each facet requires `_producer` (a URI identifying the system that produced it) and `_schemaURL` (a URI referencing its JSON schema).

### `JobTypeJobFacet`

The `jobType` job facet is **required**. It determines how Datadog classifies and displays the job.

#### `integration` values

For jobs run on a technology not yet supported by a native integration, use any value that isn't reserved for a native integration (for example, `my-pipeline`). This value is used throughout Datadog to indicate the job type. The reserved values below are used by Datadog's native integrations. Using a reserved value for a custom job may produce unexpected behavior and is not supported.

| Value          | Platform                                                            |
| -------------- | -------------------------------------------------------------------- |
| `<YOUR_VALUE>` | Custom or unsupported platforms                                     |
| `SPARK`        | Apache Spark (native integration only; do not use for custom jobs) |
| `AIRFLOW`      | Apache Airflow                                                      |
| `DBT`          | dbt                                                                 |
| `BIGQUERY`     | Google BigQuery                                                     |
| `SNOWFLAKE`    | Snowflake                                                           |
| `TRINO`        | Trino                                                                |
| `ICEBERG`      | Apache Iceberg                                                      |
| `TABLEAU`      | Tableau                                                             |

#### `processingType` values

`BATCH` or `STREAMING`.

#### `jobType` values

Common values include `JOB`, `TASK`, `DAG`, `MODEL`, `COMMAND`, and `QUERY`.

**Note**: If `jobType` is set to `QUERY`, Datadog does not generate lineage nodes for the job.

### Other supported facets

| Facet          | What Datadog does                                                                  |
| -------------- | ---------------------------------------------------------------------------------- |
| `parent`       | Creates parent-child job hierarchy in the lineage graph                            |
| `errorMessage` | Generates error spans with `error.message` and `error.stack` tags                  |
| `tags`         | Adds span tags to the run; `_dd.ol_service` value maps to the Datadog service name |
| `sql`          | Parses and masks the SQL query; generates query events                             |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openlineage.io/docs/spec/run-cycle/
[3]: /getting_started/site/#access-the-datadog-site
[4]: /data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage/
[5]: https://openlineage.io/docs/spec/facets/job-facets/job-type/
[6]: /account_management/api-app-keys/
[7]: https://app.datadoghq.com/data-jobs
[8]: https://openlineage.io/docs/spec/naming/
[9]: https://app.datadoghq.com/data-obs/lineage
