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
    - link: '/monitors/types/data_observability/'
      tag: 'Documentation'
      text: 'Data Observability Monitor'
---

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
- Outbound HTTPS access from the hosts that send events to `data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.

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
        "producer": "<YOUR_PRODUCER_ID>",
        "schemaURL": "https://openlineage.io/spec/2-0-2/OpenLineage.json#/$defs/RunEvent"
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
        "producer": "<YOUR_PRODUCER_ID>",
        "schemaURL": "https://openlineage.io/spec/2-0-2/OpenLineage.json#/$defs/RunEvent"
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
        "producer": "<YOUR_PRODUCER_ID>",
        "schemaURL": "https://openlineage.io/spec/2-0-2/OpenLineage.json#/$defs/RunEvent"
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
        "producer": "<YOUR_PRODUCER_ID>",
        "schemaURL": "https://openlineage.io/spec/2-0-2/OpenLineage.json#/$defs/RunEvent"
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

After sending your events, use the following pages to verify that Datadog received and processed them:

- [**Jobs Overview**][7]: Confirm that your job run appears with its start time, duration, and status.
- [**Lineage**][9]: Search for your job name to see the job and its connections to any datasets included in the event.
- [**OpenLineage events**][12]: Check the validation status of your events: `Ok`, `Warning`, or `Error`. Select an event to view the exact payload Datadog received, or filter by validation status to troubleshoot events that did not process successfully. Start here if the results don't appear as expected in the other two views.

<!-- SCREENSHOT: Data Observability Settings > OpenLineage, the OpenLineage events list with sample custom job events in the Ok, Warning, and Error validation states, and one selected event with the payload Datadog received. -->

## Send runs from tools without OpenLineage support

If a tool doesn't emit OpenLineage events, you can poll its run history and send each run to Datadog as OpenLineage events. A typical poller works as follows:

1. On a schedule, read the runs that started or ended since the last poll from the tool's API, database, or log files.
2. For each run that started, send a `START` event with `eventTime` set to the time the run started in the tool.
3. For each run that ended, send a `COMPLETE` or `FAIL` event with `eventTime` set to the time the run ended in the tool. If a run started and ended between two polls, send its `START` event first. For a failed run, add the `errorMessage` run facet. Set `message` to the tool's error and `programmingLanguage` to the language of the code that failed. See the failure example in [Step 3](#step-3-send-a-complete-or-fail-event).
4. Record which events you sent, so the next poll doesn't send them again.

Each event needs the following fields. On the [OpenLineage events][12] page, Datadog marks an event that's missing one of them with the `Error` status.

| Field | Value |
| ----- | ----- |
| `eventType` | `START`, `COMPLETE`, or `FAIL`. |
| `eventTime` | The time the run started or ended in the tool, in ISO 8601 format, for example `2024-01-01T10:00:00Z`. Datadog reads a timestamp without a UTC offset as UTC. Include the offset if the tool records local times. |
| `run.runId` | A UUID that is the same in every event for the run. |
| `job.namespace` and `job.name` | The same values in every event for every run of the job. |
| `job.facets.jobType` | The [`jobType` facet](#jobtypejobfacet), with `_producer`, `_schemaURL`, `processingType`, `integration`, and `jobType`. If the facet has no `jobType` field, the event gets the `Warning` status. |
| `producer` | A URI that identifies your poller, for example the URL of its repository. |
| `schemaURL` | `https://openlineage.io/spec/2-0-2/OpenLineage.json#/$defs/RunEvent` |

