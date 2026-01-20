---
title: Custom Jobs using OpenLineage
description: "Monitor jobs from in-house tools, custom pipelines, and orchestrators that don't have native Datadog integrations."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/data_observability/integrations/openlineage/datadog_agent_for_openlineage'
    tag: 'Documentation'
    text: 'Set up Datadog Agent for OpenLineage Proxy'
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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openlineage.io/
[2]: https://openlineage.io/docs/client/python/#predefined-datadog-sites
[3]: /getting_started/site/#access-the-datadog-site
[4]: /data_observability/integrations/openlineage/datadog_agent_for_openlineage