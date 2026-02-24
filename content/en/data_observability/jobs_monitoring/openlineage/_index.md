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
  - link: '/data_observability/jobs_monitoring/openlineage/event_types/'
    tag: 'Documentation'
    text: 'Event Types and Lifecycle'
  - link: '/data_observability/jobs_monitoring/openlineage/facets/'
    tag: 'Documentation'
    text: 'Supported Facets'
  - link: '/data_observability/jobs_monitoring/openlineage/integrations_and_naming/'
    tag: 'Documentation'
    text: 'Integrations and Dataset Naming'
---

<div class="alert alert-info"> Custom jobs using OpenLineage is in Preview.</div>

## Overview

Custom jobs use the [OpenLineage][1] standard to send job and lineage events to Datadog. Use custom jobs when you need to:

- Capture lineage from systems Datadog doesn't integrate with natively, such as in-house tools or custom ETL scripts
- Emit lineage events for jobs or orchestrators where a native Datadog integration isn't available

Replace the hostname in the examples with the relevant [Datadog site][2] for your organization. To find your Datadog site, see [Access the Datadog site][3]. This example uses `datadoghq.com`.

**Note**: To centralize configuration and avoid distributing API keys to every application, you can [set up the Datadog Agent as an OpenLineage proxy][4].

Use one of the following options to send [OpenLineage events][1] to Datadog:

{{< tabs >}}
{{% tab "Direct HTTP with curl" %}}
Send a raw [OpenLineage RunEvent][1] as JSON to Datadog's intake endpoint.

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2023-01-01T00:00:00Z",
        "eventType": "START",
        "run": { "runId": "123e4567-e89b-12d3-a456-426614174000" },
        "job": { "namespace": "default", "name": "test-job" },
        "producer": "your-producer-id"
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

client = OpenLineageClient(
    url="https://data-obs-intake.datadoghq.com",
    options=OpenLineageClientOptions(api_key="<DD_API_KEY>")
)

event = RunEvent(
    eventType=RunState.START,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId=str(uuid.uuid4())),
    job=Job(namespace="default", name="test-job"),
    producer="your-producer-id"
)

client.emit(event)
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
    job=Job(namespace="default", name="test-job"),
    producer="your-producer-id"
)

client.emit(event)
```

<div class="alert alert-info">For Option 3, you can skip <code>DatadogConfig</code> by using environment variables:

```shell
export DD_API_KEY=your-datadog-api-key
export DD_SITE=datadoghq.com
export OPENLINEAGE__TRANSPORT__TYPE=datadog
```

```python
client = OpenLineageClient.from_environment()
```
</div>

[1]: https://openlineage.io/docs/client/python#datadog-transport

{{% /tab %}}
{{< /tabs >}}

## How Datadog processes OpenLineage events

{{< img src="data_observability/openlineage/01_architecture_overview.png" alt="Architecture overview showing event sources (Spark, Airflow, dbt, Custom) sending OpenLineage events to the Datadog API, which processes them into the Lineage Graph, Data Quality Metrics, Job Run Monitoring, and Data Catalog." style="width:100%;" >}}

Datadog processes three OpenLineage event types:

| Event Type | Purpose | When Emitted |
|---|---|---|
| **RunEvent** | Tracks job execution lifecycle | At runtime (START, RUNNING, COMPLETE, FAIL, ABORT) |
| **DatasetEvent** | Describes dataset metadata changes | At design-time, independent of any run |
| **JobEvent** | Describes job metadata and static lineage | At design-time, independent of any run |

For full details on event structure, lifecycle, and examples, see [Event Types and Lifecycle][5].

### What shows up in Datadog

- **Lineage graph**: Job and dataset nodes with data flow edges, column-level lineage, and parent-child job hierarchies
- **Data quality metrics**: Time-series metrics including `row_count`, `bytes`, `freshness`, and column-level `nullness` and `uniqueness`
- **Job run monitoring (APM)**: Execution spans with duration, error tracking, and trace hierarchy across integrations
- **Data catalog**: Dataset schemas, ownership, documentation, and tags

For the full list of supported facets, see [Supported Facets][6]. For integration-specific details and dataset naming conventions, see [Integrations and Dataset Naming][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openlineage.io/
[2]: https://openlineage.io/docs/client/python/#predefined-datadog-sites
[3]: /getting_started/site/#access-the-datadog-site
[4]: /data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage/
[5]: /data_observability/jobs_monitoring/openlineage/event_types/
[6]: /data_observability/jobs_monitoring/openlineage/facets/
[7]: /data_observability/jobs_monitoring/openlineage/integrations_and_naming/