To add lineage, include `inputs` and `outputs` in the event. See [Dataset naming conventions](#dataset-naming-conventions).

Datadog takes a run's start time from the `eventTime` of its `START` event, and its end time from the `eventTime` of its `COMPLETE` or `FAIL` event. Set `eventTime` from the times the tool recorded so that run durations in Datadog match the tool. Job duration monitors evaluate a run while it's in progress, starting when its `START` event arrives. See [How job duration is evaluated][13].

{{< img src="data_observability/openlineage/openlineage_poller_event_times.png" alt="Diagram of a poller that reads a tool's run on two polls and sends START, then COMPLETE or FAIL, with the start and end times the tool recorded." style="width:100%;" >}}

To keep the `runId` stable when the poller restarts, derive it from the tool's own run identifier, for example with `uuid.uuid5(uuid.NAMESPACE_URL, "<TOOL_NAME>/<TOOL_RUN_ID>")` in Python. Datadog treats a second `START` event that has the same `runId` and a different `eventTime` as a retry of that run. If you resend a `START` event, keep its original `eventTime`.

## Correlate logs with job runs

To correlate your application logs with a job run in Datadog, emit your logs with the OpenLineage run ID in the `@openlineage.run_id` attribute. Set its value to the same `runId` you send in your OpenLineage run events. Datadog uses this attribute to associate logs with the matching job run.

How you attach the run ID depends on your logging setup. For details on sending logs with custom attributes to Datadog, see [Log Collection and Integrations][10].

## Dataset naming conventions

To connect your custom job's lineage to datasets already tracked by Datadog's native integrations, include `inputs` and `outputs` in your event using the exact `namespace` and `name` that Datadog expects for that platform. For example, referencing a Snowflake table in your custom job's `outputs` with the correct namespace and name links it to the existing dataset node in the lineage graph.

Datadog resolves datasets into a hierarchy of account, database, schema, and table. If a name has fewer parts than expected (for example, `database.table` instead of `database.schema.table`), Datadog falls back to the nearest higher-order node in the lineage graph.

| Platform   | Namespace                                        | Name                                               |
| ---------- | ------------------------------------------------ | -------------------------------------------------- |
| BigQuery   | `bigquery`                                       | `{project}.{dataset}.{table}`                      |
| Snowflake  | `snowflake://{org}-{account}`                    | `{database}.{schema}.{table}`                      |
| Redshift   | `redshift://{aws_account_id}:{region}:{cluster}` | `{database}.{schema}.{table}`                      |
| PostgreSQL | `postgres://{host}:{port}`                       | `{database}.{schema}.{table}`                      |
| Databricks | `databricks://{workspace-host}`                  | `{catalog}.{schema}.{table}`                       |
| Trino      | `trino://{host}:{port}`                          | `{catalog}.{schema}.{table}`                       |
| AWS Glue   | `arn:aws:glue:{region}:{accountId}`              | `table/{database}/{table}` or `{database}.{table}` |
| S3         | `s3://{bucket}`                                  | `{path}`                                           |

To link a Snowflake dataset to a table in the catalog, use the `snowflake://{org}-{account}` namespace and the fully qualified `{database}.{schema}.{table}` name. If a Snowflake name doesn't have exactly three parts, Datadog links the dataset to the Snowflake account node instead of a table.

For Databricks, use the workspace hostname without `https://`, for example `databricks://dbc-a1b2c3d4-e5f6.cloud.databricks.com`.

For Redshift, `{cluster}` is the cluster identifier, or the workgroup name for Amazon Redshift Serverless. This namespace differs from the `redshift://{cluster_identifier}.{region}:{port}` format in the OpenLineage naming conventions. Datasets in that format appear in lineage, but they don't link to the tables that the Amazon Redshift integration collects.

For platforms not listed here, follow the [OpenLineage naming conventions][8].

The following `inputs` and `outputs` of a run event show a job reading from a PostgreSQL table and writing to a Snowflake table:

```json
{
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
}
```

**Note**: If a dataset namespace is not recognized, Datadog still creates a lineage node for it but does not surface it in the Data Observability product. Use a recognized namespace format to have datasets appear in the catalog and lineage graph.

### Column-level lineage

To send column-level lineage, include a [`schema` facet][14] on each input and output dataset, and a [`columnLineage` facet][15] on each output. Every column that `columnLineage` names must also appear in the `schema` facet of its dataset. Every input dataset that `columnLineage` references must also appear in the event's `inputs`.

Datadog builds column-level lineage only for datasets in a recognized namespace. For example, the BigQuery, Snowflake, Redshift, PostgreSQL, Databricks, AWS Glue, and S3 namespaces in the preceding table support it. Trino datasets and datasets in an unrecognized namespace get table-level lineage only, even when the event includes a `columnLineage` facet.

The following `COMPLETE` event maps the `order_id` and `amount` columns of a PostgreSQL table to the matching columns of a Snowflake table:

```json
{
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
  "inputs": [
    {
      "namespace": "postgres://db.example.com:5432",
      "name": "mydb.public.raw_orders",
      "facets": {
        "schema": {
          "_producer": "<YOUR_PRODUCER_ID>",
          "_schemaURL": "https://openlineage.io/spec/facets/1-2-0/SchemaDatasetFacet.json",
          "fields": [
            { "name": "order_id", "type": "integer" },
            { "name": "amount", "type": "numeric" }
          ]
        }
      }
    }
  ],
  "outputs": [
    {
      "namespace": "snowflake://myorg-myaccount",
      "name": "ANALYTICS.PUBLIC.ORDERS",
      "facets": {
        "schema": {
          "_producer": "<YOUR_PRODUCER_ID>",
          "_schemaURL": "https://openlineage.io/spec/facets/1-2-0/SchemaDatasetFacet.json",
          "fields": [
            { "name": "order_id", "type": "NUMBER" },
            { "name": "amount", "type": "NUMBER" }
          ]
        },
        "columnLineage": {
          "_producer": "<YOUR_PRODUCER_ID>",
          "_schemaURL": "https://openlineage.io/spec/facets/1-2-0/ColumnLineageDatasetFacet.json",
          "fields": {
            "order_id": {
              "inputFields": [
                { "namespace": "postgres://db.example.com:5432", "name": "mydb.public.raw_orders", "field": "order_id" }
              ]
            },
            "amount": {
              "inputFields": [
                { "namespace": "postgres://db.example.com:5432", "name": "mydb.public.raw_orders", "field": "amount" }
              ]
            }
          }
        }
      }
    }
  ],
  "producer": "<YOUR_PRODUCER_ID>",
  "schemaURL": "https://openlineage.io/spec/2-0-2/OpenLineage.json#/$defs/RunEvent"
}
```

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
| `tags`         | Adds custom tags to the job or run; `_dd.ol_service` value maps to the Datadog service name |
| `sql`          | Parses and masks the SQL query; generates query events                             |
| `schema`       | Creates column nodes for datasets in a recognized namespace. See [Column-level lineage](#column-level-lineage). |
| `columnLineage` | Creates column-level lineage edges from input columns to output columns. See [Column-level lineage](#column-level-lineage). |

**Note**: Each tag in the [`tags` facet][2] must include a `key`, `value`, and `source`.

To make custom OpenLineage tags available in Data Job Monitors, set `source` to exactly `USER`. Tags with a missing or different `source` are not available in Data Job Monitors as custom tags.

Tags on `job.facets.tags` and `run.facets.tags` behave differently:

- **Job facet tags**: Added as tags to underlying job traces, allowing you to filter by them on the Jobs Overview page and in [Trace Explorer][11]. When `source` is `USER`, they are also available in Data Job Monitors. Use job facet tags for stable job properties, such as `team` or `owner`.
- **Run facet tags**: Available in Data Job Monitors when `source` is `USER`. They aren't added as individual tags for searching and filtering on the Jobs Overview page or in [Trace Explorer][11]. Use run facet tags for values that can vary between runs.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openlineage.io/docs/spec/run-cycle/
[2]: https://openlineage.io/spec/facets/1-0-0/TagsRunFacet.json
[3]: /getting_started/site/#access-the-datadog-site
[4]: /data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage/
[5]: https://openlineage.io/docs/spec/facets/job-facets/job-type/
[6]: /account_management/api-app-keys/
[7]: https://app.datadoghq.com/data-jobs
[8]: https://openlineage.io/docs/spec/naming/
[9]: https://app.datadoghq.com/data-obs/lineage
[10]: /logs/log_collection/
[11]: /tracing/trace_explorer/?tab=listview
[12]: https://app.datadoghq.com/data-obs/settings/open-lineage
[13]: /monitors/types/data_observability/#how-job-duration-is-evaluated
[14]: https://openlineage.io/docs/spec/facets/dataset-facets/schema
[15]: https://openlineage.io/docs/spec/facets/dataset-facets/column_lineage_facet
